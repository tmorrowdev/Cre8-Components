import { html } from 'lit';
import '../../../components/button/button';
import '../../../components/text-passage/text-passage';
import './request-prescription';

export default {
  title: 'Examples/Request Prescription',
  component: 'request-prescription',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html` <request-prescription>
  <cre8-text-passage>Have a new prescription or want to transfer one from another pharmacy?</cre8-text-passage>
  <cre8-button slot="footer" text="Request an Rx" iconPosition="before" iconName="add" variant="primary"></cre8-button>
</request-prescription>`;
