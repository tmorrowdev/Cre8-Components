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
import {
  handleGetPatterns,
  handleSearchComponents,
  handleListComponents,
  handleGetComponent,
  handleGenerateCode,
  handleGetA2uiCatalog,
  handleValidateA2uiSpec,
} from './handlers.js';
import type { GetPatternsInput, SearchComponentsInput, GenerateCodeInput } from './handlers.js';
import { handleGetA2uiContext } from './a2ui-context.js';
import {
  RateLimiter,
  isAlwaysOpenPath,
  isMultiTenant,
  isPrivilegedPath,
  loadTenantConfig,
  resolveTenant,
  type TenantConfig,
} from './tenants.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { Cre8GuideSchema, GetContentModelSchema, handleCre8Guide, handleGetContentModel } from './knowledge-tools.js';
import { GetCompositionSchema, handleGetComposition } from './composition.js';
import { mountSurfaceApi, mountSurfaceViewer } from './surface-routes.js';
import { SERVER_VERSION, createMcpServer } from './mcp-server.js';

export interface AppOptions {
  /** Defaults to $PORT, used only to build viewer URLs. */
  port?: number;
  /** Overrides $CRE8_MCP_TOKEN. Pass an empty string to disable the gate. */
  token?: string;
  /** Overrides $CRE8_MCP_TENANTS. Injected by tests. */
  tenants?: TenantConfig;
  /** Injected by tests so limits can be exercised without waiting a minute. */
  rateLimiter?: RateLimiter;
}

/**
 * Rate-limit bucket for an anonymous caller.
 *
 * Best-effort: behind a proxy every caller can share an address, so this
 * throttles a runaway client rather than isolating users from each other.
 */
function clientKey(c: { req: { header: (name: string) => string | undefined } }): string {
  return (
    c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ||
    c.req.header('x-real-ip') ||
    'unknown'
  );
}

