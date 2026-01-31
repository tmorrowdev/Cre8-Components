import { createComponent } from '@lit/react';
import { Cre8Table as Cre8TableElement } from '@tmorrow/cre8-wc/lib/components/table/table';
import React from 'react';

export interface Cre8TableProps {
  /** Specifies the caption/title of the table, visible to all users. Increases accessibility of table. */
  caption?: string | undefined;
  /** Behavior variants <cre8-text-passage size="sm"> <ul> <li>**responsive** stacks column headers with respective table cells on small screens</li> </ul> </cre8-text-passage> */
  behavior?: "responsive" | undefined;
  /** Hoverable rows variant 1) Allows the table rows to be styled on hover */
  isHoverable?: boolean | undefined;
  /** Style variants <cre8-text-passage size="sm"> <ul> <li>**striped** add zebra-striping to table rows within the `<tbody>`</li> </ul> </cre8-text-passage> */
  variant?: "striped" | undefined;
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
