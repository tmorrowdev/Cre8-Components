#!/usr/bin/env python3
"""FastAPI SSE server for cre8-apps agent pipeline.

Runs the SequentialAgent (UI Design → DB Provision → Code Generate) and
streams events back to the browser so the canvas can render live.

Start:
  .venv/bin/python server.py
  # or
  .venv/bin/uvicorn server:app --reload --port 8001
"""

import asyncio
import json
import re
from pathlib import Path
from typing import AsyncIterator

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

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class BuildRequest(BaseModel):
    prompt: str


def _extract_block(text: str, tag: str) -> str:
    pattern = rf"---{re.escape(tag)}---\s*(.*?)\s*---END_{re.escape(tag)}---"
    m = re.search(pattern, text, re.DOTALL)
    return m.group(1).strip() if m else ""


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

            # Notify when a new agent starts
            if author and author != current_agent:
                current_agent = author
                yield sse("agent_start", {"agent": author})

            # Stream text deltas
            if event.content:
                for part in event.content.parts or []:
                    if hasattr(part, "text") and part.text:
                        yield sse("text", {"delta": part.text, "agent": author})

            # Watch for state changes when an agent saves its output_key
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


@app.options("/api/build")
async def build_preflight() -> dict:
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


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
