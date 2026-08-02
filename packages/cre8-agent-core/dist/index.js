/**
 * The cre8 agent loop, as an embeddable library.
 *
 * Two constraints define this package, and both exist to make BYOK and
 * on-device inference possible without rewriting the loop:
 *
 *   1. **No ambient credentials.** Nothing here reads `process.env`. A caller
 *      supplies credentials as arguments, so the same code runs on a server
 *      holding your key and in a browser holding the user's.
 *   2. **No transport.** The loop yields values, not bytes. SSE is one optional
 *      adapter (`./sse`), not the interface.
 *
 * It follows that this package must stay embeddable. The moment it needs a
 * server of its own, both goals break.
 */
export { runTurn } from './loop.js';
export { SSE_HEADERS, toSseFrame, toSseStream } from './sse.js';
