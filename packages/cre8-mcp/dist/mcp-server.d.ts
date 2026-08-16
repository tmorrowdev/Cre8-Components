/**
 * One MCP server definition, two transports.
 *
 * `src/index.ts` runs it over stdio for local hosts; `src/app.ts` mounts it at
 * `/mcp` over Streamable HTTP for remote ones. Both get the same tools, so
 * "which transport am I on" never changes what an agent can do — which is the
 * whole claim behind calling this a single connector.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
/**
 * The published version, read from the manifest rather than repeated here.
 *
 * A second copy had drifted three minors behind the package it describes, so
 * every client — over stdio and at `GET /` alike — was told `0.6.0` no matter
 * which build it was actually talking to, which is worse than saying nothing.
 *
 * `files` ships only `dist`, but npm always includes the manifest itself, so
 * `../package.json` resolves from `dist/mcp-server.js` in an installed copy
 * exactly as it does from `src/` in a checkout.
 */
export declare const SERVER_VERSION: string;
export interface McpServerOptions {
    /**
     * Absolute base URL a browser can reach the surface viewer on. The HTTP
     * server passes its own; stdio leaves it unset and gets an embedded viewer
     * booted on first use, because a surface only exists in the process that
     * created it.
     */
    publicBase?: string;
    /** Set false to skip the mcp-ui resource block on ui_open_surface. */
    embedResources?: boolean;
}
export declare function createMcpServer(options?: McpServerOptions): Server;
