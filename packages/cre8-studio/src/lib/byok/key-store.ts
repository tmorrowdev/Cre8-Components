"use client";

/**
 * Browser custody for the user's model key.
 *
 * **The key never reaches our origin.** It is held in a module-level variable
 * for the session and passed to the provider as a call argument. Nothing here
 * writes it to a cookie, a header aimed at us, or any request we serve.
 *
 * Persistence is opt-in and honest about its cost: anything readable by this
 * page is readable by script injected into this page, so a persisted key is
 * XSS-reachable. Session-only is the default for that reason. The mitigation
 * that makes persistence defensible is a strict CSP and no third-party script
 * in the shell — which a thin shell can actually afford.
 */

export type ProviderId = "gemini";

const DB_NAME = "cre8-studio-byok";
const STORE = "keys";

/** Session-scoped. Cleared by a reload unless the user opted into persistence. */
let inMemory: Partial<Record<ProviderId, string>> = {};

function idb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  return new Promise((resolve) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

async function idbSet(provider: ProviderId, key: string): Promise<void> {
  const db = await idb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(key, provider);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

async function idbGet(provider: ProviderId): Promise<string | null> {
  const db = await idb();
  if (!db) return null;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(provider);
    req.onsuccess = () => resolve(typeof req.result === "string" ? req.result : null);
    req.onerror = () => resolve(null);
  });
}

async function idbDelete(provider: ProviderId): Promise<void> {
  const db = await idb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(provider);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

export const keyStore = {
  /** Session-only unless `persist` is explicitly true. */
  async set(provider: ProviderId, key: string, persist = false): Promise<void> {
    const trimmed = key.trim();
    if (!trimmed) return;
    inMemory[provider] = trimmed;
    if (persist) await idbSet(provider, trimmed);
  },

  /** Memory first; falls back to a previously persisted key and rehydrates. */
  async get(provider: ProviderId): Promise<string | null> {
    if (inMemory[provider]) return inMemory[provider]!;
    const stored = await idbGet(provider);
    if (stored) inMemory[provider] = stored;
    return stored;
  },

  async has(provider: ProviderId): Promise<boolean> {
    return (await keyStore.get(provider)) !== null;
  },

  /** Forgets the key everywhere, including any persisted copy. */
  async clear(provider: ProviderId): Promise<void> {
    delete inMemory[provider];
    await idbDelete(provider);
  },

  /** True when a persisted copy exists, so the UI can say so plainly. */
  async isPersisted(provider: ProviderId): Promise<boolean> {
    return (await idbGet(provider)) !== null;
  },
};
