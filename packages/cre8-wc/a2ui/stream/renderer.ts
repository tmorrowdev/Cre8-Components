/**
 * SurfaceRenderer — mirrors a SurfaceModel into live DOM, incrementally.
 *
 * The model is the source of truth; a `SurfaceChange` is only an invalidation
 * hint, so the renderer always re-reads current state rather than trusting a
 * diff it was handed. Elements are keyed by spec-node *object identity* (a
 * WeakMap), not by path — paths shift when a sibling is inserted, and an element
 * that keeps its identity keeps its internal state, its focus, and its
 * animations.
 */

import type { ComponentSpec, EmittedEvent, EventBinding, SpecChild } from '../types.js';
import { applyProp } from '../renderer.js';
import type { ApplyResult, SurfaceModel } from './model.js';
import { resolveNode } from './model.js';
import type { ContentTarget, SurfaceChange, SurfaceMessage } from './types.js';

export interface SurfaceRendererOptions {
  root: HTMLElement;
  doc?: Document;
  onEvent?: (evt: EmittedEvent) => void;
}

interface Bookkeeping {
  props: Set<string>;
  events: Map<string, EventListener>;
  /** Text nodes by `slot#index`, so a token append mutates rather than replaces. */
  texts: Map<string, Text | HTMLElement>;
}

export class SurfaceRenderer {
  readonly model: SurfaceModel;
  private readonly rootEl: HTMLElement;
  private readonly doc: Document;
  private readonly onEvent?: (evt: EmittedEvent) => void;
  private readonly elements = new WeakMap<object, HTMLElement>();
  private readonly book = new WeakMap<HTMLElement, Bookkeeping>();

  constructor(model: SurfaceModel, options: SurfaceRendererOptions) {
    this.model = model;
    this.rootEl = options.root;
    this.doc = options.doc ?? options.root.ownerDocument ?? document;
    this.onEvent = options.onEvent;
  }

  /** Apply a message to the model, then mirror the resulting changes to DOM. */
  apply(message: SurfaceMessage): ApplyResult {
    let result: ApplyResult;
    try {
      result = this.model.apply(message);
    } catch (error) {
      // A rolled-back patch restored the tree from a copy, so every node object
      // this renderer knows about is now a stranger. Remount before rethrowing.
      if ((error as { rolledBack?: boolean })?.rolledBack) this.mount();
      throw error;
    }
    this.reconcile(result.changes);
    return result;
  }

  reconcile(changes: SurfaceChange[]): void {
    for (const change of changes) {
      switch (change.kind) {
        case 'root':
          this.mount();
          break;
        case 'data':
          if (this.model.root) this.refreshProps(this.model.root);
          break;
        case 'content':
        case 'text':
          this.reconcileContainer(change.path);
          break;
        case 'props': {
          const node = this.model.nodeAt(change.path);
          if (typeof node !== 'string') this.applyProps(node);
          break;
        }
        case 'events': {
          const node = this.model.nodeAt(change.path);
          if (typeof node !== 'string') this.applyEvents(node);
          break;
        }
      }
    }
  }

  /** Full (re)render of the surface root. */
  mount(): void {
    const root = this.model.root;
    if (!root) {
      this.rootEl.replaceChildren();
      return;
    }
    const el = this.elementFor(root);
    this.reconcileChildren(root, el);
    if (this.rootEl.firstChild !== el || this.rootEl.childNodes.length !== 1) {
      this.rootEl.replaceChildren(el);
    }
  }

  /** The element currently rendering the node at `path`, if it exists. */
  elementAt(path: string): HTMLElement | undefined {
    const node = this.model.nodeAt(path);
    return typeof node === 'string' ? undefined : this.elements.get(node);
  }

  // ─── internals ────────────────────────────────────────────────────────────

  private elementFor(node: ComponentSpec): HTMLElement {
    const existing = this.elements.get(node);
    if (existing) return existing;
    const el = this.doc.createElement(node.component);
    this.elements.set(node, el);
    this.book.set(el, { props: new Set(), events: new Map(), texts: new Map() });
    this.applyProps(node);
    this.applyEvents(node);
    this.reconcileChildren(node, el);
    return el;
  }

  private applyProps(node: ComponentSpec): void {
    const el = this.elements.get(node);
    if (!el) return;
    const bk = this.book.get(el)!;
    const defs =
      this.model.catalog.components.get(node.component)?.properties?.props?.properties ?? {};
    const resolved = resolveNode(node, this.model.data) as ComponentSpec;
    const next = resolved.props ?? {};

    for (const key of bk.props) {
      if (!(key in next)) {
        el.removeAttribute(key);
        try {
          delete (el as unknown as Record<string, unknown>)[key];
        } catch {
          /* a component may define the property non-configurable; leaving it is fine */
        }
      }
    }
    bk.props = new Set(Object.keys(next));
    for (const [key, value] of Object.entries(next)) {
      applyProp(el, key, value, defs[key]);
    }
  }

