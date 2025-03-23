import { html } from 'lit';
import { spread } from '../../directives/spread';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { sanitizeInput } from '../../utilities/story-helpers';
import '../../.storybook/components/f-po/f-po';
import './card';
import '../icon/icon'
import '../text-passage/text-passage'
import '../heading/heading'
import '../badge/badge'

export default {
  title: 'cre8 Components/Card',
  component: 'cre8-card',
  render: ({header, body, footer, ...args}) => html`
    <cre8-card ${spread(args)}>
      ${unsafeHTML(sanitizeInput(header, 'cre8-icon-legacy'))}
      ${unsafeHTML(sanitizeInput(body, 'cre8-text-passage', 'cre8-heading'))}
      ${unsafeHTML(sanitizeInput(footer, 'cre8-badge', 'cre8-text-passage'))}
    </cre8-card>`,
  parameters: { status: { type: 'inProgress' } },
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

export const Default = {
  args: {
    header: '<cre8-icon-legacy slot="header" name="rx" style="--cre8-icon-width: 32px; --cre8-icon-height: 32px;"></cre8-icon-legacy>',
    body: `<cre8-text-passage>
      <cre8-heading headingtagname="h2" variant="title-default">Bactrim</cre8-heading>
      <p style="color: var(--cre8-color-content-subtle">Filled by Express Scripts</p>
    </cre8-text-passage>`,
    footer: '<cre8-badge slot="footer" status="error" variant="light" text="Shipping Delay"></cre8-badge>',
  },
};

export const Horizontal = {
  args: {
    ...Default.args,
    footer: '<cre8-text-passage slot="footer"><p style="color: var(--cre8-color-content-subtle">15 mg</p></cre8-text-passage>',
    variant: 'horizontal',
  },
};

export const Bare = {
  args: {
    ...Default.args,
   variant: 'bare',
  },
};

export const HorizontalBare = {
  args: {
    ...Horizontal.args,
   variant: 'horizontal-bare',
  },
};

export const AlignCenter = {
  args: {
    ...Default.args,
   align: 'center',
  },
};

export const HorizontalAlignCenter = {
  args: {
    ...Horizontal.args,
   align: 'center',
   variant: 'horizontal'
  },
};
