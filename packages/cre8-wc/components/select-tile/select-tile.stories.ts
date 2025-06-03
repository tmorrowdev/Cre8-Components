import { html } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import '../../.storybook/components/f-po/f-po';
import '../../.storybook/components/example-inline/example-inline';
import { spread } from '../../directives/spread';
import '../icon/icon';
import '../button-group/button-group';
import '../button/button';
import './select-tile';
import svgMedication from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Regular/Medication.svg?raw';

export default {
  title: 'In Development/Select Tile',
  component: 'cre8-select-tile',
  parameters: {
    withDesign: {
      type: 'figma',
      url: 'https://www.figma.com/file/L8rVyIvYfWAtNpgm2qps73/Evernorth-Base-Web-Library?type=design&node-id=3702-28744'
    },
    status: { type: 'beta' },
    controls: {
      exclude: ['shadowRootOptions', 'formAssociated', 'internalValue', 'internals', 'field'],
      expanded: true,
    },
    actions: {
      handles: ['change', 'input', 'click']
    },
  },
  decorators: [withActions],
  argTypes: {
    type: { control: 'select', options: ['radio', 'checkbox']},
    variant: { options: [undefined, 'bare', 'horizontal', 'horizontal-bare' ]},
    variantBreakToVertical: { options: ['sm', 'sm-2', 'md', 'lg', 'xl', 'xxl', 'none']},
    checkPosition: { options: [ 'none', 'left', 'top-right', 'right']},
    radioVariant: { options: [ 'dot', 'check' ]},
    align: { options: [ undefined, 'center' ]},
    isError: { control: 'boolean' },
    isSuccess: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
    fieldId: { control: 'text' },
  }
};

export const Default = (args) => html`<cre8-select-tile ${spread(args)}>
  <f-po slot="header">Header</f-po>
  <f-po>Body</f-po>
  <f-po slot="footer">Footer</f-po>
</cre8-select-tile>`;



export const Horizontal = (args) => html`<cre8-select-tile ${spread(args)} variant="horizontal">
  <f-po slot="header">Header</f-po>
  <f-po>Body</f-po>
  <f-po slot="footer">Footer</f-po>
</cre8-select-tile>`;

export const TitleAndBody = (args) => html`<cre8-select-tile ${spread(args)} variant="horizontal">
  <f-po slot="header">Header</f-po>
  <example-inline slot="title">Title</example-inline>
  <example-inline slot="body">Body</example-inline>
  <f-po slot="footer">Footer</f-po>
</cre8-select-tile>`;

export const TitleAndBodyRealistic = (args) => html`<cre8-select-tile ${spread(args)} variant="horizontal">
  <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
  <span slot="title">Heading text</span>
  <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
</cre8-select-tile>`

export const TitleAndBodyRealisticLeft = (args) => html`<cre8-select-tile ${spread(args)} variant="horizontal" checkPosition="left">
  <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
  <span slot="title">Heading text</span>
  <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
</cre8-select-tile>`

const alertit = (e) => {
  const data = Array.from(new FormData(e.target).entries());
  alert(JSON.stringify(data));
  e.preventDefault();
};
const submitForm = (e) => {
  (document.querySelector('#form1') as HTMLFormElement).requestSubmit();
};

export const FormRealistic = (args) => html`
  <form id="form1" @submit=${alertit} style="display: flex; flex-direction: column; gap: 24px;">
    <cre8-select-tile ${spread(args)} name="test" value="1" variant="horizontal">
      <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
      <span slot="title">Heading text one</span>
      <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
    </cre8-select-tile>

    <cre8-select-tile ${spread(args)} name="test" value="2" variant="horizontal">
      <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
      <span slot="title">Heading text two</span>
      <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
    </cre8-select-tile>

    <cre8-select-tile ${spread(args)} name="test" value="3" variant="horizontal">
      <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
      <span slot="title">Heading text three</span>
      <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
    </cre8-select-tile>

    <cre8-button-group>
      <cre8-button variant="primary" @click=${submitForm} text="Submit"></cre8-button>
      <cre8-button variant="tertiary" type="reset" text="Reset"></cre8-button>
    </cre8-button-group>
  </form>
`;

export const FormRealisticChecks = (args) => html`
  <form id="form1" @submit=${alertit} style="display: flex; flex-direction: column; gap: 24px;">
    <cre8-select-tile ${spread(args)} name="test1" value="1" variant="horizontal" type="checkbox">
      <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
      <span slot="title">Heading text one</span>
      <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
    </cre8-select-tile>

    <cre8-select-tile ${spread(args)} name="test2" value="2" variant="horizontal" type="checkbox">
      <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
      <span slot="title">Heading text two</span>
      <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
    </cre8-select-tile>

    <cre8-select-tile ${spread(args)} name="test3" value="3" variant="horizontal" type="checkbox">
      <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
      <span slot="title">Heading text three</span>
      <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
    </cre8-select-tile>

    <cre8-button-group>
      <cre8-button variant="primary" @click=${submitForm} text="Submit"></cre8-button>
      <cre8-button variant="tertiary" type="reset" text="Reset"></cre8-button>
    </cre8-button-group>
  </form>
`;


export const Bare = () => html`<cre8-select-tile variant="bare">
  <f-po slot="header">Bare Header</f-po>
  <f-po>Bare Body</f-po>
  <f-po slot="footer">Bare Footer</f-po>
</cre8-select-tile>`;

export const HorizontalBare = () => html`<cre8-select-tile variant="horizontal-bare">
  <f-po slot="header">Bare Header</f-po>
  <f-po>Bare Body</f-po>
  <f-po slot="footer">Bare Footer</f-po>
</cre8-select-tile>`;


export const ErrorRealistic = (args) => html`<cre8-select-tile ${spread(args)} variant="horizontal" isError>
  <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
  <span slot="title">Heading text</span>
  <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
</cre8-select-tile>`

export const SuccessRealistic = (args) => html`<cre8-select-tile ${spread(args)} variant="horizontal" isSuccess>
  <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
  <span slot="title">Heading text</span>
  <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
</cre8-select-tile>`

export const DisabledRealistic = (args) => html`<cre8-select-tile ${spread(args)} variant="horizontal" disabled>
  <cre8-icon slot="header" svg="${svgMedication}" style="width: 56px; height: 56px;"></cre8-icon>
  <span slot="title">Heading text</span>
  <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
</cre8-select-tile>`
