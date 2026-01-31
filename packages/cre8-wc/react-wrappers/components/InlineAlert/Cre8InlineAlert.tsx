import { createComponent } from '@lit/react';
import { Cre8InlineAlert as Cre8InlineAlertElement } from '@tmorrow/cre8-wc/lib/components/inline-alert/inline-alert';
import React from 'react';

export interface Cre8InlineAlertProps {
  /** DEPRECATED: Icon name used for the icon before to the field note */
  iconName?: string | undefined;
  /** Full width Inline Alert */
  fullWidth?: boolean;
  /** Icon title used for the icon alt text */
  iconTitle?: string | undefined;
  /** Variant - **subtle** (default) renders an alert message in a padded container with a with a border and background color - **transparent** renders an alert message with no padded container, border, or background color */
  variant?: "subtle" | "transparent";
  /** Status - **default** renders an inline alert with the brand colors - **error** renders an inline alert with an error state - **warning** renders an inline alert with a warning state - **success** renders an inline alert with a success state - **attention** renders an inline alert with an attention state - **neutral** renders an inline alert with a nuetral state */
  status?: "error" | "info" | "neutral" | "warning" | "success" | "attention" | "help" | undefined;
  children?: React.ReactNode;
}

/**
 * In cases when it is necessary to alert the user but a less strong message that cannot be dismissed is desired,
 */
export const Cre8InlineAlert = createComponent({
  react: React,
  tagName: 'cre8-inline-alert',
  elementClass: Cre8InlineAlertElement,

});

export default Cre8InlineAlert;
