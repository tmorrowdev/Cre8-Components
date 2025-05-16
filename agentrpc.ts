import { AgentRPC } from 'agentrpc';
import { z } from 'zod';
import * as extractCssFromUrl from './packages/cre8-wc/scripts/extract-tokens.js';

export const rpc = new AgentRPC({
  apiSecret: process.env.AGENTRPC_API_SECRET!,
});

rpc.register({
  name: 'extractCssFromUrl',
  description: 'Extract CSS tokens from a given URL',
  schema: z.object({ url: z.string() }),
  handler: async () => {
    return await extractCssFromUrl;
  },
});

rpc.listen();