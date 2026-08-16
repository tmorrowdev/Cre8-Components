import { setProjectAnnotations } from '@storybook/web-components-vite';
import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import * as previewAnnotations from './preview';

// Applies .storybook/preview.ts configuration (themes, decorators, the custom
// elements manifest) to stories when they run as Vitest browser tests. The
// vitest addon loads the returned beforeAll hook automatically.
setProjectAnnotations([a11yAddonAnnotations, previewAnnotations]);
