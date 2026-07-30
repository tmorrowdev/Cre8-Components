/**
 * A2UI streaming surface protocol — types.
 *
 * A "surface" is a live region of UI that an agent builds up over time. The
 * document model is the same nested `ComponentSpec` tree the one-shot renderer
 * uses; what streaming adds is (1) addressing individual nodes by the path
 * grammar the renderer already emits on events, (2) a data model that props can
 * bind into, and (3) an ordered message envelope so a client can tell a dropped
 * message from an out-of-order one.
 */
export const A2UI_STREAM_VERSION = 1;
export function isBindingRef(value) {
    return (typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        typeof value.$bind === 'string');
}
