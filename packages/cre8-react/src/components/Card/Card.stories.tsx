import type { StoryObj } from '@storybook/react';
import React from 'react';
import { cre8Badge, cre8Card, cre8Heading, cre8IconLegacy, cre8TextPassage } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

const iconStyle = { '--cre8-icon-width': '32px', '--cre8-icon-height': '32px', } as React.CSSProperties;

export default {
  title: 'cre8 Components/Card',
  component: cre8Card,
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

export const Default: StoryObj<typeof cre8Card> = { args: {
  children: (
    <>
      <cre8IconLegacy slot="header" name="rx" style={ iconStyle }></cre8IconLegacy>
      <cre8TextPassage>
        <cre8Heading tagVariant="h2" type="title-default">Bactrim</cre8Heading>
        <p style={{ color: "var(--cre8-color-content-subtle" }}>Filled by Express Scripts</p>
      </cre8TextPassage>
      <cre8Badge slot="footer" status="error" variant="light" text="Shipping Delay"></cre8Badge>
    </>
    )
} };

export const Horizontal: StoryObj<typeof cre8Card> = { args: {
  variant: 'horizontal',
  children: (
  <>
    <cre8IconLegacy slot="header" name="rx" style={ iconStyle }></cre8IconLegacy>
    <cre8TextPassage>
      <cre8Heading tagVariant="h2" type="title-default">Bactrim</cre8Heading>
      <p style={{ color: "var(--cre8-color-content-subtle" }}>Filled by Express Scripts</p>
    </cre8TextPassage>
    <cre8TextPassage slot="footer">
      <p style={{ color: "var(--cre8-color-content-subtle" }}>15 mg</p>
    </cre8TextPassage>
  </>
  )
} };

export const Bare: StoryObj<typeof cre8Card> = { args: {
  variant: 'bare',
  children: (
  <>
    <cre8IconLegacy slot="header" name="rx" style={ iconStyle }></cre8IconLegacy>
      <cre8TextPassage>
        <cre8Heading tagVariant="h2" type="title-default">Bactrim</cre8Heading>
        <p style={{ color: "var(--cre8-color-content-subtle" }}>Filled by Express Scripts</p>
      </cre8TextPassage>
      <cre8Badge slot="footer" status="error" variant="light" text="Shipping Delay"></cre8Badge>
  </>
  )
} };

export const HorizontalBare: StoryObj<typeof cre8Card> = { args: {
  variant: 'horizontal-bare',
  children: (
  <>
    <cre8IconLegacy slot="header" name="rx" style={ iconStyle }></cre8IconLegacy>
    <cre8TextPassage>
      <cre8Heading tagVariant="h2" type="title-default">Bactrim</cre8Heading>
      <p style={{ color: "var(--cre8-color-content-subtle" }}>Filled by Express Scripts</p>
    </cre8TextPassage>
    <cre8TextPassage slot="footer">
      <p style={{ color: "var(--cre8-color-content-subtle" }}>15 mg</p>
    </cre8TextPassage>
  </>
  )
} };

export const AlignCenter: StoryObj<typeof cre8Card> = { args: {
  align: "center",
  children: (
    <>
      <cre8IconLegacy slot="header" name="rx" style={ iconStyle }></cre8IconLegacy>
      <cre8TextPassage>
        <cre8Heading tagVariant="h2" type="title-default">Bactrim</cre8Heading>
        <p style={{ color: "var(--cre8-color-content-subtle" }}>Filled by Express Scripts</p>
      </cre8TextPassage>
      <cre8Badge slot="footer" status="error" variant="light" text="Shipping Delay"></cre8Badge>
    </>
    )
} };

export const HorizontalAlignCenter: StoryObj<typeof cre8Card> = { args: {
  variant: 'horizontal',
  align: "center",
  children: (
  <>
    <cre8IconLegacy slot="header" name="rx" style={ iconStyle }></cre8IconLegacy>
    <cre8TextPassage>
      <cre8Heading tagVariant="h2" type="title-default">Bactrim</cre8Heading>
      <p style={{ color: "var(--cre8-color-content-subtle" }}>Filled by Express Scripts</p>
    </cre8TextPassage>
    <cre8TextPassage slot="footer">
      <p style={{ color: "var(--cre8-color-content-subtle" }}>15 mg</p>
    </cre8TextPassage>
  </>
  )
} };
