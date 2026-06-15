import { createComponent } from '@lit/react';
import { Cre8Alert as Cre8AlertElement } from '@tmorrow/cre8-wc/lib/components/alert/alert';
import React from 'react';

export interface Cre8AlertProps {
  /** The alert type. */
  status?: any;
  /** The alert variant. */
  variant?: any;
  /** The alert emphasis. `strong` uses a filled background; pair contained buttons/links with their `inverted` prop. */
  emphasis?: any;
  /** Overrides the default status icon. Accepts a cre8 icon name. */
  iconAlert?: string;
  /** Icon title used for the icon alt text */
  iconTitle?: string | undefined;
  /** The alert heading text. */
  headerText?: string;
  /** Text content for the call-to-action area. Superseded by the `cta` slot when provided. */
  ctaBody?: string;
  /** Dismissed property 1) State that changes to true and is removed when the banner is dismissed */
  dismissed?: boolean | undefined;
  /** Dismissable property 1) Adds the ability to close when toggled to true */
  notDismissible?: boolean | undefined;
  children?: React.ReactNode;
}

/**
 * The general purpose of an alert or notification is to draw the user’s attention
 */
export const Cre8Alert = createComponent({
  react: React,
  tagName: 'cre8-alert',
  elementClass: Cre8AlertElement,

});

export default Cre8Alert;
