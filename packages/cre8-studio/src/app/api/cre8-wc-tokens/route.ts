import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const file = await readFile(
    path.resolve(
      process.cwd(),
      "../cre8-wc/design-tokens/brands/cre8-a2ui/css/tokens_cre8-a2ui.css",
    ),
  );
  return new Response(file, {
    headers: {
      "Content-Type": "text/css",
      "Cache-Control": "public, max-age=60",
    },
  });
}
