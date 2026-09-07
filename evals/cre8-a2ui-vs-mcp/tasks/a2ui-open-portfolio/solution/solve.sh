#!/bin/bash
# There is no reference solution for an open brief: any spec built from real
# components is a valid answer, so the oracle agent only demonstrates that the
# harness runs. It writes the smallest well-formed spec that scores 1.000 on
# every fidelity dimension.
set -euo pipefail
mkdir -p /app
cp /solution/ui.a2ui.json /app/ui.a2ui.json
