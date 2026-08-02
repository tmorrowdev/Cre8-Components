/**
 * Context retrieval for the A2UI catalog.
 *
 * The full catalog is ~43k tokens, which is more than a small-context model can
 * hold and more than a cloud model should pay for on every request. The compact
 * projection — prop names, enum choices, required lists, slot names, containment
 * — is ~7.5x smaller and carries the whole decoding constraint. Prose is what
 * gets dropped.
 *
 * This is what lets one endpoint serve three very different callers: a cloud
 * model taking the whole compact catalog, an on-device model taking a few hundred
 * tokens of it, and an MCP host taking full prose for a narrow selection.
 */
export interface CompactPropSpec {
    type?: string | string[];
    enum?: string[];
}
export interface CompactComponent {
    name: string;
    category: string;
    props?: Record<string, CompactPropSpec>;
    required?: string[];
    acceptsChildren?: boolean;
    slots?: string[];
}
interface CompactCatalog {
    contractVersion: number;
    sourceCatalog: string;
    libraryVersion: string;
    componentCount: number;
    components: CompactComponent[];
}
export declare function loadCompactCatalog(): CompactCatalog;
export interface GetA2uiContextInput {
    /** Explicit component names. Takes precedence over `categories`. */
    names?: string[];
    categories?: string[];
    projection?: 'compact' | 'full';
    /** Token ceiling. Whole components are dropped to fit; none is ever truncated. */
    budget?: number;
    /**
     * Always admitted before the budget is spent elsewhere.
     *
     * Without this, filling smallest-first starves exactly the components worth
     * keeping — definition size tracks prop count, so the most capable component in
     * a category is the first casualty. Measured: a 1200-token budget over
     * Forms/Actions/Typography dropped `cre8-button` and `cre8-field`, and the model
     * substituted a checkbox for a password input.
     */
    pinned?: string[];
}
export interface A2uiContextResult {
    contractVersion: number;
    libraryVersion: string;
    projection: 'compact' | 'full';
    components: unknown[];
    /** True when the budget forced components out. Callers must surface this. */
    truncated: boolean;
    droppedCount: number;
    estimatedTokens: number;
}
export declare function handleGetA2uiContext(input: GetA2uiContextInput): A2uiContextResult;
export {};
