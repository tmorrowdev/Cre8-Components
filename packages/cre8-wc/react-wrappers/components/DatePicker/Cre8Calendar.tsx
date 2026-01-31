import { createComponent } from '@lit/react';
import { Cre8Calendar as Cre8CalendarElement } from '@tmorrow/cre8-wc/lib/components/date-picker/calendar/calendar';
import React from 'react';

export interface Cre8CalendarProps {
  hasShortcuts?: boolean | undefined;
  activeModal?: any;
  fieldDate?: string;
  currentDate?: any;
  onOutsideClick?: (event: CustomEvent) => void;
  onDateSelect?: (event: CustomEvent) => void;
}

/**
 * Cre8Calendar component
 */
export const Cre8Calendar = createComponent({
  react: React,
  tagName: 'cre8-calendar',
  elementClass: Cre8CalendarElement,
  events: {
    onOutsideClick: 'outsideClick',
    onDateSelect: 'dateSelect'
  }
});

export default Cre8Calendar;
