import { createComponent } from '@lit/react';
import { Cre8Popover as Cre8PopoverElement } from '@tmorrow/cre8-wc/lib/components/popover/popover';
import React from 'react';

export interface Cre8PopoverProps {
  /** The heading text that appears at the top of the popover panel. Should only be 2-3 lines max. */
  heading?: string | undefined;
  /** Positions the popover panel absolutely to the trigger - **default** positions the popover panel below the trigger - **top** positions the popover panel below the trigger - **left** positions the popover panel below the trigger - **right** positions the popover panel below the trigger */
  position?: any;
  /** Set to prevent the popover panel from hiding on scroll */
  isVisibleOnScroll?: boolean | undefined;
  /** The dynamic state for the popover - If true, the popover panel placement is determined by its position in the viewport - If false, the popover panel placement will be placed according to the position value */
  isDynamic?: boolean | undefined;
  /** The dynamic active state _This property is dynamically set_ */
  isActiveDynamic?: boolean | undefined;
  /** The active state for the popover - If true, the popover panel is visible - If false, the popover panel is hidden  _This property is dynamically set_ */
  isActive?: boolean | undefined;
  children?: React.ReactNode;
  onOpen?: (event: CustomEvent) => void;
  onClose?: (event: CustomEvent) => void;
}

/**
 * The Popover is for progressive disclosure of relevant content often hidden behind a help or info icon.
 */
export const Cre8Popover = createComponent({
  react: React,
  tagName: 'cre8-popover',
  elementClass: Cre8PopoverElement,
  events: {
    onOpen: 'open',
    onClose: 'close'
  }
});

export default Cre8Popover;
