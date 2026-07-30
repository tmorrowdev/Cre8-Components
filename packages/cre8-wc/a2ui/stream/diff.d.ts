/**
 * Turn "here is the new tree" into the smallest set of patch ops that gets
 * there.
 *
 * The op vocabulary is the right primitive, and it is the wrong interface for
 * how models actually work: asked to change one label, a model regenerates the
 * whole document. Without a diff, that costs a full remount — every element
 * recreated, focus lost, scroll reset, animations restarted — which is exactly
 * what streaming exists to avoid. With one, an agent gets incremental rendering
 * without ever learning what `appendText` is.
 *
 * Node identity here is positional, matching the rest of the streaming layer.
 * That means the diff is deliberately *not* a minimal edit script: it compares
 * position by position and only appends or removes at the tail. Inserting at the
 * head of a long list therefore rewrites the list rather than shifting it. A
 * keyed diff would do better, but keys would have to come from somewhere, and
 * the whole reason this dialect has no ids is that nothing has to invent them.
 */
import type { ComponentSpec } from '../types.js';
import type { PatchOp } from './types.js';
/**
 * Ops that turn `prev` into `next`. Returns an empty array when they already
 * match, so an agent can resend an unchanged tree for free.
 *
 * `null` for either side means "no surface root": the result is a single
 * `replace`/`remove` at `$`, which the model handles as a root swap.
 */
export declare function diffSpecs(prev: ComponentSpec | null, next: ComponentSpec | null): PatchOp[];
