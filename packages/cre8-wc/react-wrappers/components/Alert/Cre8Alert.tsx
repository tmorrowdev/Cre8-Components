import { createComponent } from '@lit/react';
import { Cre8Alert as Cre8AlertElement } from '@tmorrow/cre8-wc/lib/components/alert/alert';
import React from 'react';

export interface Cre8AlertProps {
  /** The alert type. */
  status?: "error" | "info" | "notification" | "neutral" | "warning" | "success" | undefined;
  /** The alert variant. */
  variant?: "standalone" | "banner";
  emphasis?: "subtle" | "strong";
  iconAlert?: string;
  /** Icon title used for the icon alt text */
  iconTitle?: string | undefined;
  headerText?: string;
  ctaBody?: string;
  /** Dismissed property 1) State that changes to true and is removed when the banner is dismissed */
  dismissed?: boolean | undefined;
  /** Dismissable property 1) Adds the ability to close when toggled to true */
  notDismissible?: boolean | undefined;
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
