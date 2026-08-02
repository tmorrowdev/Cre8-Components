/**
 * Serialises one event to an SSE frame.
 *
 * The event's `type` becomes the SSE event name and is stripped from the data
 * payload — which is exactly the shape the studio client already parses, so the
 * wire format is unchanged by the extraction. Remaining key order follows the
 * object literals in `loop.ts`, deliberately, so the bytes match too.
 */
export function toSseFrame(event) {
    const { type, ...data } = event;
    return `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
}
/**
 * Pipes a turn into a `ReadableStream` of SSE bytes.
 *
 * The stream always closes, including on an error event, so a client is never
 * left holding an open connection after a failed turn.
 */
export function toSseStream(events) {
    const encoder = new TextEncoder();
    return new ReadableStream({
        async start(controller) {
            try {
                for await (const event of events) {
                    controller.enqueue(encoder.encode(toSseFrame(event)));
                }
            }
            catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                controller.enqueue(encoder.encode(toSseFrame({ type: 'error', message })));
            }
            finally {
                controller.close();
            }
        },
    });
}
/** Headers an SSE response needs. Proxies buffer without `no-transform`. */
export const SSE_HEADERS = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
};