  private applyEvents(node: ComponentSpec): void {
    const el = this.elements.get(node);
    if (!el) return;
    const bk = this.book.get(el)!;
    for (const [name, listener] of bk.events) el.removeEventListener(name, listener);
    bk.events.clear();
    if (!node.events || !this.onEvent) return;

    for (const [eventName, binding] of Object.entries(node.events)) {
      const listener = this.makeListener(node, eventName, binding);
      el.addEventListener(eventName, listener);
      bk.events.set(eventName, listener);
    }
  }

  private makeListener(node: ComponentSpec, eventName: string, binding: EventBinding): EventListener {
    const handler = typeof binding === 'string' ? binding : binding.handler;
    const stop = typeof binding === 'object' && binding.stopPropagation === true;
    const prevent = typeof binding === 'object' && binding.preventDefault === true;
    return (nativeEvent: Event) => {
      if (stop) nativeEvent.stopPropagation();
      if (prevent) nativeEvent.preventDefault();
      this.onEvent?.({
        component: node.component,
        // Resolved at fire time: an insert above this node moves its path.
        path: findPath(this.model.root, node) ?? '$',
        event: eventName,
        handler,
        detail: 'detail' in nativeEvent ? (nativeEvent as CustomEvent).detail : undefined,
        nativeEvent,
      });
    };
  }

  private reconcileContainer(path: string): void {
    const node = this.model.nodeAt(path);
    if (typeof node === 'string') return;
    const el = this.elements.get(node);
    if (!el) return;
    this.reconcileChildren(node, el);
  }

  /**
   * Rebuild the container's DOM child list in place. `children` first, then each
   * named slot in declaration order — DOM order inside a slotted host does not
   * affect layout, but a stable order keeps the reconcile a no-op when nothing
   * moved.
   */
  private reconcileChildren(node: ComponentSpec, el: HTMLElement): void {
    const bk = this.book.get(el)!;
    const desired: Node[] = [];
    const liveTextKeys = new Set<string>();

    const push = (child: SpecChild, slot: ContentTarget, index: number) => {
      if (typeof child === 'string') liveTextKeys.add(textKey(slot, index));
      desired.push(this.nodeFor(child, slot, index, bk));
    };

    (node.children ?? []).forEach((child, i) => push(child, null, i));
    if (node.slots) {
      for (const [slotName, list] of Object.entries(node.slots)) {
        list.forEach((child, i) => push(child, slotName, i));
      }
    }
    for (const key of [...bk.texts.keys()]) {
      if (!liveTextKeys.has(key)) bk.texts.delete(key);
    }

    for (let i = 0; i < desired.length; i++) {
      const current = el.childNodes[i];
      if (current === desired[i]) continue;
      el.insertBefore(desired[i], current ?? null);
    }
    while (el.childNodes.length > desired.length) {
      el.removeChild(el.childNodes[el.childNodes.length - 1]);
    }
  }

  private nodeFor(child: SpecChild, slot: ContentTarget, index: number, bk: Bookkeeping): Node {
    if (typeof child === 'string') {
      const key = textKey(slot, index);
      const bare = slot === null || slot === 'default';
      const cached = bk.texts.get(key);
      if (cached && (bare ? cached.nodeType === 3 : cached.nodeType === 1)) {
        if (cached.textContent !== child) cached.textContent = child;
        return cached;
      }
      let created: Text | HTMLElement;
      if (bare) {
        created = this.doc.createTextNode(child);
      } else {
        created = this.doc.createElement('span');
        created.setAttribute('slot', slot);
        created.textContent = child;
      }
      bk.texts.set(key, created);
      return created;
    }
    const el = this.elementFor(child);
    if (slot !== null && slot !== 'default') el.setAttribute('slot', slot);
    else el.removeAttribute('slot');
    return el;
  }

  /** Re-resolve bound props across the whole tree after a data-model change. */
  private refreshProps(node: ComponentSpec): void {
    this.applyProps(node);
    for (const child of node.children ?? []) {
      if (typeof child !== 'string') this.refreshProps(child);
    }
    if (node.slots) {
      for (const list of Object.values(node.slots)) {
        for (const child of list) if (typeof child !== 'string') this.refreshProps(child);
      }
    }
  }
}

function textKey(slot: ContentTarget, index: number): string {
  return `${slot ?? ''}#${index}`;
}

/** Locate a node in the tree by object identity, returning its current path. */
export function findPath(root: ComponentSpec | null, target: ComponentSpec, path = '$'): string | null {
  if (!root) return null;
  if (root === target) return path;
  const children = root.children ?? [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (typeof child === 'string') continue;
    const found = findPath(child, target, `${path}.children[${i}]`);
    if (found) return found;
  }
  if (root.slots) {
    for (const [slotName, list] of Object.entries(root.slots)) {
      for (let i = 0; i < list.length; i++) {
        const child = list[i];
        if (typeof child === 'string') continue;
        const found = findPath(child, target, `${path}.slots.${slotName}[${i}]`);
        if (found) return found;
      }
    }
  }
  return null;
}
