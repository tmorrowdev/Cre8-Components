import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../field/field';
import '../button/button';
import '../grid/grid';
import '../grid-item/grid-item';
import './form';

type Story = StoryObj;

const meta = {
    title: 'cre8 Components/Form',
    component: 'cre8-form',
    parameters: {
        status: {
            type: 'inProgress',
        },
        controls: {
            hideNoControlsWarning: true,
        },
        docs: {
            description: {
                component:
          'Groups form-associated Cre8 controls, aggregates their validation on submit, ' +
          'and orchestrates submit and reset. Renders to light DOM so the controls are ' +
          'owned by a real `<form>`, which means layout components such as `cre8-grid` ' +
          'can be nested inside freely.',
            },
        },
    },
    argTypes: {
        novalidate: {
            control: { type: 'boolean' },
            description: 'Skips aggregate validation on submit.',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables every control in the form.',
        },
    },
} satisfies Meta;

export default meta;

const logSubmit = (event: Event) => {
    const detail = (event as CustomEvent).detail;
    // eslint-disable-next-line no-console
    console.log('form-submit', detail.values);
};

const logInvalid = (event: Event) => {
    const detail = (event as CustomEvent).detail;
    // eslint-disable-next-line no-console
    console.log('form-invalid', detail.invalidControls);
};

export const Default: Story = {
    render: () => html`
    <cre8-form @form-submit=${logSubmit}>
      <cre8-field name="firstName" label="First name"></cre8-field>
      <cre8-field name="lastName" label="Last name"></cre8-field>
      <cre8-button type="submit">Save</cre8-button>
    </cre8-form>
  `,
};

/**
 * Submitting with the required field empty blocks the submit, flags the control,
 * and moves focus to it. Open the console to see the `form-invalid` event.
 */
export const Validation: Story = {
    render: () => html`
    <cre8-form @form-submit=${logSubmit} @form-invalid=${logInvalid}>
      <cre8-field name="email" label="Email" required></cre8-field>
      <cre8-field name="nickname" label="Nickname"></cre8-field>
      <cre8-button type="submit">Submit</cre8-button>
      <cre8-button type="reset" variant="secondary">Reset</cre8-button>
    </cre8-form>
  `,
};

/**
 * Controls keep their form ownership when nested inside layout components,
 * so `cre8-grid` can be used to lay the form out.
 */
export const WithLayout: Story = {
    render: () => html`
    <cre8-form @form-submit=${logSubmit}>
      <cre8-grid>
        <cre8-grid-item>
          <cre8-field name="street" label="Street" required></cre8-field>
        </cre8-grid-item>
        <cre8-grid-item>
          <cre8-field name="city" label="City" required></cre8-field>
        </cre8-grid-item>
      </cre8-grid>
      <cre8-button type="submit">Save address</cre8-button>
    </cre8-form>
  `,
};

/**
 * Setting `disabled` on the form disables every control inside it, which is
 * useful while a submission is in flight.
 */
export const Disabled: Story = {
    render: () => html`
    <cre8-form disabled>
      <cre8-field name="firstName" label="First name"></cre8-field>
      <cre8-field name="lastName" label="Last name"></cre8-field>
      <cre8-button type="submit">Saving…</cre8-button>
    </cre8-form>
  `,
};
