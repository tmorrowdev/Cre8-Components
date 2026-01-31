import { createComponent } from '@lit/react';
import { Cre8ProgressMeter as Cre8ProgressMeterElement } from '@tmorrow/cre8-wc/lib/components/progress-meter/progress-meter';
import React from 'react';

export interface Cre8ProgressMeterProps {
  /** Progress Status - **Default** renders a meter with default status fill - **Error** renders a meter with an error status fill - **Warning** renders a meter with a warning status - **Success** renders a meter with a success status fill */
  status?: any;
  /** Determines if the progress meter is displayed on a dark background (uses knockout colors for contrast) */
  knockout?: boolean;
  /** The max number for the progress bar (defaulted to 100 to match percentages) */
  max?: number;
  /** The the percentage of the bar that is filled in (defaulted to match percentages) I.E a value of 50 with a 100 max would result in half the meter being filled */
  value?: number;
  /** Progress Meter FieldId */
  fieldId?: string;
  /** Progress Meter name */
  name?: string;
  /** Progress Meter label */
  label?: string;
}

/**
 * A progress meter provides feedback that the system is working and gives
 */
export const Cre8ProgressMeter = createComponent({
  react: React,
  tagName: 'cre8-progress-meter',
  elementClass: Cre8ProgressMeterElement,

});

export default Cre8ProgressMeter;
