#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifestPath = resolve(__dirname, '..', 'mcp-manifest.json');
const outPath = resolve(__dirname, 'catalog.json');
const compactOutPath = resolve(__dirname, 'catalog.compact.json');

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const QUOTED_LITERAL = /^"([^"]*)"$/;

/**
 * Native DOM events, bindable on every component.
 *
 * Emitted into the catalog as `x-native-events` so the runtime validator can
 * read it from there rather than keeping its own copy. Two lists that must stay
 * equal is exactly the drift this pipeline is supposed to prevent, so there is
 * one list and it lives here, next to the schema it produces.
 *
 * A component's `@fires` tags describe only what it dispatches itself, so these
 * can never be discovered from source — binding `click` to a button is both the
 * most common thing an agent does and undocumentable by the analyzer.
 */
const NATIVE_DOM_EVENTS = [
  'click', 'dblclick', 'contextmenu',
  'mousedown', 'mouseup', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'mousemove',
  'pointerdown', 'pointerup', 'pointerenter', 'pointerleave',
  'touchstart', 'touchend', 'touchmove', 'touchcancel',
  'keydown', 'keyup', 'keypress',
  'focus', 'blur', 'focusin', 'focusout',
  'input', 'change', 'submit', 'reset', 'invalid', 'select',
  'scroll', 'wheel', 'resize',
  'copy', 'cut', 'paste',
  'drag', 'dragstart', 'dragend', 'dragenter', 'dragleave', 'dragover', 'drop',
  'load', 'error',
];

/** Mirrors the `EventBinding` union in types.ts. */
const EVENT_BINDING_SCHEMA = {
  description: 'A handler name, or an object naming the handler plus dispatch options.',
  oneOf: [
    { type: 'string', minLength: 1 },
    {
      type: 'object',
      required: ['handler'],
      additionalProperties: false,
      properties: {
        handler: { type: 'string', minLength: 1 },
        stopPropagation: { type: 'boolean' },
        preventDefault: { type: 'boolean' },
      },
    },
  ],
};

const SELECT_OPTION_SCHEMA = {
  type: 'object',
  required: ['label', 'value'],
  additionalProperties: false,
  properties: {
    label: { type: 'string' },
    value: { type: ['string', 'number'] },
  },
};

const SELECT_OPTION_GROUP_SCHEMA = {
  type: 'object',
  required: ['optGroupLabel', 'options'],
  additionalProperties: false,
  properties: {
    optGroupLabel: { type: 'string' },
    options: { type: 'array', items: SELECT_OPTION_SCHEMA },
  },
};


/**
 * Schemas for the flattened compound APIs.
 *
 * These are keyed by TypeScript type expression rather than by component, so a
 * type used twice is described once — the same reason the select-option entry
 * below is shaped this way. Without them the analyzer reports a bare interface
 * name, `mapAttrPlain` falls back to `type: "string"`, and the catalog then
 * *rejects* the very array the component is built to take.
 */
const TABLE_COLUMN_SCHEMA = {
  type: 'object',
  properties: {
    label: { type: 'string' },
    key: { type: 'string' },
    width: { type: 'string' },
  },
  required: ['label'],
  additionalProperties: false,
};

const TABLE_ROW_SCHEMA = {
  oneOf: [
    { type: 'object', additionalProperties: { type: ['string', 'number'] } },
    { type: 'array', items: { type: ['string', 'number'] } },
  ],
};

/** `{ text }` and friends: one string field plus optional flags. */
const textItem = (extra = {}, required = ['text'], key = 'text') => ({
  type: 'object',
  properties: { [key]: { type: 'string' }, ...extra },
  required,
  additionalProperties: false,
});

