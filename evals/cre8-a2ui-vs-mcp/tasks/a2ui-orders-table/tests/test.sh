#!/bin/bash
# Scoring is pure-stdlib Python so the verifier never needs the network.
set -u
mkdir -p /logs/verifier
python3 /tests/score.py
