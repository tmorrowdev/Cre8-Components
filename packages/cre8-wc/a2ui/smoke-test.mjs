import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const catalog = JSON.parse(readFileSync(resolve(__dirname, 'catalog.json'), 'utf8'));

const dom = new JSDOM('<!doctype html><html><body></body></html>');
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;

const { registerCatalog, render, validateSpec } = await import('./index.ts');

const cat = registerCatalog(catalog);
console.log(`loaded catalog "${cat.id}" (${cat.components.size} components)`);

const spec = {
  component: 'cre8-card',
  slots: {
    header: [{ component: 'cre8-button', props: { text: 'Close', variant: 'tertiary' } }],
    default: [
      { component: 'cre8-alert', props: { status: 'info' } },
      {
        component: 'cre8-button-group',
        children: [
          { component: 'cre8-button', props: { text: 'Save', variant: 'primary' } },
          { component: 'cre8-button', props: { text: 'Cancel', variant: 'secondary', neutral: true } },
        ],
      },
    ],
  },
};

try {
  validateSpec(spec, cat);
  console.log('validation: OK');
} catch (e) {
  console.error('validation failed:', e.message);
  process.exit(1);
}

const el = render(spec, cat);
console.log('rendered:\n' + el.outerHTML);

const bad = { component: 'cre8-bogus' };
try {
  validateSpec(bad, cat);
  console.error('FAIL: expected rejection of cre8-bogus');
  process.exit(1);
} catch (e) {
  console.log('allowlist reject:', e.message);
}

const badProp = { component: 'cre8-button', props: { notARealProp: 'x' } };
try {
  validateSpec(badProp, cat);
  console.error('FAIL: expected rejection of bad prop');
  process.exit(1);
} catch (e) {
  console.log('prop reject:', e.message);
}

const badSlot = {
  component: 'cre8-card',
  slots: { footer: [], notASlot: [] },
};
try {
  validateSpec(badSlot, cat);
  console.error('FAIL: expected rejection of unknown slot');
  process.exit(1);
} catch (e) {
  console.log('slot reject:', e.message);
}

// An invented custom event used to bind cleanly and then never fire — the UI
// renders and silently does nothing, which is worse than an error.
const badEvent = { component: 'cre8-modal', events: { 'totally-made-up': 'x' } };
try {
  validateSpec(badEvent, cat);
  console.error('FAIL: expected rejection of undeclared event');
  process.exit(1);
} catch (e) {
  console.log('event reject:', e.message);
}

// Binding a real event to the wrong component is the same failure wearing a
// disguise: the name exists in the library, just not on this component.
const misattributed = { component: 'cre8-button', events: { 'modal-close': 'x' } };
try {
  validateSpec(misattributed, cat);
  console.error('FAIL: expected rejection of an event from another component');
  process.exit(1);
} catch (e) {
  console.log('misattributed event reject:', e.message);
}

// Native DOM events stay bindable on anything — `@fires` documents only what a
// component dispatches itself, so the catalog can never list `click`.
for (const native of ['click', 'input', 'submit', 'keydown', 'focus']) {
  validateSpec({ component: 'cre8-button', events: { [native]: 'h' } }, cat);
}
console.log('native events accepted on an undocumented component: ok');

// Binds one native event and one custom event, on the component that actually
// dispatches the custom one. It used to bind `split-button-text-click` to a
// plain `cre8-button`, which no `cre8-button` ever fires — a binding that
// renders cleanly and then silently does nothing. Event-name validation now
// rejects that, so the example has to be a real pairing.
const eventSpec = {
  component: 'cre8-split-button',
  props: { buttonText: 'Save' },
  events: {
    click: { handler: 'save-record', stopPropagation: true },
    'split-button-text-click': 'emit-telemetry',
  },
};

const emitted = [];
const eventEl = render(eventSpec, cat, { onEvent: (e) => emitted.push(e) });

eventEl.dispatchEvent(new dom.window.Event('click', { bubbles: true }));
eventEl.dispatchEvent(new dom.window.CustomEvent('split-button-text-click', { detail: { source: 'kbd' } }));

if (emitted.length !== 2) {
  console.error('FAIL: expected 2 emitted events, got', emitted.length);
  process.exit(1);
}
if (emitted[0].handler !== 'save-record' || emitted[0].event !== 'click') {
  console.error('FAIL: click binding wrong:', emitted[0]);
  process.exit(1);
}
if (emitted[1].handler !== 'emit-telemetry' || emitted[1].detail?.source !== 'kbd') {
  console.error('FAIL: custom event binding wrong:', emitted[1]);
  process.exit(1);
}
console.log('event binding:', emitted.map((e) => `${e.event}→${e.handler}`).join(', '));

