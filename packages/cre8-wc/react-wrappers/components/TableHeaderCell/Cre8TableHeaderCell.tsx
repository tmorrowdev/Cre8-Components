import { createComponent } from '@lit/react';
import { Cre8TableHeaderCell as Cre8TableHeaderCellElement } from '@tmorrow/cre8-wc/lib/components/table-header-cell/table-header-cell';
import React from 'react';

export interface Cre8TableHeaderCellProps {
  /** Colspan attribute on th */
  colspan?: number | undefined;
  /** Adds inline width style to th Sets width of entire column */
  width?: string | undefined;
  children?: React.ReactNode;
}

/**
 * Cre8TableHeaderCell component
 */
export const Cre8TableHeaderCell = createComponent({
  react: React,
  tagName: 'cre8-table-header-cell',
  elementClass: Cre8TableHeaderCellElement,

});

export default Cre8TableHeaderCell;
