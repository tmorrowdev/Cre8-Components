import { createComponent } from '@lit/react';
import { Cre8PercentBar as Cre8PercentBarElement } from '@tmorrow/cre8-wc/lib/components/percent-bar/percent-bar';
import React from 'react';

export interface Cre8PercentBarProps {
  value?: number;
  max?: number;
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
