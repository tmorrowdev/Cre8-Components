/**
 * Turn "here is the new tree" into the smallest set of patch ops that gets
 * there.
 *
 * The op vocabulary is the right primitive, and it is the wrong interface for
 * how models actually work: asked to change one label, a model regenerates the
 * whole document. Without a diff, that costs a full remount — every element
 * recreated, focus lost, scroll reset, animations restarted — which is exactly
 * what streaming exists to avoid. With one, an agent gets incremental rendering
 * without ever learning what `appendText` is.
 *
 * Node identity here is positional, matching the rest of the streaming layer.
 * That means the diff is deliberately *not* a minimal edit script: it compares
 * position by position and only appends or removes at the tail. Inserting at the
 * head of a long list therefore rewrites the list rather than shifting it. A
 * keyed diff would do better, but keys would have to come from somewhere, and
 * the whole reason this dialect has no ids is that nothing has to invent them.
 */

import type { ComponentSpec, SpecChild } from '../types.js';
import type { ContentTarget, PatchOp } from './types.js';
import { childPath } from './pointer.js';

function isSpec(node: SpecChild | undefined): node is ComponentSpec {
  return typeof node === 'object' && node !== null;
}

function sameShape(a: SpecChild | undefined, b: SpecChild | undefined): boolean {
  if (typeof a === 'string' || typeof b === 'string') return typeof a === typeof b;
  return isSpec(a) && isSpec(b) && a.component === b.component;
}

function equal(a: unknown, b: unknown): boolean {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

/**
 * Props that changed, plus `null` for props that went away — the shape
 * `setProps` already understands.
 */
function propDelta(
  prev: Record<string, unknown> = {},
  next: Record<string, unknown> = {}
): Record<string, unknown> | null {
  const delta: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(next)) {
    if (!equal(prev[key], value)) delta[key] = value;
  }
  for (const key of Object.keys(prev)) {
    if (!(key in next)) delta[key] = null;
  }
  return Object.keys(delta).length ? delta : null;
}

function contentLists(spec: ComponentSpec): Map<ContentTarget, SpecChild[]> {
  const lists = new Map<ContentTarget, SpecChild[]>();
  if (spec.children) lists.set(null, spec.children);
  for (const [slot, list] of Object.entries(spec.slots ?? {})) lists.set(slot, list);
  return lists;
}

function diffList(
  path: string,
  slot: ContentTarget,
  prev: SpecChild[],
  next: SpecChild[],
  ops: PatchOp[]
): void {
  const shared = Math.min(prev.length, next.length);

  for (let i = 0; i < shared; i++) {
    const before = prev[i];
    const after = next[i];
    const childAt = childPath(path, slot, i);

    if (typeof after === 'string') {
      // A text child that changed. setText replaces the whole list, so it is
      // only safe when the text is the entire content.
      if (before !== after) {
        if (prev.length === 1 && next.length === 1) {
          ops.push({ op: 'setText', path, slot, text: after });
        } else {
          ops.push({ op: 'replace', path: childAt, node: after });
        }
      }
      continue;
    }

    if (!sameShape(before, after)) {
      ops.push({ op: 'replace', path: childAt, node: after });
      continue;
    }
    diffNode(childAt, before as ComponentSpec, after, ops);
  }

  // Tail only: positional identity means anything else would renumber the
  // siblings the caller is about to address.
  if (next.length > prev.length) {
    ops.push({ op: 'append', path, slot, nodes: next.slice(prev.length) });
  } else if (prev.length > next.length) {
    for (let i = prev.length - 1; i >= next.length; i--) {
      ops.push({ op: 'remove', path: childPath(path, slot, i) });
    }
  }
}

function diffNode(path: string, prev: ComponentSpec, next: ComponentSpec, ops: PatchOp[]): void {
  const props = propDelta(prev.props, next.props);
  if (props) ops.push({ op: 'setProps', path, props });

  if (!equal(prev.events, next.events)) {
    const events: Record<string, unknown> = { ...(next.events ?? {}) };
    for (const name of Object.keys(prev.events ?? {})) {
      if (!(name in (next.events ?? {}))) events[name] = null;
    }
    if (Object.keys(events).length) ops.push({ op: 'setEvents', path, events });
  }

  const prevLists = contentLists(prev);
  const nextLists = contentLists(next);

  for (const [slot, nextList] of nextLists) {
    diffList(path, slot, prevLists.get(slot) ?? [], nextList, ops);
  }
  for (const [slot] of prevLists) {
    if (!nextLists.has(slot)) ops.push({ op: 'clear', path, slot });
  }
}

/**
 * Ops that turn `prev` into `next`. Returns an empty array when they already
 * match, so an agent can resend an unchanged tree for free.
 *
 * `null` for either side means "no surface root": the result is a single
 * `replace`/`remove` at `$`, which the model handles as a root swap.
 */
export function diffSpecs(prev: ComponentSpec | null, next: ComponentSpec | null): PatchOp[] {
  if (!next) return prev ? [{ op: 'remove', path: '$' }] : [];
  if (!prev || prev.component !== next.component) {
    return [{ op: 'replace', path: '$', node: next }];
  }
  const ops: PatchOp[] = [];
  diffNode('$', prev, next, ops);
  return ops;
}
