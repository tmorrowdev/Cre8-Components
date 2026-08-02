import type { WireMessage } from './types.js';
/**
 * A model credential, supplied by the caller.
 *
 * **Invariant: no provider in this package reads `process.env`.** Credentials
 * arrive as arguments, always. That is the single constraint that lets the same
 * loop run on a server holding your key today and in a browser holding the
 * user's key tomorrow, with no change to the loop itself.
 *
 * A provider that reaches for ambient credentials would work fine on a server
 * and fail silently everywhere else, so `credentials.test.mjs` asserts the
 * absence rather than trusting review to catch it.
 */
export type ProviderCredentials = {
    kind: 'apiKey';
    apiKey: string;
}
/** Ambient cloud identity (Vertex, IAM roles). Server-only by nature. */
 | {
    kind: 'ambient';
    project: string;
    location: string;
};
export interface ProviderTurn {
    messages: WireMessage[];
    systemPrompt: string;
    maxOutputTokens?: number;
    /** Ask for reasoning tokens where the provider exposes them. */
    includeThoughts?: boolean;
}
/**
 * What a raw provider stream yields, before the loop applies tool semantics.
 *
 * Deliberately narrower than `AgentEvent`: a provider reports what the model
 * said, the loop decides what it means. A provider never validates a spec.
 */
export type ProviderChunk = {
    type: 'thinking';
    delta: string;
} | {
    type: 'text';
    delta: string;
}
/** `id` is absent when the provider did not supply one; the loop numbers those. */
 | {
    type: 'tool_call';
    id?: string;
    name: string;
    args: Record<string, unknown>;
} | {
    type: 'stop';
    stopReason?: string;
    usage?: unknown;
};
export interface Provider {
    readonly name: string;
    stream(turn: ProviderTurn): AsyncIterable<ProviderChunk>;
}
