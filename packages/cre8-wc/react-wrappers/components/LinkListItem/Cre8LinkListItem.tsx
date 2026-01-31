import { createComponent } from '@lit/react';
import { Cre8LinkListItem as Cre8LinkListItemElement } from '@tmorrow/cre8-wc/lib/components/link-list-item/link-list-item';
import React from 'react';

export interface Cre8LinkListItemProps {
  /** The link text */
  text?: string | undefined;
  /** Active link */
  isActive?: boolean | undefined;
  /** The link URL */
  href?: string | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8LinkListItem component
 */
export const Cre8LinkListItem = createComponent({
  react: React,
  tagName: 'cre8-link-list-item',
  elementClass: Cre8LinkListItemElement,

});

export default Cre8LinkListItem;
