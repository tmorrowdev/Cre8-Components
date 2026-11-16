/**
 * Jev (TypeSafe AI's System One model) as a decision layer for tool calls.
 *
 * Jev does not write text. It reads a state and returns a typed, calibrated
 * answer — a yes/no probability, a choice with a distribution, or a score —
 * in roughly 70-500ms. That makes it usable as a "fuzzy if" inside the tool
 * dispatch path, where a full LLM round-trip would be far too slow.
 *
 *   POST https://api.typesafe.ai/v1/systemone
 *   Authorization: Bearer <TYPESAFE_API_KEY>
 *
 * Every function here fails open. The cre8 catalog is the product; Jev is an
 * advisory layer on top of it. No API key, a timeout, a rate limit or a
 * malformed response must all degrade to "no opinion" and let the tool call
 * proceed exactly as it did before this file existed. Following the house
 * convention in `embeddings.ts`, `null` means "could not ask" and is kept
 * distinct from a real answer.
 */

const DEFAULT_BASE_URL = 'https://api.typesafe.ai/v1/systemone';
const DEFAULT_MODEL = 'jev-latest';
const DEFAULT_TIMEOUT_MS = 1500;

/** A question Jev can answer. The three types are the whole API surface. */
export type JevQuestion =
  | {
      type: 'noul';
      instructions: string;
      /** What "true" and "false" mean for this question. */
      criteria?: { true: string; false: string };
    }
  | {
      type: 'choice';
      instructions: string;
      /** option key -> what that option means. At most 255 options. */
      criteria: Record<string, string | null>;
    }
  | {
      type: 'score';
      instructions: string;
      /** Ordered scale levels, 2 to 10 of them. */
      criteria: string[];
    };

export interface JevAnswer {
  type: 'noul' | 'choice' | 'score';
  /** Probability the statement is true, 0-1. Present for `noul`. */
  noul?: number;
  /** Highest-probability option key. Present for `choice`. */
  choice?: string;
  /** Every option mapped to its probability; sums to 1. Present for `choice`. */
  probabilities?: Record<string, number>;
  /** Position on the scale. Present for `score`. */
  score?: number;
  legend?: Record<string, string>;
  /** 0-1, derived from the answer's distribution. Absent for `noul`. */
  confidence?: number;
}

export type JevAnswers = Record<string, JevAnswer>;

/** `enforce` lets Jev change behaviour; `shadow` records its opinion only. */
export type JevMode = 'enforce' | 'shadow';

export interface JevConfig {
  apiKey?: string;
  baseUrl: string;
  model: string;
  timeoutMs: number;
  mode: JevMode;
  /** Block a gated call when risk probability reaches this. */
  gateThreshold: number;
}

/**
 * `TYPESAFE_API_KEY` is the documented name; `JEV_API_KEY` and `JEV_KEY` are
 * accepted aliases so an existing jev-mcp environment works unchanged.
 */
export function jevConfig(): JevConfig {
  const timeout = Number(process.env.JEV_TIMEOUT_MS);
  const threshold = Number(process.env.JEV_GATE_THRESHOLD);
  return {
    apiKey: process.env.TYPESAFE_API_KEY || process.env.JEV_API_KEY || process.env.JEV_KEY,
    baseUrl: (process.env.JEV_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, ''),
    model: process.env.JEV_MODEL || DEFAULT_MODEL,
    timeoutMs: Number.isFinite(timeout) && timeout > 0 ? timeout : DEFAULT_TIMEOUT_MS,
    mode: process.env.JEV_MODE === 'shadow' ? 'shadow' : 'enforce',
    gateThreshold:
      Number.isFinite(threshold) && threshold > 0 && threshold <= 1 ? threshold : 0.8,
  };
}

/**
 * Jev is on only when a key is present and it has not been explicitly
 * disabled. Opt-out rather than opt-in, so `JEV_ENABLED=false` is a kill
 * switch that does not require unsetting credentials.
 */
export function jevEnabled(config: JevConfig = jevConfig()): boolean {
  if (process.env.JEV_ENABLED === 'false' || process.env.JEV_ENABLED === '0') return false;
  return Boolean(config.apiKey);
}

const RETRYABLE = new Set([429, 529]);

/**
 * Asks Jev one or more questions about `state`.
 *
 * Returns `null` whenever the question could not be put — no key, disabled,
 * timed out, rate limited twice, or a response that did not parse. Callers
 * treat `null` as "no opinion" and carry on; this never throws.
 */
export async function jevAsk(
  state: unknown,
  questions: Record<string, JevQuestion>,
  config: JevConfig = jevConfig()
): Promise<JevAnswers | null> {
  if (!jevEnabled(config)) return null;
  if (Object.keys(questions).length === 0) return null;

  const body = JSON.stringify({ model: config.model, state, questions });

  for (let attempt = 0; attempt < 2; attempt++) {
    // A fresh controller per attempt: an aborted signal cannot be reused.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeoutMs);
    try {
      const res = await fetch(config.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`,
        },
        body,
        signal: controller.signal,
      });

      if (RETRYABLE.has(res.status) && attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        continue;
      }
      // 401 (bad key) and 422 (bad question) are our bug, not the caller's.
      // Still fail open — a misconfigured decision layer must not take the
      // catalog down with it.
      if (!res.ok) return null;

      const json = (await res.json()) as { answers?: JevAnswers };
      return json.answers ?? null;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

/** Convenience for the common single-question case. */
export async function jevAskOne(
  state: unknown,
  question: JevQuestion,
  config: JevConfig = jevConfig()
): Promise<JevAnswer | null> {
  const answers = await jevAsk(state, { answer: question }, config);
  return answers?.answer ?? null;
}
