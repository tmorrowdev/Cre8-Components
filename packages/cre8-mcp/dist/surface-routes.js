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
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { streamSSE } from 'hono/streaming';
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
    'stream/diff.js',
]);
let wcRootCache = null;
/**
 * Where the installed `@tmorrow/cre8-wc` lives. `CRE8_WC_ROOT` overrides it,
 * which is how you point a running server at a local build of the design system
 * without reinstalling.
 */
function wcRoot() {
    if (wcRootCache)
        return wcRootCache;
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
function contentTypeFor(file) {
    return file.endsWith('.json') ? 'application/json; charset=utf-8' : 'text/javascript; charset=utf-8';
}
/**
 * Design tokens. A surface without them renders structurally correct but
 * unstyled — the components carry their own shadow styles, but every
 * `--cre8-*` value they read comes from a brand token sheet that has to be on
 * the page. Serving them here is what makes a streamed surface look like cre8
 * rather than like unstyled HTML.
 */
let brandsRootCache;
/**
 * A published `@tmorrow/cre8-wc` ships tokens under `lib/design-tokens/` (that
 * is what the package's own `./themes/*` export points at); a source checkout
 * has them at `design-tokens/`. Checking both is the difference between a
 * container serving branded surfaces and serving naked ones.
 */
function brandsRoot() {
    if (brandsRootCache !== undefined)
        return brandsRootCache;
    for (const candidate of [
        join(wcRoot(), 'lib', 'design-tokens', 'brands'),
        join(wcRoot(), 'design-tokens', 'brands'),
    ]) {
        try {
            if (readdirSync(candidate).length) {
                brandsRootCache = candidate;
                return candidate;
            }
        }
        catch {
            /* try the next layout */
        }
    }
    brandsRootCache = null;
    return null;
}
const THEME_DIR = (brand) => join(brandsRoot() ?? '', brand, 'css');
function knownBrands() {
    const root = brandsRoot();
    if (!root)
        return [];
    try {
        return readdirSync(root, { withFileTypes: true })
            .filter((e) => e.isDirectory())
            .map((e) => e.name);
    }
    catch {
        return [];
    }
}
export function themeExists(brand) {
    return knownBrands().includes(brand);
}
function mountThemes(app) {
    app.get('/themes', (c) => {
        const brands = knownBrands();
        return c.json({
            brands,
            default: DEFAULT_THEME,
            // An empty list is the signature of a deployment that copied the a2ui
            // catalog but not the token sheets — surfaces render unstyled and nothing
            // else complains, so say it here.
            ...(brands.length
                ? {}
                : {
                    hint: 'No brand token sheets found in the installed @tmorrow/cre8-wc. Surfaces will ' +
                        'render unstyled. Ship lib/design-tokens/ with the package, or set CRE8_WC_ROOT ' +
                        'to a checkout that has design-tokens/.',
                }),
        });
    });
    app.get('/themes/:brand/:file{[a-z0-9._-]+\\.css}', (c) => {
        const brand = c.req.param('brand');
        const file = c.req.param('file');
        if (!knownBrands().includes(brand))
            return c.json({ error: `Unknown brand "${brand}"` }, 404);
        // `tokens.css` is the stable alias; everything else must be a sheet that
        // actually exists in that brand's directory. The allowlist comes from a
        // readdir rather than from a pattern, because a brand sheet @imports its
        // siblings — tokens_brand.css carries the primitives every semantic token
        // resolves through, and a surface without it renders entirely unstyled.
        const name = file === 'tokens.css' ? `tokens_${brand}.css` : file;
        let available;
        try {
            available = readdirSync(THEME_DIR(brand)).filter((f) => f.endsWith('.css'));
        }
        catch {
            return c.json({ error: `Brand "${brand}" has no css directory` }, 404);
        }
        if (!available.includes(name)) {
            return c.json({ error: `Not a servable theme file: ${file}`, available }, 404);
        }
        try {
            return c.body(readFileSync(join(THEME_DIR(brand), name), 'utf-8'), 200, {
                'content-type': 'text/css; charset=utf-8',
                'cache-control': 'public, max-age=3600',
            });
        }
        catch {
            // fonts.css is optional per brand; an empty sheet keeps the page quiet.
            return c.body('', 200, { 'content-type': 'text/css; charset=utf-8' });
        }
    });
    // Font files referenced relatively from fonts.css. Allowlisted by listing the
    // directory rather than by trusting the path.
    app.get('/themes/:brand/assets/fonts/:file', (c) => {
        const brand = c.req.param('brand');
        const file = c.req.param('file');
        if (!knownBrands().includes(brand))
            return c.body(null, 404);
        const dir = join(THEME_DIR(brand), 'assets', 'fonts');
        try {
            if (!readdirSync(dir).includes(file))
                return c.body(null, 404);
            const bytes = readFileSync(join(dir, file));
            return c.body(new Uint8Array(bytes), 200, {
                'content-type': file.endsWith('.woff2') ? 'font/woff2' : 'application/octet-stream',
                'cache-control': 'public, max-age=86400',
            });
        }
        catch {
            return c.body(null, 404);
        }
    });
}
export const DEFAULT_THEME = process.env.CRE8_MCP_THEME ?? 'cre8';
export function mountSurfaceViewer(app) {
    mountThemes(app);
    // The design system bundle. Served locally so a surface renders offline and
    // pins to the same library version the catalog describes.
    app.get('/cre8-wc.esm.js', (c) => {
        try {
            const body = readFileSync(join(wcRoot(), 'cdn', 'cre8-wc.esm.js'), 'utf-8');
            return c.body(body, 200, {
                'content-type': 'text/javascript; charset=utf-8',
                'cache-control': 'public, max-age=3600',
            });
        }
        catch {
            return c.redirect(CDN_FALLBACK, 302);
        }
    });
    // The MCP Apps view bridge (`App` from @modelcontextprotocol/ext-apps),
    // served from here so the ui://cre8/surface template stays inside the CSP it
    // declares — one origin, no CDN. `app-with-deps` is the self-contained ESM
    // build; the bare entry has externalized imports a browser cannot resolve.
    app.get('/mcp-app/app.js', (c) => {
        try {
            const require = createRequire(import.meta.url);
            const body = readFileSync(require.resolve('@modelcontextprotocol/ext-apps/app-with-deps'), 'utf-8');
            return c.body(body, 200, {
                'content-type': 'text/javascript; charset=utf-8',
                'cache-control': 'public, max-age=3600',
            });
        }
        catch {
            return c.json({ error: 'The MCP Apps view bridge (@modelcontextprotocol/ext-apps) is not installed.' }, 503);
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
        }
        catch {
            return c.json({
                error: `Runtime file "${file}" is missing from the installed @tmorrow/cre8-wc.`,
                hint: 'Run `pnpm --filter @tmorrow/cre8-wc build:a2ui`, or set CRE8_WC_ROOT to a built copy.',
            }, 503);
        }
    });
    // A viewer cannot read the status of a failed EventSource, so without this it
    // cannot tell a closed surface from a network blip and retries forever behind
    // a spinner that never explains itself.
    app.get('/surfaces/:id/alive', (c) => {
        const surfaceId = c.req.param('id');
        return surfaceStore.has(surfaceId)
            ? c.json({ alive: true, surfaceId })
            : c.json({ alive: false, surfaceId }, 404);
    });
    app.get('/surfaces/:id/stream', (c) => {
        const surfaceId = c.req.param('id');
        if (!surfaceStore.has(surfaceId))
            return c.json({ error: 'No such surface' }, 404);
        return streamSSE(c, async (stream) => {
            const queue = [];
            let wake = null;
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
                    if (aborted)
                        break;
                    await Promise.race([
                        new Promise((r) => {
                            wake = r;
                        }),
                        new Promise((r) => setTimeout(r, 15_000)),
                    ]);
                    wake = null;
                    // Keepalive: proxies drop an idle SSE connection well inside a
                    // conversation's lifetime.
                    if (!aborted && queue.length === 0)
                        await stream.writeSSE({ event: 'ping', data: '' });
                }
            }
            finally {
                unsubscribe();
            }
        });
    });
    app.post('/surfaces/:id/events', async (c) => {
        const surfaceId = c.req.param('id');
        try {
            const body = await c.req.json();
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
        }
        catch (err) {
            if (err instanceof SurfaceNotFoundError)
                return c.json({ error: err.message }, 404);
            return c.json({ error: 'Invalid JSON body' }, 400);
        }
    });
    app.get('/surfaces/:id', (c) => {
        const surfaceId = c.req.param('id');
        if (!surfaceStore.has(surfaceId)) {
            return c.html('<!doctype html><title>Surface closed</title><p>No such surface.</p>', 404);
        }
        const { title, theme } = surfaceStore.snapshot(surfaceId);
        return c.html(renderSurfacePage({ surfaceId, title, theme }));
    });
}
/**
 * A surface that is gone is a 404, not a 400 — an agent looping over a closed
 * surface should stop rather than retry a malformed-looking request.
 */
