import { type RootKeyProvider, type SealedSecret } from './envelope.js';
/**
 * Shared model keys for teams.
 *
 * The default posture stays client-only: an individual's key lives in their
 * browser and never reaches a server. This exists for the case that posture
 * cannot serve — a team that wants one credential, central revocation, and an
 * audit trail rather than a key pasted into everyone's browser.
 *
 * Taking custody is a real obligation, so the design tries to hold as little as
 * possible for as short as possible. Plaintext exists only inside `withKey`,
 * only for the duration of one call, and is never returned to the caller,
 * stored, or logged.
 */
export interface KeyRecord {
    tenantId: string;
    provider: string;
    sealed: SealedSecret;
    /** Non-reversible, for display and for detecting an unchanged rotation. */
    fingerprint: string;
    createdAt: string;
    lastUsedAt?: string;
}
/**
 * Persistence, deliberately abstract.
 *
 * No datastore is chosen here. Custody needs durable storage a team can revoke
 * from, and picking one is an infrastructure decision rather than a library
 * one — so this package ships the interface and an in-memory implementation for
 * tests, and a deployment supplies the rest.
 */
export interface KeyRecordStore {
    get(tenantId: string, provider: string): Promise<KeyRecord | null>;
    put(record: KeyRecord): Promise<void>;
    delete(tenantId: string, provider: string): Promise<void>;
    listProviders(tenantId: string): Promise<string[]>;
}
export declare class InMemoryKeyRecordStore implements KeyRecordStore {
    private readonly records;
    private key;
    get(tenantId: string, provider: string): Promise<KeyRecord | null>;
    put(record: KeyRecord): Promise<void>;
    delete(tenantId: string, provider: string): Promise<void>;
    listProviders(tenantId: string): Promise<string[]>;
}
/** What happened, for an audit trail. Never carries key material. */
export interface AuditEvent {
    action: 'stored' | 'used' | 'revoked' | 'rejected';
    tenantId: string;
    provider: string;
    fingerprint?: string;
    reason?: string;
    at: string;
}
export interface CustodyOptions {
    root: RootKeyProvider;
    store: KeyRecordStore;
    /** Called for every custody operation. Must not throw. */
    audit?: (event: AuditEvent) => void;
}
/**
 * Short, non-reversible identifier for a key.
 *
 * Salted with the tenant so the same key held by two teams does not produce a
 * matching fingerprint, which would leak that they share a credential.
 */
export declare function fingerprint(secret: string, tenantId: string): string;
export declare class TeamKeyCustody {
    private readonly options;
    constructor(options: CustodyOptions);
    private emit;
    /** Seals a team key. The plaintext is not retained after this returns. */
    store(tenantId: string, provider: string, secret: string): Promise<KeyRecord>;
    /**
     * Runs `use` with the decrypted key, then discards it.
     *
     * The key is passed *into* a callback rather than returned, so there is no
     * handle a caller can hold, cache, or accidentally serialise. That is the
     * whole point of the shape.
     */
    withKey<T>(tenantId: string, provider: string, use: (secret: string) => Promise<T>): Promise<T>;
    revoke(tenantId: string, provider: string): Promise<void>;
    /** Safe to render: metadata only, never the sealed material. */
    describe(tenantId: string): Promise<Array<{
        provider: string;
        fingerprint: string;
        createdAt: string;
        lastUsedAt?: string;
    }>>;
}
