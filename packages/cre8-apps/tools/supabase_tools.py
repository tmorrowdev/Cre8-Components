import os
from supabase import create_client, Client

_client: Client | None = None


def _get_client() -> Client:
    global _client
    if _client is None:
        url = os.environ["SUPABASE_URL"]
        key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
        _client = create_client(url, key)
    return _client


def execute_migration(sql: str) -> dict:
    """Execute a SQL migration against the Supabase project.

    Args:
        sql: Raw SQL DDL to execute (CREATE TABLE, ALTER TABLE, etc.)

    Returns:
        dict with 'success' bool and optional 'error' string.
    """
    client = _get_client()
    try:
        client.rpc("exec_sql", {"query": sql}).execute()
        return {"success": True}
    except Exception as e:
        # Fall back to direct postgrest if exec_sql RPC not available
        try:
            from postgrest import SyncRequestBuilder  # noqa: F401
            client.postgrest.session.post(
                f"{os.environ['SUPABASE_URL']}/rest/v1/rpc/exec_sql",
                json={"query": sql},
                headers={"apikey": os.environ["SUPABASE_SERVICE_ROLE_KEY"]},
            )
            return {"success": True}
        except Exception as inner:
            return {"success": False, "error": str(inner or e)}


def list_tables() -> dict:
    """List all user-created tables in the public schema.

    Returns:
        dict with 'tables' list of table name strings.
    """
    client = _get_client()
    try:
        result = client.rpc(
            "exec_sql",
            {
                "query": (
                    "SELECT tablename FROM pg_tables "
                    "WHERE schemaname = 'public' ORDER BY tablename"
                )
            },
        ).execute()
        tables = [row["tablename"] for row in (result.data or [])]
        return {"tables": tables}
    except Exception as e:
        return {"tables": [], "error": str(e)}


def get_table_schema(table_name: str) -> dict:
    """Return column definitions for a table.

    Args:
        table_name: Name of the table in the public schema.

    Returns:
        dict with 'columns' list of {name, type, nullable} dicts.
    """
    client = _get_client()
    try:
        result = client.rpc(
            "exec_sql",
            {
                "query": (
                    f"SELECT column_name, data_type, is_nullable "
                    f"FROM information_schema.columns "
                    f"WHERE table_schema = 'public' AND table_name = '{table_name}' "
                    f"ORDER BY ordinal_position"
                )
            },
        ).execute()
        columns = [
            {
                "name": row["column_name"],
                "type": row["data_type"],
                "nullable": row["is_nullable"] == "YES",
            }
            for row in (result.data or [])
        ]
        return {"columns": columns}
    except Exception as e:
        return {"columns": [], "error": str(e)}
