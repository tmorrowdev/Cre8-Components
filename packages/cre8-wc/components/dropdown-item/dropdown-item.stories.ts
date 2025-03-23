import {html} from 'lit';
import {spread} from '../../directives/spread';
import './dropdown-item';
import '../dropdown/dropdown';

export default {
  title: 'In Development/Dropdown Item',
  component: 'cre8-dropdown-item',
  parameters: {
    status: {type: 'inProgress'},
    actions: {
      handles: ['dropdown-item-selected'],
    },
    docs: {
      story: {
        height: '300px',
      },
    },
  },
};

const Template = ({ buttonText, dropdownContent, maxHeight, dropdownWithLink}) => html`
  <cre8-dropdown
    buttonText=${buttonText}
    maxHeight=${maxHeight}
    dropdownWithLink=${dropdownWithLink}
  >
    ${dropdownContent}
  </cre8-dropdown>
`;

export const Default = Template.bind({});
Default.args = {
  buttonText: 'Select',
  dropdownContent: html`
  <cre8-dropdown-item>Item 1</cre8-dropdown-item>
  <cre8-dropdown-item>Item 2 Item with longer text than default</cre8-dropdown-item>
  <cre8-dropdown-item>Item 3</cre8-dropdown-item>
  `,
}


