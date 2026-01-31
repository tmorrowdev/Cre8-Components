import { createComponent } from '@lit/react';
import { Cre8LinkList as Cre8LinkListElement } from '@tmorrow/cre8-wc/lib/components/link-list/link-list';
import React from 'react';

export interface Cre8LinkListProps {
  /** Behavioral variant - **responsive** renders a horizontal wrapping link list that converts to a stacked link list on large screens - **horizontal** renders a horizontal wrapping link list on all screens */
  behavior?: "horizontal" | "responsive" | undefined;
  /** Inverted variant 1. Used for dark backgrounds */
  inverted?: boolean | undefined;
  /** Size variants - **sm** renders a link list with a smaller typography */
  size?: "sm" | undefined;
  /** Spacing between link list items - **condensed** renders a link list with a more compact display */
  spacing?: "condensed" | undefined;
  /** Style variants - **secondary** renders a link list with a more subtle visual treatment - **display** renders a link list with a display treatment (e.g. article title) */
  variant?: "secondary" | "display" | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8LinkList component
 */
export const Cre8LinkList = createComponent({
  react: React,
  tagName: 'cre8-link-list',
  elementClass: Cre8LinkListElement,

});

export default Cre8LinkList;
