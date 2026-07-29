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

// ─── the embedded (mcp-ui) path ─────────────────────────────────────────────
//
// An mcp-ui host renders the resource HTML in a sandboxed iframe with no origin
// of its own. Everything the page then loads is a cross-origin request back to
// this server, so the contract is: absolute URLs in the markup, and CORS on
// every route the page touches. Verified in a browser against a foreign origin;
// these lock the parts that can be checked without one.

const embeddedHtml = async () => {
  const result = await callTool('ui_open_surface', {
    theme: 'cre8',
    spec: { component: 'cre8-layout-container' },
  });
  const resource = result.content.find((c) => c.type === 'resource');
  const payload = JSON.parse(result.content.find((c) => c.type === 'text').text);
  return { html: resource.resource.text, surfaceId: payload.surfaceId };
};

await test('the embedded page carries no root-relative URLs', async () => {
  const { html } = await embeddedHtml();
  // A root-relative href in a sandboxed iframe resolves to nothing.
  assert(!/(?:href|src)="\//.test(html), 'no attribute may point at a bare "/..." path');
  assert(html.includes('<link rel="stylesheet" href="http://localhost:3999/themes/cre8/tokens.css">'),
    'the token sheet must be absolute');
  assert(!/import\('\//.test(html), 'no dynamic import may start from the root');
});

await test('every route the embedded page touches allows a foreign origin', async () => {
  const { surfaceId } = await embeddedHtml();
  const routes = [
    '/cre8-wc.esm.js',
    '/a2ui/runtime/index.js',
    '/a2ui/runtime/stream/index.js',
    '/a2ui/runtime/catalog.json',
    '/themes/cre8/tokens.css',
    '/themes/cre8/tokens_brand.css',
    `/surfaces/${surfaceId}/stream`,
  ];
  for (const route of routes) {
    const res = await req(route, { headers: { Origin: 'null' } });
    assertEqual(res.headers.get('access-control-allow-origin'), '*', `CORS on ${route}`);
  }
});

await test('a click reports back as a CORS-simple beacon, with no preflight', async () => {
  const { surfaceId } = await embeddedHtml();
  // text/plain is what keeps sendBeacon a simple request. If this ever needs
  // application/json, an embedded surface silently stops reporting clicks.
  const res = await req(`/surfaces/${surfaceId}/events`, {
    method: 'POST',
    headers: { Origin: 'null', 'content-type': 'text/plain' },
    body: JSON.stringify({ component: 'cre8-button', path: '$', event: 'click', handler: 'approve' }),
  });
  assertEqual(res.status, 200);
  const { events } = await (await req(`/surfaces/${surfaceId}/events?since=0`)).json();
  assertEqual(events[0].handler, 'approve');
});

// ─── composition ────────────────────────────────────────────────────────────
//
// The first cut of get_composition derived nesting from the naming rule and got
// it wrong in the way that matters: cre8-table-cell directly inside cre8-table,
// and cre8-tag containing cre8-tag-list. Both *validated*, because the catalog
// does not type slot contents. These tests pin the ground-truth behaviour that
// replaced it.

await test('nesting comes from the worked examples, not from names', async () => {
  const table = await (await req('/composition?component=table')).json();
  const kids = table.observedChildren.map((c) => c.component);
  assert(kids.includes('cre8-table-header') && kids.includes('cre8-table-body'),
    'a table holds a header and a body');
  assert(!kids.includes('cre8-table-cell'),
    'cells belong to rows, not to the table — the mistake the naming rule made');
});

await test('the full hierarchy is reported level by level, slots included', async () => {
  const row = await (await req('/composition?component=cre8-table-row')).json();
  const cells = row.observedChildren.filter((c) => c.component.endsWith('-cell'));
  assert(cells.length, 'a row holds cells');
  assert(cells.every((c) => c.slot === 'default'),
    'and holds them in slots.default, which is the detail that breaks table specs');
  assert(row.observedParents.includes('cre8-table-body'), 'a row names the body as a parent');
});

await test('an undemonstrated family is reported without a direction', async () => {
  // cre8-select-tile / cre8-select-tile-list is the pairing no shipped example
  // covers, and the one the naming rule gets backwards.
  const tile = await (await req('/composition?component=cre8-select-tile-list')).json();
  assert(tile.nameFamily.includes('cre8-select-tile'), 'the family is real');
  assert(Array.isArray(tile.nameFamily), 'it must be a flat list, not a hierarchy');
  assertEqual(tile.observedChildren.length, 0, 'nothing demonstrates this nesting yet');
  assert(tile.warning?.includes('does not say which way containment runs'),
    'so the ambiguity must be stated, not smoothed over');
});

await test('the worked example handed back is real and still validates', async () => {
  const table = await (await req('/composition?component=table')).json();
  assert(table.example.source.startsWith('a2ui/examples/'), 'the example must be an authored one');
  assert(table.example.path.startsWith('$'), 'and say where in that file it came from');
  const check = await post('/a2ui/validate', { spec: table.example.spec });
  assertEqual((await check.json()).ok, true, 'a spec offered as a model must validate');
});

await test('get_composition is reachable over MCP', async () => {
  const result = await callTool('get_composition', { component: 'cre8-tabs' });
  const payload = JSON.parse(result.content[0].text);
  const bySlot = Object.fromEntries(payload.observedChildren.map((c) => [c.component, c.slot]));
  assertEqual(bySlot['cre8-tab'], 'default');
  assertEqual(bySlot['cre8-tab-panel'], 'panel', 'panels go in the panel slot, not alongside tabs');
});

await test('the compound-families example gives get_composition real coverage', async () => {
  const all = await (await req('/composition')).json();
  assert(all.observedNestings >= 25, `expected broad coverage, got ${all.observedNestings}`);
  const names = all.parents.map((p) => p.component);
  for (const family of ['cre8-accordion', 'cre8-tag-list', 'cre8-checkbox-field', 'cre8-link-list', 'cre8-dropdown']) {
    assert(names.includes(family), `${family} should be demonstrated by a shipped example`);
  }
});

await test('cre8-tag-list is now known to contain cre8-tag, not the reverse', async () => {
  const list = await (await req('/composition?component=cre8-tag-list')).json();
  assertEqual(list.observedChildren[0].component, 'cre8-tag');
  assert(!list.warning, 'ground truth replaces the ambiguity warning');
  const tag = await (await req('/composition?component=cre8-tag')).json();
  assert(tag.observedParents.includes('cre8-tag-list'), 'and the child names its real parent');
});

await test('get_content_model warns about props that render nothing', async () => {
  // cre8-field.errorText is declared, defaults to "Error", and is never read —
  // an agent setting it to show a validation message gets silence, and
  // validate_a2ui_spec says the spec is fine.
  const field = await (await req('/content-model?component=cre8-field')).json();
  assert(field.inertProps?.errorText, 'errorText must be flagged as inert');
  assert(field.inertProps.errorText.reason.includes('fieldNote'),
    'and the warning must name the prop that does work');
  const spec = { component: 'cre8-field', props: { errorText: 'Required' }, slots: { fieldNote: ['x'] } };
  assertEqual((await (await post('/a2ui/validate', { spec })).json()).ok, true,
    'the point being that validation passes it regardless');
});

await test('a component with no inert props says nothing about them', async () => {
  const button = await (await req('/content-model?component=cre8-button')).json();
  assert(!('inertProps' in button), 'silence, rather than an empty all-clear');
});

// ─── whole-tree updates ─────────────────────────────────────────────────────

await test('resending the whole tree applies only what changed', async () => {
  const { surfaceId } = await newSurface();
  const build = (label) => ({
    component: 'cre8-layout-container',
    children: [
      { component: 'cre8-heading', props: { tagVariant: 'h1' }, children: ['Title'] },
      { component: 'cre8-button', props: { text: label, variant: 'primary' } },
    ],
  });
  await post(`/surfaces/${surfaceId}/spec`, { spec: build('Before') });
  const seqAfterFirst = (await (await req(`/surfaces/${surfaceId}/state`)).json()).seq;

  await post(`/surfaces/${surfaceId}/spec`, { spec: build('After') });
  const state = await (await req(`/surfaces/${surfaceId}/state`)).json();
  assertEqual(state.root.children[1].props.text, 'After');
  assertEqual(state.seq, seqAfterFirst + 1, 'one message, not a rebuild');
});

await test('resending an identical tree costs nothing', async () => {
  const { surfaceId } = await newSurface();
  const spec = { component: 'cre8-layout-container', children: [{ component: 'cre8-heading', children: ['Same'] }] };
  await post(`/surfaces/${surfaceId}/spec`, { spec });
  const before = (await (await req(`/surfaces/${surfaceId}/state`)).json()).seq;
  await post(`/surfaces/${surfaceId}/spec`, { spec: JSON.parse(JSON.stringify(spec)) });
  const after = (await (await req(`/surfaces/${surfaceId}/state`)).json()).seq;
  assertEqual(after, before, 'an unchanged tree must not advance the sequence');
});

await test('an invalid tree is rejected without touching the surface', async () => {
  const { surfaceId } = await newSurface();
  const good = { component: 'cre8-layout-container', children: [{ component: 'cre8-heading', children: ['Kept'] }] };
  await post(`/surfaces/${surfaceId}/spec`, { spec: good });
  const res = await post(`/surfaces/${surfaceId}/spec`, {
    spec: { component: 'cre8-layout-container', children: [{ component: 'cre8-card', children: ['illegal'] }] },
  });
  assertEqual(res.status, 400);
  const state = await (await req(`/surfaces/${surfaceId}/state`)).json();
  assertEqual(state.root.children[0].children[0], 'Kept');
});

await test('ui_stream takes spec or ops, and says so when given both', async () => {
  const opened = JSON.parse((await callTool('ui_open_surface', {
    spec: { component: 'cre8-layout-container' },
  })).content[0].text);

  const ok = await callTool('ui_stream', {
    surfaceId: opened.surfaceId,
    spec: { component: 'cre8-layout-container', children: [{ component: 'cre8-heading', children: ['Via spec'] }] },
    status: 'done',
  });
  assert(!ok.isError, 'spec alone should work');

  const both = await callTool('ui_stream', {
    surfaceId: opened.surfaceId,
    spec: { component: 'cre8-grid' },
    ops: [{ op: 'append', path: '$', nodes: [] }],
  });
  assertEqual(both.isError, true);
  assert(both.content[0].text.includes('not both'));
});

await test('every module the served runtime imports is itself servable', async () => {
  // The allowlist and the compiled module graph have to agree. They did not:
  // stream/index.js started re-exporting diff.js, diff.js was not listed, and
  // the viewer page died on a 404 with nothing in the console to say why. Walk
  // the graph instead of trusting the list.
  const seen = new Set();
  const queue = ['index.js', 'stream/index.js'];
  while (queue.length) {
    const file = queue.shift();
    if (seen.has(file)) continue;
    seen.add(file);
    const res = await req(`/a2ui/runtime/${file}`);
    assertEqual(res.status, 200, `${file} must be servable — the viewer imports it`);
    const source = await res.text();
    const dir = file.includes('/') ? `${file.slice(0, file.lastIndexOf('/'))}/` : '';
    for (const m of source.matchAll(/from\s+['"](\.[^'"]+)['"]/g)) {
      // Resolve the relative specifier against the importing file's directory.
      const parts = `${dir}${m[1]}`.split('/');
      const stack = [];
      for (const part of parts) {
        if (part === '.' || part === '') continue;
        if (part === '..') stack.pop();
        else stack.push(part);
      }
      queue.push(stack.join('/'));
    }
  }
  assert(seen.size >= 6, `expected to walk the runtime graph, only saw ${[...seen].join(', ')}`);
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
