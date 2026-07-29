/**
 * Build a component's light-DOM children from a data property.
 *
 * Compound families in this system are composed by hand: a table is a table
 * wrapping a header wrapping a row wrapping cells, five levels deep, and
 * `docs/kb/01-components.md` warns that skipping a level renders but is subtly
 * wrong. That is a lot of ceremony for "here are my columns and rows", and it is
 * the single most error-prone thing an agent generates.
 *
 * So the flattened props build that composition for you. They build it in the
 * **light DOM**, not the shadow root, and that is the whole trick: the result is
 * byte-for-byte the DOM you would have written by hand, so every existing
 * `::slotted()` rule, every behaviour, and every consumer keeps working. The
 * flattened API is sugar, never a second rendering path.
 *
 * Elements this creates are marked, and only marked elements are ever touched —
 * hand-written children are left exactly where they are.
 */

/** Marks an element as owned by a data property rather than by the author. */
export const GENERATED_ATTR = 'data-cre8-generated';

export interface ChildSpec {
  tag: string;
  /** Set as properties when the value is not a string, as attributes otherwise. */
  props?: Record<string, unknown>;
  /** Text content. Mutually exclusive with `children`. */
  text?: string;
  /** `slot` attribute to place this child in a named slot of its parent. */
  slot?: string;
  children?: ChildSpec[];
}

function applyProps(el: HTMLElement, props: Record<string, unknown> = {}): void {
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) {
      el.removeAttribute(key);
      continue;
    }
    if (value === true) {
      el.setAttribute(key, '');
      continue;
    }
    if (typeof value === 'object') {
      // Arrays and objects cannot survive an attribute; hand them over directly.
      (el as unknown as Record<string, unknown>)[key] = value;
      continue;
    }
    el.setAttribute(key, String(value));
  }
}

/**
 * Reconcile in place rather than rebuilding.
 *
 * Rebuilding would be three lines shorter and would throw away element identity
 * on every data change — losing focus, scroll position, and any animation in
 * flight, which is exactly what a live-updating table must not do. So an
 * existing generated element whose tag still matches is reused and updated.
 */
function reconcile(parent: Element, specs: ChildSpec[], doc: Document): void {
  const generated = [...parent.children].filter((child) => child.hasAttribute(GENERATED_ATTR));

  specs.forEach((spec, index) => {
    let el = generated[index] as HTMLElement | undefined;

    if (!el || el.tagName.toLowerCase() !== spec.tag.toLowerCase()) {
      const created = doc.createElement(spec.tag);
      created.setAttribute(GENERATED_ATTR, '');
      if (el) parent.replaceChild(created, el);
      else parent.appendChild(created);
      el = created;
    }

    // Clear props this element no longer has, so a removed value does not stick.
    for (const attr of [...el.attributes]) {
      if (attr.name === GENERATED_ATTR || attr.name === 'slot') continue;
      if (!spec.props || !(attr.name in spec.props)) el.removeAttribute(attr.name);
    }
    applyProps(el, spec.props);

    if (spec.slot) el.setAttribute('slot', spec.slot);
    else el.removeAttribute('slot');

    if (spec.children) {
      reconcile(el, spec.children, doc);
    } else if (spec.text !== undefined) {
      if (el.textContent !== spec.text) el.textContent = spec.text;
    }
  });

  // Anything generated beyond the new length is gone.
  for (let i = specs.length; i < generated.length; i++) generated[i].remove();
}

/**
 * Make `host`'s generated light children match `specs`.
 *
 * Passing `null` removes them, which is how clearing a data property hands the
 * component back to hand-written children.
 */
export function syncLightChildren(host: HTMLElement, specs: ChildSpec[] | null | undefined): void {
  const doc = host.ownerDocument;
  if (!doc) return;
  reconcile(host, specs ?? [], doc);
}

/** True when the author has put their own children in — data props defer to none. */
export function hasAuthoredChildren(host: HTMLElement): boolean {
  return [...host.children].some((child) => !child.hasAttribute(GENERATED_ATTR));
}
