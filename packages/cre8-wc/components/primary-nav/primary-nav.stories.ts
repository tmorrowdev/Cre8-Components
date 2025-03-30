import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../primary-nav-item/primary-nav-item';
import './primary-nav';

export default {
  title: 'Cre8 Components/Primary Nav',
  component: 'cre8-primary-nav',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-primary-nav ${spread(args)}>
  <cre8-primary-nav-item href="#" text="Nav item 1"></cre8-primary-nav-item>
  <cre8-primary-nav-item href="#" text="Nav item 2"></cre8-primary-nav-item>
  <cre8-primary-nav-item href="#" text="Nav item 3"></cre8-primary-nav-item>
</cre8-primary-nav>`;

export const SideBySide = () => html`<cre8-primary-nav behavior="side-by-side">
  <cre8-primary-nav-item href="#" text="Nav item 1"></cre8-primary-nav-item>
  <cre8-primary-nav-item href="#" text="Nav item 2"></cre8-primary-nav-item>
  <cre8-primary-nav-item href="#" text="Nav item 3"></cre8-primary-nav-item>
</cre8-primary-nav>`;

export const WithMegamenu = () => html`
<cre8-text-passage size="sm">
  <p>A div is added around the primary nav in this instance to create a position relative wrapper for the megamenu to be positioned to. This wrapper will be the header when actually used.</p>
</cre8-text-passage>
<div style="position: relative">
<cre8-primary-nav>

</cre8-primary-nav-item>

</cre8-primary-nav>
</div>`;
