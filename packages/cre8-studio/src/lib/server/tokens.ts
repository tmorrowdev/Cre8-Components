import { readFile } from "fs/promises";
import path from "path";

// The cre8 design tokens (CSS custom properties) must be present at the document
// :root so they inherit into every component's shadow DOM. The shipped entry
// `tokens_cre8-a2ui.css` @imports two siblings with RELATIVE paths, which 404
// when the file is loaded by URL (e.g. inside a sandboxed iframe). Flatten the
// token custom properties into one self-contained stylesheet.
//
// `tokens_brand.css` holds the base brand values; `tokens_cre8-a2ui.css` layers
// the semantic tokens on top. `fonts.css` is intentionally skipped — its
// @font-face rules reference relative `assets/fonts/*.woff2` URLs we don't serve,
// so text falls back to the token-defined font-family fallbacks.
const CSS_DIR = "../cre8-wc/design-tokens/brands/cre8-a2ui/css";

let cached: string | null = null;

export async function buildTokensCss(): Promise<string> {
  if (cached) return cached;
  const dir = path.resolve(process.cwd(), CSS_DIR);
  const brand = await readFile(path.join(dir, "tokens_brand.css"), "utf8");
  let main = await readFile(path.join(dir, "tokens_cre8-a2ui.css"), "utf8");
  // Drop the relative @import lines — we inline brand above and skip fonts.
  main = main.replace(/@import\s+['"]\.\/[^'"]+['"]\s*;/g, "");
  cached = `${brand}\n${main}\n`;
  return cached;
}
