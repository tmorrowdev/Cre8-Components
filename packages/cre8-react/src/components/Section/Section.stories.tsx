import type { StoryObj } from '@storybook/react';
import { cre8Button, cre8Heading, cre8Section, cre8TextPassage } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React, { CSSProperties } from 'react';

const customHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};
export default {
  title: 'cre8 Components/Section',
  component: cre8Section,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
  args: {
    headline: 'Section Headline',
    children: (
      <cre8TextPassage>
        <>
          <p>
            This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <p>
            <a href="#">Lorem ipsum dolor sit amet</a>, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <blockquote>
            <p>This is a quotation from something.</p>
            <cite>Cite source</cite>
          </blockquote>
          <p>
            This is another paragraph of text. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </>
      </cre8TextPassage>
    ),
  },
  render: (args) => (
    <cre8Section headline={args.headline}>{args.children}</cre8Section>
  ),
};
export const Default: StoryObj<typeof cre8Section> = {
  args: {
    headline: 'Section Headline',
  }
};
export const CustomHeader: StoryObj<typeof cre8Section> = {
  args: {
    headline: undefined,
    children: (
      <>
        <div style={customHeader} slot="header">
          <cre8Heading tagVariant="h2" slot="header">
            {' '}
            Section Headline{' '}
          </cre8Heading>
          <cre8Button
            iconPosition="before"
            variant="secondary"
            iconName="search"
            text="ID cards"
          ></cre8Button>
        </div>

        <cre8TextPassage>
          <p>
            This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <p>
            <a href="#">Lorem ipsum dolor sit amet</a>, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </cre8TextPassage>
      </>
    ),
  },
};
