import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const file = await readFile(
    path.resolve(process.cwd(), "../cre8-wc/cdn/cre8-wc.esm.js"),
  );
  return new Response(file, {
    headers: {
      "Content-Type": "application/javascript",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60",
    },
  });
}
