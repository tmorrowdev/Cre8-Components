import { createComponent } from '@lit/react';
import { Cre8CalendarYearModal as Cre8CalendarYearModalElement } from '@tmorrow/cre8-wc/lib/components/date-picker/calendar-year-modal/calendar-year-modal';
import React from 'react';

export interface Cre8CalendarYearModalProps {
  currentYear?: number;
  onChangeYear?: (event: CustomEvent) => void;
}

/**
 * Cre8CalendarYearModal component
 */
export const Cre8CalendarYearModal = createComponent({
  react: React,
  tagName: 'cre8-calendar-year-modal',
  elementClass: Cre8CalendarYearModalElement,
  events: {
    onChangeYear: 'changeYear'
  }
});

export default Cre8CalendarYearModal;
