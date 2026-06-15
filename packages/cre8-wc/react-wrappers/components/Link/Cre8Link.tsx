import { createComponent } from '@lit/react';
import { Cre8Link as Cre8LinkElement } from '@tmorrow/cre8-wc/lib/components/link/link';
import React from 'react';

export interface Cre8LinkProps {
  /** Href attribute of the anchor tag */
  href?: string;
  /** Rel attribute of the anchor tag */
  rel?: string | undefined;
  /** Target attribute for a link (i.e. set to _blank to open in new tab) - **_blank** yields a link that opens in a new tab - **_self** yields a link that loads the URL into the same browsing context as the current one.   This is the default behavior - **_parent** yields a link that loads the URL into the parent browsing context of the current one.   If there is no parent, this behaves the same way as _self - **_top** yields a link that loads the URL into the top-level browsing context.   If there is no parent, this behaves the same way as _self. */
  target?: any;
  /** DEPRECATED: Icon name, use svg instead */
  iconName?: string | undefined;
  /** svg as a raw string - For links with icon, the icon is defined by this prop. - Pass in a raw svg as a String for using <cre8-icon> */
  svg?: string | undefined;
  /** iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction */
  iconRotateDegree?: number | undefined;
  /** iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction */
  iconFlipDirection?: string | undefined;
  /** Icon position - **before** places the icon before the button text - **after** places the icon after the button text */
  iconPosition?: any;
  /** Call To Action Icon */
  ctaIcon?: string;
  /** Call To Action Link */
  ctaLink?: boolean | undefined;
  /** Link with no underline */
  noUnderline?: boolean | undefined;
  /** Size variant (default is medium) - **sm** shrinks the link typography and overall size - **lg** increases the link typography size and overall size */
  size?: any;
  /** Inverted colors Link (onDark) */
  inverted?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * Link Component are strictly used in the case where the component will take
 */
export const Cre8Link = createComponent({
  react: React,
  tagName: 'cre8-link',
  elementClass: Cre8LinkElement,

});

export default Cre8Link;
