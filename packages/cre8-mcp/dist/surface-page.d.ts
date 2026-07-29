/**
 * The viewer page for a streaming surface.
 *
 * It is deliberately dumb: it registers the catalog, opens an EventSource, and
 * feeds every message straight into the same `SurfaceModel` the server is
 * running. No spec interpretation happens here that does not also happen on the
 * server, and no code from the agent is ever executed — a handler stays a name,
 * and this page's only response to one is to POST it back.
 */
export interface SurfacePageOptions {
    surfaceId: string;
    title?: string;
    /** Base path the runtime assets are served from. */
    runtimeBase?: string;
    /**
     * Absolute origin to prefix every URL with. Leave empty for the page served
     * at `/surfaces/:id` (same origin). Set it when the page is embedded
     * somewhere else — an mcp-ui host renders it inside a sandboxed iframe with
     * no origin of its own, so relative URLs there resolve to nothing.
     */
    origin?: string;
    /** Brand whose token sheet the page links. */
    theme?: string;
}
export declare function renderSurfacePage(options: SurfacePageOptions): string;
