import {
  registerCatalog,
  validateSpec,
  type ComponentSpec,
  type RegisteredCatalog,
} from "@tmorrow/cre8-wc/a2ui";
import { catalog as catalogJson } from "@/lib/catalog-index";

// Validation client for the canonical cre8-mcp service.
//
// The cre8-mcp HTTP API (packages/cre8-mcp `start:api`, default :3001) owns the
// authoritative A2UI validator via `POST /a2ui/validate`. Routing render_ui
// validation through it keeps the studio in lock-step with the published catalog
// rules instead of relying on a process-local copy that can drift.
//
// We stay resilient: if the service is unreachable we fall back to the in-process
// validator (same `validateSpec` + package catalog the MCP uses), so the app keeps
// working in dev/CI where the API isn't running. Set CRE8_MCP_VALIDATE=0 to force
// local-only validation.

const MCP_URL = (process.env.CRE8_MCP_URL ?? "http://localhost:3001").replace(/\/$/, "");
const MCP_ENABLED = process.env.CRE8_MCP_VALIDATE !== "0";
const TIMEOUT_MS = Number(process.env.CRE8_MCP_TIMEOUT_MS ?? 2000);

export type ValidationResult = { ok: true } | { ok: false; error: string };
export type ValidationOutcome = { result: ValidationResult; source: "mcp" | "local" };

let registered: RegisteredCatalog | null = null;
function localCatalog(): RegisteredCatalog {
  if (!registered) {
    registered = registerCatalog(
      catalogJson as unknown as Parameters<typeof registerCatalog>[0],
    );
  }
  return registered;
}

// Light circuit breaker: once the MCP looks down, stop probing it for a while so
// every render_ui call doesn't eat the connect timeout.
let mcpDownUntil = 0;
const COOLDOWN_MS = 30_000;

function nowMs(): number {
  return typeof performance !== "undefined" ? performance.now() : 0;
}

// Returns a result from the MCP, or null if the service can't be reached / gave an
// unusable response (caller falls back to local).
async function validateViaMcp(spec: unknown): Promise<ValidationResult | null> {
  const t = nowMs();
  if (t < mcpDownUntil) return null;
  try {
    const res = await fetch(`${MCP_URL}/a2ui/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spec }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    // 400 = bad request envelope (missing spec / bad JSON) — not a spec verdict.
    if (res.status === 400) return null;
    if (!res.ok) {
      mcpDownUntil = nowMs() + COOLDOWN_MS;
      return null;
    }
    const json = (await res.json()) as { ok?: unknown; error?: unknown };
    if (json.ok === true) return { ok: true };
    if (json.ok === false) {
      return { ok: false, error: typeof json.error === "string" ? json.error : "Invalid spec" };
    }
    return null;
  } catch {
    mcpDownUntil = nowMs() + COOLDOWN_MS;
    return null;
  }
}

function validateLocally(spec: ComponentSpec): ValidationResult {
  try {
    validateSpec(spec, localCatalog());
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// Validate a render_ui spec, preferring the canonical MCP and falling back to the
// in-process validator. Reports which source produced the verdict.
export async function validateA2uiSpec(spec: ComponentSpec): Promise<ValidationOutcome> {
  if (MCP_ENABLED) {
    const viaMcp = await validateViaMcp(spec);
    if (viaMcp) return { result: viaMcp, source: "mcp" };
  }
  return { result: validateLocally(spec), source: "local" };
}
