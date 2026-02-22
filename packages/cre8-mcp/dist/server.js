/**
 * Cre8 MCP REST API Server
 *
 * Exposes component patterns and search as HTTP endpoints.
 */
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handleGetPatterns, handleSearchComponents, handleListComponents, handleGetComponent, handleGenerateCode, } from './handlers.js';
const app = new Hono();
// CORS - allow all
app.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
}));
// Health check
app.get('/health', (c) => c.json({ status: 'ok', service: 'cre8-mcp' }));
// Info endpoint
app.get('/', (c) => c.json({
    name: 'cre8-mcp',
    version: '0.5.0',
    description: 'Cre8 Design System MCP Server - Component intelligence for AI agents',
    defaultFormat: 'web',
    endpoints: {
        health: 'GET /health',
        webComponents: {
            list: 'GET /components',
            detail: 'GET /components/:name',
            patterns: 'GET /patterns',
            pattern: 'GET /patterns/:name',
            search: 'GET /search?q=query',
            generate: 'POST /generate',
        },
        reactComponents: {
            list: 'GET /react/components',
            detail: 'GET /react/components/:name',
            patterns: 'GET /react/patterns',
            pattern: 'GET /react/patterns/:name',
            search: 'GET /react/search?q=query',
            generate: 'POST /react/generate',
        },
    },
}));
// ==========================================
// Web Components (default)
// ==========================================
app.get('/components', (c) => {
    const category = c.req.query('category');
    const result = handleListComponents({ category, format: 'web' });
    return c.json(JSON.parse(result));
});
app.get('/components/:name', (c) => {
    const result = handleGetComponent({ name: c.req.param('name'), format: 'web' });
    return c.json(JSON.parse(result));
});
app.get('/patterns', (c) => {
    const input = { format: 'web' };
    const result = handleGetPatterns(input);
    return c.json(JSON.parse(result));
});
app.get('/patterns/:name', (c) => {
    const input = { name: c.req.param('name'), format: 'web' };
    const result = handleGetPatterns(input);
    return c.json(JSON.parse(result));
});
app.get('/search', (c) => {
    const q = c.req.query('q');
    if (!q) {
        return c.json({ error: 'Missing required query parameter: q' }, 400);
    }
    const input = { query: q, format: 'web' };
    const result = handleSearchComponents(input);
    return c.json(JSON.parse(result));
});
app.post('/generate', async (c) => {
    try {
        const body = await c.req.json();
        if (!body.schema) {
            return c.json({ error: 'Missing required field: schema' }, 400);
        }
        const input = { schema: body.schema, format: 'web' };
        const result = handleGenerateCode(input);
        return c.json(JSON.parse(result));
    }
    catch (err) {
        return c.json({ error: 'Invalid JSON body' }, 400);
    }
});
// ==========================================
// React Components (/react/*)
// ==========================================
app.get('/react/components', (c) => {
    const category = c.req.query('category');
    const result = handleListComponents({ category, format: 'react' });
    return c.json(JSON.parse(result));
});
app.get('/react/components/:name', (c) => {
    const result = handleGetComponent({ name: c.req.param('name'), format: 'react' });
    return c.json(JSON.parse(result));
});
app.get('/react/patterns', (c) => {
    const input = { format: 'react' };
    const result = handleGetPatterns(input);
    return c.json(JSON.parse(result));
});
app.get('/react/patterns/:name', (c) => {
    const input = { name: c.req.param('name'), format: 'react' };
    const result = handleGetPatterns(input);
    return c.json(JSON.parse(result));
});
app.get('/react/search', (c) => {
    const q = c.req.query('q');
    if (!q) {
        return c.json({ error: 'Missing required query parameter: q' }, 400);
    }
    const input = { query: q, format: 'react' };
    const result = handleSearchComponents(input);
    return c.json(JSON.parse(result));
});
app.post('/react/generate', async (c) => {
    try {
        const body = await c.req.json();
        if (!body.schema) {
            return c.json({ error: 'Missing required field: schema' }, 400);
        }
        const input = { schema: body.schema, format: 'react' };
        const result = handleGenerateCode(input);
        return c.json(JSON.parse(result));
    }
    catch (err) {
        return c.json({ error: 'Invalid JSON body' }, 400);
    }
});
// Start server
const port = parseInt(process.env.PORT || '3001', 10);
console.log(`Cre8 MCP API starting on port ${port}`);
const httpServer = serve({
    fetch: app.fetch,
    port,
}, (info) => {
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
