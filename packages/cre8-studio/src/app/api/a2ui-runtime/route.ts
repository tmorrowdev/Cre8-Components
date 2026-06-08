import { build } from "esbuild";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

let cached: string | null = null;

async function buildRuntime(): Promise<string> {
  if (cached) return cached;
  const a2uiEntry = path.resolve(process.cwd(), "../cre8-wc/a2ui/index.js");
  const catalogPath = path.resolve(process.cwd(), "../cre8-wc/a2ui/catalog.json");
  const result = await build({
    entryPoints: [a2uiEntry],
    bundle: true,
    format: "esm",
    write: false,
    platform: "browser",
  });
  const rendererBundle = result.outputFiles[0].text;
  const catalog = await readFile(catalogPath, "utf8");
  cached = `${rendererBundle}\nexport const CATALOG = ${catalog};\n`;
  return cached;
}

export async function GET() {
  const body = await buildRuntime();
  return new Response(body, {
    headers: {
      "Content-Type": "application/javascript",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300",
    },
  });
}
