# Same CA/claude-CLI setup as templates/Dockerfile (see the comments there),
# on a different base, plus a pre-installed React scaffold - the deliverable
# here is real code, not a JSON file written from nothing. `npm install` runs
# at build time so a trial's network budget goes to the agent's own work
# rather than to installing react.
#
# The base is Playwright's own image rather than node:22-bookworm because the
# verifier scores by rendering the built page in real Chromium. Installing a
# browser onto a plain Node base needs two things this environment refuses:
# apt over plain HTTP for the system libraries, and cdn.playwright.dev for the
# browser itself ("Host not in allowlist"). This image ships both already, so
# the build needs no browser download at all - hence
# PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD, which stops npm's postinstall re-fetching
# what /ms-playwright already has.
#
# @tmorrow/cre8-react is the one exception to "deliberately empty of CRE8
# material" - unlike the A2UI tasks, this one can't function without the
# library present to import and build against, so its type declarations are
# readable via Bash even outside the cre8-mcp arm. This task doesn't try to be
# the isolated comparison the a2ui-* tasks are, only a measure of what
# cre8-mcp itself produces. Note the same applies to Chromium: it is here for
# the verifier, but this arm allows Bash, so an agent could reach it. Nothing
# in instruction.md mentions it.
FROM mcr.microsoft.com/playwright:v1.62.1-noble

COPY ca/ /usr/local/share/ca-certificates/
RUN update-ca-certificates >/dev/null 2>&1 || true
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

RUN npm install -g @anthropic-ai/claude-code@2.1.239 && claude --version

WORKDIR /app
COPY app/package.json ./
RUN npm install
COPY app/ ./
