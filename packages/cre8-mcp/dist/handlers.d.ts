/**
 * Cre8 MCP Tool Handlers
 *
 * Functions that implement the Cre8 Design System MCP tools.
 * Supports both Web Components (default) and React formats.
 */
export type ComponentFormat = 'web' | 'react';
export interface ListComponentsInput {
    category?: string;
    format?: ComponentFormat;
}
export interface GetComponentInput {
    name: string;
    format?: ComponentFormat;
}
export interface GetPatternsInput {
    name?: string;
    format?: ComponentFormat;
}
export interface SearchComponentsInput {
    query: string;
    format?: ComponentFormat;
}
export interface GenerateCodeInput {
    schema: ComponentNode | ComponentNode[];
    format?: ComponentFormat;
    indent?: number;
}
interface ComponentNode {
    component: string;
    props?: Record<string, unknown>;
    children?: string | ComponentNode | ComponentNode[];
    slots?: Record<string, string | ComponentNode | ComponentNode[]>;
    content?: string;
}
/**
 * list_components - Lists all available Cre8 components (KG-backed)
 */
export declare function handleListComponents(input: ListComponentsInput): string;
/**
 * get_component - Gets detailed info for a specific component (KG-backed)
 */
export declare function handleGetComponent(input: GetComponentInput): string;
/**
 * get_patterns - Gets layout patterns and templates
 */
export declare function handleGetPatterns(input: GetPatternsInput): string;
/**
 * search_components - Search components by name, description, or category (KG-backed)
 */
export declare function handleSearchComponents(input: SearchComponentsInput): string;
/**
 * generate_code - Generates React or Web Component code from a JSON schema
 */
export declare function handleGenerateCode(input: GenerateCodeInput): string;
export interface GetA2uiCatalogInput {
    view?: 'metadata' | 'component' | 'full';
    component?: string;
}
export declare function handleGetA2uiCatalog(input: GetA2uiCatalogInput): string;
export interface ValidateA2uiSpecInput {
    spec: unknown;
}
export declare function handleValidateA2uiSpec(input: ValidateA2uiSpecInput): string;
export {};