const FLATTENED_ITEM_SCHEMAS = {
  'Cre8TableColumn[]': { type: 'array', items: TABLE_COLUMN_SCHEMA },
  'Cre8TableRowData[]': { type: 'array', items: TABLE_ROW_SCHEMA },
  'Cre8ListItemData[]': { type: 'array', items: textItem() },
  'Cre8DropdownItemData[]': { type: 'array', items: textItem({ ariaLabel: { type: 'string' } }) },
  'Cre8BreadcrumbData[]': { type: 'array', items: textItem({ href: { type: 'string' } }) },
  'Cre8LinkData[]': {
    type: 'array',
    items: textItem({ href: { type: 'string' }, isActive: { type: 'boolean' } }, ['text', 'href']),
  },
  'Cre8TagData[]': {
    type: 'array',
    items: textItem({
      variant: { type: 'string', enum: ['neutral', 'branded', 'neutral-hybrid'] },
      shape: { type: 'string', enum: ['square', 'round'] },
      type: { type: 'string', enum: ['checkbox', 'radio'] },
      disabled: { type: 'boolean' },
    }),
  },
  'Cre8TabItemData[]': {
    type: 'array',
    items: textItem({ content: { type: 'string' } }, ['label'], 'label'),
  },
  'Cre8AccordionItemData[]': {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        heading: { type: 'string' },
        content: { type: 'string' },
        isActive: { type: 'boolean' },
        headingTagVariant: { type: 'string', enum: ['h1', 'h2', 'h3', 'h4'] },
      },
      required: ['heading', 'content'],
      additionalProperties: false,
    },
  },
  'Cre8ProgressStepData[]': {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        message: { type: 'string' },
        state: { type: 'string', enum: ['error', 'warning', 'complete', 'current'] },
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
};

const choiceItem = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      label: { type: 'string' },
      value: { type: 'string' },
      checked: { type: 'boolean' },
      disabled: { type: 'boolean' },
      required: { type: 'boolean' },
    },
    required: ['label'],
    additionalProperties: false,
  },
};
FLATTENED_ITEM_SCHEMAS['Cre8CheckboxItemData[]'] = choiceItem;
FLATTENED_ITEM_SCHEMAS['Cre8RadioItemData[]'] = choiceItem;

const TS_TYPE_RESOLVERS = {
  Cre8ChartType: {
    type: 'string',
    enum: ['line', 'bar', 'pie', 'doughnut', 'radar', 'polarArea', 'bubble', 'scatter'],
  },
  Color: { type: 'string', enum: ['neutral', 'branded', 'neutral-hybrid'] },
  Shape: { type: 'string', enum: ['round', 'square'] },
  // No entry for the bare type name `status`: it existed only because
  // `cre8-progress-meter` carried an `@attr {status}` JSDoc tag that overrode
  // its literal union back to an unresolvable alias. The tag is gone and the
  // union now flows through on its own.
  '(Cre8SelectOption | Cre8SelectOptionGroup)[]': {
    type: 'array',
    items: { oneOf: [SELECT_OPTION_SCHEMA, SELECT_OPTION_GROUP_SCHEMA] },
  },
  ...FLATTENED_ITEM_SCHEMAS,
};

const PROP_OVERRIDES = {
  'cre8-chart.data': { type: 'object', description: 'Chart.js data object with labels and datasets arrays.' },
  'cre8-chart.options': { type: 'object', description: 'Chart.js options object.' },
  // No entry for `cre8-chart.colors`: the manifest type is plain `string[]`,
  // which mapAttrPlain already resolves to the identical schema. Only add an
  // override when the manifest type is unresolvable (an interface name, an
  // imported alias, or a union TypeScript truncated with "... N more ...").
  'cre8-heading.type': {
    type: 'string',
    enum: [
      'display-default',
      'display-small',
      'headline-large',
      'headline-default',
      'headline-small',
      'title-xlarge',
      'title-large',
      'title-default',
      'title-small',
      'label-large',
      'label-default',
      'label-small',
      'meta-large',
      'meta-default',
      'meta-small',
    ],
  },
};

function mapAttr(attr, componentName, propName, kind) {
  const overrideKey = `${componentName}.${propName}`;
  let out;
  if (PROP_OVERRIDES[overrideKey]) {
    out = { ...PROP_OVERRIDES[overrideKey] };
    if (attr.description) out.description = attr.description.trim();
    if (attr.default !== undefined) out.default = attr.default;
  } else if (typeof attr.type === 'string' && TS_TYPE_RESOLVERS[attr.type]) {
    out = { ...TS_TYPE_RESOLVERS[attr.type] };
    if (attr.description) out.description = attr.description.trim();
    if (attr.default !== undefined) out.default = attr.default;
  } else {
    out = mapAttrPlain(attr);
  }
  out['x-kind'] = kind;
  return out;
}

