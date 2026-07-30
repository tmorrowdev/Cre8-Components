/**
 * SurfaceModel — the authoritative, DOM-free state of a streaming surface.
 *
 * The model runs identically in Node and in the browser. That is the point: the
 * MCP server applies a patch to reject it at the tool boundary and to keep a
 * canonical snapshot for late joiners, and the browser applies the same patch to
 * move real DOM. One set of apply-semantics, two hosts.
 *
 * Every message is applied atomically to a draft. If any op fails validation,
 * the draft is discarded and the surface is left exactly as it was — a rejected
 * patch never half-lands.
 */

import type { ComponentSpec, RegisteredCatalog, SpecChild } from '../types.js';
import { validateSpec } from '../registry.js';
import { childPath, parsePath, pointerGet, pointerRemove, pointerSet } from './pointer.js';
import {
  A2UI_STREAM_VERSION,
  isBindingRef,
  type ContentTarget,
  type DataPatch,
  type PatchOp,
  type SurfaceChange,
  type SurfaceMessage,
  type SurfaceState,
} from './types.js';

export interface SurfaceModelOptions {
  surfaceId?: string;
  title?: string;
  data?: Record<string, unknown>;
  /**
   * Reject a message whose `seq` is not exactly one past the last applied one.
   * On by default — a silent gap is how a streamed UI ends up subtly wrong.
   * Messages with no `seq` are always accepted (local, in-process use).
   */
  strictSeq?: boolean;
}

export interface ApplyResult {
  changes: SurfaceChange[];
  seq: number;
}

export class SurfaceSeqGapError extends Error {
  constructor(
    readonly expected: number,
    readonly received: number
  ) {
    super(`surface message out of order: expected seq ${expected}, received ${received}`);
    this.name = 'SurfaceSeqGapError';
  }
}

function clone<T>(value: T): T {
  if (value === undefined || value === null) return value;
  const sc = (globalThis as { structuredClone?: <U>(v: U) => U }).structuredClone;
  return sc ? sc(value) : (JSON.parse(JSON.stringify(value)) as T);
}

/**
 * Deep-copy a node with `{ $bind }` prop values replaced by their data-model
 * values. An unresolvable binding with no `default` drops the prop entirely
 * rather than passing `undefined` through — a prop that is absent is a prop the
 * validator and the renderer both handle correctly.
 */
export function resolveNode(node: SpecChild, data: Record<string, unknown>): SpecChild {
  if (typeof node === 'string') return node;
  const out: ComponentSpec = { component: node.component };

  if (node.props) {
    const props: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node.props)) {
      if (isBindingRef(value)) {
        const resolved = pointerGet(data, value.$bind);
        const effective = resolved === undefined ? value.default : resolved;
        if (effective !== undefined) props[key] = clone(effective);
      } else {
        props[key] = clone(value);
      }
    }
    out.props = props;
  }

  if (node.events) out.events = clone(node.events);
  if (node.children) out.children = node.children.map((c) => resolveNode(c, data));
  if (node.slots) {
    const slots: Record<string, SpecChild[]> = {};
    for (const [name, arr] of Object.entries(node.slots)) {
      slots[name] = arr.map((c) => resolveNode(c, data));
    }
    out.slots = slots;
  }
  return out;
}

export class SurfaceModel {
  readonly catalog: RegisteredCatalog;
  surfaceId: string;
  title: string | undefined;
  state: SurfaceState = 'idle';
  seq = 0;
  data: Record<string, unknown>;

  private readonly strictSeq: boolean;
  private _root: ComponentSpec | null = null;

  constructor(catalog: RegisteredCatalog, options: SurfaceModelOptions = {}) {
    this.catalog = catalog;
    this.surfaceId = options.surfaceId ?? 'surface';
    this.title = options.title;
    this.data = options.data ? clone(options.data) : {};
    this.strictSeq = options.strictSeq !== false;
  }

  get root(): ComponentSpec | null {
    return this._root;
  }

  /** The tree with every binding resolved — what a renderer or snapshot sees. */
  snapshot(): ComponentSpec | null {
    return this._root ? (resolveNode(this._root, this.data) as ComponentSpec) : null;
  }