const badEventSpec = { component: 'cre8-button', events: { click: { foo: 'bar' } } };
try {
  validateSpec(badEventSpec, cat);
  console.error('FAIL: expected rejection of missing handler');
  process.exit(1);
} catch (e) {
  console.log('event reject:', e.message);
}

const badEnum = { component: 'cre8-button', props: { variant: 'bogus' } };
try {
  validateSpec(badEnum, cat);
  console.error('FAIL: expected enum rejection');
  process.exit(1);
} catch (e) {
  console.log('enum reject:', e.message);
}

const badType = { component: 'cre8-button', props: { disabled: 'yes' } };
try {
  validateSpec(badType, cat);
  console.error('FAIL: expected type rejection');
  process.exit(1);
} catch (e) {
  console.log('type reject:', e.message);
}

const badConst = {
  component: 'cre8-button',
  props: { variant: 'primary' },
  // hand-crafted invalid: component field must match const
};
// component const is enforced via the registered component map, but verify
// explicit const checking works by abusing a spec path we can control.
// Instead, exercise the union number|string prop (cre8-field.max) with a bad type.
const badUnion = { component: 'cre8-field', props: { max: true } };
try {
  validateSpec(badUnion, cat);
  console.error('FAIL: expected union type rejection');
  process.exit(1);
} catch (e) {
  console.log('union reject:', e.message);
}

const goodUnionNum = { component: 'cre8-field', props: { max: 10 } };
const goodUnionStr = { component: 'cre8-field', props: { max: '10' } };
validateSpec(goodUnionNum, cat);
validateSpec(goodUnionStr, cat);
console.log('union accepts string|number: OK');

// x-tsType resolver coverage
validateSpec({ component: 'cre8-chart', props: { type: 'doughnut' } }, cat);
try {
  validateSpec({ component: 'cre8-chart', props: { type: 'donut' } }, cat);
  console.error('FAIL: expected Cre8ChartType rejection');
  process.exit(1);
} catch (e) {
  console.log('Cre8ChartType reject:', e.message);
}

validateSpec({ component: 'cre8-heading', props: { type: 'meta-small' } }, cat);
try {
  validateSpec({ component: 'cre8-heading', props: { type: 'title-xxlarge' } }, cat);
  console.error('FAIL: expected heading union rejection');
  process.exit(1);
} catch (e) {
  console.log('heading-type reject:', e.message);
}

validateSpec(
  {
    component: 'cre8-select',
    props: {
      items: [
        { label: 'One', value: 1 },
        { optGroupLabel: 'Group', options: [{ label: 'Sub', value: 'sub' }] },
      ],
    },
  },
  cat
);
console.log('Cre8SelectOption[] accepts mixed union: OK');

try {
  validateSpec(
    {
      component: 'cre8-select',
      props: { items: [{ label: 'Missing value' }] },
    },
    cat
  );
  console.error('FAIL: expected required-value rejection');
  process.exit(1);
} catch (e) {
  console.log('select-items required reject:', e.message);
}

try {
  validateSpec(
    {
      component: 'cre8-select',
      props: { items: [{ label: 'A', value: 1, extra: 'nope' }] },
    },
    cat
  );
  console.error('FAIL: expected additionalProperties rejection');
  process.exit(1);
} catch (e) {
  console.log('select-items additionalProperties reject:', e.message);
}

// text-children + x-kind routing
const textSpec = {
  component: 'cre8-heading',
  props: { type: 'headline-default', tagVariant: 'h2' },
  children: ['Hello world'],
};
validateSpec(textSpec, cat);
const hEl = render(textSpec, cat);
if (hEl.textContent !== 'Hello world') {
  console.error('FAIL: text child not rendered; got:', hEl.textContent);
  process.exit(1);
}
if (hEl.getAttribute('tagVariant') !== null) {
  console.error('FAIL: tagVariant should be set as property, not attribute');
  process.exit(1);
}
if (hEl.tagVariant !== 'h2') {
  console.error('FAIL: tagVariant property not set');
  process.exit(1);
}
console.log('text child + x-kind=property routing: OK');

console.log('all checks passed');
