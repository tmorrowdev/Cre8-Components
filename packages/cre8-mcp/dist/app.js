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
import { cors } from 'hono/cors';
import { handleGetPatterns, handleSearchComponents, handleListComponents, handleGetComponent, handleGenerateCode, handleGetA2uiCatalog, handleValidateA2uiSpec, } from './handlers.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { Cre8GuideSchema, GetContentModelSchema, handleCre8Guide, handleGetContentModel } from './knowledge-tools.js';
import { mountSurfaceApi, mountSurfaceViewer } from './surface-routes.js';
import { SERVER_VERSION, createMcpServer } from './mcp-server.js';
export function createApp(options = {}) {
    const port = options.port ?? parseInt(process.env.PORT || '3001', 10);
    const token = options.token ?? process.env.CRE8_MCP_TOKEN;
    const app = new Hono();
    /** What a browser (or an agent handing a link to a human) should use to reach us. */
    const publicBase = () => (process.env.CRE8_MCP_PUBLIC_URL ?? `http://localhost:${port}`).replace(/\/$/, '');
    // CORS - allow all
    app.use('*', cors({
        origin: '*',
        allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    }));
    // Health check (unauthenticated for Docker healthcheck)
    app.get('/health', (c) => c.json({ status: 'ok', service: 'cre8-mcp' }));
    // Streaming-UI viewer routes mount above the bearer gate: a browser cannot set
    // an Authorization header on a page load or an EventSource. Surface ids are 128
    // random bits, so the URL itself is the capability.
    mountSurfaceViewer(app);
    // Bearer token gate — set CRE8_MCP_TOKEN to enable; skip for /health
    app.use('*', async (c, next) => {
        if (!token)
            return next();
        const auth = c.req.header('authorization') ?? '';
        if (!auth.startsWith('Bearer ') || auth.slice(7) !== token) {
            return c.json({ error: 'Unauthorized' }, 401);
        }
        return next();
    });
    // Info endpoint
    app.get('/', (c) => c.json({
        name: 'cre8-mcp',
        version: SERVER_VERSION,
        description: 'Cre8 Design System MCP Server — component intelligence and streaming UI for AI agents',
        defaultFormat: 'web',
        endpoints: {
            health: 'GET /health',
            mcp: 'POST /mcp  (Model Context Protocol, Streamable HTTP, stateless)',
            guide: 'GET /guide?topic=overview|content-model|streaming|events|validation',
            contentModel: 'GET /content-model?component=cre8-card',
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
            a2ui: {
                catalog: 'GET /a2ui/catalog?view=metadata|component|full&component=cre8-button',
                component: 'GET /a2ui/catalog/:name',
                validate: 'POST /a2ui/validate  body: { spec: ComponentSpec }',
            },
            streamingSurfaces: {
                create: 'POST /surfaces  body: { title?, root?, data? }',
                list: 'GET /surfaces',
                state: 'GET /surfaces/:id/state',
                patch: 'POST /surfaces/:id/patch  body: { ops: PatchOp[] }',
                data: 'POST /surfaces/:id/data  body: { patches: DataPatch[] }',
                status: 'POST /surfaces/:id/status  body: { state, message? }',
                events: 'GET /surfaces/:id/events?since=N&wait=ms',
                close: 'DELETE /surfaces/:id',
                viewer: 'GET /surfaces/:id  (unauthenticated; the id is the capability)',
                stream: 'GET /surfaces/:id/stream  (SSE)',
            },
        },
    }));
    // MCP itself, over Streamable HTTP. Stateless: a fresh server and transport
    // per request, so there is no session table to lose behind a load balancer,
    // and the same tools answer here as over stdio.
    app.all('/mcp', async (c) => {
        const server = createMcpServer({ publicBase: publicBase() });
        const transport = new WebStandardStreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
            enableJsonResponse: true,
        });
        try {
            await server.connect(transport);
            const response = await transport.handleRequest(c.req.raw);
            // Materialise the body before tearing the transport down, so closing
            // cannot truncate a response mid-flight.
            const body = await response.text();
            return c.body(body, response.status, Object.fromEntries(response.headers));
        }
        finally {
            await server.close().catch(() => { });
        }
    });
    app.get('/content-model', (c) => {
        try {
            const input = GetContentModelSchema.parse({
                component: c.req.query('component'),
                category: c.req.query('category'),
            });
            return c.json(JSON.parse(handleGetContentModel(input)));
        }
        catch (err) {
            return c.json({ error: err instanceof Error ? err.message : 'Unknown error' }, 400);
        }
    });
    app.get('/guide', (c) => {
        try {
            const input = Cre8GuideSchema.parse({ topic: c.req.query('topic') || undefined });
            return c.json(JSON.parse(handleCre8Guide(input)));
        }
        catch (err) {
            return c.json({ error: err instanceof Error ? err.message : 'Unknown error' }, 400);
        }
    });
    mountSurfaceApi(app, publicBase);
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
    // ==========================================
    // A2UI catalog
    // ==========================================
    app.get('/a2ui/catalog', (c) => {
        const view = c.req.query('view');
        const component = c.req.query('component');
        try {
            const result = handleGetA2uiCatalog({ view, component });
            return c.json(JSON.parse(result));
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown error';
            return c.json({ error: msg }, 400);
        }
    });
    app.get('/a2ui/catalog/:name', (c) => {
        try {
            const result = handleGetA2uiCatalog({ view: 'component', component: c.req.param('name') });
            return c.json(JSON.parse(result));
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown error';
            return c.json({ error: msg }, 404);
        }
    });
    app.post('/a2ui/validate', async (c) => {
        try {
            const body = await c.req.json();
            if (body?.spec === undefined) {
                return c.json({ error: 'Missing required field "spec"' }, 400);
            }
            const result = handleValidateA2uiSpec({ spec: body.spec });
            return c.json(JSON.parse(result));
        }
        catch {
            return c.json({ error: 'Invalid JSON body' }, 400);
        }
    });
    return app;
}
