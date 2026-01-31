import { createComponent } from '@lit/react';
import { Cre8Breadcrumbs as Cre8BreadcrumbsElement } from '@tmorrow/cre8-wc/lib/components/breadcrumbs/breadcrumbs';
import React from 'react';

export interface Cre8BreadcrumbsProps {
  /** aria-label attribute to designate at name for the nav. Can be override by user */
  navAriaLabel?: string;
  children?: React.ReactNode;
}

/**
 * The breadcrumbs component is a secondary navigation pattern that helps a user understand where the user is located.
 */
export const Cre8Breadcrumbs = createComponent({
  react: React,
  tagName: 'cre8-breadcrumbs',
  elementClass: Cre8BreadcrumbsElement,

});

export default Cre8Breadcrumbs;
