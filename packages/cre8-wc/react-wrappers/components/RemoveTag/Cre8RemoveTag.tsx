import { createComponent } from '@lit/react';
import { Cre8RemoveTag as Cre8RemoveTagElement } from '@tmorrow/cre8-wc/lib/components/remove-tag/remove-tag';
import React from 'react';

export interface Cre8RemoveTagProps {
  /** The tag text */
  text?: string | undefined;
  /** The tag color scheme   - **neutral** should be used when doing non-link actions such as filters or multi-select, within forms, etc.  - **neutral-hybrid** should be used for when tags are doing an action like a button or a link  - **branded** should be used like Neutral, but for marketing / actionable items */
  color?: any;
  /** The tag shape  - **round** will give the tag a rounded border - **square** will give the tag a squared border */
  shape?: any;
  /** Disabled state for remove tag */
  disabled?: boolean | undefined;
  onRemoveTagClick?: (event: CustomEvent) => void;
}

/**
 * Clicking a Remove Tag causes it to disappear from the page or field (in the case of Multi-Select).
 */
export const Cre8RemoveTag = createComponent({
  react: React,
  tagName: 'cre8-remove-tag',
  elementClass: Cre8RemoveTagElement,
  events: {
    onRemoveTagClick: 'remove-tag-click'
  }
});

export default Cre8RemoveTag;
