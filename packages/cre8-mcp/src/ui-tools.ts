/**
 * The streaming-UI half of the connector, as MCP tools.
 *
 * Five tools, because an agent that has to remember eleven will use none of
 * them: open a surface, stream into it, read it back, wait for the user, close
 * it. Every mutation goes through `ui_stream`, which applies data before ops
 * before status — the only order in which a node bound to a value the same call
 * introduces can validate.
 */

import { z } from 'zod';
import type { DataPatch, PatchOp, SurfaceState } from '@tmorrow/cre8-wc/a2ui/stream/index.js';
import { renderSurfacePage } from './surface-page.js';
import { surfaceStore } from './surfaces.js';

export interface UiToolContext {
  /** Absolute base URL a browser can reach this server on. */
  publicBase: string;
  /**
   * Whether to embed the surface as an mcp-ui resource. Hosts that do not
   * understand `ui://` ignore it, and the text block carries the URL either way.
   */
  embedResources?: boolean;
}

export interface ToolContentBlock {
  type: 'text' | 'resource';
  text?: string;
  resource?: { uri: string; mimeType: string; text: string };
}

const SPEC_SHAPE =
  'A2UI ComponentSpec: { component, props?, children?, slots?, events? }. Content goes through ' +
  'EITHER children OR slots, never both — the catalog decides which, and getting it wrong is the ' +
  'single most common failure. Check with get_a2ui_catalog view="component" first. Button labels ' +
  'are the `text` prop, not children.';

const OPS_SHAPE =
  'PatchOp[]. Each op has an `op` and a `path` ("$" is the root, "$.children[0]" and ' +
  '"$.slots.footer[0]" address nodes — the same path grammar events report back on). ' +
  'append/insert {slot?, nodes}, replace {node}, remove, setProps {props} (null deletes a prop), ' +
  'setEvents {events}, setText {slot?, text}, appendText {slot?, text}, clear {slot?}. ' +
  'appendText concatenates into the trailing text node, which is how you stream tokens without ' +
  'resending the tree. A prop value of { "$bind": "/pointer" } reads from the surface data model.';

export const uiTools = [
  {
    name: 'ui_open_surface',
    description:
      'Opens a live UI surface and returns a URL a human can watch. Everything you stream into it ' +
      'appears immediately — no page reload, no re-render. Use this instead of generate_code when ' +
      'the user should SEE the UI rather than receive markup. ' +
      'Typical flow: ui_open_surface → give the user the URL → ui_stream repeatedly as you work → ' +
      'ui_events to react to clicks → ui_stream with status "done". ' +
      SPEC_SHAPE,
    inputSchema: {
      type: 'object' as const,
      properties: {
        title: { type: 'string', description: 'Page title for the surface.' },
        spec: {
          type: 'object',
          description:
            'Optional root ComponentSpec to start from. A layout container (cre8-layout-container, ' +
            'cre8-grid) is usually right, because you will append into it. Validated on arrival: ' +
            'an invalid spec opens no surface.',
        },
        data: {
          type: 'object',
          description: 'Optional initial data model that { "$bind": "/pointer" } props read from.',
        },
      },
    },
  },
  {
    name: 'ui_stream',
    description:
      'Streams a change into an open surface. This is the only mutation tool: pass `data`, `ops`, ' +
      'and/or `status` in one call and they apply in that order, so a node bound to a value this ' +
      'same call introduces still validates. Every op is checked against the cre8 catalog before ' +
      'anything moves — if one op fails, none of them land and the error names the path and the ' +
      'rule. ' +
      OPS_SHAPE,
    inputSchema: {
      type: 'object' as const,
      properties: {
        surfaceId: { type: 'string', description: 'From ui_open_surface.' },
        ops: { type: 'array', description: OPS_SHAPE, items: { type: 'object' } },
        data: {
          type: 'array',
          description:
            'DataPatch[]: { pointer, value } or { pointer, op: "remove" }. RFC 6901 pointers. ' +
            'Updating one bound value costs one small message instead of a re-render.',
          items: { type: 'object' },
        },
        status: {
          type: 'string',
          enum: ['streaming', 'idle', 'done', 'error'],
          description:
            'Tells the viewer what you are doing. Set "done" when the UI is finished so the live ' +
            'indicator clears; set "error" if you gave up mid-stream.',
        },
        statusMessage: { type: 'string', description: 'Short label shown next to the indicator.' },
      },
      required: ['surfaceId'],
    },
  },
  {
    name: 'ui_get_surface',
    description:
      'Returns the current tree and data model of a surface, with bindings resolved. Use it to ' +
      'recover the exact paths of nodes you want to patch after a long gap, rather than guessing ' +
      'indices.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        surfaceId: { type: 'string' },
      },
      required: ['surfaceId'],
    },
  },
  {
    name: 'ui_events',
    description:
      'Reads what the user did. Returns events fired by components you bound handlers to, each ' +
      'carrying the handler name you chose, the path of the node, and the event detail. ' +
      'Set waitMs to block until something happens (long-poll) instead of busy-looping. ' +
      'Pass the returned lastSeq as `since` on the next call so you never see an event twice.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        surfaceId: { type: 'string' },
        since: { type: 'number', description: 'Last event seq you have handled. Default 0.' },
        waitMs: {
          type: 'number',
          description: 'Block up to this long for a new event (max 60000). Omit to return immediately.',
        },
      },
      required: ['surfaceId'],
    },
  },
  {
    name: 'ui_close_surface',
    description:
      'Closes a surface and tells any viewer it is finished. Surfaces are also swept after an hour ' +
      'of inactivity, so closing is politeness rather than cleanup.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        surfaceId: { type: 'string' },
      },
      required: ['surfaceId'],
    },
  },
];

