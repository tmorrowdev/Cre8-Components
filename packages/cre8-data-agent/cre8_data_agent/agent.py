import os
from claude_agent_sdk import ClaudeAgentOptions
from .tools import build_sdk_server
from .system_prompt import SYSTEM_PROMPT
from .explore_prompt import EXPLORE_SYSTEM_PROMPT, REPORT_SYSTEM_PROMPT

CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-opus-4-7")

_options: dict[str, ClaudeAgentOptions] = {}

_DATA_TOOLS = [
    "mcp__data-tools__render_ui",
    "mcp__data-tools__describe_data",
    "mcp__data-tools__summarize_stats",
    "mcp__data-tools__search_components",
    "mcp__data-tools__get_component",
    "mcp__data-tools__list_datasets",
    "mcp__data-tools__query_dataset",
]


def get_options(mode: str = "chat") -> ClaudeAgentOptions:
    if mode not in _options:
        sdk_server = build_sdk_server()
        if mode == "report":
            prompt = REPORT_SYSTEM_PROMPT
        elif mode == "explore":
            prompt = EXPLORE_SYSTEM_PROMPT
        else:
            prompt = SYSTEM_PROMPT
        _options[mode] = ClaudeAgentOptions(
            model=CLAUDE_MODEL,
            system_prompt=prompt,
            permission_mode="default",
            mcp_servers={"data-tools": sdk_server},
            allowed_tools=_DATA_TOOLS,
            max_turns=10,
        )
    return _options[mode]
