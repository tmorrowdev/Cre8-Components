#!/usr/bin/env python3
"""FastAPI SSE server for cre8-apps agent pipeline.

Runs the SequentialAgent (UI Design → DB Provision → Code Generate) and
streams events back to the browser so the canvas can render live.
"""

import asyncio
import json
import re
import os
import subprocess
import uuid
from pathlib import Path
from typing import AsyncIterator, AsyncIterable, Any
from dataclasses import dataclass, field

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env", override=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types as genai_types

from cre8_apps.agent import root_agent

# Import agents for orchestration
from cre8_apps.agents.orchestrator import decide_steps
from cre8_apps.agents.ui_designer import build_ui_designer
from cre8_apps.agents.db_provisioner import build_db_provisioner
from cre8_apps.agents.code_generator import build_code_generator

# Import helpers from main.py
import sys
sys.path.insert(0, str(Path(__file__).parent))
from main import _scaffold_nextjs_app, _extract_block as _extract_block_main, _strip_fences

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Session store ──────────────────────────────────────────────────────────
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
_next_port = 4000  # start above cre8-mcp (3001) and cre8-studio (3000-3003)

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

def _install_and_launch(session: StackSession) -> None:
    """Run npm install then start npm run dev non-blocking (called in a thread)."""
    subprocess.run(["npm", "install"], cwd=session.out_dir, check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    session.app_process = subprocess.Popen(
        ["npm", "run", "dev", "--", "--port", str(session.port)],
        cwd=session.out_dir,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
# ───────────────────────────────────────────────────────────────────────────

class BuildRequest(BaseModel):
    prompt: str

class StackRequest(BaseModel):
    prompt: str
    session_id: str | None = None
    history: list[dict] = []

def _extract_block(text: str, tag: str) -> str:
    pattern = rf"---{re.escape(tag)}---\s*(.*?)\s*---END_{re.escape(tag)}---"
    m = re.search(pattern, text, re.DOTALL)
    if m:
        return _strip_fences(m.group(1).strip())
    return ""

def _parse_ui_spec(ui_design: str) -> dict | None:
    raw = _extract_block(ui_design, "UI_SPEC")
    if not raw:
        return None
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None

def _parse_db_schema(db_provision: str) -> list | None:
    raw = _extract_block(db_provision, "DB_SCHEMA")
    if not raw:
        return None
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None

async def _stream_pipeline(prompt: str) -> AsyncIterator[str]:
    def sse(event: str, data: dict) -> str:
        return f"event: {event}\ndata: {json.dumps(data)}\n\n"

    session_service = InMemorySessionService()
    session = await session_service.create_session(
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
            session_id=session.id,
            user_id=session.user_id,
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
                raw = state_delta["ui_design"]
                spec = _parse_ui_spec(raw)
                html = _extract_block(raw, "COMPONENT_CODE")
                yield sse("ui_ready", {"spec": spec, "html": html})

            if "db_provision" in state_delta:
                schema = _parse_db_schema(state_delta["db_provision"])
                migration = _extract_block(state_delta["db_provision"], "MIGRATION_SQL")
                yield sse("db_schema", {"schema": schema, "migration": migration})

            if "generated_app" in state_delta:
                page_tsx = _extract_block(state_delta["generated_app"], "PAGE_TSX")
                env_vars = _extract_block(state_delta["generated_app"], "ENV_VARS")
                yield sse("code_ready", {"page_tsx": page_tsx, "env_vars": env_vars})

        yield sse("done", {})
    except Exception as e:
        yield sse("error", {"message": str(e)})

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

                # Scaffold files, then npm install + npm run dev (all in thread to not block event loop)
                await asyncio.to_thread(
                    _scaffold_nextjs_app,
                    session.out_dir,
                    session.page_tsx,
                    session.migration_sql,
                    env_vars,
                    supabase_types,
                )
                await asyncio.to_thread(_install_and_launch, session)
                # Give dev server 4s to boot
                await asyncio.sleep(4)
                yield sse("app_ready", {
                    "session_id": session.session_id,
                    "url": f"http://localhost:{session.port}",
                })

        yield sse("done", {})
    except Exception as e:
        yield sse("error", {"message": str(e)})

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

@app.options("/api/build")
@app.options("/api/stack")
async def preflight() -> dict:
    return {}

@app.post("/api/build")
async def build(req: BuildRequest) -> StreamingResponse:
    return StreamingResponse(
        _stream_pipeline(req.prompt),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )

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

@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
