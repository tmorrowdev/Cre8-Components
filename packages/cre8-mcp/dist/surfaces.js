/**
 * Surface store — the server half of streaming UI.
 *
 * A surface is a live region of UI an agent builds up over time. The store owns
 * one `SurfaceModel` per surface, which means a patch is validated against the
 * cre8 catalog *here*, at the tool boundary, and a bad one is reported to the
 * agent as a tool error instead of silently producing a broken page in someone's
 * browser.
 *
 * The same model also gives late joiners a correct starting point: a browser
 * that connects halfway through a stream is sent the current tree as a synthetic
 * `surface.create`, not a replay of every message since the beginning.
 */
import { randomBytes } from 'node:crypto';
import { SurfaceModel } from '@tmorrow/cre8-wc/a2ui/stream/index.js';
import { loadA2uiCatalog } from './handlers.js';
import { DEFAULT_THEME, themeExists } from './surface-routes.js';
class SurfaceRecord {
    surfaceId;
    theme;
    model;
    listeners = new Set();
    events = [];
    waiters = new Set();
    eventSeq = 0;
    createdAt = new Date().toISOString();
    updatedAt = new Date().toISOString();
    constructor(surfaceId, model, theme) {
        this.surfaceId = surfaceId;
        this.theme = theme;
        this.model = model;
    }
}
export class SurfaceNotFoundError extends Error {
    constructor(surfaceId) {
        super(`No surface "${surfaceId}". It may have been closed or swept for inactivity.`);
        this.name = 'SurfaceNotFoundError';
    }
}
export class SurfaceStore {
    surfaces = new Map();
    maxSurfaces;
    maxEvents;
    idleTtlMs;
    constructor(options = {}) {
        this.maxSurfaces = options.maxSurfaces ?? 64;
        this.maxEvents = options.maxEvents ?? 200;
        this.idleTtlMs = options.idleTtlMs ?? 1000 * 60 * 60;
    }
    create(input = {}) {
        this.sweep();
        if (this.surfaces.size >= this.maxSurfaces) {
            const oldest = [...this.surfaces.values()].sort((a, b) => a.updatedAt < b.updatedAt ? -1 : 1)[0];
            if (oldest)
                this.close(oldest.surfaceId);
        }
        if (input.theme && !themeExists(input.theme)) {
            throw new Error(`Unknown theme "${input.theme}". GET /themes lists the brands this server can serve.`);
        }
        // Unguessable, because the surface URL *is* the viewer capability: the host
        // page and its event stream are reachable without the bearer token, since a
        // browser cannot set one on an EventSource or a page load.
        const surfaceId = randomBytes(16).toString('hex');
        const catalog = loadA2uiCatalog();
        const model = new SurfaceModel(catalog, { surfaceId, title: input.title });
        const record = new SurfaceRecord(surfaceId, model, input.theme ?? DEFAULT_THEME);
        // Applied before the record is published, so a spec that fails validation
        // never leaves a half-built surface behind.
        model.apply({
            v: 1,
            type: 'surface.create',
            surfaceId,
            seq: 0,
            catalogId: catalog.id,
            title: input.title,
            root: input.root,
            data: input.data,
        });
        this.surfaces.set(surfaceId, record);
        return this.summarize(record);
    }
    get(surfaceId) {
        const record = this.surfaces.get(surfaceId);
        if (!record)
            throw new SurfaceNotFoundError(surfaceId);
        return record;
    }
    has(surfaceId) {
        return this.surfaces.has(surfaceId);
    }
    summary(surfaceId) {
        return this.summarize(this.get(surfaceId));
    }
    list() {
        this.sweep();
        return [...this.surfaces.values()].map((r) => this.summarize(r));
    }
    patch(surfaceId, ops) {
        const record = this.get(surfaceId);
        return this.dispatch(record, {
            v: 1,
            type: 'surface.patch',
            surfaceId,
            seq: record.model.seq + 1,
            ops,
        });
    }
    setData(surfaceId, patches) {
        const record = this.get(surfaceId);
        return this.dispatch(record, {
            v: 1,
            type: 'surface.data',
            surfaceId,
            seq: record.model.seq + 1,
            patches,
        });
    }
    setStatus(surfaceId, state, message) {
        const record = this.get(surfaceId);
        return this.dispatch(record, {
            v: 1,
            type: 'surface.status',
            surfaceId,
            seq: record.model.seq + 1,
            state,
            message,
        });
    }
    close(surfaceId) {
        const record = this.surfaces.get(surfaceId);
        if (!record)
            return;
        try {
            this.dispatch(record, {
                v: 1,
                type: 'surface.delete',
                surfaceId,
                seq: record.model.seq + 1,
            });
        }
        finally {
            for (const waiter of record.waiters) {
                clearTimeout(waiter.timer);
                waiter.resolve([]);
            }
            record.waiters.clear();
            record.listeners.clear();
            this.surfaces.delete(surfaceId);
        }
    }
    /** The tree as it stands, bindings resolved — for snapshots and mcp-ui HTML. */
    snapshot(surfaceId) {
        const record = this.get(surfaceId);
        const { model } = record;
        return {
            surfaceId,
            title: model.title,
            theme: record.theme,
            state: model.state,
            seq: model.seq,
            root: model.snapshot(),
            data: model.data,
        };
    }
    /**
     * Subscribe to a surface. The listener is immediately handed a synthetic
     * `surface.create` carrying current state, so a viewer that arrives late sees
     * the finished-so-far UI rather than an empty box.
     */
    subscribe(surfaceId, listener) {
        const record = this.get(surfaceId);
        record.listeners.add(listener);
        listener(this.replayMessage(record));
        return () => {
            record.listeners.delete(listener);
        };
    }
    replayMessage(record) {
        const { model } = record;
        return {
            v: 1,
            type: 'surface.create',
            surfaceId: record.surfaceId,
            seq: model.seq,
            catalogId: model.catalog.id,
            title: model.title,
            // The raw tree, bindings intact — the viewer's own model resolves them,
            // so a later surface.data patch updates the same bound props it would
            // have updated had the viewer been connected from the start.
            root: model.root ?? undefined,
            data: model.data,
        };
    }
    // ─── events (browser → agent) ─────────────────────────────────────────────
    recordEvent(surfaceId, event) {
        const record = this.get(surfaceId);
        const full = {
            v: 1,
            type: 'surface.event',
            surfaceId,
            seq: ++record.eventSeq,
            at: new Date().toISOString(),
            ...event,
        };
        record.events.push(full);
        if (record.events.length > this.maxEvents) {
            record.events.splice(0, record.events.length - this.maxEvents);
        }
        record.updatedAt = full.at;
        for (const waiter of [...record.waiters]) {
            if (full.seq > waiter.since) {
                clearTimeout(waiter.timer);
                record.waiters.delete(waiter);
                waiter.resolve(record.events.filter((e) => e.seq > waiter.since));
            }
        }
        return full;
    }
    eventsSince(surfaceId, since = 0) {
        return this.get(surfaceId).events.filter((e) => (e.seq ?? 0) > since);
    }
    /**
     * Long-poll for events. Returns immediately if any are already pending, so an
     * agent that calls this in a loop cannot miss an event that arrived between
     * two calls.
     */
    awaitEvents(surfaceId, since = 0, timeoutMs = 25_000) {
        const record = this.get(surfaceId);
        const pending = record.events.filter((e) => (e.seq ?? 0) > since);
        if (pending.length)
            return Promise.resolve(pending);
        return new Promise((resolve) => {
            const waiter = {
                since,
                resolve,
                timer: setTimeout(() => {
                    record.waiters.delete(waiter);
                    resolve([]);
                }, timeoutMs),
            };
            record.waiters.add(waiter);
        });
    }
    // ─── internals ────────────────────────────────────────────────────────────
    dispatch(record, message) {
        record.model.apply(message);
        record.updatedAt = new Date().toISOString();
        for (const listener of [...record.listeners]) {
            try {
                listener(message);
            }
            catch {
                // A viewer whose connection died must not fail the agent's tool call.
                record.listeners.delete(listener);
            }
        }
        return this.summarize(record);
    }
    summarize(record) {
        return {
            surfaceId: record.surfaceId,
            title: record.model.title,
            theme: record.theme,
            state: record.model.state,
            seq: record.model.seq,
            viewers: record.listeners.size,
            pendingEvents: record.events.length,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        };
    }
    sweep() {
        const cutoff = Date.now() - this.idleTtlMs;
        for (const record of [...this.surfaces.values()]) {
            if (record.listeners.size > 0)
                continue;
            if (Date.parse(record.updatedAt) < cutoff)
                this.surfaces.delete(record.surfaceId);
        }
    }
}
/** One store per process. Surfaces are in-memory and do not survive a restart. */
export const surfaceStore = new SurfaceStore();
