
# cre8-data-agent: Sandboxed Agent + Auth Proxy Design

**Date:** 2026-05-25
**Status:** Implemented and verified (see *Verification* below).

## Goal

Run `cre8-data-agent` in its own sandboxed container that holds **no secrets** and
**no source code**. All outbound traffic (LLM API + cre8-mcp) is funneled through a
single auth proxy that is the sole custodian of credentials and enforces an egress
allowlist. This mitigates OWASP LLM02 (Sensitive Information Disclosure) and LLM06
(Excessive Agency): a prompt-injected agent cannot exfiltrate a key it never holds,
nor reach any host but the two allowlisted upstreams.

## Topology

Four containers, three trust boundaries. (The design was written for three; the
`gateway` was added during verification — see *Ingress* below for why it is
required rather than optional.)

```
                  host: 127.0.0.1:8002
                            |
        +-------------------v---------+
        |  gateway (ingress, no keys)  |   networks: agent-net + frontend-net
        |  - nginx, one fixed upstream |   -- publishes the only host port
        |  - proxy_pass http://agent   |
        +-------------------+---------+
                            | agent-net
        +-------------------v---------+
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

The agent sits on an `internal: true` Docker network. Its only reachable peers
are the proxy (outbound) and the gateway (inbound); neither will carry traffic to
an address the agent chooses. It cannot reach the internet or cre8-mcp directly.
The agent must never be attached to any other network.

## Ingress: why a fourth container

The agent serves an HTTP API on :8002 that a browser on the host consumes. That
requirement collides with `internal: true`: Docker accepts a `ports:` mapping on
a container whose only network is internal, but connections to it are refused.
The published port simply does not work.

The tempting fix — attach the agent to a second, non-internal network — is the
one thing that must never be done. It was in fact done once (`frontend-net`, in
commit d6d2f60c) and silently voided the entire sandbox: a plain bridge network
carries NAT egress, so the agent could reach any host on the internet directly
and route around the proxy. Verified empirically: a container on a plain compose
bridge opens a socket to api.anthropic.com without trouble.

So ingress gets its own container. `gateway` (nginx-unprivileged) sits on
agent-net plus a non-internal frontend-net, publishes 127.0.0.1:8002, and
forwards to a single constant upstream, `http://agent:8002`. It holds no
secrets. The agent can reach it, but it will only ever forward to the agent, so
it is not an egress path. Its upstream must stay a literal: a `proxy_pass` built
from request data would let the agent choose its own destination and reopen the
hole. `tests/test_sandbox_topology.py` enforces that.

Note also that `enable_ip_masquerade=false` is *not* a substitute for a separate
container. On Docker Desktop the VM performs its own NAT, so the option has no
effect and egress survives — measured, not assumed.

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
- compose: four services; agent-net marked internal: true; secrets live in
  ./.env and are handed to services one variable at a time, so the agent gets
  none and cre8-mcp gets only the token it validates.

## Verification

Two layers, both executable — the invariants here are invisible in code review,
so neither is left as prose.

**Static, no Docker required.** `packages/cre8-data-agent/tests/test_sandbox_topology.py`
parses docker-compose.yml and fails if the agent gains a non-internal network,
if any service takes an `env_file`, if a secret reaches a service that does not
read it, if the agent shares a network with cre8-mcp, if anything but the
gateway publishes a port, or if the gateway upstream becomes request-derived.
This runs in CI and is what catches the `frontend-net` class of regression.

**Live, against a running stack.** `packages/cre8-data-agent/verify-sandbox.sh`
brings the stack up and asserts, 15 checks:

1. All four services build and report healthy.
2. From inside the agent: api.anthropic.com is unreachable, and so is cre8-mcp.
3. The proxy is reachable, and an authed `GET /mcp/components` succeeds —
   proving the proxy injected a bearer token the agent does not hold. The same
   request straight at cre8-mcp without a token is rejected.
4. The agent's env holds the sentinel, and `docker export` of the agent
   filesystem contains neither the real key nor the MCP token. (The grep runs on
   the host, so the secret is never piped into the container to look for it.)
5. Proxy logs contain no unredacted key.
6. GET/POST/DELETE to an unknown route prefix all return 403.
7. The host reaches the agent through the gateway on 127.0.0.1:8002.
8. A spoofed `Host` header does not steer the gateway's upstream.

Last run: 15/15 passing.

## Out of scope (YAGNI)

- mTLS between agent and proxy (Docker internal network is the boundary for now).
- Per-route rate limiting at the proxy (the agent's own slowapi limit covers inbound).
- Multi-tenant token rotation.
