/**
 * Surface store — the server half of streaming UI.
 *
 * A surface is a live region of UI an agent builds up over time. The store owns
 * one `SurfaceModel` per surface, which means a patch is validated against the
 * cre8 catalog *here*, at the tool boundary, and a bad one is reported to the
 * agent as a tool error instead of silently producing a broken page in someone's
 * browser.
 *
 * The same model also gives late joiners a correct starting point: a browser
 * that connects halfway through a stream is sent the current tree as a synthetic
 * `surface.create`, not a replay of every message since the beginning.
 */
import { SurfaceModel } from '@tmorrow/cre8-wc/a2ui/stream/index.js';
import type { DataPatch, PatchOp, SurfaceEventMessage, SurfaceMessage, SurfaceState } from '@tmorrow/cre8-wc/a2ui/stream/index.js';
import type { ComponentSpec } from '@tmorrow/cre8-wc/a2ui/index.js';
/**
 * A viewer-only message: restyle the page with a brand stylesheet. It is not
 * part of the A2UI stream protocol and never reaches the `SurfaceModel`,
 * because a brand changes how the tree looks, not what it is — the same
 * reason `theme` is a viewer concern rather than part of the spec. It carries
 * no `seq`, so it cannot desynchronise a viewer's model.
 */
export interface SurfaceStyleMessage {
    v: 1;
    type: 'surface.style';
    surfaceId: string;
    /** Brand name the css was generated from, for display and snapshots. */
    brand: string;
    /** Stylesheet text. Applied as the textContent of one <style> element. */
    css: string;
}
export type ViewerMessage = SurfaceMessage | SurfaceStyleMessage;
export type SurfaceListener = (message: ViewerMessage) => void;
export interface CreateSurfaceInput {
    title?: string;
    root?: ComponentSpec;
    data?: Record<string, unknown>;
    /** Brand token sheet the viewer loads. A viewer concern, not part of the spec. */
    theme?: string;
}
export interface SurfaceSummary {
    surfaceId: string;
    title?: string;
    theme: string;
    /** Brand applied in place with apply_brand, if any. Overrides `theme`'s values. */
    brandOverride?: string;
    state: SurfaceState;
    seq: number;
    viewers: number;
    pendingEvents: number;
    createdAt: string;
    updatedAt: string;
}
export interface SurfaceStoreOptions {
    /** Hard cap on live surfaces. Oldest idle surface is evicted past this. */
    maxSurfaces?: number;
    /** Events retained per surface for polling. */
    maxEvents?: number;
    /** Surfaces untouched for this long are swept. */
    idleTtlMs?: number;
}
interface Waiter {
    since: number;
    resolve: (events: SurfaceEventMessage[]) => void;
    timer: NodeJS.Timeout;
}
declare class SurfaceRecord {
    readonly surfaceId: string;
    readonly theme: string;
    readonly model: SurfaceModel;
    readonly listeners: Set<SurfaceListener>;
    readonly events: SurfaceEventMessage[];
    readonly waiters: Set<Waiter>;
    eventSeq: number;
    /** Live brand restyle applied with apply_brand, replayed to late viewers. */
    style: {
        brand: string;
        css: string;
    } | null;
    readonly createdAt: string;
    updatedAt: string;
    constructor(surfaceId: string, model: SurfaceModel, theme: string);
}
export declare class SurfaceNotFoundError extends Error {
    constructor(surfaceId: string);
}
export declare class SurfaceStore {
    private readonly surfaces;
    private readonly maxSurfaces;
    private readonly maxEvents;
    private readonly idleTtlMs;
    constructor(options?: SurfaceStoreOptions);
    create(input?: CreateSurfaceInput): SurfaceSummary;
    get(surfaceId: string): SurfaceRecord;
    has(surfaceId: string): boolean;
    summary(surfaceId: string): SurfaceSummary;
    list(): SurfaceSummary[];
    patch(surfaceId: string, ops: PatchOp[]): SurfaceSummary;
    /**
     * Reconcile the surface to `spec` by diffing against what it holds now.
     *
     * This is the interface models actually want: asked to change one label, a
     * model regenerates the document. Replacing the root would remount every
     * element and lose focus, scroll, and any animation in flight; diffing keeps
     * the elements that did not change.
     */
    setSpec(surfaceId: string, spec: ComponentSpec | null): SurfaceSummary;
    setData(surfaceId: string, patches: DataPatch[]): SurfaceSummary;
    setStatus(surfaceId: string, state: SurfaceState, message?: string): SurfaceSummary;
    /**
     * Restyle a live surface with a generated brand stylesheet. Every connected
     * viewer swaps it in immediately and a viewer that connects later gets it
     * right after its resync, so the brand survives a reconnect. Passing null
     * removes the override and the page falls back to its `theme` sheet.
     */
    setStyle(surfaceId: string, style: {
        brand: string;
        css: string;
    } | null): SurfaceSummary;
    close(surfaceId: string): void;
    /** The tree as it stands, bindings resolved — for snapshots and mcp-ui HTML. */
    snapshot(surfaceId: string): {
        surfaceId: string;
        title?: string;
        state: SurfaceState;
        seq: number;
        theme: string;
        brandOverride?: string;
        root: ComponentSpec | null;
        data: Record<string, unknown>;
    };
    /**
     * Subscribe to a surface. The listener is immediately handed a synthetic
     * `surface.create` carrying current state, so a viewer that arrives late sees
     * the finished-so-far UI rather than an empty box.
     */
    subscribe(surfaceId: string, listener: SurfaceListener): () => void;
    private replayMessage;
    recordEvent(surfaceId: string, event: Omit<SurfaceEventMessage, 'v' | 'type' | 'surfaceId' | 'seq'>): SurfaceEventMessage;
    eventsSince(surfaceId: string, since?: number): SurfaceEventMessage[];
    /**
     * Long-poll for events. Returns immediately if any are already pending, so an
     * agent that calls this in a loop cannot miss an event that arrived between
     * two calls.
     */
    awaitEvents(surfaceId: string, since?: number, timeoutMs?: number): Promise<SurfaceEventMessage[]>;
    private dispatch;
    private broadcast;
    private styleMessage;
    private summarize;
    private sweep;
}
/** One store per process. Surfaces are in-memory and do not survive a restart. */
export declare const surfaceStore: SurfaceStore;
export {};
