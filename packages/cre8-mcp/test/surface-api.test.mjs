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


// ─── MCP transport ──────────────────────────────────────────────────────────

const rpc = (body, appUnderTest = app, headers = {}) =>
  appUnderTest.request('/mcp', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
      ...headers,
    },
    body: JSON.stringify(body),
  });

let rpcId = 100;
async function callTool(name, args, appUnderTest = app) {
  const res = await rpc(
    { jsonrpc: '2.0', id: ++rpcId, method: 'tools/call', params: { name, arguments: args } },
    appUnderTest
  );
  const json = await res.json();
  if (json.error) throw new Error(`rpc error: ${json.error.message}`);
  return json.result;
}

await test('the MCP endpoint speaks Streamable HTTP and identifies itself', async () => {
  const res = await rpc({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 't', version: '1' } },
  });
  assertEqual(res.status, 200);
  const json = await res.json();
  assertEqual(json.result.serverInfo.name, 'cre8-mcp');
});

await test('one tools/list carries both the knowledge tools and the streaming ones', async () => {
  const res = await rpc({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} });
  const names = (await res.json()).result.tools.map((t) => t.name);
  for (const expected of ['get_a2ui_catalog', 'validate_a2ui_spec', 'ui_open_surface', 'ui_stream', 'ui_events']) {
    assert(names.includes(expected), `tools/list should include ${expected}`);
  }
});

await test('ui_open_surface returns both a URL and an mcp-ui resource', async () => {
  const result = await callTool('ui_open_surface', {
    title: 'MCP surface',
    spec: { component: 'cre8-layout-container' },
  });
  const text = result.content.find((c) => c.type === 'text');
  const resource = result.content.find((c) => c.type === 'resource');
  const payload = JSON.parse(text.text);
  assert(payload.url.includes('/surfaces/'), 'should hand back a viewer URL');
  assert(resource, 'should embed a UI resource for mcp-ui hosts');
  assertEqual(resource.resource.uri, `ui://cre8/surface/${payload.surfaceId}`);
  assertEqual(resource.resource.mimeType, 'text/html;profile=mcp-app');
  assert(resource.resource.text.includes('const ORIGIN = "http://localhost:3999"'),
    'an embedded page needs an absolute origin — a sandboxed iframe has none of its own');
  assert(resource.resource.text.includes('"http://localhost:3999/a2ui/runtime"'),
    'runtime imports must be absolute too');
});

await test('ui_stream applies data before ops, so a same-call binding validates', async () => {
  const opened = JSON.parse((await callTool('ui_open_surface', {
    spec: { component: 'cre8-layout-container' },
  })).content[0].text);

  const result = await callTool('ui_stream', {
    surfaceId: opened.surfaceId,
    data: [{ pointer: '/label', value: 'Checkout' }],
    ops: [{ op: 'append', path: '$', nodes: [{ component: 'cre8-button', props: { text: { $bind: '/label' } } }] }],
    status: 'done',
  });
  const summary = JSON.parse(result.content[0].text);
  assertEqual(summary.state, 'done');

  const snapshot = JSON.parse((await callTool('ui_get_surface', { surfaceId: opened.surfaceId })).content[0].text);
  assertEqual(snapshot.root.children[0].props.text, 'Checkout');
});

await test('a bad op comes back as a tool error naming the catalog rule', async () => {
  const opened = JSON.parse((await callTool('ui_open_surface', {
    spec: { component: 'cre8-card' },
  })).content[0].text);
  const result = await callTool('ui_stream', {
    surfaceId: opened.surfaceId,
    ops: [{ op: 'append', path: '$', nodes: ['illegal'] }],
  });
  assertEqual(result.isError, true);
  assert(result.content[0].text.includes('does not accept default children'));
});

await test('ui_events returns a queued event without waiting', async () => {
  const opened = JSON.parse((await callTool('ui_open_surface', {
    spec: { component: 'cre8-layout-container' },
  })).content[0].text);
  await post(`/surfaces/${opened.surfaceId}/events`, { event: 'click', handler: 'go' });
  const result = await callTool('ui_events', { surfaceId: opened.surfaceId, waitMs: 5000 });
  const payload = JSON.parse(result.content[0].text);
  assertEqual(payload.events.length, 1);
  assertEqual(payload.lastSeq, 1);
});

await test('/mcp is behind the bearer gate', async () => {
  const guarded = createApp({ port: 3999, token: 'secret' });
  const res = await rpc({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }, guarded);
  assertEqual(res.status, 401);
});

