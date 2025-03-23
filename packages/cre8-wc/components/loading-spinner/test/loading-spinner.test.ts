import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../loading-spinner';
import { cre8LoadingSpinner } from '../loading-spinner';

describe('loading-spinner', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-loading-spinner></cre8-loading-spinner>`);
        expect(el.shadowRoot).toBeTruthy();
    });

  test('has a label if one is given', async () => {
    const el = await fixture<cre8LoadingSpinner>(html`<cre8-loading-spinner label="Loading..."></cre8-loading-spinner>`);
    const label = el.shadowRoot!.querySelector('.cre8-c-spinner__label'); // Test for the class change
    expect(label).toBeDefined();
  });

  test.each(['primary','secondary','tertiary'])('uses the correct buttonVariant if %s provided', async (buttonVariant) => {
    const el = await fixture<cre8LoadingSpinner>(html`<cre8-loading-spinner buttonVariant=${buttonVariant}></cre8-loading-spinner>`)
    const desiredNode = el.shadowRoot.querySelector(`.cre8-c-spinner--${buttonVariant}`);

    expect(desiredNode).toBeInstanceOf(HTMLDivElement);
    expect(desiredNode.classList.contains(`cre8-c-spinner--${buttonVariant}`)).toBe(true);
  })

  test.each(['nonsense', ''])('should not render buttonVariant selector if a junk value is provided', async (badVariant) => {
    const el = await fixture<cre8LoadingSpinner>(html`<cre8-loading-spinner buttonVariant=${badVariant}></cre8-loading-spinner>`)
    const desiredNode = el.shadowRoot.querySelector(`.cre8-c-spinner`);

    expect(desiredNode.classList.contains('cre8-c-spinner--primary')).toBe(false);
    expect(desiredNode.classList.contains('cre8-c-spinner--secondary')).toBe(false);
    expect(desiredNode.classList.contains('cre8-c-spinner--tertiary')).toBe(false);
  });
});

describe('accessibility tests', () => {
    test('verify accessibility for loading spinner', async () => {
        const el = await fixture<cre8LoadingSpinner>(html`<cre8-loading-spinner label="Loading..."></cre8-loading-spinner>`);
        return expect(el).toBeAccessible();
    });
});
