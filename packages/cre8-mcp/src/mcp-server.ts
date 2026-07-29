/**
 * One MCP server definition, two transports.
 *
 * `src/index.ts` runs it over stdio for local hosts; `src/app.ts` mounts it at
 * `/mcp` over Streamable HTTP for remote ones. Both get the same tools, so
 * "which transport am I on" never changes what an agent can do — which is the
 * whole claim behind calling this a single connector.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

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
import { UI_TOOL_NAMES, handleUiTool, uiTools, type UiToolContext } from './ui-tools.js';
import {
  Cre8GuideSchema,
  GetContentModelSchema,
  handleCre8Guide,
  handleGetContentModel,
  knowledgeTools,
} from './knowledge-tools.js';

export const SERVER_VERSION = '0.6.0';

export interface McpServerOptions {
  /** Absolute base URL a browser can reach the surface viewer on. */
  publicBase?: string;
  /** Set false to skip the mcp-ui resource block on ui_open_surface. */
  embedResources?: boolean;
}

export function createMcpServer(options: McpServerOptions = {}): Server {
  const uiContext: UiToolContext = {
    publicBase:
      options.publicBase ??
      process.env.CRE8_MCP_PUBLIC_URL ??
      `http://localhost:${process.env.PORT || '3001'}`,
    embedResources: options.embedResources,
  };

  const server = new Server(
    { name: 'cre8-mcp', version: SERVER_VERSION },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [...tools, ...knowledgeTools, ...uiTools],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      if (UI_TOOL_NAMES.has(name)) {
        return { content: await handleUiTool(name, args, uiContext) };
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
          result = handleSearchComponents(SearchComponentsSchema.parse(args));
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
