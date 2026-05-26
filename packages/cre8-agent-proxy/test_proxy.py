import os

os.environ.setdefault("ANTHROPIC_API_KEY", "sk-ant-test-real-key")
os.environ.setdefault("CRE8_MCP_TOKEN", "test-mcp-token")

import httpx
import pytest
import respx
from starlette.testclient import TestClient

import proxy as _proxy_mod
from proxy import app, MCP_UPSTREAM


def test_health():
    with TestClient(app) as client:
        r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_unknown_prefix_forbidden():
    with TestClient(app) as client:
        r = client.get("/unknown/route")
    assert r.status_code == 403


def test_body_too_large():
    with TestClient(app) as client:
        r = client.post("/mcp/search", content=b"x" * (1024 * 1024 + 1))
    assert r.status_code == 413


@respx.mock
def test_llm_injects_real_key_strips_sentinel():
    route = respx.get("https://api.anthropic.com/v1/models").mock(
        return_value=httpx.Response(200, json={"models": []})
    )
    with TestClient(app) as client:
        r = client.get("/llm/v1/models", headers={"x-api-key": "sentinel-fake"})
    assert r.status_code == 200
    sent_key = route.calls.last.request.headers.get("x-api-key", "")
    # The injected key must be the proxy's configured key — never the sentinel
    assert sent_key == _proxy_mod.ANTHROPIC_API_KEY
    assert "sentinel-fake" not in sent_key


@respx.mock
def test_llm_strips_authorization_header():
    route = respx.get("https://api.anthropic.com/v1/models").mock(
        return_value=httpx.Response(200, json={})
    )
    with TestClient(app) as client:
        client.get(
            "/llm/v1/models",
            headers={"authorization": "Bearer sentinel", "x-api-key": "sentinel"},
        )
    sent_auth = route.calls.last.request.headers.get("authorization", "")
    assert "sentinel" not in sent_auth


@respx.mock
def test_mcp_injects_bearer():
    route = respx.get(f"{MCP_UPSTREAM}/components").mock(
        return_value=httpx.Response(200, json={"components": []})
    )
    with TestClient(app) as client:
        r = client.get("/mcp/components")
    assert r.status_code == 200
    assert route.calls.last.request.headers["authorization"] == "Bearer test-mcp-token"


@pytest.mark.asyncio
async def test_sse_streams_through():
    chunks = [b"data: {\"delta\":\"tok1\"}\n\n", b"data: {\"delta\":\"tok2\"}\n\n"]
    with respx.mock:
        respx.post("https://api.anthropic.com/v1/messages").mock(
            return_value=httpx.Response(
                200,
                content=b"".join(chunks),
                headers={"content-type": "text/event-stream"},
            )
        )
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
            async with client.stream(
                "POST",
                "/llm/v1/messages",
                headers={"accept": "text/event-stream", "x-api-key": "sentinel"},
                content=b"{}",
            ) as resp:
                body = b"".join([c async for c in resp.aiter_bytes()])
    assert b"tok1" in body
    assert b"tok2" in body
