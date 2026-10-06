"""Which available brand did a caller mean?

Brand names drift. `regal`, `minimalist` and `whitelabel` have each existed and
then not, and the set that exists depends on whether tokens come from a working
branch of the design system or a published 3.x package. Requests for a brand
also arrive from a model's tool call as often as from a constant, so the name
asked for is frequently a description ("something minimal") or a name from an
older release.

Code handles everything that is a lookup: an exact name either exists or it
does not, and the identity of each available brand is read straight out of its
token file. The one step that needs understanding — "of these brands, which did
they mean, if any?" — goes to Jev, TypeSafe's System One model, as a single
Choice with an explicit no-match option.

The answer is advice. `theme.load_brand_theme` puts it in the error message and
only applies it when the caller opts in and the judgment is confident; a wrong
theme that renders is worse than a loud miss.
"""

from __future__ import annotations

import os
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable, Optional

NO_MATCH = "no match"


@dataclass(frozen=True)
class BrandSuggestion:
    """A judged guess at the intended brand. `brand` is None for no match."""

    brand: Optional[str]
    confidence: float
    source: str
    probabilities: dict[str, float] = field(default_factory=dict)


# (label, token names to try in order). The first token present wins. Seeds are
# preferred because they are the brand's stated identity; component tokens are
# the fallback for brands that predate the seed system.
_IDENTITY_TOKENS = (
    ("primary colour", ("--cre8-seed-primary", "--cre8-color-button-primary-bg", "--cre8-color-brand")),
    ("neutral colour", ("--cre8-seed-neutral", "--cre8-color-content-default")),
    ("font", ("--cre8-seed-font", "--cre8-typography-body-default-font-family", "--cre8-font-family")),
    ("corner radius", ("--cre8-seed-radius", "--cre8-border-radius-button", "--cre8-border-radius-default")),
)


def _first_value(css: str, token: str) -> Optional[str]:
    m = re.search(re.escape(token) + r"\s*:\s*([^;]+);", css)
    if not m:
        return None
    value = " ".join(m.group(1).split())
    # A value that is only a reference to another token says nothing about the
    # brand's look, and would mislead more than it informs.
    return None if value.startswith("var(") else value[:80]


def describe_brands(brands_dir: Path, names: list[str]) -> dict[str, str]:
    """A one-line identity per brand, read from its own token files."""
    out: dict[str, str] = {}
    for name in names:
        css_dir = brands_dir / name / "css"
        css = "\n".join(
            p.read_text(encoding="utf-8")
            for p in (css_dir / "tokens_brand.css", css_dir / f"tokens_{name}.css")
            if p.is_file()
        )
        facts = []
        for label, tokens in _IDENTITY_TOKENS:
            value = next((v for t in tokens if (v := _first_value(css, t))), None)
            if value:
                facts.append(f"{label} {value}")
        complete = (css_dir / f"tokens_{name}.css").is_file()
        kind = "complete brand" if complete else "derived brand"
        out[name] = f"Brand '{name}' ({kind})" + (": " + "; ".join(facts) if facts else "")
    return out


Judge = Callable[[str, dict[str, str]], Optional[BrandSuggestion]]


class JevBrandJudge:
    """Asks Jev which available brand a request most plausibly refers to.

    Any failure — no network, bad key, rate limit, malformed reply — returns
    None. This runs inside an error path, and a service failure there must never
    replace the real error ("that brand does not exist") with an unrelated one.
    """

    source = "Jev"

    def __init__(self, client=None, *, timeout: float = 8.0) -> None:
        self._client = client
        self._timeout = timeout

    def __call__(self, requested: str, profiles: dict[str, str]) -> Optional[BrandSuggestion]:
        if not profiles:
            return None
        try:
            from typesafe_sdk import Choice, TypeSafeClient, TypeSafeError
        except ImportError:
            return None

        criteria: dict[str, str] = dict(profiles)
        criteria[NO_MATCH] = (
            "None of the available brands is a plausible match for what was "
            "requested, so substituting one would give the page the wrong identity."
        )
        question = Choice(
            instructions=(
                "A design-system brand was requested by the name in "
                "`requested_brand`, but no brand with that exact name exists. Some "
                "brands are renamed or removed between releases, and some requests "
                "describe a look rather than naming a brand. Choose the available "
                "brand the requester most plausibly meant, using both the brand "
                "names and their colours, font and corner radius. Choose the "
                "no-match option when none of them is a reasonable stand-in."
            ),
            criteria=criteria,
        )
        try:
            if self._client is not None:
                response = self._client.system_one(
                    state={"requested_brand": requested},
                    questions={"brand": question},
                    timeout=self._timeout,
                )
            else:
                with TypeSafeClient() as client:
                    response = client.system_one(
                        state={"requested_brand": requested},
                        questions={"brand": question},
                        timeout=self._timeout,
                    )
            answer = response.choices["brand"]
        except TypeSafeError:
            return None
        except Exception:  # noqa: BLE001 — see class docstring
            return None

        chosen = answer.choice
        probabilities = {k: float(v) for k, v in dict(answer.probabilities or {}).items()}
        return BrandSuggestion(
            brand=None if chosen == NO_MATCH or chosen not in profiles else chosen,
            confidence=float(answer.confidence),
            source=self.source,
            probabilities=probabilities,
        )


def default_judge() -> Optional[Judge]:
    """Jev when it is configured, otherwise nothing.

    Without a key this returns None rather than a judge that will fail, so a
    missing brand still produces the plain, deterministic error and no network
    call is attempted.
    """
    if not os.environ.get("TYPESAFE_API_KEY"):
        return None
    try:
        import typesafe_sdk  # noqa: F401
    except ImportError:
        return None
    return JevBrandJudge()


__all__ = ["BrandSuggestion", "JevBrandJudge", "NO_MATCH", "default_judge", "describe_brands"]
