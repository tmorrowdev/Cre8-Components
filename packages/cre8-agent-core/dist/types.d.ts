import type { ComponentSpec } from '@tmorrow/cre8-wc/a2ui';
/**
 * The wire format between a shell and the agent loop.
 *
 * Anthropic-shaped rather than Gemini-shaped on purpose: it is the more general
 * of the two, so a provider adapter always translates outward from here. The
 * studio already speaks this, which is why the extraction is behaviour-preserving.
 */
export type WireContent = {
    type: 'text';
    text: string;
} | {
    type: 'tool_use';
    id: string;
    name: string;
    input: Record<string, unknown>;
} | {
    type: 'tool_result';
    tool_use_id: string;
    content: string;
};
export type WireMessage = {
    role: 'user' | 'assistant';
    content: WireContent[];
};
/**
 * What a turn emits, as values rather than as bytes.
 *
 * The loop yields these; a shell decides how to carry them. Today the studio
 * serialises them to SSE. A browser client running the same loop in-process
 * consumes them directly — which is the point of keeping the loop a library.
 */
export type AgentEvent = {
    type: 'thinking';
    delta: string;
} | {
    type: 'text';
    delta: string;
} | {
    type: 'tool_use';
    id: string;
    spec: ComponentSpec;
    caption?: string;
} | {
    type: 'tool_use_error';
    id: string;
    error: string;
    spec?: ComponentSpec;
} | {
    type: 'done';
    stop_reason?: string;
    usage?: unknown;
} | {
    type: 'error';
    message: string;
};
export type ValidationResult = {
    ok: true;
} | {
    ok: false;
    error: string;
};
/**
 * Injected rather than imported.
 *
 * The loop must not know whether validation is a network call to the knowledge
 * plane, a local schema check, or a no-op — otherwise it cannot run in a browser,
 * which is the whole direction of travel.
 */
export type ValidateSpec = (spec: ComponentSpec) => Promise<ValidationResult>;
