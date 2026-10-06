"""Brand theme loading for cre8 mcp-ui pages.

The tokens themselves live with the design system, in
`cre8-wc/design-tokens/brands/<brand>/`, so this module reads them rather than
restating them. One source of truth: editing the brand file reskins both the
Storybook build and every mcp-ui page.

Layering matters, and getting it wrong is not subtle. The CDN bundle ships
component *styles* but no token *values* — every rule is
`padding: var(--cre8-button-padding-vertical-medium)` and similar. A page that
inlines only a brand's colour overrides therefore renders components with the
right palette and no padding, no type scale and no line heights: buttons
collapse around their label and every heading falls back to body size.

So a theme is assembled in three layers, later winning over earlier:

    1. type layer       <base>/tokens_<base>.css — type scale, spacing
    2. component layer  <base>/tokens_brand.css  — per-component values
    3. the brand itself <brand>/tokens_brand.css

A brand file only has to state what it changes.

Which brands exist depends on where the tokens come from, and that varies more
than it looks: the cre8-wc 3.x line ships three (blank, cre8, cre8-vivid),
while working branches of the design system carry a dozen or more. Nothing
here assumes a particular set. The base is chosen from whatever is present,
and a brand that is missing fails loudly with the brands that do exist — plus,
when a judge is configured, a suggestion of which one was probably meant (see
`cre8_mcp_ui.brand_judge`).
"""

from __future__ import annotations

import base64
import os
import warnings
from pathlib import Path

from .brand_judge import BrandSuggestion, default_judge, describe_brands

# Where the tokens live, in the order they are tried. CRE8_WC_ROOT points at a
# cre8-wc checkout or an unpacked npm package; the two lay the tokens out
# differently, so both shapes are probed under it.
#
# The fallback is the monorepo sibling. It used to be the *only* option, which
# meant the package could not be used anywhere but inside the repo it was
# written in.
_TOKEN_SUBPATHS = ("design-tokens/brands", "lib/design-tokens/brands")


def _candidate_roots() -> list[Path]:
    roots: list[Path] = []
    env = os.environ.get("CRE8_WC_ROOT")
    if env:
        roots.append(Path(env).expanduser())
    # packages/cre8-mcp-ui/cre8_mcp_ui/theme.py -> packages/cre8-wc
    roots.append(Path(__file__).resolve().parent.parent.parent / "cre8-wc")
    return roots


def brands_dir() -> Path:
    """The directory holding one sub-directory per brand.

    Resolved on every call rather than at import, so setting CRE8_WC_ROOT after
    import (as tests and long-lived servers do) takes effect.
    """
    tried: list[str] = []
    for root in _candidate_roots():
        for sub in _TOKEN_SUBPATHS:
            d = root / sub
            tried.append(str(d))
            if d.is_dir():
                return d
    raise FileNotFoundError(
        "Could not find cre8 design tokens. Set CRE8_WC_ROOT to a cre8-wc "
        "checkout or an unpacked @tmorrow/cre8-wc package. Looked in:\n  "
        + "\n  ".join(tried)
    )


def available_brands() -> list[str]:
    d = brands_dir()
    return sorted(p.name for p in d.iterdir() if (p / "css" / "tokens_brand.css").is_file())


def is_complete(brand: str) -> bool:
    """A complete brand supplies both layers, so it can stand as a base."""
    css = brands_dir() / brand / "css"
    return (css / f"tokens_{brand}.css").is_file() and (css / "tokens_brand.css").is_file()


# Preferred bases, most specific first. `minimalist` is what Regal Bank was
# designed on; `blank` is the unbranded complete brand the 3.x line ships;
# `whitelabel` filled that role in 2.x. This is an ordered preference over known
# names, which is code's job — no judgment is needed to pick among them.
_BASE_PREFERENCE = ("minimalist", "blank", "whitelabel")