function mapAttrPlain(attr) {
  const schema = {};
  if (attr.description) schema.description = attr.description.trim();
  if (attr.default !== undefined) schema.default = attr.default;

  if (Array.isArray(attr.values) && attr.values.length) {
    schema.type = 'string';
    schema.enum = attr.values;
    return schema;
  }

  const t = attr.type;
  if (t === 'boolean') { schema.type = 'boolean'; return schema; }
  if (t === 'number') { schema.type = 'number'; return schema; }
  if (t === 'string') { schema.type = 'string'; return schema; }
  if (t === 'string[]') { schema.type = 'array'; schema.items = { type: 'string' }; return schema; }
  if (t === 'string | number') { schema.type = ['string', 'number']; return schema; }

  const lit = typeof t === 'string' ? t.match(QUOTED_LITERAL) : null;
  if (lit) { schema.type = 'string'; schema.const = lit[1]; return schema; }

  if (typeof t === 'string' && t.includes('|')) {
    const parts = t.split('|').map((s) => s.trim());
    const literals = parts.map((p) => p.match(QUOTED_LITERAL)?.[1]).filter(Boolean);
    if (literals.length === parts.length) {
      schema.type = 'string';
      schema.enum = literals;
      return schema;
    }
  }

  schema.type = 'string';
  schema['x-tsType'] = t;
  return schema;
}

const SLOT_OVERRIDES = {
  'cre8-card': { body: 'default' },
};

function normalizeSlotName(name, componentName) {
  const unquoted = typeof name === 'string' ? name.replace(/^"|"$/g, '') : name;
  const base = unquoted === '' ? 'default' : unquoted;
  const override = componentName && SLOT_OVERRIDES[componentName]?.[base];
  return override ?? base;
}

function buildComponent(c) {
  const attrs = c.attributes || {};
  const propsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {},
  };
  for (const [name, attr] of Object.entries(attrs)) {
    propsSchema.properties[name] = mapAttr(attr, c.name, name, 'attribute');
  }
  for (const [name, attr] of Object.entries(c.properties || {})) {
    if (propsSchema.properties[name]) continue;
    propsSchema.properties[name] = mapAttr(attr, c.name, name, 'property');
  }

  const rawSlots = c.slots || {};
  const slotNames = Object.keys(rawSlots).map((n) => normalizeSlotName(n, c.name));
  const hasSlots = slotNames.length > 0;
  const onlyDefault = slotNames.length === 1 && slotNames[0] === 'default';

  const events = {};
  for (const [name, evt] of Object.entries(c.events || {})) {
    events[name] = { detail: evt.detail || {} };
  }

  const def = {
    type: 'object',
    title: c.name,
    'x-category': c.category,
    description: (c.description || '').trim(),
    required: ['component'],
    properties: {
      component: { const: c.name, description: 'Component tag name' },
      props: propsSchema,
    },
    additionalProperties: false,
  };

  if (onlyDefault) {
    def.properties.children = {
      type: 'array',
      description: (rawSlots.default?.description || '').trim() || 'Child instances rendered into the default slot.',
      items: { $ref: '#/$defs/Component' },
    };
  } else if (hasSlots) {
    const slotProps = {};
    const slotDescriptions = {};
    for (const [rawName, slot] of Object.entries(rawSlots)) {
      const name = normalizeSlotName(rawName, c.name);
      slotProps[name] = {
        type: 'array',
        description: (slot.description || '').trim(),
        items: { $ref: '#/$defs/Component' },
      };
      slotDescriptions[name] = (slot.description || '').trim();
    }
    def.properties.slots = {
      type: 'object',
      description: 'Named slot content. Each key is a slot name; value is an array of component instances rendered into that slot.',
      additionalProperties: false,
      properties: slotProps,
    };
    def['x-slot-descriptions'] = slotDescriptions;
  }

  if (Object.keys(events).length) def['x-events'] = events;

  // Events are declared under `properties`, alongside props and slots, rather
  // than living only in `x-events` metadata. Previously the component defs were
  // `additionalProperties: false` with no `events` key at all, so events were
  // documented but second-class — and an invented event name validated cleanly.
  // Native events are always permitted; declared custom events are added on top.
  def.properties.events = {
    type: 'object',
    description:
      'Event bindings. Each key is an event name; the value names the handler to emit.',
    // Native names are `$ref`'d rather than inlined. Repeating all 46 on each of
    // 85 components cost ~57 KB and made the catalog a third larger for no
    // information gain.
    propertyNames: Object.keys(events).length
      ? { anyOf: [{ $ref: '#/$defs/NativeEventName' }, { enum: Object.keys(events).sort() }] }
      : { $ref: '#/$defs/NativeEventName' },
    additionalProperties: { $ref: '#/$defs/EventBinding' },
  };

  return def;
}

