import {html} from 'lit';
import {spread} from '../../directives/spread';
import '@cre8_dev/cre8-icons';
import './progress-steps-item';
import svgCheckCircle from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgError from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Error.svg?raw';
import svgFilledCircleOne from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Circle One.svg?raw';
import svgRegularCircleOne from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Circle One.svg?raw';
import svgWarning from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Warning.svg?raw';

const meta = {
  title: 'In Development/Progress Steps Item',
  component: 'cre8-progress-steps-item',
  render: (args) => html`<cre8-progress-steps-item ${spread(args)}></cre8-progress-steps-item>`
};
export default meta;

export const Complete = {
  args: {
    message: 'Optional step message should be succinct',
    name: 'Step Name',
    state: 'complete',
    svg: svgCheckCircle,
  },
};

export const Current = {
  args: {
    message: 'Optional step message should be succinct',
    name: 'Step Name',
    state: 'current',
    svg: svgFilledCircleOne,
  },
};

export const Error = {
  args: {
    message: 'Optional step message should be succinct',
    name: 'Step Name',
    state: 'error',
    svg: svgError,
  },
};

export const Incomplete = {
  args: {
    message: 'Optional step message should be succinct',
    name: 'Step Name',
    state: 'incomplete',
    svg: svgRegularCircleOne,
  },
};

export const Warning = {
  args: {
    message: 'Optional step message should be succinct',
    name: 'Step Name',
    state: 'warning',
    svg: svgWarning,
  },
};
