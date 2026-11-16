/**
 * A2UI v1.0 (https://a2ui.org/specification/v1.0-a2ui/) at the boundary.
 *
 * cre8 keeps its nested, position-addressed ComponentSpec internally — that
 * decision is what let streaming land without touching a spec or a renderer.
 * This module translates at the edge instead: it publishes the cre8 catalog in
 * v1.0 catalog form, exports a spec (or a live surface) as v1.0 envelope
 * messages, and imports a v1.0 message stream back into a validated spec plus
 * data model that `ui_open_surface` accepts as-is.
 *
 * v1.0 requires UAX #31 identifiers for component types, ids and property
 * names, so the wire vocabulary is a reversible mapping, not a copy:
 *
 *   cre8-button            → Cre8Button
 *   prop  aria-label       → ariaLabel        (only where the name is not UAX #31)
 *   slot  footer           → slot_footer      (slots and props share names, e.g. fieldNote)
 *   children               → children         (ChildList)
 *   event tab-change       → on_tab_change    (common_types Action)
 *   text node              → Text { text }    (v1.0 children are ids, never strings)
 *   prop { $bind: "/p" }   → { "@path": "/p" }
 */

import {
  isBindingRef,
  pointerGet,
  pointerRemove,
  pointerSet,
  resolveNode,
} from '@tmorrow/cre8-wc/a2ui/stream/index.js';
import {
  validateSpec,
  type CatalogComponentDef,
  type ComponentSpec,
  type EventBinding,
  type RegisteredCatalog,
} from '@tmorrow/cre8-wc/a2ui/index.js';
import type { SpecChild } from '@tmorrow/cre8-wc/a2ui/types.js';
import { z } from 'zod';
import { loadA2uiCatalog } from './handlers.js';
import { surfaceStore } from './surfaces.js';

export const A2UI_V1_VERSION = '1.0';
export const TEXT_COMPONENT = 'Text';
const SLOT_PREFIX = 'slot_';
const EVENT_PREFIX = 'on_';
const EXTENSION_KEY = 'cre8';
const COMMON = 'common_types.json#/$defs/';
const UAX31 = /^[\p{XID_Start}_][\p{XID_Continue}]*$/u;
const RESERVED_KEYS = new Set(['id', 'component']);

export function isUax31(name: string): boolean {
  return UAX31.test(name);
}

function pascal(tag: string): string {
  return tag
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('');
}

function camel(name: string): string {
  return name.replace(/[^A-Za-z0-9_]+([A-Za-z0-9])/g, (_, c: string) => c.toUpperCase());
}

function snake(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^A-Za-z0-9_]+/g, '_')
    .toLowerCase();
}

// ─── Name mapping ────────────────────────────────────────────────────────────

interface ComponentMapping {
  tag: string;
  type: string;
  def: CatalogComponentDef;
  /** cre8 prop name → v1 property name, and back. */
  propToV1: Map<string, string>;
  propFromV1: Map<string, string>;
  /** cre8 slot name → v1 property, and back. */
  slotToV1: Map<string, string>;
  slotFromV1: Map<string, string>;
  acceptsChildren: boolean;
  /** cre8 event name → v1 property, and back (custom events only; native are shared). */
  eventToV1: Map<string, string>;
  eventFromV1: Map<string, string>;
}

export interface V1Mapping {
  catalog: RegisteredCatalog;
  catalogId: string;
  byTag: Map<string, ComponentMapping>;
  byType: Map<string, ComponentMapping>;
  nativeEventToV1: Map<string, string>;
  nativeEventFromV1: Map<string, string>;
}

function eventProp(event: string): string {
  return EVENT_PREFIX + event.replace(/[^A-Za-z0-9_]+/g, '_');
}

function claim(used: Map<string, string>, v1Name: string, owner: string, tag: string): void {
  if (!isUax31(v1Name)) {
    throw new Error(`${tag}: "${owner}" maps to "${v1Name}", which is not a UAX #31 identifier`);
  }
  const prior = used.get(v1Name);
  if (prior !== undefined) {
    throw new Error(`${tag}: "${owner}" and "${prior}" both map to v1 property "${v1Name}"`);
  }
  used.set(v1Name, owner);
}

