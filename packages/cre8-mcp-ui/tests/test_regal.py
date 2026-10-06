"""Tests for the additions this package makes over the skill's helper:
`children` support in the renderer, theme layering, and the Regal Bank page.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from cre8_mcp_ui import build_ui_resource as biu  # noqa: E402
from cre8_mcp_ui.pages import regal_home_schema  # noqa: E402
from cre8_mcp_ui.theme import load_brand_theme  # noqa: E402

# These check Regal Bank's own identity (navy primary, square corners, Aeonik),
# not the library. Regal ships with this package, so they always run. Library
# behaviour that does not depend on a particular brand is covered in
# test_theme_resolution.py.


# ── renderer: `children` is the catalog's spelling for default content ──

def test_children_renders_as_default_slot():
    html = biu.render_schema(
        {"root": {"component": "cre8-heading", "props": {"tagVariant": "h2"},
                  "children": [{"text": "Hello"}]}}
    )
    assert html == '<cre8-heading tagVariant="h2">Hello</cre8-heading>'


def test_children_and_named_slots_coexist():
    html = biu.render_schema(
        {"root": {"component": "cre8-card",
                  "children": [{"text": "body"}],
                  "slots": {"header": [{"component": "cre8-heading",
                                        "children": [{"text": "Title"}]}]}}}
    )
    assert 'slot="header"' in html
    assert "body" in html
    assert "Title" in html


def test_children_appends_after_existing_default_slot():
    html = biu.render_schema(
        {"root": {"component": "div",
                  "slots": {"default": [{"text": "first"}]},
                  "children": [{"text": "second"}]}}
    )
    assert html == "<div>firstsecond</div>"


def test_scalar_children_is_accepted():
    html = biu.render_schema(
        {"root": {"component": "div", "children": {"text": "solo"}}}
    )
    assert html == "<div>solo</div>"


# ── theme layering ──

def test_regal_theme_layers_over_the_minimalist_base():
    css = load_brand_theme("regal")
    # A token only the base defines survives...
    assert "--cre8-button-padding-vertical-medium" in css
    # ...and one both define resolves to the Regal value, because the brand
    # layer is emitted last and CSS takes the final declaration.
    values = re.findall(r"--cre8-color-button-primary-bg:\s*([^;]+);", css)
    assert values[-1].strip() == "#132342"
    # square corners are the brand's load-bearing signal
    radii = re.findall(r"--cre8-border-radius-button:\s*([^;]+);", css)
    assert radii[-1].strip() == "0px"


def test_theme_without_base_is_only_the_brand():
    css = load_brand_theme("regal", with_base=False, page_extras=False)
    assert "--cre8-color-button-primary-bg" in css
    assert "--cre8-button-padding-vertical-medium" not in css


def test_unknown_brand_fails_loudly():
    with pytest.raises(FileNotFoundError, match="No token file for brand"):
        load_brand_theme("not-a-brand", judge=None)


# ── the page ──

def test_regal_home_renders():
    html = biu.render_schema(regal_home_schema())
    assert html.startswith("<cre8-main>")
    assert "Crown Checking" in html


def test_every_button_carries_a_text_label():
    """cre8-button renders ${this.text} and has no default slot, so a button
    without a text prop is an invisible label."""
    html = biu.render_schema(regal_home_schema())
    for tag in re.findall(r"<cre8-button[^>]*>", html):
        assert "text=" in tag, f"button without a text label: {tag}"


def test_declared_tools_are_implemented_by_the_server():
    html = biu.render_schema(regal_home_schema())
    referenced = set(re.findall(r'data-cre8-action="tool:([^"]+)"', html))
    import server

    implemented = {"open_account", "log_in", "explore_product", "find_branch"}
    assert referenced, "page declares no tool actions"
    assert referenced <= implemented, f"unimplemented: {referenced - implemented}"
    assert referenced <= set(dir(server))


def test_form_fields_are_inside_a_form_scope():
    """The bridge harvests [name] fields from the closest form scope; a field
    outside one silently contributes nothing to the tool call."""
    html = biu.render_schema(regal_home_schema())
    assert 'data-cre8-form-scope' in html
    # every named field should appear after some form-scope opener
    for m in re.finditer(r'<cre8-field[^>]*name="([^"]+)"', html):
        before = html[: m.start()]
        assert "data-cre8-form-scope" in before, f"{m.group(1)} has no scope"


def test_no_real_brand_names_leak_into_the_page():
    """Regal Bank is fictional on purpose; a real bank's marks must not appear."""
    html = biu.render_schema(regal_home_schema())
    for mark in ("Regions", "LifeGreen", "LockIt", "Zelle", "JD Power"):
        assert mark not in html, f"real-brand mark leaked: {mark}"


def test_theme_makes_no_external_requests():
    """The website CSP is default-src 'self'; an @import or remote font would
    silently fail there, so the theme must be self-contained."""
    from cre8_mcp_ui.theme import REGAL_THEME_CSS
    for bad in ("fonts.googleapis", "http://", "https://"):
        assert bad not in REGAL_THEME_CSS, f"external reference in theme: {bad}"
    assert REGAL_THEME_CSS.count("@font-face") == 3
