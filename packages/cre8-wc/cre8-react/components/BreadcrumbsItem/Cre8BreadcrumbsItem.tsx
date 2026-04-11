import { createComponent } from '@lit/react';
import { Cre8BreadcrumbsItem as Cre8BreadcrumbsItemElement } from '@tmorrow/cre8-wc/lib/components/breadcrumbs-item/breadcrumbs-item';
import React from 'react';

export interface Cre8BreadcrumbsItemProps {
  children?: React.ReactNode;
}

/**
 * Cre8BreadcrumbsItem component
 */
export const Cre8BreadcrumbsItem = createComponent({
  react: React,
  tagName: 'cre8-breadcrumbs-item',
  elementClass: Cre8BreadcrumbsItemElement,

});

export default Cre8BreadcrumbsItem;
