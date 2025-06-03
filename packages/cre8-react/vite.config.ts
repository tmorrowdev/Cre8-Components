import { defineConfig } from 'vite';

// This config is only used for Storybook, not for building the library
export default defineConfig({
  plugins: [],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.scss', '.css']
  }
});