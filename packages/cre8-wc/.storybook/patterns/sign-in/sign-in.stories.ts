import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { expect, userEvent, waitFor } from 'storybook/test';
import '../../../components/form/form';
import '../../../components/field/field';
import '../../../components/button/button';
import '../../../components/button-group/button-group';
import '../../../components/card/card';
import '../../../components/heading/heading';
import type { Cre8Form } from '../../../components/form/form';
import type { Cre8Field } from '../../../components/field/field';

type Story = StoryObj;

const meta = {
    title: 'Patterns/Sign In',
    component: 'cre8-form',
    tags: ['autodocs', 'pattern', 'experimental'],
    parameters: {
        controls: { hideNoControlsWarning: true },
        docs: {
            description: {
                component:
          'A sign-in composition built from `cre8-form`, `cre8-field`, and `cre8-button-group` ' +
          'inside a `cre8-card`. The form blocks submission while required fields are empty, ' +
          'flags them inline, and moves focus to the first invalid control. The **Interactions** ' +
          'panel replays the full flow: an empty submit that gets blocked, then a valid ' +
          'submit that collects `FormData`.',
            },
        },
    },
} satisfies Meta;

export default meta;

/** Grabs the native input inside a cre8-field's shadow root once it exists. */
const innerInput = async (field: Cre8Field): Promise<HTMLInputElement> => {
    let input: HTMLInputElement | null = null;
    await waitFor(() => {
        input = field.shadowRoot?.querySelector('input') ?? null;
        expect(input).toBeTruthy();
    });
    return input!;
};

export const Default: Story = {
    render: () => html`
    <cre8-card style="max-width: 24rem; padding: 2rem;">
      <cre8-heading slot="header" tagVariant="h2" variant="title-default">Sign in</cre8-heading>
      <cre8-form>
        <cre8-field name="email" type="email" label="Email" required></cre8-field>
        <cre8-field name="password" type="password" label="Password" required></cre8-field>
        <cre8-button-group>
          <cre8-button type="submit" text="Sign in"></cre8-button>
          <cre8-button variant="tertiary" text="Forgot password?"></cre8-button>
        </cre8-button-group>
      </cre8-form>
    </cre8-card>
  `,
    play: async ({ canvasElement, step }) => {
        const form = canvasElement.querySelector<Cre8Form>('cre8-form')!;
        await waitFor(() => expect(form.querySelector('form.cre8-c-form')).toBeTruthy());

        const [email, password] = Array.from(canvasElement.querySelectorAll<Cre8Field>('cre8-field'));
        const events: string[] = [];
        form.addEventListener('form-invalid', () => events.push('form-invalid'));
        form.addEventListener('form-submit', () => events.push('form-submit'));

        await step('Submitting empty blocks and focuses the first invalid field', async () => {
            form.submit();
            await waitFor(() => expect(events).toContain('form-invalid'));
            expect(events).not.toContain('form-submit');
            expect(email.isError).toBe(true);
            expect(document.activeElement).toBe(email);
        });

        await step('Filling both fields clears the way', async () => {
            await userEvent.type(await innerInput(email), 'ada@cre8.dev');
            await userEvent.type(await innerInput(password), 'correct-horse');
        });

        await step('Submitting valid input emits form-submit with the values', async () => {
            const submitted = new Promise<Record<string, unknown>>((resolve) => {
                form.addEventListener(
                    'form-submit',
                    (e) => resolve((e as CustomEvent).detail.values),
                    { once: true },
                );
            });
            form.submit();
            const values = await submitted;
            expect(values).toEqual({ email: 'ada@cre8.dev', password: 'correct-horse' });
            expect(email.isError).toBe(false);
        });
    },
};
