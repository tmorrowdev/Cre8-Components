import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Alert as Cre8AlertElement } from '@cre8_dev/cre8-wc/lib/components/alert/alert';

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

export const Cre8Alert = createComponent({
    react: React,
    tagName: 'Cre8-alert',
    elementClass: Cre8AlertElement,
});