let mappingCache: V1Mapping | null = null;

export function getV1Mapping(): V1Mapping {
  if (mappingCache) return mappingCache;
  const catalog = loadA2uiCatalog();
  const meta = catalog.schema['x-a2ui'] ?? {};
  const catalogId = `https://cre8.dev/a2ui/v1_0/catalogs/${meta.catalogId ?? 'cre8-wc'}/${meta.libraryVersion ?? 'unversioned'}`;

  const nativeEventToV1 = new Map<string, string>();
  const nativeEventFromV1 = new Map<string, string>();
  for (const event of catalog.schema['x-native-events'] ?? []) {
    nativeEventToV1.set(event, eventProp(event));
    nativeEventFromV1.set(eventProp(event), event);
  }

  const byTag = new Map<string, ComponentMapping>();
  const byType = new Map<string, ComponentMapping>();
  for (const [tag, def] of catalog.components) {
    const type = pascal(tag);
    if (!isUax31(type) || type === TEXT_COMPONENT || type === 'Surface' || byType.has(type)) {
      throw new Error(`${tag}: v1 component type "${type}" is invalid or already taken`);
    }
    // Every v1 property name this component exposes, so a collision anywhere is caught.
    const used = new Map<string, string>([...nativeEventFromV1].map(([v1, ev]) => [v1, `event ${ev}`]));
    for (const key of RESERVED_KEYS) used.set(key, '(reserved)');

    const m: ComponentMapping = {
      tag,
      type,
      def,
      propToV1: new Map(),
      propFromV1: new Map(),
      slotToV1: new Map(),
      slotFromV1: new Map(),
      acceptsChildren: def.properties?.children !== undefined,
      eventToV1: new Map(),
      eventFromV1: new Map(),
    };
    if (m.acceptsChildren) used.set('children', 'children');

    for (const prop of Object.keys(def.properties?.props?.properties ?? {})) {
      const v1 = isUax31(prop) ? prop : camel(prop);
      claim(used, v1, `prop ${prop}`, tag);
      m.propToV1.set(prop, v1);
      m.propFromV1.set(v1, prop);
    }
    for (const slot of Object.keys(def.properties?.slots?.properties ?? {})) {
      const v1 = SLOT_PREFIX + slot.replace(/[^A-Za-z0-9_]+/g, '_');
      claim(used, v1, `slot ${slot}`, tag);
      m.slotToV1.set(slot, v1);
      m.slotFromV1.set(v1, slot);
    }
    for (const event of Object.keys(def['x-events'] ?? {})) {
      if (nativeEventToV1.has(event)) continue;
      const v1 = eventProp(event);
      claim(used, v1, `event ${event}`, tag);
      m.eventToV1.set(event, v1);
      m.eventFromV1.set(v1, event);
    }
    byTag.set(tag, m);
    byType.set(type, m);
  }

  mappingCache = { catalog, catalogId, byTag, byType, nativeEventToV1, nativeEventFromV1 };
  return mappingCache;
}

// ─── Catalog ─────────────────────────────────────────────────────────────────

/** Allow a literal matching the cre8 prop schema, or a data binding. */
function dynamic(propSchema: Record<string, unknown>): Record<string, unknown> {
  const { description, default: _default, ...rest } = propSchema;
  const out: Record<string, unknown> = {
    anyOf: [rest, { $ref: `${COMMON}DataBinding` }],
  };
  if (typeof description === 'string') out.description = description;
  return out;
}

const childList = (description: string) => ({ $ref: `${COMMON}ChildList`, description });
const action = (description: string) => ({ $ref: `${COMMON}Action`, description });

