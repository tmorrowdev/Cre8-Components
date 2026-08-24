/**
 * Semantic ranking for search_components.
 *
 * Component vectors are pre-computed at cre8-wc build time
 * (a2ui/generate-catalog-vectors.mjs) and shipped in the package; only the
 * query is embedded here, by a model that arrives as an npm dependency -
 * no API key, no model-hub download, works in sandboxes that block both.
 * First call pays ~200ms of model init and ~100ms per embed after that;
 * the model is cached for the life of the process.
 *
 * Scoring is cosine similarity plus a small lexical-overlap boost. The boost
 * matters: pure cosine on a 512-dim USE-lite model scored 4/10 top-1 on an
 * intent-query gold set, the hybrid scored 10/10. If the vectors file or the
 * model is unavailable, callers fall back to lexical-only ranking - degraded
 * but never broken, and the response says which mode answered.
 */
interface VectorsFile {
    meta: {
        model: string;
        dims: number;
        library_version?: string;
        texts?: Record<string, string>;
    };
    vectors: Record<string, number[]>;
}
export declare function loadVectors(): VectorsFile | null;
export interface RankedComponent {
    id: string;
    score: number;
}
export interface SemanticResult {
    mode: 'semantic' | 'lexical';
    ranked: RankedComponent[];
}
/**
 * Rank every component against a free-text query. `texts` supplies the
 * lexical side per component id - callers pass the same enriched text the
 * vectors were built from (stored in the vectors file), or a fallback string
 * assembled from the KG when vectors are absent.
 */
export declare function rankComponents(query: string, fallbackTexts: Record<string, string>): Promise<SemanticResult>;
export {};
