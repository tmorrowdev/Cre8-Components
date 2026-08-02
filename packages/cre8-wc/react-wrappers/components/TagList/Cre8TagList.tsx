import { createComponent } from '@lit/react';
import { Cre8TagList as Cre8TagListElement } from '@tmorrow/cre8-wc/lib/components/tag-list/tag-list';
import type { Cre8TagData } from '@tmorrow/cre8-wc/lib/components/tag-list/tag-list';
import React from 'react';
export type { Cre8TagData } from '@tmorrow/cre8-wc/lib/components/tag-list/tag-list';

export interface Cre8TagListProps {
  /** The unique id of the select */
  fieldId?: string | undefined;
  /** Tag list legend label */
  label?: string | undefined;
  /** Tags for a data-driven tag list. Set this and the list builds its own `cre8-tag` children in the light DOM. Leave it unset to compose them yourself. */
  tags?: Cre8TagData[];
  children?: React.ReactNode;
}

/**
 * Tag List must have children which are Tag components that are of type `checkbox` or `radio`.
 */
export const Cre8TagList = createComponent({
  react: React,
  tagName: 'cre8-tag-list',
  elementClass: Cre8TagListElement,

});

export default Cre8TagList;
