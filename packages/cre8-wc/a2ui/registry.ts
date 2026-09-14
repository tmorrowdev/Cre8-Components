import type {
  CatalogSchema,
  ComponentSpec,
  ContentRegionSchema,
  PropSchema,
  RegisteredCatalog,
} from './types.js';

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
 * Read from the catalog's `x-native-events` rather than kept here, so there is
 * one list rather than two that must be held equal. A component's `@fires` tags
 * describe only what it dispatches itself, so these can never be derived from
 * source — `click` on a button is legitimate and undocumentable.
 */
function nativeEvents(catalog: RegisteredCatalog): Set<string> {
  return new Set(catalog.schema['x-native-events'] ?? []);
}

/**
 * Checks one entry of a content region against the region's eligibility.
 *
 * Before eligibility was authored, a slot was an untyped hole: `cre8-tabs.panel`
 * holding a `cre8-button` validated cleanly and rendered nothing useful — the
 * eval's slot_validity dimension was the discriminating metric between catalog
 * arms precisely because nothing here caught it. A region without `x-accepts`
 * (an older catalog) keeps the old behaviour.
 */
function validateRegionEntry(
  entry: unknown,
  region: ContentRegionSchema | undefined,
  parent: string,
  regionLabel: string,
  path: string,
  catalog: RegisteredCatalog
): void {
  const accepts = region?.['x-accepts'];
  if (!Array.isArray(accepts)) return;
  if (typeof entry === 'string') {
    if (region?.['x-accepts-text'] === true) return;
    throw new Error(
      `${path}: ${parent}.${regionLabel} does not accept literal text. ` +
        (accepts.length ? `Eligible components: ${accepts.join(', ')}` : `It accepts nothing.`)
    );
  }
  const child = (entry as { component?: unknown } | null)?.component;
  // An unregistered component is a more fundamental error than a misplaced one,
  // and the recursive validateSpec below reports it precisely. Flagging it here
  // as "not eligible" would name the wrong problem.
  if (typeof child === 'string' && !catalog.components.has(child)) return;
  if (typeof child === 'string' && !accepts.includes(child)) {
    throw new Error(
      `${path}: ${child} is not eligible in ${parent}.${regionLabel}. ` +
        (accepts.length
          ? `Eligible: ${accepts.join(', ')}${region?.['x-accepts-text'] ? ', or literal text' : ''}`
          : `${parent}.${regionLabel} accepts nothing.`)
    );
  }
}

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
    const region = def.properties?.children;
    s.children.forEach((c, i) => {
      validateRegionEntry(c, region, s.component as string, 'children', `${path}.children[${i}]`, catalog);
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
    const native = nativeEvents(catalog);
    for (const [evtName, binding] of Object.entries(s.events as Record<string, unknown>)) {
      if (!native.has(evtName) && !declaredEvents.has(evtName)) {
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
      const region = def.properties?.slots?.properties?.[slotName];
      arr.forEach((c, i) => {
        validateRegionEntry(c, region, s.component as string, `slots.${slotName}`, `${path}.slots.${slotName}[${i}]`, catalog);
        if (typeof c === 'string') return;
        validateSpec(c, catalog, `${path}.slots.${slotName}[${i}]`);
      });
    }
  }
}