def default_base() -> str:
    for name in _BASE_PREFERENCE:
        if is_complete(name):
            return name
    complete = [b for b in available_brands() if is_complete(b)]
    if complete:
        return complete[0]
    raise FileNotFoundError(
        f"No complete brand to use as a base in {brands_dir()}. A base needs both "
        f"tokens_<name>.css and tokens_brand.css."
    )


def demo_brand(preferred: str = "regal", fallback: str = "cre8") -> str:
    """The brand the bundled Regal Bank page is themed with.

    An explicit CRE8_MCP_UI_BRAND always wins, and fails loudly if it names a
    brand that does not exist. Otherwise Regal's own brand where it is
    installed, and the flagship `cre8` brand on the 3.x line, which ships
    without it. Callers log the choice; it is a stated default, not a silent
    substitution.
    """
    explicit = os.environ.get("CRE8_MCP_UI_BRAND")
    if explicit:
        return explicit
    available = available_brands()
    for name in (preferred, fallback):
        if name in available:
            return name
    return default_base()


# Kept for callers that read it. `None` means "choose from what is installed";
# a fixed name here is what broke when the brand set changed underneath it.
DEFAULT_BASE: str | None = None

_CACHE: dict[tuple[Path, str, bool, str], str] = {}

# Aeonik ships with the minimalist brand as woff2. It is embedded as data: URIs
# rather than linked, because an mcp-ui resource is a single HTML document with
# no companion assets to serve, and hosts commonly forbid external requests
# (the cre8 marketing site, for instance, sets `font-src 'self'`). Embedding is
# the only form that survives both. Where minimalist is absent — the 3.x line —
# there is nothing to embed and pages use the brand's font stack.
_FONT_FACES = (
    ("Aeonik", 300, "minimalist/assets/fonts/Aeonik-Light.woff2"),
    ("Aeonik", 400, "minimalist/assets/fonts/Aeonik-Regular.woff2"),
    ("Aeonik", 700, "minimalist/assets/fonts/Aeonik-Bold.woff2"),
)


def _embedded_fonts() -> str:
    root = brands_dir()
    out = []
    for family, weight, rel in _FONT_FACES:
        path = root / rel
        if not path.is_file():
            continue
        b64 = base64.b64encode(path.read_bytes()).decode("ascii")
        out.append(
            f"@font-face{{font-family:'{family}';font-style:normal;"
            f"font-weight:{weight};font-display:swap;"
            f"src:url(data:font/woff2;base64,{b64}) format('woff2');}}"
        )
    return "\n".join(out)


# Page-level, not brand-level: the full-bleed override for the shell's
# #cre8-root padding. Kept out of the token file so that stays tokens.
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


class UnknownBrandError(FileNotFoundError):
    """A requested brand has no token file. Carries any suggestion made."""

    def __init__(self, message: str, *, suggestion: BrandSuggestion | None) -> None:
        super().__init__(message)
        self.suggestion = suggestion


def _missing_brand(brand: str, judge) -> tuple[str, BrandSuggestion | None]:
    available = available_brands()
    suggestion = _deterministic_match(brand, available)
    if suggestion is None and judge is not None:
        # The judge is advice inside an error path. If it fails, the caller
        # still needs the real error, not the judge's.
        try:
            suggestion = judge(brand, describe_brands(brands_dir(), available))
        except Exception:  # noqa: BLE001
            suggestion = None
    msg = (
        f"No token file for brand {brand!r} under {brands_dir()}. "
        f"Available brands: {', '.join(available)}."
    )
    if suggestion and suggestion.brand:
        msg += (
            f" Did you mean {suggestion.brand!r}? "
            f"({suggestion.source}, confidence {suggestion.confidence:.2f})"
        )
    elif suggestion:
        msg += f" No available brand looks like a match ({suggestion.source})."
    return msg, suggestion


# Brands that were renamed rather than removed. This is history, not judgment:
# nothing in a brand's name or token values says that `whitelabel` became
# `blank`, and Jev, asked live, said no match. The evidence is that 3.0 removed
# whitelabel and added blank with identical identity — slate #475569 primary,
# system font stack, 8px radius, all eleven seeds.
_KNOWN_RENAMES = {"whitelabel": "blank"}


