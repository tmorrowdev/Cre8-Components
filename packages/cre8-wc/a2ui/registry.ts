import type { CatalogSchema, ComponentSpec, PropSchema, RegisteredCatalog } from './types.js';

export function registerCatalog(schema: CatalogSchema): RegisteredCatalog {
  const defs = schema.$defs?.components ?? {};
  const components = new Map(Object.entries(defs));
  const id = schema['x-a2ui']?.catalogId ?? schema.$id ?? 'unknown';
  return { id, schema, components };
}

function validatePropValue(value: unknown, schema: PropSchema | undefined, path: string): void {
  if (value === undefined || value === null) return;
  if (!schema) return;

  if (schema.const !== undefined && value !== schema.const) {
    throw new Error(
      `${path}: expected const ${JSON.stringify(schema.const)}, got ${JSON.stringify(value)}`
    );
  }

  if (schema.enum && !schema.enum.includes(value as string)) {
    const allowed = schema.enum.map((v) => JSON.stringify(v)).join(', ');
    throw new Error(`${path}: value ${JSON.stringify(value)} not in enum [${allowed}]`);
  }

  if (schema.oneOf && schema.oneOf.length) {
    const errors: string[] = [];
    for (const branch of schema.oneOf) {
      try {
        validatePropValue(value, branch, path);
        return;
      } catch (e) {
        errors.push((e as Error).message);
      }
    }
    throw new Error(
      `${path}: value ${JSON.stringify(value)} matched none of oneOf branches: ${errors.join(' | ')}`
    );
  }

  const types = Array.isArray(schema.type) ? schema.type : schema.type ? [schema.type] : [];
  if (types.length && !types.some((t) => matchesType(t, value))) {
    throw new Error(`${path}: expected type ${types.join('|')}, got ${describeType(value)}`);
  }

  if (Array.isArray(value) && schema.items) {
    value.forEach((item, i) => validatePropValue(item, schema.items, `${path}[${i}]`));
  }

  if (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    schema.properties
  ) {
    const obj = value as Record<string, unknown>;
    if (schema.required) {
      for (const req of schema.required) {
        if (!(req in obj)) {
          throw new Error(`${path}.${req}: required property missing`);
        }
      }
    }
    for (const [key, childVal] of Object.entries(obj)) {
      const childSchema = schema.properties[key];
      if (!childSchema) {
        if (schema.additionalProperties === false) {
          throw new Error(`${path}.${key}: unexpected property`);
        }
        continue;
      }
      validatePropValue(childVal, childSchema, `${path}.${key}`);
    }
  }
}

function matchesType(t: string, v: unknown): boolean {
  switch (t) {
    case 'string':
      return typeof v === 'string';
    case 'number':
      return typeof v === 'number' && Number.isFinite(v);
    case 'integer':
      return typeof v === 'number' && Number.isInteger(v);
    case 'boolean':
      return typeof v === 'boolean';
    case 'array':
      return Array.isArray(v);
    case 'object':
      return typeof v === 'object' && v !== null && !Array.isArray(v);
    case 'null':
      return v === null;
    default:
      return true;
  }
}

function describeType(v: unknown): string {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v;
}

/**
 * Native DOM events, bindable on any component.
 *
 * A component's `@fires` tags describe only what it dispatches itself, so the
 * catalog can never list these — but `addEventListener` handles them on every
 * element, and binding `click` to a button is the single most common thing an
 * agent does. Kept deliberately narrow: the point of validating event names is
 * to catch invented ones, so this is the set that genuinely fires, not every
 * event name in the HTML spec.
 */
const NATIVE_DOM_EVENTS = new Set([
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
]);