  /** The raw (unresolved) node at `path`. Throws if nothing is there. */
  nodeAt(path: string): SpecChild {
    return nodeAtIn(this._root, path);
  }

  /** The resolved node at `path` — bindings substituted. */
  resolvedAt(path: string): SpecChild {
    return resolveNode(this.nodeAt(path), this.data);
  }

  apply(message: SurfaceMessage): ApplyResult {
    const version = (message as { v?: number }).v;
    if (version !== undefined && version !== A2UI_STREAM_VERSION) {
      throw new Error(`unsupported surface protocol version ${String(version)}`);
    }
    if (this.strictSeq && typeof message.seq === 'number' && message.type !== 'surface.create') {
      const expected = this.seq + 1;
      if (message.seq !== expected) throw new SurfaceSeqGapError(expected, message.seq);
    }

    let changes: SurfaceChange[];
    switch (message.type) {
      case 'surface.create':
        changes = this.applyCreate(message);
        break;
      case 'surface.patch':
        changes = this.applyOps(message.ops);
        break;
      case 'surface.data':
        changes = this.applyData(message.patches);
        break;
      case 'surface.status':
        this.state = message.state;
        changes = [];
        break;
      case 'surface.delete':
        this._root = null;
        this.state = 'done';
        changes = [{ kind: 'root' }];
        break;
      default: {
        const bad = message as { type?: unknown };
        throw new Error(`unknown surface message type ${JSON.stringify(bad.type)}`);
      }
    }

    if (typeof message.seq === 'number') this.seq = message.seq;
    else this.seq += 1;
    return { changes, seq: this.seq };
  }

  private applyCreate(message: Extract<SurfaceMessage, { type: 'surface.create' }>): SurfaceChange[] {
    if (message.catalogId && message.catalogId !== this.catalog.id) {
      throw new Error(
        `surface.create: catalogId "${message.catalogId}" does not match registered catalog "${this.catalog.id}"`
      );
    }
    this.surfaceId = message.surfaceId ?? this.surfaceId;
    if (message.title !== undefined) this.title = message.title;
    this.data = message.data ? clone(message.data) : {};
    if (message.root) {
      const draft = clone(message.root);
      validateSpec(resolveNode(draft, this.data), this.catalog, '$');
      this._root = draft;
    } else {
      this._root = null;
    }
    this.state = 'streaming';
    return [{ kind: 'root' }];
  }

  private applyData(patches: DataPatch[]): SurfaceChange[] {
    if (!Array.isArray(patches)) throw new Error('surface.data: patches must be an array');
    const draft = clone(this.data);
    let next: Record<string, unknown> = draft;
    for (const patch of patches) {
      if (!patch || typeof patch.pointer !== 'string') {
        throw new Error('surface.data: each patch needs a string "pointer"');
      }
      if (patch.op === 'remove') pointerRemove(next, patch.pointer);
      else next = pointerSet(next, patch.pointer, patch.value) as Record<string, unknown>;
    }
    // A binding can feed a validated enum prop, so data changes are validated too.
    if (this._root) validateSpec(resolveNode(this._root, next), this.catalog, '$');
    this.data = next;
    return [{ kind: 'data' }];
  }

  private applyOps(ops: PatchOp[]): SurfaceChange[] {
    if (!Array.isArray(ops)) throw new Error('surface.patch: ops must be an array');

    // Ops mutate the live tree in place, because node object identity is how a
    // renderer keeps an element (and its focus and state) across a patch. The
    // backup buys back atomicity: if any op in the message fails, the surface is
    // restored whole and the error is marked `rolledBack` so a renderer knows
    // its identity map is now stale and it must remount.
    const backup: ComponentSpec | null = clone(this._root);
    const draft = { root: this._root };
    const changes: SurfaceChange[] = [];
    // Paths whose subtree must revalidate. Validating a container covers the
    // nodes inserted into it, because validateSpec recurses.
    const toValidate = new Set<string>();

    try {
      for (const op of ops) {
        changes.push(...this.applyOp(draft, op, toValidate));
      }
      for (const path of toValidate) {
        if (path === '$') {
          if (draft.root) validateSpec(resolveNode(draft.root, this.data), this.catalog, '$');
          continue;
        }
        const node = nodeAtIn(draft.root, path);
        if (typeof node === 'string') continue;
        validateSpec(resolveNode(node, this.data), this.catalog, path);
      }
    } catch (error) {
      this._root = backup;
      if (error instanceof Error) (error as Error & { rolledBack?: boolean }).rolledBack = true;
      throw error;
    }

    this._root = draft.root;
    return changes;
  }

