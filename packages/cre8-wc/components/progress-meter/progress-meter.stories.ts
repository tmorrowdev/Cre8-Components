import {html} from 'lit';
import './progress-meter';
import { spread } from '../../directives/spread';

export default {
  title: 'cre8 Components/Progress Meter',
  component: 'cre8-progress-meter',
  parameters: {status: {type: 'inProgress'}},
  render: (args) => html `<cre8-progress-meter ${spread(args)}></cre8-progress-meter>`,
  args: {
    value: '50',
    knockout: false
  },
  argTypes: {
    fieldId: { control: 'text'},
    status: { control: 'text'},
    knockout: { control: 'boolean'},
    max: { control: 'number'},
    value: { control: 'number'},
    name: { control: 'text'}
  }
};

export const Default = {
  args: {
    label: 'Default progress label',
  }
};

export const KnockoutTrue = {
  args: {
    label: 'Knockout progress label',
    knockout: true
  }
};

export const Empty = {
  args: {
    label: 'Empty progress label',
    value: 0,
  }
};

export const NotStrong = {
  args: {
    label: 'Not strong progress label',
    value: '25',
    status: 'error'
  }
};

export const Weak = {
  args: {
    label: 'Weak progress label',
    status: 'warning'
  }
};

export const Good = {
  args: {
    label: 'Good progress label',
    value: '75',
    status: 'success'
  }
};

export const Excellent = {
  args: {
    label: 'Excellent progress label',
    value: '100',
    status: 'success'
  }
};
