# Secure Agentic Backend Agent — Design Document

**Date:** 2026-02-08
**Status:** Draft
**Context:** Customer-facing agent connecting to internal REST APIs, databases, microservices mesh, and messaging systems. Built with Claude Agent SDK (Python). Agent inherits end-user permissions via OAuth/JWT.

---

## 1. Threat Model

This agent sits between two untrusted boundaries:

| Boundary | Threat | Impact |
|----------|--------|--------|
| User input | Prompt injection, privilege escalation, data exfiltration | Agent performs unauthorized actions or leaks data |
| Internal APIs | Over-fetching, cross-tenant access, bulk extraction | Exposure of enterprise data beyond user's scope |
| Agent behavior | Hallucinated tool calls, runaway loops, unprompted mutations | Unintended side effects on production data |

**Design principle:** Defense in depth. Five independent layers, each sufficient to block a class of attack even if adjacent layers fail.

---

## 2. Architecture

```
End User (untrusted input)
    │
    ▼
┌──────────────────────────────────────────┐
│ Layer 1: INPUT SANITIZATION              │
│  - JWT validation (RS256, audience check)│
│  - Prompt injection heuristics           │
│  - Input length limits (4000 chars)      │
├──────────────────────────────────────────┤
│ Layer 2: AGENT ORCHESTRATOR              │
│  - System prompt with hard behavioral    │
│    rules (no unprompted actions, no raw   │
│    output, confirm destructive ops)      │
│  - Zero native tools (no Bash/Write/Edit)│
│  - Read/write subagent separation        │
│  - Model tiering (Haiku reads, Sonnet    │
│    writes)                               │
│  - max_turns=20 loop cap                 │
├──────────────────────────────────────────┤
│ Layer 3: PERMISSION GATEWAY              │
│  - can_use_tool handler on every call    │
│  - Role-based tool gating from JWT claims│
│  - Mandatory org_id injection (overwrites│
│    agent-provided value)                 │
│  - Per-user per-tool rate limiting       │
│  - Forbidden field stripping             │
├──────────────────────────────────────────┤
│ Layer 4: API PROXY (Custom MCP Tools)    │
│  - Closed enum resource types            │
│  - Regex-validated IDs (no path traversal│
│  - additionalProperties: false on filters│
│  - Response redaction (allowlist fields)  │
│  - Hard result caps (max 25 items)       │
│  - 10-second request timeout             │
│  - User's bearer token forwarded         │
│  - Mandatory "reason" on write ops       │
├──────────────────────────────────────────┤
│ Layer 5: AUDIT & OBSERVABILITY           │
│  - PreToolUse/PostToolUse hooks          │
│  - Input hashing (not logging) for PII   │
│  - Session/user/org correlation          │
│  - Duration tracking per tool call       │
│  - Denial logging at high severity       │
│  - Sink-agnostic (CloudWatch/Datadog/    │
│    Splunk/SIEM)                          │
└──────────────────────────────────────────┘
    │
    ▼
Internal APIs / Databases / Services
```

---

## 3. Layer Details

### 3.1 Input Sanitization

```python
class InputSanitizer:
    INJECTION_PATTERNS = [
        r"ignore\s+(previous|above|all)\s+instructions",
        r"you\s+are\s+now\s+a",
        r"system\s*:\s*",
        r"<\s*system\s*>",
        r"pretend\s+(you|that|to)",
        r"override\s+(your|the)\s+(instructions|rules|prompt)",
    ]
```

- Decodes and validates JWT before anything reaches Claude
- Scores prompts against injection patterns; blocks at threshold >= 2
- Caps input at 4000 characters
- Returns `SanitizedRequest` with user identity, roles, org, and bearer token

### 3.2 Agent Orchestrator

- **System prompt** contains hard rules: no unprompted actions, no raw API output, confirm destructive ops, no internal ID leakage
- **No native tools** — orchestrator only gets `Task` to dispatch subagents
- **Subagent isolation:**
  - `data-reader`: `get_resource`, `search` tools only, Haiku model
  - `data-writer`: `update_resource`, `create_resource` tools only, Sonnet model
- Neither subagent can access the other's tools

### 3.3 Permission Gateway (`can_use_tool`)

The most critical layer. Enforces five checks on every tool invocation:

1. **Allowlist check** — tool must be registered
2. **Role check** — user JWT must contain required role (`read` or `write`)
3. **Org isolation** — cross-org access is denied with `interrupt=True`
4. **Org injection** — `org_id` is overwritten from JWT (agent cannot control scoping)
5. **Rate limiting** — per-user per-tool sliding window (reads: 30/min, writes: 5/min)
6. **Field stripping** — removes `admin_override`, `bypass_validation`, `_internal_flags`

