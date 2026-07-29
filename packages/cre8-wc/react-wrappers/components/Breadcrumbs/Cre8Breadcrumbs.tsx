import { createComponent } from '@lit/react';
import { Cre8Breadcrumbs as Cre8BreadcrumbsElement } from '@tmorrow/cre8-wc/lib/components/breadcrumbs/breadcrumbs';
import type { Cre8BreadcrumbData } from '@tmorrow/cre8-wc/lib/components/breadcrumbs/breadcrumbs';
import React from 'react';
export type { Cre8BreadcrumbData } from '@tmorrow/cre8-wc/lib/components/breadcrumbs/breadcrumbs';

export interface Cre8BreadcrumbsProps {
  /** aria-label attribute to designate at name for the nav. Can be override by user */
  navAriaLabel?: string;
  /** Crumbs for a data-driven trail. Each becomes a `cre8-breadcrumbs-item`, wrapping a `cre8-text-link` when it has an `href`. */
  items?: Cre8BreadcrumbData[];
}

/**
 * Cre8Breadcrumbs component
 */
export const Cre8Breadcrumbs = createComponent({
  react: React,
  tagName: 'cre8-breadcrumbs',
  elementClass: Cre8BreadcrumbsElement,

});

export default Cre8Breadcrumbs;
