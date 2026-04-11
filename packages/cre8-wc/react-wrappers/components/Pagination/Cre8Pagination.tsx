import { createComponent } from '@lit/react';
import { Cre8Pagination as Cre8PaginationElement } from '@tmorrow/cre8-wc/lib/components/pagination/pagination';
import React from 'react';

export interface Cre8PaginationProps {
  /** Controls how many page buttons are displayVarianted on the page at once, if container size permits. recommended max = 5 pages */
  number?: number | undefined;
  /** | 'icon-only' | 'default' */
  'compact'?: any;
  /** Input the total number of elements are returned from consuming app e.g. search results */
  totalResults?: number;
  /** how many elements will displayVariant per page, indicated by business to typically be 20 */
  pageSize?: any;
  /** Controls how many page buttons are displayVarianted on the page at once, if container size permits. recommended max = 5 pages */
  visiblePages?: number | undefined;
  /** (optional) prop that allows for a compact and icon-only variant both for mobile screen-sizes and for use in certain contexts as guided by design, the component size will show 'default' in the absence of a value on desktop and 'compact' on smaller views. */
  display?: any;
  hideLastAndFirstButtons?: boolean | undefined;
  currentPage?: any;
}

/**
 * The Pagination component is used to split up a large amount of results
 */
export const Cre8Pagination = createComponent({
  react: React,
  tagName: 'cre8-pagination',
  elementClass: Cre8PaginationElement,

});

export default Cre8Pagination;
