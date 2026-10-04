"""Theme resolution against brand sets the package did not ship with.

The tokens come from wherever cre8-wc is: a working branch with a dozen brands,
or a published 3.x package with three, laid out under `lib/`. These tests build
small brand trees on disk so every case is deterministic and none touches the
network — the Jev judge is exercised through a fake client.
"""

from __future__ import annotations

import importlib.util
import os
import subprocess
import sys
import warnings
from pathlib import Path
from types import SimpleNamespace

import pytest

PKG_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PKG_ROOT))

from cre8_mcp_ui import build_ui_resource as biu  # noqa: E402
from cre8_mcp_ui import theme  # noqa: E402
from cre8_mcp_ui.brand_judge import (  # noqa: E402
    NO_MATCH,
    BrandSuggestion,
    JevBrandJudge,
    default_judge,
    describe_brands,
)


def _brand(root: Path, name: str, *, complete: bool, body: str = "") -> None:
    css = root / name / "css"
    css.mkdir(parents=True)
    (css / "tokens_brand.css").write_text(f":root{{--cre8-brand-marker:{name};{body}}}")
    if complete:
        (css / f"tokens_{name}.css").write_text(f":root{{--cre8-type-marker:{name};}}")


@pytest.fixture
def tokens(tmp_path, monkeypatch):
    """A cre8-wc root laid out like a published package (tokens under lib/)."""
    brands = tmp_path / "lib" / "design-tokens" / "brands"
    _brand(brands, "blank", complete=True, body="--cre8-seed-primary:#0070c9;--cre8-seed-radius:4px;")
    _brand(brands, "cre8", complete=True, body="--cre8-seed-primary:#4f46e5;")
    _brand(brands, "accent", complete=False, body="--cre8-color-button-primary-bg:var(--x);")
    monkeypatch.setenv("CRE8_WC_ROOT", str(tmp_path))
    monkeypatch.setattr(theme, "_candidate_roots", lambda: [tmp_path])
    monkeypatch.delenv("TYPESAFE_API_KEY", raising=False)
    theme._CACHE.clear()
    yield brands
    theme._CACHE.clear()


# ── where the tokens are ──

def test_installed_package_layout_is_found(tokens):
    assert theme.brands_dir() == tokens


def test_repo_layout_is_found(tmp_path, monkeypatch):
    brands = tmp_path / "design-tokens" / "brands"
    _brand(brands, "blank", complete=True)
    monkeypatch.setattr(theme, "_candidate_roots", lambda: [tmp_path])
    assert theme.brands_dir() == brands


def test_cre8_wc_root_env_is_honoured(tmp_path, monkeypatch):
    brands = tmp_path / "lib" / "design-tokens" / "brands"
    _brand(brands, "blank", complete=True)
    monkeypatch.setenv("CRE8_WC_ROOT", str(tmp_path))
    assert theme._candidate_roots()[0] == tmp_path


def test_missing_tokens_names_every_place_searched(tmp_path, monkeypatch):
    monkeypatch.setattr(theme, "_candidate_roots", lambda: [tmp_path])
    with pytest.raises(FileNotFoundError, match="Set CRE8_WC_ROOT") as err:
        theme.brands_dir()
    assert "lib/design-tokens/brands" in str(err.value)


# ── the base is chosen from what is present ──

def test_base_prefers_minimalist_when_present(tokens):
    _brand(tokens, "minimalist", complete=True)
    assert theme.default_base() == "minimalist"


def test_base_falls_back_to_blank(tokens):
    assert theme.default_base() == "blank"


def test_base_falls_back_to_any_complete_brand(tmp_path, monkeypatch):
    brands = tmp_path / "design-tokens" / "brands"
    _brand(brands, "solo", complete=True)
    _brand(brands, "partial", complete=False)
    monkeypatch.setattr(theme, "_candidate_roots", lambda: [tmp_path])
    assert theme.default_base() == "solo"


def test_layers_put_the_brand_last(tokens):
    css = theme.load_brand_theme("cre8", page_extras=False)
    assert css.index("--cre8-type-marker:blank") < css.index("--cre8-brand-marker:blank")
    assert css.index("--cre8-brand-marker:blank") < css.index("--cre8-brand-marker:cre8")


def test_loading_the_base_by_name_emits_it_once(tokens):
    css = theme.load_brand_theme("blank", page_extras=False)
    assert css.count("--cre8-brand-marker:blank") == 1


