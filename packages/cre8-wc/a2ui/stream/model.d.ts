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
import { childPath } from './pointer.js';
import { type SurfaceChange, type SurfaceMessage, type SurfaceState } from './types.js';
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
export declare class SurfaceSeqGapError extends Error {
    readonly expected: number;
    readonly received: number;
    constructor(expected: number, received: number);
}
/**
 * Deep-copy a node with `{ $bind }` prop values replaced by their data-model
 * values. An unresolvable binding with no `default` drops the prop entirely
 * rather than passing `undefined` through — a prop that is absent is a prop the
 * validator and the renderer both handle correctly.
 */
export declare function resolveNode(node: SpecChild, data: Record<string, unknown>): SpecChild;
export declare class SurfaceModel {
    readonly catalog: RegisteredCatalog;
    surfaceId: string;
    title: string | undefined;
    state: SurfaceState;
    seq: number;
    data: Record<string, unknown>;
    private readonly strictSeq;
    private _root;
    constructor(catalog: RegisteredCatalog, options?: SurfaceModelOptions);
    get root(): ComponentSpec | null;
    /** The tree with every binding resolved — what a renderer or snapshot sees. */
    snapshot(): ComponentSpec | null;
    /** The raw (unresolved) node at `path`. Throws if nothing is there. */
    nodeAt(path: string): SpecChild;
    /** The resolved node at `path` — bindings substituted. */
    resolvedAt(path: string): SpecChild;
    apply(message: SurfaceMessage): ApplyResult;
    private applyCreate;
    private applyData;
    private applyOps;
    private applyOp;
}
export { childPath };