// ─── knowledge tools ────────────────────────────────────────────────────────

await test('get_content_model derives the children-vs-slots split from the catalog', async () => {
  const model = await (await req('/content-model')).json();
  assertEqual(model.both.length, 0, 'the catalog must never let a component take both');
  assert(model.childrenOnly.length + model.slotOnly.length + model.leaf.length === model.total,
    'every component must land in exactly one bucket');
  assert(model.childrenOnly.includes('cre8-heading'));
  assert(model.slotOnly.includes('cre8-card'));
  assert(model.noFreeContent.components.includes('cre8-button'),
    'a button takes no free content — its label is the text prop');
});

await test('get_content_model names the rule for one component', async () => {
  const card = await (await req('/content-model?component=card')).json();
  assertEqual(card.contentVia, 'slots');
  assert(card.rule.includes('children'), 'the rule should say what NOT to do');
  assert(card.example.slots.default, 'and hand back a copyable example');
  assertEqual((await req('/content-model?component=cre8-nope')).status, 400);
});

await test('cre8_guide counts come from the catalog, not from prose', async () => {
  const guide = await (await req('/guide?topic=content-model')).json();
  const model = await (await req('/content-model')).json();
  assertEqual(guide.guide.counts.childrenOnly, model.childrenOnly.length);
  assertEqual(guide.guide.counts.leaf, model.leaf.length);
  assertEqual(guide.components, model.total);
});

await test('cre8_guide covers every topic it advertises', async () => {
  for (const topic of ['overview', 'content-model', 'streaming', 'events', 'validation']) {
    const res = await req(`/guide?topic=${topic}`);
    assertEqual(res.status, 200, `topic ${topic}`);
    const body = await res.json();
    assertEqual(body.topic, topic);
    assert(body.guide && Object.keys(body.guide).length > 0, `topic ${topic} should have content`);
  }
  assertEqual((await req('/guide?topic=nonsense')).status, 400);
});

await test('the knowledge tools are reachable over MCP too', async () => {
  const result = await callTool('get_content_model', { component: 'cre8-table-row' });
  const payload = JSON.parse(result.content[0].text);
  assertEqual(payload.contentVia, 'slots', 'HTML intuition says children; the catalog says slots');
});

await test('generate_code emits plain HTML tags alongside cre8 ones', async () => {
  const res = await post('/generate', {
    schema: { component: 'div', children: [{ component: 'p', children: ['hi'] }, { component: 'cre8-button', props: { text: 'Go' } }] },
  });
  const { code } = await res.json();
  assert(code.includes('<p>hi</p>'), 'a plain tag must not be prefixed with cre8-');
  assert(code.includes('<cre8-button text="Go">'), 'and cre8 components still normalise');
});

// ─── theming ────────────────────────────────────────────────────────────────

await test('the server lists the brands it can theme a surface with', async () => {
  const { brands, default: fallback } = await (await req('/themes')).json();
  assert(brands.includes('cre8'), 'the house brand should be installed');
  assert(brands.includes(fallback), 'the default must be one of the installed brands');
});

await test('a brand sheet and the primitives it imports are both servable', async () => {
  assertEqual((await req('/themes/cre8/tokens.css')).status, 200);
  // tokens_<brand>.css @imports its siblings; without tokens_brand.css every
  // semantic token resolves to an undefined var and the surface renders naked.
  assertEqual((await req('/themes/cre8/tokens_brand.css')).status, 200);
  const css = await (await req('/themes/cre8/tokens.css')).text();
  assert(css.includes('--cre8-'), 'the sheet should actually define cre8 tokens');
});

await test('an unknown brand or a non-css file is refused', async () => {
  assertEqual((await req('/themes/not-a-brand/tokens.css')).status, 404);
  assertEqual((await req('/themes/cre8/tokens_cre8.module.ts')).status, 404);
});

await test('a surface remembers its theme and the page links it', async () => {
  const created = await post('/surfaces', {
    theme: 'cre8-a2ui',
    root: { component: 'cre8-layout-container' },
  });
  const { surfaceId, theme } = await created.json();
  assertEqual(theme, 'cre8-a2ui');
  const html = await (await req(`/surfaces/${surfaceId}`)).text();
  assert(html.includes('/themes/cre8-a2ui/tokens.css'), 'the page must link its brand sheet');
});

await test('an unknown theme is rejected at creation, not at render', async () => {
  const res = await post('/surfaces', { theme: 'no-such-brand' });
  assertEqual(res.status, 400);
  assert((await res.json()).error.includes('Unknown theme'));
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
