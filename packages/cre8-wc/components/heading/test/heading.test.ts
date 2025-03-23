import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../heading';
import { cre8Heading } from '../heading';

// Mock Element.attachInternals method
// @ts-ignore

describe('heading', () => {
    beforeEach(() => {
        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'ltr',
        });
    });

    afterEach(() => {
        delete document.dir;
    });

    test('renders correctly', async () => {
        const el = await fixture(html` <cre8-heading> Heading with headline-large preset applied </cre8-heading> `);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with all types', async () => {
        const types = [
            'display-default',
            'display-small',
            'headline-large',
            'headline-default',
            'headline-small',
            'title-xlarge',
            'title-large',
            'title-default',
            'title-small',
            'label-large',
            'label-default',
            'label-small',
            'meta-large',
            'meta-default',
            'meta-small',
        ];

        for (const type of types) {
            const el = await fixture<cre8Heading>(html` <cre8-heading type=${type}> Heading </cre8-heading>`);
            await el.updateComplete;
            const heading = el.shadowRoot!.querySelector('.cre8-c-heading');
            expect(heading?.classList.contains(`cre8-c-heading--${type}`)).toBeTruthy();
        }
    });
    test('has the correct tag with all tagVariants', async () => {
        const tag = 'h2';
        const el = await fixture<cre8Heading>(html` <cre8-heading tagVariant=${tag}> Heading </cre8-heading>`);
        await el.updateComplete;
        expect(el.shadowRoot.querySelector('h2')).toBeDefined();
    });

    test('has the correct class name with inverted', async () => {
        const el = await fixture<cre8Heading>(html` <cre8-heading inverted> Heading </cre8-heading> `);
        await el.updateComplete;
        const heading = el.shadowRoot!.querySelector('.cre8-c-heading');
        expect(heading?.classList.contains('cre8-c-heading--inverted')).toBeTruthy();
    });
    test('has the correct class name with brand color applied', async () => {
        const el = await fixture<cre8Heading>(html` <cre8-heading brandColor> Heading </cre8-heading> `);
        await el.updateComplete;
        const heading = el.shadowRoot!.querySelector('.cre8-c-heading');
        expect(heading?.classList.contains('cre8-c-heading--brand-color')).toBeTruthy();
    });
    describe('accessibility tests', () => {
        test('should accessible with default props', async () => {
            const el = await fixture(html` <cre8-heading> Heading with headline-large preset applied </cre8-heading> `);
            return expect(el).toBeAccessible();
        });
        test('should accessible with tag', async () => {
            const tag = 'h1';
            const el = await fixture<cre8Heading>(html` <cre8-heading tagVariant=${tag}> Heading </cre8-heading>`);
            await el.updateComplete;
            return expect(el).toBeAccessible();
        });
        test('should accessible when class name with inverted', async () => {
            const el = await fixture<cre8Heading>(html` <cre8-heading inverted> Heading </cre8-heading> `);
            await el.updateComplete;
            return expect(el).toBeAccessible();
        });
        test('should accessible when the correct class name with brand color applied', async () => {
            const el = await fixture<cre8Heading>(html` <cre8-heading brandColor> Heading </cre8-heading> `);
            await el.updateComplete;
            return expect(el).toBeAccessible();
        });
    });
});
