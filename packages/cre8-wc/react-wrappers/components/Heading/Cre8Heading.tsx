import { createComponent } from '@lit/react';
import { Cre8Heading as Cre8HeadingElement } from '@tmorrow/cre8-wc/lib/components/heading/heading';
import React from 'react';

export interface Cre8HeadingProps {
  /** Dynamic tag name for the component 1) This is needed to use proper semantic heading treatments depending on where the banner lives on the page <cre8-text-passage size="small"> <ul> <li>**h1** renders an `h1` tag</li> <li>**h2** renders an `h2` tag</li> <li>**h3** renders an `h3` tag</li> <li>**h4** renders an `h4` tag</li> <li>**h5** renders an `h5` tag. This is the default</li> <li>**h6** renders an `h6` tag</li> </ul> </cre8-text-passage> */
  tagVariant?: any;
  /** Invert the color of the font from dark to light. An inverted `heading` should be used on a dark background. */
  inverted?: boolean | undefined;
  /** Apply the brand color to the heading text. */
  brandColor?: boolean | undefined;
  /** Heading type <cre8-text-passage size="small"> <ul> <li>**display-default** renders a heading with the heading display-default preset treatment</li> <li>**display-small** renders a heading with the heading display-small preset treatment</li> <li>**headline-large** renders a heading with the heading headline-large preset treatment</li> <li>**headline-default** renders a heading with the heading headline-default preset treatment</li> <li>**headline-small** renders a heading with the heading headline-small preset treatment</li> <li>**title-xlarge** renders a heading with the heading title-xlarge preset treatment</li> <li>**title-large** renders a heading with the heading title-large preset treatment</li> <li>**title-default** renders a heading with the heading title-default preset treatment</li> <li>**title-small** renders a heading with the heading title-small preset treatment</li> <li>**label-large** renders a heading with the label-large preset treatment</li> <li>**label-default** renders a heading with the label-default preset treatment</li> <li>**label-small** renders a heading with the label-small preset treatment</li> <li>**meta-large** renders a heading with the meta-large preset treatment</li> <li>**meta-default** renders a heading with the meta-default preset treatment</li> <li>**meta-small** renders a heading with the meta-small preset treatment</li> </ul> </cre8-text-passage> */
  type?: any;
  children?: React.ReactNode;
}

/**
 * HTML headings are titles or subtitles that you want to display on a webpage. The H1 is the most important and H6
 */
export const Cre8Heading = createComponent({
  react: React,
  tagName: 'cre8-heading',
  elementClass: Cre8HeadingElement,

});

export default Cre8Heading;
