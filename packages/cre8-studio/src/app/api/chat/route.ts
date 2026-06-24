import {
  FunctionCallingConfigMode,
  GoogleGenAI,
  Type,
  type Content,
  type FunctionDeclaration,
  type Part,
} from "@google/genai";
import { type ComponentSpec } from "@tmorrow/cre8-wc/a2ui";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { validateA2uiSpec } from "@/lib/server/cre8-mcp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM = buildSystemPrompt();

const renderUiDeclaration: FunctionDeclaration = {
  name: "render_ui",
  description:
    "Render an A2UI spec (cre8-wc nested tree) inline in the chat. Use for forms, charts, cards, grids, and any interactive UI.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      spec: {
        type: Type.OBJECT,
        description:
          "A2UI spec. Root is a single component object with { component, props?, children?, slots?, events? }.",
      },
      caption: {
        type: Type.STRING,
        description: "Optional short caption shown above the rendered UI (1 sentence).",
      },
    },
    required: ["spec"],
  },
};

// Anthropic-shaped wire message coming from the client.
type WireContent =
  | { type: "text"; text: string }
  | {
      type: "tool_use";
      id: string;
      name: string;
      input: Record<string, unknown>;
    }
  | { type: "tool_result"; tool_use_id: string; content: string };
type WireMessage = { role: "user" | "assistant"; content: WireContent[] };

function toGeminiContents(messages: WireMessage[]): Content[] {
  const out: Content[] = [];
  for (const m of messages) {
    const parts: Part[] = [];
    for (const c of m.content) {
      if (c.type === "text") {
        if (c.text) parts.push({ text: c.text });
      } else if (c.type === "tool_use") {
        parts.push({
          functionCall: {
            name: c.name,
            args: (c.input ?? {}) as Record<string, unknown>,
          },
        });
      } else if (c.type === "tool_result") {
        let response: Record<string, unknown>;
        try {
          const parsed = JSON.parse(c.content);
          response =
            parsed && typeof parsed === "object" && !Array.isArray(parsed)
              ? (parsed as Record<string, unknown>)
              : { result: parsed };
        } catch {
          response = { result: c.content };
        }
        parts.push({
          functionResponse: {
            name: "render_ui",
            response,
          },
        });
      }
    }
    if (parts.length === 0) parts.push({ text: "" });
    out.push({
      role: m.role === "assistant" ? "model" : "user",
      parts,
    });
  }
  return out;
}

export async function POST(req: Request) {
  const useVertex =
    !!process.env.GOOGLE_GENAI_USE_VERTEXAI ||
    !!process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    !!process.env.GOOGLE_CLOUD_PROJECT;
  const ai = useVertex
    ? new GoogleGenAI({
        vertexai: true,
        project: process.env.GOOGLE_CLOUD_PROJECT ?? "",
        location: process.env.GOOGLE_CLOUD_LOCATION ?? "us-central1",
      })
    : new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY ?? "",
      });
  const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-pro";

  const body = (await req.json()) as { messages: WireMessage[] };
  const contents = toGeminiContents(body.messages);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      try {
        const response = await ai.models.generateContentStream({
          model: MODEL,
          contents,
          config: {
            systemInstruction: SYSTEM,
            tools: [{ functionDeclarations: [renderUiDeclaration] }],
            toolConfig: {
              functionCallingConfig: { mode: FunctionCallingConfigMode.AUTO },
            },
            maxOutputTokens: 16000,
            thinkingConfig: { includeThoughts: true },
          },
        });

        let pendingToolUseIdx = 0;
        let lastStopReason: string | undefined;
        let lastUsage: unknown;

        for await (const chunk of response) {
          const candidate = chunk.candidates?.[0];
          const parts = candidate?.content?.parts ?? [];

          for (const part of parts) {
            if (part.thought && part.text) {
              send("thinking", { delta: part.text });
              continue;
            }
            if (typeof part.text === "string" && part.text.length > 0) {
              send("text", { delta: part.text });
              continue;
            }
            if (part.functionCall) {
              const fc = part.functionCall;
              if (fc.name !== "render_ui") {
                send("tool_use_error", {
                  id: fc.id ?? `call_${pendingToolUseIdx}`,
                  error: `Unknown function: ${fc.name}`,
                });
                continue;
              }
              const args = (fc.args ?? {}) as { spec?: ComponentSpec; caption?: string };
              const id = fc.id ?? `call_${pendingToolUseIdx++}`;
              if (!args.spec) {
                send("tool_use_error", { id, error: "render_ui called without a spec" });
                continue;
              }
              const { result } = await validateA2uiSpec(args.spec);
              if (result.ok) {
                send("tool_use", { id, spec: args.spec, caption: args.caption });
              } else {
                send("tool_use_error", { id, error: result.error, spec: args.spec });
              }
            }
          }

          if (candidate?.finishReason) lastStopReason = candidate.finishReason;
          if (chunk.usageMetadata) lastUsage = chunk.usageMetadata;
        }

        send("done", { stop_reason: lastStopReason, usage: lastUsage });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        send("error", { message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
