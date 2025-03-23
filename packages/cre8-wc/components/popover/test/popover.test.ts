import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../popover';
import { cre8Popover } from '../popover';
import '../../button/button';
import { cre8Button } from '../../button/button';

describe('popover', () => {
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
        const el = await fixture(html`
      <cre8-popover isActive>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has a heading property', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover heading="Foo">
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        el.isActive = true;
        await el.updateComplete;
        const heading = el.shadowRoot.querySelector('.cre8-c-popover__heading');
        expect(heading.textContent).toBe('Foo');
    });

    test('has the correct class names with position', async () => {
        const positions = ['top', 'left', 'right'];

        for (const position of positions) {
            const el = await fixture<cre8Popover>(html`
        <cre8-popover position="${position}">
          <button slot="trigger">Popover Trigger</button>
          <div>Popover Content</div>
        </cre8-popover>
      `);
            await el.updateComplete;
            const popover = el.shadowRoot!.querySelector('.cre8-c-popover');
            expect(popover.classList.contains(`cre8-c-popover--${position}`)).toBeTruthy();
        }
    });

    test('sets the isVisibleOnScroll property', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover isVisibleOnScroll>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        await el.updateComplete;
        expect(el.isVisibleOnScroll).toBeTruthy();
    });

    test('has the correct class names with dynamic', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover isDynamic>
        <cre8-button slot="trigger" text="Popover Trigger"></cre8-button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        await el.updateComplete;
        const popover = el.shadowRoot.querySelector('.cre8-c-popover');
        expect(popover.classList.contains('cre8-is-dynamic')).toBeTruthy();
    });

    test('has the correct class names with dynamic active', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover isActiveDynamic>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        await el.updateComplete;
        const popover = el.shadowRoot.querySelector('.cre8-c-popover');
        expect(popover.classList.contains('cre8-is-dynamic-active')).toBeTruthy();
    });

    test('has the correct class names with active', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover isActive>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        await el.updateComplete;
        const popover = el.shadowRoot.querySelector('.cre8-c-popover');
        expect(popover.classList.contains('cre8-is-active')).toBeTruthy();
    });

    test('renders the popover panel when isActive is true', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover isActive>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);

        await el.updateComplete;
        const popoverPanel = el.shadowRoot.querySelector('.cre8-c-popover__panel');
        expect(popoverPanel).toBeDefined;
    });

    test('sets the aria-expanded attribute on the trigger when isActive is true', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover isActive>
        <cre8-button slot="trigger">Popover Trigger</cre8-button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        await el.updateComplete;
        const trigger = el.querySelector<cre8Button>('[slot="trigger"]');
        expect(trigger.buttonAriaExpanded).toBeTruthy();
    });

    test('sets the aria-expanded attribute on the trigger when isActive is false', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <cre8-button slot="trigger">Popover Trigger</cre8-button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        await el.updateComplete;
        const trigger = el.querySelector<cre8Button>('[slot="trigger"]');
        expect(trigger.buttonAriaExpanded).toBeFalsy();
    });

    test('should remove active on scroll', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);

    // Set the necessary properties to activate the popover
        el.isActive = true;
        el.isVisibleOnScroll = false;

    // Create a dummy element to mock _cre8PopoverPanel
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8PopoverPanel', 'get').mockReturnValue(dummyPanel);

    // Mock the bounding client rect of the popover panel
        jest.spyOn(dummyPanel, 'getBoundingClientRect').mockReturnValue({
            height: 200, // Less than window.innerHeight
            top: 0,
        } as DOMRect);

        el.removeActiveOnScroll();
        expect(el.isActive).toBeFalsy();
    });

    test('should remove active', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover isActive>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        await el.updateComplete;
        el.removeActive();
        expect(el.isActive).toBeFalsy();
    });

    test('should set position to "right" if popover panel breaks out the left side of the window', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);

    // Set necessary properties and elements for testing
        el.isDynamic = true;
        el.position = 'left';
        const bodyWidth = 1000;
        const popoverPanelWidth = 200;

    // Mock the bounding client rect of the body
        jest.spyOn(document.querySelector('body'), 'getBoundingClientRect').mockReturnValue({
            width: bodyWidth,
        } as DOMRect);

    // Create a dummy element to mock _cre8PopoverPanel
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8PopoverPanel', 'get').mockReturnValue(dummyPanel);

    // Mock the bounding client rect of the popover panel
        jest.spyOn(dummyPanel, 'getBoundingClientRect').mockReturnValue({
            left: -popoverPanelWidth,
            right: 0,
        } as DOMRect);

        el.dynamicPosition();
        expect(el.position).toBe('right');

    // Check that rtl positions properly
        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'rtl',
        });
        el.dynamicPosition();
        await el.updateComplete;
        expect(el.position).toBe('left');
    });

    test('should set position to "left" if popover panel breaks out the right side of the window', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);

    // Set necessary properties and elements for testing
        el.isDynamic = true;
        el.position = 'right';
        const bodyWidth = 1000;
        const popoverPanelWidth = 200;

    // Mock the bounding client rect of the body
        jest.spyOn(document.querySelector('body'), 'getBoundingClientRect').mockReturnValue({
            width: bodyWidth,
        } as DOMRect);

    // Create a dummy element to mock _cre8PopoverPanel
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8PopoverPanel', 'get').mockReturnValue(dummyPanel);

    // Mock the bounding client rect of the popover panel
        jest.spyOn(dummyPanel, 'getBoundingClientRect').mockReturnValue({
            left: bodyWidth - 1,
            right: bodyWidth + popoverPanelWidth,
        } as DOMRect);

        el.dynamicPosition();
        expect(el.position).toBe('left');

    // Check that rtl positions properly
        Object.defineProperty(document, 'dir', {
            configurable: true,
            value: 'rtl',
        });
        el.dynamicPosition();
        await el.updateComplete;
        expect(el.position).toBe('right');
    });

    test('should set position to "top" if popover panel breaks out the bottom side of the window', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);

    // Set necessary properties and elements for testing
        el.isDynamic = true;
        el.position = null;
        const windowHeight = 800;
        const popoverPanelHeight = 400;
        const bodyWidth = 1000;

    // Mock the bounding client rect of the body
        jest.spyOn(document.querySelector('body'), 'getBoundingClientRect').mockReturnValue({
            width: bodyWidth,
        } as DOMRect);

    // Mock the window's innerHeight
        Object.defineProperty(window, 'innerHeight', { value: windowHeight });

    // Create a dummy element to mock _cre8PopoverPanel
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8PopoverPanel', 'get').mockReturnValue(dummyPanel);

    // Mock the element clientHeight
        Object.defineProperty(el, 'clientHeight', { value: 200 });

    // Mock the bounding client rect of the popover panel
        jest.spyOn(dummyPanel, 'getBoundingClientRect').mockReturnValue({
            top: windowHeight,
            bottom: windowHeight + popoverPanelHeight,
            left: 0,
            right: 100,
        } as DOMRect);

        el.dynamicPosition();
        expect(el.position).toBe('top');
    });

    test('should set position to "bottom" if popover panel breaks out the top side of the window', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);

    // Set necessary properties and elements for testing
        el.isDynamic = true;
        el.position = 'top';
        const windowHeight = 800;
        const popoverPanelHeight = 200;

    // Mock the window's innerHeight
        Object.defineProperty(window, 'innerHeight', { value: windowHeight });

    // Create a dummy element to mock _cre8PopoverPanel
        const dummyPanel = document.createElement('div');
        jest.spyOn(el, '_cre8PopoverPanel', 'get').mockReturnValue(dummyPanel);

    // Mock the bounding client rect of the popover panel
        jest.spyOn(dummyPanel, 'getBoundingClientRect').mockReturnValue({
            top: -popoverPanelHeight,
            left: 50,
            right: 100,
        } as DOMRect);

        el.dynamicPosition();
        expect(el.position).toBeNull();
    });

    test('should close the popover when clicked outside and the panel is active', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        el.isActive = false;
        await el.updateComplete;
        const mockShadowRoot = { host: document.createElement('div') };
        Object.defineProperty(el, 'shadowRoot', { value: mockShadowRoot });

        const mockClickEvent = new MouseEvent('click');
        jest.spyOn(mockClickEvent, 'composedPath').mockReturnValue([]);

        el.handleOnClickOutside(mockClickEvent);
        expect(el.isActive).toBeFalsy();
    });

    test('should not close the popover when clicked outside and the panel is not active', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        el.isActive = true;
        await el.updateComplete;
        const mockShadowRoot = { host: document.createElement('div') };
        Object.defineProperty(el, 'shadowRoot', { value: mockShadowRoot });

        const mockClickEvent = new MouseEvent('click');
        jest.spyOn(mockClickEvent, 'composedPath').mockReturnValue([]);

        el.handleOnClickOutside(mockClickEvent);
        expect(el.isActive).toBeFalsy();
    });

    test('should throw an error when shadowRoot host is not defined', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        el.isActive = true;
        Object.defineProperty(el, 'shadowRoot', { value: 'undefined' });
        await el.updateComplete;
        expect(() => {
            el.handleOnClickOutside(new MouseEvent('click'));
        }).toThrow('Could not determine panel context during click handler');
    });

    test('handles condition when shadowRoot.host is present', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        await el.updateComplete;
        expect(el.shadowRoot).toBeDefined;
        expect(el.shadowRoot.host).toBeDefined;
    });

    test('toggle the active state', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        await el.updateComplete;
        const button = el.querySelector('button');
        expect(el.isActive).toBeFalsy();
        button.click();
        expect(el.isActive).toBeTruthy();
        button.click();
        expect(el.isActive).toBeFalsy();
    });

    test('closes the popover panel when Escape key is pressed and isActive is true', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        await el.updateComplete;
        const tabDown = new KeyboardEvent('keydown', { key: 'Tab' });
        const returnDown = new KeyboardEvent('keydown', { key: 'Return' });
        const escapeDown = new KeyboardEvent('keydown', { key: 'Escape' });

        document.dispatchEvent(tabDown);
        document.dispatchEvent(returnDown);
        document.dispatchEvent(escapeDown);

        expect(el.isActive).toBeFalsy();
    });

    test('should set isActiveDynamic to true when either isActive and isDynamic is true', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div>Popover Content</div>
      </cre8-popover>
    `);
        el.isDynamic = true;
        await el.updateComplete;
        const button = el.querySelector('button');

        jest.useFakeTimers();
        button.click();
        jest.advanceTimersByTime(2000);
        expect(el.isActiveDynamic).toBeTruthy();

        jest.useFakeTimers();
        button.click();
        jest.advanceTimersByTime(2000);
        expect(el.isActiveDynamic).toBeFalsy();

        jest.useRealTimers();
    });

    test('has a slotted header and footer', async () => {
        const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div slot="header">Header</div>
        <div>Popover Content</div>
        <div slot="footer">Footer</div>
      </cre8-popover>
    `);
        el.isActive = true;
        await el.updateComplete;

        const header = el.shadowRoot.querySelector('[slot="header"]');
        expect(header).toBeDefined;

        const footer = el.shadowRoot.querySelector('[slot="footer"]');
        expect(footer).toBeDefined;
    });

    describe('accessibility -  Popover', () => {
        test('tests accessibility for default popover with slotted content', async () => {
            const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div slot="header">Header</div>
        <div>Popover Content</div>
        <div slot="footer">Footer</div>
      </cre8-popover>
    `);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for default popover with content action button', async () => {
            const el = await fixture<cre8Popover>(html`
      <cre8-popover>
        <button slot="trigger">Popover Trigger</button>
        <div slot="header">Header</div>
        <div>Popover Content </div>
        <button slot="footer">Action Button</button>
      </cre8-popover>
    `);
            return expect(el).toBeAccessible();
        });
    });
});
