"""
Guards the sandbox invariants declared in
docs/plans/2026-05-25-agent-sandbox-proxy-design.md.

These are static checks over docker-compose.yml, so they run in CI without a
Docker daemon. They exist because the invariants are invisible in code review:
attaching the agent to one extra network, or adding one env_file, silently
voids the whole boundary while everything still works.
"""
from pathlib import Path

import pytest
import yaml

COMPOSE = Path(__file__).resolve().parent.parent / "docker-compose.yml"

# The agent holds a dummy key; anything matching a real credential is a leak.
SENTINEL = "sentinel-not-a-real-key"
SECRET_NAMES = {"ANTHROPIC_API_KEY", "CRE8_MCP_TOKEN", "OPENAI_API_KEY"}


@pytest.fixture(scope="module")
def compose():
    return yaml.safe_load(COMPOSE.read_text())


def _env_of(service):
    """Normalise a compose `environment:` block to a dict."""
    env = service.get("environment", {})
    if isinstance(env, dict):
        return env
    out = {}
    for item in env:
        key, _, val = item.partition("=")
        out[key] = val
    return out


def test_agent_has_no_egress_network(compose):
    """The agent must sit only on networks declared internal: true.

    Regression: a `frontend-net: {}` was added alongside agent-net, which is a
    plain bridge with NAT. That restored full outbound internet from the
    untrusted zone, so a prompt-injected agent could reach any host directly and
    bypass the proxy entirely — the exact threat the design exists to stop.
    """
    networks = compose["networks"]
    agent_nets = compose["services"]["agent"]["networks"]
    assert agent_nets, "agent must be pinned to an explicit network"
    for name in agent_nets:
        spec = networks.get(name) or {}
        assert spec.get("internal") is True, (
            f"agent is attached to '{name}', which is not internal:true. "
            "Any non-internal network grants the agent direct internet egress "
            "and voids the sandbox."
        )


def test_agent_holds_no_real_secrets(compose):
    agent = compose["services"]["agent"]
    assert "env_file" not in agent, (
        "agent must not load an env_file; secrets belong to the proxy only"
    )
    env = _env_of(agent)
    assert env.get("ANTHROPIC_API_KEY") == SENTINEL, (
        "agent must carry the sentinel key, never a real or interpolated one"
    )
    for name in SECRET_NAMES - {"ANTHROPIC_API_KEY"}:
        assert name not in env, f"agent must not receive {name}"
    # Non-secret config (CLAUDE_MODEL, CORS_ORIGINS, ...) may interpolate from
    # .env. A secret must never be the thing being interpolated.
    for key, val in env.items():
        for secret in SECRET_NAMES:
            assert f"${{{secret}" not in str(val), (
                f"agent env {key} interpolates {secret} from .env; "
                "the agent receives no secrets"
            )


def test_agent_reaches_upstreams_only_through_proxy(compose):
    env = _env_of(compose["services"]["agent"])
    for var in ("ANTHROPIC_BASE_URL", "CRE8_MCP_URL"):
        assert env[var].startswith("http://proxy:8080/"), (
            f"{var} must point at the proxy, not an upstream directly"
        )


def test_secrets_are_scoped_per_service(compose):
    """No env_file anywhere: it hands a whole secret file to a service and makes
    the scoping unverifiable. Each secret is passed explicitly, per service."""
    for name, service in compose["services"].items():
        assert "env_file" not in service, (
            f"{name} uses env_file, which grants it every secret in that file. "
            "Pass each variable explicitly under `environment:` instead."
        )


def test_only_proxy_holds_the_llm_key(compose):
    """cre8-mcp never reads ANTHROPIC_API_KEY, so it must never receive it."""
    for name, service in compose["services"].items():
        env = _env_of(service)
        has_key = "ANTHROPIC_API_KEY" in env and env["ANTHROPIC_API_KEY"] != SENTINEL
        if name == "proxy":
            assert has_key, "proxy is the sole custodian of ANTHROPIC_API_KEY"
        else:
            assert not has_key, f"{name} must not receive ANTHROPIC_API_KEY"


def test_cre8_mcp_is_not_reachable_from_the_agent(compose):
    """The agent and cre8-mcp must share no network; the proxy bridges them."""
    services = compose["services"]
    agent_nets = set(services["agent"]["networks"])
    mcp_nets = set(services["cre8-mcp"]["networks"])
    assert not (agent_nets & mcp_nets), (
        "agent shares a network with cre8-mcp and can bypass the proxy's "
        f"bearer injection: {agent_nets & mcp_nets}"
    )
    proxy_nets = set(services["proxy"]["networks"])
    assert agent_nets & proxy_nets, "proxy must be reachable from the agent"
    assert mcp_nets & proxy_nets, "proxy must be able to reach cre8-mcp"


def test_containers_are_hardened(compose):
    for name, service in compose["services"].items():
        assert service.get("read_only") is True, f"{name} must be read_only"
        assert service.get("cap_drop") == ["ALL"], f"{name} must drop all caps"
        assert "no-new-privileges:true" in service.get("security_opt", []), (
            f"{name} must set no-new-privileges"
        )


GATEWAY_CONF = COMPOSE.parent / "gateway.conf"


def test_gateway_is_the_only_published_port(compose):
    """Host access must arrive through the secret-free gateway, not the agent."""
    published = {
        name for name, svc in compose["services"].items() if svc.get("ports")
    }
    assert published == {"gateway"}, (
        f"only the gateway may publish a host port, got {published or 'none'}"
    )
    assert "ports" not in compose["services"]["agent"]


def test_gateway_holds_no_secrets(compose):
    gateway = compose["services"]["gateway"]
    assert "env_file" not in gateway
    env = _env_of(gateway)
    for name in SECRET_NAMES:
        assert name not in env, f"gateway must not receive {name}"


def test_gateway_upstream_is_not_request_derived():
    """The gateway bridges the internal network to the host, so it is the one
    container the agent can reach that also has an outside interface. It stays
    harmless only while its upstream is a constant: a proxy_pass built from
    request data would let the agent name its own destination and exfiltrate
    through it."""
    conf = GATEWAY_CONF.read_text()
    request_vars = ("$http_", "$arg_", "$request_uri", "$uri", "$host/")
    for line in conf.splitlines():
        line = line.strip()
        if line.startswith("set $agent_upstream") or line.startswith("proxy_pass"):
            for var in request_vars:
                assert var not in line, (
                    f"gateway upstream is request-derived ({var!r} in {line!r}); "
                    "this turns the gateway into an egress hole"
                )
    assert "set $agent_upstream http://agent:8002;" in conf, (
        "gateway must point at a literal agent upstream"
    )
