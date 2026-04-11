import { createComponent } from '@lit/react';
import { Cre8SelectTileList as Cre8SelectTileListElement } from '@tmorrow/cre8-wc/lib/components/select-tile-list/select-tile-list';
import React from 'react';

export interface Cre8SelectTileListProps {
  /** Whether to show the tiles side by side (columns) or stacked vertically (rows). */
  variant?: any;
  /** Select Tile container label */
  label?: string | undefined;
  /** Select Tile container fieldnote */
  fieldNote?: string | undefined;
  /** Select Tile container fieldnote aria describe by */
  ariaDescribedBy?: string | undefined;
  /** Select Tile container fieldnote icon name */
  fieldNoteIconName?: string | undefined;
  /** Select Tile container fieldnote knockout */
  fieldNoteKnockout?: boolean | undefined;
  /** Select Tile container fieldnote isSuccess */
  fieldNoteIsSuccess?: boolean | undefined;
  /** Select Tile container fieldnote isError */
  fieldNoteIsError?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Select Tile List is a container design to hold multiple Select Tile Components.
 */
export const Cre8SelectTileList = createComponent({
  react: React,
  tagName: 'cre8-select-tile-list',
  elementClass: Cre8SelectTileListElement,

});

export default Cre8SelectTileList;
