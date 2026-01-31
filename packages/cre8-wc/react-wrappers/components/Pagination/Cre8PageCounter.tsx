import { createComponent } from '@lit/react';
import { Cre8PageCounter as Cre8PageCounterElement } from '@tmorrow/cre8-wc/lib/components/pagination/page-counter/page-counter';
import React from 'react';

export interface Cre8PageCounterProps {
  rangeVariant?: boolean | undefined;
  currentPage?: number;
  totalResults?: number;
  pageSize?: number;
  display?: "compact" | "icon-only" | "default" | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8PageCounter component
 */
export const Cre8PageCounter = createComponent({
  react: React,
  tagName: 'cre8-page-counter',
  elementClass: Cre8PageCounterElement,

});

export default Cre8PageCounter;