const components = {};
const componentRefs = [];

for (const c of manifest.components) {
  components[c.name] = buildComponent(c);
  componentRefs.push({ $ref: `#/$defs/components/${c.name}` });
}

const catalog = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: `https://cre8.dev/a2ui/catalogs/cre8-wc/${manifest.version}`,
  title: 'cre8-wc A2UI Catalog',
  description: manifest.description,
  // Single source of truth for the native-event allowlist. The runtime validator
  // reads it from here instead of keeping a second copy that could drift.
  'x-native-events': NATIVE_DOM_EVENTS,
  'x-a2ui': {
    catalogId: 'cre8-wc',
    library: manifest.library,
    libraryVersion: manifest.version,
    tagPrefix: manifest.tagPrefix,
    framework: manifest.framework,
  },
  type: 'object',
  required: ['root'],
  properties: {
    root: { $ref: '#/$defs/Component' },
  },
  $defs: {
    Component: {
      description: 'A component instance in the cre8-wc catalog.',
      oneOf: componentRefs,
    },
    EventBinding: EVENT_BINDING_SCHEMA,
    NativeEventName: {
      description: 'A native DOM event, bindable on any component.',
      enum: [...NATIVE_DOM_EVENTS].sort(),
    },
    components,
  },
};

writeFileSync(outPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(
  `Wrote ${outPath} (${manifest.components.length} components, ${(JSON.stringify(catalog).length / 1024).toFixed(1)} KB)`
);

// The compact projection: the minimum a model needs to emit valid A2UI. Prose is
// ~90% of the catalog's bytes and none of its decoding constraint, so dropping it
// is what lets a small-context model see the design system at all.
//
// Emitted here rather than in a separate script so it cannot drift from the
// catalog it projects.
function compactProps(propsNode) {
  const out = {};
  for (const [name, spec] of Object.entries(propsNode?.properties ?? {})) {
    out[name] = spec.enum ? { enum: spec.enum } : { type: spec.type ?? 'string' };
  }
  return out;
}

const compactComponents = Object.entries(components)
  .map(([name, def]) => {
    const props = def.properties ?? {};
    const entry = { name, category: def['x-category'] ?? 'Uncategorized' };

    if (props.props) {
      entry.props = compactProps(props.props);
      if (props.props.required?.length) entry.required = props.props.required;
    }
    // Containment is expressed two ways and consumers need both: `children` for
    // plain containers, `slots` for named regions. Dropping either makes a
    // container look like a leaf.
    if (props.children) entry.acceptsChildren = true;
    if (props.slots) entry.slots = Object.keys(props.slots.properties ?? {});
    // Events live under `x-events`, not under `properties`, which makes them easy
    // to miss — the studio's hand-rolled summary looked for them in the wrong
    // place and so showed the model none of the 22 events the library emits.
    const events = Object.keys(def['x-events'] ?? {});
    if (events.length) entry.events = events;
    return entry;
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const compact = {
  contractVersion: 1,
  sourceCatalog: catalog.$id,
  libraryVersion: manifest.version,
  componentCount: compactComponents.length,
  components: compactComponents,
};

writeFileSync(compactOutPath, JSON.stringify(compact, null, 2) + '\n');

const fullBytes = JSON.stringify(components).length;
const compactBytes = JSON.stringify(compact).length;
console.log(
  `Wrote ${compactOutPath} (${compactComponents.length} components, ` +
    `${(compactBytes / 1024).toFixed(1)} KB, ${(fullBytes / compactBytes).toFixed(1)}x smaller)`
);
