# cre8-stack Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `/stack` route to `cre8-studio` — a split-panel chat + live iframe view where the user converses with an AI agent that builds, scaffolds, and hot-reloads a full Next.js app in real time.

**Architecture:** New `/stack` Next.js route with a `StackBuilder` component (40% chat | 60% iframe). A new `/api/stack` FastAPI endpoint in `cre8-apps` manages sessions (in-memory), runs a Gemini-powered OrchestratorAgent to decide which sub-agents to invoke per turn, scaffolds the app once on first build, then writes file changes directly so Next.js HMR refreshes the iframe automatically.

**Tech Stack:** Next.js 16, React 19, FastAPI, Google ADK, `google.genai` (direct Gemini call for orchestration), SSE streaming

---

### Task 1: OrchestratorAgent (Python module)

**Files:**
- Create: `packages/cre8-apps/cre8_apps/agents/orchestrator.py`

**Step 1: Create the module**

```python
# packages/cre8-apps/cre8_apps/agents/orchestrator.py
import json
import os
from google import genai

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-pro")

VALID_STEPS = ["UIDesignerAgent", "DBProvisionerAgent", "CodeGeneratorAgent"]

SYSTEM = """You are a routing agent for a full-stack app builder pipeline.
Given conversation history and current app state, decide which agents to run for the user's latest request.

Output ONLY valid JSON (no markdown, no explanation):
{"steps": [...], "reason": "..."}

Valid steps (always in this order if included):
- "UIDesignerAgent" - redesigns the component layout/structure
- "DBProvisionerAgent" - changes the database schema
- "CodeGeneratorAgent" - updates page.tsx logic, wiring, or style

Rules:
- Pure question with no change request → {"steps": [], "reason": "question only"}
- Logic/text/color change only → {"steps": ["CodeGeneratorAgent"], "reason": "..."}
- Visual layout change → {"steps": ["UIDesignerAgent", "CodeGeneratorAgent"], "reason": "..."}
- New data entity or schema change → {"steps": ["DBProvisionerAgent", "CodeGeneratorAgent"], "reason": "..."}
- Major redesign or unclear → {"steps": ["UIDesignerAgent", "DBProvisionerAgent", "CodeGeneratorAgent"], "reason": "..."}
"""


def decide_steps(
    history: list[dict],
    current_page_tsx: str,
    current_tables: list[str],
) -> list[str]:
    """Call Gemini directly to decide which pipeline steps to run."""
    client = genai.Client()

    history_text = "\n".join(
        f"{m['role'].upper()}: {m['text']}" for m in history
    )
    tables_text = ", ".join(current_tables) if current_tables else "none"

    prompt = f"""Conversation history:
{history_text}

Current state:
- Tables: {tables_text}
- page.tsx (first 800 chars): {current_page_tsx[:800]}

Decide which agents to run for the user's latest message."""

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config={"system_instruction": SYSTEM},
    )

    try:
        plan = json.loads(response.text.strip())
        steps = [s for s in plan.get("steps", VALID_STEPS) if s in VALID_STEPS]
        # Enforce ordering
        return [s for s in VALID_STEPS if s in steps]
    except (json.JSONDecodeError, AttributeError):
        # Fallback: run everything
        return list(VALID_STEPS)
```

**Step 2: Smoke-test from the cre8-apps venv**

```bash
cd packages/cre8-apps
.venv/bin/python -c "
from cre8_apps.agents.orchestrator import decide_steps
result = decide_steps(
    [{'role': 'user', 'text': 'build a todo app'}, {'role': 'assistant', 'text': 'Built it.'}, {'role': 'user', 'text': 'make the button blue'}],
    'export default function Page() {}',
    ['todos']
)
print(result)
"
```
Expected: `['CodeGeneratorAgent']`

**Step 3: Commit**

```bash
git add packages/cre8-apps/cre8_apps/agents/orchestrator.py
git commit -m "feat(cre8-apps): add OrchestratorAgent for dynamic pipeline routing"
```

---

### Task 2: Session store + port manager in server.py

