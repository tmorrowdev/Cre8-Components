#!/usr/bin/env python3
"""Render a page's schema to a standalone HTML file for browser verification.

The UIResource path needs a running MCP host to look at; this writes the exact
same document the resource would carry, so the page can be opened directly.

    python scripts/preview.py [outfile]
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from cre8_mcp_ui import load_brand_theme, render_schema, wrap_in_shell  # noqa: E402
from cre8_mcp_ui.theme import demo_brand  # noqa: E402
from cre8_mcp_ui.pages import regal_home_schema  # noqa: E402


def main() -> int:
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("preview/regal-home.html")
    out.parent.mkdir(parents=True, exist_ok=True)

    brand = demo_brand()
    body = render_schema(regal_home_schema())
    html = wrap_in_shell(
        body,
        title="Regal Bank — Personal Banking",
        theme_css=load_brand_theme(brand),
    )
    out.write_text(html, encoding="utf-8")
    print(f"wrote {out} ({len(html):,} bytes, body {len(body):,}, brand {brand})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
