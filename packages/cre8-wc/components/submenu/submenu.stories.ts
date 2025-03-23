import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../submenu-item/submenu-item';
import './submenu';

export default {
  title: 'DEPRECATED/DO NOT USE/Submenu',
  component: 'cre8-submenu',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html` <cre8-submenu ${spread(args)} spacing="condensed" variant="display">
  <cre8-submenu-item href="#">Link List Item 24</cre8-submenu-item>
  <cre8-submenu-item href="#">Link List Item 25</cre8-submenu-item>
  <cre8-submenu-item href="#">Link List Item 26</cre8-submenu-item>
  <cre8-submenu-item href="#">Link List Item 27</cre8-submenu-item>
</cre8-submenu>`;
