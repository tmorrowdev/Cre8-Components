import { build } from "esbuild";
import { readFile } from "fs/promises";
import path from "path";

let cachedEsm: string | null = null;
let cachedGlobals: string | null = null;

export async function buildRuntimeText(opts: { exposeGlobals: boolean }): Promise<string> {
  if (opts.exposeGlobals && cachedGlobals) return cachedGlobals;
  if (!opts.exposeGlobals && cachedEsm) return cachedEsm;

  const a2uiEntry = path.resolve(process.cwd(), "../cre8-wc/a2ui/index.js");
  const catalogPath = path.resolve(process.cwd(), "../cre8-wc/a2ui/catalog.json");

  // stdin entry: re-export the API, and (optionally) pin the API onto globalThis
  // via a namespace import (stable identifiers, immune to esbuild renaming).
  const stdin = `
import * as __a2ui from ${JSON.stringify(a2uiEntry)};
export * from ${JSON.stringify(a2uiEntry)};
${opts.exposeGlobals ? `
globalThis.render = __a2ui.render;
globalThis.registerCatalog = __a2ui.registerCatalog;
globalThis.validateSpec = __a2ui.validateSpec;
` : ``}
`;

  const result = await build({
    stdin: { contents: stdin, resolveDir: path.dirname(a2uiEntry), loader: "js" },
    bundle: true,
    format: "esm",
    write: false,
    platform: "browser",
  });
  const bundle = result.outputFiles[0].text;
  const catalog = await readFile(catalogPath, "utf8");

  let text = `${bundle}\nexport const CATALOG = ${catalog};\n`;
  if (opts.exposeGlobals) text += `globalThis.CATALOG = CATALOG;\n`;

  if (opts.exposeGlobals) cachedGlobals = text;
  else cachedEsm = text;
  return text;
}
