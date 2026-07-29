/**
 * What to say about where the server is listening.
 *
 * Streaming UI relies on a surface id being unguessable: the viewer routes sit
 * above the bearer gate because a browser cannot set a header on an EventSource,
 * and the URL is the capability. `GET /surfaces` hands those ids out, so a
 * server that is reachable from the network *and* has no token is not just open
 * — it is enumerable, and anyone who lists it can then patch what they find.
 *
 * Hence loopback by default, and a warning rather than silence when someone
 * widens it without a token.
 */
export declare function isLoopback(hostname: string): boolean;
export declare function bindingAdvice(options: {
    hostname: string;
    token?: string;
}): string | null;
