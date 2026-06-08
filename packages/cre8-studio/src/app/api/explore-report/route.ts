import { readFile } from "fs/promises";
import path from "path";
import { assembleReportHtml } from "@/lib/iframe-runtime";
import { buildRuntimeText } from "@/lib/server/runtime";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { spec, dataset } = await req.json();
  if (!spec) return new Response("spec required", { status: 400 });
  const cdnText = await readFile(path.resolve(process.cwd(), "../cre8-wc/cdn/cre8-wc.esm.js"), "utf8");
  const runtimeText = await buildRuntimeText({ exposeGlobals: true });
  const html = assembleReportHtml(spec, { inline: true, cdnText, runtimeText });
  const today = new Date().toISOString().slice(0, 10);
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="report-${dataset ?? "data"}-${today}.html"`,
    },
  });
}
