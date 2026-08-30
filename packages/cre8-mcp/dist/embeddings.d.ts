export interface SemanticMatch {
    id: string;
    score: number;
}
/**
 * Ranks catalog components by cosine similarity to `query`.
 *
 * Returns null — never [] — when semantic search couldn't run at all (no
 * embeddings file, no API key, request failure), so the caller can tell
 * "tried and found nothing above the threshold" (empty array, a real
 * answer) apart from "couldn't try" (null, fall back to lexical).
 */
export declare function semanticSearch(query: string): Promise<SemanticMatch[] | null>;
