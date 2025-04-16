import type { StoryObj } from '@storybook/react';
import React from 'react';
import { Cre8AccordionItem, Cre8TextPassage } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/Accordion/Accordion Item',
  component: Cre8AccordionItem,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
};

export const Default: StoryObj<typeof Cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    children: (
      <>
        <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
      </>
    ),
  },
};

export const IconBefore: StoryObj<typeof Cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    iconBefore: true,
    children: (
      <>
        <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
      </>
    ),
  },
};
export const tertiaryIcon: StoryObj<typeof Cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    tertiaryIcon: true,
    children: (
      <>
        <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
      </>
    ),
  },
};
export const tertiaryIconBefore: StoryObj<typeof Cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    tertiaryIcon: true,
    iconBefore: true,
    children: (
      <>
        <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
      </>
    ),
  },
};
export const LargeHeader: StoryObj<typeof Cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    tertiaryIcon: true,
    iconBefore: false,
    size: 'lg',
    children: (
      <>
        <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
      </>
    ),
  },
};
export const BrandColoredHeader: StoryObj<typeof Cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    tertiaryIcon: true,
    iconBefore: false,
    brandHeader: true,
    size: 'sm',
    children: (
      <>
        <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
      </>
    ),
  },
};
export const HeadingTagVariantH2: StoryObj<typeof Cre8AccordionItem> = {
  args: {
    heading: 'Accordion Item Heading',
    tertiaryIcon: true,
    iconBefore: false,
    brandHeader: true,
    size: 'sm',
    headingTagVariant: 'h2',
    children: (
      <>
        <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
      </>
    ),
  },
};
