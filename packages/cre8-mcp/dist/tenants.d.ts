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
export interface Tenant {
    id: string;
    /** Requests per minute. `null` means unlimited. */
    limit: number | null;
}
export interface TenantConfig {
    /** Legacy single token. When set alone, every route requires it. */
    legacyToken?: string;
    /** token -> tenant. Presence of any entry enables per-tenant mode. */
    tenants: Map<string, Tenant>;
    /** Requests per minute for callers with no token. */
    anonymousLimit: number;
}
/**
 * `CRE8_MCP_TENANTS` is JSON: `{"token-abc":{"id":"acme","limit":600}}`.
 * A malformed value is a startup error rather than a silent fallback to open —
 * failing closed is the only safe direction for an auth config.
 */
export declare function loadTenantConfig(env?: NodeJS.ProcessEnv): TenantConfig;
/** True when per-tenant mode is configured. */
export declare function isMultiTenant(config: TenantConfig): boolean;
export declare function resolveTenant(config: TenantConfig, authorization: string | undefined): Tenant | null;
/**
 * Fixed-window counter, per process.
 *
 * Deliberately not a distributed limiter: this exists to stop a runaway client
 * from monopolising one instance, not to enforce a billing quota. Anything
 * stronger belongs in front of the process, and pretending otherwise would give
 * false assurance.
 */
export declare class RateLimiter {
    private readonly windowMs;
    private readonly windows;
    constructor(windowMs?: number);
    /** Returns null when allowed, or the seconds to wait when over limit. */
    check(key: string, limit: number | null, now: number): number | null;
    /** Drops expired windows so a long-lived process does not grow unbounded. */
    sweep(now: number): void;
    get size(): number;
}
/**
 * Routes that expose capabilities rather than public information.
 *
 * Surface ids are unguessable-by-design and `GET /surfaces` lists them, so this
 * set stays closed to anonymous callers even in per-tenant mode.
 */
export declare function isPrivilegedPath(path: string): boolean;
/** Reachable with no credentials at all, in any mode. */
export declare function isAlwaysOpenPath(path: string): boolean;
