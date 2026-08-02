/**
 * Per-tenant access to the knowledge plane.
 *
 *   npx tsx test/tenants.test.mjs
 *
 * The two properties that matter: upgrading must not loosen an existing
 * single-token deployment, and enabling per-tenant mode must not open the
 * surface API, which hands out unguessable ids.
 */

const { createApp } = await import('../src/app.ts');
const { RateLimiter, loadTenantConfig } = await import('../src/tenants.ts');

let passed = 0;
const failures = [];

async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ok  ${name}`);
  } catch (err) {
    failures.push(name);
    console.log(`FAIL  ${name}\n      ${err.message}`);
  }
}

function assert(cond, message) {
  if (!cond) throw new Error(message ?? 'assertion failed');
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message ?? 'not equal'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

const tenantConfig = (overrides = {}) => ({
  legacyToken: undefined,
  tenants: new Map([
    ['tok-acme', { id: 'acme', limit: 5 }],
    ['tok-unlimited', { id: 'unlimited', limit: null }],
  ]),
  anonymousLimit: 3,
  ...overrides,
});

const multi = (extra = {}) =>
  createApp({ port: 3999, token: '', tenants: tenantConfig(), rateLimiter: new RateLimiter(), ...extra });

const bearer = (t) => ({ headers: { authorization: `Bearer ${t}` } });

// ── Backwards compatibility ──────────────────────────────────────────

await test('single-token mode is unchanged: the token gates the API', async () => {
  const app = createApp({ port: 3999, token: 'secret' });
  assertEqual((await app.request('/components')).status, 401, 'no token');
  assertEqual((await app.request('/components', bearer('secret'))).status, 200, 'with token');
  assertEqual((await app.request('/health')).status, 200, 'health stays open');
});

await test('no token configured leaves everything open, as before', async () => {
  const app = createApp({ port: 3999, token: '' });
  assertEqual((await app.request('/components')).status, 200);
});

// ── Per-tenant mode ──────────────────────────────────────────────────

await test('knowledge is readable anonymously, because the catalog is public', async () => {
  const app = multi();
  assertEqual((await app.request('/components')).status, 200, '/components');
  assertEqual((await app.request('/a2ui/context?categories=Actions')).status, 200, '/a2ui/context');
});

await test('surfaces stay closed to anonymous callers — ids are capabilities', async () => {
  const app = multi();
  const res = await app.request('/surfaces', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({}),
  });
  assertEqual(res.status, 401, 'anonymous POST /surfaces');
  const body = await res.json();
  assert(/tenant token/i.test(body.detail ?? ''), `expected an explanatory detail, got ${JSON.stringify(body)}`);
});

await test('a tenant token opens the surface API', async () => {
  const app = multi();
  const res = await app.request('/surfaces', {
    method: 'POST',
    headers: { authorization: 'Bearer tok-acme', 'content-type': 'application/json' },
    body: JSON.stringify({}),
  });
  assertEqual(res.status, 201, 'creating a surface answers 201');
});

await test('an unrecognised token is rejected, not silently downgraded to anonymous', async () => {
  const app = multi();
  const res = await app.request('/components', bearer('tok-nope'));
  assertEqual(res.status, 401, 'a caller who thinks they are authenticated must not be treated as anonymous');
});

await test('the legacy token still works alongside per-tenant config', async () => {
  const app = createApp({
    port: 3999,
    token: '',
    tenants: tenantConfig({ legacyToken: 'old-secret' }),
    rateLimiter: new RateLimiter(),
  });
  assertEqual((await app.request('/components', bearer('old-secret'))).status, 200);
});

// ── Rate limiting ────────────────────────────────────────────────────

await test('anonymous callers are limited, and told when to retry', async () => {
  const app = multi();
  for (let i = 0; i < 3; i++) {
    assertEqual((await app.request('/components')).status, 200, `request ${i + 1} within limit`);
  }
  const res = await app.request('/components');
  assertEqual(res.status, 429, 'fourth request over a limit of 3');
  assert(res.headers.get('Retry-After'), 'a 429 must say when to retry');
});

await test('a tenant gets its own, larger budget', async () => {
  const app = multi();
  // Exhaust the anonymous bucket first; the tenant must be unaffected by it.
  for (let i = 0; i < 4; i++) await app.request('/components');
  for (let i = 0; i < 5; i++) {
    assertEqual((await app.request('/components', bearer('tok-acme'))).status, 200, `tenant request ${i + 1}`);
  }
  assertEqual((await app.request('/components', bearer('tok-acme'))).status, 429, 'sixth exceeds the tenant limit of 5');
});

await test('a null limit means unlimited', async () => {
  const app = multi();
  for (let i = 0; i < 20; i++) {
    assertEqual((await app.request('/components', bearer('tok-unlimited'))).status, 200, `request ${i + 1}`);
  }
});

await test('health is never rate limited, so probes cannot lock themselves out', async () => {
  const app = multi();
  for (let i = 0; i < 25; i++) {
    assertEqual((await app.request('/health')).status, 200, `probe ${i + 1}`);
  }
});

// ── Config loading ───────────────────────────────────────────────────

await test('a malformed tenant config fails closed rather than opening the server', () => {
  let threw = false;
  try {
    loadTenantConfig({ CRE8_MCP_TENANTS: '{not json' });
  } catch {
    threw = true;
  }
  assert(threw, 'an unreadable auth config must abort startup, not fall back to open');
});

await test('tenants parse from the environment with a default limit', () => {
  const config = loadTenantConfig({ CRE8_MCP_TENANTS: '{"abc":{"id":"acme"}}' });
  assertEqual(config.tenants.get('abc').id, 'acme');
  assertEqual(config.tenants.get('abc').limit, 600);
});

await test('the rate limiter releases windows so a long-lived process does not grow', () => {
  const limiter = new RateLimiter(1000);
  limiter.check('a', 10, 0);
  limiter.check('b', 10, 0);
  assertEqual(limiter.size, 2);
  limiter.sweep(2000);
  assertEqual(limiter.size, 0);
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
