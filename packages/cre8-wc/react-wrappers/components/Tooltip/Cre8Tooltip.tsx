import { createComponent } from '@lit/react';
import { Cre8Tooltip as Cre8TooltipElement } from '@tmorrow/cre8-wc/lib/components/tooltip/tooltip';
import React from 'react';

export interface Cre8TooltipProps {
  /** Positions the tooltip panel absolutely to the icon. Position overrides `isDynamic`. */
  position?: "default"|"top"|"left"|"right";
  /** The knockout variant for the tooltip */
  knockout?: boolean | undefined;
  /** The dynamic state for the tooltip. Position overrides isDynamic. */
  isDynamic?: boolean | undefined;
  /** The dynamic active state */
  isActiveDynamic?: boolean | undefined;
  /** The active state for the tooltip */
  isActive?: boolean | undefined;
  /** Accepts the ID string of the item the tooltip is referencing */
  ariaDescribes?: string | undefined;
  /** Internal unique id used to associate the trigger with the tooltip text. Generated automatically. */
  _uniqueId?: string | undefined;
  /** svg as a raw string - The icon is defined by this prop. - Pass in a raw svg as a String for using <cre8-icon> */
  svg?: string | undefined;
  /** iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction */
  iconRotateDegree?: number | undefined;
  /** iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction */
  iconFlipDirection?: string | undefined;
  children?: React.ReactNode;
  onTooltipOpen?: (event: CustomEvent) => void;
  onTooltipClose?: (event: CustomEvent) => void;
}

/**
 * The purpose of tooltips is to provide a tip or hint about what a tool, icon, link, or other interaction does.
 */
export const Cre8Tooltip = createComponent({
  react: React,
  tagName: 'cre8-tooltip',
  elementClass: Cre8TooltipElement,
  events: {
    onTooltipOpen: 'tooltip-open',
    onTooltipClose: 'tooltip-close'
  }
});

export default Cre8Tooltip;
