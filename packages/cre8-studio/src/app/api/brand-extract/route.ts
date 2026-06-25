import { buildRamp } from "@/lib/a2ui-demo/ramp";
import type { BrandTheme } from "@/lib/a2ui-demo/types";
import { buildThemeCss, extractFromUrl } from "@/lib/server/brand-theme";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  url?: string;
  primary?: string; // hex — manual override / color picker
  name?: string;
  fontFamily?: string;
};

const HEX = /^#[0-9a-fA-F]{6}$/;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    let primary = body.primary && HEX.test(body.primary) ? body.primary.toUpperCase() : undefined;
    let fontFamily = body.fontFamily;
    let source: string | undefined;
    let candidates: string[] = [];

    if (!primary && body.url) {
      const extracted = await extractFromUrl(body.url);
      primary = extracted.primary;
      fontFamily = fontFamily ?? extracted.fontFamily;
      candidates = extracted.candidates;
      source = body.url;
    }

    if (!primary) {
      return Response.json(
        { error: "Provide a website url or a primary color (#RRGGBB)." },
        { status: 400 },
      );
    }

    const ramp = buildRamp(primary);
    const css = await buildThemeCss(primary);

    const theme: BrandTheme = {
      name: body.name?.trim() || hostFrom(source) || "Custom brand",
      primary,
      fontFamily,
      source,
      ramp,
      css,
      createdAt: 0, // stamped client-side (no Date in some server contexts)
    };

    return Response.json({ theme, candidates });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    );
  }
}

function hostFrom(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(/^https?:\/\//.test(url) ? url : `https://${url}`).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}
