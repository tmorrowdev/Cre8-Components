import { createComponent } from '@lit/react';
import { Cre8CalendarNavigation as Cre8CalendarNavigationElement } from '@tmorrow/cre8-wc/lib/components/date-picker/calendar-navigation/calendar-navigation';
import React from 'react';

export interface Cre8CalendarNavigationProps {
  monthName?: string;
  year?: number;
  onActivateModal?: (event: CustomEvent) => void;
  onChangeMonth?: (event: CustomEvent) => void;
  onChangeYear?: (event: CustomEvent) => void;
}

/**
 * Cre8CalendarNavigation component
 */
export const Cre8CalendarNavigation = createComponent({
  react: React,
  tagName: 'cre8-calendar-navigation',
  elementClass: Cre8CalendarNavigationElement,
  events: {
    onActivateModal: 'activateModal',
    onChangeMonth: 'changeMonth',
    onChangeYear: 'changeYear'
  }
});

export default Cre8CalendarNavigation;
