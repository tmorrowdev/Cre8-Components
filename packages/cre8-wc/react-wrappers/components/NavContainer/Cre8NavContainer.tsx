import { createComponent } from '@lit/react';
import { Cre8NavContainer as Cre8NavContainerElement } from '@tmorrow/cre8-wc/lib/components/nav-container/nav-container';
import React from 'react';

export interface Cre8NavContainerProps {
  children?: React.ReactNode;
}

/**
 * Cre8NavContainer component
 */
export const Cre8NavContainer = createComponent({
  react: React,
  tagName: 'cre8-nav-container',
  elementClass: Cre8NavContainerElement,

});

export default Cre8NavContainer;
