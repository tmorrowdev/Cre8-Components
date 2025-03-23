import {html} from 'lit';
import '../dropdown-item/dropdown-item';
import './dropdown';

export default {
  title: 'In Development/Dropdown',
  component: 'cre8-dropdown',
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

export const ButtonDropdown = Template.bind({});
ButtonDropdown.args = {
  buttonText: 'Select',
  dropdownContent: html`
  <cre8-dropdown-item>Item 1</cre8-dropdown-item>
  <cre8-dropdown-item>Item 2</cre8-dropdown-item>
  <cre8-dropdown-item>Item 3</cre8-dropdown-item>
  `,
}

export const LinkDropdown = Template.bind({});
LinkDropdown.args = {
  buttonText: 'Link Actions',
  dropdownWithLink: true,
  dropdownContent: html`
  <cre8-dropdown-item>Item 1</cre8-dropdown-item>
  <cre8-dropdown-item>Item 2</cre8-dropdown-item>
  <cre8-dropdown-item>Item 3</cre8-dropdown-item>
  `,
}

export const ButtonDropdownWithScrollBar = Template.bind({});
ButtonDropdownWithScrollBar.args = {
  buttonText: 'Select',
  maxHeight: '100px',
  dropdownContent: html`
  <cre8-dropdown-item>Item 1</cre8-dropdown-item>
  <cre8-dropdown-item>Item 2</cre8-dropdown-item>
  <cre8-dropdown-item>Item 3</cre8-dropdown-item>
  <cre8-dropdown-item>Item 4</cre8-dropdown-item>
  <cre8-dropdown-item>Item 5</cre8-dropdown-item>
  <cre8-dropdown-item>Item 6</cre8-dropdown-item>
  `,
}

export const LinkDropdownWithScrollBar = Template.bind({});
LinkDropdownWithScrollBar.args = {
  buttonText: 'Link Actions',
  dropdownWithLink: true,
  maxHeight: '100px',
  dropdownContent: html`
  <cre8-dropdown-item>Item 1</cre8-dropdown-item>
  <cre8-dropdown-item>Item 2</cre8-dropdown-item>
  <cre8-dropdown-item>Item 3</cre8-dropdown-item>
  `,
}