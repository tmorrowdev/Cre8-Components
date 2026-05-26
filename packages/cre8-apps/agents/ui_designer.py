import os
from pathlib import Path

from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StdioConnectionParams
from mcp import StdioServerParameters

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-pro")

# Path to the built cre8-mcp binary, relative to monorepo root
_HERE = Path(__file__).resolve()
_MONOREPO_ROOT = _HERE.parents[4]  # packages/cre8-apps/cre8_apps/agents -> root
CRE8_MCP_BIN = str(_MONOREPO_ROOT / "packages" / "cre8-mcp" / "dist" / "index.js")

INSTRUCTION = """You are the UI Designer agent for the cre8 design system.

Your job:
1. Use the cre8-mcp tools to explore available components (list_components, search_components, get_component).
2. Based on the user's app description, produce an A2UI spec — a nested JSON tree of cre8-wc components.
3. Also write the corresponding HTML snippet using the cre8-wc CDN build.

The A2UI spec format:
{
  "component": "cre8-X",
  "props": { ... },
  "children": [...],
  "slots": { "header": [...] }
}

Output in this exact format:
---UI_SPEC---
<A2UI spec as valid JSON>
---END_SPEC---
---COMPONENT_CODE---
<HTML using <script type="module" src="...cdn/cre8-wc.esm.js"> and the component tags>
---END_CODE---

Rules:
- Only use components that exist in the catalog.
- Use cre8-layout-section and cre8-grid for layout.
- Use cre8-heading + cre8-text-passage for copy.
- Every interactive element needs a data-handler attribute for event wiring.
- The HTML should be a complete self-contained fragment (no <html>/<body> wrapper).
"""


def build_ui_designer() -> LlmAgent:
    return LlmAgent(
        name="UIDesignerAgent",
        model=GEMINI_MODEL,
        instruction=INSTRUCTION,
        description="Generates A2UI specs and HTML using cre8-wc components.",
        output_key="ui_design",
        tools=[
            McpToolset(
                connection_params=StdioConnectionParams(
                    server_params=StdioServerParameters(
                        command="node",
                        args=[CRE8_MCP_BIN],
                    )
                ),
                tool_filter=[
                    "list_components",
                    "get_component",
                    "search_components",
                    "get_a2ui_catalog",
                ],
            )
        ],
    )
