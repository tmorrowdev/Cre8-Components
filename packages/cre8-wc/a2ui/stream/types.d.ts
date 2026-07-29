/**
 * A2UI streaming surface protocol — types.
 *
 * A "surface" is a live region of UI that an agent builds up over time. The
 * document model is the same nested `ComponentSpec` tree the one-shot renderer
 * uses; what streaming adds is (1) addressing individual nodes by the path
 * grammar the renderer already emits on events, (2) a data model that props can
 * bind into, and (3) an ordered message envelope so a client can tell a dropped
 * message from an out-of-order one.
 */
import type { ComponentSpec, SpecChild } from '../types.js';
export declare const A2UI_STREAM_VERSION = 1;
/** RFC 6901 JSON Pointer into the surface data model, e.g. `/user/name`. */
export type JsonPointer = string;
/**
 * A prop value of this shape resolves against the surface data model instead of
 * being taken literally. `default` is used when the pointer resolves to
 * `undefined`.
 */
export interface BindingRef {
    $bind: JsonPointer;
    default?: unknown;
}
export declare function isBindingRef(value: unknown): value is BindingRef;
/**
 * Where content goes inside a container node. `null` means the component's
 * `children` array; a string names a slot. `"default"` is a slot name, and is
 * NOT the same thing as `children` — see the children-vs-slots rule in the KB.
 */
export type ContentTarget = string | null;
export type PatchOp = 
/** Append nodes to a container's `children` (slot omitted) or a named slot. */
{
    op: 'append';
    path: string;
    slot?: ContentTarget;
    nodes: SpecChild[];
}
/** Insert nodes at `index` in a container's content list. */
 | {
    op: 'insert';
    path: string;
    slot?: ContentTarget;
    index: number;
    nodes: SpecChild[];
}
/** Replace the node at `path` wholesale. `$` replaces the surface root. */
 | {
    op: 'replace';
    path: string;
    node: SpecChild;
}
/** Remove the node at `path`. `$` clears the surface. */
 | {
    op: 'remove';
    path: string;
}
/** Merge props into the node at `path`. A `null` value deletes the prop. */
 | {
    op: 'setProps';
    path: string;
    props: Record<string, unknown>;
}
/** Set event bindings on the node at `path`. A `null` value removes one. */
 | {
    op: 'setEvents';
    path: string;
    events: Record<string, unknown>;
}
/** Replace a container's whole content list with a single text node. */
 | {
    op: 'setText';
    path: string;
    slot?: ContentTarget;
    text: string;
}
/** Append text to a container's trailing text node — the token-stream op. */
 | {
    op: 'appendText';
    path: string;
    slot?: ContentTarget;
    text: string;
}
/** Empty a container's content list. */
 | {
    op: 'clear';
    path: string;
    slot?: ContentTarget;
};
export interface DataPatch {
    pointer: JsonPointer;
    /** `set` (default) writes `value`; `remove` deletes the pointed-at member. */
    op?: 'set' | 'remove';
    value?: unknown;
}
export type SurfaceState = 'streaming' | 'idle' | 'done' | 'error';
interface Envelope {
    v: typeof A2UI_STREAM_VERSION;
    surfaceId: string;
    /** Monotonic per surface, starting at 1. `surface.create` is seq 0. */
    seq: number;
}
export type SurfaceMessage = (Envelope & {
    type: 'surface.create';
    catalogId: string;
    libraryVersion?: string;
    title?: string;
    root?: ComponentSpec;
    data?: Record<string, unknown>;
}) | (Envelope & {
    type: 'surface.patch';
    ops: PatchOp[];
}) | (Envelope & {
    type: 'surface.data';
    patches: DataPatch[];
}) | (Envelope & {
    type: 'surface.status';
    state: SurfaceState;
    message?: string;
}) | (Envelope & {
    type: 'surface.delete';
});
/** Client → server. The return path for a named handler firing in the browser. */
export interface SurfaceEventMessage {
    v: typeof A2UI_STREAM_VERSION;
    type: 'surface.event';
    surfaceId: string;
    /** Server-assigned on receipt; clients may omit. */
    seq?: number;
    component: string;
    path: string;
    event: string;
    handler: string;
    detail?: unknown;
    /** ISO 8601. Set by whichever side has a trustworthy clock. */
    at?: string;
}
/**
 * What changed, as an invalidation hint. The model is the source of truth — a
 * renderer reads the current state at these paths rather than trusting a diff.
 */
export type SurfaceChange = 
/** The whole tree was replaced (create, root replace, root remove). */
{
    kind: 'root';
}
/** A container's content list changed; re-reconcile its children. */
 | {
    kind: 'content';
    path: string;
    slot: ContentTarget;
}
/** Only the trailing text of a container changed — the cheap streaming path. */
 | {
    kind: 'text';
    path: string;
    slot: ContentTarget;
}
/** Props on one node changed; re-apply them. */
 | {
    kind: 'props';
    path: string;
}
/** Event bindings on one node changed; re-attach. */
 | {
    kind: 'events';
    path: string;
}
/** The data model changed; re-resolve every bound prop in the tree. */
 | {
    kind: 'data';
};
export {};
