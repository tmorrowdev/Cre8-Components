/**
 * One MCP server definition, two transports.
 *
 * `src/index.ts` runs it over stdio for local hosts; `src/app.ts` mounts it at
 * `/mcp` over Streamable HTTP for remote ones. Both get the same tools, so
 * "which transport am I on" never changes what an agent can do — which is the
 * whole claim behind calling this a single connector.
 */

import { createRequire } from 'node:module';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { RESOURCE_MIME_TYPE } from '@modelcontextprotocol/ext-apps';

import {
  tools,
  ListComponentsSchema,
  GetComponentSchema,
  GetPatternsSchema,
  SearchComponentsSchema,
  GenerateCodeSchema,
  GetA2uiCatalogSchema,
  ValidateA2uiSpecSchema,
} from './tools.js';
import {
  handleListComponents,
  handleGetComponent,
  handleGetPatterns,
  handleSearchComponents,
  handleGenerateCode,
  handleGetA2uiCatalog,
  handleValidateA2uiSpec,
} from './handlers.js';
import {
  SURFACE_APP_URI,
  UI_TOOL_NAMES,
  handleUiTool,
  uiTools,
  type UiToolContext,
} from './ui-tools.js';
import { renderSurfaceAppPage, renderSurfacePage } from './surface-page.js';
import { embeddedViewerBase } from './embedded-viewer.js';
import { GetCompositionSchema, compositionTool, handleGetComposition } from './composition.js';
import {
  Cre8GuideSchema,
  GetContentModelSchema,
  handleCre8Guide,
  handleGetContentModel,
  knowledgeTools,
} from './knowledge-tools.js';

/**
 * The published version, read from the manifest rather than repeated here.
 *
 * A second copy had drifted three minors behind the package it describes, so
 * every client — over stdio and at `GET /` alike — was told `0.6.0` no matter
 * which build it was actually talking to, which is worse than saying nothing.
 *
 * `files` ships only `dist`, but npm always includes the manifest itself, so
 * `../package.json` resolves from `dist/mcp-server.js` in an installed copy
 * exactly as it does from `src/` in a checkout.
 */
export const SERVER_VERSION: string = createRequire(import.meta.url)('../package.json').version;

export interface McpServerOptions {
  /**
   * Absolute base URL a browser can reach the surface viewer on. The HTTP
   * server passes its own; stdio leaves it unset and gets an embedded viewer
   * booted on first use, because a surface only exists in the process that
   * created it.
   */
  publicBase?: string;
  /** Set false to skip the mcp-ui resource block on ui_open_surface. */
  embedResources?: boolean;
}

export function createMcpServer(options: McpServerOptions = {}): Server {
  const uiContext: UiToolContext = {
    publicBase: options.publicBase
      ? async () => options.publicBase as string
      : embeddedViewerBase,
    embedResources: options.embedResources,
  };

  const server = new Server(
    { name: 'cre8-mcp', version: SERVER_VERSION },
    { capabilities: { tools: {}, resources: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [...tools, ...knowledgeTools, compositionTool, ...uiTools],
  }));

  /**
   * MCP Apps (SEP-1865): the surface view template, predeclared. The CSP names
   * this server's own origin and nothing else — the template loads the design
   * system, the A2UI runtime, and the view bridge from here, and streams from
   * here, so an apps host can render it with no third-party grants at all.
   *
   * Resolving the origin may boot the embedded viewer on stdio; only hosts
   * that actually speak the extension list or read resources, so the cost
   * lands exactly where the capability is used.
   */
  const surfaceAppMeta = async () => {
    const origin = (await uiContext.publicBase()).replace(/\/$/, '');
    return {
      origin,
      meta: {
        ui: {
          csp: { connectDomains: [origin], resourceDomains: [origin] },
          prefersBorder: true,
        },
      },
    };
  };

  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const { meta } = await surfaceAppMeta();
    return {
      resources: [
        {
          uri: SURFACE_APP_URI,
          name: 'cre8 live surface',
          description:
            'Interactive view for ui_open_surface: renders the surface the tool result names and ' +
            'streams updates from the cre8-mcp server.',
          mimeType: RESOURCE_MIME_TYPE,
          _meta: meta,
        },
      ],
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    const { origin, meta } = await surfaceAppMeta();

    if (uri === SURFACE_APP_URI) {
      return {
        contents: [
          {
            uri,
            mimeType: RESOURCE_MIME_TYPE,
            text: renderSurfaceAppPage({ origin }),
            _meta: meta,
          },
        ],
      };
    }

    // Per-surface pages keep working for hosts that stored the URI a tool
    // result embedded (the pre-SEP mcp-ui flow).
    const perSurface = uri.startsWith(`${SURFACE_APP_URI}/`)
      ? uri.slice(SURFACE_APP_URI.length + 1)
      : null;
    if (perSurface) {
      return {
        contents: [
          {
            uri,
            mimeType: RESOURCE_MIME_TYPE,
            text: renderSurfacePage({ surfaceId: perSurface, origin }),
            _meta: meta,
          },
        ],
      };
    }

    throw new Error(`Unknown resource: ${uri}`);
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      if (UI_TOOL_NAMES.has(name)) {
        const { content, structuredContent } = await handleUiTool(name, args, uiContext);
        return structuredContent ? { content, structuredContent } : { content };
      }

      let result: string;
      switch (name) {
        case 'list_components':
          result = handleListComponents(ListComponentsSchema.parse(args));
          break;
        case 'get_component':
          result = handleGetComponent(GetComponentSchema.parse(args));
          break;
        case 'get_patterns':
          result = handleGetPatterns(GetPatternsSchema.parse(args));
          break;
        case 'search_components':
          result = await handleSearchComponents(SearchComponentsSchema.parse(args));
          break;
        case 'generate_code':
          result = handleGenerateCode(
            GenerateCodeSchema.parse(args) as Parameters<typeof handleGenerateCode>[0]
          );
          break;
        case 'get_a2ui_catalog':
          result = handleGetA2uiCatalog(GetA2uiCatalogSchema.parse(args));
          break;
        case 'get_content_model':
          result = handleGetContentModel(GetContentModelSchema.parse(args));
          break;
        case 'get_composition':
          result = handleGetComposition(GetCompositionSchema.parse(args));
          break;
        case 'cre8_guide':
          result = handleCre8Guide(Cre8GuideSchema.parse(args));
          break;
        case 'validate_a2ui_spec':
          result = handleValidateA2uiSpec({ spec: ValidateA2uiSpecSchema.parse(args).spec });
          break;
        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return { content: [{ type: 'text', text: result }] };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { content: [{ type: 'text', text: `Error: ${message}` }], isError: true };
    }
  });

  return server;
}
