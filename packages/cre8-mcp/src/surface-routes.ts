/**
 * HTTP surface for streaming UI, split into two halves on purpose.
 *
 * `mountSurfaceViewer` carries everything a *browser* needs — the page, the
 * runtime assets, the event stream, and the POST path events come back on. It
 * mounts above the bearer gate, because a browser cannot put an Authorization
 * header on a page load or an EventSource. What protects a surface instead is
 * that its id is 128 random bits: the URL is the capability.
 *
 * `mountSurfaceApi` carries everything an *agent* needs, and stays behind the
 * gate with the rest of the API. Nothing here lets a viewer mutate a surface;
 * the only write it can do is report an event that already happened.
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import type { Hono } from 'hono';
import { streamSSE } from 'hono/streaming';
import type { SurfaceMessage } from '@tmorrow/cre8-wc/a2ui/stream/index.js';
import { renderSurfacePage } from './surface-page.js';
import { SurfaceNotFoundError, surfaceStore } from './surfaces.js';

/**
 * Files the viewer is allowed to pull out of the installed design system. An
 * allowlist rather than a static directory: this route reads from inside a
 * node_modules package, and a path-traversal bug there would expose the whole
 * dependency tree.
 */
const RUNTIME_FILES = new Set([
  'index.js',
  'types.js',
  'registry.js',
  'renderer.js',
  'catalog.json',
  'catalog-kg.json',
  'stream/index.js',
  'stream/types.js',
  'stream/pointer.js',
  'stream/model.js',
  'stream/renderer.js',
]);

let wcRootCache: string | null = null;

/**
 * Where the installed `@tmorrow/cre8-wc` lives. `CRE8_WC_ROOT` overrides it,
 * which is how you point a running server at a local build of the design system
 * without reinstalling.
 */
function wcRoot(): string {
  if (wcRootCache) return wcRootCache;
  const override = process.env.CRE8_WC_ROOT;
  if (override) {
    wcRootCache = resolve(override);
    return wcRootCache;
  }
  const require = createRequire(import.meta.url);
  wcRootCache = dirname(require.resolve('@tmorrow/cre8-wc/package.json'));
  return wcRootCache;
}

const CDN_FALLBACK = 'https://cdn.jsdelivr.net/npm/@tmorrow/cre8-wc/cdn/cre8-wc.esm.js';

function contentTypeFor(file: string): string {
  return file.endsWith('.json') ? 'application/json; charset=utf-8' : 'text/javascript; charset=utf-8';
}

export function mountSurfaceViewer(app: Hono): void {
  // The design system bundle. Served locally so a surface renders offline and
  // pins to the same library version the catalog describes.
  app.get('/cre8-wc.esm.js', (c) => {
    try {
      const body = readFileSync(join(wcRoot(), 'cdn', 'cre8-wc.esm.js'), 'utf-8');
      return c.body(body, 200, {
        'content-type': 'text/javascript; charset=utf-8',
        'cache-control': 'public, max-age=3600',
      });
    } catch {
      return c.redirect(CDN_FALLBACK, 302);
    }
  });

  app.get('/a2ui/runtime/:file{.+}', (c) => {
    const file = c.req.param('file');
    if (!RUNTIME_FILES.has(file)) {
      return c.json({ error: `Not a servable runtime file: ${file}` }, 404);
    }
    try {
      const body = readFileSync(join(wcRoot(), 'a2ui', file), 'utf-8');
      return c.body(body, 200, {
        'content-type': contentTypeFor(file),
        'cache-control': 'public, max-age=3600',
      });
    } catch {
      return c.json(
        {
          error: `Runtime file "${file}" is missing from the installed @tmorrow/cre8-wc.`,
          hint: 'Run `pnpm --filter @tmorrow/cre8-wc build:a2ui`, or set CRE8_WC_ROOT to a built copy.',
        },
        503
      );
    }
  });

  app.get('/surfaces/:id/stream', (c) => {
    const surfaceId = c.req.param('id');
    if (!surfaceStore.has(surfaceId)) return c.json({ error: 'No such surface' }, 404);

    return streamSSE(c, async (stream) => {
      const queue: SurfaceMessage[] = [];
      let wake: (() => void) | null = null;
      let aborted = false;

      const unsubscribe = surfaceStore.subscribe(surfaceId, (message) => {
        queue.push(message);
        wake?.();
      });

      stream.onAbort(() => {
        aborted = true;
        unsubscribe();
        wake?.();
      });

      try {
        while (!aborted) {
          while (queue.length) {
            await stream.writeSSE({ data: JSON.stringify(queue.shift()) });
          }
          if (aborted) break;
          await Promise.race([
            new Promise<void>((r) => {
              wake = r;
            }),
            new Promise<void>((r) => setTimeout(r, 15_000)),
          ]);
          wake = null;
          // Keepalive: proxies drop an idle SSE connection well inside a
          // conversation's lifetime.
          if (!aborted && queue.length === 0) await stream.writeSSE({ event: 'ping', data: '' });
        }
      } finally {
        unsubscribe();
      }
    });
  });

  app.post('/surfaces/:id/events', async (c) => {
    const surfaceId = c.req.param('id');
    try {
      const body = await c.req.json<{
        component?: string;
        path?: string;
        event?: string;
        handler?: string;
        detail?: unknown;
      }>();
      if (!body?.handler || !body.event) {
        return c.json({ error: 'An event needs at least "event" and "handler"' }, 400);
      }
      const recorded = surfaceStore.recordEvent(surfaceId, {
        component: body.component ?? 'unknown',
        path: body.path ?? '$',
        event: body.event,
        handler: body.handler,
        detail: body.detail,
      });
      return c.json({ ok: true, seq: recorded.seq });
    } catch (err) {
      if (err instanceof SurfaceNotFoundError) return c.json({ error: err.message }, 404);
      return c.json({ error: 'Invalid JSON body' }, 400);
    }
  });

  app.get('/surfaces/:id', (c) => {
    const surfaceId = c.req.param('id');
    if (!surfaceStore.has(surfaceId)) {
      return c.html('<!doctype html><title>Surface closed</title><p>No such surface.</p>', 404);
    }
    const { title } = surfaceStore.snapshot(surfaceId);
    return c.html(renderSurfacePage({ surfaceId, title }));
  });
}

