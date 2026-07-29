/**
 * HTTP-level tests for streaming surfaces.
 *
 *   npx tsx test/surface-api.test.mjs
 *
 * Drives the Hono app directly with `app.request()` — no port, no sockets, so
 * this is safe to run in CI alongside anything else.
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

const req = (path, init) => app.request(path, init);
const post = (path, body) =>
  app.request(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

async function newSurface(body = { root: { component: 'cre8-layout-container' } }) {
  const res = await post('/surfaces', body);
  assertEqual(res.status, 201, 'surface creation should return 201');
  return res.json();
}

await test('a surface is created with a viewer URL and an unguessable id', async () => {
  const surface = await newSurface({ title: 'T', root: { component: 'cre8-layout-container' } });
  assertEqual(surface.title, 'T');
  assertEqual(surface.state, 'streaming');
  assert(/^[0-9a-f]{32}$/.test(surface.surfaceId), 'id should be 128 random bits in hex');
  assert(surface.url.endsWith(`/surfaces/${surface.surfaceId}`), 'should hand back a viewer URL');
});

await test('creating a surface with an invalid root is rejected', async () => {
  const res = await post('/surfaces', { root: { component: 'cre8-not-a-thing' } });
  assertEqual(res.status, 400);
  assert((await res.json()).error.includes('not registered in catalog'));
});

await test('a valid patch advances seq and shows up in the snapshot', async () => {
  const { surfaceId } = await newSurface();
  const res = await post(`/surfaces/${surfaceId}/patch`, {
    ops: [{ op: 'append', path: '$', nodes: [{ component: 'cre8-heading', children: ['Hi'] }] }],
  });
  assertEqual(res.status, 200);
  assertEqual((await res.json()).seq, 1);
  const state = await (await req(`/surfaces/${surfaceId}/state`)).json();
  assertEqual(state.root.children[0].component, 'cre8-heading');
});

await test('an invalid patch is a 400 that names the rule it broke, and does not advance seq', async () => {
  const { surfaceId } = await newSurface();
  await post(`/surfaces/${surfaceId}/patch`, {
    ops: [{ op: 'append', path: '$', nodes: [{ component: 'cre8-card' }] }],
  });
  const res = await post(`/surfaces/${surfaceId}/patch`, {
    ops: [{ op: 'append', path: '$.children[0]', nodes: ['illegal'] }],
  });
  assertEqual(res.status, 400);
  assert((await res.json()).error.includes('does not accept default children'));
  const state = await (await req(`/surfaces/${surfaceId}/state`)).json();
  assertEqual(state.seq, 1, 'a rejected patch must not consume a sequence number');
});

await test('data patches update bound props', async () => {
  const { surfaceId } = await newSurface();
  await post(`/surfaces/${surfaceId}/patch`, {
    ops: [
      { op: 'append', path: '$', nodes: [{ component: 'cre8-button', props: { text: { $bind: '/cta' } } }] },
    ],
  });
  await post(`/surfaces/${surfaceId}/data`, { patches: [{ pointer: '/cta', value: 'Checkout' }] });
  const state = await (await req(`/surfaces/${surfaceId}/state`)).json();
  assertEqual(state.root.children[0].props.text, 'Checkout');
});

await test('the viewer page is served as HTML', async () => {
  const { surfaceId } = await newSurface();
  const res = await req(`/surfaces/${surfaceId}`);
  assertEqual(res.status, 200);
  const html = await res.text();
  assert(html.includes(surfaceId), 'page should embed its own surface id');
  assert(html.includes('/cre8-wc.esm.js'), 'page should load the design system bundle');
});

await test('runtime assets are allowlisted, and anything else is a 404', async () => {
  assertEqual((await req('/a2ui/runtime/stream/index.js')).status, 200);
  assertEqual((await req('/a2ui/runtime/catalog.json')).status, 200);
  assertEqual((await req('/a2ui/runtime/generate-catalog.mjs')).status, 404);
});

await test('an event posted by a viewer is queued for the agent to poll', async () => {
  const { surfaceId } = await newSurface();
  const posted = await post(`/surfaces/${surfaceId}/events`, {
    component: 'cre8-button',
    path: '$.children[0]',
    event: 'click',
    handler: 'upgrade-clicked',
    detail: { plan: 'pro' },
  });
  assertEqual(posted.status, 200);
  const { events } = await (await req(`/surfaces/${surfaceId}/events?since=0`)).json();
  assertEqual(events.length, 1);
  assertEqual(events[0].handler, 'upgrade-clicked');
  assertEqual(events[0].detail.plan, 'pro');
});

await test('an event with no handler is rejected', async () => {
  const { surfaceId } = await newSurface();
  const res = await post(`/surfaces/${surfaceId}/events`, { event: 'click' });
  assertEqual(res.status, 400);
});

await test('a closed surface is a 404 everywhere, not a 400', async () => {
  const { surfaceId } = await newSurface();
  assertEqual((await req(`/surfaces/${surfaceId}`, { method: 'DELETE' })).status, 200);
  assertEqual((await req(`/surfaces/${surfaceId}/state`)).status, 404);
  assertEqual((await post(`/surfaces/${surfaceId}/patch`, { ops: [] })).status, 404);
  assertEqual((await req(`/surfaces/${surfaceId}`)).status, 404);
});

await test('the bearer gate covers the agent API but not the viewer', async () => {
  const guarded = createApp({ port: 3999, token: 'secret' });
  const auth = { headers: { authorization: 'Bearer secret', 'content-type': 'application/json' } };

  assertEqual((await guarded.request('/components')).status, 401, 'API without a token');
  assertEqual((await guarded.request('/components', auth)).status, 200, 'API with a token');
  assertEqual((await guarded.request('/health')).status, 200, 'health stays open for Docker');

  const created = await guarded.request('/surfaces', {
    method: 'POST',
    ...auth,
    body: JSON.stringify({ root: { component: 'cre8-layout-container' } }),
  });
  const { surfaceId } = await created.json();
  assertEqual((await guarded.request(`/surfaces/${surfaceId}`)).status, 200, 'viewer page stays open');
  assertEqual(
    (await guarded.request(`/surfaces/${surfaceId}/events`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ event: 'click', handler: 'x' }),
    })).status,
    200,
    'a viewer can report events without the agent token'
  );
  assertEqual(
    (await guarded.request(`/surfaces/${surfaceId}/patch`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ops: [] }),
    })).status,
    401,
    'but a viewer cannot mutate the surface'
  );
});

await test('the existing REST API still answers', async () => {
  assertEqual((await req('/health')).status, 200);
  const list = await (await req('/components')).json();
  assert(Array.isArray(list.components) || typeof list === 'object', 'component list should be JSON');
  assertEqual((await req('/a2ui/catalog?view=metadata')).status, 200);
  assertEqual((await req('/react/components')).status, 200);
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
