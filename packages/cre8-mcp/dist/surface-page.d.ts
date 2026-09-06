/**
 * The viewer pages for a streaming surface.
 *
 * Two pages share one bootstrap. `renderSurfacePage` is the standalone viewer a
 * browser loads at `/surfaces/:id` — the surface id is baked in and it boots
 * immediately. `renderSurfaceAppPage` is the MCP Apps (SEP-1865) template a
 * host predeclares at `ui://cre8/surface`: it learns which surface to show from
 * the `ui_open_surface` tool result the host delivers over the view bridge, so
 * one static resource serves every surface.
 *
 * Both are deliberately dumb: they register the catalog, open an EventSource,
 * and feed every message straight into the same `SurfaceModel` the server is
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
export interface SurfaceAppPageOptions {
    /**
     * Absolute origin of the cre8-mcp server. Required: an MCP Apps host renders
     * this template in a sandboxed iframe with no origin of its own, so every
     * asset and stream URL must be absolute.
     */
    origin: string;
    /** Base path the runtime assets are served from. */
    runtimeBase?: string;
    title?: string;
}
export declare function renderSurfacePage(options: SurfacePageOptions): string;
/**
 * The MCP Apps template. The host renders it, then delivers the
 * `ui_open_surface` result over the view bridge; the surface id and theme ride
 * in the result's `structuredContent`. The bridge itself
 * (`@modelcontextprotocol/ext-apps`) is served by this server at
 * `/mcp-app/app.js`, so the template stays self-contained under the CSP the
 * resource declares — no third-party origin ever loads.
 */
export declare function renderSurfaceAppPage(options: SurfaceAppPageOptions): string;
