/**
 * A2UI streaming surfaces for cre8.
 *
 * `SurfaceModel` is DOM-free and runs anywhere; `SurfaceRenderer` mirrors it
 * into the browser. See `docs/kb/08-streaming-ui.md`.
 */
export { A2UI_STREAM_VERSION, isBindingRef, } from './types.js';
export { SurfaceModel, SurfaceSeqGapError, resolveNode, } from './model.js';
export { SurfaceRenderer, findPath } from './renderer.js';
export { childPath, formatPath, parsePath, parsePointer, pointerGet, pointerRemove, pointerSet, } from './pointer.js';
