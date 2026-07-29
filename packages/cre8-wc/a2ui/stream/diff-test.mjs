/**
 * Tests for the spec differ.
 *
 *   npx tsx a2ui/stream/diff-test.mjs
 *
 * The load-bearing test is the round trip: for every ordered pair of shipped
 * example specs, applying `diffSpecs(a, b)` to a surface holding `a` must
 * produce exactly `b`. A differ that is merely plausible passes unit tests; only
 * the round trip catches an op that addresses the wrong index.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WC = resolve(__dirname, '../..');
const catalogJson = JSON.parse(readFileSync(resolve(WC, 'a2ui/catalog.json'), 'utf8'));

const dom = new JSDOM('<!doctype html><html><body></body></html>');
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;

const { registerCatalog } = await import('../index.ts');
const { SurfaceModel, SurfaceRenderer, diffSpecs } = await import('./index.ts');
const catalog = registerCatalog(catalogJson);

let passed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
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

/** Apply a diff through the real model, so ops face real validation. */
function applyDiff(prev, next) {
  const model = new SurfaceModel(catalog, { surfaceId: 's' });
  model.apply({
    v: 1,
    type: 'surface.create',
    surfaceId: 's',
    seq: 0,
    catalogId: catalog.id,
    root: prev ?? undefined,
  });
  const ops = diffSpecs(prev, next);
  if (ops.length) {
    model.apply({ v: 1, type: 'surface.patch', surfaceId: 's', seq: 1, ops });
  }
  return { ops, root: model.root };
}

/**
 * Key order carries no meaning in a spec, and `setProps` merges into an existing
 * object — so a correctly patched tree serialises with its keys in the original
 * order, not the target's. Comparing raw JSON.stringify reports that as a
 * failure. Sort first.
 */
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, canonical(value[k])]));
  }
  return value;
}

function roundTrip(prev, next, label) {
  const { ops, root } = applyDiff(prev, next);
  const got = JSON.stringify(canonical(root ?? null));
  const want = JSON.stringify(canonical(next ?? null));
  if (got !== want) {
    throw new Error(
      `${label}: diff did not reproduce the target\n      ops: ${JSON.stringify(ops)}\n      got:  ${got.slice(0, 300)}\n      want: ${want.slice(0, 300)}`
    );
  }
  return ops;
}

const container = (children) => ({ component: 'cre8-layout-container', children });
const heading = (text, props = {}) => ({ component: 'cre8-heading', props, children: [text] });

// ─── the properties that matter ─────────────────────────────────────────────

test('an unchanged tree costs nothing', () => {
  const tree = container([heading('One'), heading('Two')]);
  const ops = diffSpecs(tree, JSON.parse(JSON.stringify(tree)));
  assertEqual(ops.length, 0, 'resending an identical spec must be free');
});

test('a changed prop becomes setProps, not a replacement', () => {
  const prev = container([{ component: 'cre8-button', props: { text: 'Save', variant: 'primary' } }]);
  const next = container([{ component: 'cre8-button', props: { text: 'Save', variant: 'secondary' } }]);
  const ops = roundTrip(prev, next, 'prop change');
  assertEqual(ops.length, 1);
  assertEqual(ops[0].op, 'setProps', 'the element must survive, so its focus and animation do');
  assertEqual(ops[0].path, '$.children[0]');
  assert(!('text' in ops[0].props), 'only what changed should be sent');
});

test('a dropped prop is sent as null', () => {
  const prev = container([{ component: 'cre8-button', props: { text: 'Save', variant: 'primary' } }]);
  const next = container([{ component: 'cre8-button', props: { text: 'Save' } }]);
  const ops = roundTrip(prev, next, 'prop removal');
  assertEqual(ops[0].props.variant, null);
});

