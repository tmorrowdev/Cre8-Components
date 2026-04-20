#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifestPath = resolve(__dirname, '..', 'mcp-manifest.json');
const outPath = resolve(__dirname, 'catalog.json');

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const QUOTED_LITERAL = /^"([^"]*)"$/;

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

const TS_TYPE_RESOLVERS = {
  Cre8ChartType: {
    type: 'string',
    enum: ['line', 'bar', 'pie', 'doughnut', 'radar', 'polarArea', 'bubble', 'scatter'],
  },
  Color: { type: 'string', enum: ['neutral', 'branded', 'neutral-hybrid'] },
  Shape: { type: 'string', enum: ['round', 'square'] },
  status: { type: 'string', enum: ['error', 'warning', 'success'] },
  '(Cre8SelectOption | Cre8SelectOptionGroup)[]': {
    type: 'array',
    items: { oneOf: [SELECT_OPTION_SCHEMA, SELECT_OPTION_GROUP_SCHEMA] },
  },
};

const PROP_OVERRIDES = {
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
      'label',
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
    components,
  },
};

writeFileSync(outPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(
  `Wrote ${outPath} (${manifest.components.length} components, ${(JSON.stringify(catalog).length / 1024).toFixed(1)} KB)`
);
