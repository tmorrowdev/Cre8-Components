/**
 * a2ui-render — turn a cre8-a2ui schema into DOM.
 *
 * A browser port of `render_schema` from packages/cre8-mcp-ui. The vendored
 * cre8-wc bundle ships the components but not a schema renderer, and the site's
 * CSP forbids inline script and remote code, so the demo carries its own.
 *
 * Node shapes:
 *   { text }                      → a text node (escaped by construction)
 *   { html }                      → trusted markup, authored in this repo
 *   { component, props, events,
 *     children, slots }           → an element
 *
 * Two conventions that matter, both learned the hard way:
 *
 *   `children` is the catalog's spelling for default-slot content and for many
 *   components the only accepted one, so it is treated as the default slot.
 *
 *   Labels belong in props, not children. cre8-button and the nav items render
 *   `${this.text}` and expose no default slot, so child text on those elements
 *   is invisible. The schema already respects this; the renderer does not need
 *   to special-case it, but anyone editing a schema by hand should know.
 */

const EVENT_ATTR = 'data-cre8-action';

/** events: { click: { type, ... } } → the data attributes the bridge wires. */
function applyEvents(el, events) {
  const entries = Object.entries(events || {});
  if (!entries.length) return;
  const [trigger, ev] = entries[0];
  if (!ev || typeof ev !== 'object') return;

  const params = {};
  switch (ev.type) {
    case 'tool':
      if (!ev.toolName) throw new Error("event type 'tool' requires toolName");
      el.setAttribute(EVENT_ATTR, `tool:${ev.toolName}`);
      if (ev.params) Object.assign(params, ev.params);
      break;
    case 'prompt':
      el.setAttribute(EVENT_ATTR, 'prompt');
      if (ev.text) params.text = ev.text;
      break;
    case 'link':
      el.setAttribute(EVENT_ATTR, 'link');
      if (ev.url) params.url = ev.url;
      break;
    case 'notify':
      el.setAttribute(EVENT_ATTR, 'notify');
      if (ev.message) params.message = ev.message;
      break;
    case 'intent':
      if (!ev.intent) throw new Error("event type 'intent' requires intent");
      el.setAttribute(EVENT_ATTR, `intent:${ev.intent}`);
      if (ev.params) Object.assign(params, ev.params);
      break;
    default:
      throw new Error(`unknown event type: ${ev.type}`);
  }
  if (Object.keys(params).length) {
    el.setAttribute('data-cre8-params', JSON.stringify(params));
  }
  if (trigger !== 'click') el.setAttribute('data-cre8-trigger', trigger);
}

function applyProps(el, props) {
  for (const [key, val] of Object.entries(props || {})) {
    if (val === true) el.setAttribute(key, '');
    else if (val === false || val == null) continue;
    else el.setAttribute(key, String(val));
  }
}

/** Collect default-slot content from both spellings, in document order. */
function defaultSlotItems(node) {
  const fromSlots = (node.slots && node.slots.default) || [];
  const fromChildren = node.children == null ? [] : node.children;
  const asArray = v => (Array.isArray(v) ? v : [v]);
  return [...asArray(fromSlots), ...asArray(fromChildren)];
}

export function renderNode(node, doc = document) {
  if (typeof node === 'string') return doc.createTextNode(node);
  if (!node || typeof node !== 'object') {
    throw new Error(`schema node must be an object, got ${typeof node}`);
  }
  if ('html' in node) {
    const tpl = doc.createElement('template');
    tpl.innerHTML = node.html;
    return tpl.content;
  }
  if ('text' in node) return doc.createTextNode(String(node.text));

  const tag = node.component;
  if (!tag || !/^[a-z][a-z0-9-]*$/.test(tag)) {
    throw new Error(`invalid or missing 'component': ${JSON.stringify(tag)}`);
  }

  const el = doc.createElement(tag);
  applyProps(el, node.props);
  applyEvents(el, node.events);

  for (const item of defaultSlotItems(node)) {
    el.appendChild(renderNode(item, doc));
  }
  for (const [slotName, items] of Object.entries(node.slots || {})) {
    if (slotName === 'default') continue;
    for (const item of (Array.isArray(items) ? items : [items])) {
      const child = renderNode(item, doc);
      // A slot name has to land on an element; wrap text and fragments.
      if (child.nodeType === Node.ELEMENT_NODE) {
        child.setAttribute('slot', slotName);
        el.appendChild(child);
      } else {
        const span = doc.createElement('span');
        span.setAttribute('slot', slotName);
        span.appendChild(child);
        el.appendChild(span);
      }
    }
  }
  return el;
}

export function render(schema, into) {
  const root = schema && schema.root ? schema.root : schema;
  const frag = document.createDocumentFragment();
  frag.appendChild(renderNode(root));
  if (into) {
    into.textContent = '';
    into.appendChild(frag);
    return into;
  }
  return frag;
}

/** Top-level sections, so the demo can reveal the page progressively. */
export function topLevelSections(schema) {
  const root = schema && schema.root ? schema.root : schema;
  return defaultSlotItems(root);
}

export default render;
