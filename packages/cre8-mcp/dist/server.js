#!/usr/bin/env node
/**
 * Bootstrap for the cre8-mcp HTTP server. The application itself lives in
 * src/app.ts so it can be driven in tests without binding a port.
 */
import { serve } from '@hono/node-server';
import { createApp } from './app.js';
const port = parseInt(process.env.PORT || '3001', 10);
const app = createApp({ port });
console.log(`Cre8 MCP API starting on port ${port}`);
const httpServer = serve({ fetch: app.fetch, port }, (info) => {
    console.log(`Server running on http://localhost:${info.port}`);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down...');
    httpServer.close();
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down...');
    httpServer.close();
});
