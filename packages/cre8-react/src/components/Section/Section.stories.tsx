import type { StoryObj } from '@storybook/react';
import { Cre8Button, Cre8Heading, Cre8Section, Cre8TextPassage } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React, { CSSProperties } from 'react';

const customHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};
export default {
  title: 'Cre8 Components/Section',
  component: Cre8Section,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
  args: {
    headline: 'Section Headline',
    children: (
      <Cre8TextPassage>
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
      </Cre8TextPassage>
    ),
  },
  render: (args) => (
    <Cre8Section headline={args.headline}>{args.children}</Cre8Section>
  ),
};
export const Default: StoryObj<typeof Cre8Section> = {
  args: {
    headline: 'Section Headline',
  }
};
export const CustomHeader: StoryObj<typeof Cre8Section> = {
  args: {
    headline: undefined,
    children: (
      <>
        <div style={customHeader} slot="header">
          <Cre8Heading tagVariant="h2" slot="header">
            {' '}
            Section Headline{' '}
          </Cre8Heading>
          <Cre8Button
            iconPosition="before"
            variant="secondary"
            iconName="search"
            text="ID cards"
          ></Cre8Button>
        </div>

        <Cre8TextPassage>
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
        </Cre8TextPassage>
      </>
    ),
  },
};
