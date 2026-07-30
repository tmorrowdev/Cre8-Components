"""Brand theme loading for cre8 mcp-ui pages.

The tokens themselves live with the design system, in
`packages/cre8-wc/design-tokens/brands/<brand>/`, so this module reads them
rather than restating them. One source of truth: editing the brand file
reskins both the Storybook build and every mcp-ui page.

Layering matters, and getting it wrong is not subtle. The CDN bundle ships
component *styles* but no token *values* — every rule is
`padding: var(--cre8-button-padding-vertical-medium)` and similar. A page that
inlines only a brand's colour overrides therefore renders components with the
right palette and no padding, no type scale and no line heights: buttons
collapse around their label and every heading falls back to body size.

So a theme is assembled in three layers, later winning over earlier:

    1. type layer       minimalist/tokens_minimalist.css — type scale, spacing
    2. component layer  minimalist/tokens_brand.css      — per-component values
    3. the brand itself <brand>/tokens_brand.css

A brand file only has to state what it changes.

The base is `minimalist`, which Regal Bank is built on: it is a complete brand
(both layers), so a derived brand only has to state its own identity. Any
complete brand works as a base — pass `base=` to choose another.
"""

from __future__ import annotations

import base64
from pathlib import Path

# packages/cre8-mcp-ui/cre8_mcp_ui/theme.py -> packages/
_PACKAGES_DIR = Path(__file__).resolve().parent.parent.parent
_BRANDS_DIR = _PACKAGES_DIR / "cre8-wc" / "design-tokens" / "brands"

# A complete brand supplies every token; derived brands override a subset.
DEFAULT_BASE = "minimalist"


def _base_layers(base: str) -> tuple[Path, ...]:
    d = _BRANDS_DIR / base / "css"
    return (d / f"tokens_{base}.css", d / "tokens_brand.css")

_CACHE: dict[str, str] = {}

# Aeonik lives with the minimalist brand as woff2. It is embedded as data: URIs
# rather than linked, because an mcp-ui resource is a single HTML document with
# no companion assets to serve, and hosts commonly forbid external requests
# (the cre8 marketing site, for instance, sets `font-src 'self'`). Embedding is
# the only form that survives both.
_FONT_FACES = (
    ("Aeonik", 300, "minimalist/assets/fonts/Aeonik-Light.woff2"),
    ("Aeonik", 400, "minimalist/assets/fonts/Aeonik-Regular.woff2"),
    ("Aeonik", 700, "minimalist/assets/fonts/Aeonik-Bold.woff2"),
)


def _embedded_fonts() -> str:
    out = []
    for family, weight, rel in _FONT_FACES:
        path = _BRANDS_DIR / rel
        if not path.is_file():
            continue
        b64 = base64.b64encode(path.read_bytes()).decode("ascii")
        out.append(
            f"@font-face{{font-family:'{family}';font-style:normal;"
            f"font-weight:{weight};font-display:swap;"
            f"src:url(data:font/woff2;base64,{b64}) format('woff2');}}"
        )
    return "\n".join(out)


# Page-level, not brand-level: the web font and the full-bleed override for the
# shell's #cre8-root padding. Kept out of the token file so that stays tokens.
_PAGE_EXTRAS_TAIL = """
:root {
  /* Marketing pages run full-bleed so promo bands reach the iframe edges. */
  --cre8-root-padding: 0;
}
"""


def _read(path: Path) -> str:
    if not path.is_file():
        raise FileNotFoundError(f"Missing design token file: {path}")
    return path.read_text(encoding="utf-8")


def load_brand_theme(
    brand: str,
    *,
    page_extras: bool = True,
    with_base: bool = True,
    base: str = DEFAULT_BASE,
) -> str:
    """Return the CSS for a brand, ready to pass as `theme_css`.

    Raises FileNotFoundError naming the searched path if the brand has no token
    file — a silent empty theme is worse than a loud miss, because the page
    still renders and merely looks like the default skin.
    """
    key = f"{brand}:{with_base}:{base}"
    if key not in _CACHE:
        brand_file = _BRANDS_DIR / brand / "css" / "tokens_brand.css"
        if not brand_file.is_file():
            available = sorted(p.name for p in _BRANDS_DIR.iterdir() if p.is_dir())
            raise FileNotFoundError(
                f"No token file for brand {brand!r} at {brand_file}. "
                f"Available brands: {', '.join(available)}"
            )
        layers = [*(_read(p) for p in _base_layers(base))] if with_base else []
        layers.append(_read(brand_file))
        _CACHE[key] = "\n".join(layers)

    css = _CACHE[key]
    if not page_extras:
        return css
    return "\n".join((_embedded_fonts(), _PAGE_EXTRAS_TAIL, css))


REGAL_THEME_CSS = load_brand_theme("regal")

__all__ = ["load_brand_theme", "REGAL_THEME_CSS", "DEFAULT_BASE"]