**Files:**
- Modify: `packages/cre8-apps/server.py` (add after imports, before `app = FastAPI()`)

**Step 1: Add session state after the existing imports block**

Find the line `app = FastAPI()` in `server.py`. Insert this block directly above it:

```python
# ── Session store ──────────────────────────────────────────────────────────
import subprocess
import uuid
from dataclasses import dataclass, field

@dataclass
class StackSession:
    session_id: str
    out_dir: Path
    port: int
    app_process: subprocess.Popen | None = None
    ui_design: str = ""
    db_provision: str = ""
    page_tsx: str = ""
    migration_sql: str = ""
    history: list[dict] = field(default_factory=list)

_sessions: dict[str, StackSession] = {}
_next_port = 3001

def _alloc_port() -> int:
    global _next_port
    port = _next_port
    _next_port += 1
    return port

def _new_session() -> StackSession:
    sid = str(uuid.uuid4())
    port = _alloc_port()
    out_dir = Path(__file__).parent / "output" / f"stack-{port}"
    session = StackSession(session_id=sid, out_dir=out_dir, port=port)
    _sessions[sid] = session
    return session
# ───────────────────────────────────────────────────────────────────────────
```

**Step 2: Verify server still imports cleanly**

```bash
cd packages/cre8-apps
.venv/bin/python -c "import server; print('OK')"
```
Expected: `OK`

**Step 3: Commit**

```bash
git add packages/cre8-apps/server.py
git commit -m "feat(cre8-apps): add session store and port manager to server"
```

---

### Task 3: /api/stack — first build (full pipeline + scaffold + launch)

**Files:**
- Modify: `packages/cre8-apps/server.py`
- Modify: `packages/cre8-apps/main.py` (extract `_scaffold_nextjs_app` for reuse — it already exists, just import it)

**Step 1: Add `StackRequest` model near `BuildRequest` in server.py**

Find `class BuildRequest(BaseModel):` and add below it:

```python
class StackRequest(BaseModel):
    prompt: str
    session_id: str | None = None
    history: list[dict] = []
```

**Step 2: Add `_launch_dev_server` helper in server.py**

Add this function after `_new_session`:

```python
def _launch_dev_server(session: StackSession) -> None:
    """Start npm run dev for the session's scaffolded app (non-blocking)."""
    session.app_process = subprocess.Popen(
        ["npm", "run", "dev", "--", "--port", str(session.port)],
        cwd=session.out_dir,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
```

**Step 3: Import scaffold helper**

At the top of `server.py`, add after the existing imports:

```python
import sys
sys.path.insert(0, str(Path(__file__).parent))
from main import _scaffold_nextjs_app, _extract_block as _extract_block_main, _strip_fences
```

**Step 4: Add `_stream_stack_first` async generator in server.py**

Add this function after `_stream_pipeline`:

