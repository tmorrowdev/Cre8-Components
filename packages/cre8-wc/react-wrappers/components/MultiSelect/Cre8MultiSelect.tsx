import { createComponent } from '@lit/react';
import { Cre8MultiSelect as Cre8MultiSelectElement } from '@tmorrow/cre8-wc/lib/components/multi-select/multi-select';
import React from 'react';

export interface Cre8MultiSelectProps {
  /** The list of string items the user can choose in the dropdown  Note: For passing props containing arrays and complex types, you should pass the props using a period in from of the prop like so: `.items="[]"` (this is only needed for Web Components and not the React version) */
  items?: string[];
  /** The list of string items that are initially in the selected list of tags Note: This list MUST be a subset of the array of items to function. i.e. if items=['cat', 'dog', 'bird'], preselectedItems=['cat'] is valid while preselectedItems=['cat', 'goat'] is not and will break the component.  Note: For passing props containing arrays and complex types, you should pass the props using a period in from of the prop like so: `.items="[]"` (this is only needed for Web Components and not the React version) */
  preselectedItems?: string[];
  /** The required label that appears above the multiselect */
  label?: string;
  /** The unique id of the select */
  fieldId?: string;
  /** Optional field note text can be added to provide additional field guidance. */
  fieldNote?: string;
  /** Used to connect the field note in text field to the text menu for accessibility */
  ariaDescribedBy?: string;
  /** Additional aria-describedby connection to id for additional success and error notes to be accessible */
  validationAriaDescribedBy?: string;
  /** The disabled attribute on the select */
  disabled?: boolean;
  /** Changes the component's treatment to represent an error state */
  isError?: boolean;
  /** The error field note that appears below the default field note */
  errorNote?: string;
  /** Changes the component's treatment to represent a success state */
  isSuccess?: boolean;
  /** The success field note that appears below the default field note */
  successNote?: string;
  onSelectedItemsChange?: (event: CustomEvent) => void;
}

/**
 * Multiselect is used when multiple options can be chosen from a static dropdown
 */
export const Cre8MultiSelect = createComponent({
  react: React,
  tagName: 'cre8-multi-select',
  elementClass: Cre8MultiSelectElement,
  events: {
    onSelectedItemsChange: 'selectedItemsChange'
  }
});

export default Cre8MultiSelect;
