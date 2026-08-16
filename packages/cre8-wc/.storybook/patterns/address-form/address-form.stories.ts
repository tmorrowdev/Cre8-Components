import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { expect, userEvent, waitFor } from 'storybook/test';
import '../../../components/form/form';
import '../../../components/field/field';
import '../../../components/button/button';
import '../../../components/grid/grid';
import '../../../components/grid-item/grid-item';
import '../../../components/heading/heading';
import type { Cre8Form } from '../../../components/form/form';
import type { Cre8Field } from '../../../components/field/field';

type Story = StoryObj;

const meta = {
    title: 'Patterns/Address Form',
    component: 'cre8-form',
    tags: ['autodocs', 'pattern', 'experimental'],
    parameters: {
        controls: { hideNoControlsWarning: true },
        docs: {
            description: {
                component:
          'A shipping-address composition that lays `cre8-field` controls out with ' +
          '`cre8-grid` inside a `cre8-form`. Because `cre8-form` renders to light DOM, ' +
          'controls keep their form ownership through any depth of layout nesting — the ' +
          'Interactions panel proves it by filling every field through the grid and ' +
          'asserting the submitted `FormData` contains all four values.',
            },
        },
    },
} satisfies Meta;

export default meta;

const fieldByName = (root: HTMLElement, name: string) => root.querySelector<Cre8Field>(`cre8-field[name="${name}"]`)!;

const typeInto = async (field: Cre8Field, text: string) => {
    let input: HTMLInputElement | null = null;
    await waitFor(() => {
        input = field.shadowRoot?.querySelector('input') ?? null;
        expect(input).toBeTruthy();
    });
    await userEvent.type(input!, text);
};

export const Default: Story = {
    render: () => html`
    <cre8-form style="max-width: 40rem;">
      <cre8-heading tagVariant="h2" variant="title-default">Shipping address</cre8-heading>
      <cre8-grid variant="2up" gap="lg">
        <cre8-grid-item>
          <cre8-field name="street" label="Street" required></cre8-field>
        </cre8-grid-item>
        <cre8-grid-item>
          <cre8-field name="city" label="City" required></cre8-field>
        </cre8-grid-item>
        <cre8-grid-item>
          <cre8-field name="state" label="State" required></cre8-field>
        </cre8-grid-item>
        <cre8-grid-item>
          <cre8-field name="zip" label="ZIP code" required></cre8-field>
        </cre8-grid-item>
      </cre8-grid>
      <cre8-button type="submit" text="Save address"></cre8-button>
    </cre8-form>
  `,
    play: async ({ canvasElement, step }) => {
        const form = canvasElement.querySelector<Cre8Form>('cre8-form')!;
        await waitFor(() => expect(form.querySelector('form.cre8-c-form')).toBeTruthy());

        await step('Every grid-nested control is owned by the form', async () => {
            await waitFor(() => expect(form.controls).toHaveLength(5));
        });

        await step('Fill the address through the grid', async () => {
            await typeInto(fieldByName(form, 'street'), '1 Infinite Loop');
            await typeInto(fieldByName(form, 'city'), 'Cupertino');
            await typeInto(fieldByName(form, 'state'), 'CA');
            await typeInto(fieldByName(form, 'zip'), '95014');
        });

        await step('Submit collects all values via FormData', async () => {
            const submitted = new Promise<Record<string, unknown>>((resolve) => {
                form.addEventListener(
                    'form-submit',
                    (e) => resolve((e as CustomEvent).detail.values),
                    { once: true },
                );
            });
            form.submit();
            expect(await submitted).toEqual({
                street: '1 Infinite Loop',
                city: 'Cupertino',
                state: 'CA',
                zip: '95014',
            });
        });
    },
};
