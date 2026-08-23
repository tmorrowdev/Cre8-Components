#!/bin/bash
# Proves the render+DOM-audit scoring path discriminates, the same way the
# other tasks' selftest.sh proves oracle.py does for hand-authored A2UI JSON -
# but by actually building the task's own container image and running
# solution/solve.sh + tests/test.sh through it, not by reimplementing the
# scoring in this script. That distinction matters: an earlier version of
# this selftest called oracle.score_spec() directly against a locally-run
# serialize-dom.mjs and passed cleanly while tests/score.py itself was
# silently broken (it ran serialize-dom.mjs straight out of /tests, and
# Node's ESM resolver looks for jsdom relative to the *importing file's* own
# path, not cwd - since /tests isn't under /app, every real verifier run
# would have failed to find jsdom - `docker run` + the real entrypoint is
# what actually exercises the code path a real trial runs).
#
# Three fixtures against the same App.tsx-editing task:
#   1. solution/App.tsx (real cre8-react components, real slots, real enum
#      values)   -> expect reward 1.000, zero violations.
#   2. selftest/bad-App.tsx (an invalid slot name and an invalid enum value -
#      both loosely typed `any` in the react-wrappers, so they build cleanly
#      and only a live DOM read can catch them) -> expect reward < 1.000,
#      with slot_validity and enum_validity specifically flagged.
#   3. environment/app/src/App.tsx untouched (the placeholder every real
#      trial starts from) -> expect reward 0.000 (renders no cre8-* content).
#
# There's no fixture proving component_validity/prop_validity catch mistakes,
# unlike the JSON tasks' selftests: for honestly-typed React code, an unknown
# import or an unknown JSX prop is a *build failure*, not a scored violation -
# TypeScript already rejects it before serialize-dom.mjs ever runs.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

IMAGE=mcp-freecode-portfolio-selftest
docker build -q -t "$IMAGE" -f environment/Dockerfile environment/ >/dev/null

SCRATCH=$(mktemp -d)
trap 'rm -rf "$SCRATCH"' EXIT

run() {
    local name=$1 solution_dir=$2 app_tsx=$3
    docker run --rm \
        -v "$(pwd)/tests:/tests:ro" \
        -v "$solution_dir:/fixture:ro" \
        -v "$SCRATCH/$name:/logs/verifier" \
        "$IMAGE" \
        bash -c "mkdir -p /logs/verifier && cp /fixture/$app_tsx /app/src/App.tsx && bash /tests/test.sh"
}

reward_of() { python3 -c "import json; print(json.load(open('$SCRATCH/$1/reward.json'))['reward'])"; }

echo "== reference solution (expect reward 1.000) =="
run good "$(pwd)/solution" App.tsx
cat "$SCRATCH/good/reward.json"
GOOD_REWARD=$(reward_of good)

echo
echo "== bad fixture: invalid slot + invalid enum (expect reward < 1.000) =="
run bad "$(pwd)/selftest" bad-App.tsx
cat "$SCRATCH/bad/reward.json"
BAD_REWARD=$(reward_of bad)

echo
echo "== untouched placeholder (expect reward 0.000) =="
run placeholder "$(pwd)/environment/app/src" App.tsx
cat "$SCRATCH/placeholder/reward.json"
PLACEHOLDER_REWARD=$(reward_of placeholder)

echo
echo "== rich fixture: a real ~40-component agent submission (expect > 0) =="
run rich "$(pwd)/selftest" rich-App.tsx
cat "$SCRATCH/rich/reward.json"
RICH_REWARD=$(reward_of rich)
RICH_NODES=$(python3 -c "
import json
print(json.load(open('$SCRATCH/rich/report.json')).get('shape',{}).get('nodes',0))
")
echo "rich fixture nodes: $RICH_NODES"

echo
FAIL=0
python3 -c "exit(0 if $GOOD_REWARD == 1.0 else 1)" || { echo "FAIL: reference solution did not score 1.000"; FAIL=1; }
python3 -c "exit(0 if $BAD_REWARD < 1.0 else 1)" || { echo "FAIL: bad fixture did not score below 1.000"; FAIL=1; }
python3 -c "
import json
v = json.load(open('$SCRATCH/bad/report.json')).get('violations', {})
exit(0 if 'slot_validity' in v and 'enum_validity' in v else 1)
" || { echo "FAIL: bad fixture didn't flag both slot_validity and enum_validity"; FAIL=1; }
python3 -c "exit(0 if $PLACEHOLDER_REWARD == 0.0 else 1)" || { echo "FAIL: untouched placeholder did not score 0.000"; FAIL=1; }
# The regression assertion: a rich tree must survive the render at all. A 0
# here means the harness crashed, not that the code was bad - see the header
# comment in selftest/rich-App.tsx.
python3 -c "exit(0 if $RICH_REWARD > 0.0 else 1)" \
    || { echo "FAIL: rich fixture scored 0 - the render harness crashed on a realistic tree"; FAIL=1; }
python3 -c "exit(0 if $RICH_NODES > 50 else 1)" \
    || { echo "FAIL: rich fixture only produced $RICH_NODES nodes - the tree was truncated"; FAIL=1; }

if [[ $FAIL -eq 0 ]]; then
    echo "PASS: scorer discriminates (good=$GOOD_REWARD, bad=$BAD_REWARD, placeholder=$PLACEHOLDER_REWARD, rich=$RICH_REWARD over $RICH_NODES nodes)"
else
    exit 1
fi
