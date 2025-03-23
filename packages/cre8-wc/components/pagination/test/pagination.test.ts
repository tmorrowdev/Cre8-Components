import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../page-counter/page-counter';
import '../../button/button';
import '../pagination';
import { cre8Button, cre8Pagination } from '../../..';


describe('pagination', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8Pagination>(html`
        <cre8-pagination currentpage="1" totalresults="300" pagesize="25" visiblepages="5" display="default"
        ></cre8-pagination>`);

        expect(el.shadowRoot).toBeDefined();
    });

    test('pagination  responds to window width', async () => {
        const el = await fixture<cre8Pagination>(html`
        <cre8-pagination currentPage="1" totalresults="300" pagesize="25" visiblepages="5" display="default">
        </cre8-pagination>`);
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
        window.matchMedia('(min-width: 1000px;)');
        await elementUpdated(el);
        expect(el.windowWidth).toBeGreaterThanOrEqual(1000);
        el.handleResize();
        await elementUpdated(el);
        jest.spyOn(el, 'display', 'get');
        expect(el.display).toBe('default');
    });

    test('nextPage clicks go to the next page', async () => {
        const el = await fixture<cre8Pagination>(html`
    <cre8-pagination currentPage="1" totalresults="300" pagesize="25" visiblepages="5" display="default"
    ></cre8-pagination>`);
        await el.updateComplete;

        const current = el.currentPage;
        expect(current).toBe(1);

        const next = el.shadowRoot.querySelector('.cre8-c-pagination').children.item(4) as cre8Button;
        next.click();

        const current2 = el.currentPage;
        expect(current2).toBe(2);
    });

    describe('accessibility -  Pagination, default', () => {
        test('tests accessibility for default pagination', async () => {
            const el = await fixture<cre8Pagination>(html`<cre8-pagination
    currentPage="1"
    totalResults="300"
    pageSize="20"
    display="default"
    visiblePages="5"
  ></cre8-pagination>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for compact pagination variant', async () => {
            const el = await fixture<cre8Pagination>(html`<cre8-pagination
    currentPage="1"
    totalResults="300"
    pageSize="20"
    display="compact"
    visiblePages="5"
  ></cre8-pagination>`);
            return expect(el).toBeAccessible();
        });


        test('tests accessibility for icon-only pagination variant', async () => {
            const el = await fixture<cre8Pagination>(html`  <cre8-pagination
    currentPage="1"
    totalResults="300"
    pageSize="20"
    display="icon-only"
    visiblePages="5"
  ></cre8-pagination>`);
            return expect(el).toBeAccessible();
        });
    });
});
