import { createComponent } from '@lit/react';
import { Cre8LinelengthContainer as Cre8LinelengthContainerElement } from '@tmorrow/cre8-wc/lib/components/linelength-container/linelength-container';
import React from 'react';

export interface Cre8LinelengthContainerProps {
  children?: React.ReactNode;
}

/**
 * Cre8LinelengthContainer component
 */
export const Cre8LinelengthContainer = createComponent({
  react: React,
  tagName: 'cre8-linelength-container',
  elementClass: Cre8LinelengthContainerElement,

});

export default Cre8LinelengthContainer;
