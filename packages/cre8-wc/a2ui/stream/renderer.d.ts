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
import type { ComponentSpec, EmittedEvent } from '../types.js';
import type { ApplyResult, SurfaceModel } from './model.js';
import type { SurfaceChange, SurfaceMessage } from './types.js';
export interface SurfaceRendererOptions {
    root: HTMLElement;
    doc?: Document;
    onEvent?: (evt: EmittedEvent) => void;
}
export declare class SurfaceRenderer {
    readonly model: SurfaceModel;
    private readonly rootEl;
    private readonly doc;
    private readonly onEvent?;
    private readonly elements;
    private readonly book;
    constructor(model: SurfaceModel, options: SurfaceRendererOptions);
    /** Apply a message to the model, then mirror the resulting changes to DOM. */
    apply(message: SurfaceMessage): ApplyResult;
    reconcile(changes: SurfaceChange[]): void;
    /** Full (re)render of the surface root. */
    mount(): void;
    /** The element currently rendering the node at `path`, if it exists. */
    elementAt(path: string): HTMLElement | undefined;
    private elementFor;
    private applyProps;
    private applyEvents;
    private makeListener;
    private reconcileContainer;
    /**
     * Rebuild the container's DOM child list in place. `children` first, then each
     * named slot in declaration order — DOM order inside a slotted host does not
     * affect layout, but a stable order keeps the reconcile a no-op when nothing
     * moved.
     */
    private reconcileChildren;
    private nodeFor;
    /** Re-resolve bound props across the whole tree after a data-model change. */
    private refreshProps;
}
/** Locate a node in the tree by object identity, returning its current path. */
export declare function findPath(root: ComponentSpec | null, target: ComponentSpec, path?: string): string | null;
