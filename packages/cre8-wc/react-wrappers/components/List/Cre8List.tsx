import { createComponent } from '@lit/react';
import { Cre8List as Cre8ListElement } from '@tmorrow/cre8-wc/lib/components/list/list';
import type { Cre8ListItemData } from '@tmorrow/cre8-wc/lib/components/list/list';
import React from 'react';
export type { Cre8ListItemData } from '@tmorrow/cre8-wc/lib/components/list/list';

export interface Cre8ListProps {
  /** Style variants <cre8-text-passage size="sm"> <ul> <li>**bare** removes any lines from in between list items</li> </ul> </cre8-text-passage> */
  variant?: any;
  /** Spacing variants <cre8-text-passage size="sm"> <ul> <li>**padded** applies more padding in between list items compared to the default</li> <li>**condensed** reduces padding in between list items compared to the default</li> </ul> </cre8-text-passage> */
  spacing?: any;
  /** Items for a data-driven list. Set this and the list builds its own `cre8-list-item` children in the light DOM — the same composition you would write by hand. Leave it unset to compose the list yourself. */
  items?: Cre8ListItemData[];
  children?: React.ReactNode;
}

/**
 * Cre8List component
 */
export const Cre8List = createComponent({
  react: React,
  tagName: 'cre8-list',
  elementClass: Cre8ListElement,

});

export default Cre8List;