function componentSchema(m: ComponentMapping): Record<string, unknown> {
  const properties: Record<string, unknown> = { component: { const: m.type } };
  const propDefs = m.def.properties?.props?.properties ?? {};
  for (const [prop, v1] of m.propToV1) {
    properties[v1] = dynamic(propDefs[prop] as Record<string, unknown>);
  }
  if (m.acceptsChildren) properties.children = childList('Content, in order.');
  const slotDescriptions = m.def['x-slot-descriptions'] ?? {};
  for (const [slot, v1] of m.slotToV1) {
    properties[v1] = childList(slotDescriptions[slot] ?? `Content of the "${slot}" slot.`);
  }
  for (const [event, v1] of m.eventToV1) {
    properties[v1] = action(`Fires on the component's "${event}" event.`);
  }
  const description = (m.def.description ?? '').split('\n')[0];
  return {
    type: 'object',
    title: m.type,
    description: `<${m.tag}>${description ? ` — ${description}` : ''}`,
    'x-cre8-tag': m.tag,
    ...(m.def['x-category'] ? { 'x-category': m.def['x-category'] } : {}),
    allOf: [{ $ref: '#/$defs/NativeEventHandlers' }, { type: 'object', properties, required: ['component'] }],
  };
}

const CATALOG_INSTRUCTIONS = [
  'Every component is a cre8 web component; the `x-cre8-tag` on each definition names the element it renders.',
  'Text content is a separate `Text` component referenced from `children` or a `slot_*` property — never a string in a ChildList.',
  'Content goes through EITHER `children` OR `slot_*` properties; the definition says which. Button labels are the `text` property.',
  'Bind any property to the data model with {"@path": "/pointer"}. Function calls ({"@call"}), ChildList templates and @checks are not supported by the cre8 renderer.',
  'Events: `on_<event>` properties take an Action whose event.name is the handler name reported back to the agent.',
].join('\n');

export function buildV1Catalog(): Record<string, unknown> {
  const map = getV1Mapping();
  const components: Record<string, unknown> = {
    [TEXT_COMPONENT]: {
      type: 'object',
      title: TEXT_COMPONENT,
      description: 'A plain text node inside a cre8 component. Not a styled element: wrap it in cre8-heading or cre8-text-passage for typography.',
      properties: {
        component: { const: TEXT_COMPONENT },
        text: { type: 'string', description: 'The literal text.' },
      },
      required: ['component', 'text'],
    },
  };
  for (const m of map.byType.values()) components[m.type] = componentSchema(m);

  const nativeHandlers: Record<string, unknown> = {};
  for (const [event, v1] of map.nativeEventToV1) {
    nativeHandlers[v1] = action(`Fires on the native DOM "${event}" event.`);
  }

  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: map.catalogId,
    protocolVersion: A2UI_V1_VERSION,
    title: 'cre8-wc A2UI v1.0 catalog',
    description: `The ${map.byTag.size} cre8-wc web components, expressed as an A2UI v1.0 catalog.`,
    catalogId: map.catalogId,
    instructions: CATALOG_INSTRUCTIONS,
    components,
    $defs: {
      anyComponent: {
        oneOf: Object.keys(components).map((type) => ({ $ref: `#/components/${type}` })),
        discriminator: { propertyName: 'component' },
      },
      // cre8 registers no renderer functions; only the catalogless @index system function applies.
      anyFunction: { not: {} },
      NativeEventHandlers: {
        type: 'object',
        description: 'Native DOM events bindable on any cre8 component.',
        properties: nativeHandlers,
      },
    },
  };
}

// ─── Export: cre8 spec → v1.0 messages ───────────────────────────────────────

export interface V1Component {
  id: string;
  component: string;
  [key: string]: unknown;
}

export interface V1Message {
  version: '1.0';
  [type: string]: unknown;
}

export interface ExportInput {
  spec: ComponentSpec;
  data?: Record<string, unknown>;
  surfaceId: string;
  sendDataModel?: boolean;
}

function clone<T>(value: T): T {
  return value === undefined ? value : (JSON.parse(JSON.stringify(value)) as T);
}

