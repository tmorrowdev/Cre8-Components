// Mirrors the old jest.config.cjs `setupFilesAfterEach` chain.
// Order matters: the polyfill must patch ElementInternals before any component
// module is imported, or form-associated controls lose form participation.
import 'element-internals-polyfill';
// vitest port of jest-canvas-mock; the original calls jest.fn() internally,
// which does not exist under vitest.
import 'vitest-canvas-mock';
import '@testing-library/jest-dom/vitest';
import './matchMedia.js';
import './toBeAccessible';