```python
async def _stream_stack_first(prompt: str, session: StackSession) -> AsyncIterator[str]:
    """Run full pipeline for a new session, scaffold app, start dev server."""
    def sse(event: str, data: dict) -> str:
        return f"event: {event}\ndata: {json.dumps(data)}\n\n"

    session_service = InMemorySessionService()
    adk_session = await session_service.create_session(
        state={}, app_name="cre8-apps", user_id="web"
    )
    runner = Runner(
        app_name="cre8-apps",
        agent=root_agent,
        session_service=session_service,
    )
    message = genai_types.Content(
        role="user", parts=[genai_types.Part(text=prompt)]
    )
    current_agent = ""

    try:
        async for event in runner.run_async(
            session_id=adk_session.id,
            user_id=adk_session.user_id,
            new_message=message,
        ):
            author = getattr(event, "author", "") or ""
            if author and author != current_agent:
                current_agent = author
                yield sse("agent_start", {"agent": author})

            if event.content:
                for part in event.content.parts or []:
                    if hasattr(part, "text") and part.text:
                        yield sse("text", {"delta": part.text, "agent": author})

            state_delta: dict = {}
            if event.actions and hasattr(event.actions, "state_delta"):
                state_delta = event.actions.state_delta or {}

            if "ui_design" in state_delta:
                session.ui_design = state_delta["ui_design"]
                html = _extract_block(session.ui_design, "COMPONENT_CODE")
                yield sse("ui_ready", {"html": html})

            if "db_provision" in state_delta:
                session.db_provision = state_delta["db_provision"]
                migration = _extract_block(session.db_provision, "MIGRATION_SQL")
                session.migration_sql = migration
                yield sse("db_schema", {"migration": migration})

            if "generated_app" in state_delta:
                raw = state_delta["generated_app"]
                session.page_tsx = _extract_block_main(raw, "PAGE_TSX")
                env_vars = _extract_block_main(raw, "ENV_VARS")
                supabase_types = _extract_block(session.db_provision, "SUPABASE_TYPES") if session.db_provision else ""
                yield sse("code_ready", {"page_tsx": session.page_tsx})

                # Scaffold and launch
                await asyncio.to_thread(
                    _scaffold_nextjs_app,
                    session.out_dir,
                    session.page_tsx,
                    session.migration_sql,
                    env_vars,
                    supabase_types,
                )
                _launch_dev_server(session)
                # Give dev server 4s to start
                await asyncio.sleep(4)
                yield sse("app_ready", {
                    "session_id": session.session_id,
                    "url": f"http://localhost:{session.port}",
                })

        yield sse("done", {})

    except Exception as e:
        yield sse("error", {"message": str(e)})
```

**Step 5: Add the `/api/stack` route**

Add after the existing `/api/build` route:

```python
@app.options("/api/stack")
async def stack_preflight() -> dict:
    return {}


@app.post("/api/stack")
async def stack(req: StackRequest) -> StreamingResponse:
    if req.session_id and req.session_id in _sessions:
        session = _sessions[req.session_id]
        session.history.append({"role": "user", "text": req.prompt})
        gen = _stream_stack_update(req.prompt, session)
    else:
        session = _new_session()
        session.history.append({"role": "user", "text": req.prompt})
        gen = _stream_stack_first(req.prompt, session)

    return StreamingResponse(
        gen,
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
```

Note: `_stream_stack_update` is defined in Task 4.

**Step 6: Verify server starts**

```bash
cd packages/cre8-apps
.venv/bin/uvicorn server:app --port 8001 --reload &
sleep 2
curl -s http://localhost:8001/health
kill %1
```
Expected: `{"status":"ok"}`

**Step 7: Commit**

```bash
git add packages/cre8-apps/server.py
git commit -m "feat(cre8-apps): add /api/stack first-build endpoint with scaffold + dev server"
```

---

### Task 4: /api/stack — subsequent turns (orchestrated updates)

**Files:**
- Modify: `packages/cre8-apps/server.py`

**Step 1: Import orchestrator at top of server.py**

Add to the imports section:

```python
from cre8_apps.agents.orchestrator import decide_steps
from cre8_apps.agents.ui_designer import build_ui_designer
from cre8_apps.agents.db_provisioner import build_db_provisioner
from cre8_apps.agents.code_generator import build_code_generator
```

**Step 2: Add `_run_agents` helper**

Add after `_stream_stack_first`:

```python
async def _run_agents(steps: list[str], initial_state: dict) -> tuple[str, str, str]:
    """Run a dynamic subset of agents; return (ui_design, db_provision, page_tsx)."""
    from google.adk.agents import SequentialAgent

    agent_builders = {
        "UIDesignerAgent": build_ui_designer,
        "DBProvisionerAgent": build_db_provisioner,
        "CodeGeneratorAgent": build_code_generator,
    }
    sub_agents = [agent_builders[s]() for s in steps]
    pipeline = SequentialAgent(name="DynamicPipeline", sub_agents=sub_agents)

    session_service = InMemorySessionService()
    adk_session = await session_service.create_session(
        state=initial_state, app_name="cre8-apps", user_id="web"
    )
    runner = Runner(app_name="cre8-apps", agent=pipeline, session_service=session_service)

    last_prompt = initial_state.get("_user_prompt", "")
    message = genai_types.Content(role="user", parts=[genai_types.Part(text=last_prompt)])

    ui_design = initial_state.get("ui_design", "")
    db_provision = initial_state.get("db_provision", "")
    page_tsx = ""

    async for event in runner.run_async(
        session_id=adk_session.id, user_id=adk_session.user_id, new_message=message
    ):
        state_delta: dict = {}
        if event.actions and hasattr(event.actions, "state_delta"):
            state_delta = event.actions.state_delta or {}
        if "ui_design" in state_delta:
            ui_design = state_delta["ui_design"]
        if "db_provision" in state_delta:
            db_provision = state_delta["db_provision"]
        if "generated_app" in state_delta:
            page_tsx = _extract_block_main(state_delta["generated_app"], "PAGE_TSX")

    return ui_design, db_provision, page_tsx
```

