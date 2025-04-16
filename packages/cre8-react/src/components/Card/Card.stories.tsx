import type { StoryObj } from '@storybook/react';
import React from 'react';
import { Cre8Badge, Cre8Card, Cre8Heading, Cre8IconLegacy, Cre8TextPassage } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

const iconStyle = { '--Cre8-icon-width': '32px', '--Cre8-icon-height': '32px', } as React.CSSProperties;

export default {
  title: 'Cre8 Components/Card',
  component: Cre8Card,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  argTypes: {
    align: {
      options: ['center'],
      control: { type: 'radio' }
    },
    variant: {
      options: ['bare', 'horizontal', 'horizontal-bare'],
      control: { type: 'radio' }
    }
  }
};

export const Default: StoryObj<typeof Cre8Card> = { args: {
  children: (
    <>
      <Cre8IconLegacy slot="header" name="rx" style={ iconStyle }></Cre8IconLegacy>
      <Cre8TextPassage>
        <Cre8Heading tagVariant="h2" type="title-default">Bactrim</Cre8Heading>
        <p style={{ color: "var(--Cre8-color-content-subtle" }}>Filled by Express Scripts</p>
      </Cre8TextPassage>
      <Cre8Badge slot="footer" status="error" variant="light" text="Shipping Delay"></Cre8Badge>
    </>
    )
} };

export const Horizontal: StoryObj<typeof Cre8Card> = { args: {
  variant: 'horizontal',
  children: (
  <>
    <Cre8IconLegacy slot="header" name="rx" style={ iconStyle }></Cre8IconLegacy>
    <Cre8TextPassage>
      <Cre8Heading tagVariant="h2" type="title-default">Bactrim</Cre8Heading>
      <p style={{ color: "var(--Cre8-color-content-subtle" }}>Filled by Express Scripts</p>
    </Cre8TextPassage>
    <Cre8TextPassage slot="footer">
      <p style={{ color: "var(--Cre8-color-content-subtle" }}>15 mg</p>
    </Cre8TextPassage>
  </>
  )
} };

export const Bare: StoryObj<typeof Cre8Card> = { args: {
  variant: 'bare',
  children: (
  <>
    <Cre8IconLegacy slot="header" name="rx" style={ iconStyle }></Cre8IconLegacy>
      <Cre8TextPassage>
        <Cre8Heading tagVariant="h2" type="title-default">Bactrim</Cre8Heading>
        <p style={{ color: "var(--Cre8-color-content-subtle" }}>Filled by Express Scripts</p>
      </Cre8TextPassage>
      <Cre8Badge slot="footer" status="error" variant="light" text="Shipping Delay"></Cre8Badge>
  </>
  )
} };

export const HorizontalBare: StoryObj<typeof Cre8Card> = { args: {
  variant: 'horizontal-bare',
  children: (
  <>
    <Cre8IconLegacy slot="header" name="rx" style={ iconStyle }></Cre8IconLegacy>
    <Cre8TextPassage>
      <Cre8Heading tagVariant="h2" type="title-default">Bactrim</Cre8Heading>
      <p style={{ color: "var(--Cre8-color-content-subtle" }}>Filled by Express Scripts</p>
    </Cre8TextPassage>
    <Cre8TextPassage slot="footer">
      <p style={{ color: "var(--Cre8-color-content-subtle" }}>15 mg</p>
    </Cre8TextPassage>
  </>
  )
} };

export const AlignCenter: StoryObj<typeof Cre8Card> = { args: {
  align: "center",
  children: (
    <>
      <Cre8IconLegacy slot="header" name="rx" style={ iconStyle }></Cre8IconLegacy>
      <Cre8TextPassage>
        <Cre8Heading tagVariant="h2" type="title-default">Bactrim</Cre8Heading>
        <p style={{ color: "var(--Cre8-color-content-subtle" }}>Filled by Express Scripts</p>
      </Cre8TextPassage>
      <Cre8Badge slot="footer" status="error" variant="light" text="Shipping Delay"></Cre8Badge>
    </>
    )
} };

export const HorizontalAlignCenter: StoryObj<typeof Cre8Card> = { args: {
  variant: 'horizontal',
  align: "center",
  children: (
  <>
    <Cre8IconLegacy slot="header" name="rx" style={ iconStyle }></Cre8IconLegacy>
    <Cre8TextPassage>
      <Cre8Heading tagVariant="h2" type="title-default">Bactrim</Cre8Heading>
      <p style={{ color: "var(--Cre8-color-content-subtle" }}>Filled by Express Scripts</p>
    </Cre8TextPassage>
    <Cre8TextPassage slot="footer">
      <p style={{ color: "var(--Cre8-color-content-subtle" }}>15 mg</p>
    </Cre8TextPassage>
  </>
  )
} };
