/**
 * Per-tenant access to the knowledge plane.
 *
 * The plane holds no model key and calls no model, and everything it serves is
 * derived from the public `@tmorrow/cre8-wc` package — so its catalog is not a
 * secret and gating it behind a shared password protects nothing. What auth is
 * actually for here is rate limiting, attributing usage, and later, entitling a
 * tenant to a private catalog.
 *
 * Two routes classes, because they have genuinely different threat models:
 *
 * - **Knowledge** (catalog, context, search, validate, generate) is public
 *   information. Anonymous callers are allowed, with a low rate limit.
 * - **Surfaces** are not. `GET /surfaces` hands out ids that the streaming UI
 *   treats as unguessable capabilities, so an open surface API is not merely
 *   readable, it is enumerable. These always require a tenant.
 *
 * Backwards compatible by construction: with only `CRE8_MCP_TOKEN` set the
 * server behaves exactly as it did — one token, gating everything. Per-tenant
 * mode is opt-in via `CRE8_MCP_TENANTS`, so no existing deployment loosens
 * because it upgraded.
 */
const ANONYMOUS_DEFAULT = 60;
/**
 * `CRE8_MCP_TENANTS` is JSON: `{"token-abc":{"id":"acme","limit":600}}`.
 * A malformed value is a startup error rather than a silent fallback to open —
 * failing closed is the only safe direction for an auth config.
 */
export function loadTenantConfig(env = process.env) {
    const tenants = new Map();
    const raw = env.CRE8_MCP_TENANTS;
    if (raw) {
        let parsed;
        try {
            parsed = JSON.parse(raw);
        }
        catch {
            throw new Error('CRE8_MCP_TENANTS is not valid JSON; refusing to start with an unreadable auth config');
        }
        for (const [token, value] of Object.entries(parsed)) {
            if (!token)
                continue;
            tenants.set(token, {
                id: value?.id ?? 'unnamed',
                limit: value?.limit === null ? null : (value?.limit ?? 600),
            });
        }
    }
    const anonymousLimit = env.CRE8_MCP_ANON_LIMIT
        ? Number(env.CRE8_MCP_ANON_LIMIT)
        : ANONYMOUS_DEFAULT;
    return {
        legacyToken: env.CRE8_MCP_TOKEN || undefined,
        tenants,
        anonymousLimit: Number.isFinite(anonymousLimit) && anonymousLimit > 0 ? anonymousLimit : ANONYMOUS_DEFAULT,
    };
}
/** True when per-tenant mode is configured. */
export function isMultiTenant(config) {
    return config.tenants.size > 0;
}
export function resolveTenant(config, authorization) {
    if (!authorization?.startsWith('Bearer '))
        return null;
    const token = authorization.slice(7);
    const tenant = config.tenants.get(token);
    if (tenant)
        return tenant;
    // The legacy token behaves as an unlimited tenant so existing deployments
    // keep working unchanged when they adopt per-tenant mode incrementally.
    if (config.legacyToken && token === config.legacyToken) {
        return { id: 'legacy', limit: null };
    }
    return null;
}
/**
 * Fixed-window counter, per process.
 *
 * Deliberately not a distributed limiter: this exists to stop a runaway client
 * from monopolising one instance, not to enforce a billing quota. Anything
 * stronger belongs in front of the process, and pretending otherwise would give
 * false assurance.
 */
export class RateLimiter {
    windowMs;
    windows = new Map();
    constructor(windowMs = 60_000) {
        this.windowMs = windowMs;
    }
    /** Returns null when allowed, or the seconds to wait when over limit. */
    check(key, limit, now) {
        if (limit === null)
            return null;
        const window = this.windows.get(key);
        if (!window || now >= window.resetAt) {
            this.windows.set(key, { count: 1, resetAt: now + this.windowMs });
            return null;
        }
        if (window.count >= limit) {
            return Math.max(1, Math.ceil((window.resetAt - now) / 1000));
        }
        window.count += 1;
        return null;
    }
    /** Drops expired windows so a long-lived process does not grow unbounded. */
    sweep(now) {
        for (const [key, window] of this.windows) {
            if (now >= window.resetAt)
                this.windows.delete(key);
        }
    }
    get size() {
        return this.windows.size;
    }
}
/**
 * Routes that expose capabilities rather than public information.
 *
 * Surface ids are unguessable-by-design and `GET /surfaces` lists them, so this
 * set stays closed to anonymous callers even in per-tenant mode.
 */
export function isPrivilegedPath(path) {
    return path === '/surfaces' || path.startsWith('/surfaces/');
}
/** Reachable with no credentials at all, in any mode. */
export function isAlwaysOpenPath(path) {
    return path === '/health';
}
