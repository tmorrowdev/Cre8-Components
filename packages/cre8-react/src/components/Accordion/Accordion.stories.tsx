import type { StoryObj } from '@storybook/react';
import React from 'react';
import { cre8Accordion, cre8AccordionItem, cre8TextPassage } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'cre8 Components/Accordion/Accordion',
  component: cre8Accordion,
  subcomponents: { cre8AccordionItem, cre8TextPassage },
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
};

export const Default: StoryObj<typeof cre8Accordion> = {
  args: {
    borderType: 'none',
    hasDivider: false,
    children: (
      <>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 2 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 3 content </cre8TextPassage>
        </cre8AccordionItem>
      </>
    ),
  },
};

export const DefaultDivider: StoryObj<typeof cre8Accordion> = {
  args: {
    borderType: 'none',
    hasDivider: true,
    children: (
      <>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 2 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 3 content </cre8TextPassage>
        </cre8AccordionItem>
      </>
    ),
  },
};

export const Rectangle: StoryObj<typeof cre8Accordion> = {
  args: {
    borderType: 'rectangle',
    hasDivider: false,
    children: (
      <>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 2 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 3 content </cre8TextPassage>
        </cre8AccordionItem>
      </>
    ),
  },
};

export const RectangleDivider: StoryObj<typeof cre8Accordion> = {
  args: {
    borderType: 'rectangle',
    hasDivider: true,
    children: (
      <>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 2 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 3 content </cre8TextPassage>
        </cre8AccordionItem>
      </>
    ),
  },
};

export const RoundedBottom: StoryObj<typeof cre8Accordion> = {
  args: {
    borderType: 'rounded-bottom',
    hasDivider: false,
    children: (
      <>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 2 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 3 content </cre8TextPassage>
        </cre8AccordionItem>
      </>
    ),
  },
};

export const RoundedBottomDivider: StoryObj<typeof cre8Accordion> = {
  args: {
    borderType: 'rounded-bottom',
    hasDivider: true,
    children: (
      <>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 2 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 3 content </cre8TextPassage>
        </cre8AccordionItem>
      </>
    ),
  },
};

export const Rounded: StoryObj<typeof cre8Accordion> = {
  args: {
    borderType: 'rounded',
    hasDivider: false,
    children: (
      <>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 2 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 3 content </cre8TextPassage>
        </cre8AccordionItem>
      </>
    ),
  },
};

export const RoundedDivider: StoryObj<typeof cre8Accordion> = {
  args: {
    borderType: 'rounded',
    hasDivider: true,
    children: (
      <>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 1 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 2 content </cre8TextPassage>
        </cre8AccordionItem>
        <cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <cre8TextPassage> Accordion panel 3 content </cre8TextPassage>
        </cre8AccordionItem>
      </>
    ),
  },
};