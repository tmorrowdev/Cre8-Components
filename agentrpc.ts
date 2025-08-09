import { AgentRPC } from 'agentrpc';
import { z } from 'zod';
import * as extractCssFromUrl from './packages/cre8-wc/scripts/extract-tokens.js';

export const rpc = new AgentRPC({
  apiSecret:'030ef7b8910a8b0c1a8733f77d43f3b6',
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