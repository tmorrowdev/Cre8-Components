import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Alert as cre8AlertElement } from '@cre8/cre8-wc/lib/components/alert/alert';

/**
 * The general purpose of an alert or notification is to draw the user’s attention
 * and provide the user with timely, relevant information.
 *
 * ## Alert Styles:
 * - There are 6 statuses for 6 types of alerts: 'error', 'info', 'notification', 'neutral', 'warning', 'success'.
 * Each alert will have different icon to be displayed in the alert.
 * - Users can select two types of alert variants: 'standalone', or 'banner'.
 * - User can also choose the alert should be emphasized or not. There are two options: subtle or strong.
 * - User can add button or link in the alert.
 * If users choose to emphasize the alert (**strong**), user needs to used **"inverted"** prop in button or link.
 * - User can choose whether the alert can be dismissed or not
 *
 */

export const cre8Alert = createComponent({
    react: React,
    tagName: 'cre8-alert',
    elementClass: cre8AlertElement,
});
