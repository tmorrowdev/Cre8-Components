import { createComponent } from '@lit/react';
import { Cre8Icon as Cre8IconElement } from '@tmorrow/cre8-wc/lib/components/icon/icon';
import React from 'react';

export interface Cre8IconProps {
  /** Focusable */
  focusable?: boolean | undefined;
  /** Icon name (this method of passing in svgs is to be deprecated) */
  name?: string;
  /** Raw SVG markup to render. Preferred over `name`/sprite-path icons. */
  svg?: string | undefined;
  /** Icon path 1) This points to the file where the icon sprite lives 2) This method of pathing will soon be depricated */
  iconUrl?: string | undefined;
  /** Icon Title, this string is used for the aira-label of the svg */
  iconTitle?: string | undefined;
}

/**
 * <svg> is a web component, which can be used with any frontend framework and use any svg.
 */
export const Cre8Icon = createComponent({
  react: React,
  tagName: 'cre8-icon',
  elementClass: Cre8IconElement,

});

export default Cre8Icon;