export function specToV1Components(
  spec: ComponentSpec,
  data: Record<string, unknown>
): { components: V1Component[]; dataModel: Record<string, unknown> } {
  const map = getV1Mapping();
  const components: V1Component[] = [];
  const dataModel = clone(data);
  const counters = new Map<string, number>();

  const nextId = (type: string): string => {
    const base = snake(type);
    const n = (counters.get(base) ?? 0) + 1;
    counters.set(base, n);
    return `${base}_${n}`;
  };

  const visit = (node: SpecChild, id: string, path: string): void => {
    if (typeof node === 'string') {
      components.push({ id, component: TEXT_COMPONENT, text: node });
      return;
    }
    const m = map.byTag.get(node.component);
    if (!m) throw new Error(`${path}: component "${node.component}" is not in the cre8 catalog`);
    const out: V1Component = { id, component: m.type };
    components.push(out);

    for (const [prop, value] of Object.entries(node.props ?? {})) {
      const v1 = m.propToV1.get(prop);
      if (!v1) throw new Error(`${path}.props.${prop}: unknown prop on ${m.tag}`);
      if (isBindingRef(value)) {
        out[v1] = { '@path': value.$bind };
        // v1 bindings carry no default, so the default becomes initial data.
        if (value.default !== undefined && pointerGet(dataModel, value.$bind) === undefined) {
          pointerSet(dataModel, value.$bind, clone(value.default));
        }
      } else {
        out[v1] = clone(value);
      }
    }

    const children = (key: string, arr: SpecChild[], subPath: string): void => {
      out[key] = arr.map((child, i) => {
        const childId = typeof child === 'string' ? nextId(TEXT_COMPONENT) : nextId(pascal(child.component));
        visit(child, childId, `${subPath}[${i}]`);
        return childId;
      });
    };
    if (node.children) children('children', node.children, `${path}.children`);
    for (const [slot, arr] of Object.entries(node.slots ?? {})) {
      const v1 = m.slotToV1.get(slot);
      if (!v1) throw new Error(`${path}.slots.${slot}: unknown slot on ${m.tag}`);
      children(v1, arr, `${path}.slots.${slot}`);
    }

    const eventOptions: Record<string, unknown> = {};
    for (const [event, binding] of Object.entries(node.events ?? {}) as [string, EventBinding][]) {
      const v1 = m.eventToV1.get(event) ?? map.nativeEventToV1.get(event);
      if (!v1) throw new Error(`${path}.events.${event}: unknown event on ${m.tag}`);
      const handler = typeof binding === 'string' ? binding : binding.handler;
      out[v1] = { event: { name: handler } };
      if (typeof binding !== 'string') {
        const { handler: _h, ...options } = binding;
        if (Object.keys(options).length) eventOptions[event] = options;
      }
    }
    if (Object.keys(eventOptions).length) {
      out['@metadata'] = { extensions: { [EXTENSION_KEY]: { eventOptions } } };
    }
  };

  visit(spec, 'root', '$');
  return { components, dataModel };
}

export function exportV1(input: ExportInput): { catalogId: string; messages: V1Message[] } {
  if (!isUax31(input.surfaceId) && !/^[\w-]+$/.test(input.surfaceId)) {
    throw new Error(`surfaceId "${input.surfaceId}" must be a plain identifier`);
  }
  // Refuse to export what cre8 itself would reject — the output claims conformance.
  validateSpec(resolveNode(input.spec, input.data ?? {}), getV1Mapping().catalog);
  const { catalogId } = getV1Mapping();
  const { components, dataModel } = specToV1Components(input.spec, input.data ?? {});
  const createSurface: Record<string, unknown> = { surfaceId: input.surfaceId, catalogId };
  if (input.sendDataModel) createSurface.sendDataModel = true;
  createSurface.components = components;
  if (Object.keys(dataModel).length) createSurface.dataModel = dataModel;
  return { catalogId, messages: [{ version: A2UI_V1_VERSION, createSurface }] };
}

// ─── Import: v1.0 messages → cre8 spec ───────────────────────────────────────

export interface ImportedSurface {
  surfaceId: string;
  catalogId?: string;
  spec: ComponentSpec;
  data: Record<string, unknown>;
}

export interface ImportResult {
  ok: boolean;
  surfaces: ImportedSurface[];
  errors: string[];
  warnings: string[];
}

interface SurfaceState {
  catalogId?: string;
  components: Map<string, V1Component>;
  data: Record<string, unknown>;
}