export function createApp(options: AppOptions = {}): Hono {
  const port = options.port ?? parseInt(process.env.PORT || '3001', 10);
  const token = options.token ?? process.env.CRE8_MCP_TOKEN;

  const app = new Hono();

  /** What a browser (or an agent handing a link to a human) should use to reach us. */
  const publicBase = () =>
    (process.env.CRE8_MCP_PUBLIC_URL ?? `http://localhost:${port}`).replace(/\/$/, '');

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

  /**
   * Access control.
   *
   * Single-tenant (only `CRE8_MCP_TOKEN` set) behaves exactly as before: one
   * token, gating everything but `/health`. Per-tenant mode is opt-in via
   * `CRE8_MCP_TENANTS`, so upgrading never loosens an existing deployment.
   *
   * In per-tenant mode the split follows what is actually sensitive. The
   * catalog is derived from a public npm package, so gating it protects
   * nothing — anonymous callers get it, rate limited. Surface ids are
   * unguessable capabilities that `GET /surfaces` enumerates, so those stay
   * closed.
   */
  // `legacyToken` follows the *effective* token, not the environment, so a
  // caller that injects one (tests, embedders) is honoured.
  const tenantConfig = options.tenants ?? { ...loadTenantConfig(), legacyToken: token || undefined };
  const limiter = options.rateLimiter ?? new RateLimiter();
  const multiTenant = isMultiTenant(tenantConfig);

  app.use('*', async (c, next) => {
    const path = new URL(c.req.url).pathname;
    if (isAlwaysOpenPath(path)) return next();

    const authorization = c.req.header('authorization');
    const tenant = resolveTenant(tenantConfig, authorization);

    if (!multiTenant) {
      if (!token) return next();
      if (!tenant) return c.json({ error: 'Unauthorized' }, 401);
      return next();
    }

    if (!tenant && isPrivilegedPath(path)) {
      return c.json({ error: 'Unauthorized', detail: 'Surfaces require a tenant token.' }, 401);
    }
    if (!tenant && authorization) {
      // A token was offered and not recognised. Falling through to anonymous
      // would silently downgrade a caller who believes they are authenticated.
      return c.json({ error: 'Unauthorized', detail: 'Unrecognised token.' }, 401);
    }

    const now = Date.now();
    const key = tenant ? `t:${tenant.id}` : `anon:${clientKey(c)}`;
    const limit = tenant ? tenant.limit : tenantConfig.anonymousLimit;
    const retryAfter = limiter.check(key, limit, now);
    if (retryAfter !== null) {
      return c.json(
        { error: 'Too Many Requests', detail: `Limit is ${limit}/min.`, retryAfter },
        429,
        { 'Retry-After': String(retryAfter) }
      );
    }
    if (limiter.size > 10_000) limiter.sweep(now);

    return next();
  });

  // Info endpoint
  app.get('/', (c) => c.json({
    name: 'cre8-mcp',
    version: SERVER_VERSION,
    description:
      'Cre8 Design System MCP Server — component intelligence and streaming UI for AI agents',
    defaultFormat: 'web',
    endpoints: {
      health: 'GET /health',
      mcp: 'POST /mcp  (Model Context Protocol, Streamable HTTP, stateless)',
      guide: 'GET /guide?topic=overview|content-model|streaming|events|validation',
      contentModel: 'GET /content-model?component=cre8-card',
      composition: 'GET /composition?component=cre8-table',
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
      spec: 'POST /surfaces/:id/spec   body: { spec }  — diffed against the surface, minimal patch applied',
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
      return c.body(body, response.status as 200, Object.fromEntries(response.headers));
    } finally {
      await server.close().catch(() => {});
    }
  });

  app.get('/content-model', (c) => {
    try {
      const input = GetContentModelSchema.parse({
        component: c.req.query('component'),
        category: c.req.query('category'),
      });
      return c.json(JSON.parse(handleGetContentModel(input)));
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : 'Unknown error' }, 400);
    }
  });

  app.get('/composition', (c) => {
    try {
      const input = GetCompositionSchema.parse({ component: c.req.query('component') });
      return c.json(JSON.parse(handleGetComposition(input)));
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : 'Unknown error' }, 400);
    }
  });

  app.get('/guide', (c) => {
    try {
      const input = Cre8GuideSchema.parse({ topic: c.req.query('topic') || undefined });
      return c.json(JSON.parse(handleCre8Guide(input)));
    } catch (err) {
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
    const input: GetPatternsInput = { format: 'web' };
    const result = handleGetPatterns(input);
    return c.json(JSON.parse(result));
  });

  app.get('/patterns/:name', (c) => {
    const input: GetPatternsInput = { name: c.req.param('name'), format: 'web' };
    const result = handleGetPatterns(input);
    return c.json(JSON.parse(result));
  });

  app.get('/search', async (c) => {
    const q = c.req.query('q');
    if (!q) {
      return c.json({ error: 'Missing required query parameter: q' }, 400);
    }
    const input: SearchComponentsInput = { query: q, format: 'web' };
    const result = await handleSearchComponents(input);
    return c.json(JSON.parse(result));
  });

  app.post('/generate', async (c) => {
    try {
      const body = await c.req.json();
      if (!body.schema) {
        return c.json({ error: 'Missing required field: schema' }, 400);
      }
      const input: GenerateCodeInput = { schema: body.schema, format: 'web' };
      const result = handleGenerateCode(input);
      return c.json(JSON.parse(result));
    } catch (err) {
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
    const input: GetPatternsInput = { format: 'react' };
    const result = handleGetPatterns(input);
    return c.json(JSON.parse(result));
  });

  app.get('/react/patterns/:name', (c) => {
    const input: GetPatternsInput = { name: c.req.param('name'), format: 'react' };
    const result = handleGetPatterns(input);
    return c.json(JSON.parse(result));
  });

  app.get('/react/search', async (c) => {
    const q = c.req.query('q');
    if (!q) {
      return c.json({ error: 'Missing required query parameter: q' }, 400);
    }
    const input: SearchComponentsInput = { query: q, format: 'react' };
    const result = await handleSearchComponents(input);
    return c.json(JSON.parse(result));
  });

  app.post('/react/generate', async (c) => {
    try {
      const body = await c.req.json();
      if (!body.schema) {
        return c.json({ error: 'Missing required field: schema' }, 400);
      }
      const input: GenerateCodeInput = { schema: body.schema, format: 'react' };
      const result = handleGenerateCode(input);
      return c.json(JSON.parse(result));
    } catch (err) {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }
  });

  // ==========================================
  // A2UI catalog
  // ==========================================

  app.get('/a2ui/catalog', (c) => {
    const view = c.req.query('view') as 'metadata' | 'component' | 'full' | undefined;
    const component = c.req.query('component');
    try {
      const result = handleGetA2uiCatalog({ view, component });
      return c.json(JSON.parse(result));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      return c.json({ error: msg }, 400);
    }
  });

  app.get('/a2ui/catalog/:name', (c) => {
    try {
      const result = handleGetA2uiCatalog({ view: 'component', component: c.req.param('name') });
      return c.json(JSON.parse(result));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      return c.json({ error: msg }, 404);
    }
  });

  /**
   * The retrieval endpoint. Serves a slice of the catalog sized to the caller's
   * context, rather than making every caller take all ~43k tokens of it.
   *
   *   GET /a2ui/context?projection=compact&categories=Forms,Actions&budget=1500
   */
  app.get('/a2ui/context', (c) => {
    const csv = (key: string) =>
      c.req.query(key)?.split(',').map((s) => s.trim()).filter(Boolean);
    const budgetRaw = c.req.query('budget');
    const budget = budgetRaw === undefined ? undefined : Number(budgetRaw);

    if (budget !== undefined && (!Number.isFinite(budget) || budget <= 0)) {
      return c.json({ error: '`budget` must be a positive number of tokens' }, 400);
    }

    const projection = c.req.query('projection');
    if (projection !== undefined && projection !== 'compact' && projection !== 'full') {
      return c.json({ error: '`projection` must be "compact" or "full"' }, 400);
    }

    try {
      return c.json(
        handleGetA2uiContext({
          names: csv('names'),
          categories: csv('categories'),
          projection,
          budget,
          pinned: csv('pinned'),
        })
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      return c.json({ error: msg }, 400);
    }
  });

  app.post('/a2ui/validate', async (c) => {
    try {
      const body = await c.req.json<{ spec?: unknown }>();
      if (body?.spec === undefined) {
        return c.json({ error: 'Missing required field "spec"' }, 400);
      }
      const result = handleValidateA2uiSpec({ spec: body.spec });
      return c.json(JSON.parse(result));
    } catch {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }
  });

  return app;
}