def test_cache_follows_the_token_root(tokens, tmp_path, monkeypatch):
    first = theme.load_brand_theme("cre8", page_extras=False)
    other = tmp_path / "other"
    _brand(other / "design-tokens" / "brands", "blank", complete=True)
    _brand(other / "design-tokens" / "brands", "cre8", complete=True, body="--changed:1;")
    monkeypatch.setattr(theme, "_candidate_roots", lambda: [other])
    assert theme.load_brand_theme("cre8", page_extras=False) != first


# ── importing must not require any particular brand ──

def test_package_imports_without_the_regal_brand(tmp_path):
    brands = tmp_path / "lib" / "design-tokens" / "brands"
    _brand(brands, "blank", complete=True)
    probe = (
        "import cre8_mcp_ui\n"
        "from cre8_mcp_ui.theme import UnknownBrandError\n"
        "try:\n"
        "    cre8_mcp_ui.REGAL_THEME_CSS\n"
        "except UnknownBrandError:\n"
        "    print('lazy')\n"
    )
    env = {**os.environ, "CRE8_WC_ROOT": str(tmp_path), "PYTHONPATH": str(PKG_ROOT)}
    env.pop("TYPESAFE_API_KEY", None)
    # Run where the monorepo sibling cannot be found, so only CRE8_WC_ROOT counts.
    out = subprocess.run(
        [sys.executable, "-c", probe], cwd=tmp_path, env=env,
        capture_output=True, text=True, check=False,
    )
    assert out.returncode == 0, out.stderr
    assert out.stdout.strip() == "lazy"


# ── unknown brands, with and without a judge ──

def test_unknown_brand_is_loud_and_lists_what_exists(tokens):
    with pytest.raises(theme.UnknownBrandError, match="Available brands: accent, blank, cre8") as err:
        theme.load_brand_theme("regal", judge=None)
    assert err.value.suggestion is None


def test_no_key_means_no_judge_and_no_network(tokens):
    assert default_judge() is None
    with pytest.raises(theme.UnknownBrandError) as err:
        theme.load_brand_theme("regal")
    assert err.value.suggestion is None


def _fixed(brand, confidence):
    return lambda requested, profiles: BrandSuggestion(brand, confidence, "fake")


def test_suggestion_goes_into_the_error(tokens):
    with pytest.raises(theme.UnknownBrandError, match=r"Did you mean 'blank'\?") as err:
        theme.load_brand_theme("minimalist", judge=_fixed("blank", 0.91))
    assert err.value.suggestion.brand == "blank"


def test_suggestion_is_not_applied_without_opt_in(tokens):
    with pytest.raises(theme.UnknownBrandError):
        theme.load_brand_theme("minimalist", judge=_fixed("blank", 0.99))


def test_auto_resolve_applies_a_confident_suggestion_and_warns(tokens):
    with warnings.catch_warnings(record=True) as caught:
        warnings.simplefilter("always")
        css = theme.load_brand_theme(
            "minimalist", judge=_fixed("blank", 0.9), auto_resolve=True, page_extras=False,
        )
    assert "--cre8-brand-marker:blank" in css
    assert any("using 'blank'" in str(w.message) for w in caught)


def test_auto_resolve_refuses_a_doubtful_suggestion(tokens):
    with pytest.raises(theme.UnknownBrandError):
        theme.load_brand_theme("regal", judge=_fixed("cre8", 0.42), auto_resolve=True)


def test_no_match_is_reported_and_never_applied(tokens):
    with pytest.raises(theme.UnknownBrandError, match="No available brand looks like a match"):
        theme.load_brand_theme("regal", judge=_fixed(None, 0.95), auto_resolve=True)


def test_a_failing_judge_does_not_hide_the_real_error(tokens):
    def broken(requested, profiles):
        raise RuntimeError("judge exploded")

    with pytest.raises(theme.UnknownBrandError, match="No token file for brand 'regal'"):
        theme.load_brand_theme("regal", judge=broken)


# ── what the judge is shown ──

def test_profiles_are_read_from_the_token_files(tokens):
    profiles = describe_brands(tokens, ["blank", "accent"])
    assert "primary colour #0070c9" in profiles["blank"]
    assert "corner radius 4px" in profiles["blank"]
    assert "complete brand" in profiles["blank"]
    assert "derived brand" in profiles["accent"]
    # A bare var() reference says nothing about the look and is left out.
    assert "var(" not in profiles["accent"]


