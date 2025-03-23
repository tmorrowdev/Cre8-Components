import { html } from 'lit';
import '../../../components/button/button';
import '../../../components/field/field';
import { spread } from '../../../directives/spread';
import './medication-form';

export default {
  title: 'Examples/Medication Form',
  component: 'medication-form',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<medication-form ${spread(args)}>
  <cre8-field label="Enter medication name of Rx number" placeholder="ex. Lipitor or Rx number"></cre8-field>
  <cre8-field label="Filter by member" placeholder="All"></cre8-field>
  <cre8-field label="Filter by pharmacy type" placeholder="All"></cre8-field>
  <cre8-button text="Clear All" variant="bare" ?disabled=${true}></cre8-button>
</medication-form>`;