function errorPayload(err) {
    if (err instanceof SurfaceNotFoundError)
        return { status: 404, body: { error: err.message } };
    return { status: 400, body: { error: err instanceof Error ? err.message : 'Unknown error' } };
}
export function mountSurfaceApi(app, publicBase) {
    const withUrls = (summary) => ({
        ...summary,
        url: `${publicBase()}/surfaces/${summary.surfaceId}`,
        streamUrl: `${publicBase()}/surfaces/${summary.surfaceId}/stream`,
    });
    app.post('/surfaces', async (c) => {
        try {
            const body = await c.req.json().catch(() => ({}));
            const summary = surfaceStore.create({
                title: body?.title,
                root: body?.root,
                data: body?.data,
                theme: body?.theme,
            });
            return c.json(withUrls(summary), 201);
        }
        catch (err) {
            const { status, body: payload } = errorPayload(err);
            return c.json(payload, status);
        }
    });
    app.get('/surfaces', (c) => c.json({ surfaces: surfaceStore.list().map(withUrls) }));
    app.get('/surfaces/:id/state', (c) => {
        try {
            return c.json(surfaceStore.snapshot(c.req.param('id')));
        }
        catch (err) {
            const { status, body: payload } = errorPayload(err);
            return c.json(payload, status);
        }
    });
    app.post('/surfaces/:id/patch', async (c) => {
        try {
            const body = await c.req.json();
            if (!Array.isArray(body?.ops))
                return c.json({ error: 'Missing required field "ops" (array)' }, 400);
            return c.json(withUrls(surfaceStore.patch(c.req.param('id'), body.ops)));
        }
        catch (err) {
            const { status, body: payload } = errorPayload(err);
            return c.json(payload, status);
        }
    });
    app.post('/surfaces/:id/spec', async (c) => {
        try {
            const body = await c.req.json();
            if (body?.spec === undefined)
                return c.json({ error: 'Missing required field "spec"' }, 400);
            return c.json(withUrls(surfaceStore.setSpec(c.req.param('id'), body.spec)));
        }
        catch (err) {
            const { status, body: payload } = errorPayload(err);
            return c.json(payload, status);
        }
    });
    app.post('/surfaces/:id/data', async (c) => {
        try {
            const body = await c.req.json();
            if (!Array.isArray(body?.patches)) {
                return c.json({ error: 'Missing required field "patches" (array)' }, 400);
            }
            return c.json(withUrls(surfaceStore.setData(c.req.param('id'), body.patches)));
        }
        catch (err) {
            const { status, body: payload } = errorPayload(err);
            return c.json(payload, status);
        }
    });
    app.post('/surfaces/:id/status', async (c) => {
        try {
            const body = await c.req.json();
            if (!body?.state)
                return c.json({ error: 'Missing required field "state"' }, 400);
            return c.json(withUrls(surfaceStore.setStatus(c.req.param('id'), body.state, body.message)));
        }
        catch (err) {
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
        }
        catch (err) {
            const { status, body: payload } = errorPayload(err);
            return c.json(payload, status);
        }
    });
    app.delete('/surfaces/:id', (c) => {
        const surfaceId = c.req.param('id');
        if (!surfaceStore.has(surfaceId))
            return c.json({ error: 'No such surface' }, 404);
        surfaceStore.close(surfaceId);
        return c.json({ ok: true, surfaceId });
    });
}
