import { createComponent } from '@lit/react';
import { Cre8SplitButton as Cre8SplitButtonElement } from '@tmorrow/cre8-wc/lib/components/split-button/split-button';
import React from 'react';

export interface Cre8SplitButtonProps {
  /** Disables both the main button and the dropdown toggle. */
  disabled?: boolean | undefined;
  /** Size variant <cre8-text-passage size="sm"> <ul> <li>**sm** shrinks the button typography and overall size</li> <li>**lg** increases the button typography size and overall size</li> </ul> </cre8-text-passage> */
  size?: any;
  /** Display text on the button */
  buttonText?: string;
  children?: React.ReactNode;
  onSplitButtonTextClick?: (event: CustomEvent) => void;
  onSplitButtonDropdownClick?: (event: CustomEvent) => void;
}

/**
 * Cre8SplitButton component
 */
export const Cre8SplitButton = createComponent({
  react: React,
  tagName: 'cre8-split-button',
  elementClass: Cre8SplitButtonElement,
  events: {
    onSplitButtonTextClick: 'split-button-text-click',
    onSplitButtonDropdownClick: 'split-button-dropdown-click'
  }
});

export default Cre8SplitButton;
