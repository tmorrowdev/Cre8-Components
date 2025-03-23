import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../calendar';
import { CalendarModal, cre8Calendar } from '../calendar';
import '../../calendar-month-modal/calendar-month-modal';
import '../../calendar-year-modal/calendar-year-modal';
import '../../calendar-navigation/calendar-navigation';

describe('calendar', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8Calendar>(html`<cre8-calendar fieldDate="2024-05-21"></cre8-calendar>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('calendar update for input field change', async () => {
        const el = await fixture<cre8Calendar>(html` <cre8-calendar fieldDate="2024-01-01"></cre8-calendar>`);
        await el.updateComplete;
        el.fieldDate = '2024-06-06';
        await el.updateComplete;

        expect(el.currentDate).toEqual(new Date('2024-06-06T00:00'));
    });

    test('calendar click emits date value', async () => {
        const el = await fixture<cre8Calendar>(html` <cre8-calendar fieldDate="2024-01-01"></cre8-calendar>`);
        await el.updateComplete;

        const emitSpy = jest.spyOn(el, 'dispatchEvent');
        const emittedDate = new CustomEvent('dateSelect', { detail: { date: '2024-01-02' } });

        const JanSecondButton = el.shadowRoot!.querySelector('button[datetime="2024-01-02"]');
        JanSecondButton.dispatchEvent(new MouseEvent('click'));

        expect(emitSpy).toHaveBeenCalledWith(emittedDate);
    });

    test('calendar month change', async () => {
        const el = await fixture<cre8Calendar>(html` <cre8-calendar fieldDate="2024-01-01"></cre8-calendar>`);
        await el.updateComplete;

        const nextMonthButton = el.shadowRoot!.querySelector('cre8-calendar-navigation')
            .shadowRoot!.querySelector('cre8-button[text="Next month"]');
        nextMonthButton.dispatchEvent(new MouseEvent('click'));
        await el.updateComplete;

        expect(el.currentDate.getMonth()).toEqual(new Date('2024-02-01T00:00').getMonth());
    });

    test('calendar year change', async () => {
        const el = await fixture<cre8Calendar>(html` <cre8-calendar fieldDate="2024-01-01"></cre8-calendar>`);
        await el.updateComplete;

        const previousYearButton = el.shadowRoot!.querySelector('cre8-calendar-navigation')
            .shadowRoot!.querySelector('cre8-button[text="Previous year"]');
        previousYearButton.dispatchEvent(new MouseEvent('click'));
        await el.updateComplete;

        expect(el.currentDate.getFullYear()).toEqual(new Date('2023-01-01T00:00').getFullYear());
    });

    test('calendar month modal click', async () => {
        const el = await fixture<cre8Calendar>(html` <cre8-calendar fieldDate="2024-01-01"></cre8-calendar>`);
        el.activeModal = CalendarModal.Month;
        await el.updateComplete;

        const previousYearButton = el.shadowRoot!.querySelector('cre8-calendar-month-modal')
            .shadowRoot!.querySelector('cre8-button[text="May"]');
        previousYearButton.dispatchEvent(new MouseEvent('click'));
        await el.updateComplete;

        expect(el.currentDate.getMonth()).toEqual(new Date('2024-05-01T00:00').getMonth());
    });

    test('calendar year modal click', async () => {
        const el = await fixture<cre8Calendar>(html` <cre8-calendar fieldDate="2024-01-01"></cre8-calendar>`);
        el.activeModal = CalendarModal.Year;
        await el.updateComplete;

        const previousYearButton = el.shadowRoot!.querySelector('cre8-calendar-year-modal')
            .shadowRoot!.querySelector('cre8-button[text="2020"]');
        previousYearButton.dispatchEvent(new MouseEvent('click'));
        await el.updateComplete;

        expect(el.currentDate.getMonth()).toEqual(new Date('2020-01-01T00:00').getMonth());
    });

    describe('accessibility -  Calendar', () => {
        test('tests accessibility for date picker calendar', async () => {
            const el = await fixture<cre8Calendar>(html`<cre8-calendar fieldDate="2024-05-21"></cre8-calendar>`);
            return expect(el).toBeAccessible();
        });
    });
});
