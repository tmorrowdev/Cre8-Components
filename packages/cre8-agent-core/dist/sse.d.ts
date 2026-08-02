import type { AgentEvent } from './types.js';
/**
 * Serialises one event to an SSE frame.
 *
 * The event's `type` becomes the SSE event name and is stripped from the data
 * payload — which is exactly the shape the studio client already parses, so the
 * wire format is unchanged by the extraction. Remaining key order follows the
 * object literals in `loop.ts`, deliberately, so the bytes match too.
 */
export declare function toSseFrame(event: AgentEvent): string;
/**
 * Pipes a turn into a `ReadableStream` of SSE bytes.
 *
 * The stream always closes, including on an error event, so a client is never
 * left holding an open connection after a failed turn.
 */
export declare function toSseStream(events: AsyncIterable<AgentEvent>): ReadableStream<Uint8Array>;
/** Headers an SSE response needs. Proxies buffer without `no-transform`. */
export declare const SSE_HEADERS: {
    readonly 'Content-Type': "text/event-stream";
    readonly 'Cache-Control': "no-cache, no-transform";
    readonly Connection: "keep-alive";
};
