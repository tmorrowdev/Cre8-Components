"use client";

import { runTurn, type AgentEvent, type WireMessage } from "@tmorrow/cre8-agent-core";
import { GeminiProvider } from "@tmorrow/cre8-agent-core/providers/gemini";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { keyStore } from "@/lib/byok/key-store";

/**
 * One turn, as events, from whichever path is available.
 *
 * Both paths yield the same `AgentEvent` values, so the UI does not branch on
 * which one ran. That is the whole reason `cre8-agent-core` yields values
 * rather than bytes: the browser path skips SSE entirely instead of
 * serialising events only to parse them straight back.
 *
 * - **BYOK (preferred):** the loop runs here, against the user's own key. The
 *   key is a call argument and never touches our origin.
 * - **Trial (fallback):** the server runs the loop with our key and streams
 *   SSE, exactly as before. This is the on-ramp for someone who has not
 *   supplied a key yet.
 */

export type TurnMode = "byok" | "trial";

export async function currentMode(): Promise<TurnMode> {
  return (await keyStore.has("gemini")) ? "byok" : "trial";
}

export async function* streamTurn(messages: WireMessage[]): AsyncIterable<AgentEvent> {
  const key = await keyStore.get("gemini");
  if (key) {
    yield* streamLocally(messages, key);
    return;
  }
  yield* streamFromServer(messages);
}

/**
 * Validates a spec against the knowledge plane.
 *
 * Exported so the key-leak canary can exercise a request to *our* origin. The
 * provider call goes to the model host and legitimately carries the key; this
 * is the only same-origin request the BYOK path makes, which makes it the one
 * that has to be proven clean.
 */
export const validateViaPlane = async (spec: unknown) => {
  const res = await fetch("/api/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ spec }),
  });
  if (!res.ok) return { ok: false as const, error: `Validation unavailable (HTTP ${res.status})` };
  return (await res.json()) as { ok: true } | { ok: false; error: string };
};

/** The client-as-agent path. */
async function* streamLocally(messages: WireMessage[], apiKey: string): AsyncIterable<AgentEvent> {
  const provider = new GeminiProvider({
    // Passed as an argument, never read from an environment or a global.
    credentials: { kind: "apiKey", apiKey },
    model: "gemini-2.5-pro",
  });

  yield* runTurn(messages, {
    provider,
    systemPrompt: buildSystemPrompt(),
    validate: validateViaPlane,
  });
}

/** The metered-trial path: unchanged server behaviour, parsed back into events. */
async function* streamFromServer(messages: WireMessage[]): AsyncIterable<AgentEvent> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);

      let event = "message";
      let dataStr = "";
      for (const line of frame.split("\n")) {
        if (line.startsWith("event: ")) event = line.slice(7);
        else if (line.startsWith("data: ")) dataStr += line.slice(6);
      }
      if (!dataStr) continue;

      try {
        yield { type: event, ...JSON.parse(dataStr) } as AgentEvent;
      } catch {
        // A malformed frame is dropped rather than killing the turn.
      }
    }
  }
}