test('changed text becomes setText rather than a rebuild', () => {
  const prev = container([heading('Before')]);
  const next = container([heading('After')]);
  const ops = roundTrip(prev, next, 'text change');
  assertEqual(ops.length, 1);
  assertEqual(ops[0].op, 'setText');
  assertEqual(ops[0].text, 'After');
});

test('a new trailing child is a single append', () => {
  const prev = container([heading('One')]);
  const next = container([heading('One'), heading('Two')]);
  const ops = roundTrip(prev, next, 'append');
  assertEqual(ops.length, 1);
  assertEqual(ops[0].op, 'append');
  assertEqual(ops[0].nodes.length, 1);
});

test('a dropped trailing child is a single remove', () => {
  const prev = container([heading('One'), heading('Two')]);
  const next = container([heading('One')]);
  const ops = roundTrip(prev, next, 'remove');
  assertEqual(ops.length, 1);
  assertEqual(ops[0].op, 'remove');
  assertEqual(ops[0].path, '$.children[1]');
});

test('several dropped children are removed back to front', () => {
  const prev = container([heading('a'), heading('b'), heading('c')]);
  const next = container([heading('a')]);
  const ops = roundTrip(prev, next, 'multi remove');
  assertEqual(ops.map((o) => o.path).join(','), '$.children[2],$.children[1]',
    'removing front-first would renumber the siblings still to be removed');
});

test('a different component at the same position is replaced', () => {
  const prev = container([heading('One')]);
  const next = container([{ component: 'cre8-text-passage', children: ['One'] }]);
  const ops = roundTrip(prev, next, 'type change');
  assertEqual(ops[0].op, 'replace');
});

test('slots are diffed independently of children', () => {
  const prev = container([
    { component: 'cre8-card', slots: { header: [heading('H')], default: [{ component: 'cre8-text-passage', children: ['Body'] }] } },
  ]);
  const next = container([
    { component: 'cre8-card', slots: { header: [heading('H2')], default: [{ component: 'cre8-text-passage', children: ['Body'] }] } },
  ]);
  const ops = roundTrip(prev, next, 'slot change');
  assertEqual(ops.length, 1, 'only the header changed');
  assert(ops[0].path.includes('slots.header'), `expected a header path, got ${ops[0].path}`);
});

test('a removed slot is cleared', () => {
  const prev = container([{ component: 'cre8-card', slots: { header: [heading('H')], default: [heading('B')] } }]);
  const next = container([{ component: 'cre8-card', slots: { default: [heading('B')] } }]);
  roundTrip(prev, next, 'slot removal');
});

test('event bindings are added, changed, and removed', () => {
  const button = (events) => container([{ component: 'cre8-button', props: { text: 'Go' }, ...(events ? { events } : {}) }]);
  roundTrip(button(null), button({ click: 'go' }), 'add event');
  roundTrip(button({ click: 'go' }), button({ click: 'went' }), 'change event');
  const ops = roundTrip(button({ click: 'go' }), button(null), 'remove event');
  assertEqual(ops[0].events.click, null);
});

test('nested change touches only the node that changed', () => {
  const build = (label) => container([
    { component: 'cre8-card', slots: { footer: [{ component: 'cre8-button', props: { text: label } }] } },
  ]);
  const ops = roundTrip(build('Old'), build('New'), 'nested');
  assertEqual(ops.length, 1);
  assertEqual(ops[0].path, '$.children[0].slots.footer[0]');
});

test('a null target clears the surface; a new root replaces it', () => {
  assertEqual(diffSpecs(container([]), null)[0].op, 'remove');
  assertEqual(diffSpecs(null, container([]))[0].op, 'replace');
  assertEqual(diffSpecs(null, null).length, 0);
});

test('a different root component is a root replace', () => {
  const ops = diffSpecs(container([]), { component: 'cre8-grid' });
  assertEqual(ops.length, 1);
  assertEqual(ops[0].path, '$');
  assertEqual(ops[0].op, 'replace');
});

// ─── the round trip, over real specs ────────────────────────────────────────

