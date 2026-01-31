import { createComponent } from '@lit/react';
import { Cre8DatePicker as Cre8DatePickerElement } from '@tmorrow/cre8-wc/lib/components/date-picker/date-picker';
import React from 'react';

export interface Cre8DatePickerProps {
  /** Quick Shortcuts Variant */
  hasShortcuts?: boolean;
  /** Autocomplete attribute that allows input to expect certain types of information. Note: autocomplete is supported by most browsers, but the suggested 'completions' are also sourced from those browsers. Values come from past user stored data from past interactions in that browser, such as:   1. From past values entered by the user, but they may also come from pre-configured values. For  instance, a browser might let the user save their name, address, phone number, and email addresses for  autocomplete purposes.   2. Perhaps the browser offers the ability to save encrypted credit card information, for autocompletion  following a an authentication procedure.  See: [MDN web docs_](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)   NOTE:: In order to provide autocompletion, user-agents might require input, select, textarea  elements to:   1. Have a {{name}} and/or {{id}} attribute  2. Be descendants of a form element  3. The form to have a [submit button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit) */
  autocomplete?: string;
  /** Pattern attribute defines a regular expression to validate against input */
  pattern?: string;
  /** The placeholder text that appears inside the input */
  placeholder?: string;
  /** The required label that appears above the input */
  label?: string;
  /** The name property on the input */
  name?: string;
  /** The unique id of the field <br/><br/> _*This property is dynamically set_ */
  fieldId?: string;
  /** The text that displays below in text field input */
  fieldNote?: string;
  /** Controls how the voiceover will experience the new information when field note changes, immediately (used for more urgently needed updates) using `assertive` or at the next convenient pause in their navigation using `polite`. */
  ariaLive?: "polite" | "assertive";
  /** Used to connect the field note in text field to the text menu for accessibility */
  ariaDescribedBy?: string;
  /** The required attribute on the input */
  required?: boolean;
  /** The disabled attribute on the input */
  disabled?: boolean;
  /** Changes the component's treatment to represent an error state */
  isError?: boolean;
  /** Visually hidden text that always signifies that this is an error for screen reader usage */
  errorText?: string;
  /** The error field note that appears below the default field note */
  errorNote?: string;
  /** The max attribute defines the maximum value that is acceptable and valid for the input containing the attribute. */
  max?: string | number;
  /** The min attribute defines the minimum value that is acceptable and valid for the input containing the attribute. */
  min?: string | number;
  /** The maxlength is an integer above 0 that indicates the maximum allowed characters to be entered. When using the maxlength prop, you must also use the "required" prop to provide Constraint Validation on the input field. This allows users to know why the input they attempted didn't render in the input field. see [MDN maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength#constraint_validation) */
  maxlength?: string;
  /** Additional aria-describedby connection to id for additional success and error notes to be accessible */
  validationAriaDescribedBy?: string;
  /** Changes the component's treatment to represent a success state */
  isSuccess?: boolean;
  /** Visually hidden text that always signifies that this is successful for screen reader usage */
  successText?: string;
  /** Readonly attribute */
  readonly?: boolean;
  /** The success field note that appears below the default field note */
  successNote?: string;
  /** The type of the form field. For Date Picker, this is always 'date'. */
  type?: string;
  /** The value of the form field. */
  value?: string;
}

/**
 * The Date Picker component renders a form group with label, control, help text and validation styling much
 */
export const Cre8DatePicker = createComponent({
  react: React,
  tagName: 'cre8-date-picker',
  elementClass: Cre8DatePickerElement,

});

export default Cre8DatePicker;
