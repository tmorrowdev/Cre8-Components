#!/usr/bin/env bash
# Get this checkout ready to run the eval, and refuse to pretend when it is not.
#
#   1. materialise the skill arms' input (the cre8-design skill) into .arm-inputs/
#   2. confirm the oracle fixtures in each task match the shipped library
#   3. run the host-side selftest, which proves the scorer still discriminates
#   4. report on the tooling a real run needs (harbor, docker, npx)
set -uo pipefail

cd "$(dirname "$0")"
status=0
say () { printf '%s\n' "$*"; }

# 1. design skill -------------------------------------------------------------
# The cre8-design skill is versioned in this repo rather than synced from
# ~/.claude, because unlike cre8-a2ui it is an input the eval owns: it carries
# design judgment and token architecture only, and deliberately restates no
# component API. See its own header for why that split exists.
DESIGN_SKILL=${CRE8_DESIGN_SKILL_PATH:-../../.claude/skills/cre8-design}
if [[ -f "$DESIGN_SKILL/SKILL.md" ]]; then
    rm -rf .arm-inputs/cre8-design
    mkdir -p .arm-inputs
    cp -R "$DESIGN_SKILL" .arm-inputs/cre8-design
    say "design skill: .arm-inputs/cre8-design  <- $DESIGN_SKILL"
else
    say "design skill: NOT FOUND at $DESIGN_SKILL."
    say "              arms/cre8-mcp-design-freecode.yaml cannot run until it resolves."
    status=1
fi

# 1b. proxy CA -----------------------------------------------------------------
CA_SOURCE=""
for candidate in "${CRE8_EVAL_PROXY_CA:-}" /root/.ccr/ca-bundle.crt "${SSL_CERT_FILE:-}" "${NODE_EXTRA_CA_CERTS:-}"; do
    [[ -n $candidate && -f $candidate ]] && { CA_SOURCE=$candidate; break; }
done

if [[ -n $CA_SOURCE ]]; then
    for task in tasks/*/; do
        [[ -f "$task/task.toml" ]] || continue
        mkdir -p "$task/environment/ca"
        cp "$CA_SOURCE" "$task/environment/ca/proxy-ca.crt"
    done
    say "proxy CA:     installed into every task image from $CA_SOURCE"
else
    rm -f tasks/*/environment/ca/proxy-ca.crt
    say "proxy CA:     none on this host - task images trust the system roots only"
fi

# 2. oracle --------------------------------------------------------------------
if ./sync-oracle.sh --check >/dev/null 2>&1; then
    say "oracle:       fixtures in sync with packages/cre8-wc/a2ui"
else
    say "oracle:       fixtures have drifted - run ./sync-oracle.sh and commit the result"
    status=1
fi

# 3. selftest ------------------------------------------------------------------
say ""
if ./selftest.sh; then
    say ""
    say "selftest:     pass"
else
    say ""
    say "selftest:     FAIL - the scorer no longer behaves as this eval claims"
    status=1
fi

# 4. tooling -------------------------------------------------------------------
say ""
if [[ -n ${ANTHROPIC_API_KEY:-} ]]; then
    say "agent auth:   ANTHROPIC_API_KEY set"
elif [[ -n ${CLAUDE_CODE_OAUTH_TOKEN:-} ]]; then
    say "agent auth:   CLAUDE_CODE_OAUTH_TOKEN set$([[ -n ${CLAUDE_FORCE_OAUTH:-} ]] && echo " (CLAUDE_FORCE_OAUTH on)" || echo " - also set CLAUDE_FORCE_OAUTH=1 to use it")"
else
    say "agent auth:   none found. The three model arms need either"
    say "              ANTHROPIC_API_KEY, or a subscription token from"
    say "              \`claude setup-token\` in CLAUDE_CODE_OAUTH_TOKEN with"
    say "              CLAUDE_FORCE_OAUTH=1. Not needed for \`-a oracle\`."
fi

say ""
for tool in harbor docker npx; do
    if command -v "$tool" >/dev/null 2>&1; then
        say "$tool: $(command -v "$tool")"
    else
        say "$tool: missing"
        [[ $tool == npx ]] || status=1
    fi
done
if command -v docker >/dev/null 2>&1 && ! docker info >/dev/null 2>&1; then
    say "docker: installed but not reachable - trials cannot start"
    status=1
elif command -v docker >/dev/null 2>&1; then
    # A reachable daemon is not enough: a network that blocks the registry
    # fails every trial at build time, 15 identical RuntimeErrors deep. Find
    # out here instead.
    base=$(sed -n 's/^FROM //p' templates/Dockerfile | head -1)
    if timeout 180 docker pull -q "$base" >/dev/null 2>&1; then
        say "base image: $base pulled"
    else
        say "base image: cannot pull $base - registry unreachable or blocked."
        say "            The daemon is up, but every trial will fail at build time."
        status=1
    fi
fi

exit $status
