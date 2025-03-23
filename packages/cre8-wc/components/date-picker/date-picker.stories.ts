import { html } from "lit";
import { spread } from "../../directives/spread";
import { withActions } from "@storybook/addon-actions/decorator";
import "./date-picker";

export default {
  title: "cre8 Components/Date Picker",
  component: "cre8-date-picker",
  render: (args) => html`<cre8-date-picker ${spread(args)}></cre8-date-picker>`,
  parameters: {
    status: { type: "inProgress" },
    actions: {
      handles: ["input", "change", "blur"],
    },
    docs: {
      story: {
        height: '600px',
      },
    },
  },
  decorators: [withActions],
  argTypes: {
    ariaDescribedBy: {
      control: "text",
    },
    autocomplete: {
      control: "text",
    },
  },
};

export const Default = {};

export const DefaultWithShortcuts = {
  args: {
    hasShortcuts: "true",
  },
};

export const Readonly = {
  args: {
    label: 'Readonly example',
    readonly: "true",
    value: "2024-01-01",
  },
};

export const Disabled = {
  args: {
    label: 'Disabled example',
    disabled: 'true',
  },
};

export const Fieldnote = {
  args: {
    label: 'Fieldnote example',
    fieldNote: "This is a field note.",
  },
};

export const Error = {
  args: {
    label: 'Error Fieldnote example',
    errorNote: "Short, clear error message",
    isError: "true",
    fieldNote: "This is a field note.",
  },
};

export const Success = {
  args: {
    label: 'Success Fieldnote example',
    isSuccess: "true",
    fieldNote: "This is a field note.",
    successNote: "Short, clear success message",
  },
};
