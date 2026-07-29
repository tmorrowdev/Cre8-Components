/**
 * Two addressing schemes, kept in one file because they are easy to confuse.
 *
 * **Spec paths** (`$.slots.footer[0].children[2]`) address nodes in the
 * component tree. This grammar is not invented here — it is what the one-shot
 * renderer already puts in `EmittedEvent.path`, which is why streaming can reuse
 * it as node identity.
 *
 * **JSON Pointers** (`/user/name`) address values in the surface data model,
 * per RFC 6901.
 */
export type PathSegment = {
    kind: 'children';
    index: number;
} | {
    kind: 'slot';
    name: string;
    index: number;
};
/** Parse `$.slots.footer[0]` into segments. Throws on malformed input. */
export declare function parsePath(path: string): PathSegment[];
export declare function formatPath(segments: PathSegment[]): string;
/** `$.children[0]` + `{children,2}` → `$.children[0].children[2]`. */
export declare function childPath(parentPath: string, slot: string | null, index: number): string;
export declare function parsePointer(pointer: string): string[];
export declare function pointerGet(root: unknown, pointer: string): unknown;
/**
 * Write `value` at `pointer`, creating intermediate containers as needed. An
 * array is created when the next token looks like an index, an object otherwise.
 * Mutates and returns `root` — except for the whole-document pointer `""`,
 * where the caller must use the returned value.
 */
export declare function pointerSet(root: Record<string, unknown>, pointer: string, value: unknown): unknown;
export declare function pointerRemove(root: Record<string, unknown>, pointer: string): void;
