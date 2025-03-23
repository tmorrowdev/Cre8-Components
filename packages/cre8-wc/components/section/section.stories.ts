import {html} from 'lit';
import type { Meta, StoryObj } from '@storybook/web-Components';
import '../../.storybook/components/f-po/f-po';
import {spread} from '../../directives/spread';
import '../heading/heading';
import '../button/button';
import '../text-passage/text-passage';
import './section';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { sanitizeInput } from '../../utilities/story-helpers';
import { cre8Section } from './section';

interface Props extends Pick<cre8Section, 'headline'> {
  contents: string;
}

type Story = StoryObj<Props>;

const meta = {
  title: 'cre8 Components/Section',
  component: 'cre8-section',
  parameters: {
    status: {
      type: 'inProgress'
    },
    controls: {
      hideNoControlsWarning: true,
    },
},
  argTypes:{
    headline:{
      control:{
        type: 'text'
      }
    },
    contents: {
      control:{
        type: 'text'
      }
    }
  },
  args: {
    headline: 'Section Headline',
    contents: `<cre8-text-passage>
    <p>
      This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <p>
      <a href="#">Lorem ipsum dolor sit amet</a>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <blockquote style="margin-left:20px;">
      <p>This is a quotation from something.</p>
      <cite>Cite source</cite>
    </blockquote>
    <p>
      This is another paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </cre8-text-passage>`,

  },
  render: ({headline, contents}) =>{
    return html`
    <cre8-section headline="${headline}">
    ${unsafeHTML(sanitizeInput(contents, 'cre8-text-passage', 'cre8-heading', 'cre8-button'))}
    </cre8-section>`
  }
} satisfies Meta<Props>;;

export default meta;

export const Default: Story = {};
export const CustomHeading: Story ={
  args:{
    headline: undefined,
    contents: `<div style="display:flex; justify-content: space-between;" slot="header">
    <cre8-heading tagVariant="h2" slot="header"> Section Heading </cre8-heading>
    <cre8-button iconPosition="before" variant="secondary" iconName="search" text="ID cards"></cre8-button>
    </div>
    <cre8-text-passage>
    <p>
      This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <p>
      <a href="#">Lorem ipsum dolor sit amet</a>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    </cre8-text-passage>`
  }
}