export function validateSpec(spec: unknown, catalog: RegisteredCatalog, path = '$'): asserts spec is ComponentSpec {
  if (!spec || typeof spec !== 'object') {
    throw new Error(`${path}: spec must be an object`);
  }
  const s = spec as Record<string, unknown>;
  if (typeof s.component !== 'string') {
    throw new Error(`${path}: spec.component must be a string`);
  }
  if (!catalog.components.has(s.component)) {
    throw new Error(
      `${path}: component "${s.component}" is not registered in catalog "${catalog.id}"`
    );
  }

  const def = catalog.components.get(s.component)!;
  const allowedProps = new Set(Object.keys(def.properties?.props?.properties ?? {}));
  const hasChildren = def.properties?.children !== undefined;
  const allowedSlots = def.properties?.slots
    ? new Set(Object.keys(def.properties.slots.properties ?? {}))
    : null;

  if (s.props) {
    if (typeof s.props !== 'object') throw new Error(`${path}.props: must be an object`);
    const propDefs = def.properties?.props?.properties ?? {};
    for (const [prop, value] of Object.entries(s.props as Record<string, unknown>)) {
      if (!allowedProps.has(prop)) {
        throw new Error(`${path}.props.${prop}: not a declared prop on ${s.component}`);
      }
      validatePropValue(value, propDefs[prop], `${path}.props.${prop}`);
    }
  }

  if (s.children !== undefined) {
    if (!hasChildren) {
      throw new Error(`${path}.children: ${s.component} does not accept default children`);
    }
    if (!Array.isArray(s.children)) throw new Error(`${path}.children: must be an array`);
    s.children.forEach((c, i) => {
      if (typeof c === 'string') return;
      validateSpec(c, catalog, `${path}.children[${i}]`);
    });
  }

  if (s.events !== undefined) {
    if (!s.events || typeof s.events !== 'object' || Array.isArray(s.events)) {
      throw new Error(`${path}.events: must be an object`);
    }
    // Custom event *names* are checked against the catalog, the same way props
    // and slots are. Previously only the binding shape was validated, so an
    // invented event bound cleanly and then silently never fired — the worst
    // failure mode available, since the UI renders and simply does nothing.
    //
    // Native DOM events are always allowed: `addEventListener` handles them on
    // any element, and `@fires` documents only what a component dispatches
    // itself. `click` on a button is legitimate and undocumented by design.
    const declaredEvents = new Set(Object.keys(def['x-events'] ?? {}));
    for (const [evtName, binding] of Object.entries(s.events as Record<string, unknown>)) {
      if (!NATIVE_DOM_EVENTS.has(evtName) && !declaredEvents.has(evtName)) {
        const available = [...declaredEvents].sort().join(', ');
        throw new Error(
          `${path}.events.${evtName}: not a declared event on ${s.component}. ` +
            (available
              ? `Custom events available: ${available}`
              : `${s.component} declares no custom events`)
        );
      }
      if (typeof binding === 'string') continue;
      if (!binding || typeof binding !== 'object') {
        throw new Error(`${path}.events.${evtName}: must be a string or { handler } object`);
      }
      const b = binding as Record<string, unknown>;
      if (typeof b.handler !== 'string' || b.handler.length === 0) {
        throw new Error(`${path}.events.${evtName}.handler: must be a non-empty string`);
      }
    }
  }

  if (s.slots !== undefined) {
    if (!allowedSlots) {
      throw new Error(`${path}.slots: ${s.component} does not accept named slots`);
    }
    if (typeof s.slots !== 'object') throw new Error(`${path}.slots: must be an object`);
    for (const [slotName, arr] of Object.entries(s.slots as Record<string, unknown>)) {
      if (!allowedSlots.has(slotName)) {
        throw new Error(
          `${path}.slots.${slotName}: not a declared slot on ${s.component}`
        );
      }
      if (!Array.isArray(arr)) {
        throw new Error(`${path}.slots.${slotName}: must be an array`);
      }
      arr.forEach((c, i) => {
        if (typeof c === 'string') return;
        validateSpec(c, catalog, `${path}.slots.${slotName}[${i}]`);
      });
    }
  }
}
