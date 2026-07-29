import { createComponent } from '@lit/react';
import { Cre8ProgressSteps as Cre8ProgressStepsElement } from '@tmorrow/cre8-wc/lib/components/progress-steps/progress-steps';
import type { Cre8ProgressStepData } from '@tmorrow/cre8-wc/lib/components/progress-steps/progress-steps';
import React from 'react';
export type { Cre8ProgressStepData } from '@tmorrow/cre8-wc/lib/components/progress-steps/progress-steps';

export interface Cre8ProgressStepsProps {
  /** Steps for a data-driven progress indicator. Note that the visible label is each item's `name` prop rather than its content — `cre8-progress-steps-item` does not render children, which is easy to get wrong by hand. */
  steps?: Cre8ProgressStepData[];
}

/**
 * Cre8ProgressSteps component
 */
export const Cre8ProgressSteps = createComponent({
  react: React,
  tagName: 'cre8-progress-steps',
  elementClass: Cre8ProgressStepsElement,

});

export default Cre8ProgressSteps;
