import { createHash } from 'node:crypto';
import { open, seal, type RootKeyProvider, type SealedSecret } from './envelope.js';

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

export class InMemoryKeyRecordStore implements KeyRecordStore {
  private readonly records = new Map<string, KeyRecord>();
  private key(t: string, p: string) {
    return `${t}\u0000${p}`;
  }

  async get(tenantId: string, provider: string) {
    return this.records.get(this.key(tenantId, provider)) ?? null;
  }
  async put(record: KeyRecord) {
    this.records.set(this.key(record.tenantId, record.provider), record);
  }
  async delete(tenantId: string, provider: string) {
    this.records.delete(this.key(tenantId, provider));
  }
  async listProviders(tenantId: string) {
    return [...this.records.values()].filter((r) => r.tenantId === tenantId).map((r) => r.provider);
  }
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
export function fingerprint(secret: string, tenantId: string): string {
  return createHash('sha256').update(`${tenantId}\u0000${secret}`).digest('hex').slice(0, 12);
}

export class TeamKeyCustody {
  constructor(private readonly options: CustodyOptions) {}

  private emit(event: Omit<AuditEvent, 'at'>) {
    try {
      this.options.audit?.({ ...event, at: new Date().toISOString() });
    } catch {
      // An audit sink must never break the request it is describing.
    }
  }

  /** Seals a team key. The plaintext is not retained after this returns. */
  async store(tenantId: string, provider: string, secret: string): Promise<KeyRecord> {
    if (!secret.trim()) throw new Error('Refusing to store an empty key.');

    const context = { tenantId, provider };
    const record: KeyRecord = {
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
  async withKey<T>(
    tenantId: string,
    provider: string,
    use: (secret: string) => Promise<T>
  ): Promise<T> {
    const record = await this.options.store.get(tenantId, provider);
    if (!record) {
      this.emit({ action: 'rejected', tenantId, provider, reason: 'no key on file' });
      throw new Error(`No ${provider} key held for tenant "${tenantId}".`);
    }

    const secret = await open(record.sealed, this.options.root, { tenantId, provider });
    this.emit({ action: 'used', tenantId, provider, fingerprint: record.fingerprint });

    try {
      return await use(secret);
    } finally {
      await this.options.store.put({ ...record, lastUsedAt: new Date().toISOString() });
    }
  }

  async revoke(tenantId: string, provider: string): Promise<void> {
    await this.options.store.delete(tenantId, provider);
    this.emit({ action: 'revoked', tenantId, provider });
  }

  /** Safe to render: metadata only, never the sealed material. */
  async describe(tenantId: string): Promise<
    Array<{ provider: string; fingerprint: string; createdAt: string; lastUsedAt?: string }>
  > {
    const providers = await this.options.store.listProviders(tenantId);
    const out = [];
    for (const provider of providers) {
      const record = await this.options.store.get(tenantId, provider);
      if (!record) continue;
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
