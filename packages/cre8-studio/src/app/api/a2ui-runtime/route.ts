import { buildRuntimeText } from "@/lib/server/runtime";

export const dynamic = "force-dynamic";

export async function GET() {
  const body = await buildRuntimeText({ exposeGlobals: false });
  return new Response(body, {
    headers: {
      "Content-Type": "application/javascript",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300",
    },
  });
}
