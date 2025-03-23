import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../tag';
import { cre8Tag } from '../tag';
import { cre8TagList } from '../../tag-list/tag-list';

describe('<cre8-tag>', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8Tag>(html`<cre8-tag></cre8-tag>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with disabled', async () => {
        const el = await fixture<cre8Tag>(html`<cre8-tag ?isDisabled="${true}"></cre8-tag>`);
        const tag = el.shadowRoot!.querySelector('.cre8-c-tag'); // Test for the class change
        expect(tag.classList.contains('cre8-c-tag--disabled')).toBeTruthy();
    });

    test('should handle keydown ArrowDown', async () => {
        const el = await fixture<cre8TagList>(html`<cre8-tag-list label="Legend">
            <cre8-tag text="1"></cre8-tag>
            <cre8-tag text="2"></cre8-tag>
            <cre8-tag text="3"></cre8-tag>
        </cre8-tag-list>`);
        await el.updateComplete;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);

        const topItem: cre8Tag = el.querySelector<cre8Tag>('[text="1"]');

        topItem.handleRadioKeyDown(mockKeydownEvent);
        expect(topItem.isSelected).toBeFalsy();
    });

    test('should handle keydown ArrowUp', async () => {
        const el = await fixture<cre8TagList>(html`<cre8-tag-list label="Legend">
            <cre8-tag text="1"></cre8-tag>
            <cre8-tag text="2"></cre8-tag>
            <cre8-tag text="3"></cre8-tag>
        </cre8-tag-list>`);
        await el.updateComplete;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);

        const topItem: cre8Tag = el.querySelector<cre8Tag>('[text="1"]');
        const middleItem: cre8Tag = el.querySelector<cre8Tag>('[text="2"]');

        middleItem.handleRadioKeyDown(mockKeydownEvent);
        expect(topItem.isSelected).toBeTruthy();
    });

    test('should not tab to unchecked radio buttons', async () => {
        const el = await fixture<cre8TagList>(html`<cre8-tag-list label="Legend">
            <cre8-tag text="1"></cre8-tag>
            <cre8-tag text="2"></cre8-tag>
            <cre8-tag text="3"></cre8-tag>
        </cre8-tag-list>`);
        await el.updateComplete;

        const mockKeydownEvent = new KeyboardEvent('keydown', { code: 'Tab' });
        jest.spyOn(mockKeydownEvent, 'composedPath').mockReturnValue([]);

        const topItem: cre8Tag = el.querySelector<cre8Tag>('[text="1"]');
        const middleItem: cre8Tag = el.querySelector<cre8Tag>('[text="2"]');
        const bottomItem: cre8Tag = el.querySelector<cre8Tag>('[text="2"]');
        const middleFocusSpy = jest.spyOn(middleItem, 'focus');
        const bottomFocusSpy = jest.spyOn(bottomItem, 'focus');

        topItem.handleRadioKeyDown(mockKeydownEvent);
        await el.updateComplete;

        await new Promise<void>((res) => setTimeout(() => {
            expect(middleFocusSpy).toHaveBeenCalledTimes(0);
            expect(bottomFocusSpy).toHaveBeenCalledTimes(0);
            res();
        }, 200));
    });

    test('form reset', async () => {
        const el = await fixture<cre8Tag>(html` <cre8-tag text="Label"></cre8-tag> `);

        el.isSelected = true;
        el.formResetCallback();
        expect(el.isSelected).toBeFalsy();
    });

    describe('accessibility - Tag', () => {
        test('should accessible with default values', async () => {
            const el = await fixture<cre8Tag>(html`<cre8-tag text="Label" type="radio"></cre8-tag>`);
            return expect(el).toBeAccessible();
        });

        test('verify accessibility for disable radio', async () => {
            const el = await fixture<cre8Tag>(html`<cre8-tag text="Label" ?isDisabled="${true}" type="radio"></cre8-tag>`);
            return expect(el).toBeAccessible();
        });
    });
});
