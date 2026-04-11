import { createComponent } from '@lit/react';
import { Cre8ListItem as Cre8ListItemElement } from '@tmorrow/cre8-wc/lib/components/list-item/list-item';
import React from 'react';

export interface Cre8ListItemProps {
  children?: React.ReactNode;
}

/**
 * Cre8ListItem component
 */
export const Cre8ListItem = createComponent({
  react: React,
  tagName: 'cre8-list-item',
  elementClass: Cre8ListItemElement,

});

export default Cre8ListItem;
