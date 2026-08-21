#!/usr/bin/env bash
# Run all three arms and write the comparison. This is the whole headline:
#
#   ./run-all.sh                 # three arms, defaults from arms/*.yaml
#   ./run-all.sh -n 8            # extra flags are passed through to harbor run
#
# Needs a reachable Docker daemon and credentials for the agent
# (ANTHROPIC_API_KEY, or whatever your harbor agent setup expects).
# prepare.sh gates on the parts it can check.
set -euo pipefail

cd "$(dirname "$0")"

if ! ./prepare.sh; then
    echo
    echo "prepare.sh reported a problem. Fix it before running the arms -" >&2
    echo "an arm that silently loses its skill or MCP server is not a comparison." >&2
    exit 1
fi

for arm in baseline a2ui-skill cre8-mcp; do
    echo
    echo "══ arm: $arm ══"
    harbor run -c "arms/$arm.yaml" "$@"
done

echo
python3 compare.py jobs --markdown RESULTS.md --json results.json
echo
echo "RESULTS.md is the publishable table."
