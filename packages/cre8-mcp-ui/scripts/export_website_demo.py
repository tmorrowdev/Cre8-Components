#!/usr/bin/env python3
"""Export the demo's generated assets into /website.

    python scripts/export_website_demo.py

The demo page and its JS are hand-written and live in website/. Everything
*derived* — the a2ui schema, the brand token sheets, the fonts — is emitted
here so the site can never drift from the design system.

The website runs a strict CSP, which dictates the output formats:

    script-src 'self'   → no inline <script>; the schema ships as an ES module,
                          not as JSON handed to a script tag.
    connect-src 'none'  → fetch/XHR is blocked, so the schema cannot be loaded
                          at runtime. Another reason it must be a module.
    font-src 'self'     → does NOT cover data:, so the data-URI fonts used in
                          mcp-ui resources are blocked here. Real font files
                          get copied into /website/vendor/fonts.
    frame-src 'none'    → the demo cannot use an iframe, so the generated UI is
                          rendered into the host document. Brand tokens are
                          therefore scoped to a container selector instead of
                          :root, so they cannot leak onto the site's own chrome.
"""

from __future__ import annotations

import json
import re
import shutil
import sys
from pathlib import Path

PKG = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PKG))

from cre8_mcp_ui.pages import regal_home_schema  # noqa: E402
from cre8_mcp_ui.theme import load_brand_theme  # noqa: E402

WEBSITE = PKG.parent.parent / "website"
BRANDS = PKG.parent / "cre8-wc" / "design-tokens" / "brands"

# Brands the demo can switch between, to show one schema reskinning live. Both
# must be *complete* brands (a component token layer, not just the newer
# semantic surface) or the components render unstyled — see theme.py.
# (label, brand dir, base brand, scope attribute value)
DEMO_BRANDS = [
    ("Regal Bank", "regal", "minimalist", "regal"),
    ("Cre8 default", "cre8", "cre8", "alt"),
]

FONTS = [
    "minimalist/assets/fonts/Aeonik-Light.woff2",
    "minimalist/assets/fonts/Aeonik-Regular.woff2",
    "minimalist/assets/fonts/Aeonik-Bold.woff2",
]

AEONIK_FACES = """
/* Aeonik, served from /vendor so it satisfies `font-src 'self'`. */
@font-face { font-family:'Aeonik'; font-weight:300; font-style:normal; font-display:swap;
  src:url('/vendor/fonts/Aeonik-Light.woff2') format('woff2'); }
@font-face { font-family:'Aeonik'; font-weight:400; font-style:normal; font-display:swap;
  src:url('/vendor/fonts/Aeonik-Regular.woff2') format('woff2'); }
@font-face { font-family:'Aeonik'; font-weight:700; font-style:normal; font-display:swap;
  src:url('/vendor/fonts/Aeonik-Bold.woff2') format('woff2'); }
"""


def scope_tokens(css: str, scope: str) -> str:
    """Re-root a token sheet onto a container selector.

    The demo renders the generated UI inside the marketing site's own document
    (no iframe allowed), so brand tokens must not land on :root — they would
    repaint the site around them, and with two brand sheets loaded at once the
    second would simply win everywhere.

    Two things have to happen, and missing either is silent:

      :root         → [data-brand="x"]          (the token blocks)
      cre8-footer   → [data-brand="x"] cre8-footer   (element-scoped overrides)

    `@import` lines are dropped: the sheets are concatenated file *contents*, so
    a relative import would resolve against /vendor and 404.
    """
    css = re.sub(r"^\s*@import[^;]*;\s*$", "", css, flags=re.M)
    css = re.sub(r":root\b", scope, css)
    # Any remaining top-level element selector must be nested under the scope so
    # it cannot reach the host page. Matched at line start, because these rules
    # are preceded by a doc comment rather than by `}`.
    css = re.sub(r"(?m)^(cre8-[a-z-]+)\s*\{", rf"{scope} \1 {{", css)
    return css