  private applyOp(
    draft: { root: ComponentSpec | null },
    op: PatchOp,
    toValidate: Set<string>
  ): SurfaceChange[] {
    if (!op || typeof (op as { op?: unknown }).op !== 'string') {
      throw new Error('surface.patch: each op needs a string "op"');
    }
    if (typeof op.path !== 'string') {
      throw new Error(`surface.patch: op "${op.op}" needs a string "path"`);
    }

    // Root-level structural ops are their own case: there is no parent to splice.
    if (op.path === '$' && (op.op === 'replace' || op.op === 'remove')) {
      if (op.op === 'remove') {
        draft.root = null;
        return [{ kind: 'root' }];
      }
      if (typeof op.node === 'string') {
        throw new Error('$: the surface root must be a component, not a text node');
      }
      draft.root = clone(op.node);
      toValidate.add('$');
      return [{ kind: 'root' }];
    }

    if (op.op === 'replace' || op.op === 'remove') {
      const { parent, list, index, slot, parentPath } = locateChild(draft.root, op.path);
      if (op.op === 'remove') {
        list.splice(index, 1);
        pruneEmpty(parent, slot, list);
      } else {
        list[index] = clone(op.node);
      }
      toValidate.add(parentPath);
      return [{ kind: 'content', path: parentPath, slot }];
    }

    const target = requireComponent(draft.root, op.path);

    switch (op.op) {
      case 'setProps': {
        if (!op.props || typeof op.props !== 'object' || Array.isArray(op.props)) {
          throw new Error(`${op.path}: setProps needs a "props" object`);
        }
        const props = { ...(target.props ?? {}) };
        for (const [key, value] of Object.entries(op.props)) {
          if (value === null) delete props[key];
          else props[key] = clone(value);
        }
        if (Object.keys(props).length) target.props = props;
        else delete target.props;
        toValidate.add(op.path);
        return [{ kind: 'props', path: op.path }];
      }

      case 'setEvents': {
        if (!op.events || typeof op.events !== 'object' || Array.isArray(op.events)) {
          throw new Error(`${op.path}: setEvents needs an "events" object`);
        }
        const events = { ...(target.events ?? {}) } as Record<string, unknown>;
        for (const [key, value] of Object.entries(op.events)) {
          if (value === null) delete events[key];
          else events[key] = clone(value);
        }
        if (Object.keys(events).length) target.events = events as ComponentSpec['events'];
        else delete target.events;
        toValidate.add(op.path);
        return [{ kind: 'events', path: op.path }];
      }

      case 'append':
      case 'insert': {
        const nodes = op.nodes;
        if (!Array.isArray(nodes)) throw new Error(`${op.path}: ${op.op} needs a "nodes" array`);
        const slot = normalizeSlot(op.slot);
        const list = contentList(target, slot);
        const at = op.op === 'append' ? list.length : clampIndex(op.index, list.length, op.path);
        list.splice(at, 0, ...nodes.map((n) => clone(n)));
        toValidate.add(op.path);
        return [{ kind: 'content', path: op.path, slot }];
      }

      case 'clear': {
        const slot = normalizeSlot(op.slot);
        const list = contentList(target, slot);
        list.length = 0;
        pruneEmpty(target, slot, list);
        toValidate.add(op.path);
        return [{ kind: 'content', path: op.path, slot }];
      }

      case 'setText': {
        if (typeof op.text !== 'string') throw new Error(`${op.path}: setText needs a "text" string`);
        const slot = normalizeSlot(op.slot);
        const list = contentList(target, slot);
        list.length = 0;
        list.push(op.text);
        toValidate.add(op.path);
        return [{ kind: 'content', path: op.path, slot }];
      }

      case 'appendText': {
        if (typeof op.text !== 'string') {
          throw new Error(`${op.path}: appendText needs a "text" string`);
        }
        const slot = normalizeSlot(op.slot);
        const list = contentList(target, slot);
        const last = list[list.length - 1];
        if (typeof last === 'string') {
          list[list.length - 1] = last + op.text;
          toValidate.add(op.path);
          return [{ kind: 'text', path: op.path, slot }];
        }
        list.push(op.text);
        toValidate.add(op.path);
        return [{ kind: 'content', path: op.path, slot }];
      }

      default: {
        const bad = op as { op?: unknown };
        throw new Error(`unknown patch op ${JSON.stringify(bad.op)}`);
      }
    }
  }
}