export const UiOpenSurfaceSchema = z.object({
  title: z.string().optional(),
  spec: z.record(z.unknown()).optional(),
  data: z.record(z.unknown()).optional(),
});

export const UiStreamSchema = z.object({
  surfaceId: z.string(),
  ops: z.array(z.record(z.unknown())).optional(),
  data: z.array(z.record(z.unknown())).optional(),
  status: z.enum(['streaming', 'idle', 'done', 'error']).optional(),
  statusMessage: z.string().optional(),
});

export const UiGetSurfaceSchema = z.object({ surfaceId: z.string() });

export const UiEventsSchema = z.object({
  surfaceId: z.string(),
  since: z.number().optional(),
  waitMs: z.number().optional(),
});

export const UiCloseSurfaceSchema = z.object({ surfaceId: z.string() });

export const UI_TOOL_NAMES = new Set(uiTools.map((t) => t.name));

function viewerUrl(ctx: UiToolContext, surfaceId: string): string {
  return `${ctx.publicBase.replace(/\/$/, '')}/surfaces/${surfaceId}`;
}

function json(value: unknown): ToolContentBlock {
  return { type: 'text', text: JSON.stringify(value, null, 2) };
}

/**
 * An mcp-ui resource carrying the live page. Raw HTML with absolute URLs rather
 * than an external-URL resource, because a host renders it in a sandboxed
 * iframe with no origin of its own — the page has to know where to fetch from.
 */
function surfaceResource(ctx: UiToolContext, surfaceId: string, title?: string): ToolContentBlock {
  return {
    type: 'resource',
    resource: {
      uri: `ui://cre8/surface/${surfaceId}`,
      mimeType: 'text/html;profile=mcp-app',
      text: renderSurfacePage({ surfaceId, title, origin: ctx.publicBase }),
    },
  };
}

export async function handleUiTool(
  name: string,
  args: unknown,
  ctx: UiToolContext
): Promise<ToolContentBlock[]> {
  switch (name) {
    case 'ui_open_surface': {
      const input = UiOpenSurfaceSchema.parse(args);
      const summary = surfaceStore.create({
        title: input.title,
        root: input.spec as never,
        data: input.data,
      });
      const url = viewerUrl(ctx, summary.surfaceId);
      const blocks: ToolContentBlock[] = [
        json({
          ...summary,
          url,
          next: 'Give this URL to the user, then call ui_stream with ops to build the UI live.',
        }),
      ];
      if (ctx.embedResources !== false) {
        blocks.push(surfaceResource(ctx, summary.surfaceId, summary.title));
      }
      return blocks;
    }

    case 'ui_stream': {
      const input = UiStreamSchema.parse(args);
      // data → ops → status. Anything else and a node bound to a value this
      // call introduces fails validation against a data model that does not
      // have it yet.
      if (input.data?.length) {
        surfaceStore.setData(input.surfaceId, input.data as unknown as DataPatch[]);
      }
      if (input.ops?.length) {
        surfaceStore.patch(input.surfaceId, input.ops as unknown as PatchOp[]);
      }
      const summary = input.status
        ? surfaceStore.setStatus(input.surfaceId, input.status as SurfaceState, input.statusMessage)
        : surfaceStore.summary(input.surfaceId);
      return [json({ ...summary, url: viewerUrl(ctx, input.surfaceId) })];
    }

    case 'ui_get_surface': {
      const input = UiGetSurfaceSchema.parse(args);
      return [
        json({ ...surfaceStore.snapshot(input.surfaceId), url: viewerUrl(ctx, input.surfaceId) }),
      ];
    }

    case 'ui_events': {
      const input = UiEventsSchema.parse(args);
      const since = input.since ?? 0;
      const events = input.waitMs
        ? await surfaceStore.awaitEvents(input.surfaceId, since, Math.min(input.waitMs, 60_000))
        : surfaceStore.eventsSince(input.surfaceId, since);
      return [
        json({
          events,
          lastSeq: events.length ? events[events.length - 1].seq : since,
          note: events.length
            ? undefined
            : 'No events yet. Pass waitMs to block instead of polling in a loop.',
        }),
      ];
    }

    case 'ui_close_surface': {
      const input = UiCloseSurfaceSchema.parse(args);
      surfaceStore.close(input.surfaceId);
      return [json({ ok: true, surfaceId: input.surfaceId })];
    }

    default:
      throw new Error(`Unknown UI tool: ${name}`);
  }
}
