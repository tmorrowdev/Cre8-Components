import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@cre8-react': path.resolve(__dirname, '../../packages/cre8-react/src'),
      '@tmorrow/cre8-wc/lib/components': path.resolve(__dirname, '../../packages/cre8-wc/components'),
      '@tmorrow/cre8-wc': path.resolve(__dirname, '../../packages/cre8-wc'),
    },
  },
});
