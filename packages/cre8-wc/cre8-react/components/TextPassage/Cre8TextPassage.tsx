import { createComponent } from '@lit/react';
import { Cre8TextPassage as Cre8TextPassageElement } from '@tmorrow/cre8-wc/lib/components/text-passage/text-passage';
import React from 'react';

export interface Cre8TextPassageProps {
  /** Inverted variant 1) Used for dark backgrounds */
  inverted?: boolean | undefined;
  /** Size variant - **small** renders smaller typography than the default variant - **default** renders default typography variant - **large** renders larger typography than the default variant */
  size?: any;
  children?: React.ReactNode;
}

/**
 * The text-passage component acts a general wrapper element
 */
export const Cre8TextPassage = createComponent({
  react: React,
  tagName: 'cre8-text-passage',
  elementClass: Cre8TextPassageElement,

});

export default Cre8TextPassage;
