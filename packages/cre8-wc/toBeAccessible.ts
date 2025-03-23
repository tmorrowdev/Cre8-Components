/* eslint-disable @typescript-eslint/no-namespace */

import { expect } from '@jest/globals';
import { axe, toHaveNoViolations } from 'jest-axe';

const defaultAxeOptions = {
    runOnly: {
        type: 'tag' as const,
    // Note that although WCAG 2.1 is inclusive of WCAG 2.0 in their guidelines, axe-core currently
    // still separates these tags so we must include them for coverage.
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    },
};

// axeOptions: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#options-parameter
const toBeAccessible = async (html: HTMLElement) => {
    const results = await axe(html, { ...defaultAxeOptions, frameWaitTime: 10000 });
    return toHaveNoViolations.toHaveNoViolations(results);
};

expect.extend({ toBeAccessible });


declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAccessible(): R;
    }
  }
}
