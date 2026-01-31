import { createComponent } from '@lit/react';
import { Cre8PercentBar as Cre8PercentBarElement } from '@tmorrow/cre8-wc/lib/components/percent-bar/percent-bar';
import React from 'react';

export interface Cre8PercentBarProps {
  /** The current step the user is on. */
  value?: number;
  /** The total number of steps in the multistep process. */
  max?: number;
  /** The action-left icon-only tertiary button in the percent bar controls can be disabled. */
  disableActionLeft?: boolean | undefined;
  onLeftActionButtonClick?: (event: CustomEvent) => void;
}

/**
 * The percent bar visually indicates a user's current progress and has a few features: a basic display bar with
 */
export const Cre8PercentBar = createComponent({
  react: React,
  tagName: 'cre8-percent-bar',
  elementClass: Cre8PercentBarElement,
  events: {
    onLeftActionButtonClick: 'leftActionButtonClick'
  }
});

export default Cre8PercentBar;
