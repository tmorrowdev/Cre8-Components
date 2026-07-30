import { createComponent } from '@lit/react';
import { Cre8Table as Cre8TableElement } from '@tmorrow/cre8-wc/lib/components/table/table';
import type { Cre8TableColumn, Cre8TableRowData } from '@tmorrow/cre8-wc/lib/components/table/table';
import React from 'react';
export type { Cre8TableColumn, Cre8TableRowData } from '@tmorrow/cre8-wc/lib/components/table/table';

export interface Cre8TableProps {
  /** Columns for a data-driven table. Set this with `rows` and the table builds its own header, body, rows and cells — the same composition you would write by hand, generated into the light DOM, so nothing about styling or behaviour changes.  Leave both unset to compose the table yourself with `cre8-table-header`, `cre8-table-body` and friends. Do not do both on one table. */
  columns?: Cre8TableColumn[];
  /** Rows for a data-driven table. Each row is either an object keyed by the columns' `key`, or an array of values positioned to match `columns`. */
  rows?: Cre8TableRowData[];
  /** Specifies the caption/title of the table, visible to all users. Increases accessibility of table. */
  caption?: string | undefined;
  /** Behavior variants <cre8-text-passage size="sm"> <ul> <li>**responsive** stacks column headers with respective table cells on small screens</li> </ul> </cre8-text-passage> */
  behavior?: any;
  /** Hoverable rows variant 1) Allows the table rows to be styled on hover */
  isHoverable?: boolean | undefined;
  /** Style variants <cre8-text-passage size="sm"> <ul> <li>**striped** add zebra-striping to table rows within the `<tbody>`</li> </ul> </cre8-text-passage> */
  variant?: any;
  children?: React.ReactNode;
}

/**
 * Cre8Table component
 */
export const Cre8Table = createComponent({
  react: React,
  tagName: 'cre8-table',
  elementClass: Cre8TableElement,

});

export default Cre8Table;
