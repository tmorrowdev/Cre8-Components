from .brand_judge import BrandSuggestion, JevBrandJudge
from .build_ui_resource import CRE8_WC_VERSION, from_html, from_schema, render_schema, wrap_in_shell
from .theme import UnknownBrandError, available_brands, load_brand_theme


def __getattr__(name: str):
    # Resolved on access: importing the package must not require the Regal
    # brand to exist, and on the cre8-wc 3.x line it does not.
    if name == "REGAL_THEME_CSS":
        from .theme import REGAL_THEME_CSS

        return REGAL_THEME_CSS
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")


__all__ = [
    "from_html",
    "from_schema",
    "render_schema",
    "wrap_in_shell",
    "load_brand_theme",
    "available_brands",
    "UnknownBrandError",
    "BrandSuggestion",
    "JevBrandJudge",
    "CRE8_WC_VERSION",
    "REGAL_THEME_CSS",
]
