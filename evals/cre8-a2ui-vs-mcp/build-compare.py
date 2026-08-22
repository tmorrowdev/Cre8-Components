#!/usr/bin/env python3
"""Render the same arm's output before and after a cre8-mcp version, side by side.

    python3 build-compare.py jobs/prekb-mcp231 jobs/cre8-a2ui-vs-mcp__cre8-mcp \
        --pre-version 2.3.1 --post-version 2.3.2 -o compare.html

Both sides render at the same canvas width and the same brand, so the only
variable left is the spec the agent wrote. A reward delta says whether a
release moved the number; this says whether it moved the page.
"""

import argparse
import json
from pathlib import Path

HERE = Path(__file__).parent
WC = HERE.parents[1] / "packages" / "cre8-wc"

# Reuse the gallery's loaders rather than restating them: same trial layout,
# same oracle-trial filter, same median-not-best selection rule.
import importlib.util

_spec = importlib.util.spec_from_file_location("build_gallery", HERE / "build-gallery.py")
_gallery = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_gallery)


def side(jobs_dir: Path, arm: str = "cre8-mcp") -> dict:
    trials = _gallery.collect(jobs_dir)
    out = {}
    for (task, trial_arm), entries in trials.items():
        if trial_arm != arm:
            continue
        chosen = _gallery.pick(entries)
        if chosen:
            out[task] = chosen
    return out


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pre_jobs", type=Path)
    parser.add_argument("post_jobs", type=Path)
    parser.add_argument("--pre-version", default="2.3.1")
    parser.add_argument("--post-version", default="2.3.2")
    parser.add_argument("--model", default="claude-opus-5")
    parser.add_argument("-o", "--output", type=Path, default=HERE / "compare.html")
    args = parser.parse_args()

    pre, post = side(args.pre_jobs), side(args.post_jobs)
    tasks = sorted(set(pre) | set(post))
    if not tasks:
        print("no cre8-mcp trials found in one of the job directories")
        return 1

    payload = {
        "tasks": tasks,
        "pre": pre,
        "post": post,
        "preVersion": args.pre_version,
        "postVersion": args.post_version,
        "model": args.model,
        "defaultBrand": _gallery.DEFAULT_BRAND,
        "propKinds": _gallery.prop_kinds(),
    }

    bundle = (WC / "cdn" / "cre8-wc.esm.js").read_text().replace(
        "//# sourceMappingURL=cre8-wc.esm.js.map", ""
    )
    brands_dir = WC / "design-tokens" / "brands"
    brand = next(b for b in _gallery.BRANDS if b["id"] == _gallery.DEFAULT_BRAND)
    tokens = ""
    for layer in brand["layers"]:
        css = brands_dir / layer / "css"
        for sheet in (css / "tokens_brand.css", css / f"tokens_{layer}.css"):
            if sheet.exists():
                tokens += sheet.read_text().replace(":root", ".specimen")

    html = (HERE / "compare-template.html").read_text()
    html = html.replace("/*__TOKENS__*/", tokens)
    html = html.replace("/*__DATA__*/", json.dumps(payload))
    html = html.replace("/*__BUNDLE__*/", bundle)
    args.output.write_text(html)

    same = sum(
        1 for t in tasks
        if t in pre and t in post and json.dumps(pre[t]["spec"], sort_keys=True) == json.dumps(post[t]["spec"], sort_keys=True)
    )
    print(f"wrote {args.output} ({args.output.stat().st_size / 1_000_000:.1f} MB)")
    print(f"{len(tasks)} tasks — {same} byte-identical, {len(tasks) - same} differ")
    for t in tasks:
        a, b = pre.get(t), post.get(t)
        print(f"  {t:<26} {args.pre_version} {a['reward']:.3f} → {args.post_version} {b['reward']:.3f}"
              if a and b else f"  {t:<26} missing a side")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
