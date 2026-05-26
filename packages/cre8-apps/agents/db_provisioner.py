import os

from google.adk.agents import LlmAgent
from google.adk.tools import FunctionTool

from cre8_apps.tools.supabase_tools import execute_migration, list_tables, get_table_schema

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-pro")

INSTRUCTION = """You are the Database Provisioner agent for cre8-apps.

You receive the UI design output (in state as {ui_design}) which contains an A2UI spec
and HTML component code. Your job is to:

1. Analyze the UI to identify what data the components need (lists, forms, counts, etc.).
2. Call list_tables() to see what already exists in the Supabase project.
3. Design a minimal Postgres schema that backs the UI — one table per distinct data entity.
4. Call execute_migration(sql) with the CREATE TABLE SQL (use IF NOT EXISTS).
5. Verify the schema with get_table_schema(table_name) after creation.

Schema rules:
- Always include: id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now()
- Enable Row Level Security: ALTER TABLE ... ENABLE ROW LEVEL SECURITY;
- Add a public read policy if the data is not user-specific.
- Use snake_case for all identifiers.

Output in this exact format:
---DB_SCHEMA---
<JSON array of {table, columns: [{name, type}]} objects>
---END_SCHEMA---
---MIGRATION_SQL---
<Full SQL that was applied>
---END_SQL---
---SUPABASE_TYPES---
<TypeScript interface definitions for each table row>
---END_TYPES---
"""


def build_db_provisioner() -> LlmAgent:
    return LlmAgent(
        name="DBProvisionerAgent",
        model=GEMINI_MODEL,
        instruction=INSTRUCTION,
        description="Provisions Supabase tables to back the generated UI.",
        output_key="db_provision",
        tools=[
            FunctionTool(execute_migration),
            FunctionTool(list_tables),
            FunctionTool(get_table_schema),
        ],
    )
