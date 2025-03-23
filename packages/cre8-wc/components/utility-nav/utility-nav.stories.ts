import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../utility-nav-item/utility-nav-item';
import './utility-nav';

export default {
  title: 'DEPRECATED/DO NOT USE/Utility Nav',
  component: 'cre8-utility-nav',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html` <cre8-utility-nav ${spread(args)}>
  <cre8-utility-nav-item text="Utility Item 1"></cre8-utility-nav-item>
  <cre8-utility-nav-item text="Utility Item 2"></cre8-utility-nav-item>
</cre8-utility-nav>`;

export const IconOnly = () => html` <cre8-utility-nav>
  <cre8-utility-nav-item text="Login" iconPosition="before" iconName="person" ?hideText=${true}></cre8-utility-nav-item>
  <cre8-utility-nav-item
    class="c-site-header__utility-nav-search"
    text="Utility Item 2"
    iconPosition="before"
    iconName="search"
    ?hideText=${true}
  ></cre8-utility-nav-item>
</cre8-utility-nav>`;