### 3.4 API Proxy (Custom MCP Tools)

Four tools with locked-down JSON schemas:

| Tool | Method | Schema Constraints |
|------|--------|--------------------|
| `get_resource` | GET | `resource_type` enum, regex ID `^[a-zA-Z0-9-]{1,64}$` |
| `search` | GET | `additionalProperties: false` on filters, `limit` max 25 |
| `update_resource` | PATCH | Mutable fields enum (`status`, `priority`), mandatory `reason` |
| `create_resource` | POST | Typed schema per resource type |

All responses pass through `_redact_response()` which strips internal fields (`db_shard`, `encryption_key_ref`, `audit_trail`, `_metadata`) using either an allowlist (preferred) or denylist.

### 3.5 Audit & Observability

- **Input hashing** — SHA-256 of tool inputs for correlation without PII storage
- **Sanitized summaries** — `"order/abc-123"` instead of raw input
- **Duration tracking** — PreToolUse starts timer, PostToolUse records elapsed ms
- **Session correlation** — every event tagged with `session_id`, `user_id`, `org_id`

**Recommended alerts:**

| Signal | Threshold | Action |
|--------|-----------|--------|
| Permission denials per session | > 3 | Flag for review, possible injection |
| Write calls per minute per user | > 5 | Rate limit enforced, alert on repeated hits |
| Cross-org deny events | Any | Immediate security alert |
| Tool duration spike | > 3x baseline | Backend health investigation |

---

## 4. Data Flow Example

```
POST /agent/chat {"prompt": "Cancel my order abc-123"}
Authorization: Bearer <user-jwt>

1. InputSanitizer → validate JWT, injection score 0, extract user_id/org_id/roles
2. AgentOrchestrator → Claude receives system prompt + user prompt
3. Claude dispatches data-reader subagent → get_resource(order, abc-123)
   a. PreToolUse hook → audit log
   b. can_use_tool → role check (read ✓), inject org_id, rate limit check
   c. APIProxy → GET /v1/orgs/acme/orders/abc-123 with user's bearer token
   d. _redact_response → strip internal fields
   e. PostToolUse hook → audit log (180ms)
4. Claude responds: "Order abc-123 is $49.99, shipped. Confirm cancel?"
5. User confirms
6. Claude dispatches data-writer subagent → update_resource(order, abc-123, status, cancelled)
   a. PreToolUse hook → audit log
   b. can_use_tool → role check (write ✓), inject org_id
   c. APIProxy → PATCH with reason="user requested cancellation"
   d. PostToolUse hook → audit log (220ms)
7. Claude responds: "Your order abc-123 has been cancelled."
```

---

## 5. Deployment Considerations

### Container Isolation
- Run the agent service in an isolated container with no filesystem access
- Network policy: only allow egress to internal API gateway, Claude API
- No secrets in environment — use a secrets manager (AWS Secrets Manager, Vault)

### JWT Key Management
- Use RS256 with public key validation (no shared secrets)
- Rotate keys via JWKS endpoint
- Short-lived tokens (15-minute expiry recommended)

### Scaling
- Agent sessions are stateless (all state is in the Claude API conversation)
- Horizontally scale behind a load balancer
- Rate limiting should move to Redis for multi-instance deployments

### Testing
- **Unit tests** for each layer independently (sanitizer, gateway, proxy, audit)
- **Integration tests** with mock internal APIs
- **Red team testing** with adversarial prompts targeting each layer
- **Chaos testing** — what happens when internal APIs are down, slow, or return garbage

---

## 6. What This Design Does NOT Solve

| Gap | Mitigation |
|-----|------------|
| Semantic prompt injection (instructions hidden in API response data) | Response redaction reduces surface area; monitor for unusual agent behavior |
| Model-level jailbreaks | Keep SDK updated; layer system prompt rules with tool restrictions |
| Insider threat (malicious developer modifying tools) | Code review, signed deployments, audit of tool schema changes |
| Token theft (stolen JWT used to invoke agent) | Standard JWT security: short expiry, refresh rotation, IP binding |
| Denial of service via expensive agent loops | max_turns cap + per-user session rate limiting at the HTTP layer |

---

## 7. Implementation Sequence

1. **API Proxy tools** — define schemas, build redaction, test against real APIs
2. **Permission Gateway** — implement `can_use_tool`, wire up role checks and org injection
3. **Input Sanitizer** — JWT validation, injection patterns
4. **Agent Orchestrator** — system prompt, subagent definitions, model tiering
5. **Audit hooks** — logging, alerting, dashboard
6. **FastAPI entrypoint** — streaming response handler, error mapping
7. **Red team** — adversarial testing across all layers
