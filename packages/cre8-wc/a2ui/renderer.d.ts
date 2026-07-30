import type { ComponentSpec, EmittedEvent, PropSchema, RegisteredCatalog } from './types.js';
export interface RenderOptions {
    root?: HTMLElement;
    doc?: Document;
    onEvent?: (evt: EmittedEvent) => void;
}
export declare function render(spec: ComponentSpec, catalog: RegisteredCatalog, options?: RenderOptions): HTMLElement;
export declare function applyProp(el: HTMLElement, key: string, value: unknown, schema: PropSchema | undefined): void;