const examplesDir = resolve(WC, 'a2ui/examples');
const examples = readdirSync(examplesDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({ name: f, spec: JSON.parse(readFileSync(join(examplesDir, f), 'utf8')) }));

test(`every ordered pair of the ${examples.length} shipped examples round-trips`, () => {
  let pairs = 0;
  for (const from of examples) {
    for (const to of examples) {
      roundTrip(from.spec, to.spec, `${from.name} → ${to.name}`);
      pairs++;
    }
  }
  assert(pairs >= 25, `expected at least 25 pairs, ran ${pairs}`);
});

test('diffing a real spec against a small edit of itself stays small', () => {
  const source = examples.find((e) => e.name === 'compound-families.json') ?? examples[0];
  const edited = JSON.parse(JSON.stringify(source.spec));
  // Change one leaf deep in the tree.
  const target = edited.children.find((c) => c.component === 'cre8-tag-list');
  assert(target, 'expected a tag list in the example');
  target.children[0].props.text = 'Edited';
  const ops = roundTrip(source.spec, edited, 'small edit');
  assertEqual(ops.length, 1, `a one-word change should cost one op, got ${JSON.stringify(ops)}`);
  assertEqual(ops[0].op, 'setProps');
});

// ─── the point of diffing at all ────────────────────────────────────────────

test('resending the whole tree keeps the elements that did not change', () => {
  const host = dom.window.document.createElement('div');
  dom.window.document.body.appendChild(host);
  const model = new SurfaceModel(catalog, { surfaceId: 's' });
  const renderer = new SurfaceRenderer(model, { root: host, doc: dom.window.document });

  const build = (headline) => ({
    component: 'cre8-layout-container',
    children: [
      { component: 'cre8-heading', props: { tagVariant: 'h1' }, children: [headline] },
      { component: 'cre8-field', props: { label: 'Your name' } },
      { component: 'cre8-button', props: { text: 'Continue', variant: 'primary' } },
    ],
  });

  renderer.apply({
    v: 1, type: 'surface.create', surfaceId: 's', seq: 0, catalogId: catalog.id, root: build('Before'),
  });
  const field = renderer.elementAt('$.children[1]');
  const button = renderer.elementAt('$.children[2]');
  field.dataset.userTyped = 'Ada Lovelace';

  const ops = diffSpecs(model.root, build('After'));
  renderer.apply({ v: 1, type: 'surface.patch', surfaceId: 's', seq: 1, ops });

  assertEqual(renderer.elementAt('$.children[0]').textContent, 'After', 'the change lands');
  assertEqual(renderer.elementAt('$.children[1]'), field, 'the untouched field is the same element');
  assertEqual(renderer.elementAt('$.children[1]').dataset.userTyped, 'Ada Lovelace',
    'so whatever the user had put in it survives');
  assertEqual(renderer.elementAt('$.children[2]'), button, 'and so does the button');
});

test('replacing the root instead would have destroyed all of it', () => {
  const host = dom.window.document.createElement('div');
  dom.window.document.body.appendChild(host);
  const model = new SurfaceModel(catalog, { surfaceId: 's' });
  const renderer = new SurfaceRenderer(model, { root: host, doc: dom.window.document });
  const tree = { component: 'cre8-layout-container', children: [{ component: 'cre8-field', props: { label: 'Name' } }] };

  renderer.apply({ v: 1, type: 'surface.create', surfaceId: 's', seq: 0, catalogId: catalog.id, root: tree });
  const field = renderer.elementAt('$.children[0]');

  // The naive alternative to a diff.
  renderer.apply({
    v: 1, type: 'surface.patch', surfaceId: 's', seq: 1,
    ops: [{ op: 'replace', path: '$', node: JSON.parse(JSON.stringify(tree)) }],
  });
  assert(renderer.elementAt('$.children[0]') !== field,
    'a root replace remounts everything — this is the cost the differ avoids');
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
