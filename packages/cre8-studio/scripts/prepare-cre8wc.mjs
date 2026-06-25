// Ensure the cre8-wc design-token CSS the studio @imports is resolvable.
//
// globals.css imports `@tmorrow/cre8-wc/design-tokens/brands/.../tokens_cre8-a2ui.css`,
// which the package export map maps to `lib/design-tokens/*`. That lib dir only
// exists after a full cre8-wc build (`pnpm build:wc`). For a lightweight,
// CI/Vercel-friendly build we just mirror the source design-tokens into lib —
// it's the only part of cre8-wc the studio build needs.
import { cpSync, existsSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));
const wc = resolve(here, "..", "..", "cre8-wc");
const src = resolve(wc, "design-tokens");
const dest = resolve(wc, "lib", "design-tokens");

if (!existsSync(src)) {
  console.error(`[prepare-cre8wc] source design-tokens not found at ${src}`);
  process.exit(1);
}
if (existsSync(dest)) {
  console.log("[prepare-cre8wc] lib/design-tokens already present — skipping");
} else {
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log("[prepare-cre8wc] mirrored design-tokens -> lib/design-tokens");
}
