import { type Content, type FunctionDeclaration } from '@google/genai';
import type { Provider, ProviderChunk, ProviderCredentials, ProviderTurn } from '../provider.js';
import type { WireMessage } from '../types.js';
export declare const RENDER_UI_DECLARATION: FunctionDeclaration;
/** Anthropic-shaped wire messages out to Gemini's `Content[]`. */
export declare function toGeminiContents(messages: WireMessage[]): Content[];
export interface GeminiProviderOptions {
    credentials: ProviderCredentials;
    model?: string;
}
export declare class GeminiProvider implements Provider {
    readonly name = "gemini";
    private readonly client;
    private readonly model;
    /**
     * Credentials are required, not defaulted from the environment. A caller that
     * wants env-derived credentials reads the env itself and passes the result —
     * see `credentialsFromEnv` in the studio route.
     */
    constructor(options: GeminiProviderOptions);
    stream(turn: ProviderTurn): AsyncIterable<ProviderChunk>;
}
