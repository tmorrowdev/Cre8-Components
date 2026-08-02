import type { Provider } from './provider.js';
import type { AgentEvent, ValidateSpec, WireMessage } from './types.js';
export interface RunTurnOptions {
    provider: Provider;
    systemPrompt: string;
    validate: ValidateSpec;
    maxOutputTokens?: number;
    includeThoughts?: boolean;
}
/**
 * One agent turn, as an async iterable of events.
 *
 * Everything here is provider-agnostic and transport-agnostic: no `process.env`,
 * no `Response`, no SSE. A server serialises the events; a browser consumes them
 * directly. That is the entire reason this is a library and not a route.
 */
export declare function runTurn(messages: WireMessage[], options: RunTurnOptions): AsyncIterable<AgentEvent>;