const ENVELOPE_KEYS = [
  'createSurface',
  'updateComponents',
  'updateDataModel',
  'deleteSurface',
  'callRendererFunction',
  'agentFunctionResponse',
] as const;

export function parseV1Messages(input: unknown): unknown[] {
  if (Array.isArray(input)) return input;
  if (typeof input === 'string') {
    return input
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, i) => {
        try {
          return JSON.parse(line);
        } catch {
          throw new Error(`messages line ${i + 1}: not valid JSON`);
        }
      });
  }
  if (input && typeof input === 'object') return [input];
  throw new Error('messages must be an array of v1.0 envelopes, a single envelope, or a JSONL string');
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function importV1(rawMessages: unknown): ImportResult {
  const map = getV1Mapping();
  const messages = parseV1Messages(rawMessages);
  const surfaces = new Map<string, SurfaceState>();
  const errors: string[] = [];
  const warnings: string[] = [];

  const upsert = (where: string, state: SurfaceState, list: unknown): void => {
    if (!Array.isArray(list) || list.length === 0) {
      errors.push(`${where}.components: must be a non-empty array`);
      return;
    }
    list.forEach((c, i) => {
      if (!isObject(c) || typeof c.id !== 'string' || typeof c.component !== 'string') {
        errors.push(`${where}.components[${i}]: needs string "id" and "component"`);
        return;
      }
      if (!isUax31(c.id)) errors.push(`${where}.components[${i}]: id "${c.id}" is not a UAX #31 identifier`);
      state.components.set(c.id, c as V1Component);
    });
  };

  messages.forEach((msg, i) => {
    const where = `messages[${i}]`;
    if (!isObject(msg)) return void errors.push(`${where}: not an object`);
    if (msg.version !== A2UI_V1_VERSION) {
      return void errors.push(`${where}: version must be "1.0" (got ${JSON.stringify(msg.version)})`);
    }
    const keys = ENVELOPE_KEYS.filter((k) => k in msg);
    if (keys.length !== 1) {
      return void errors.push(`${where}: must contain exactly one of ${ENVELOPE_KEYS.join(', ')}`);
    }
    const type = keys[0];
    const body = msg[type];
    if (!isObject(body)) return void errors.push(`${where}.${type}: must be an object`);
    const at = `${where}.${type}`;

    if (type === 'callRendererFunction' || type === 'agentFunctionResponse') {
      return void warnings.push(`${at}: skipped — cre8 registers no renderer functions`);
    }
    const surfaceId = body.surfaceId;
    if (typeof surfaceId !== 'string') return void errors.push(`${at}.surfaceId: required string`);

    if (type === 'createSurface') {
      if (surfaces.has(surfaceId)) {
        return void errors.push(`${at}: INTEGRITY_ERROR — surface "${surfaceId}" already exists`);
      }
      if ('theme' in body) errors.push(`${at}.theme: not allowed in v1.0 (branding is the renderer's)`);
      const catalogId = typeof body.catalogId === 'string' ? body.catalogId : undefined;
      if (catalogId && catalogId !== map.catalogId) {
        warnings.push(`${at}.catalogId: "${catalogId}" is not the cre8 catalog (${map.catalogId}); components are matched by name`);
      }
      const state: SurfaceState = { catalogId, components: new Map(), data: {} };
      if (body.dataModel !== undefined) {
        if (isObject(body.dataModel)) state.data = clone(body.dataModel);
        else errors.push(`${at}.dataModel: must be an object`);
      }
      if (body.components !== undefined) upsert(at, state, body.components);
      surfaces.set(surfaceId, state);
      return;
    }

    const state = surfaces.get(surfaceId);
    if (!state) return void errors.push(`${at}: surface "${surfaceId}" was never created`);

    if (type === 'updateComponents') return void upsert(at, state, body.components);
    if (type === 'deleteSurface') return void surfaces.delete(surfaceId);

    // updateDataModel
    if (!('value' in body)) return void errors.push(`${at}.value: required`);
    const path = typeof body.path === 'string' ? body.path : '/';
    try {
      if (path === '/' || path === '') {
        if (body.value === null) state.data = {};
        else if (isObject(body.value)) state.data = clone(body.value);
        else errors.push(`${at}.value: the root data model must be an object`);
      } else if (body.value === null) {
        pointerRemove(state.data, path);
      } else {
        pointerSet(state.data, path, clone(body.value));
      }
    } catch (e) {
      errors.push(`${at}.path: ${e instanceof Error ? e.message : String(e)}`);
    }
  });

  const out: ImportedSurface[] = [];
  for (const [surfaceId, state] of surfaces) {
    const built = buildTree(surfaceId, state, errors, warnings);
    if (!built) continue;
    try {
      validateSpec(resolveNode(built, state.data), map.catalog);
    } catch (e) {
      errors.push(`surface "${surfaceId}": ${e instanceof Error ? e.message : String(e)}`);
      continue;
    }
    out.push({ surfaceId, catalogId: state.catalogId, spec: built, data: state.data });
  }

  return { ok: errors.length === 0, surfaces: errors.length ? [] : out, errors, warnings };
}