# ── the Jev judge, through a fake client ──

class _FakeClient:
    def __init__(self, choice=None, *, error=None):
        self.choice, self.error, self.calls = choice, error, []

    def system_one(self, *, state, questions, timeout):
        self.calls.append((state, questions))
        if self.error:
            raise self.error
        answer = SimpleNamespace(
            choice=self.choice, confidence=0.87, probabilities={self.choice: 0.9},
        )
        return SimpleNamespace(choices={"brand": answer})


needs_sdk = pytest.mark.skipif(
    importlib.util.find_spec("typesafe_sdk") is None,
    reason="typesafe-sdk not installed (pip install .[judge])",
)


@needs_sdk
def test_jev_question_offers_every_brand_and_a_no_match():
    client = _FakeClient("blank")
    JevBrandJudge(client)("minimalist", {"blank": "Brand 'blank'", "cre8": "Brand 'cre8'"})
    state, questions = client.calls[0]
    assert state == {"requested_brand": "minimalist"}
    criteria = questions["brand"].criteria
    assert set(criteria) == {"blank", "cre8", NO_MATCH}


@needs_sdk
def test_jev_choice_becomes_a_suggestion():
    out = JevBrandJudge(_FakeClient("blank"))("minimalist", {"blank": "b", "cre8": "c"})
    assert out == BrandSuggestion("blank", 0.87, "Jev", {"blank": 0.9})


@needs_sdk
def test_jev_no_match_is_none():
    out = JevBrandJudge(_FakeClient(NO_MATCH))("regal", {"blank": "b"})
    assert out.brand is None


@needs_sdk
def test_jev_unknown_answer_is_not_trusted():
    out = JevBrandJudge(_FakeClient("invented"))("regal", {"blank": "b"})
    assert out.brand is None


@needs_sdk
def test_jev_service_failure_returns_nothing():
    from typesafe_sdk import TypeSafeError

    assert JevBrandJudge(_FakeClient(error=TypeSafeError("down")))("regal", {"blank": "b"}) is None
    assert JevBrandJudge(_FakeClient(error=OSError("no network")))("regal", {"blank": "b"}) is None


# ── the component bundle ──

def test_shell_loads_the_pinned_bundle(monkeypatch):
    monkeypatch.delenv("CRE8_WC_CDN", raising=False)
    html = biu.wrap_in_shell("<p>x</p>")
    assert f"@tmorrow/cre8-wc@{biu.CRE8_WC_VERSION}/cdn/cre8-wc.esm.js" in html
    assert "2.0.7" not in html


def test_shell_bundle_is_overridable(monkeypatch):
    monkeypatch.setenv("CRE8_WC_CDN", "/vendor/cre8-wc.esm.js")
    assert 'src="/vendor/cre8-wc.esm.js"' in biu.wrap_in_shell("<p>x</p>")


def test_body_cannot_move_the_bundle_placeholder(monkeypatch):
    monkeypatch.setenv("CRE8_WC_CDN", "/vendor/real.js")
    html = biu.wrap_in_shell("{{cre8_wc_src}}")
    assert html.count("/vendor/real.js") == 1


# ── lookups that never reach the judge ──

def _never(requested, profiles):
    raise AssertionError("the judge should not be consulted")


def test_spelling_variants_resolve_without_a_model(tokens):
    _brand(tokens, "cre8-vivid", complete=True)
    with pytest.raises(theme.UnknownBrandError, match=r"Did you mean 'cre8-vivid'\? \(spelling") as err:
        theme.load_brand_theme("Cre8 Vivid", judge=_never)
    assert err.value.suggestion.confidence == 1.0


def test_known_rename_resolves_without_a_model(tokens):
    with pytest.raises(theme.UnknownBrandError, match=r"Did you mean 'blank'\? \(known rename"):
        theme.load_brand_theme("whitelabel", judge=_never)


def test_known_rename_still_needs_opt_in_but_then_applies(tokens):
    with warnings.catch_warnings(record=True):
        warnings.simplefilter("always")
        css = theme.load_brand_theme("whitelabel", judge=_never, auto_resolve=True, page_extras=False)
    assert "--cre8-brand-marker:blank" in css
