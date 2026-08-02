import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * The test that blocks merge on the BYOK path.
 *
 * A harness that leaks a user's model key is unrecoverable, so the invariant is
 * asserted rather than assumed: nothing sent to *our* origin may contain the
 * user's credentials. Requests to the model provider are expected to carry it —
 * that is the point — so the check is scoped to same-origin traffic.
 */

const SENTINEL = "AIza-CANARY-6f1d9c22-DO-NOT-LEAK";

type Recorded = { url: string; init?: RequestInit };

let recorded: Recorded[] = [];
let originalFetch: typeof globalThis.fetch;

/** Anything that is not the model provider is treated as ours. */
function isOurOrigin(url: string): boolean {
  return !/^https?:\/\/(generativelanguage|.*\.googleapis)\.com/.test(url);
}

function serialise({ url, init }: Recorded): string {
  const headers = init?.headers
    ? JSON.stringify(
        init.headers instanceof Headers
          ? Object.fromEntries(init.headers.entries())
          : init.headers
      )
    : "";
  const body = typeof init?.body === "string" ? init.body : "";
  return [url, headers, body].join("\n");
}

beforeEach(() => {
  recorded = [];
  originalFetch = globalThis.fetch;
  globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    recorded.push({ url, init });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as unknown as typeof globalThis.fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("BYOK key custody", () => {
  it("never sends the model key to our own origin", async () => {
    const { keyStore } = await import("./key-store");
    const { streamTurn } = await import("../turn-source");

    await keyStore.set("gemini", SENTINEL);

    try {
      for await (const _ of streamTurn([
        { role: "user", content: [{ type: "text", text: "make a button" }] },
      ])) {
        // Drain. The provider call fails against the stub, which the loop turns
        // into an in-band error event — that is fine. What matters is what was
        // sent while trying.
      }
    } catch {
      // A provider failure must not skip the assertions below.
    }

    const ours = recorded.filter((r) => isOurOrigin(r.url)).map(serialise);
    for (const request of ours) {
      expect(request, `key found in a request to our origin: ${request.slice(0, 200)}`)
        .not.toContain(SENTINEL);
    }

    // The key must reach the provider — otherwise this proves nothing about a
    // path that never ran.
    const toProvider = recorded.filter((r) => !isOurOrigin(r.url));
    expect(toProvider.length, "the provider was never called").toBeGreaterThan(0);

    await keyStore.clear("gemini");
  });

  /**
   * The assertion above only covers same-origin requests the turn happened to
   * make, and a turn whose provider fails immediately makes none — passing
   * vacuously. This drives the one same-origin call the BYOK path really makes,
   * `/api/validate`, with a key set, and proves it clean.
   */
  it("does not leak the key on the validation round-trip", async () => {
    const { keyStore } = await import("./key-store");
    const { validateViaPlane } = await import("../turn-source");

    await keyStore.set("gemini", SENTINEL);
    await validateViaPlane({ component: "cre8-button", props: { text: "Go" } });

    const ours = recorded.filter((r) => isOurOrigin(r.url));
    expect(ours.length, "no same-origin request was made — the canary proved nothing")
      .toBeGreaterThan(0);

    for (const request of ours.map(serialise)) {
      expect(request, "key found in the validation request").not.toContain(SENTINEL);
      expect(request.toLowerCase()).not.toContain("aiza");
      expect(request.toLowerCase()).not.toContain("authorization");
      expect(request.toLowerCase()).not.toContain("x-goog-api-key");
    }

    await keyStore.clear("gemini");
  });

  it("does not reach the server chat route when a key is present", async () => {
    const { keyStore } = await import("./key-store");
    const { streamTurn } = await import("../turn-source");

    await keyStore.set("gemini", SENTINEL);
    try {
      for await (const _ of streamTurn([
        { role: "user", content: [{ type: "text", text: "hi" }] },
      ])) {
        /* drain */
      }
    } catch {
      /* provider stub */
    }

    // /api/chat runs the loop with *our* key. Reaching it while the user has
    // supplied their own means BYOK silently did not engage.
    expect(recorded.map((r) => r.url).filter((u) => u.includes("/api/chat"))).toEqual([]);

    await keyStore.clear("gemini");
  });

  it("falls back to the server route when no key is set", async () => {
    const { keyStore } = await import("./key-store");
    const { streamTurn } = await import("../turn-source");

    await keyStore.clear("gemini");
    try {
      for await (const _ of streamTurn([
        { role: "user", content: [{ type: "text", text: "hi" }] },
      ])) {
        /* drain */
      }
    } catch {
      /* stubbed response is not SSE */
    }

    expect(recorded.some((r) => r.url.includes("/api/chat"))).toBe(true);
  });
});

describe("key store", () => {
  it("keeps the key out of persistent storage unless asked", async () => {
    const { keyStore } = await import("./key-store");
    await keyStore.clear("gemini");
    await keyStore.set("gemini", SENTINEL); // no persist flag

    expect(await keyStore.get("gemini")).toBe(SENTINEL);
    expect(await keyStore.isPersisted("gemini")).toBe(false);

    await keyStore.clear("gemini");
    expect(await keyStore.get("gemini")).toBeNull();
  });
});