function buildTree(
  surfaceId: string,
  state: SurfaceState,
  errors: string[],
  warnings: string[]
): ComponentSpec | null {
  const map = getV1Mapping();
  const where = `surface "${surfaceId}"`;
  if (!state.components.has('root')) {
    errors.push(`${where}: no component with id "root"`);
    return null;
  }
  const parentOf = new Map<string, string>();
  const errorCount = errors.length;

  const childIds = (owner: string, key: string, value: unknown): string[] => {
    if (Array.isArray(value) && value.every((v) => typeof v === 'string')) return value as string[];
    if (isObject(value) && 'componentId' in value) {
      errors.push(`${where} "${owner}".${key}: ChildList templates are not supported by cre8`);
    } else {
      errors.push(`${where} "${owner}".${key}: must be an array of component ids`);
    }
    return [];
  };

  const build = (id: string): SpecChild | null => {
    const c = state.components.get(id);
    if (!c) {
      errors.push(`${where}: component "${id}" is referenced but never defined`);
      return null;
    }
    if (c.component === TEXT_COMPONENT) {
      if (typeof c.text !== 'string') {
        errors.push(`${where} "${id}": Text.text must be a literal string (cre8 text nodes cannot bind)`);
        return null;
      }
      return c.text;
    }
    const m = map.byType.get(c.component);
    if (!m) {
      errors.push(`${where} "${id}": component "${c.component}" is not in the cre8 v1.0 catalog`);
      return null;
    }
    const node: ComponentSpec = { component: m.tag };
    const props: Record<string, unknown> = {};
    const slots: Record<string, SpecChild[]> = {};
    const events: Record<string, EventBinding> = {};
    let children: SpecChild[] | undefined;
    const eventOptions = (c['@metadata'] as { extensions?: Record<string, { eventOptions?: Record<string, object> }> } | undefined)
      ?.extensions?.[EXTENSION_KEY]?.eventOptions ?? {};

    const resolveChildren = (key: string, value: unknown): SpecChild[] =>
      childIds(id, key, value).flatMap((childId) => {
        const prior = parentOf.get(childId);
        if (prior !== undefined) {
          errors.push(`${where}: component "${childId}" has two parents ("${prior}" and "${id}") — cre8 trees cannot share nodes`);
          return [];
        }
        if (childId === 'root') {
          errors.push(`${where} "${id}": "root" cannot be a child`);
          return [];
        }
        parentOf.set(childId, id);
        const built = build(childId);
        return built === null ? [] : [built];
      });

    for (const [key, value] of Object.entries(c)) {
      if (key === 'id' || key === 'component') continue;
      if (key === '@catalogId' || key === '@metadata') continue;
      if (key === '@accessibility') {
        warnings.push(`${where} "${id}": @accessibility is not mapped; use the component's own label props`);
        continue;
      }
      if (key === '@checks') {
        errors.push(`${where} "${id}": @checks are not supported by cre8`);
        continue;
      }
      const prop = m.propFromV1.get(key);
      if (prop !== undefined) {
        if (isObject(value) && '@call' in value) {
          errors.push(`${where} "${id}".${key}: function calls are not supported by cre8`);
        } else if (isObject(value) && '@path' in value) {
          if (typeof value['@path'] !== 'string') errors.push(`${where} "${id}".${key}: @path must be a string`);
          else props[prop] = { $bind: value['@path'] };
        } else {
          props[prop] = clone(value);
        }
        continue;
      }
      if (key === 'children' && m.acceptsChildren) {
        children = resolveChildren(key, value);
        continue;
      }
      const slot = m.slotFromV1.get(key);
      if (slot !== undefined) {
        slots[slot] = resolveChildren(key, value);
        continue;
      }
      const event = m.eventFromV1.get(key) ?? map.nativeEventFromV1.get(key);
      if (event !== undefined) {
        const a = value as { event?: { name?: unknown; context?: unknown }; functionCall?: unknown };
        if (!isObject(a) || a.functionCall !== undefined) {
          errors.push(`${where} "${id}".${key}: only event actions are supported (no functionCall)`);
        } else if (!isObject(a.event) || typeof a.event.name !== 'string' || !a.event.name) {
          errors.push(`${where} "${id}".${key}: action.event.name must be a non-empty string`);
        } else {
          if (a.event.context !== undefined || 'userMessage' in a.event) {
            warnings.push(`${where} "${id}".${key}: action context/userMessage dropped — cre8 events report the DOM detail instead`);
          }
          const options = eventOptions[event];
          events[event] = options ? { handler: a.event.name, ...options } : a.event.name;
        }
        continue;
      }
      errors.push(`${where} "${id}": "${key}" is not a property of ${c.component}`);
    }

    // Authored key order, so an imported spec reads like a hand-written one.
    if (Object.keys(props).length) node.props = props;
    if (children) node.children = children;
    if (Object.keys(slots).length) node.slots = slots;
    if (Object.keys(events).length) node.events = events;
    return node;
  };

  parentOf.set('root', '(surface)');
  const root = build('root');
  if (typeof root === 'string') {
    errors.push(`${where}: root must be a component, not Text`);
    return null;
  }
  const orphans = [...state.components.keys()].filter((id) => !parentOf.has(id));
  if (orphans.length) warnings.push(`${where}: unreferenced components ignored: ${orphans.join(', ')}`);
  return errors.length === errorCount ? root : null;
}

