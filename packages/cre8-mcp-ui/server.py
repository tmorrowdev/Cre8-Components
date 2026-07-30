#!/usr/bin/env python3
"""FastMCP server exposing cre8-wc UIs as mcp-ui resources.

Run with:  python server.py          (stdio transport)

Never print to stdout — stdio transport reads it. Use logging (stderr).
"""

from __future__ import annotations

import logging

from mcp.server.fastmcp import FastMCP
from mcp_ui_server.core import UIResource

from cre8_mcp_ui import REGAL_THEME_CSS, from_schema
from cre8_mcp_ui.pages import regal_home_schema

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("cre8-mcp-ui")

mcp = FastMCP("cre8-mcp-ui")


# ──────────────────────────────────────────────────────────────────────
# UI tools
# ──────────────────────────────────────────────────────────────────────

@mcp.tool()
def show_regal_home() -> list[UIResource]:
    """Render the Regal Bank home page using the cre8-wc Regal brand theme."""
    return [
        from_schema(
            regal_home_schema(),
            uri="ui://cre8-mcp-ui/regal-home",
            title="Regal Bank — Personal Banking",
            theme_css=REGAL_THEME_CSS,
        )
    ]


# ──────────────────────────────────────────────────────────────────────
# Callback tools — every toolName referenced in the schema lives here.
# Argument names match the [name] attributes inside each form scope.
# ──────────────────────────────────────────────────────────────────────

@mcp.tool()
def open_account(source: str = "unknown", product: str = "Checking") -> dict:
    """Start an account application from the Regal Bank home page."""
    log.info("open_account source=%s product=%s", source, product)
    return {
        "status": "started",
        "product": product,
        "source": source,
        "next_steps": [
            "Confirm identity and address",
            "Fund the account with an opening deposit",
            "Set up online banking",
        ],
    }


@mcp.tool()
def log_in(online_id: str = "", password: str = "") -> dict:
    """Handle the inline Online Banking login card.

    Demo server: credentials are acknowledged, never stored or forwarded.
    """
    log.info("log_in attempt for online_id=%r", online_id)
    if not online_id or not password:
        return {"status": "error", "message": "Both Online ID and password are required."}
    return {
        "status": "ok",
        "online_id": online_id,
        "message": f"Signed in as {online_id} (demo — no real authentication performed).",
    }


@mcp.tool()
def explore_product(product: str) -> dict:
    """Return summary detail for one of the home page product tiles."""
    catalog = {
        "Checking": "Crown Checking waives the monthly fee for the first year.",
        "Savings": "Crown Savings pairs automatic transfers with a yearly rate review.",
        "Credit cards": "Cash-back and low-rate cards, with CardGuard controls on every card.",
        "Mortgages": "Fixed and adjustable purchase, construction and refinance options.",
        "Home equity": "Lines of credit and fixed-rate loans against your home's value.",
    }
    return {
        "product": product,
        "summary": catalog.get(product, "No summary on file for that product."),
    }


@mcp.tool()
def find_branch(zip: str = "") -> dict:
    """Look up branches and ATMs near a ZIP code."""
    if not zip.strip():
        return {"status": "error", "message": "Enter a ZIP code to search."}
    return {
        "status": "ok",
        "zip": zip,
        "results": [
            {"name": "Regal Bank — Downtown", "distance_mi": 0.4, "has_atm": True},
            {"name": "Regal Bank — Midtown", "distance_mi": 1.8, "has_atm": True},
            {"name": "Regal Bank — Riverside", "distance_mi": 3.1, "has_atm": False},
        ],
    }


if __name__ == "__main__":
    mcp.run()
