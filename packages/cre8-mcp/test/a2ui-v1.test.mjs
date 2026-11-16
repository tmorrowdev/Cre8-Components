/**
 * A2UI v1.0 interop: the a2ui_v1 tool's catalog, export and import.
 *
 *   npx tsx test/a2ui-v1.test.mjs
 *
 * Conformance is checked against the official v1.0 JSON Schemas, vendored in
 * test/fixtures/a2ui-v1/ from
 * https://github.com/a2ui-project/a2ui/tree/main/specification/v1_0/json
 * As the spec instructs, the envelope's `catalog.json` placeholder is mapped to
 * our catalog by registering it under that id.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';

const {
  buildV1Catalog,
  exportV1,
  importV1,
  handleA2uiV1,
  getV1Mapping,
} = await import('../src/a2ui-v1.ts');
const { surfaceStore } = await import('../src/surfaces.ts');

const here = dirname(fileURLToPath(import.meta.url));
const fixture = (name) => JSON.parse(readFileSync(join(here, 'fixtures/a2ui-v1', name), 'utf-8'));

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

// Key order is not meaning: authored specs put `slots` and `props` in either order.
const canonical = (v) =>
  Array.isArray(v)
    ? v.map(canonical)
    : v && typeof v === 'object'
      ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canonical(v[k])]))
      : v;

function assertDeepEqual(actual, expected, message) {
  const a = JSON.stringify(canonical(actual));
  const e = JSON.stringify(canonical(expected));
  if (a !== e) throw new Error(`${message ?? 'not deep-equal'}:\n      expected ${e.slice(0, 400)}\n      got      ${a.slice(0, 400)}`);
}

// ─── Official-schema validators ──────────────────────────────────────────────

const V1_BASE = 'https://a2ui.org/specification/v1_0/';
const catalog = buildV1Catalog();
const ajv = new Ajv2020({ strict: false, allErrors: true, discriminator: false });
ajv.addSchema(fixture('common_types.json'));
ajv.addSchema({ ...catalog, $id: `${V1_BASE}catalog.json` });
const validateEnvelope = ajv.compile(fixture('agent_to_renderer.json'));
const validateCatalogDef = ajv.compile(fixture('catalog_definition.json'));

const errorsOf = (v) => (v.errors ?? []).slice(0, 5).map((e) => `${e.instancePath} ${e.message}`).join('; ');

// ─── Authored specs to round-trip ────────────────────────────────────────────

const require = createRequire(import.meta.url);
const a2uiDir = dirname(require.resolve('@tmorrow/cre8-wc/a2ui/catalog.json'));
const authored = [
  ...readdirSync(join(a2uiDir, 'examples')).map((f) => [`examples/${f}`, JSON.parse(readFileSync(join(a2uiDir, 'examples', f), 'utf-8'))]),
  ...readdirSync(join(a2uiDir, 'patterns')).map((f) => [`patterns/${f}`, JSON.parse(readFileSync(join(a2uiDir, 'patterns', f), 'utf-8')).spec]),
];

const msg = (type, body) => ({ version: '1.0', [type]: body });

// ─── Catalog ─────────────────────────────────────────────────────────────────

await test('catalog conforms to the official v1.0 catalog_definition schema', () => {
  assert(validateCatalogDef(catalog), errorsOf(validateCatalogDef));
});

await test('catalog covers every cre8 component plus Text, with UAX #31 names', () => {
  const map = getV1Mapping();
  const types = Object.keys(catalog.components);
  assert(types.length === map.byTag.size + 1, `expected ${map.byTag.size + 1} components, got ${types.length}`);
  assert(types.includes('Text') && types.includes('Cre8Button'), 'missing Text or Cre8Button');
  for (const t of types) assert(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t), `bad type ${t}`);
  assert(catalog.protocolVersion === '1.0', 'protocolVersion');
});

await test('catalog maps hyphenated props and colliding slot names apart', () => {
  const field = getV1Mapping().byTag.get('cre8-field');
  assert(field.propToV1.get('fieldNote') === 'fieldNote', 'prop fieldNote kept');
  assert(field.slotToV1.get('fieldNote') === 'slot_fieldNote', 'slot fieldNote prefixed');
  const props = JSON.stringify(catalog);
  assert(!props.includes('"aria-label":'), 'a hyphenated property name leaked into the catalog');
});

await test('catalog view for one component accepts tag or v1 type', () => {
  const byTag = JSON.parse(handleA2uiV1({ mode: 'catalog', component: 'cre8-button' }));
  const byType = JSON.parse(handleA2uiV1({ mode: 'catalog', component: 'Cre8Button' }));
  assert(byTag.component === 'Cre8Button' && byType.cre8Tag === 'cre8-button', 'lookup');
  assert(byTag.sharedNativeEventHandlers.includes('on_click'), 'native handlers listed');
});

await test('catalog defaults to a compact summary; full returns the schema', () => {
  const summary = handleA2uiV1({ mode: 'catalog' });
  const parsed = JSON.parse(summary);
  assert(summary.length < 40_000, `summary is ${summary.length} bytes`);
  assert(parsed.components.some((c) => c.type === 'Cre8Card' && c.content.includes('slot_header')), 'card slots listed');
  assertDeepEqual(JSON.parse(handleA2uiV1({ mode: 'catalog', full: true })), catalog);
});

// Negative controls: without these, a validator that accepts everything would
// make every "validates against the official schema" test above and below vacuous.
await test('envelope validator rejects what the cre8 catalog does not allow', () => {
  const cs = (components) => msg('createSurface', { surfaceId: 'n', components });
  const bad = [
    ['unknown property', cs([{ id: 'root', component: 'Cre8Button', bogus: 1 }])],
    ['enum violation', cs([{ id: 'root', component: 'Cre8Button', variant: 'bogus' }])],
    ['basic-catalog type', cs([{ id: 'root', component: 'Row', children: [] }])],
    ['string in a ChildList', cs([{ id: 'root', component: 'Cre8LayoutSection', children: [{ text: 'x' }] }])],
    ['theme', msg('createSurface', { surfaceId: 'n', theme: {} })],
  ];
  for (const [name, m] of bad) assert(!validateEnvelope(m), `${name} was accepted`);
  assert(validateEnvelope(cs([{ id: 'root', component: 'Cre8Button', variant: 'primary', text: { '@path': '/t' } }])), errorsOf(validateEnvelope));
});

// ─── Export ──────────────────────────────────────────────────────────────────

for (const [name, spec] of authored) {
  await test(`export ${name} validates against agent_to_renderer and round-trips`, () => {
    const { messages } = exportV1({ spec, surfaceId: 'roundtrip' });
    assert(messages.length === 1, 'one createSurface message');
    assert(validateEnvelope(messages[0]), errorsOf(validateEnvelope));
    const ids = messages[0].createSurface.components.map((c) => c.id);
    assert(new Set(ids).size === ids.length, 'ids are unique');
    const back = importV1(messages);
    assert(back.ok, back.errors.join('; '));
    assertDeepEqual(back.surfaces[0].spec, spec, 'import(export(spec)) !== spec');
  });
}

const BOUND = {
  component: 'cre8-layout-section',
  children: [
    { component: 'cre8-heading', props: { type: 'headline-large' }, children: ['Orders'] },
    {
      component: 'cre8-button',
      props: { text: { $bind: '/cta/label', default: 'Continue' }, variant: { $bind: '/cta/variant' } },
      events: { click: { handler: 'next', preventDefault: true } },
    },
  ],
};

await test('export turns $bind into @path and seeds defaults into dataModel', () => {
  const { messages } = exportV1({ spec: BOUND, data: { cta: { variant: 'secondary' } }, surfaceId: 's1' });
  const cs = messages[0].createSurface;
  assert(validateEnvelope(messages[0]), errorsOf(validateEnvelope));
  const button = cs.components.find((c) => c.component === 'Cre8Button');
  assertDeepEqual(button.text, { '@path': '/cta/label' });
  assertDeepEqual(button.on_click, { event: { name: 'next' } });
  assertDeepEqual(button['@metadata'], { extensions: { cre8: { eventOptions: { click: { preventDefault: true } } } } });
  assertDeepEqual(cs.dataModel, { cta: { variant: 'secondary', label: 'Continue' } });
  const text = cs.components.find((c) => c.component === 'Text');
  assert(text && text.text === 'Orders', 'text node became a Text component');
});

await test('import restores bindings and event options', () => {
  const { messages } = exportV1({ spec: BOUND, data: { cta: { variant: 'secondary' } }, surfaceId: 's1' });
  const r = importV1(messages);
  assert(r.ok, r.errors.join('; '));
  const button = r.surfaces[0].spec.children[1];
  assertDeepEqual(button.props.text, { $bind: '/cta/label' });
  assertDeepEqual(button.events, { click: { handler: 'next', preventDefault: true } });
});

await test('export refuses a spec cre8 itself would reject', () => {
  let threw = false;
  try {
    exportV1({ spec: { component: 'cre8-button', props: { variant: 'bogus' } }, surfaceId: 'x' });
  } catch {
    threw = true;
  }
  assert(threw, 'invalid enum value was exported');
});

await test('export a live surface by surfaceId', () => {
  const s = surfaceStore.create({ root: BOUND, data: { cta: { label: 'Go' } } });
  try {
    const out = JSON.parse(handleA2uiV1({ mode: 'export', surfaceId: s.surfaceId }));
    const cs = out.messages[0].createSurface;
    assert(cs.surfaceId === s.surfaceId, 'surfaceId carried over');
    assert(cs.dataModel.cta.label === 'Go', 'live data exported');
    assert(out.jsonl.split('\n').length === 1, 'jsonl form');
  } finally {
    surfaceStore.close(s.surfaceId);
  }
});

// ─── Import: a stream an external v1.0 agent might send ──────────────────────

await test('import applies a multi-message stream in order', () => {
  const r = importV1([
    msg('createSurface', { surfaceId: 'main', catalogId: getV1Mapping().catalogId }),
    msg('updateComponents', {
      surfaceId: 'main',
      components: [
        { id: 'root', component: 'Cre8LayoutSection', children: ['title', 'cta'] },
        { id: 'title', component: 'Cre8Heading', type: 'headline-large', children: ['title_text'] },
        { id: 'title_text', component: 'Text', text: 'Hello' },
      ],
    }),
    msg('updateComponents', {
      surfaceId: 'main',
      components: [{ id: 'cta', component: 'Cre8Button', text: { '@path': '/label' }, on_click: { event: { name: 'go' } } }],
    }),
    msg('updateDataModel', { surfaceId: 'main', path: '/label', value: 'Start' }),
    msg('updateDataModel', { surfaceId: 'main', path: '/scratch', value: 1 }),
    msg('updateDataModel', { surfaceId: 'main', path: '/scratch', value: null }),
  ]);
  assert(r.ok, r.errors.join('; '));
  const s = r.surfaces[0];
  assertDeepEqual(s.data, { label: 'Start' });
  assertDeepEqual(s.spec, {
    component: 'cre8-layout-section',
    children: [
      { component: 'cre8-heading', props: { type: 'headline-large' }, children: ['Hello'] },
      { component: 'cre8-button', props: { text: { $bind: '/label' } }, events: { click: 'go' } },
    ],
  });
});

await test('import accepts JSONL', () => {
  const jsonl = [
    msg('createSurface', { surfaceId: 'j', components: [{ id: 'root', component: 'Cre8Button', text: 'Hi' }] }),
  ].map((m) => JSON.stringify(m)).join('\n');
  const r = importV1(jsonl);
  assert(r.ok && r.surfaces[0].spec.props.text === 'Hi', r.errors.join('; '));
});

await test('deleteSurface removes a surface from the result', () => {
  const r = importV1([
    msg('createSurface', { surfaceId: 'gone', components: [{ id: 'root', component: 'Cre8Button', text: 'x' }] }),
    msg('deleteSurface', { surfaceId: 'gone' }),
  ]);
  assert(r.ok && r.surfaces.length === 0, 'surface not deleted');
});

const rejects = [
  ['wrong version', [{ version: '0.9', createSurface: { surfaceId: 'a' } }], 'version must be "1.0"'],
  ['theme on createSurface', [msg('createSurface', { surfaceId: 'a', theme: {}, components: [{ id: 'root', component: 'Cre8Button', text: 'x' }] })], 'theme'],
  ['duplicate createSurface', [msg('createSurface', { surfaceId: 'a' }), msg('createSurface', { surfaceId: 'a' })], 'INTEGRITY_ERROR'],
  ['update before create', [msg('updateComponents', { surfaceId: 'nope', components: [{ id: 'root', component: 'Cre8Button' }] })], 'never created'],
  ['no root', [msg('createSurface', { surfaceId: 'a', components: [{ id: 'x', component: 'Cre8Button' }] })], 'no component with id "root"'],
  ['unknown component', [msg('createSurface', { surfaceId: 'a', components: [{ id: 'root', component: 'Row' }] })], 'not in the cre8 v1.0 catalog'],
  ['unknown property', [msg('createSurface', { surfaceId: 'a', components: [{ id: 'root', component: 'Cre8Button', bogus: 1 }] })], '"bogus" is not a property'],
  ['dangling child', [msg('createSurface', { surfaceId: 'a', components: [{ id: 'root', component: 'Cre8LayoutSection', children: ['ghost'] }] })], 'never defined'],
  ['cycle', [msg('createSurface', { surfaceId: 'a', components: [
    { id: 'root', component: 'Cre8LayoutSection', children: ['a1'] },
    { id: 'a1', component: 'Cre8LayoutSection', children: ['a2'] },
    { id: 'a2', component: 'Cre8LayoutSection', children: ['a1'] },
  ] })], 'two parents'],
  ['function call binding', [msg('createSurface', { surfaceId: 'a', components: [{ id: 'root', component: 'Cre8Button', text: { '@call': 'formatString', args: {} } }] })], 'function calls are not supported'],
  ['ChildList template', [msg('createSurface', { surfaceId: 'a', components: [{ id: 'root', component: 'Cre8LayoutSection', children: { componentId: 'row', path: '/items' } }] })], 'templates are not supported'],
  ['non-UAX#31 id', [msg('createSurface', { surfaceId: 'a', components: [{ id: 'root', component: 'Cre8LayoutSection', children: ['my-text'] }, { id: 'my-text', component: 'Text', text: 'x' }] })], 'UAX #31'],
  ['bad enum after mapping', [msg('createSurface', { surfaceId: 'a', components: [{ id: 'root', component: 'Cre8Button', variant: 'bogus' }] })], 'bogus'],
];

for (const [name, messages, needle] of rejects) {
  await test(`import rejects: ${name}`, () => {
    const r = importV1(messages);
    assert(!r.ok, 'expected failure');
    assert(r.surfaces.length === 0, 'no surfaces on failure');
    assert(r.errors.some((e) => e.includes(needle)), `no error mentioning ${JSON.stringify(needle)}: ${r.errors.join(' | ')}`);
  });
}

await test('import warns (not fails) on dropped action context and orphans', () => {
  const r = importV1([
    msg('createSurface', {
      surfaceId: 'w',
      components: [
        { id: 'root', component: 'Cre8Button', text: 'x', on_click: { event: { name: 'go', context: { id: 1 } } } },
        { id: 'orphan', component: 'Text', text: 'unused' },
      ],
    }),
  ]);
  assert(r.ok, r.errors.join('; '));
  assert(r.warnings.some((w) => w.includes('context')), 'context warning');
  assert(r.warnings.some((w) => w.includes('orphan')), 'orphan warning');
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
