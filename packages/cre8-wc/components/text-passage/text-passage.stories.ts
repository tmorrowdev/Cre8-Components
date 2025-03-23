import {Meta, StoryObj} from '@storybook/web-Components';
import {html} from 'lit';
import {spread} from '../../directives/spread';
import './text-passage';
import '../heading/heading';
import {overArgs} from 'lodash';

const meta: Meta = {
  title: 'cre8 Components/Text Passage',
  component: 'cre8-text-passage',
  parameters: {status: {type: 'inProgress'}},
  argTypes: {
    size: {
      options: ['default', 'small', 'large'],
      control: {type: 'select'},
    },
    inverted: {
      control: {type: 'boolean'},

    },
  },
};

export default meta;
export type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`<cre8-text-passage ${spread(args)}>
    <p>
      A text passage contains arbitrary text that might come from a CMS. It should live within a container that caps the line length of the text to
      avoid a straining reading experience.
    </p>
    <ul>
      <li>Here is a unordered list item</li>
      <li>Here is a unordered list item</li>
      <li>Here is a unordered list item</li>
      <li>Here is a unordered list item</li>
    </ul>
    <ol>
      <li>Here is a ordered list item</li>
      <li>Here is a ordered list item</li>
      <li>Here is a ordered list item</li>
      <li>Here is a ordered list item</li>
    </ol>
    <blockquote style="margin-left:20px;">
      <p>This is a quotation from something.</p>
      <cite>Cite source</cite>
    </blockquote>
  </cre8-text-passage>`,
};

export const Small: Story = {
  render: (args) => html`<cre8-text-passage ${spread(args)} size="small">
    <p>
      A text passage contains arbitrary text that might come from a CMS. It should live within a container that caps the line length of the text to
      avoid a straining reading experience.
    </p>
    <ul>
      <li>Here is a unordered list item</li>
      <li>Here is a unordered list item</li>
      <li>Here is a unordered list item</li>
      <li>Here is a unordered list item</li>
    </ul>
    <ol>
      <li>Here is a ordered list item</li>
      <li>Here is a ordered list item</li>
      <li>Here is a ordered list item</li>
      <li>Here is a ordered list item</li>
    </ol>
    <blockquote style="margin-left:20px;">
      <p>This is a quotation from something.</p>
      <cite>Cite source</cite>
    </blockquote>
  </cre8-text-passage>`,
};
export const Large: Story = {
  render: (args) => html`<cre8-text-passage ${spread(args)} ?inverted=${false} size=${'large'}>
    <p>
      A text passage contains arbitrary text that might come from a CMS. It should live within a container that caps the line length of the text to
      avoid a straining reading experience.
    </p>
    <ul>
      <li>Here is a unordered list item</li>
      <li>Here is a unordered list item</li>
      <li>Here is a unordered list item</li>
      <li>Here is a unordered list item</li>
    </ul>
    <ol>
      <li>Here is a ordered list item</li>
      <li>Here is a ordered list item</li>
      <li>Here is a ordered list item</li>
      <li>Here is a ordered list item</li>
    </ol>
    <blockquote style="margin-left:20px;">
      <p>This is a quotation from something.</p>
      <cite>Cite source</cite>
    </blockquote>
  </cre8-text-passage>`,
};
export const Inverted: Story = {
  render: () => html`<div style="background: #000; padding: 20px;">
    <cre8-text-passage ?inverted=${true} size=${'default'}>
      <p>
        A text passage contains arbitrary text that might come from a CMS. It should live within a container that caps the line length of the text to
        avoid a straining reading experience.
      </p>
      <ul>
        <li>Here is a unordered list item</li>
        <li>Here is a unordered list item</li>
        <li>Here is a unordered list item</li>
        <li>Here is a unordered list item</li>
      </ul>
      <ol>
        <li>Here is a ordered list item</li>
        <li>Here is a ordered list item</li>
        <li>Here is a ordered list item</li>
        <li>Here is a ordered list item</li>
      </ol>
      <blockquote style="margin-left:20px;">
        <p>This is a quotation from something.</p>
        <cite>Cite source</cite>
      </blockquote>
    </cre8-text-passage>
  </div>`,
};
