import type { NextConfig } from "next";
import path from "path";

const config: NextConfig = {
  transpilePackages: ["@tmorrow/cre8-wc"],
  serverExternalPackages: ["esbuild"],
  // Monorepo: trace from the repo root so serverless functions bundle the
  // sibling cre8-wc assets the API routes read at runtime (tokens, a2ui catalog
  // + examples, cdn bundle). Keys are route paths; globs are relative to this
  // package dir.
  outputFileTracingRoot: path.join(process.cwd(), "..", ".."),
  outputFileTracingIncludes: {
    "/api/cre8-wc-cdn": ["../cre8-wc/cdn/cre8-wc.esm.js"],
    "/api/cre8-wc-tokens": ["../cre8-wc/design-tokens/brands/cre8-a2ui/css/**"],
    "/api/brand-extract": ["../cre8-wc/design-tokens/brands/cre8-a2ui/css/**"],
    "/api/a2ui-patterns": ["../cre8-wc/a2ui/examples/**"],
    "/api/a2ui-runtime": ["../cre8-wc/a2ui/**", "../cre8-wc/cdn/cre8-wc.esm.js"],
    "/api/explore-report": ["../cre8-wc/cdn/cre8-wc.esm.js"],
  },
  turbopack: {
    rules: {
      "*.svg?raw": { loaders: ["raw-loader"], as: "*.js" },
    },
  },
  webpack(config) {
    config.module.rules.push({
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
};

export default config;
