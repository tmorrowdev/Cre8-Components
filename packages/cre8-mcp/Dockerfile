# Build context: monorepo root (packages/cre8-mcp/Dockerfile)
FROM node:22-slim AS builder

RUN corepack enable && corepack prepare pnpm@8.11.0 --activate

WORKDIR /workspace

# Copy workspace manifests for dependency resolution
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/cre8-wc/package.json ./packages/cre8-wc/package.json
COPY packages/cre8-mcp/package.json ./packages/cre8-mcp/package.json

# Install all workspace deps (resolves workspace:* links)
RUN pnpm install --frozen-lockfile

# Copy source files needed at build time and runtime
COPY packages/cre8-wc/a2ui ./packages/cre8-wc/a2ui
COPY packages/cre8-wc/mcp-manifest.json ./packages/cre8-wc/mcp-manifest.json
COPY packages/cre8-wc/package.json ./packages/cre8-wc/package.json
COPY packages/cre8-mcp/src ./packages/cre8-mcp/src
COPY packages/cre8-mcp/tsconfig.json ./packages/cre8-mcp/tsconfig.json

# Build TypeScript
RUN pnpm --filter @tmorrow/cre8-mcp build

# Deploy to a self-contained directory (resolves workspace symlinks to real files)
RUN pnpm --filter @tmorrow/cre8-mcp deploy --prod /deploy

FROM node:22-slim

RUN groupadd --gid 1001 appgroup && \
    useradd --uid 1001 --gid 1001 --no-create-home --shell /bin/false appuser

WORKDIR /app

COPY --from=builder /deploy .

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "dist/server.js"]
