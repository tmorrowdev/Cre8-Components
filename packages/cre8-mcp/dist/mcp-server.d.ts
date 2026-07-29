/**
 * One MCP server definition, two transports.
 *
 * `src/index.ts` runs it over stdio for local hosts; `src/app.ts` mounts it at
 * `/mcp` over Streamable HTTP for remote ones. Both get the same tools, so
 * "which transport am I on" never changes what an agent can do — which is the
 * whole claim behind calling this a single connector.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
export declare const SERVER_VERSION = "0.6.0";
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
