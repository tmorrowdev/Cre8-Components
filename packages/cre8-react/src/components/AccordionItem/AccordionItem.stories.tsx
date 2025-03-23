import type { StoryObj } from '@storybook/react';
import React from 'react';
import { cre8AccordionItem, cre8TextPassage } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'cre8 Components/Accordion/Accordion Item',
  component: cre8AccordionItem,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
};

export const Default: StoryObj<typeof cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    children: (
      <>
        <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
      </>
    ),
  },
};

export const IconBefore: StoryObj<typeof cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    iconBefore: true,
    children: (
      <>
        <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
      </>
    ),
  },
};
export const tertiaryIcon: StoryObj<typeof cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    tertiaryIcon: true,
    children: (
      <>
        <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
      </>
    ),
  },
};
export const tertiaryIconBefore: StoryObj<typeof cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    tertiaryIcon: true,
    iconBefore: true,
    children: (
      <>
        <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
      </>
    ),
  },
};
export const LargeHeader: StoryObj<typeof cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    tertiaryIcon: true,
    iconBefore: false,
    size: 'lg',
    children: (
      <>
        <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
      </>
    ),
  },
};
export const BrandColoredHeader: StoryObj<typeof cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    tertiaryIcon: true,
    iconBefore: false,
    brandHeader: true,
    size: 'sm',
    children: (
      <>
        <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
      </>
    ),
  },
};
export const HeadingTagVariantH2: StoryObj<typeof cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    tertiaryIcon: true,
    iconBefore: false,
    brandHeader: true,
    size: 'sm',
    headingTagVariant: 'h2',
    children: (
      <>
        <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
      </>
    ),
  },
};
