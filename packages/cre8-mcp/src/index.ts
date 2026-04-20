#!/usr/bin/env node
/**
 * Cre8 Design System MCP Server
 *
 * Provides component intelligence for @tmorrow/cre8-wc to AI agents
 * via the Model Context Protocol (stdio transport).
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

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

// Create server instance
const server = new Server(
  {
    name: 'cre8-mcp',
    version: '0.5.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: string;

    switch (name) {
      case 'list_components': {
        const input = ListComponentsSchema.parse(args);
        result = handleListComponents(input);
        break;
      }
      case 'get_component': {
        const input = GetComponentSchema.parse(args);
        result = handleGetComponent(input);
        break;
      }
      case 'get_patterns': {
        const input = GetPatternsSchema.parse(args);
        result = handleGetPatterns(input);
        break;
      }
      case 'search_components': {
        const input = SearchComponentsSchema.parse(args);
        result = handleSearchComponents(input);
        break;
      }
      case 'generate_code': {
        const input = GenerateCodeSchema.parse(args);
        result = handleGenerateCode(input as Parameters<typeof handleGenerateCode>[0]);
        break;
      }
      case 'get_a2ui_catalog': {
        const input = GetA2uiCatalogSchema.parse(args);
        result = handleGetA2uiCatalog(input);
        break;
      }
      case 'validate_a2ui_spec': {
        const input = ValidateA2uiSpecSchema.parse(args);
        result = handleValidateA2uiSpec({ spec: input.spec });
        break;
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [{ type: 'text', text: result }],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: [{ type: 'text', text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Cre8 MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
