import type { ComponentSpec, EmittedEvent, RegisteredCatalog } from './types.js';
export interface RenderOptions {
    root?: HTMLElement;
    doc?: Document;
    onEvent?: (evt: EmittedEvent) => void;
}
export declare function render(spec: ComponentSpec, catalog: RegisteredCatalog, options?: RenderOptions): HTMLElement;
