import { createComponent } from '@lit/react';
import { Cre8ProgressSteps as Cre8ProgressStepsElement } from '@tmorrow/cre8-wc/lib/components/progress-steps/progress-steps';
import React from 'react';

export interface Cre8ProgressStepsProps {
  children?: React.ReactNode;
}

/**
 * The Progress Steps component is used to display where a user is in a multistep process.
 */
export const Cre8ProgressSteps = createComponent({
  react: React,
  tagName: 'cre8-progress-steps',
  elementClass: Cre8ProgressStepsElement,

});

export default Cre8ProgressSteps;
