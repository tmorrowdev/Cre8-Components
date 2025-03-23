import { html } from 'lit';
import { spread } from '../../directives/spread';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { sanitizeInput } from '../../utilities/story-helpers';
import './field-note';
import '../text-link/text-link';

const meta = {
  title: 'cre8 Components/Field Note',
  render: ({slot, ...args}) => html`<cre8-field-note ${spread(args)}>${unsafeHTML(sanitizeInput(slot, 'cre8-text-link'))}</cre8-field-note>`,
  component: 'cre8-field-note',
  parameters: { status: { type: 'inProgress' } },
  argTypes: {
    iconName: {control: 'text'}, // iconName will be deprecated
    isError: {control: 'boolean'},
    isSuccess: {control: 'boolean'},
  }
};

export default meta;

export const Default = {
  args: {
    slot: 'This is a field note.'
  },
};

export const BeginningLink = {
  args: {
    slot: `<cre8-text-link href="https://www.cigna.com">Helpful link</cre8-text-link> at the beginning of a field note`
  },
};


export const MiddleLink = {
  args: {
    slot: `This is a field note with a <cre8-text-link href="https://www.cigna.com">helpful link</cre8-text-link> in the middle of content`
  },
};

export const EndingLink = {
  args: {
    slot: `This is a field note with an ending <cre8-text-link href="https://www.cigna.com">helpful link</cre8-text-link>`
  },
};


export const Error = {
  args: {
    isError: true,
    slot: 'This is a field note with an error state.'
  },
};

export const Success = {
  args: {
    isSuccess: true,
    slot: 'This is a field note with a success state.'
  },
};
