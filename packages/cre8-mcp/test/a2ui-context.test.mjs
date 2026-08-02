/**
 * HTTP-level tests for GET /a2ui/context.
 *
 *   npx tsx test/a2ui-context.test.mjs
 *
 * Drives the Hono app directly with `app.request()` — no port, no sockets.
 */

const { createApp } = await import('../src/app.ts');

const app = createApp({ port: 3999, token: '' });

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

const get = async (path) => {
  const res = await app.request(path);
  return { status: res.status, body: await res.json() };
};

await test('the whole catalog comes back compact and untruncated', async () => {
  const { status, body } = await get('/a2ui/context');
  assertEqual(status, 200);
  assertEqual(body.projection, 'compact');
  assertEqual(body.truncated, false);
  assertEqual(body.droppedCount, 0);
  assert(body.components.length > 80, 'expected the full catalog');
  assertEqual(body.contractVersion, 1);
});

await test('compact is dramatically smaller than full for the same selection', async () => {
  const compact = await get('/a2ui/context?names=cre8-button');
  const full = await get('/a2ui/context?names=cre8-button&projection=full');
  assert(
    full.body.estimatedTokens > compact.body.estimatedTokens * 3,
    `expected a large gap, got compact=${compact.body.estimatedTokens} full=${full.body.estimatedTokens}`
  );
});

await test('containment survives the projection, so containers are not mistaken for leaves', async () => {
  const { body } = await get('/a2ui/context?names=cre8-layout-container,cre8-card');
  const container = body.components.find((c) => c.name === 'cre8-layout-container');
  const card = body.components.find((c) => c.name === 'cre8-card');
  assertEqual(container.acceptsChildren, true, 'layout-container takes children');
  assert(card.slots?.includes('default'), 'card has a default slot');
});

await test('enum choices survive, because they are the decoding constraint', async () => {
  const { body } = await get('/a2ui/context?names=cre8-button');
  const variant = body.components[0].props.variant;
  assert(variant.enum?.includes('primary'), 'variant must keep its choices');
});

await test('a budget drops whole components and reports how many', async () => {
  const { body } = await get('/a2ui/context?budget=500');
  assertEqual(body.truncated, true);
  assert(body.droppedCount > 0, 'expected drops');
  assert(body.estimatedTokens <= 500, `over budget: ${body.estimatedTokens}`);
  // Every survivor must still be a complete definition.
  for (const component of body.components) {
    assert(typeof component.name === 'string' && component.name.length > 0, 'truncated component');
  }
});

await test('pinned components survive a budget that would otherwise drop them', async () => {
  const tight = '/a2ui/context?categories=Forms,Actions,Typography&budget=1200';
  const unpinned = await get(tight);
  const pinned = await get(`${tight}&pinned=cre8-button,cre8-field`);

  const names = (r) => r.body.components.map((c) => c.name);
  // The regression this guards: size tracks prop count, so the most capable
  // components are the first casualties of smallest-first filling.
  assert(!names(unpinned).includes('cre8-button'), 'precondition: button is starved unpinned');
  assert(names(pinned).includes('cre8-button'), 'pinning must rescue cre8-button');
  assert(names(pinned).includes('cre8-field'), 'pinning must rescue cre8-field');
});

await test('category selection narrows the slice', async () => {
  const { body } = await get('/a2ui/context?categories=Actions');
  assert(body.components.length > 0, 'expected some Actions components');
  assert(body.components.every((c) => c.category === 'Actions'), 'leaked a non-Actions component');
});

await test('an unknown component name is an error, not a silent omission', async () => {
  const { status, body } = await get('/a2ui/context?names=cre8-not-a-component');
  assertEqual(status, 400);
  assert(body.error.includes('not found'), body.error);
});

await test('an unknown category lists what is available rather than returning nothing', async () => {
  const { status, body } = await get('/a2ui/context?categories=Nonsense');
  assertEqual(status, 400);
  assert(body.error.includes('Available:'), body.error);
});

await test('a malformed budget is rejected rather than silently ignored', async () => {
  assertEqual((await get('/a2ui/context?budget=abc')).status, 400);
  assertEqual((await get('/a2ui/context?budget=-5')).status, 400);
});

await test('an unknown projection is rejected', async () => {
  const { status } = await get('/a2ui/context?projection=medium');
  assertEqual(status, 400);
});

await test('the route sits behind the bearer gate like every other', async () => {
  const guarded = createApp({ port: 3999, token: 'secret' });
  assertEqual((await guarded.request('/a2ui/context')).status, 401);
  const ok = await guarded.request('/a2ui/context', {
    headers: { authorization: 'Bearer secret' },
  });
  assertEqual(ok.status, 200);
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
