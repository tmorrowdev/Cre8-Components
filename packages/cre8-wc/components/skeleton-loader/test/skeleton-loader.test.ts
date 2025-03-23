import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../skeleton-loader';
import { cre8SkeletonLoader } from '../skeleton-loader';

describe('skeleton-loader', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8SkeletonLoader>(html`<cre8-skeleton-loader></cre8-skeleton-loader>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with variant', async () => {
        const variants = ['rectangle', 'square', 'circle'];

        for (const variant of variants) {
            const el = await fixture<cre8SkeletonLoader>(
                html`<cre8-skeleton-loader variant="${variant}"></cre8-skeleton-loader>`
            );
            const skeletonLoader = el.shadowRoot.querySelector('.cre8-c-skeleton-loader');
            expect(skeletonLoader.classList.contains(`cre8-c-skeleton-loader--${variant}`)).toBeTruthy();
        }
    });

    describe('accessibility -  Skeleton Loader', () => {
        test('tests accessibility for default skeleton loader', async () => {
            const el = await fixture<cre8SkeletonLoader>(html`<cre8-skeleton-loader></cre8-skeleton-loader>`);
            return expect(el).toBeAccessible();
        });
    });
});
