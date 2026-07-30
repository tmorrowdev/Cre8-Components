/**
 * Tests for the A2UI streaming surface layer.
 *
 *   npx tsx a2ui/stream/stream-test.mjs
 *
 * Covers the model's apply-semantics (including that a rejected patch leaves the
 * surface untouched), binding resolution, path shifting, and the renderer's
 * incremental DOM behaviour under jsdom.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const catalogJson = JSON.parse(readFileSync(resolve(__dirname, '../catalog.json'), 'utf8'));

const dom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>');
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Event = dom.window.Event;
globalThis.CustomEvent = dom.window.CustomEvent;

const { registerCatalog } = await import('../index.ts');
const { SurfaceModel, SurfaceRenderer, SurfaceSeqGapError } = await import('./index.ts');

const catalog = registerCatalog(catalogJson);

let passed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok  ${name}`);
  } catch (err) {
    failures.push({ name, err });
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

function assertThrows(fn, match, message) {
  let threw = null;
  try {
    fn();
  } catch (err) {
    threw = err;
  }
  if (!threw) throw new Error(`${message ?? 'expected a throw'} — nothing was thrown`);
  if (match && !String(threw.message).includes(match)) {
    throw new Error(`${message ?? 'wrong error'}: expected message containing "${match}", got "${threw.message}"`);
  }
  return threw;
}

function newModel(options = {}) {
  const model = new SurfaceModel(catalog, { surfaceId: 's1', ...options });
  model.apply({
    v: 1,
    type: 'surface.create',
    surfaceId: 's1',
    seq: 0,
    catalogId: catalog.id,
    root: { component: 'cre8-layout-container' },
    data: options.data ?? {},
  });
  return model;
}

function patch(model, ops, seq) {
  return model.apply({
    v: 1,
    type: 'surface.patch',
    surfaceId: model.surfaceId,
    seq: seq ?? model.seq + 1,
    ops,
  });
}

// ─── model: structure ───────────────────────────────────────────────────────

test('create establishes a validated root', () => {
  const model = newModel();
  assertEqual(model.root.component, 'cre8-layout-container');
  assertEqual(model.state, 'streaming');
});

test('create rejects a root that fails validation, before any state changes', () => {
  const model = new SurfaceModel(catalog, { surfaceId: 's1' });
  assertThrows(
    () =>
      model.apply({
        v: 1,
        type: 'surface.create',
        surfaceId: 's1',
        seq: 0,
        catalogId: catalog.id,
        root: { component: 'cre8-nonexistent' },
      }),
    'not registered in catalog'
  );
  assertEqual(model.root, null);
});

test('create rejects a catalogId that is not the registered one', () => {
  const model = new SurfaceModel(catalog, { surfaceId: 's1' });
  assertThrows(
    () =>
      model.apply({
        v: 1,
        type: 'surface.create',
        surfaceId: 's1',
        seq: 0,
        catalogId: 'some-other-catalog',
      }),
    'does not match registered catalog'
  );
});

test('append adds to children and the node is addressable by path', () => {
  const model = newModel();
  patch(model, [
    {
      op: 'append',
      path: '$',
      nodes: [{ component: 'cre8-heading', props: { tagVariant: 'h1' }, children: ['Live'] }],
    },
  ]);
  assertEqual(model.root.children.length, 1);
  assertEqual(model.nodeAt('$.children[0]').component, 'cre8-heading');
});

test('append into a named slot works and is path-addressable', () => {
  const model = newModel();
  patch(model, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-card' }] }]);
  patch(model, [
    {
      op: 'append',
      path: '$.children[0]',
      slot: 'footer',
      nodes: [{ component: 'cre8-button', props: { text: 'Upgrade', variant: 'primary' } }],
    },
  ]);
  assertEqual(model.nodeAt('$.children[0].slots.footer[0]').props.text, 'Upgrade');
});

test('the children-vs-slots rule is enforced, and a rejected patch changes nothing', () => {
  const model = newModel();
  patch(model, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-card' }] }]);
  const before = JSON.stringify(model.root);
  assertThrows(
    () => patch(model, [{ op: 'append', path: '$.children[0]', nodes: ['illegal body text'] }]),
    'does not accept default children'
  );
  assertEqual(JSON.stringify(model.root), before, 'surface must be untouched after a rejected patch');
});

test('an undeclared slot is rejected', () => {
  const model = newModel();
  patch(model, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-card' }] }]);
  assertThrows(
    () =>
      patch(model, [
        { op: 'append', path: '$.children[0]', slot: 'nope', nodes: [{ component: 'cre8-heading' }] },
      ]),
    'not a declared slot'
  );
});

test('a bad enum value is rejected with a path-qualified message', () => {
  const model = newModel();
  const err = assertThrows(
    () =>
      patch(model, [
        { op: 'append', path: '$', nodes: [{ component: 'cre8-button', props: { variant: 'bogus' } }] },
      ]),
    'not in enum'
  );
  assert(err.message.includes('props.variant'), `message should name the prop path, got: ${err.message}`);
});

test('remove splices and later siblings shift down', () => {
  const model = newModel();
  patch(model, [
    {
      op: 'append',
      path: '$',
      nodes: [
        { component: 'cre8-heading', children: ['one'] },
        { component: 'cre8-heading', children: ['two'] },
        { component: 'cre8-heading', children: ['three'] },
      ],
    },
  ]);
  patch(model, [{ op: 'remove', path: '$.children[0]' }]);
  assertEqual(model.root.children.length, 2);
  assertEqual(model.nodeAt('$.children[0]').children[0], 'two');
});

test('insert places a node at an index and rejects an out-of-range one', () => {
  const model = newModel();
  patch(model, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-heading', children: ['b'] }] }]);
  patch(model, [
    { op: 'insert', path: '$', index: 0, nodes: [{ component: 'cre8-heading', children: ['a'] }] },
  ]);
  assertEqual(model.nodeAt('$.children[0]').children[0], 'a');
  assertThrows(
    () => patch(model, [{ op: 'insert', path: '$', index: 9, nodes: [] }]),
    'out of range'
  );
});

test('clear empties a container and does not leave an illegal empty children array', () => {
  const model = newModel();
  patch(model, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-card' }] }]);
  patch(model, [
    {
      op: 'append',
      path: '$.children[0]',
      slot: 'default',
      nodes: [{ component: 'cre8-text-passage', children: ['x'] }],
    },
  ]);
  patch(model, [{ op: 'clear', path: '$.children[0]', slot: 'default' }]);
  assertEqual(model.nodeAt('$.children[0]').slots, undefined, 'emptied slots map should be pruned');
});

test('replace at $ swaps the root; remove at $ clears it', () => {
  const model = newModel();
  patch(model, [{ op: 'replace', path: '$', node: { component: 'cre8-grid' } }]);
  assertEqual(model.root.component, 'cre8-grid');
  patch(model, [{ op: 'remove', path: '$' }]);
  assertEqual(model.root, null);
});

// ─── model: props, text, data ───────────────────────────────────────────────

test('setProps merges, and a null value deletes a prop', () => {
  const model = newModel();
  patch(model, [
    { op: 'append', path: '$', nodes: [{ component: 'cre8-button', props: { text: 'Go', variant: 'primary' } }] },
  ]);
  patch(model, [{ op: 'setProps', path: '$.children[0]', props: { variant: 'secondary' } }]);
  assertEqual(model.nodeAt('$.children[0]').props.variant, 'secondary');
  assertEqual(model.nodeAt('$.children[0]').props.text, 'Go', 'merge must not drop other props');
  patch(model, [{ op: 'setProps', path: '$.children[0]', props: { variant: null } }]);
  assertEqual('variant' in model.nodeAt('$.children[0]').props, false);
});

test('appendText concatenates into the trailing text node — the token path', () => {
  const model = newModel();
  patch(model, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-text-passage' }] }]);
  const first = patch(model, [{ op: 'appendText', path: '$.children[0]', text: 'Hel' }]);
  assertEqual(first.changes[0].kind, 'content', 'first token creates the text node');
  const second = patch(model, [{ op: 'appendText', path: '$.children[0]', text: 'lo' }]);
  assertEqual(second.changes[0].kind, 'text', 'later tokens take the cheap path');
  assertEqual(model.nodeAt('$.children[0]').children[0], 'Hello');
});

test('setText replaces the whole content list', () => {
  const model = newModel();
  patch(model, [
    { op: 'append', path: '$', nodes: [{ component: 'cre8-text-passage', children: ['old', 'er'] }] },
  ]);
  patch(model, [{ op: 'setText', path: '$.children[0]', text: 'new' }]);
  assertEqual(JSON.stringify(model.nodeAt('$.children[0]').children), JSON.stringify(['new']));
});

test('a bound prop resolves from the data model', () => {
  const model = newModel({ data: { cta: { label: 'Buy now' } } });
  patch(model, [
    {
      op: 'append',
      path: '$',
      nodes: [{ component: 'cre8-button', props: { text: { $bind: '/cta/label' } } }],
    },
  ]);
  assertEqual(model.snapshot().children[0].props.text, 'Buy now');
  assertEqual(model.nodeAt('$.children[0]').props.text.$bind, '/cta/label', 'raw tree keeps the binding');
});

test('an unresolved binding falls back to default, then drops out entirely', () => {
  const model = newModel();
  patch(model, [
    {
      op: 'append',
      path: '$',
      nodes: [
        {
          component: 'cre8-button',
          props: { text: { $bind: '/missing', default: 'Fallback' }, variant: { $bind: '/nope' } },
        },
      ],
    },
  ]);
  const resolved = model.snapshot().children[0].props;
  assertEqual(resolved.text, 'Fallback');
  assertEqual('variant' in resolved, false, 'an unresolvable binding with no default must not emit undefined');
});

test('surface.data updates bound values', () => {
  const model = newModel({ data: { cta: 'Buy' } });
  patch(model, [
    { op: 'append', path: '$', nodes: [{ component: 'cre8-button', props: { text: { $bind: '/cta' } } }] },
  ]);
  model.apply({
    v: 1,
    type: 'surface.data',
    surfaceId: 's1',
    seq: model.seq + 1,
    patches: [{ pointer: '/cta', value: 'Checkout' }],
  });
  assertEqual(model.snapshot().children[0].props.text, 'Checkout');
});

test('a bound value of the wrong type is caught by the prop schema', () => {
  const model = newModel({ data: { cta: 'Buy' } });
  patch(model, [
    { op: 'append', path: '$', nodes: [{ component: 'cre8-button', props: { text: { $bind: '/cta' } } }] },
  ]);
  assertThrows(
    () =>
      model.apply({
        v: 1,
        type: 'surface.data',
        surfaceId: 's1',
        seq: model.seq + 1,
        patches: [{ pointer: '/cta', value: 42 }],
      }),
    'expected type string'
  );
});

test('a rolled-back patch is flagged so a renderer knows to remount', () => {
  const model = newModel();
  patch(model, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-heading', children: ['a'] }] }]);
  const err = assertThrows(
    () =>
      patch(model, [
        { op: 'append', path: '$', nodes: [{ component: 'cre8-heading', children: ['b'] }] },
        { op: 'append', path: '$', nodes: [{ component: 'cre8-nope' }] },
      ]),
    'not registered in catalog'
  );
  assertEqual(err.rolledBack, true);
  assertEqual(model.root.children.length, 1, 'the first op in the failed message must not survive');
});

test('surface.data that would make the tree invalid is rejected and the data is unchanged', () => {
  const model = newModel({ data: { v: 'primary' } });
  patch(model, [
    { op: 'append', path: '$', nodes: [{ component: 'cre8-button', props: { variant: { $bind: '/v' } } }] },
  ]);
  assertThrows(
    () =>
      model.apply({
        v: 1,
        type: 'surface.data',
        surfaceId: 's1',
        seq: model.seq + 1,
        patches: [{ pointer: '/v', value: 'bogus' }],
      }),
    'not in enum'
  );
  assertEqual(model.data.v, 'primary');
});

test('a data pointer can be removed', () => {
  const model = newModel({ data: { a: { b: 1 } } });
  model.apply({
    v: 1,
    type: 'surface.data',
    surfaceId: 's1',
    seq: model.seq + 1,
    patches: [{ pointer: '/a/b', op: 'remove' }],
  });
  assertEqual('b' in model.data.a, false);
});

// ─── model: envelope ────────────────────────────────────────────────────────

test('a sequence gap is reported rather than silently applied', () => {
  const model = newModel();
  const err = assertThrows(() => patch(model, [], model.seq + 5), 'out of order');
  assert(err instanceof SurfaceSeqGapError, 'should raise SurfaceSeqGapError');
});

test('an unknown protocol version is rejected', () => {
  const model = newModel();
  assertThrows(
    () => model.apply({ v: 99, type: 'surface.status', surfaceId: 's1', seq: model.seq + 1, state: 'done' }),
    'unsupported surface protocol version'
  );
});

test('status and delete move surface state', () => {
  const model = newModel();
  model.apply({ v: 1, type: 'surface.status', surfaceId: 's1', seq: model.seq + 1, state: 'done' });
  assertEqual(model.state, 'done');
  model.apply({ v: 1, type: 'surface.delete', surfaceId: 's1', seq: model.seq + 1 });
  assertEqual(model.root, null);
});

// ─── renderer ───────────────────────────────────────────────────────────────

function newRendered(options = {}) {
  const host = dom.window.document.createElement('div');
  dom.window.document.body.appendChild(host);
  const model = new SurfaceModel(catalog, { surfaceId: 's1' });
  const events = [];
  const renderer = new SurfaceRenderer(model, {
    root: host,
    doc: dom.window.document,
    onEvent: (e) => events.push(e),
    ...options,
  });
  renderer.apply({
    v: 1,
    type: 'surface.create',
    surfaceId: 's1',
    seq: 0,
    catalogId: catalog.id,
    root: { component: 'cre8-layout-container' },
  });
  return { host, model, renderer, events };
}

function rpatch(renderer, ops) {
  return renderer.apply({
    v: 1,
    type: 'surface.patch',
    surfaceId: renderer.model.surfaceId,
    seq: renderer.model.seq + 1,
    ops,
  });
}

test('renderer mounts the root and appends real elements', () => {
  const { host, renderer } = newRendered();
  assertEqual(host.firstElementChild.tagName.toLowerCase(), 'cre8-layout-container');
  rpatch(renderer, [
    {
      op: 'append',
      path: '$',
      nodes: [
        {
          component: 'cre8-heading',
          props: { tagVariant: 'h1', type: 'title-default' },
          children: ['Live'],
        },
      ],
    },
  ]);
  const heading = host.querySelector('cre8-heading');
  assert(heading, 'heading element should exist');
  // The catalog's x-kind decides attribute vs property, and the streaming
  // renderer must honour it the same way the one-shot renderer does.
  assertEqual(heading.tagVariant, 'h1', 'x-kind "property" props are set as JS properties');
  assertEqual(heading.getAttribute('type'), 'title-default', 'other props become attributes');
  assertEqual(heading.textContent, 'Live');
});

test('appending a sibling preserves the existing element instance', () => {
  const { renderer } = newRendered();
  rpatch(renderer, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-heading', children: ['a'] }] }]);
  const first = renderer.elementAt('$.children[0]');
  first.dataset.marker = 'kept';
  rpatch(renderer, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-heading', children: ['b'] }] }]);
  assertEqual(renderer.elementAt('$.children[0]').dataset.marker, 'kept');
  assertEqual(renderer.elementAt('$.children[1]').textContent, 'b');
});

test('inserting above a node moves it in the DOM without recreating it', () => {
  const { host, renderer } = newRendered();
  rpatch(renderer, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-heading', children: ['b'] }] }]);
  const original = renderer.elementAt('$.children[0]');
  rpatch(renderer, [
    { op: 'insert', path: '$', index: 0, nodes: [{ component: 'cre8-heading', children: ['a'] }] },
  ]);
  assertEqual(renderer.elementAt('$.children[1]'), original, 'the moved node must be the same element');
  const order = [...host.querySelectorAll('cre8-heading')].map((el) => el.textContent);
  assertEqual(order.join(','), 'a,b');
});

test('token streaming mutates one text node instead of replacing it', () => {
  const { renderer } = newRendered();
  rpatch(renderer, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-text-passage' }] }]);
  rpatch(renderer, [{ op: 'appendText', path: '$.children[0]', text: 'Hel' }]);
  const el = renderer.elementAt('$.children[0]');
  const textNode = el.firstChild;
  rpatch(renderer, [{ op: 'appendText', path: '$.children[0]', text: 'lo world' }]);
  assertEqual(el.firstChild, textNode, 'the same Text node should be reused across tokens');
  assertEqual(el.textContent, 'Hello world');
});

test('a removed prop is removed from the element', () => {
  const { renderer } = newRendered();
  rpatch(renderer, [
    { op: 'append', path: '$', nodes: [{ component: 'cre8-button', props: { text: 'Go', variant: 'secondary' } }] },
  ]);
  assertEqual(renderer.elementAt('$.children[0]').getAttribute('variant'), 'secondary');
  rpatch(renderer, [{ op: 'setProps', path: '$.children[0]', props: { variant: null } }]);
  assertEqual(renderer.elementAt('$.children[0]').hasAttribute('variant'), false);
});

test('slotted children get a slot attribute; text in a named slot is wrapped', () => {
  const { renderer } = newRendered();
  rpatch(renderer, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-card' }] }]);
  rpatch(renderer, [
    {
      op: 'append',
      path: '$.children[0]',
      slot: 'footer',
      nodes: [{ component: 'cre8-button', props: { text: 'Upgrade' } }],
    },
  ]);
  rpatch(renderer, [{ op: 'appendText', path: '$.children[0]', slot: 'header', text: 'Plan' }]);
  const card = renderer.elementAt('$.children[0]');
  assertEqual(card.querySelector('cre8-button').getAttribute('slot'), 'footer');
  assertEqual(card.querySelector('span[slot="header"]').textContent, 'Plan');
});

test('a data-model change re-resolves bound props on live elements', () => {
  const { renderer, model } = newRendered();
  rpatch(renderer, [
    { op: 'append', path: '$', nodes: [{ component: 'cre8-button', props: { text: { $bind: '/label' } } }] },
  ]);
  renderer.apply({
    v: 1,
    type: 'surface.data',
    surfaceId: 's1',
    seq: model.seq + 1,
    patches: [{ pointer: '/label', value: 'Checkout' }],
  });
  assertEqual(renderer.elementAt('$.children[0]').getAttribute('text'), 'Checkout');
});

test('an event reports the handler name and the node path as it stands now', () => {
  const { renderer, events } = newRendered();
  rpatch(renderer, [
    {
      op: 'append',
      path: '$',
      nodes: [{ component: 'cre8-button', props: { text: 'Go' }, events: { click: 'go-clicked' } }],
    },
  ]);
  rpatch(renderer, [
    { op: 'insert', path: '$', index: 0, nodes: [{ component: 'cre8-heading', children: ['title'] }] },
  ]);
  renderer.elementAt('$.children[1]').dispatchEvent(new dom.window.Event('click'));
  assertEqual(events.length, 1);
  assertEqual(events[0].handler, 'go-clicked');
  assertEqual(events[0].path, '$.children[1]', 'the path must reflect the tree at fire time, not at bind time');
});

test('removing an event binding detaches the listener', () => {
  const { renderer, events } = newRendered();
  rpatch(renderer, [
    {
      op: 'append',
      path: '$',
      nodes: [{ component: 'cre8-button', props: { text: 'Go' }, events: { click: 'go-clicked' } }],
    },
  ]);
  rpatch(renderer, [{ op: 'setEvents', path: '$.children[0]', events: { click: null } }]);
  renderer.elementAt('$.children[0]').dispatchEvent(new dom.window.Event('click'));
  assertEqual(events.length, 0);
});

test('deleting the surface empties the host element', () => {
  const { host, renderer, model } = newRendered();
  rpatch(renderer, [{ op: 'append', path: '$', nodes: [{ component: 'cre8-heading', children: ['x'] }] }]);
  renderer.apply({ v: 1, type: 'surface.delete', surfaceId: 's1', seq: model.seq + 1 });
  assertEqual(host.childNodes.length, 0);
});

// ─── report ─────────────────────────────────────────────────────────────────

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