// ─── MCP tool ────────────────────────────────────────────────────────────────

export const A2uiV1Schema = z.object({
  mode: z.enum(['catalog', 'export', 'import']),
  component: z.string().optional(),
  full: z.boolean().optional(),
  spec: z.unknown().optional(),
  data: z.record(z.unknown()).optional(),
  surfaceId: z.string().optional(),
  targetSurfaceId: z.string().optional(),
  sendDataModel: z.boolean().optional(),
  messages: z.unknown().optional(),
});

export const a2uiV1Tool = {
  name: 'a2ui_v1',
  description:
    'Speak the official A2UI v1.0 protocol (a2ui.org) with cre8. ' +
    'mode="catalog": the cre8 catalog as a v1.0 catalog — a summary by default, `component` ' +
    '(e.g. "cre8-button" or "Cre8Button") for one definition, `full: true` for the whole schema. mode="export": turn a cre8 ComponentSpec (`spec` + optional ' +
    '`data`) or a live surface (`surfaceId`) into v1.0 envelope messages — one createSurface with ' +
    'inline components and dataModel, $bind props become {"@path"}. mode="import": turn v1.0 ' +
    'messages (`messages`: array or JSONL; createSurface/updateComponents/updateDataModel/deleteSurface) ' +
    'into a catalog-validated cre8 spec + data per surface, ready to pass to ui_open_surface. ' +
    'Mapping: cre8-button → Cre8Button, slot footer → slot_footer, event tab-change → on_tab_change ' +
    '(an Action), text node → Text component. @call, ChildList templates and @checks are rejected.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      mode: { type: 'string', enum: ['catalog', 'export', 'import'] },
      component: { type: 'string', description: 'mode="catalog": a single component (cre8 tag or v1 type).' },
      full: {
        type: 'boolean',
        description: 'mode="catalog": return the entire v1.0 catalog JSON Schema (~330 KB) instead of the summary.',
      },
      spec: { type: 'object', description: 'mode="export": a cre8 ComponentSpec.' },
      data: { type: 'object', description: 'mode="export": data model the spec\'s {"$bind"} props read from.' },
      surfaceId: { type: 'string', description: 'mode="export": export a live surface instead of `spec`.' },
      targetSurfaceId: {
        type: 'string',
        description: 'mode="export": surfaceId to put on the createSurface message (default: the live surface id, or "cre8_surface").',
      },
      sendDataModel: { type: 'boolean', description: 'mode="export": set createSurface.sendDataModel.' },
      messages: {
        description: 'mode="import": v1.0 envelope messages — an array, a single envelope, or a JSONL string.',
      },
    },
    required: ['mode'],
  },
};

