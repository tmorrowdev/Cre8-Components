import type { StoryObj } from '@storybook/react';
import React from 'react';
import { Cre8Accordion, Cre8AccordionItem, Cre8TextPassage } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/Accordion/Accordion',
  component: Cre8Accordion,
  subcomponents: { Cre8AccordionItem, Cre8TextPassage },
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
};

export const Default: StoryObj<typeof Cre8Accordion> = {
  args: {
    borderType: 'none',
    hasDivider: false,
    children: (
      <>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 2 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 3 content </Cre8TextPassage>
        </Cre8AccordionItem>
      </>
    ),
  },
};

export const DefaultDivider: StoryObj<typeof Cre8Accordion> = {
  args: {
    borderType: 'none',
    hasDivider: true,
    children: (
      <>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 2 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 3 content </Cre8TextPassage>
        </Cre8AccordionItem>
      </>
    ),
  },
};

export const Rectangle: StoryObj<typeof Cre8Accordion> = {
  args: {
    borderType: 'rectangle',
    hasDivider: false,
    children: (
      <>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 2 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 3 content </Cre8TextPassage>
        </Cre8AccordionItem>
      </>
    ),
  },
};

export const RectangleDivider: StoryObj<typeof Cre8Accordion> = {
  args: {
    borderType: 'rectangle',
    hasDivider: true,
    children: (
      <>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 2 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 3 content </Cre8TextPassage>
        </Cre8AccordionItem>
      </>
    ),
  },
};

export const RoundedBottom: StoryObj<typeof Cre8Accordion> = {
  args: {
    borderType: 'rounded-bottom',
    hasDivider: false,
    children: (
      <>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 2 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 3 content </Cre8TextPassage>
        </Cre8AccordionItem>
      </>
    ),
  },
};

export const RoundedBottomDivider: StoryObj<typeof Cre8Accordion> = {
  args: {
    borderType: 'rounded-bottom',
    hasDivider: true,
    children: (
      <>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 2 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 3 content </Cre8TextPassage>
        </Cre8AccordionItem>
      </>
    ),
  },
};

export const Rounded: StoryObj<typeof Cre8Accordion> = {
  args: {
    borderType: 'rounded',
    hasDivider: false,
    children: (
      <>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 2 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 3 content </Cre8TextPassage>
        </Cre8AccordionItem>
      </>
    ),
  },
};

export const RoundedDivider: StoryObj<typeof Cre8Accordion> = {
  args: {
    borderType: 'rounded',
    hasDivider: true,
    children: (
      <>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 1 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 2 content </Cre8TextPassage>
        </Cre8AccordionItem>
        <Cre8AccordionItem heading="Accordion Item Title" isActive={true}>
          <Cre8TextPassage> Accordion panel 3 content </Cre8TextPassage>
        </Cre8AccordionItem>
      </>
    ),
  },
};