**Step 3: Add `_stream_stack_update` async generator**

Add after `_run_agents`:

```python
async def _stream_stack_update(prompt: str, session: StackSession) -> AsyncIterator[str]:
    def sse(event: str, data: dict) -> str:
        return f"event: {event}\ndata: {json.dumps(data)}\n\n"

    try:
        # Parse current tables from migration SQL (simple heuristic)
        import re as _re
        tables = _re.findall(r"CREATE TABLE(?:\s+IF NOT EXISTS)?\s+(\w+)", session.migration_sql)

        # Ask orchestrator which steps to run
        steps = await asyncio.to_thread(
            decide_steps, session.history, session.page_tsx, tables
        )

        if not steps:
            # Question-only turn
            yield sse("text", {"delta": "No changes needed — that's a question about the existing app.", "agent": "Orchestrator"})
            yield sse("done", {})
            session.history.append({"role": "assistant", "text": "No changes needed."})
            return

        yield sse("agent_start", {"agent": f"Orchestrator → {', '.join(steps)}"})

        initial_state = {
            "ui_design": session.ui_design,
            "db_provision": session.db_provision,
            "_user_prompt": prompt,
        }

        ui_design, db_provision, page_tsx = await _run_agents(steps, initial_state)

        if ui_design:
            session.ui_design = ui_design
        if db_provision:
            session.db_provision = db_provision
        if page_tsx:
            session.page_tsx = page_tsx
            # Write file — HMR picks it up
            page_file = session.out_dir / "app" / "page.tsx"
            page_file.write_text(page_tsx)
            yield sse("app_updated", {"url": f"http://localhost:{session.port}"})

        session.history.append({"role": "assistant", "text": f"Updated: {', '.join(steps)}"})
        yield sse("done", {})

    except Exception as e:
        yield sse("error", {"message": str(e)})
```

**Step 4: Verify no import errors**

```bash
cd packages/cre8-apps
.venv/bin/python -c "import server; print('OK')"
```
Expected: `OK`

**Step 5: Commit**

```bash
git add packages/cre8-apps/server.py
git commit -m "feat(cre8-apps): add orchestrated update flow for /api/stack subsequent turns"
```

---

### Task 5: StackBuilder React component

**Files:**
- Create: `packages/cre8-studio/src/components/stack-builder.tsx`

**Step 1: Create the component**

