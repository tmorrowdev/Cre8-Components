import { createComponent } from '@lit/react';
import { Cre8Badge as Cre8BadgeElement } from '@tmorrow/cre8-wc/lib/components/badge/badge';
import React from 'react';

export interface Cre8BadgeProps {
  /** The badge text */
  text?: string;
  /** Status (a color variant prop) - **neutral** (default) renders a badge with a neutral state treatment - **success** renders a badge with success state treatment - **warning** renders a badge with warning state treatment - **error** renders a badge with error state treatment - **info** renders a badge with information state treatment - **attention** renders a badge with attention state treatment */
  status?: string;
  /** Background Style Variant  - **dark|undefined** (default) renders a badge with a dark background - **light** renders a badge with a light background - **white** renders a badge with a white background */
  variant?: string;
  /** SVG as a raw string - For badges with icons, the icon is defined by this prop - Pass in a raw svg as a String. We use raw string loader for this but any method of getting raw svgs will do - Import example:`import svgFeedback from '@tmorrow/cre8-wc/icons/Feedback.svg?raw';` - [cre8-icons Github repo](https://git.express-scripts.com/ExpressScripts/cre8-icons) This is the Github repo for Cre8 icons, which includes a link to the storybook as well as relavant information for new icons */
  svg?: string | undefined;
}

/**
 * Status badges are used most often in tables or fat rows in a list.
 */
export const Cre8Badge = createComponent({
  react: React,
  tagName: 'cre8-badge',
  elementClass: Cre8BadgeElement,

});

export default Cre8Badge;
