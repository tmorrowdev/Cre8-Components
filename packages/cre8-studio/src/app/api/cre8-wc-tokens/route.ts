import { buildTokensCss } from "@/lib/server/tokens";

export const dynamic = "force-dynamic";

export async function GET() {
  const css = await buildTokensCss();
  return new Response(css, {
    headers: {
      "Content-Type": "text/css",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60",
    },
  });
}
