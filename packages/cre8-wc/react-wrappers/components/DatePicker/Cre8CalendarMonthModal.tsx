import { createComponent } from '@lit/react';
import { Cre8CalendarMonthModal as Cre8CalendarMonthModalElement } from '@tmorrow/cre8-wc/lib/components/date-picker/calendar-month-modal/calendar-month-modal';
import React from 'react';

export interface Cre8CalendarMonthModalProps {
  currentMonth?: number;
  onChangeMonth?: (event: CustomEvent) => void;
}

/**
 * Cre8CalendarMonthModal component
 */
export const Cre8CalendarMonthModal = createComponent({
  react: React,
  tagName: 'cre8-calendar-month-modal',
  elementClass: Cre8CalendarMonthModalElement,
  events: {
    onChangeMonth: 'changeMonth'
  }
});

export default Cre8CalendarMonthModal;
