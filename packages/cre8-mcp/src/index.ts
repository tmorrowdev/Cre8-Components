#!/usr/bin/env node
/**
 * Cre8 Design System MCP Server — stdio transport.
 *
 * The tools live in src/mcp-server.ts, shared with the Streamable HTTP mount in
 * src/app.ts. Streaming-UI tools work here too, but they need a reachable
 * viewer: set CRE8_MCP_PUBLIC_URL to a running `cre8-mcp-api`, or the URLs this
 * hands back will point at a localhost port with nothing on it.
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from './mcp-server.js';

async function main() {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Cre8 MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
