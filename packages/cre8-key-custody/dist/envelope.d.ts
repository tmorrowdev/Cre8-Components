export interface SealedSecret {
    /** Data key, encrypted by the root key. */
    wrappedDataKey: string;
    wrappedDataKeyIv: string;
    wrappedDataKeyTag: string;
    /** The secret, encrypted by the data key. */
    ciphertext: string;
    iv: string;
    tag: string;
    /** Identifies which root key sealed this, so rotation is detectable. */
    rootKeyId: string;
}
export interface SealContext {
    tenantId: string;
    provider: string;
}
/**
 * Wraps and unwraps data keys. A real deployment backs this with a KMS so the
 * root key never enters application memory; `LocalRootKey` exists for tests and
 * single-node deployments that accept that trade-off knowingly.
 */
export interface RootKeyProvider {
    readonly id: string;
    wrap(dataKey: Buffer, context: SealContext): Promise<{
        wrapped: Buffer;
        iv: Buffer;
        tag: Buffer;
    }>;
    unwrap(wrapped: Buffer, iv: Buffer, tag: Buffer, context: SealContext): Promise<Buffer>;
}
export declare class RootKeyError extends Error {
}
/**
 * Root key held in process memory.
 *
 * **Refuses to run on anything that is not 32 bytes of real entropy.** There is
 * deliberately no development default: a custody system that silently falls back
 * to a hardcoded key is worse than none, because it looks like protection while
 * providing none, and nothing in a test suite would notice.
 */
export declare class LocalRootKey implements RootKeyProvider {
    readonly id: string;
    private readonly key;
    constructor(material: string | Buffer, id?: string);
    wrap(dataKey: Buffer, context: SealContext): Promise<{
        wrapped: Buffer<ArrayBuffer>;
        iv: NonSharedBuffer;
        tag: NonSharedBuffer;
    }>;
    unwrap(wrapped: Buffer, iv: Buffer, tag: Buffer, context: SealContext): Promise<Buffer<ArrayBuffer>>;
}
export declare function seal(secret: string, root: RootKeyProvider, context: SealContext): Promise<SealedSecret>;
export declare function open(sealed: SealedSecret, root: RootKeyProvider, context: SealContext): Promise<string>;
/** Constant-time comparison, for callers verifying a fingerprint. */
export declare function equals(a: string, b: string): boolean;
