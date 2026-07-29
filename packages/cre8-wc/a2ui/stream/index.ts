/**
 * A2UI streaming surfaces for cre8.
 *
 * `SurfaceModel` is DOM-free and runs anywhere; `SurfaceRenderer` mirrors it
 * into the browser. See `docs/kb/08-streaming-ui.md`.
 */

export {
  A2UI_STREAM_VERSION,
  isBindingRef,
  type BindingRef,
  type ContentTarget,
  type DataPatch,
  type JsonPointer,
  type PatchOp,
  type SurfaceChange,
  type SurfaceEventMessage,
  type SurfaceMessage,
  type SurfaceState,
} from './types.js';

export {
  SurfaceModel,
  SurfaceSeqGapError,
  resolveNode,
  type ApplyResult,
  type SurfaceModelOptions,
} from './model.js';

export { SurfaceRenderer, findPath, type SurfaceRendererOptions } from './renderer.js';

export {
  childPath,
  formatPath,
  parsePath,
  parsePointer,
  pointerGet,
  pointerRemove,
  pointerSet,
  type PathSegment,
} from './pointer.js';
