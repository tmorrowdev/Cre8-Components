# Same base and CA/claude-CLI setup as templates/Dockerfile (see the comments
# there) - this task just needs one more layer: a pre-installed React scaffold,
# because the deliverable here is real code, not a JSON file the agent writes
# from nothing. `npm install` runs at build time so a trial's network budget
# goes to the agent's own work, not to installing react itself.
#
# @tmorrow/cre8-react is the one exception to "deliberately empty of CRE8
# material" - unlike the A2UI tasks, this one can't function without the
# library actually present to import and build against. That means its
# installed type declarations are technically readable via Bash even outside
# the cre8-mcp arm; this task doesn't try to be the isolated comparison the
# a2ui-* tasks are, only a measure of what cre8-mcp itself produces.
FROM mirror.gcr.io/library/node:22-bookworm

COPY ca/ /usr/local/share/ca-certificates/
RUN update-ca-certificates >/dev/null 2>&1 || true
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

RUN npm install -g @anthropic-ai/claude-code@2.1.239 && claude --version

WORKDIR /app
COPY app/package.json ./
RUN npm install
COPY app/ ./