// ─── helpers ────────────────────────────────────────────────────────────────

function normalizeSlot(slot: ContentTarget | undefined): ContentTarget {
  return slot === undefined ? null : slot;
}

function clampIndex(index: unknown, length: number, path: string): number {
  if (!Number.isInteger(index)) throw new Error(`${path}: insert needs an integer "index"`);
  const i = index as number;
  if (i < 0 || i > length) {
    throw new Error(`${path}: insert index ${i} out of range 0..${length}`);
  }
  return i;
}

function contentList(spec: ComponentSpec, slot: ContentTarget): SpecChild[] {
  if (slot === null) {
    if (!spec.children) spec.children = [];
    return spec.children;
  }
  if (!spec.slots) spec.slots = {};
  if (!spec.slots[slot]) spec.slots[slot] = [];
  return spec.slots[slot];
}

/**
 * Drop an emptied `children`/`slots` container. Leaving `children: []` behind on
 * a slot-only component would turn a legal spec into a validation error the next
 * time anything touched it.
 */
function pruneEmpty(spec: ComponentSpec, slot: ContentTarget, list: SpecChild[]): void {
  if (list.length > 0) return;
  if (slot === null) {
    delete spec.children;
    return;
  }
  if (spec.slots) {
    delete spec.slots[slot];
    if (Object.keys(spec.slots).length === 0) delete spec.slots;
  }
}

function nodeAtIn(root: ComponentSpec | null, path: string): SpecChild {
  if (!root) throw new Error(`${path}: surface has no root`);
  let cur: SpecChild = root;
  for (const seg of parsePath(path)) {
    if (typeof cur === 'string') throw new Error(`${path}: cannot descend into a text node`);
    const list: SpecChild[] | undefined =
      seg.kind === 'children' ? cur.children : cur.slots?.[seg.name];
    const next: SpecChild | undefined = list?.[seg.index];
    if (next === undefined) throw new Error(`${path}: no node at this path`);
    cur = next;
  }
  return cur;
}

function requireComponent(root: ComponentSpec | null, path: string): ComponentSpec {
  const node = nodeAtIn(root, path);
  if (typeof node === 'string') {
    throw new Error(`${path}: expected a component node, found a text node`);
  }
  return node;
}

/** Resolve a child path to its parent, the list holding it, and its index. */
function locateChild(
  root: ComponentSpec | null,
  path: string
): {
  parent: ComponentSpec;
  parentPath: string;
  list: SpecChild[];
  index: number;
  slot: ContentTarget;
} {
  const segments = parsePath(path);
  if (segments.length === 0) throw new Error('$: has no parent');
  const last = segments[segments.length - 1];
  const parentPath = segments.length === 1 ? '$' : pathOf(segments.slice(0, -1));
  const parent = requireComponent(root, parentPath);
  const slot: ContentTarget = last.kind === 'children' ? null : last.name;
  const list = last.kind === 'children' ? parent.children : parent.slots?.[last.name];
  if (!list || list[last.index] === undefined) throw new Error(`${path}: no node at this path`);
  return { parent, parentPath, list, index: last.index, slot };
}

function pathOf(segments: ReturnType<typeof parsePath>): string {
  let out = '$';
  for (const seg of segments) {
    out += seg.kind === 'children' ? `.children[${seg.index}]` : `.slots.${seg.name}[${seg.index}]`;
  }
  return out;
}

export { childPath };
