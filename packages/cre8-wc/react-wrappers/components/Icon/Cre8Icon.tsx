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
  /** URL of an external icon sprite. When set (or when `window.Cre8_ICON_URL` is set) the icon renders `<use href="{iconUrl}#{name}">`, which only works for a same-origin sprite. Leave unset to inline the symbol from the bundled sprite. */
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
