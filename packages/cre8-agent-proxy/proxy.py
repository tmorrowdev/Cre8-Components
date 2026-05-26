"""
Auth proxy for sandboxed agent.
Routes /llm/* to the Anthropic API and /mcp/* to cre8-mcp, injecting real credentials.
The agent carries only a sentinel key; secrets never leave this container.
"""
import logging
import os
import re
from typing import AsyncIterator

import httpx
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import Response, StreamingResponse
from starlette.routing import Route

_KEY_RE = re.compile(r"(sk-ant-[A-Za-z0-9_-]{4})[A-Za-z0-9_-]+")
_STRIP_RESPONSE = {"content-encoding", "content-length", "transfer-encoding"}


def _redact(val: str) -> str:
    return _KEY_RE.sub(r"\1***", val)


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
log = logging.getLogger("proxy")

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
CRE8_MCP_TOKEN = os.environ["CRE8_MCP_TOKEN"]
LLM_UPSTREAM = "https://api.anthropic.com"
MCP_UPSTREAM = os.getenv("CRE8_MCP_UPSTREAM", "http://cre8-mcp:3001")

MAX_BODY = 1 * 1024 * 1024
ALLOWED_METHODS = {"GET", "POST", "PUT", "PATCH", "DELETE"}
_SCRUB_ALWAYS = {"host", "content-length", "transfer-encoding"}


def _build_headers(
    request: Request, drop: set[str], inject: dict[str, str]
) -> dict[str, str]:
    skip = _SCRUB_ALWAYS | {h.lower() for h in drop}
    out = {k: v for k, v in request.headers.items() if k.lower() not in skip}
    out.update(inject)
    return out


async def _proxy(
    request: Request,
    upstream_url: str,
    drop_headers: set[str],
    inject_headers: dict[str, str],
) -> Response:
    if request.method not in ALLOWED_METHODS:
        return Response("Method not allowed", status_code=405)

    body = await request.body()
    if len(body) > MAX_BODY:
        return Response("Request body too large", status_code=413)

    headers = _build_headers(request, drop_headers, inject_headers)
    # Always request uncompressed responses so we can pass bytes through cleanly
    headers["accept-encoding"] = "identity"
    qs = request.url.query
    url = upstream_url + ("?" + qs if qs else "")
    log.info("→ %s %s", request.method, _redact(url))

    if "text/event-stream" in request.headers.get("accept", ""):
        async def _stream_gen() -> AsyncIterator[bytes]:
            async with httpx.AsyncClient(timeout=120) as client:
                async with client.stream(
                    request.method, url, headers=headers, content=body
                ) as resp:
                    log.info("← %d SSE", resp.status_code)
                    async for chunk in resp.aiter_bytes():
                        yield chunk

        return StreamingResponse(
            _stream_gen(),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
        )

    async with httpx.AsyncClient(timeout=120) as client:
        resp = await client.request(request.method, url, headers=headers, content=body)
    log.info("← %d", resp.status_code)
    fwd_headers = {k: v for k, v in resp.headers.items() if k.lower() not in _STRIP_RESPONSE}
    return Response(resp.content, status_code=resp.status_code, headers=fwd_headers)


async def health(request: Request) -> Response:
    return Response('{"status":"ok"}', media_type="application/json")


async def llm_proxy(request: Request) -> Response:
    path = "/" + request.path_params.get("path", "")
    return await _proxy(
        request,
        LLM_UPSTREAM + path,
        drop_headers={"x-api-key", "authorization"},
        inject_headers={"x-api-key": ANTHROPIC_API_KEY},
    )


async def mcp_proxy(request: Request) -> Response:
    path = "/" + request.path_params.get("path", "")
    return await _proxy(
        request,
        MCP_UPSTREAM + path,
        drop_headers={"authorization"},
        inject_headers={"authorization": f"Bearer {CRE8_MCP_TOKEN}"},
    )


async def forbidden(request: Request) -> Response:
    log.warning("blocked %s %s", request.method, request.url.path)
    return Response("Forbidden: unknown route prefix", status_code=403)


app = Starlette(routes=[
    Route("/health", health),
    Route("/llm/{path:path}", llm_proxy, methods=list(ALLOWED_METHODS)),
    Route("/mcp/{path:path}", mcp_proxy, methods=list(ALLOWED_METHODS)),
    Route("/{path:path}", forbidden),
])
