import { createComponent } from '@lit/react';
import { Cre8Section as Cre8SectionElement } from '@tmorrow/cre8-wc/lib/components/section/section';
import React from 'react';

export interface Cre8SectionProps {
  /** The Headline will be rendered as the Section Headline with the correct brand styling applied */
  headline?: string | undefined;
  children?: React.ReactNode;
}

/**
 * The section component acts as a block level HTML element that takes a 'headline' property
 */
export const Cre8Section = createComponent({
  react: React,
  tagName: 'cre8-section',
  elementClass: Cre8SectionElement,

});

export default Cre8Section;