def vendor_fonts(css: str, vendor: Path) -> tuple[str, int]:
    """Copy every font a token sheet references into /vendor and rewrite the URL.

    Brand sheets carry @font-face rules with paths relative to their own
    directory (`../../../assets/fonts/Inter-Regular.woff2`). Those are correct in
    the source tree and 404 the moment the sheet is inlined under /vendor, which
    shows up only as a console error and a silently wrong typeface.
    """
    fonts_dir = vendor / "fonts"
    fonts_dir.mkdir(parents=True, exist_ok=True)
    copied: set[str] = set()

    def repl(m: re.Match) -> str:
        raw = m.group(1).strip("'\"")
        name = Path(raw).name
        if not name.lower().endswith((".woff2", ".woff", ".ttf", ".otf")):
            return m.group(0)
        if name not in copied:
            hits = sorted((PKG.parent / "cre8-wc").rglob(name))
            hits = [h for h in hits if "node_modules" not in h.parts]
            if not hits:
                return f"url('/vendor/fonts/{name}')"  # keep shape; will 404 loudly
            shutil.copy(hits[0], fonts_dir / name)
            copied.add(name)
        return f"url('/vendor/fonts/{name}')"

    return re.sub(r"url\(([^)]+)\)", repl, css), len(copied)


def main() -> int:
    assets = WEBSITE / "assets"
    vendor = WEBSITE / "vendor"
    (vendor / "fonts").mkdir(parents=True, exist_ok=True)
    assets.mkdir(parents=True, exist_ok=True)

    # ── the schema, as an ES module (connect-src 'none' forbids fetching) ──
    schema = regal_home_schema()
    out = assets / "regal-home.schema.js"
    out.write_text(
        "// GENERATED by packages/cre8-mcp-ui/scripts/export_website_demo.py\n"
        "// The same cre8-a2ui schema the MCP tool returns. Do not edit by hand.\n"
        "export const schema = " + json.dumps(schema, indent=2, ensure_ascii=False) + ";\n"
        "export default schema;\n",
        encoding="utf-8",
    )
    print(f"schema : assets/{out.name}  ({out.stat().st_size / 1024:.0f} KB)")

    # ── one scoped token sheet per demo brand ─────────────────────────────
    manifest = []
    for label, brand, base, scope in DEMO_BRANDS:
        try:
            css = load_brand_theme(brand, base=base, page_extras=False)
        except FileNotFoundError as e:
            print(f"skip   : {brand} — {e}")
            continue
        scoped = scope_tokens(css, f'[data-brand="{scope}"]')
        scoped, nfonts = vendor_fonts(scoped, vendor)
        # the container needs the brand's own text colour and font too
        head = (AEONIK_FACES if brand == "regal" else "")
        name = f"brand-{scope}.css"
        (vendor / name).write_text(
            f"/* GENERATED — {label} tokens, scoped to [data-brand=\"{scope}\"]. */\n"
            f"{head}\n{scoped}\n",
            encoding="utf-8",
        )
        manifest.append({"label": label, "brand": brand, "scope": scope,
                         "href": f"/vendor/{name}"})
        print(f"tokens : vendor/{name}  ({(vendor / name).stat().st_size / 1024:.0f} KB, "
              f"{nfonts} font file(s) vendored)")

    (assets / "brands.js").write_text(
        "// GENERATED by packages/cre8-mcp-ui/scripts/export_website_demo.py\n"
        "export const brands = " + json.dumps(manifest, indent=2) + ";\n",
        encoding="utf-8",
    )

    # ── fonts ─────────────────────────────────────────────────────────────
    for rel in FONTS:
        src = BRANDS / rel
        if src.is_file():
            shutil.copy(src, vendor / "fonts" / src.name)
    print(f"fonts  : vendor/fonts/  ({len(FONTS)} files)")

    # ── a count the demo can quote honestly ───────────────────────────────
    body = json.dumps(schema)
    stats = {
        "components": len(set(re.findall(r'"component":\s*"(cre8-[a-z-]+)"', body))),
        "nodes": body.count('"component"'),
        "toolEvents": body.count('"type": "tool"'),
        "brands": len(manifest),
    }
    (assets / "demo-stats.js").write_text(
        "// GENERATED by packages/cre8-mcp-ui/scripts/export_website_demo.py\n"
        "export const stats = " + json.dumps(stats, indent=2) + ";\n",
        encoding="utf-8",
    )
    print("stats  :", stats)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
