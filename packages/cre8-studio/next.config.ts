import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@tmorrow/cre8-wc"],
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
