import type { StoryObj, StoryFn } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { withActions } from '@storybook/addon-actions/decorator';
import { Cre8Tooltip } from '../..';
import { Props } from 'next/script';


export default {
  title: 'Cre8 Components/Tooltip',
  component: Cre8Tooltip,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    },
    layout: 'centered',
    actions: {
      handles: ['open', 'close']
    }
  },
  decorators: [withActions],
  args: {
    children: (
      <>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
        reallyreallylongwordthatshouldbreaktomakethetextwindownotoverflow
      </>
    ),
  },
  argTypes: {
    ariaDescribes: {
      control: 'text',
    },
    dynamicPosition: {
      table: {
        disable: true,
      },
    },
    isActive: {
      table: {
        disable: true,
      },
    },
    isActiveDynamic: {
      table: {
        disable: true,
      },
    },
    isDynamic: {
      control: 'boolean',
    },
    isRTL: {
      table: {
        disable: true,
      },
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
    onClose: {
      table: {
        disable: true,
      },
    },
    onOpen: {
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
    toggleActive: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default: StoryObj<typeof Cre8Tooltip> = { args: {} };

export const Knockout: StoryObj<typeof Cre8Tooltip> = { args: {
  knockout: true
} };

export const PositionTop: StoryObj<typeof Cre8Tooltip> = { args: {
  position: 'top'
} };

export const PositionLeft: StoryObj<typeof Cre8Tooltip> = { args: {
  position: 'left'
} };

export const PositionRight: StoryObj<typeof Cre8Tooltip> = { args: {
  position: 'right'
} };

const PositionDynamicTemplate: StoryFn<Props> = () => (
  <div style={{ padding: '3rem', height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Cre8Tooltip isDynamic={true} position="top" >
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </Cre8Tooltip>
    </div>
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
      <Cre8Tooltip isDynamic={true} position="right" >
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </Cre8Tooltip>
      <Cre8Tooltip isDynamic={true} position="left" >
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </Cre8Tooltip>
    </div>
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Cre8Tooltip isDynamic={true} >
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </Cre8Tooltip>
    </div>
  </div>
);
export const PositionDynamic = PositionDynamicTemplate.bind({});
PositionDynamic.args = {};
PositionDynamic.parameters = { layout: 'fullscreen' };
