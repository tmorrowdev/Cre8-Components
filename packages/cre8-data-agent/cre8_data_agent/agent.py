import os
from claude_agent_sdk import ClaudeAgentOptions
from .tools import build_sdk_server
from .system_prompt import SYSTEM_PROMPT

CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-opus-4-7")

_options: ClaudeAgentOptions | None = None


def get_options() -> ClaudeAgentOptions:
    global _options
    if _options is None:
        sdk_server = build_sdk_server()
        _options = ClaudeAgentOptions(
            model=CLAUDE_MODEL,
            system_prompt=SYSTEM_PROMPT,
            permission_mode="default",
            mcp_servers={"data-tools": sdk_server},
            allowed_tools=[
                "mcp__data-tools__render_ui",
                "mcp__data-tools__describe_data",
                "mcp__data-tools__summarize_stats",
                "mcp__data-tools__search_components",
                "mcp__data-tools__get_component",
            ],
            max_turns=10,
        )
    return _options
