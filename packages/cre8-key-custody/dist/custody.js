import { createHash } from 'node:crypto';
import { open, seal } from './envelope.js';
export class InMemoryKeyRecordStore {
    records = new Map();
    key(t, p) {
        return `${t}\u0000${p}`;
    }
    async get(tenantId, provider) {
        return this.records.get(this.key(tenantId, provider)) ?? null;
    }
    async put(record) {
        this.records.set(this.key(record.tenantId, record.provider), record);
    }
    async delete(tenantId, provider) {
        this.records.delete(this.key(tenantId, provider));
    }
    async listProviders(tenantId) {
        return [...this.records.values()].filter((r) => r.tenantId === tenantId).map((r) => r.provider);
    }
}
/**
 * Short, non-reversible identifier for a key.
 *
 * Salted with the tenant so the same key held by two teams does not produce a
 * matching fingerprint, which would leak that they share a credential.
 */
export function fingerprint(secret, tenantId) {
    return createHash('sha256').update(`${tenantId}\u0000${secret}`).digest('hex').slice(0, 12);
}
export class TeamKeyCustody {
    options;
    constructor(options) {
        this.options = options;
    }
    emit(event) {
        try {
            this.options.audit?.({ ...event, at: new Date().toISOString() });
        }
        catch {
            // An audit sink must never break the request it is describing.
        }
    }
    /** Seals a team key. The plaintext is not retained after this returns. */
    async store(tenantId, provider, secret) {
        if (!secret.trim())
            throw new Error('Refusing to store an empty key.');
        const context = { tenantId, provider };
        const record = {
            tenantId,
            provider,
            sealed: await seal(secret, this.options.root, context),
            fingerprint: fingerprint(secret, tenantId),
            createdAt: new Date().toISOString(),
        };
        await this.options.store.put(record);
        this.emit({ action: 'stored', tenantId, provider, fingerprint: record.fingerprint });
        return record;
    }
    /**
     * Runs `use` with the decrypted key, then discards it.
     *
     * The key is passed *into* a callback rather than returned, so there is no
     * handle a caller can hold, cache, or accidentally serialise. That is the
     * whole point of the shape.
     */
    async withKey(tenantId, provider, use) {
        const record = await this.options.store.get(tenantId, provider);
        if (!record) {
            this.emit({ action: 'rejected', tenantId, provider, reason: 'no key on file' });
            throw new Error(`No ${provider} key held for tenant "${tenantId}".`);
        }
        const secret = await open(record.sealed, this.options.root, { tenantId, provider });
        this.emit({ action: 'used', tenantId, provider, fingerprint: record.fingerprint });
        try {
            return await use(secret);
        }
        finally {
            await this.options.store.put({ ...record, lastUsedAt: new Date().toISOString() });
        }
    }
    async revoke(tenantId, provider) {
        await this.options.store.delete(tenantId, provider);
        this.emit({ action: 'revoked', tenantId, provider });
    }
    /** Safe to render: metadata only, never the sealed material. */
    async describe(tenantId) {
        const providers = await this.options.store.listProviders(tenantId);
        const out = [];
        for (const provider of providers) {
            const record = await this.options.store.get(tenantId, provider);
            if (!record)
                continue;
            out.push({
                provider: record.provider,
                fingerprint: record.fingerprint,
                createdAt: record.createdAt,
                lastUsedAt: record.lastUsedAt,
            });
        }
        return out;
    }
}
