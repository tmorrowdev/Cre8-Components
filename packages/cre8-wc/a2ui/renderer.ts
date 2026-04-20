import type {
  ComponentSpec,
  EmittedEvent,
  EventBinding,
  PropSchema,
  RegisteredCatalog,
} from './types.js';
import { validateSpec } from './registry.js';

export interface RenderOptions {
  root?: HTMLElement;
  doc?: Document;
  onEvent?: (evt: EmittedEvent) => void;
}

export function render(
  spec: ComponentSpec,
  catalog: RegisteredCatalog,
  options: RenderOptions = {}
): HTMLElement {
  validateSpec(spec, catalog);
  const doc = options.doc ?? document;
  const el = buildElement(spec, catalog, doc, '$', options.onEvent);
  if (options.root) options.root.replaceChildren(el);
  return el;
}

function buildElement(
  spec: ComponentSpec,
  catalog: RegisteredCatalog,
  doc: Document,
  path: string,
  onEvent?: (evt: EmittedEvent) => void
): HTMLElement {
  const def = catalog.components.get(spec.component)!;
  const propDefs = def.properties?.props?.properties ?? {};
  const el = doc.createElement(spec.component);

  if (spec.props) {
    for (const [key, value] of Object.entries(spec.props)) {
      applyProp(el, key, value, propDefs[key]);
    }
  }

  if (spec.events && onEvent) {
    for (const [evtName, binding] of Object.entries(spec.events)) {
      attachEvent(el, spec.component, path, evtName, binding, onEvent);
    }
  }

  if (spec.children) {
    spec.children.forEach((child, i) => {
      if (typeof child === 'string') {
        el.appendChild(doc.createTextNode(child));
        return;
      }
      el.appendChild(buildElement(child, catalog, doc, `${path}.children[${i}]`, onEvent));
    });
  }

  if (spec.slots) {
    for (const [slotName, children] of Object.entries(spec.slots)) {
      children.forEach((child, i) => {
        if (typeof child === 'string') {
          if (slotName === 'default') {
            el.appendChild(doc.createTextNode(child));
          } else {
            const wrap = doc.createElement('span');
            wrap.setAttribute('slot', slotName);
            wrap.textContent = child;
            el.appendChild(wrap);
          }
          return;
        }
        const childEl = buildElement(
          child,
          catalog,
          doc,
          `${path}.slots.${slotName}[${i}]`,
          onEvent
        );
        if (slotName !== 'default') childEl.setAttribute('slot', slotName);
        el.appendChild(childEl);
      });
    }
  }

  return el;
}

function attachEvent(
  el: HTMLElement,
  component: string,
  path: string,
  eventName: string,
  binding: EventBinding,
  onEvent: (evt: EmittedEvent) => void
): void {
  const handler = typeof binding === 'string' ? binding : binding.handler;
  const stop = typeof binding === 'object' && binding.stopPropagation === true;
  const prevent = typeof binding === 'object' && binding.preventDefault === true;

  el.addEventListener(eventName, (nativeEvent) => {
    if (stop) nativeEvent.stopPropagation();
    if (prevent) nativeEvent.preventDefault();
    const detail = 'detail' in nativeEvent
      ? (nativeEvent as CustomEvent).detail
      : undefined;
    onEvent({
      component,
      path,
      event: eventName,
      handler,
      detail,
      nativeEvent,
    });
  });
}

function applyProp(
  el: HTMLElement,
  key: string,
  value: unknown,
  schema: PropSchema | undefined
): void {
  if (value === undefined || value === null) return;

  if (schema?.['x-kind'] === 'property') {
    (el as unknown as Record<string, unknown>)[key] = value;
    return;
  }

  if (typeof value === 'boolean') {
    if (value) el.setAttribute(key, '');
    else el.removeAttribute(key);
    return;
  }

  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
    (el as unknown as Record<string, unknown>)[key] = value;
    return;
  }

  if (schema && isComplexSchema(schema)) {
    (el as unknown as Record<string, unknown>)[key] = value;
    return;
  }

  el.setAttribute(key, String(value));
}

function isComplexSchema(schema: PropSchema): boolean {
  const t = schema.type;
  if (Array.isArray(t)) return t.some((x) => x === 'object' || x === 'array');
  return t === 'object' || t === 'array';
}
