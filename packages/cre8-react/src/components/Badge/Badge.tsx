import { createComponent } from '@lit/react';
import { Cre8Badge as Cre8BadgeElement } from '@cre8_dev/cre8-wc/lib/components/badge/badge';
import React from 'react';

/**
 * Status badges are used most often in tables or fat rows in a list. These components serve a contextual purpose and don't provide any functionality.
 * Badges should be organized inside a dedicated table row communicating status such as pending, approved or rejected.
 *
 */

export const Cre8Badge = createComponent({
    react: React,
    tagName: 'Cre8-badge',
    elementClass: Cre8BadgeElement,
});
