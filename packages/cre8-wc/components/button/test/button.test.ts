import { fixture, oneEvent } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../button';
import userEvent from '@testing-library/user-event';
import { Cre8LoadingSpinner } from '../../loading-spinner/loading-spinner';
import { Cre8Button } from '../button';

describe('button', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-button></cre8-button>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('styles are compiled CSS with a working cre8-u-is-vishidden rule', async () => {
        const styles = (await import('../button.styles')).default;
        const cssText = styles.cssText;
        // Raw SCSS in the stylesheet is silently dropped by the CSS parser,
        // which breaks visually-hidden text (and any other mixin-based rule)
        expect(cssText).not.toContain('@include');
        expect(cssText).not.toContain('@import');
        const vishiddenRule = cssText.match(/\.cre8-u-is-vishidden\s*{[^}]*}/);
        expect(vishiddenRule).toBeTruthy();
        expect(vishiddenRule![0]).toContain('position: absolute !important');
    });

    test('has the correct default text', async () => {
        const el = await fixture(html`<cre8-button text="Foo"></cre8-button>`);
        const button = el.shadowRoot.querySelector('button');
        const textContentWithoutWhitespace = button.textContent?.replace(/\s/g, '');
        expect(textContentWithoutWhitespace).toBe('Foo');
    });

    test('has the correct class names with variant', async () => {
        const variants = ['primary', 'secondary', 'tertiary'];

        for (const variant of variants) {
            const el = await fixture<Cre8Button>(html`<cre8-button variant="${variant}"></cre8-button>`);
            const button = el.shadowRoot!.querySelector('button'); // Test for the class change
            expect(button.classList.contains(`cre8-c-button--${variant}`)).toBeTruthy();
        }
    });

    test('has the correct class names with secondary variant neutral and inverse props', async () => {
            const el = await fixture<Cre8Button>(html`<cre8-button text="Button" variant="secondary" neutral inverse></cre8-button>`);
            const button = el.shadowRoot!.querySelector('button'); // Test for the class change
            expect(button.classList.contains(`cre8-c-button--secondary`)).toBeTruthy();
            expect(button.classList.contains(`cre8-c-button--neutral`)).toBeTruthy();
            expect(button.classList.contains(`cre8-c-button--inverse`)).toBeTruthy();
        
    });

    test('has the correct class names with secondary variant disabled, neutral and inverse props', async () => {
        const el = await fixture<Cre8Button>(html`<cre8-button text="Button" variant="secondary" disabled neutral inverse></cre8-button>`);
        const button = el.shadowRoot!.querySelector('button'); // Test for the class change
        expect(button.classList.contains(`cre8-c-button--secondary`)).toBeTruthy();
        expect(button.classList.contains(`cre8-c-button--neutral`)).toBeTruthy();
        expect(button.classList.contains(`cre8-c-button--inverse`)).toBeTruthy();
});

test('has the correct class names with secondary variant loading, neutral and inverse props', async () => {
    const el = await fixture<Cre8Button>(html`<cre8-button text="Button" variant="secondary" loading neutral inverse></cre8-button>`);
    const button = el.shadowRoot!.querySelector('button'); // Test for the class change
    expect(button.classList.contains(`cre8-c-button--secondary`)).toBeTruthy();
    expect(button.classList.contains(`cre8-c-button--neutral`)).toBeTruthy();
    expect(button.classList.contains(`cre8-c-button--inverse`)).toBeTruthy();
    expect(button.classList.contains(`cre8-c-button--loading`)).toBeTruthy();
});

