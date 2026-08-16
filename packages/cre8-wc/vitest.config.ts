import { defineConfig, mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import viteConfig from './vite.config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Reuses the library Vite config so tests get the same module resolution as the
// build: the `@tmorrow/cre8-wc` alias and the inline-svg-raw plugin that turns
// `*.svg?raw` imports into string constants. The build.lib section is inert here.
export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            projects: [
                {
                    // Unit tests: the pre-existing jsdom suite.
                    extends: true,
                    test: {
                        name: 'unit',
                        environment: 'jsdom',
                        // The suite was written for Jest and calls describe/test/expect
                        // without importing them. Globals keep those files untouched.
                        globals: true,
                        setupFiles: ['./vitest.setup.ts'],
                        include: ['components/**/test/*.test.ts'],
                        css: false,
                        // vitest-canvas-mock ships CJS and must be inlined to be transformed.
                        server: { deps: { inline: ['vitest-canvas-mock'] } },
                    },
                },
                {
                    // Storybook component tests: play-function stories run in real
                    // Chromium. Scoped by tag so only stories opted in with
                    // `tags: ['pattern']` become tests - not the whole catalog.
                    extends: true,
                    plugins: [
                        storybookTest({
                            configDir: path.join(dirname, '.storybook'),
                            storybookScript: 'pnpm storybook --no-open',
                            tags: { include: ['pattern'] },
                        }),
                    ],
                    test: {
                        name: 'storybook',
                        browser: {
                            enabled: true,
                            provider: playwright({}),
                            headless: true,
                            instances: [{ browser: 'chromium' }],
                        },
                        setupFiles: ['./.storybook/vitest.setup.ts'],
                    },
                },
            ],
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
