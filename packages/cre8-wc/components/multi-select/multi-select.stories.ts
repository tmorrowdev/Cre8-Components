import { html } from 'lit';
import { spread } from '../../directives/spread';
import './multi-select';
import '../remove-tag/remove-tag';

const baseItems = [{ label: 'Bagel', value: 'bagel', preselected: true }, { label: 'Boat', value: 'boat' }, { label: 'Bungus', value: 'bungus' }];

const meta = {
  title: 'In Development/MultiSelect',
  component: 'cre8-multi-select',
  render: ([...args]) => {
    return html`<cre8-multi-select
      ${spread(args)}
      .items=${Array.isArray(baseItems) ? baseItems : undefined}
      .preselectedItems=${baseItems.filter((item) => item.preselected)}
    ></cre8-multi-select>`},
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['selectedItemsChange'],
    },
    docs: {
      story: {
        height: '350px',
      },
    },
  },
  argTypes: {},
  args: {
    id: 'selectId',
    items: baseItems,
    label: 'Choose your favorite food:',
  },
};
export default meta;

export const Default = { args: {} };

export const Wrapping = ([...args]) => html`
  <div style="width: 320px;">
    <cre8-multi-select
      ${spread(args)}
      .items=${args.items}
      label="Wrapping"
    ></cre8-multi-select>
  </div>
  `;

export const PreSelected = {
  args: {
    label: 'PreSelected',
    items: ['Car', 'Crumbs', 'Coco', 'Creampuff', 'Clock'],
    preselectedItems: ['Car', 'Crumbs'],
  },
}

export const Disabled = {
  args: {
    disabled: true,
    label: 'Disabled',
  }
};

export const DisabledWithTags = {
  args: {
    disabled: true,
    label: 'Disabled',
    preselectedItems: ['Brisket'],
  }
};

export const Error = {
  args: {
    errorNote: "Short, clear error message.",
    isError: true,
    label: 'Error',
    items: ['Doll', 'Dice', 'Doctor', 'Dinger', 'Derby'],
  }
};

export const Success = {
  args: {
    isSuccess: true,
    successNote: "Short, clear success message",
    label: 'Success',
    items: ['Emu', 'Eggplant', 'Envy', 'Essence'],
    preselectedItems: ['Eevee'],
  }
};
