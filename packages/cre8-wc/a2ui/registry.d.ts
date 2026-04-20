import type { CatalogSchema, ComponentSpec, RegisteredCatalog } from './types.js';
export declare function registerCatalog(schema: CatalogSchema): RegisteredCatalog;
export declare function validateSpec(spec: unknown, catalog: RegisteredCatalog, path?: string): asserts spec is ComponentSpec;
