import { createComponent } from '@lit/react';
import { Cre8ProgressStepsItem as Cre8ProgressStepsItemElement } from '@tmorrow/cre8-wc/lib/components/progress-steps-item/progress-steps-item';
import React from 'react';

export interface Cre8ProgressStepsItemProps {
  /** Optional message to display under the step name. */
  message?: string;
  /** The name of the step. */
  name?: string;
  /** The state of the step: 'complete', 'current', 'error',' incomplete', 'warning'; */
  state?: string;
  /** An SVG string to use as the step icon. */
  svg?: string;
  children?: React.ReactNode;
}

/**
 * The Progress Steps Item component is used to display a single step in a multi-step process.
 */
export const Cre8ProgressStepsItem = createComponent({
  react: React,
  tagName: 'cre8-progress-steps-item',
  elementClass: Cre8ProgressStepsItemElement,

});

export default Cre8ProgressStepsItem;
