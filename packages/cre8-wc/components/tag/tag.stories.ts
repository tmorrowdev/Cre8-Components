import { html } from 'lit';
import { spread } from '../../directives/spread';
import './tag';

const meta = {
  title: 'In Development/Tag',
  component: 'cre8-tag',
  render: (args) => html`<cre8-tag ${spread(args)}></cre8-tag>`,
  parameters: { status: { type: 'inProgress' } },
  argTypes: {
    text: {
      control: 'text'
    },
    type: {
        options: ['checkbox', 'radio'],
        control: { type: 'radio' }
    },
    variant: {
      options: ['neutral', 'branded', 'neutral-hybrid'],
      control: { type: 'select' }
    },
    isDisabled: {
      control: { type: 'boolean' }
    },
    isSelected: {
      control: { type: 'boolean' }
    }
  },
  args: {
    type: 'radio',
    variant: 'neutral'
  }
};

export default meta;

export const DefaultRadio = {
  args: {
    text: 'Default',
    type: 'radio',
  },
};

export const NeutralRadio = {
  args: {
    text: 'Neutral',
    type: 'radio',
  },
};

export const NeutralRadioSelected = {
  args: {
    isSelected: true,
    text: 'Neutral',
    type: 'radio',
  },
};

export const NeutralHybridRadio = {
  args: {
    text: 'Neutral Hybrid',
    type: 'radio',
    variant: 'neutral-hybrid',
  },
};

export const NeutralHybridRadioSelected = {
  args: {
    isSelected: true,
    text: 'Neutral Hybrid',
    type: 'radio',
    variant: 'neutral-hybrid',
  },
};

export const BrandedRadio = {
  args: {
    text: 'Branded',
    type: 'radio',
    variant: 'branded',
  },
};

export const BrandedRadioSelected = {
  args: {
    isSelected: true,
    text: 'Branded',
    type: 'radio',
    variant: 'branded',
  },
};

export const DisabledRadio = {
  args: {
    text: 'Disabled',
    isDisabled: true
  },
};

export const DefaultNeutralCheckbox = {
  args: {
    text: 'Default',
    type: 'checkbox',
  },
};

export const ShapeRoundNeutralCheckbox = {
  args: {
    text: 'Round',
    type: 'checkbox',
    shape: 'round',
  },
};

export const NeutralSelectedCheckbox = {
  args: {
    isSelected: true,
    text: 'Neutral Selected',
    type: 'checkbox',
  },
};

export const NeutralHybridCheckbox = {
  args: {
    text: 'Neutral Hybrid',
    type: 'checkbox',
    variant: 'neutral-hybrid',
  },
};

export const NeutralHybridRoundSelectedCheckbox = {
  args: {
    text: 'Neutral Hybrid Selected',
    isSelected: true,
    shape: 'round',
    type: 'checkbox',
    variant: 'neutral-hybrid',
  },
};

export const BrandedCheckbox = {
  args: {
    text: 'Branded',
    type: 'checkbox',
    variant: 'branded',
  },
};

export const BrandedSelectedCheckbox = {
  args: {
    text: 'Branded Selected',
    isSelected: true,
    type: 'checkbox',
    variant: 'branded', 
  },
};

export const DisabledCheckbox = {
  args: {
    text: 'Disabled',
    isDisabled: true,
    type: 'checkbox',
  },
};