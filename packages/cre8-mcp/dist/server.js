#!/usr/bin/env node
/**
 * Bootstrap for the cre8-mcp HTTP server. The application itself lives in
 * src/app.ts so it can be driven in tests without binding a port.
 */
import { serve } from '@hono/node-server';
import { createApp } from './app.js';
import { bindingAdvice } from './binding.js';
const port = parseInt(process.env.PORT || '3001', 10);
// Loopback by default. The streaming-UI design leans on surface ids being
// unguessable, and `GET /surfaces` hands those ids out — so a server reachable
// from the network with no token set is not merely open, it is enumerable.
// Set CRE8_MCP_HOST to widen it deliberately.
const hostname = process.env.CRE8_MCP_HOST ?? '127.0.0.1';
const app = createApp({ port });
const advice = bindingAdvice({ hostname, token: process.env.CRE8_MCP_TOKEN });
if (advice)
    console.warn(advice);
console.log(`Cre8 MCP API starting on ${hostname}:${port}`);
const httpServer = serve({ fetch: app.fetch, port, hostname }, (info) => {
    console.log(`Server running on http://${hostname}:${info.port}`);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down...');
    httpServer.close();
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down...');
    httpServer.close();
});
