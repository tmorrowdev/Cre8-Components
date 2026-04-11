import { createComponent } from '@lit/react';
import { Cre8ProgressMeter as Cre8ProgressMeterElement } from '@tmorrow/cre8-wc/lib/components/progress-meter/progress-meter';
import React from 'react';

export interface Cre8ProgressMeterProps {
  /** Progress Status - **Default** renders a meter with default status fill - **Error** renders a meter with an error status fill - **Warning** renders a meter with a warning status - **Success** renders a meter with a success status fill */
  status?: any;
  /** Progress Meter FieldId */
  fieldId?: string | undefined;
  /** Progress Meter name */
  name?: string | undefined;
  /** Progress Meter label */
  label?: string;
  knockout?: boolean | undefined;
  max?: number;
  value?: number;
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
