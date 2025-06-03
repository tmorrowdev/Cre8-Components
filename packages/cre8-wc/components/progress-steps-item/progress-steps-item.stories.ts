import {html} from 'lit';
import {spread} from '../../directives/spread';
import './progress-steps-item';
import svgCheckCircle from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Filled/Check.svg?raw';
import svgError from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Filled/Error.svg?raw';
import svgFilledCircleOne from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Filled/Circle_One.svg?raw';
import svgRegularCircleOne from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Regular/Circle_One.svg?raw';
import svgWarning from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Filled/Warning.svg?raw';

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
