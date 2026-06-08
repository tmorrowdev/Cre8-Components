import json
import os
import statistics

import httpx
from claude_agent_sdk import tool, create_sdk_mcp_server

from .data_access import list_datasets as _list_datasets, query_dataset as _query_dataset, UnknownDataset

CRE8_MCP_URL = os.getenv("CRE8_MCP_URL", "http://localhost:3001")

_MAX_SAMPLE_VALUE_LEN = 200


async def _validate_spec_remote(spec: dict) -> str | None:
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                f"{CRE8_MCP_URL}/a2ui/validate",
                json={"spec": spec},
            )
            result = resp.json()
            if result.get("ok"):
                return None
            return result.get("error", "Validation failed")
    except Exception as e:
        return str(e)


@tool(
    "render_ui",
    "Render a cre8 a2ui component spec inline in the chat. Use for tables, charts, cards, and grids. "
    "The spec is validated against the cre8 component catalog before display.",
    {
        "type": "object",
        "properties": {
            "spec": {
                "type": "object",
                "description": "A cre8 a2ui ComponentSpec object with 'component', optional 'props', 'children', and 'slots'.",
            },
            "caption": {
                "type": "string",
                "description": "Short description shown above the rendered UI.",
            },
        },
        "required": ["spec"],
    },
)
async def render_ui(args: dict) -> dict:
    spec = args.get("spec")
    caption = args.get("caption", "")
    error = await _validate_spec_remote(spec)
    if error:
        return {"content": [{"type": "text", "text": f"Invalid spec: {error}"}]}
    return {"content": [{"type": "text", "text": json.dumps({"ok": True, "spec": spec, "caption": caption})}]}


@tool(
    "search_components",
    "Search cre8 design system components by name, description, or category.",
    {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "Search term to match against component names, descriptions, and categories.",
            },
        },
        "required": ["query"],
    },
)
async def search_components(args: dict) -> dict:
    q = args.get("query", "")
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.get(f"{CRE8_MCP_URL}/search", params={"q": q})
            return {"content": [{"type": "text", "text": resp.text}]}
    except Exception as e:
        return {"content": [{"type": "text", "text": f"Error searching components: {e}"}]}


@tool(
    "get_component",
    "Get detailed information (props, slots, description) for a specific cre8 component by name.",
    {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "description": "Component name, e.g. 'cre8-button' or 'button'.",
            },
        },
        "required": ["name"],
    },
)
async def get_component(args: dict) -> dict:
    name = args.get("name", "")
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.get(f"{CRE8_MCP_URL}/components/{name}")
            return {"content": [{"type": "text", "text": resp.text}]}
    except Exception as e:
        return {"content": [{"type": "text", "text": f"Error getting component: {e}"}]}


@tool(
    "describe_data",
    "Analyze a list of records and return structure info: column names, inferred types, sample values, and row count.",
    {
        "type": "object",
        "properties": {
            "records": {
                "type": "array",
                "items": {"type": "object"},
                "description": "Array of data records (objects) to describe.",
            },
        },
        "required": ["records"],
    },
)
async def describe_data(args: dict) -> dict:
    records: list[dict] = args.get("records", [])
    if not records:
        return {"content": [{"type": "text", "text": json.dumps({"error": "No records provided"})}]}
    columns: dict = {}
    for row in records[:50]:
        for k, v in row.items():
            if k not in columns:
                columns[k] = {"type": type(v).__name__, "samples": []}
            if len(columns[k]["samples"]) < 3:
                sample = str(v)[:_MAX_SAMPLE_VALUE_LEN] if isinstance(v, str) else v
                columns[k]["samples"].append(sample)
    return {"content": [{"type": "text", "text": json.dumps({
        "row_count": len(records),
        "columns": columns,
    })}]}


@tool(
    "summarize_stats",
    "Compute min, max, mean, and median for numeric columns in a dataset.",
    {
        "type": "object",
        "properties": {
            "records": {
                "type": "array",
                "items": {"type": "object"},
                "description": "Array of data records.",
            },
            "columns": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Column names to compute stats for.",
            },
        },
        "required": ["records", "columns"],
    },
)
async def summarize_stats(args: dict) -> dict:
    records = args.get("records", [])
    cols = args.get("columns", [])
    stats: dict = {}
    skipped: list[str] = []
    for col in cols:
        vals = [r[col] for r in records if col in r and isinstance(r[col], (int, float))]
        if vals:
            stats[col] = {
                "count": len(vals),
                "min": min(vals),
                "max": max(vals),
                "mean": round(statistics.mean(vals), 4),
                "median": statistics.median(vals),
            }
        else:
            skipped.append(col)
    result: dict = {"stats": stats}
    if skipped:
        result["skipped_non_numeric"] = skipped
    return {"content": [{"type": "text", "text": json.dumps(result)}]}


@tool(
    "list_datasets",
    "List the available bundled datasets with their columns and descriptions.",
    {"type": "object", "properties": {}},
)
async def list_datasets_tool(args: dict) -> dict:
    return {"content": [{"type": "text", "text": json.dumps(_list_datasets())}]}


@tool(
    "query_dataset",
    "Query a bundled dataset: filter (where), group_by + aggregate (sum/avg/count/min/max), "
    "order_by, and limit. Returns compact records for charting.",
    {
        "type": "object",
        "properties": {
            "dataset": {"type": "string"},
            "select": {"type": "array", "items": {"type": "string"}},
            "where": {"type": "object"},
            "group_by": {"type": "array", "items": {"type": "string"}},
            "aggregate": {"type": "object", "description": "column -> sum|avg|count|min|max"},
            "order_by": {"type": "array", "items": {"type": "string"}, "description": "[column, asc|desc]"},
            "limit": {"type": "integer"},
        },
        "required": ["dataset"],
    },
)
async def query_dataset_tool(args: dict) -> dict:
    try:
        ob = args.get("order_by")
        order = (ob[0], ob[1]) if isinstance(ob, list) and len(ob) == 2 else None
        rows = _query_dataset(
            args["dataset"],
            select=args.get("select"),
            where=args.get("where"),
            group_by=args.get("group_by"),
            aggregate=args.get("aggregate"),
            order_by=order,
            limit=args.get("limit"),
        )
        return {"content": [{"type": "text", "text": json.dumps(rows)}]}
    except UnknownDataset as e:
        return {"content": [{"type": "text", "text": json.dumps({"error": f"Unknown dataset: {e}"})}]}


def build_sdk_server():
    return create_sdk_mcp_server(
        name="cre8-data-tools",
        version="1.0.0",
        tools=[
            render_ui,
            search_components,
            get_component,
            describe_data,
            summarize_stats,
            list_datasets_tool,
            query_dataset_tool,
        ],
    )
