import type { StoryObj } from '@storybook/react';
import { cre8Heading, cre8TextPassage } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';

interface invertedStyle {
  style: React.CSSProperties;
}
const inverted: invertedStyle = {
  style: {
    background: '#000',
    padding: '20px',
  },
};

export default {
  title: 'cre8 Components/Text-Passage',
  component: cre8TextPassage,
  subcomponents: cre8Heading,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
  args: {},
  render: (args) => (
    <cre8TextPassage inverted={args.inverted} size={args.size}>
      <>
        <cre8Heading type="headline-default" brandColor>
          This is a Text Passage Headline.
        </cre8Heading>
        <p>
          A text passage contains arbitrary text that might come from a CMS. It
          should live within a container that caps the line length of the text
          to avoid a straining reading experience.
        </p>
        <p>
          This is another paragraph of text. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <ul>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
        </ul>
        <ol>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
          <li>Here is a unordered list item</li>
        </ol>
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
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </>
    </cre8TextPassage>
  ),
};

export const Default: StoryObj<typeof cre8TextPassage> = {
  args: {
    size: 'default',
    inverted: false,
  },
};
export const Small: StoryObj<typeof cre8TextPassage> = {
  args: {
    size: 'small',
  },
};
export const Large: StoryObj<typeof cre8TextPassage> = {
  args: {
    size: 'large',
  },
};
export const Inverted: StoryObj<typeof cre8TextPassage> = {
  args: {},
  render: () => (
    <>
      <div style={inverted.style}>
        <cre8TextPassage inverted>
          <cre8Heading type="headline-default" inverted brandColor>
            This is a Text Passage Headline.
          </cre8Heading>
          <p>
            A text passage contains arbitrary text that might come from a CMS.
            It should live within a container that caps the line length of the
            text to avoid a straining reading experience.
          </p>
          <h2>Default Headline</h2>
          <p>
            This is another paragraph of text. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <ul>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
          </ul>
          <h3>Secondary Headline</h3>
          <ol>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
            <li>Here is a unordered list item</li>
          </ol>
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
          <h4>Section Title</h4>
          <p>
            This is another paragraph of text. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <h5>Default Large Meta Text</h5>
        </cre8TextPassage>
      </div>
    </>
  ),
};
