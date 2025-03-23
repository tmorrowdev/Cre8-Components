import { html } from 'lit';
import { spread } from '../../directives/spread';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { sanitizeInput } from '../../utilities/story-helpers';
import { withActions } from '@storybook/addon-actions/decorator';
import '../icon/icon';
import './tooltip';
import svgInfoFilled from '@cre8/cre8-icons/lib/icons/System/Filled/Info.svg?raw';

export default {
  title: 'cre8 Components/Tooltip',
  component: 'cre8-tooltip',
  parameters: {
    status: { type: 'inProgress' },
    layout: 'centered',
    actions: {
      handles: ['open', 'close']
    }
  },

  render: ({ linkText, linkURL, default: slot, trigger, dynamicPosition, ...args }) => {
    if(linkURL !== '/?path=/story/cre8-components-tooltip--position-dynamic') {
      return html`
      <div style="display:flex; flex-direction: row; padding:70px; align-items:center;">
        <a id="whadayacallit-default-link" href="${linkURL}">${linkText}</a>
        <cre8-tooltip ${spread(args)} ariaDescribes="whadayacallit-default-link">
          ${unsafeHTML(sanitizeInput(trigger, 'cre8-icon'))}
          ${unsafeHTML(sanitizeInput(slot))}
        </cre8-tooltip>
      </div>`;
    } else {
      return html`
        <div style="padding: 3rem; height: 100vh; width: 100%; display: flex; flex-direction: column; justify-content: space-between; align-items: center; position: relative; overflow: hidden;">
          <a id="whadayacallit-dynamic-link" href="/?path=/story/cre8-components-tooltip--position-dynamic">A URL-ologist</a>
          <div style="display: flex; width: 100%; align-items: center; justify-content: center;">
            <cre8-tooltip ?isDynamic=${args.isDynamic} position="top" ariaDescribes="whadayacallit-dynamic-link" svg="${svgInfoFilled}">
              A doctor who fixes websites
            </cre8-tooltip>
          </div>
          <div style="display: flex; width: 100%; align-items: center; justify-content: space-between;">
            <cre8-tooltip ?isDynamic=${args.isDynamic} position="left" ariaDescribes="whadayacallit-dynamic-link"
            svg="${svgInfoFilled}">
              A doctor who fixes name servers
            </cre8-tooltip>
            <cre8-tooltip ?isDynamic=${args.isDynamic} position="right" ariaDescribes="whadayacallit-dynamic-link"
            svg="${svgInfoFilled}">
              A branch of anthropology that studies domain name registrations
            </cre8-tooltip>
          </div>
          <div style="display: flex; width: 100%; align-items: center; justify-content: center;">
           <cre8-tooltip ?isDynamic=${args.isDynamic} id="bottom-tooltip" ariaDescribes="whadayacallit-dynamic-link" svg="${svgInfoFilled}">
              Internet Corporation for Assigned Names and Numbers
            </cre8-tooltip>
          </div>
        </div>
      `;
    }
  },
  decorators: [withActions],
  args: {
    ariaDescribes: 'whadayacallit-default-link',
  },
  argTypes: {
    ariaDescribes: {
      control: 'text',
    },
    close: {
      table: {
        disable: true,
      },
    },
    isActive: {
      table: { disable: true},
    },
    isActiveDynamic: {
      table: { disable: true},
    },
    isDynamic: {
      control: 'boolean',
    },
    isRTL: {
      table: { disable: true },
    },
    knockout: {
      control: 'boolean',
    },
    linkText: {
      table: {
        disable: true,
      },
    },
    linkURL: {
      table: {
        disable: true,
      },
    },
    open: {
      table: {
        disable: true,
      },
    },
    position: {
      options: ['default', 'top', 'right', 'left'],
    },
    removeActive: {
      table: {
        disable: true,
      },
    },
    svg: {
      control: 'text',
    },
    iconRotateDegree: {
      control: 'text',
    },
    iconFlipDirection: {
      options: ['vertical', 'horizontal', 'both']
    },
  }
};

export const DefaultIcon = {
  args: {
    linkText: 'Trouble',
    linkURL: '/?path=/story/cre8-components-tooltip--default',
    default: `<span>Something <strong>easy</strong> to get into, but hard to get out of reallyreallylongwordthatshouldbreaktomakethetextwindownotoverflow</span>`,
    svg: svgInfoFilled,
  },
};

export const Knockout = {
  args: {
    knockout: true,
    linkText: 'An iWitness',
    linkURL: '/?path=/story/cre8-components-tooltip--knockout',
    default: 'Someone that saw an iPhone being stolen',
    svg: svgInfoFilled,
  },
};

export const PositionTop = {
  args: {
    position: 'top',
    linkText: 'A plain bagel',
    linkURL: '/?path=/story/cre8-components-tooltip--position-top',
    default: 'A bagel that can fly',
    svg: svgInfoFilled,
  },
};

export const PositionLeft = {
  args: {
    position: 'left',
    linkText: 'An undercover cop',
    linkURL: '/?path=/story/cre8-components-tooltip--position-left',
    default: 'A policeman in bed',
    svg: svgInfoFilled,  
  },
};

export const PositionRight = {
  args: {
    position: 'right',
    linkText: 'An umbrella',
    linkURL: '/?path=/story/cre8-components-tooltip--position-right',
    default: 'Something that goes up when the rain comes down',
    svg: svgInfoFilled,
  },
};

export const PositionDynamic = {
  args: {
    isDynamic: true,
    linkText: 'A URL-ologist',
    linkURL: '/?path=/story/cre8-components-tooltip--position-dynamic',
  },
};

PositionDynamic.parameters = {
  layout: 'fullscreen'
};