/**
 * A surface that is gone is a 404, not a 400 — an agent looping over a closed
 * surface should stop rather than retry a malformed-looking request.
 */
function errorPayload(err: unknown): { status: 400 | 404; body: { error: string } } {
  if (err instanceof SurfaceNotFoundError) return { status: 404, body: { error: err.message } };
  return { status: 400, body: { error: err instanceof Error ? err.message : 'Unknown error' } };
}

export function mountSurfaceApi(app: Hono, publicBase: () => string): void {
  const withUrls = (summary: { surfaceId: string }) => ({
    ...summary,
    url: `${publicBase()}/surfaces/${summary.surfaceId}`,
    streamUrl: `${publicBase()}/surfaces/${summary.surfaceId}/stream`,
  });


  app.post('/surfaces', async (c) => {
    try {
      type CreateBody = { title?: string; root?: unknown; data?: unknown };
      const body: CreateBody = await c.req.json<CreateBody>().catch(() => ({}) as CreateBody);
      const summary = surfaceStore.create({
        title: body?.title,
        root: body?.root as never,
        data: body?.data as never,
      });
      return c.json(withUrls(summary), 201);
    } catch (err) {
      const { status, body: payload } = errorPayload(err);
      return c.json(payload, status);
    }
  });

  app.get('/surfaces', (c) => c.json({ surfaces: surfaceStore.list().map(withUrls) }));

  app.get('/surfaces/:id/state', (c) => {
    try {
      return c.json(surfaceStore.snapshot(c.req.param('id')));
    } catch (err) {
      const { status, body: payload } = errorPayload(err);
      return c.json(payload, status);
    }
  });

  app.post('/surfaces/:id/patch', async (c) => {
    try {
      const body = await c.req.json<{ ops?: unknown }>();
      if (!Array.isArray(body?.ops)) return c.json({ error: 'Missing required field "ops" (array)' }, 400);
      return c.json(withUrls(surfaceStore.patch(c.req.param('id'), body.ops as never)));
    } catch (err) {
      const { status, body: payload } = errorPayload(err);
      return c.json(payload, status);
    }
  });

  app.post('/surfaces/:id/data', async (c) => {
    try {
      const body = await c.req.json<{ patches?: unknown }>();
      if (!Array.isArray(body?.patches)) {
        return c.json({ error: 'Missing required field "patches" (array)' }, 400);
      }
      return c.json(withUrls(surfaceStore.setData(c.req.param('id'), body.patches as never)));
    } catch (err) {
      const { status, body: payload } = errorPayload(err);
      return c.json(payload, status);
    }
  });

  app.post('/surfaces/:id/status', async (c) => {
    try {
      const body = await c.req.json<{ state?: string; message?: string }>();
      if (!body?.state) return c.json({ error: 'Missing required field "state"' }, 400);
      return c.json(withUrls(surfaceStore.setStatus(c.req.param('id'), body.state as never, body.message)));
    } catch (err) {
      const { status, body: payload } = errorPayload(err);
      return c.json(payload, status);
    }
  });

  app.get('/surfaces/:id/events', async (c) => {
    try {
      const since = Number(c.req.query('since') ?? '0') || 0;
      const wait = Number(c.req.query('wait') ?? '0') || 0;
      const events = wait
        ? await surfaceStore.awaitEvents(c.req.param('id'), since, Math.min(wait, 60_000))
        : surfaceStore.eventsSince(c.req.param('id'), since);
      return c.json({ events, lastSeq: events.length ? events[events.length - 1].seq : since });
    } catch (err) {
      const { status, body: payload } = errorPayload(err);
      return c.json(payload, status);
    }
  });

  app.delete('/surfaces/:id', (c) => {
    const surfaceId = c.req.param('id');
    if (!surfaceStore.has(surfaceId)) return c.json({ error: 'No such surface' }, 404);
    surfaceStore.close(surfaceId);
    return c.json({ ok: true, surfaceId });
  });
}
