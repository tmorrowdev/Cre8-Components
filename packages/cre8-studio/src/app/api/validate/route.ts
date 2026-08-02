import { validateA2uiSpec } from "@/lib/server/cre8-mcp";
import { type ComponentSpec } from "@tmorrow/cre8-wc/a2ui";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A2UI validation for the browser-side agent loop.
 *
 * The client runs the loop against the user's own key, but it still needs the
 * knowledge plane to validate specs — and the plane is not reachable from the
 * browser directly in every deployment. This route proxies that one call.
 *
 * **It handles no credentials.** Validation is key-free by construction: the
 * plane never calls a model. That is what makes it safe to expose here while
 * the model key stays in the browser.
 */
export async function POST(req: Request) {
  let spec: unknown;
  try {
    ({ spec } = (await req.json()) as { spec?: unknown });
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (spec === undefined) {
    return Response.json({ ok: false, error: 'Missing required field "spec"' }, { status: 400 });
  }

  const { result } = await validateA2uiSpec(spec as ComponentSpec);
  return Response.json(result);
}
