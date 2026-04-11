import { createComponent } from '@lit/react';
import { Cre8ButtonGroup as Cre8ButtonGroupElement } from '@tmorrow/cre8-wc/lib/components/button-group/button-group';
import React from 'react';

export interface Cre8ButtonGroupProps {
  /** Responsive Button Group (for modals) */
  orientation?: any;
  children?: React.ReactNode;
}

/**
 * Cre8ButtonGroup component
 */
export const Cre8ButtonGroup = createComponent({
  react: React,
  tagName: 'cre8-button-group',
  elementClass: Cre8ButtonGroupElement,

});

export default Cre8ButtonGroup;
