import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../select-tile';
import { cre8SelectTile } from '../select-tile';
import { cre8SelectTileList } from '../../select-tile-list/select-tile-list';


describe('select-tile', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8SelectTile>(html`<cre8-select-tile></cre8-select-tile>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('renders footer and header', async () => {
        const el = await fixture<cre8SelectTile>(html`<cre8-select-tile>
      <h2 slot="header">Header</h2>
      <p>Body</p>
      <span slot="title">Title</span>
      <span slot="body">Body</span>
      <p slot="footer">Footer</p>
    </cre8-select-tile>`);
        const header: HTMLElement = el.shadowRoot.querySelector('.cre8-c-select-tile__header');
        const footer: HTMLElement = el.shadowRoot.querySelector('.cre8-c-select-tile__footer');
        expect(header).toBeTruthy();
        expect(footer).toBeTruthy();
        expect(el.shadowRoot.querySelector('.cre8-c-select-tile__body_title')).toBeTruthy();
        expect(el.shadowRoot.querySelector('.cre8-c-select-tile__body_body')).toBeTruthy();
    });

    test('has the correct class names with variant', async () => {
        const variants = ['bare', 'horizontal', 'horizontal-bare'];

        for (const variant of variants) {
            const el = await fixture<cre8SelectTile>(html`<cre8-select-tile variant="${variant}"></cre8-select-tile>`);
            const card = el.shadowRoot!.querySelector('.cre8-c-select-tile'); // Test for the class change
            expect(card.classList.contains(`cre8-c-select-tile--${variant}`)).toBeTruthy();
        }
    });

    test('has the correct class names with center alignment', async () => {
        const el = await fixture<cre8SelectTile>(html`<cre8-select-tile align="center"></cre8-select-tile>`);
        const card = el.shadowRoot!.querySelector('.cre8-c-select-tile'); // Test for the class change
        expect(card.classList.contains('cre8-c-select-tile--align-center')).toBeTruthy();
    });

    test('has the correct class names with error', async () => {
        const el = await fixture<cre8SelectTile>(html`<cre8-select-tile ?isError="${true}"></cre8-select-tile>`);
        const radioFieldItem = el.shadowRoot!.querySelector('.cre8-c-select-tile'); // Test for the class change
        expect(radioFieldItem.classList.contains('cre8-c-select-tile--error')).toBeTruthy();
    });

    test('has the correct class names with success', async () => {
        const el = await fixture<cre8SelectTile>(html`<cre8-select-tile ?isSuccess="${true}"></cre8-select-tile>`);
        const radioFieldItem = el.shadowRoot!.querySelector('.cre8-c-select-tile'); // Test for the class change
        expect(radioFieldItem.classList.contains('cre8-c-select-tile--success')).toBeTruthy();
    });

    test('has the correct class names with disabled', async () => {
        const el = await fixture<cre8SelectTile>(html`<cre8-select-tile ?disabled="${true}"></cre8-select-tile>`);
        const radioFieldItem = el.shadowRoot!.querySelector('.cre8-c-select-tile'); // Test for the class change
        expect(radioFieldItem.classList.contains('cre8-c-select-tile--disabled')).toBeTruthy();
    });

    test('has the correct aria with disabled', async () => {
        const el = await fixture<cre8SelectTile>(html`<cre8-select-tile ?disabled="${true}"></cre8-select-tile>`);
        expect(el.internals.ariaDisabled).toBe('true');
        el.disabled = false;
        await el.updateComplete;
        expect(el.internals.ariaDisabled).toBe('false');
    });

    test('should handle keydown ArrowDown', async () => {
        const el = await fixture<cre8SelectTileList>(html`<cre8-select-tile-list label="Legend">
      <cre8-select-tile name="foo" value="1">1</cre8-select-tile>
      <cre8-select-tile name="foo" value="2">2</cre8-select-tile>
      <cre8-select-tile name="foo" value="3">3</cre8-select-tile>
    </cre8-select-tile-list>`);
        await el.updateComplete;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);

        const topItem: cre8SelectTile = el.querySelector<cre8SelectTile>('[value="1"]');
        const middleItem: cre8SelectTile = el.querySelector<cre8SelectTile>('[value="2"]');

        topItem.dispatchEvent(mockKeydownEvent);
        expect(topItem.checked).toBeFalsy();
        expect(document.activeElement).toBe(middleItem);
    });

    test('should handle keydown ArrowUp', async () => {
        const el = await fixture<cre8SelectTileList>(html`<cre8-select-tile-list label="Legend">
      <cre8-select-tile name="foo" value="1">1</cre8-select-tile>
      <cre8-select-tile name="foo" value="2">2</cre8-select-tile>
      <cre8-select-tile name="foo" value="3">3</cre8-select-tile>
    </cre8-select-tile-list>`);
        await el.updateComplete;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);

        const topItem: cre8SelectTile = el.querySelector<cre8SelectTile>('[value="1"]');
        const middleItem: cre8SelectTile = el.querySelector<cre8SelectTile>('[value="2"]');

        middleItem.dispatchEvent(mockKeydownEvent);

        expect(topItem.checked).toBeTruthy();
        expect(document.activeElement).toBe(topItem);
    });


    test('should handle keydown ArrowDown pressed multiple times', async () => {
        const el = await fixture<cre8SelectTileList>(html`<cre8-select-tile-list label="Legend">
      <cre8-select-tile name="foo" value="1">1</cre8-select-tile>
      <cre8-select-tile name="foo" value="2">2</cre8-select-tile>
      <cre8-select-tile name="foo" value="3">3</cre8-select-tile>
    </cre8-select-tile-list>`);
        await el.updateComplete;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);

        const topItem: cre8SelectTile = el.querySelector<cre8SelectTile>('[value="1"]');
        const middleItem: cre8SelectTile = el.querySelector<cre8SelectTile>('[value="2"]');
        const bottomItem: cre8SelectTile = el.querySelector<cre8SelectTile>('[value="3"]');


        topItem.focus();
        expect(bottomItem.checked).toBeFalsy();


        for (let i = 0; i < 5; i += 1) {
            document.activeElement.dispatchEvent(mockKeydownEvent);
        }
        expect(topItem.checked).toBeFalsy();
        expect(middleItem.checked).toBeFalsy();
        expect(bottomItem.checked).toBeTruthy();
        expect(document.activeElement).toBe(bottomItem);
    });

    test('should handle keydown ArrowUp pressed multiple times', async () => {
        const el = await fixture<cre8SelectTileList>(html`<cre8-select-tile-list label="Legend">
      <cre8-select-tile name="foo" value="1">1</cre8-select-tile>
      <cre8-select-tile name="foo" value="2">2</cre8-select-tile>
      <cre8-select-tile name="foo" value="3">3</cre8-select-tile>
    </cre8-select-tile-list>`);
        await el.updateComplete;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);

        const topItem: cre8SelectTile = el.querySelector<cre8SelectTile>('[value="1"]');
        const middleItem: cre8SelectTile = el.querySelector<cre8SelectTile>('[value="2"]');
        const bottomItem: cre8SelectTile = el.querySelector<cre8SelectTile>('[value="3"]');


        topItem.focus();
        expect(middleItem.checked).toBeFalsy();
        expect(bottomItem.checked).toBeFalsy();

        for (let i = 0; i < 5; i += 1) {
            document.activeElement.dispatchEvent(mockKeydownEvent);
        }

        expect(topItem.checked).toBeFalsy();
        expect(middleItem.checked).toBeTruthy();
        expect(bottomItem.checked).toBeFalsy();
        expect(document.activeElement).toBe(middleItem);
    });

    test('form reset', async () => {
        const el = await fixture<HTMLFormElement>(html`<cre8-select-tile name="test1" value="1"></cre8-select-tile>`);

        el.checked = true;
        expect(el.checked).toBeTruthy();

        el.formResetCallback();
        await el.updateComplete;

        expect(el.checked).toBeFalsy();
    });

    test('clicking radio Select Tile', async () => {
        const el = await fixture<HTMLFormElement>(html`<cre8-select-tile name="test1" value="1"></cre8-select-tile>`);

        expect(el.checked).toBeFalsy();

    // clicking checks it
        el.dispatchEvent(new Event('click'));
        await el.updateComplete;

        expect(el.checked).toBeTruthy();

    // clicking again keeps it checked
        el.dispatchEvent(new Event('click'));
        await el.updateComplete;

        expect(el.checked).toBeTruthy();
    });

    test('Enter radio Select Tile', async () => {
        const el = await fixture<HTMLFormElement>(html`<cre8-select-tile name="test1" value="1"></cre8-select-tile>`);

        expect(el.checked).toBeFalsy();

    // Enter checks it
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await el.updateComplete;

        expect(el.checked).toBeTruthy();

    // Enter again keeps it checked
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await el.updateComplete;

        expect(el.checked).toBeTruthy();
    });

    test('Space radio Select Tile', async () => {
        const el = await fixture<HTMLFormElement>(html`<cre8-select-tile name="test1" value="1"></cre8-select-tile>`);

        expect(el.checked).toBeFalsy();

    // Space checks it
        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        await el.updateComplete;

        expect(el.checked).toBeTruthy();

    // Space again keeps it checked
        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        await el.updateComplete;

        expect(el.checked).toBeTruthy();
    });

    test('Arrow keys on lonely radio select tile', async () => {
        const el = await fixture<HTMLFormElement>(html`<cre8-select-tile name="test1" value="1"></cre8-select-tile>`);

        expect(el.checked).toBeFalsy();
        el.focus();

        for (let i = 0; i < 3; i += 1) {
            el.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
            expect(document.activeElement).toBe(el);
        }

        for (let i = 0; i < 3; i += 1) {
            el.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
            expect(document.activeElement).toBe(el);
        }
    });

    test('clicking nameless radio Select Tile does not uncheck anything', async () => {
        const div = await fixture<HTMLFormElement>(html`<div><cre8-select-tile ></cre8-select-tile><cre8-select-tile ></cre8-select-tile></div>`);
        const [st1, st2] = Array.from(div.querySelectorAll<cre8SelectTile>('cre8-select-tile'));

        expect(st1.checked).toBeFalsy();
        expect(st2.checked).toBeFalsy();

    // clicking checks them both
        st1.dispatchEvent(new Event('click'));
        st2.dispatchEvent(new Event('click'));
        await st1.updateComplete;
        await st2.updateComplete;

        expect(st1.checked).toBeTruthy();
        expect(st2.checked).toBeTruthy();

    // clicking again keeps them checked
        st1.dispatchEvent(new Event('click'));
        st2.dispatchEvent(new Event('click'));
        await st1.updateComplete;
        await st2.updateComplete;

        expect(st1.checked).toBeTruthy();
        expect(st2.checked).toBeTruthy();
    });


    test('clicking checkbox Select Tile', async () => {
        const el = await fixture<HTMLFormElement>(html`<cre8-select-tile type="checkbox" name="test1" value="1"></cre8-select-tile>`);

        expect(el.checked).toBeFalsy();

    // clicking checks it
        el.dispatchEvent(new Event('click'));
        await el.updateComplete;

        expect(el.checked).toBeTruthy();

    // clicking again unchecked it
        el.dispatchEvent(new Event('click'));
        await el.updateComplete;

        expect(el.checked).toBeFalsy();
    });

    test('Enter checkbox Select Tile', async () => {
        const el = await fixture<HTMLFormElement>(html`<cre8-select-tile type="checkbox" name="test1" value="1"></cre8-select-tile>`);

        expect(el.checked).toBeFalsy();

    // Enter checks it
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await el.updateComplete;

        expect(el.checked).toBeTruthy();

    // Enter again unchecks it
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await el.updateComplete;

        expect(el.checked).toBeFalsy();
    });

    test('Space checkbox Select Tile', async () => {
        const el = await fixture<HTMLFormElement>(html`<cre8-select-tile type="checkbox" name="test1" value="1"></cre8-select-tile>`);

        expect(el.checked).toBeFalsy();

    // Space checks it
        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        await el.updateComplete;

        expect(el.checked).toBeTruthy();

    // Space again unchckes it
        el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        await el.updateComplete;

        expect(el.checked).toBeFalsy();
    });
});