def _normalise(name: str) -> str:
    return "-".join(name.strip().lower().replace("_", " ").split())


def _deterministic_match(brand: str, available: list[str]) -> BrandSuggestion | None:
    """Spelling variants and known renames: lookups, so they never reach a model."""
    wanted = _normalise(brand)
    for name in available:
        if _normalise(name) == wanted:
            return BrandSuggestion(name, 1.0, "spelling")
    renamed = _KNOWN_RENAMES.get(wanted)
    if renamed in available:
        return BrandSuggestion(renamed, 1.0, "known rename")
    return None


_USE_DEFAULT_JUDGE = object()


def load_brand_theme(
    brand: str,
    *,
    page_extras: bool = True,
    with_base: bool = True,
    base: str | None = DEFAULT_BASE,
    judge=_USE_DEFAULT_JUDGE,
    auto_resolve: bool = False,
    min_confidence: float = 0.8,
) -> str:
    """Return the CSS for a brand, ready to pass as `theme_css`.

    A brand that does not exist raises UnknownBrandError naming the searched
    path and the brands that do exist — a silent empty theme is worse than a
    loud miss, because the page still renders and merely looks like the default
    skin.

    Brand names drift (regal, minimalist and whitelabel have all come and gone),
    and requests often arrive from a model's tool call rather than a constant. So
    a miss can be passed to a *judge* that picks which available brand was most
    likely meant, or none. By default that is Jev when TYPESAFE_API_KEY is set,
    and nothing otherwise; pass `judge=None` to disable it.

    The suggestion only ever goes into the error message, unless the caller
    opts in with `auto_resolve=True`. Even then it is applied only above
    `min_confidence`, and a warning is emitted so a substitution is never
    silent.
    """
    root = brands_dir()
    base_name = base or default_base()
    brand_file = root / brand / "css" / "tokens_brand.css"

    if not brand_file.is_file():
        active_judge = default_judge() if judge is _USE_DEFAULT_JUDGE else judge
        msg, suggestion = _missing_brand(brand, active_judge)
        if (
            auto_resolve
            and suggestion is not None
            and suggestion.brand
            and suggestion.confidence >= min_confidence
        ):
            warnings.warn(
                f"Brand {brand!r} does not exist; using {suggestion.brand!r} "
                f"({suggestion.source}, confidence {suggestion.confidence:.2f}).",
                stacklevel=2,
            )
            return load_brand_theme(
                suggestion.brand,
                page_extras=page_extras,
                with_base=with_base,
                base=base_name,
                judge=None,
            )
        raise UnknownBrandError(msg, suggestion=suggestion)

    key = (root, brand, with_base, base_name)
    if key not in _CACHE:
        layers: list[str] = []
        if with_base:
            base_css = root / base_name / "css"
            layers += [_read(base_css / f"tokens_{base_name}.css"), _read(base_css / "tokens_brand.css")]
        # Loading the base by name used to emit its brand file twice.
        if not (with_base and brand == base_name):
            layers.append(_read(brand_file))
        _CACHE[key] = "\n".join(layers)

    css = _CACHE[key]
    if not page_extras:
        return css
    return "\n".join((_embedded_fonts(), _PAGE_EXTRAS_TAIL, css))


def __getattr__(name: str) -> str:
    # This was a module-level constant, so `import cre8_mcp_ui` read files from
    # disk and raised whenever the regal brand was absent — which it is from the
    # whole 3.x line. Callers that never touched Regal still could not import
    # the package. It is now resolved on first access.
    if name == "REGAL_THEME_CSS":
        return load_brand_theme("regal")
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")


__all__ = [
    "load_brand_theme",
    "available_brands",
    "brands_dir",
    "default_base",
    "demo_brand",
    "is_complete",
    "UnknownBrandError",
    "REGAL_THEME_CSS",
    "DEFAULT_BASE",
]
