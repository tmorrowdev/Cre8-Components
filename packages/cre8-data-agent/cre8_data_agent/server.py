import json
import logging
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env", override=True)

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, field_validator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from claude_agent_sdk import (
    query,
    AssistantMessage,
    TextBlock,
    ToolUseBlock,
    ResultMessage,
    SystemMessage,
)
from .agent import get_options

logger = logging.getLogger(__name__)

MAX_DATA_ROWS = 100
MAX_PROMPT_CHARS = 4_000

ALLOWED_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")]
API_TOKEN = os.getenv("API_TOKEN", "")

limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET"],
    allow_headers=["Authorization", "Content-Type"],
)

SSE_HEADERS = {
    "Cache-Control": "no-cache, no-transform",
    "Connection": "keep-alive",
    "X-Accel-Buffering": "no",
}


class ChatRequest(BaseModel):
    prompt: str
    data: list[dict] | None = None

    @field_validator("prompt")
    @classmethod
    def prompt_length(cls, v: str) -> str:
        if len(v) > MAX_PROMPT_CHARS:
            raise ValueError(f"prompt exceeds {MAX_PROMPT_CHARS} characters")
        return v

    @field_validator("data")
    @classmethod
    def data_row_limit(cls, v: list[dict] | None) -> list[dict] | None:
        if v and len(v) > MAX_DATA_ROWS:
            raise ValueError(f"data exceeds {MAX_DATA_ROWS} rows")
        return v


def _check_auth(request: Request) -> None:
    if not API_TOKEN:
        return
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer ") or auth[7:] != API_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")


def sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data)}\n\n"


async def _stream_chat(prompt: str, data: list[dict] | None):
    full_prompt = prompt
    if data:
        full_prompt += (
            f"\n\n<untrusted_data>\n{json.dumps(data)}\n</untrusted_data>"
        )

    options = get_options()
    try:
        async for message in query(prompt=full_prompt, options=options):
            if isinstance(message, SystemMessage) and getattr(message, "subtype", None) == "init":
                mcp_servers = getattr(message, "data", {}).get("mcp_servers", []) if hasattr(message, "data") else []
                yield sse("agent_start", {"agent": "DataAgent", "mcp_servers": mcp_servers})

            elif isinstance(message, AssistantMessage):
                for block in message.content:
                    if isinstance(block, TextBlock):
                        yield sse("text", {"delta": block.text})
                    elif isinstance(block, ToolUseBlock):
                        if block.name == "mcp__data-tools__render_ui":
                            spec_input = block.input or {}
                            yield sse("ui_ready", {
                                "spec": spec_input.get("spec"),
                                "caption": spec_input.get("caption", ""),
                            })
                        elif block.name in (
                            "mcp__data-tools__search_components",
                            "mcp__data-tools__get_component",
                        ):
                            tool_label = block.name.split("__")[-1]
                            yield sse("tool_use", {"tool": tool_label})

            elif isinstance(message, ResultMessage):
                cost = getattr(message, "total_cost_usd", None)
                yield sse("done", {"stop_reason": message.stop_reason, "is_error": message.is_error, "cost_usd": cost})

    except Exception:
        logger.exception("Agent stream error")
        yield sse("error", {"message": "An internal error occurred."})


@app.post("/api/chat")
@limiter.limit("10/minute")
async def chat(request: Request, req: ChatRequest) -> StreamingResponse:
    _check_auth(request)
    return StreamingResponse(
        _stream_chat(req.prompt, req.data),
        media_type="text/event-stream",
        headers=SSE_HEADERS,
    )


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "service": "cre8-data-agent"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)
