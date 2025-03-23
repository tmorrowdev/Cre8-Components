import { html } from 'lit';
import { spread } from '../../directives/spread';
import {withActions} from '@storybook/addon-actions/decorator';
import './remove-tag';

const meta = {
  title: 'In Development/Remove Tag',
  component: 'cre8-remove-tag',
  parameters: { 
    status: { type: 'inProgress' },
    actions: {
      handles: ['click'],
    },
  },
  decorators: [withActions],
  render: (args) => html`<cre8-remove-tag ${spread(args)}></cre8-remove-tag>`,
  argTypes: {
    text: {
      control: 'text'
    },
    color: {
      options: ['neutral', 'branded', 'neutral-hybrid'],
      control: { type: 'radio' }
    },
    shape: {
      options: ['round', 'square'],
      control: { type: 'radio' }
    },
    removed: {
      control: 'boolean'
    },
  },
  args: {
    text: 'Tag text',
    shape: 'neutral',
    color: 'round'
  }
};
export default meta;

export const Default = {
  args: {
    text: 'Tag text',
    color: 'neutral',
    shape: 'round',
  },
};

/**
 * When used inside Multi-Select, the Remove Tag should always be `Neutral` and `Square`.  This is a very common use case for this component.
 */
export const NeutralSquare = {
  args: {
    text: 'Tag text',
    color: 'neutral',
    shape: 'square',
  },
};

/**
 * When used on its own, the Remove Tag should always be `Neutral Hybrid` and `Round`.  This is a common use case for this component.
 */
export const NeutralHybridRound = {
  args: {
    text: 'Tag text',
    color: 'neutral-hybrid',
    shape: 'round',
  }
}

export const NeutralHybridSquare = {
  args: {
    text: 'Tag text',
    color: 'neutral-hybrid',
    shape: 'square',
  }
}

/**
 * When used in a marketing context, the Remove Tag should be `Branded` and `Round`.  This is a common use case for this component.
 */
export const BrandedRound = {
  args: {
    text: 'Tag text',
    color: 'branded',
    shape: 'round',
  }
}

export const BrandedSquare = {
  args: {
    text: 'Tag text',
    color: 'branded',
    shape: 'square',
  }
}