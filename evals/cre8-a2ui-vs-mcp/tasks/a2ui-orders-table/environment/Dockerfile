# Identical for every task and every arm: the only thing that differs between
# arms is what the agent is given (a skill, an MCP server, or neither), never
# the environment it runs in.
#
# The full (non-slim) node image already carries node, npm, python3, git and
# curl, so this Dockerfile installs nothing: no apt step to fail on a network
# that proxies or blocks the Debian mirrors, and a build that is a pull plus a
# WORKDIR. node and npm are what the agent needs (the MCP arm runs npx);
# python3 is what the verifier needs.
#
# mirror.gcr.io is Google's pull-through mirror of Docker Hub - the same image
# as `node:22-bookworm`, same digest, from a host that restrictive networks tend
# to allow. Swap the prefix back to plain `node:22-bookworm` where Docker Hub's
# blob CDN is reachable; nothing else in the eval depends on where it comes from.
FROM mirror.gcr.io/library/node:22-bookworm

# Trust material for a TLS-terminating egress proxy, if the host has any. `ca/`
# holds no certificate in the repository, so this is a no-op on an ordinary
# network; prepare.sh drops one in when it finds one. Without it, every tool
# inside the container fails TLS with "self-signed certificate in certificate
# chain" and the agent never installs.
COPY ca/ /usr/local/share/ca-certificates/
RUN update-ca-certificates >/dev/null 2>&1 || true
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

# The agent CLI, pinned, from npm - which is one of the two install paths Harbor
# itself uses (the other fetches downloads.claude.ai, which some networks block).
# Baking it in means Harbor's install step finds `claude` already present and
# skips straight to running, and every arm runs the exact same CLI build: one
# fewer variable between the three arms, and no install traffic mid-trial.
RUN npm install -g @anthropic-ai/claude-code@2.1.239 && claude --version

# Deliberately empty of CRE8 material. The catalog must reach the agent through
# the arm under test, not through the filesystem.
WORKDIR /app
