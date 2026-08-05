import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// Reuses the library Vite config so tests get the same module resolution as the
// build: the `@tmorrow/cre8-wc` alias and the inline-svg-raw plugin that turns
// `*.svg?raw` imports into string constants. The build.lib section is inert here.
export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            // The suite was written for Jest and calls describe/test/expect without
            // importing them. Globals keep those 58 files untouched.
            globals: true,
            setupFiles: ['./vitest.setup.ts'],
            include: ['components/**/test/*.test.ts'],
            css: false,
            // vitest-canvas-mock ships CJS and must be inlined to be transformed.
            server: { deps: { inline: ['vitest-canvas-mock'] } },
            coverage: {
                provider: 'v8',
                include: ['components/**/*.ts'],
                exclude: [
                    'components/**/*.d.ts',
                    'components/**/*.stories.ts',
                    'components/**/test/**',
                ],
                reporter: ['text', 'lcov', 'clover', 'json'],
            },
        },
    })
);
