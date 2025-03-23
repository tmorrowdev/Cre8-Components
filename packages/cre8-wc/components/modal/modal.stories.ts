import {html} from 'lit';
import '../button/button';
import '../heading/heading';
import '../text-passage/text-passage';
import '../../.storybook/components/f-po/f-po';
import './modal';

export default {
  title: 'cre8 Components/Modal',
  component: 'cre8-modal',
  parameters: {
    status: {type: 'inProgress'},
    actions: {
      handles: ['close-modal'],
    },
  },
};

export const Default = (args) => html`<sample-modal></sample-modal>`;

export const Error = (args) => html`<sample-modal status="error"></sample-modal>`;

export const Warning = (args) => html`<sample-modal status="warning"></sample-modal>`;

export const Success = (args) => html`<sample-modal status="success"></sample-modal>`;

export const Info = (args) => html`<sample-modal status="info"></sample-modal>`;

export const Help = (args) => html`<sample-modal status="help"></sample-modal>`;

export const NotDismissible = (args) => html`<sample-modal notDismissible="${true}"></sample-modal>`;