```tsx
// packages/cre8-studio/src/components/stack-builder.tsx
"use client";

import { useCallback, useRef, useState } from "react";

const BUILDER_URL = process.env.NEXT_PUBLIC_CRE8_APPS_URL ?? "http://localhost:8001";

type Phase = "idle" | "running" | "live" | "updating" | "error";
type Message = { role: "user" | "assistant"; text: string };

export default function StackBuilder() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [appUrl, setAppUrl] = useState<string | null>(null);
  const [statusText, setStatusText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const appendAssistantText = useCallback((delta: string) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === "assistant") {
        return [...prev.slice(0, -1), { role: "assistant", text: last.text + delta }];
      }
      return [...prev, { role: "assistant", text: delta }];
    });
  }, []);

  const send = useCallback(async () => {
    const prompt = input.trim();
    if (!prompt || phase === "running" || phase === "updating") return;

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setInput("");
    setPhase(sessionId ? "updating" : "running");
    setErrorMsg("");
    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${BUILDER_URL}/api/stack`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, session_id: sessionId, history: messages }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n\n")) !== -1) {
          const frame = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          let event = "message";
          let dataStr = "";
          for (const line of frame.split("\n")) {
            if (line.startsWith("event: ")) event = line.slice(7).trim();
            else if (line.startsWith("data: ")) dataStr += line.slice(6);
          }
          if (!dataStr) continue;

          let data: Record<string, unknown>;
          try { data = JSON.parse(dataStr); } catch { continue; }

          switch (event) {
            case "agent_start":
              setStatusText(String(data.agent ?? ""));
              break;
            case "text":
              appendAssistantText(String(data.delta ?? ""));
              break;
            case "app_ready":
              setSessionId(String(data.session_id));
              setAppUrl(String(data.url));
              setPhase("live");
              setStatusText("Live");
              break;
            case "app_updated":
              setPhase("live");
              setStatusText("Updated");
              break;
            case "done":
              if (phase !== "live") setPhase("live");
              break;
            case "error":
              setErrorMsg(String(data.message ?? "Unknown error"));
              setPhase("error");
              break;
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setErrorMsg(err instanceof Error ? err.message : String(err));
        setPhase("error");
      }
    }
  }, [input, phase, sessionId, messages, appendAssistantText]);

  const busy = phase === "running" || phase === "updating";

  return (
    <div className="stack-layout">
      {/* Chat panel */}
      <div className="stack-chat">
        <div className="stack-messages">
          {messages.map((m, i) => (
            <div key={i} className={`stack-message stack-message--${m.role}`}>
              <span className="stack-message-role">{m.role === "user" ? "You" : "AI"}</span>
              <p className="stack-message-text">{m.text}</p>
            </div>
          ))}
          {phase === "error" && (
            <div className="stack-message stack-message--error">
              <p className="stack-message-text">{errorMsg}</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {statusText && (
          <div className="stack-status">
            {busy && <span className="stack-spinner" />}
            {statusText}
          </div>
        )}

        <form
          className="stack-composer"
          onSubmit={(e) => { e.preventDefault(); send(); }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
            }}
            placeholder={sessionId ? "Describe a change…" : "Describe the app you want to build…"}
            disabled={busy}
            rows={2}
          />
          <button type="submit" disabled={busy || !input.trim()}>
            {busy ? "…" : sessionId ? "Update" : "Build"}
          </button>
        </form>
      </div>

      {/* Preview panel */}
      <div className="stack-preview">
        {!appUrl && (
          <div className="stack-preview-placeholder">
            {phase === "running" ? "Building your app…" : "Describe an app to get started"}
          </div>
        )}
        {appUrl && (
          <iframe
            src={appUrl}
            className="stack-iframe"
            title="Live app preview"
            allow="same-origin"
          />
        )}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add packages/cre8-studio/src/components/stack-builder.tsx
git commit -m "feat(cre8-studio): add StackBuilder component with chat + iframe preview"
```

---

### Task 6: /stack route and nav link

**Files:**
- Create: `packages/cre8-studio/src/app/stack/page.tsx`
- Modify: `packages/cre8-studio/src/app/page.tsx` (add nav link)
- Modify: `packages/cre8-studio/src/app/build/page.tsx` (add nav link)

**Step 1: Create the route**

```tsx
// packages/cre8-studio/src/app/stack/page.tsx
import Link from "next/link";
import StackBuilder from "@/components/stack-builder";

export default function StackPage() {
  return (
    <main className="app app--fullbleed">
      <header className="header">
        <h1>cre8 stack</h1>
        <span className="subtitle">chat · build · preview — full stack in one view</span>
        <Link href="/" className="header-nav-link">← Studio</Link>
      </header>
      <StackBuilder />
    </main>
  );
}
```

**Step 2: Add nav link to home page**

In `packages/cre8-studio/src/app/page.tsx`, find:
```tsx
<Link href="/build" className="header-nav-link">App Builder →</Link>
```
Replace with:
```tsx
<Link href="/build" className="header-nav-link">App Builder →</Link>
<Link href="/stack" className="header-nav-link">Stack →</Link>
```

**Step 3: Add nav link to build page**

In `packages/cre8-studio/src/app/build/page.tsx`, find:
```tsx
<Link href="/" className="header-nav-link">← Studio</Link>
```
Replace with:
```tsx
<Link href="/" className="header-nav-link">← Studio</Link>
<Link href="/stack" className="header-nav-link">Stack →</Link>
```

**Step 4: Commit**

```bash
git add packages/cre8-studio/src/app/stack/page.tsx packages/cre8-studio/src/app/page.tsx packages/cre8-studio/src/app/build/page.tsx
git commit -m "feat(cre8-studio): add /stack route with nav links"
```

---

### Task 7: CSS styles for stack layout

**Files:**
- Modify: `packages/cre8-studio/src/app/globals.css`

**Step 1: Append styles to the end of globals.css**

```css
/* ── Stack layout ────────────────────────────────────────────────────────── */
.app--fullbleed {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.stack-layout {
  display: grid;
  grid-template-columns: 40% 60%;
  flex: 1;
  overflow: hidden;
  border-top: 1px solid var(--cre8-color-border-default);
}

.stack-chat {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--cre8-color-border-default);
  overflow: hidden;
}

.stack-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stack-message {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 90%;
}

.stack-message--user {
  align-self: flex-end;
  align-items: flex-end;
}

.stack-message--assistant {
  align-self: flex-start;
}

.stack-message--error {
  align-self: flex-start;
  color: var(--cre8-color-status-error-default, #d32f2f);
}

.stack-message-role {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  opacity: 0.55;
}

.stack-message-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  background: var(--cre8-color-bg-subtle);
  padding: 8px 12px;
  border-radius: 8px;
  white-space: pre-wrap;
}

.stack-message--user .stack-message-text {
  background: var(--cre8-color-action-primary-default, #1976d2);
  color: #fff;
}

.stack-status {
  padding: 6px 16px;
  font-size: 12px;
  opacity: 0.6;
  border-top: 1px solid var(--cre8-color-border-default);
  display: flex;
  align-items: center;
  gap: 6px;
}

.stack-spinner {
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.stack-composer {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--cre8-color-border-default);
}

.stack-composer textarea {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid var(--cre8-color-border-default);
  border-radius: 6px;
  background: var(--cre8-color-bg-default);
  color: var(--cre8-color-content-default);
  font: inherit;
  font-size: 13px;
  resize: none;
}

.stack-composer button {
  padding: 8px 16px;
  background: var(--cre8-color-action-primary-default, #1976d2);
  color: #fff;
  border: none;
  border-radius: 6px;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  align-self: flex-end;
}

.stack-composer button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.stack-preview {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cre8-color-bg-subtle);
}

.stack-iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
}

.stack-preview-placeholder {
  font-size: 14px;
  opacity: 0.4;
  text-align: center;
  padding: 32px;
}
/* ─────────────────────────────────────────────────────────────────────────── */
```

**Step 2: Commit**

```bash
git add packages/cre8-studio/src/app/globals.css
git commit -m "feat(cre8-studio): add stack layout CSS styles"
```

---

### Task 8: End-to-end smoke test

**Step 1: Start cre8-apps server**

```bash
cd packages/cre8-apps
.venv/bin/uvicorn server:app --port 8001 --reload
```

**Step 2: In a second terminal, start cre8-studio**

```bash
cd packages/cre8-studio
pnpm dev
```

**Step 3: Open http://localhost:3000/stack**

- Type "Build a simple task list app with add and delete"
- Hit Enter
- Verify: status banner updates through agents, iframe loads at localhost:3001 with a running app

**Step 4: Iterate**

- Type "Make the button red"
- Verify: OrchestratorAgent routes to CodeGeneratorAgent only, page.tsx updates, HMR refreshes iframe

**Step 5: Close and final commit**

```bash
git add -A
git commit -m "feat: cre8-stack complete — /stack route with conversational AI + live app preview"
```