test('works with loading state secondary variant with neutral and inverse props', async () => {
    const el = await fixture(html`<cre8-button variant="secondary" neutral inverse ?loading=${true}></cre8-button>`);
    const Cre8Icon = el.shadowRoot.querySelector<Cre8LoadingSpinner>('cre8-loading-spinner');
    const button = el.shadowRoot!.querySelector('button'); // Test for the class change
    expect(Cre8Icon.classList.contains('cre8-c-button__loading-icon')).toBeTruthy();
    expect(button.classList.contains(`cre8-c-button--secondary`)).toBeTruthy();
    expect(button.classList.contains(`cre8-c-button--neutral`)).toBeTruthy();
    expect(button.classList.contains(`cre8-c-button--inverse`)).toBeTruthy();
    expect(button.classList.contains(`cre8-c-button--loading`)).toBeTruthy();
});

    test('works with an href', async () => {
        const el = await fixture(html`<cre8-button href="https://www.cfpb.gov"></cre8-button>`);
        const button = el.shadowRoot.querySelector('a');
        expect(button).toBeTruthy();
    });

    test('works with an href and an iconPosition before', async () => {
        const el = await fixture(html`<cre8-button href="https://www.cfpb.gov" text="Go to CFPB" iconPosition="before" iconName="keyboard-arrow-right"></cre8-button>`);
        const button = el.shadowRoot.querySelector('a');
        const buttonText = el.shadowRoot.querySelector<HTMLSpanElement>('.cre8-c-button__text');
        const previousElement = buttonText.previousElementSibling as HTMLElement;
        expect(previousElement.tagName === 'CRE8-ICON-LEGACY').toBeTruthy();
        expect(button).toBeTruthy();
    });

    test('works with an href and an iconPosition before with cre8 icon', async () => {
        const el = await fixture(html`<cre8-button href="https://www.cfpb.gov" iconPosition="before" svg='svgCaretUp' iconRotateDegree="-90" text="Button"></cre8-button>`);
        const button = el.shadowRoot.querySelector('a');
        const buttonText = el.shadowRoot.querySelector<HTMLSpanElement>('.cre8-c-button__text');
        const previousElement = buttonText.previousElementSibling as HTMLElement;
        expect(previousElement.tagName === 'CRE8-ICON').toBeTruthy();
        expect(button).toBeTruthy();
    });

    test('works with loading state', async () => {
        const el = await fixture(html`<cre8-button ?loading=${true}></cre8-button>`);
        const Cre8Icon = el.shadowRoot.querySelector<Cre8LoadingSpinner>('cre8-loading-spinner');
        expect(Cre8Icon.classList.contains('cre8-c-button__loading-icon')).toBeTruthy();
    });

    test('works with an href and an iconPosition after', async () => {
        const el = await fixture(html`<cre8-button href="https://www.cfpb.gov" text="Go to CFPB" iconPosition="after" iconName="keyboard-arrow-right"></cre8-button>`);
        const button = el.shadowRoot.querySelector('a');
        const buttonText = el.shadowRoot.querySelector<HTMLSpanElement>('.cre8-c-button__text');
        const nextElement = buttonText.nextElementSibling as HTMLElement;
        expect(nextElement.tagName === 'CRE8-ICON-LEGACY').toBeTruthy();
        expect(button).toBeTruthy();
    });

    test('works with an href and an iconPosition after with cre8 icon', async () => {
        const el = await fixture(html`<cre8-button href="https://www.cfpb.gov" iconPosition="after" svg='svgCaretUp' iconRotateDegree="90" text="Button"></cre8-button>`);
        const button = el.shadowRoot.querySelector('a');
        const buttonText = el.shadowRoot.querySelector<HTMLSpanElement>('.cre8-c-button__text');
        const nextElement = buttonText.nextElementSibling as HTMLElement;
        expect(nextElement.tagName === 'CRE8-ICON').toBeTruthy();
        expect(button).toBeTruthy();
    });

    test('works with an href and hide text', async () => {
        const el = await fixture(html`<cre8-button href="https://www.cfpb.gov" text="Go to CFPB" hideText="true"></cre8-button>`);
        const button = el.shadowRoot.querySelector('a');
        const buttonContent = el.shadowRoot.querySelector('.cre8-c-button__text');
        expect(buttonContent.classList.contains('cre8-u-is-vishidden')).toBeTruthy();
        expect(button).toBeTruthy();
    });

    test('works with iconName set and icon Position before', async () => {
        const el = await fixture(html`<cre8-button iconName="chevron-down" iconPosition="before"></cre8-button>`);
        const button = el.shadowRoot.querySelector('cre8-icon-legacy');
        expect(button).toBeTruthy();
    });

    test('works with svg set and icon Position before', async () => {
        const el = await fixture(html`<cre8-button iconPosition="before" svg='svgCaretUp' iconRotateDegree="-90" text="Button"></cre8-button>`);
        const button = el.shadowRoot.querySelector('cre8-icon');
        expect(button).toBeTruthy();
    });

    test('works with iconName set and icon Position after', async () => {
        const el = await fixture(html`<cre8-button iconName="chevron-down" iconPosition="after"></cre8-button>`);
        const icon = el.shadowRoot.querySelector('cre8-icon-legacy');
        expect(icon).toBeTruthy();
    });

    test('works with svg set and icon Position after', async () => {
        const el = await fixture(html`<cre8-button svg='svgCaretUp' iconRotateDegree="90" iconPosition="after"></cre8-button>`);
        const icon = el.shadowRoot.querySelector('cre8-icon');
        expect(icon).toBeTruthy();
    });

    test('works with hidden text', async () => {
        const el = await fixture(html`<cre8-button hideText="true" text="Foo"></cre8-button>`);
        const buttonContent = el.shadowRoot.querySelector('.cre8-c-button__text');
        expect(buttonContent.classList.contains('cre8-u-is-vishidden')).toBeTruthy();
    });

    test('works without hidden text', async () => {
        const el = await fixture(html`<cre8-button text="Foo"></cre8-button>`);
        const buttonContent = el.shadowRoot.querySelector('.cre8-c-button__text');
        expect(buttonContent.classList.contains('cre8-u-is-vishidden')).toBe(false);
    });

    test('dispatches an event when clicked', async () => {
        const el = await fixture(html`<cre8-button text="Foo"></cre8-button>`);
        const clickButton = () => el.shadowRoot.querySelector('button').click();
        setTimeout(clickButton);
        const listener = await oneEvent(el, 'click');
        expect(listener).toBeTruthy();
    });

    test('submit form with button', async () => {
        const mockSubmit = jest.fn();
        HTMLFormElement.prototype.requestSubmit = mockSubmit;
        const el = (await fixture(html`<form id="form-example"><cre8-button type="submit"></cre8-button></form>`)) as HTMLFormElement;
        const button = el.querySelector('cre8-button').shadowRoot.querySelector('button');
        await userEvent.click(button);
        expect(mockSubmit.mock.calls).toHaveLength(1);
    });

    test('does not submit form with loading button', async () => {
        const mockSubmit = jest.fn();
        HTMLFormElement.prototype.requestSubmit = mockSubmit;
        const el = (await fixture(html`<form id="form-example"><cre8-button type="submit" ?loading=${true}></cre8-button></form>`)) as HTMLFormElement;
        const button = el.querySelector('cre8-button').shadowRoot.querySelector('button');
        await userEvent.click(button);
        expect(mockSubmit.mock.calls).toHaveLength(0);
    });

    test('reset form with button', async () => {
        const mockReset = jest.fn();
        HTMLFormElement.prototype.reset = mockReset;
        const el = (await fixture(html`<form id="form-example"><cre8-button type="reset"></cre8-button></form>`)) as HTMLFormElement;
        const button = el.querySelector('cre8-button').shadowRoot.querySelector('button');
        await userEvent.click(button);
        expect(mockReset.mock.calls).toHaveLength(1);
    });

    describe('accessibility -  Button', () => {
        test('tests accessibility for default button', async () => {
            const el = await fixture<Cre8Button>(html`<cre8-button text="Foo"></cre8-button>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for disabled button', async () => {
            const el = await fixture<Cre8Button>(html`<cre8-button text="Foo" disabled="true"></cre8-button>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for "anchor tag" button with Icon', async () => {
            const el = await fixture<Cre8Button>(
                html`<cre8-button href="https://www.cfpb.gov" text="Go to CFPB" iconPosition="before" iconName="keyboard-arrow-right"></cre8-button>`
            );
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for "anchor tag" button with Icon (cre8-icon)', async () => {
            const el = await fixture<Cre8Button>(
                html`<cre8-button href="https://www.cfpb.gov" iconPosition="before" svg='svgCaretUp' iconRotateDegree="-90" text="Go to CFPB"></cre8-button>`
            );
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for "anchor tag" button with hideText', async () => {
            const el = await fixture<Cre8Button>(
                html`<cre8-button href="https://www.cfpb.gov" text="Go to CFPB" hideText="true"></cre8-button>`
            );
            return expect(el).toBeAccessible();
        });
    });
});
