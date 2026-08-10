
# cre8-data-agent: Sandboxed Agent + Auth Proxy Design

**Date:** 2026-05-25
**Status:** Approved, pending implementation

## Goal

Run `cre8-data-agent` in its own sandboxed container that holds **no secrets** and
**no source code**. All outbound traffic (LLM API + cre8-mcp) is funneled through a
single auth proxy that is the sole custodian of credentials and enforces an egress
allowlist. This mitigates OWASP LLM02 (Sensitive Information Disclosure) and LLM06
(Excessive Agency): a prompt-injected agent cannot exfiltrate a key it never holds,
nor reach any host but the two allowlisted upstreams.

## Topology

Three containers, two trust boundaries.

```
        +-----------------------------+
        |  agent  (untrusted zone)     |   network: agent-net (internal: true)
        |  - cre8_data_agent only      |   -- NO internet, NO source, NO secrets
        |  - ANTHROPIC_BASE_URL=       |
        |      http://proxy:8080/llm   |
        |  - CRE8_MCP_URL=             |
        |      http://proxy:8080/mcp   |
        |  - ANTHROPIC_API_KEY=sentinel|  (dummy; proxy overwrites)
        +--------------+--------------+
                       | agent-net (only route out)
        +--------------v--------------+
        |  proxy  (secrets custodian)  |   networks: agent-net + egress-net
        |  - holds real ANTHROPIC_API_KEY
        |  - holds CRE8_MCP_TOKEN       |
        |  - /llm/* -> api.anthropic.com|  (inject x-api-key, TLS)
        |  - /mcp/* -> cre8-mcp:3001    |  (inject Authorization: Bearer)
        |  - egress allowlist: those 2  |
        +--------------+--------------+
                       | egress-net
        +--------------v--------------+
        |  cre8-mcp (source zone)      |
        |  - StreamableHTTP transport  |
        |  - reads catalog-kg.json     |
        |  - requires Bearer token     |
        +-----------------------------+
```

The agent sits on an `internal: true` Docker network with the proxy as its only
reachable peer. It physically cannot reach the internet or cre8-mcp directly.

## Component 1: Auth Proxy (cre8-agent-proxy)

Small Starlette + httpx ASGI app, one container. Two route prefixes:

- `/llm/*`  -> `https://api.anthropic.com/*`   inject `x-api-key: <real key>`
- `/mcp/*`  -> `http://cre8-mcp:3001/*`         inject `Authorization: Bearer <svc token>`

Behaviors:
- Scrub then inject: delete all inbound auth headers (the agent's sentinel x-api-key),
  then inject the real credential from the proxy's own env. The agent's value never
  reaches upstream; the real value never reaches the agent.
- Streaming passthrough: Anthropic responses are SSE. Use httpx.stream() +
  StreamingResponse, forwarding chunks unbuffered, preserving text/event-stream.
- Egress allowlist: upstream chosen by route prefix only; unknown prefix -> 403.
- Secret redaction: request logging masks x-api-key / Authorization.
- Limits: capped request body, only the HTTP methods MCP/LLM need.

Secrets reach the proxy via an env file mounted to the proxy ONLY.

## Component 2: cre8-mcp HTTP transport

Three additive changes to packages/cre8-mcp (stdio mode preserved):

1. StreamableHTTP transport: new src/http.ts wraps the same Server instance in an
   Express app via StreamableHTTPServerTransport, listening on :3001. package.json
   gets a start:http script. index.ts (stdio) untouched.
2. Bearer token gate: Express middleware validates Authorization: Bearer <token>
   against CRE8_MCP_TOKEN before the MCP handler; 401 otherwise.
3. KG-backed handlers: repoint list_components, get_component, search_components to
   query catalog-kg.json (filter type==="component", traverse HAS_ENUM_PROP /
   HAS_SLOT edges). validate_a2ui_spec keeps using catalog.json's JSON Schema. Both
   files stay in the source zone (cre8-mcp), never in the agent.

## Component 3: Agent container

Changes to packages/cre8-data-agent:
- agent.py: switch cre8 MCP server from stdio to HTTP via CRE8_MCP_URL (proxy /mcp).
  Drop CRE8_MCP_DIR. Keep permission_mode="default", max_turns=10.
- tools.py: render_ui calls cre8-mcp validate_a2ui_spec over HTTP through the proxy
  instead of reading catalog.json. Remove local jsonschema path. describe_data /
  summarize_stats unchanged.
- env: ANTHROPIC_BASE_URL=http://proxy:8080/llm,
  ANTHROPIC_API_KEY=sentinel-not-a-real-key, CRE8_MCP_URL=http://proxy:8080/mcp.
  No real secret, no source mount.
- Dockerfile: drop jsonschema; image carries zero catalog/KG/source.
- compose: three services; agent-net marked internal: true; real secrets in a
  proxy-only env file.

## Verification

1. docker compose up --build resolves; all three services healthcheck green.
2. From inside the agent container: curl api.anthropic.com FAILS (no egress); a chat
   request SUCCEEDS (proves proxy injection).
3. Proxy logs show injected requests with the key masked.
4. A render_ui call round-trips validation through /mcp; SSE chat streams
   token-by-token.
5. Grep the agent image filesystem for the real key -> absent.

## Out of scope (YAGNI)

- mTLS between agent and proxy (Docker internal network is the boundary for now).
- Per-route rate limiting at the proxy (the agent's own slowapi limit covers inbound).
- Multi-tenant token rotation.
