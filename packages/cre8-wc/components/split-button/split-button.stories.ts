import { html } from 'lit';
import '../dropdown-item/dropdown-item';
import '../dropdown/dropdown';
import './split-button';

export default {
  title: 'Cre8 Components/Split-Button',
  component: 'cre8-split-button',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`
  <cre8-split-button buttonText="Button">
    <cre8-dropdown>
      <cre8-dropdown-item>Item 1</cre8-dropdown-item>
      <cre8-dropdown-item>Item 2</cre8-dropdown-item>
      <cre8-dropdown-item>Item 3</cre8-dropdown-item>
    </cre8-dropdown>
  </cre8-split-button>
`;

export const Large = () => html`
  <cre8-split-button buttonText="Button" size="lg">
    <cre8-dropdown>
      <cre8-dropdown-item>Item 1</cre8-dropdown-item>
      <cre8-dropdown-item>Item 2</cre8-dropdown-item>
      <cre8-dropdown-item>Item 3</cre8-dropdown-item>
    </cre8-dropdown>
  </cre8-split-button>
`;

export const Small = () => html`
  <cre8-split-button buttonText="Button" size="sm">
    <cre8-dropdown>
      <cre8-dropdown-item>Item 1</cre8-dropdown-item>
      <cre8-dropdown-item>Item 2</cre8-dropdown-item>
      <cre8-dropdown-item>Item 3</cre8-dropdown-item>
    </cre8-dropdown>
  </cre8-split-button>
`;
