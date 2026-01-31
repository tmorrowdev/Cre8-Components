import { createComponent } from '@lit/react';
import { Cre8SelectTile as Cre8SelectTileElement } from '@tmorrow/cre8-wc/lib/components/select-tile/select-tile';
import React from 'react';

export interface Cre8SelectTileProps {
  /** Style variants - **bare** renders a select-tile without a border and without padding around the content - **horizontal** renders a select-tile with header, body, footer oriented in a row rather than a column - **horizontal-bare** renders a select-tile with header, body, footer   oriented in a row rather than a column without a border and without padding around the content */
  variant?: "bare" | "horizontal" | "horizontal-bare" | undefined;
  /** Which breakpoint, if any, to switch to verticial. Only useful for horizontal variants. Defaults to 'sm'. */
  variantBreakToVertical?: "sm" | "lg" | "none" | "md" | "sm-2" | "xl" | "xxl";
  /** Where does the checkmark or radio button go? It disappears on 'none'. Only top-right is supported for vertical variants. */
  checkPosition?: "none" | "left" | "top-right" | "right";
  /** In radio mode, whether to use the circle with the dot, or the rounded check. */
  radioVariant?: "dot" | "check";
  /** Align variants <cre8-text-passage size="sm"> <ul> <li>**center** renders a select-tile that has center aligned content/text</li> </ul> </cre8-text-passage> */
  align?: "center" | undefined;
  /** Error State */
  isError?: boolean | undefined;
  /** Disabled State */
  disabled?: boolean | undefined;
  /** Required attribute */
  required?: boolean | undefined;
  /** Checked State. Note: the `checked` attribute sets the `defaultChecked` property, as well as sets the initial value for the `checked` property. */
  checked?: boolean | undefined;
  /** Select Tile FieldId */
  fieldId?: string | undefined;
  /** Name of the form control. */
  name?: string | undefined;
  /** Radio item fieldnote isSuccess */
  isSuccess?: boolean | undefined;
  /** Should this Select Tile behave as a radio button or a checkbox? */
  type?: "checkbox" | "radio";
  /** The value of the form field. */
  value?: string;
  children?: React.ReactNode;
  onChange?: (event: CustomEvent) => void;
  onInput?: (event: CustomEvent) => void;
}

/**
 * The Select Tile component is a short block of content inside a visual
 */
export const Cre8SelectTile = createComponent({
  react: React,
  tagName: 'cre8-select-tile',
  elementClass: Cre8SelectTileElement,
  events: {
    onChange: 'change',
    onInput: 'input'
  }
});

export default Cre8SelectTile;
