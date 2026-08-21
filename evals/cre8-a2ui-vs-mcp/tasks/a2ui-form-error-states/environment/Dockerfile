# Identical for every task and every arm: the only thing that differs between
# arms is what the agent is given (a skill, an MCP server, or neither), never
# the environment it runs in.
FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        python3 \
    && rm -rf /var/lib/apt/lists/*

# Deliberately empty of CRE8 material. The catalog must reach the agent through
# the arm under test, not through the filesystem.
WORKDIR /app
