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

const LOOPBACK = new Set(['127.0.0.1', '::1', 'localhost']);

export function isLoopback(hostname: string): boolean {
  return LOOPBACK.has(hostname);
}

export function bindingAdvice(options: { hostname: string; token?: string }): string | null {
  if (isLoopback(options.hostname)) return null;
  if (options.token) return null;
  return [
    '',
    '  ⚠ cre8-mcp is listening on ' + options.hostname + ' with no CRE8_MCP_TOKEN set.',
    '    Anyone who can reach this port can list every live surface — and a surface id is',
    '    the only thing protecting its viewer — then patch or close it, and call every MCP',
    '    tool. Set CRE8_MCP_TOKEN, or bind to 127.0.0.1 (the default).',
    '',
  ].join('\n');
}