export function handleA2uiV1(input: z.infer<typeof A2uiV1Schema>): string {
  if (input.mode === 'catalog') {
    const catalog = buildV1Catalog();
    const map = getV1Mapping();
    if (input.full) return JSON.stringify(catalog, null, 2);
    if (!input.component) {
      return JSON.stringify(
        {
          catalogId: catalog.catalogId,
          protocolVersion: A2UI_V1_VERSION,
          instructions: catalog.instructions,
          components: [
            { type: TEXT_COMPONENT, cre8Tag: null, category: 'Text node' },
            ...[...map.byType.values()].map((m) => ({
              type: m.type,
              cre8Tag: m.tag,
              category: m.def['x-category'] ?? 'Uncategorized',
              content: m.acceptsChildren ? ['children'] : [...m.slotToV1.values()],
            })),
          ],
          next: 'Call again with `component` for one definition, or `full: true` for the whole schema.',
        },
        null,
        2
      );
    }
    const m =
      map.byType.get(input.component) ??
      map.byTag.get(input.component) ??
      map.byTag.get(`cre8-${input.component}`);
    const type = m?.type ?? (input.component === TEXT_COMPONENT ? TEXT_COMPONENT : undefined);
    if (!type) throw new Error(`Unknown component "${input.component}"`);
    const components = catalog.components as Record<string, unknown>;
    const defs = catalog.$defs as Record<string, unknown>;
    return JSON.stringify(
      {
        catalogId: catalog.catalogId,
        component: type,
        cre8Tag: m?.tag,
        definition: components[type],
        sharedNativeEventHandlers: Object.keys((defs.NativeEventHandlers as { properties: object }).properties),
      },
      null,
      2
    );
  }

  if (input.mode === 'export') {
    let spec: ComponentSpec;
    let data: Record<string, unknown>;
    let surfaceId = input.targetSurfaceId;
    if (input.surfaceId) {
      if (input.spec) throw new Error('mode="export" takes `spec` or `surfaceId`, not both');
      const { model } = surfaceStore.get(input.surfaceId);
      if (!model.root) throw new Error(`surface "${input.surfaceId}" has no content yet`);
      spec = model.root;
      data = model.data;
      surfaceId ??= input.surfaceId;
    } else {
      if (!isObject(input.spec)) throw new Error('mode="export" requires `spec` (or `surfaceId`)');
      spec = input.spec as unknown as ComponentSpec;
      data = input.data ?? {};
    }
    const result = exportV1({
      spec,
      data,
      surfaceId: surfaceId ?? 'cre8_surface',
      sendDataModel: input.sendDataModel,
    });
    return JSON.stringify(
      { ...result, jsonl: result.messages.map((m) => JSON.stringify(m)).join('\n') },
      null,
      2
    );
  }

  if (input.messages === undefined) throw new Error('mode="import" requires `messages`');
  const result = importV1(input.messages);
  return JSON.stringify(
    result.ok
      ? { ...result, next: 'Pass a surface\'s `spec` and `data` to ui_open_surface to render it.' }
      : result,
    null,
    2
  );
}
