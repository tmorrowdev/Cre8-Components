import {
  FunctionCallingConfigMode,
  GoogleGenAI,
  Type,
  type Content,
  type FunctionDeclaration,
  type Part,
} from '@google/genai';
import type { Provider, ProviderChunk, ProviderCredentials, ProviderTurn } from '../provider.js';
import type { WireMessage } from '../types.js';

export const RENDER_UI_DECLARATION: FunctionDeclaration = {
  name: 'render_ui',
  description:
    'Render an A2UI spec (cre8-wc nested tree) inline in the chat. Use for forms, charts, cards, grids, and any interactive UI.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      spec: {
        type: Type.OBJECT,
        description:
          'A2UI spec. Root is a single component object with { component, props?, children?, slots?, events? }.',
      },
      caption: {
        type: Type.STRING,
        description: 'Optional short caption shown above the rendered UI (1 sentence).',
      },
    },
    required: ['spec'],
  },
};

/** Anthropic-shaped wire messages out to Gemini's `Content[]`. */
export function toGeminiContents(messages: WireMessage[]): Content[] {
  const out: Content[] = [];
  for (const m of messages) {
    const parts: Part[] = [];
    for (const c of m.content) {
      if (c.type === 'text') {
        if (c.text) parts.push({ text: c.text });
      } else if (c.type === 'tool_use') {
        parts.push({
          functionCall: {
            name: c.name,
            args: (c.input ?? {}) as Record<string, unknown>,
          },
        });
      } else if (c.type === 'tool_result') {
        let response: Record<string, unknown>;
        try {
          const parsed = JSON.parse(c.content);
          response =
            parsed && typeof parsed === 'object' && !Array.isArray(parsed)
              ? (parsed as Record<string, unknown>)
              : { result: parsed };
        } catch {
          response = { result: c.content };
        }
        parts.push({ functionResponse: { name: 'render_ui', response } });
      }
    }
    // Gemini rejects a content entry with no parts.
    if (parts.length === 0) parts.push({ text: '' });
    out.push({ role: m.role === 'assistant' ? 'model' : 'user', parts });
  }
  return out;
}

export interface GeminiProviderOptions {
  credentials: ProviderCredentials;
  model?: string;
}

export class GeminiProvider implements Provider {
  readonly name = 'gemini';

  private readonly client: GoogleGenAI;
  private readonly model: string;

  /**
   * Credentials are required, not defaulted from the environment. A caller that
   * wants env-derived credentials reads the env itself and passes the result —
   * see `credentialsFromEnv` in the studio route.
   */
  constructor(options: GeminiProviderOptions) {
    const { credentials } = options;
    this.client =
      credentials.kind === 'ambient'
        ? new GoogleGenAI({
            vertexai: true,
            project: credentials.project,
            location: credentials.location,
          })
        : new GoogleGenAI({ apiKey: credentials.apiKey });
    this.model = options.model ?? 'gemini-2.5-pro';
  }

  async *stream(turn: ProviderTurn): AsyncIterable<ProviderChunk> {
    const response = await this.client.models.generateContentStream({
      model: this.model,
      contents: toGeminiContents(turn.messages),
      config: {
        systemInstruction: turn.systemPrompt,
        tools: [{ functionDeclarations: [RENDER_UI_DECLARATION] }],
        toolConfig: { functionCallingConfig: { mode: FunctionCallingConfigMode.AUTO } },
        maxOutputTokens: turn.maxOutputTokens ?? 16000,
        thinkingConfig: { includeThoughts: turn.includeThoughts ?? true },
      },
    });

    let stopReason: string | undefined;
    let usage: unknown;

    for await (const chunk of response) {
      const candidate = chunk.candidates?.[0];
      for (const part of candidate?.content?.parts ?? []) {
        if (part.thought && part.text) {
          yield { type: 'thinking', delta: part.text };
          continue;
        }
        if (typeof part.text === 'string' && part.text.length > 0) {
          yield { type: 'text', delta: part.text };
          continue;
        }
        if (part.functionCall) {
          const call = part.functionCall;
          yield {
            type: 'tool_call',
            // Gemini omits an id for some calls. Numbering the anonymous ones is
            // the loop's job, not the provider's: whether the counter advances
            // depends on tool semantics the provider deliberately does not know.
            id: call.id,
            name: call.name ?? '',
            args: (call.args ?? {}) as Record<string, unknown>,
          };
        }
      }
      if (candidate?.finishReason) stopReason = candidate.finishReason;
      if (chunk.usageMetadata) usage = chunk.usageMetadata;
    }

    yield { type: 'stop', stopReason, usage };
  }
}
