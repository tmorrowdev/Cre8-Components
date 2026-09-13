#!/usr/bin/env bash
#
# Runs the Verification section of
# docs/plans/2026-05-25-agent-sandbox-proxy-design.md against a live stack.
#
#   ./verify-sandbox.sh          # bring the stack up, verify, leave it running
#   ./verify-sandbox.sh --down   # ...and tear it down afterwards
#
# The static half of these invariants is enforced without Docker by
# tests/test_sandbox_topology.py; this covers what only a running stack proves.
set -uo pipefail
cd "$(dirname "$0")"

PASS=0
FAIL=0
ok()   { printf '  \033[32mPASS\033[0m %s\n' "$1"; PASS=$((PASS + 1)); }
bad()  { printf '  \033[31mFAIL\033[0m %s\n' "$1"; FAIL=$((FAIL + 1)); }
step() { printf '\n\033[1m%s\033[0m\n' "$1"; }

[ -f .env ] || { echo "missing .env — cp .env.example .env and fill it in"; exit 1; }
# shellcheck disable=SC1091
set -a; . ./.env; set +a

# Run a snippet inside the agent container. Exit status is the assertion.
in_agent() { docker compose exec -T agent python -c "$1" >/dev/null 2>&1; }

step "1. Stack builds and every service reports healthy"
if docker compose up --build -d --wait; then
  ok "all four services healthy"
else
  bad "docker compose up --wait failed"
  docker compose ps
  exit 1
fi

step "2. The agent has no egress and no direct path to cre8-mcp"
if in_agent 'import socket; socket.setdefaulttimeout(5); socket.create_connection(("api.anthropic.com",443))'; then
  bad "agent reached api.anthropic.com directly — the sandbox is open"
else
  ok "agent cannot reach api.anthropic.com"
fi
if in_agent 'import socket; socket.setdefaulttimeout(5); socket.create_connection(("cre8-mcp",3001))'; then
  bad "agent reached cre8-mcp directly, bypassing bearer injection"
else
  ok "agent cannot reach cre8-mcp directly"
fi

step "3. The proxy is the agent's only route out, and it injects credentials"
if in_agent 'import urllib.request; urllib.request.urlopen("http://proxy:8080/health",timeout=10)'; then
  ok "agent reaches the proxy"
else
  bad "agent cannot reach the proxy"
fi
# /components is behind cre8-mcp's bearer gate. The agent holds no token, so a
# 200 here proves the proxy injected the real one on its behalf.
if in_agent 'import urllib.request; r=urllib.request.urlopen("http://proxy:8080/mcp/components",timeout=20); assert r.status==200'; then
  ok "authed /mcp round-trip succeeds (proxy injected the bearer token)"
else
  bad "authed /mcp round-trip failed"
fi
# Same endpoint straight at cre8-mcp from the proxy's network, without a token.
if docker compose exec -T proxy python -c \
    'import urllib.request,sys; urllib.request.urlopen("http://cre8-mcp:3001/components",timeout=10)' >/dev/null 2>&1; then
  bad "cre8-mcp served an unauthenticated request — bearer gate is off"
else
  ok "cre8-mcp rejects unauthenticated requests"
fi

step "4. The agent holds no real secret"
AGENT_ENV_KEY=$(docker compose exec -T agent printenv ANTHROPIC_API_KEY 2>/dev/null | tr -d '\r\n')
if [ "$AGENT_ENV_KEY" = "sentinel-not-a-real-key" ]; then
  ok "agent env carries the sentinel key"
else
  bad "agent ANTHROPIC_API_KEY is '$AGENT_ENV_KEY', expected the sentinel"
fi
# Grep the container filesystem from the HOST, so the real key is never piped
# into the container just to look for it.
CID=$(docker compose ps -q agent)
if [ -n "${ANTHROPIC_API_KEY:-}" ] && \
   docker export "$CID" 2>/dev/null | grep -a -q -F "$ANTHROPIC_API_KEY"; then
  bad "the real ANTHROPIC_API_KEY is present in the agent filesystem"
else
  ok "real key absent from the agent filesystem"
fi
if [ -n "${CRE8_MCP_TOKEN:-}" ] && \
   docker export "$CID" 2>/dev/null | grep -a -q -F "$CRE8_MCP_TOKEN"; then
  bad "CRE8_MCP_TOKEN is present in the agent filesystem"
else
  ok "CRE8_MCP_TOKEN absent from the agent filesystem"
fi

step "5. Proxy logs never print a live key"
LOGS=$(docker compose logs proxy 2>/dev/null)
if [ -n "${ANTHROPIC_API_KEY:-}" ] && printf '%s' "$LOGS" | grep -a -q -F "$ANTHROPIC_API_KEY"; then
  bad "proxy logs contain the unredacted key"
else
  ok "proxy logs contain no unredacted key"
fi

step "6. Unknown route prefixes are refused"
for m in GET POST DELETE; do
  CODE=$(docker compose exec -T agent python -c "
import urllib.request,urllib.error
r=urllib.request.Request('http://proxy:8080/evil.example.com/exfil',method='$m',data=b'{}')
try:
    print(urllib.request.urlopen(r,timeout=10).status)
except urllib.error.HTTPError as e:
    print(e.code)
" 2>/dev/null | tr -d '\r\n')
  [ "$CODE" = "403" ] && ok "$m to an unknown prefix -> 403" || bad "$m to an unknown prefix -> $CODE (want 403)"
done

step "7. The host reaches the agent through the gateway, not around the sandbox"
CODE=$(curl -s -m 15 -o /dev/null -w '%{http_code}' http://127.0.0.1:8002/health || echo 000)
if [ "$CODE" = "200" ]; then
  ok "host -> gateway -> agent works (HTTP 200 on 127.0.0.1:8002)"
else
  bad "host cannot reach the agent through the gateway (HTTP $CODE)"
fi

step "8. The gateway is not an egress hole"
# The gateway is the one container the agent can reach that also has an outside
# interface. Its upstream must stay constant no matter what the request says.
if in_agent 'import urllib.request
r=urllib.request.Request("http://gateway:8002/health",headers={"Host":"api.anthropic.com"})
b=urllib.request.urlopen(r,timeout=10).read()
assert b"ok" in b.lower(), b'; then
  ok "gateway ignores a spoofed Host and still serves the agent"
else
  bad "gateway upstream was steered by the request — possible egress hole"
fi

[ "${1:-}" = "--down" ] && { step "Tearing down"; docker compose down -v >/dev/null 2>&1; }

printf '\n\033[1m%d passed, %d failed\033[0m\n' "$PASS" "$FAIL"
[ "$FAIL" -eq 0 ] || exit 1
