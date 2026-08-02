import { createComponent } from '@lit/react';
import { Cre8LinkList as Cre8LinkListElement } from '@tmorrow/cre8-wc/lib/components/link-list/link-list';
import type { Cre8LinkData } from '@tmorrow/cre8-wc/lib/components/link-list/link-list';
import React from 'react';
export type { Cre8LinkData } from '@tmorrow/cre8-wc/lib/components/link-list/link-list';

export interface Cre8LinkListProps {
  /** Behavioral variant - **responsive** renders a horizontal wrapping link list that converts to a stacked link list on large screens - **horizontal** renders a horizontal wrapping link list on all screens */
  behavior?: any;
  /** Inverted variant 1. Used for dark backgrounds */
  inverted?: boolean | undefined;
  /** Size variants - **sm** renders a link list with a smaller typography */
  size?: any;
  /** Spacing between link list items - **condensed** renders a link list with a more compact display */
  spacing?: any;
  /** Style variants - **secondary** renders a link list with a more subtle visual treatment - **display** renders a link list with a display treatment (e.g. article title) */
  variant?: any;
  /** Links for a data-driven list. Each becomes a `cre8-link-list-item`.  Worth knowing if you compose these by hand: the label goes in the item's default slot, *not* its `text` prop. That prop is declared and documented but never rendered, so setting it produces an empty link that passes every check — see the drift ledger in `docs/kb/07-research.md`. This API routes around it. */
  items?: Cre8LinkData[];
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
