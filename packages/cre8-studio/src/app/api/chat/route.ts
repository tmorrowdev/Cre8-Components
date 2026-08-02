import {
  SSE_HEADERS,
  runTurn,
  toSseStream,
  type ProviderCredentials,
  type WireMessage,
} from "@tmorrow/cre8-agent-core";
import { GeminiProvider } from "@tmorrow/cre8-agent-core/providers/gemini";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { validateA2uiSpec } from "@/lib/server/cre8-mcp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM = buildSystemPrompt();

/**
 * Reading the environment is this route's job, not the provider's.
 *
 * `cre8-agent-core` never touches `process.env` — that is what lets the same loop
 * run in a browser against the user's own key. Here, on the server, the key is
 * still ours, so the environment is the right place to get it from.
 */
function credentialsFromEnv(): ProviderCredentials {
  const useVertex =
    !!process.env.GOOGLE_GENAI_USE_VERTEXAI ||
    !!process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    !!process.env.GOOGLE_CLOUD_PROJECT;

  if (useVertex) {
    return {
      kind: "ambient",
      project: process.env.GOOGLE_CLOUD_PROJECT ?? "",
      location: process.env.GOOGLE_CLOUD_LOCATION ?? "us-central1",
    };
  }
  return {
    kind: "apiKey",
    apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY ?? "",
  };
}

export async function POST(req: Request) {
  const provider = new GeminiProvider({
    credentials: credentialsFromEnv(),
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-pro",
  });

  const body = (await req.json()) as { messages: WireMessage[] };

  const events = runTurn(body.messages, {
    provider,
    systemPrompt: SYSTEM,
    // Validation is injected so the loop stays portable: today it round-trips to
    // the knowledge plane, in a browser it would call the same plane over HTTP.
    validate: async (spec) => (await validateA2uiSpec(spec)).result,
  });

  return new Response(toSseStream(events), { headers: SSE_HEADERS });
}
