import svgCaretLeft from '@cre8/cre8-icons/lib/icons/System/Regular/Caret Left.svg?raw';
import svgCaretRight from '@cre8/cre8-icons/lib/icons/System/Regular/Caret Right.svg?raw';
import { fixture, oneEvent } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../danger-button';
import userEvent from '@testing-library/user-event';
import { cre8LoadingSpinner } from '../../loading-spinner/loading-spinner';
import { cre8DangerButton } from '../danger-button';

describe('danger-button', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-danger-button></cre8-danger-button>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct default text', async () => {
        const el = await fixture(html`<cre8-danger-button text="Foo"></cre8-danger-button>`);
        const button = el.shadowRoot.querySelector('button');
        const textContentWithoutWhitespace = button.textContent?.replace(/\s/g, '');
        expect(textContentWithoutWhitespace).toBe('Foo');
    });

    test('has the correct class names with variant', async () => {
        const variants = ['primary', 'secondary', 'tertiary'];

        for (const variant of variants) {
            const el = await fixture<cre8DangerButton>(html`<cre8-danger-button variant="${variant}"></cre8-danger-button>`);
            const button = el.shadowRoot!.querySelector('button'); // Test for the class change
            expect(button.classList.contains(`cre8-c-danger-button--${variant}`)).toBeTruthy();
        }
    });

    test('works with an href', async () => {
        const el = await fixture(html`<cre8-danger-button href="https://www.cfpb.gov"></cre8-danger-button>`);
        const button = el.shadowRoot.querySelector('a');
        expect(button).toBeTruthy();
    });

    test('works with an href and an iconPosition before', async () => {
        const el = await fixture(html`<cre8-danger-button href="https://www.cfpb.gov" iconPosition="before" svg=${svgCaretLeft}></cre8-danger-button>`);
        const button = el.shadowRoot.querySelector('a');
        const buttonText = el.shadowRoot.querySelector<HTMLSpanElement>('.cre8-c-danger-button__text');
        const previousElement = buttonText.previousElementSibling as HTMLElement;
        expect(previousElement.tagName === 'cre8-ICON').toBeTruthy();
        expect(button).toBeTruthy();
    });

    test('works with loading state', async () => {
        const el = await fixture(html`<cre8-danger-button ?loading=${true}></cre8-danger-button>`);
        const cre8Icon = el.shadowRoot.querySelector<cre8LoadingSpinner>('cre8-loading-spinner');
        expect(cre8Icon.classList.contains('cre8-c-danger-button__loading-icon')).toBeTruthy();
    });

    test('works with an href and an iconPosition after', async () => {
        const el = await fixture(html`<cre8-danger-button href="https://www.cfpb.gov" iconPosition="after" svg=${svgCaretRight}></cre8-danger-button>`);
        const button = el.shadowRoot.querySelector('a');
        const buttonText = el.shadowRoot.querySelector<HTMLSpanElement>('.cre8-c-danger-button__text');
        const nextElement = buttonText.nextElementSibling as HTMLElement;
        expect(nextElement.tagName === 'cre8-ICON').toBeTruthy();
        expect(button).toBeTruthy();
    });

    test('works with an href and hide text', async () => {
        const el = await fixture(html`<cre8-danger-button href="https://www.cfpb.gov" hideText="true"></cre8-danger-button>`);
        const button = el.shadowRoot.querySelector('a');
        const buttonContent = el.shadowRoot.querySelector('.cre8-c-danger-button__text');
        expect(buttonContent.classList.contains('cre8-u-is-vishidden')).toBeTruthy();
        expect(button).toBeTruthy();
    });

    test('works with svg set and icon Position before', async () => {
        const el = await fixture(html`<cre8-danger-button svg=${svgCaretLeft} iconPosition="before"></cre8-danger-button>`);
        const button = el.shadowRoot.querySelector('cre8-icon');
        expect(button).toBeTruthy();
    });

    test('works with svg set and icon Position after', async () => {
        const el = await fixture(html`<cre8-danger-button svg=${svgCaretRight} iconPosition="after"></cre8-danger-button>`);
        const icon = el.shadowRoot.querySelector('cre8-icon');
        expect(icon).toBeTruthy();
    });

    test('works with hidden text', async () => {
        const el = await fixture(html`<cre8-danger-button hideText="true" text="Foo"></cre8-danger-button>`);
        const buttonContent = el.shadowRoot.querySelector('.cre8-c-danger-button__text');
        expect(buttonContent.classList.contains('cre8-u-is-vishidden')).toBeTruthy();
    });

    test('works without hidden text', async () => {
        const el = await fixture(html`<cre8-danger-button text="Foo"></cre8-danger-button>`);
        const buttonContent = el.shadowRoot.querySelector('.cre8-c-danger-button__text');
        expect(buttonContent.classList.contains('cre8-u-is-vishidden')).toBe(false);
    });

    test('dispatches an event when clicked', async () => {
        const el = await fixture(html`<cre8-danger-button text="Foo"></cre8-danger-button>`);
        const clickButton = () => el.shadowRoot.querySelector('button').click();
        setTimeout(clickButton);
        const listener = await oneEvent(el, 'click');
        expect(listener).toBeTruthy();
    });

    test('submit form with button', async () => {
        const mockSubmit = jest.fn();
        HTMLFormElement.prototype.requestSubmit = mockSubmit;
        const el = (await fixture(html`<form id="form-example"><cre8-danger-button type="submit"></cre8-danger-button></form>`)) as HTMLFormElement;
        const button = el.querySelector('cre8-danger-button').shadowRoot.querySelector('button');
        userEvent.click(button);
        expect(mockSubmit.mock.calls).toHaveLength(1);
    });

    test('does not submit form with loading button', async () => {
        const mockSubmit = jest.fn();
        HTMLFormElement.prototype.requestSubmit = mockSubmit;
        const el = (await fixture(html`<form id="form-example"><cre8-danger-button type="submit" ?loading=${true}></cre8-danger-button></form>`)) as HTMLFormElement;
        const button = el.querySelector('cre8-danger-button').shadowRoot.querySelector('button');
        userEvent.click(button);
        expect(mockSubmit.mock.calls).toHaveLength(0);
    });

    test('reset form with button', async () => {
        const mockReset = jest.fn();
        HTMLFormElement.prototype.reset = mockReset;
        const el = (await fixture(html`<form id="form-example"><cre8-danger-button type="reset"></cre8-danger-button></form>`)) as HTMLFormElement;
        const button = el.querySelector('cre8-danger-button').shadowRoot.querySelector('button');
        userEvent.click(button);
        expect(mockReset.mock.calls).toHaveLength(1);
    });

    describe('accessibility - Danger Button', () => {
        test('tests accessibility for default button', async () => {
            const el = await fixture<cre8DangerButton>(html`<cre8-danger-button text="Foo"></cre8-danger-button>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for disabled button', async () => {
            const el = await fixture<cre8DangerButton>(html`<cre8-danger-button text="Foo" disabled="true"></cre8-danger-button>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for "anchor tag" button with Icon', async () => {
            const el = await fixture<cre8DangerButton>(
                html`<cre8-danger-button href="https://www.cfpb.gov" iconPosition="before" svg=${svgCaretRight}></cre8-danger-button>`
            );
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for "anchor tag" button with hideText', async () => {
            const el = await fixture<cre8DangerButton>(
                html`<cre8-danger-button href="https://www.cfpb.gov" hideText="true"></cre8-danger-button>`
            );
            return expect(el).toBeAccessible();
        });
    });
});
