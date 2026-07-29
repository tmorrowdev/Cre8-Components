/**
 * The cre8-mcp HTTP application.
 *
 * One app, three audiences: the REST API an agent calls, the streaming-surface
 * routes a browser talks to, and (mounted by src/server.ts) the MCP transport
 * itself. Keeping them in one Hono instance is the whole point of the
 * "single connector" claim — one URL, one token, one process.
 *
 * Exported as a factory so tests can drive it with `app.request(...)` without
 * binding a port.
 */
import { Hono } from 'hono';
export interface AppOptions {
    /** Defaults to $PORT, used only to build viewer URLs. */
    port?: number;
    /** Overrides $CRE8_MCP_TOKEN. Pass an empty string to disable the gate. */
    token?: string;
}
export declare function createApp(options?: AppOptions): Hono;
