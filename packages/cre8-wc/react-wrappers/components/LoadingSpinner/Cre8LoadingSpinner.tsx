import { createComponent } from '@lit/react';
import { Cre8LoadingSpinner as Cre8LoadingSpinnerElement } from '@tmorrow/cre8-wc/lib/components/loading-spinner/loading-spinner';
import React from 'react';

export interface Cre8LoadingSpinnerProps {
  /** Mode of the spinner, defaults to indeterminate. If true, renders a standard progress indicator, fills via the progress property from 0% to 100%. If false or undefined, renders indeterminate spinner which animates in a spinning motion until component is destroyed. */
  determinate?: boolean | undefined;
  /** Inverse property used for dark backgrounds. */
  inverse?: boolean | undefined;
  /** Neutral property used for secondary neutral loading button. */
  neutral?: boolean | undefined;
  /** Property that specifies which button variant is using the loading spinner */
  buttonVariant?: "primary" | "secondary" | "tertiary" | undefined;
  /** Label to show along with progress indicator. This is required to meet accessibility requirements for this component. */
  label?: string | undefined;
  /** Progress to display, between 0 and 100. Requires determinate property to be set to true. */
  progress?: number;
  /** Size of the progress indicator and position of the label, if a label has been defined using the label property. - **large** renders a large progress indicator at 72px in width/height with the label below. - **small** renders a small progress indicator at 24px in width/height with the label to the right. */
  size?: "large" | "small" | undefined;
}

/**
 * A loading spinner notifies the user that their request is being processed while the front end is retrieving data
 */
export const Cre8LoadingSpinner = createComponent({
  react: React,
  tagName: 'cre8-loading-spinner',
  elementClass: Cre8LoadingSpinnerElement,

});

export default Cre8LoadingSpinner;
