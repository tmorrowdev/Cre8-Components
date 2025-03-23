import { createComponent } from '@lit-labs/react';
import { cre8Badge as cre8BadgeElement } from '@cre8/cre8-wc/lib/components/badge/badge';
import React from 'react';

/**
 * Status badges are used most often in tables or fat rows in a list. These components serve a contextual purpose and don't provide any functionality.
 * Badges should be organized inside a dedicated table row communicating status such as pending, approved or rejected.
 *
 */

export const cre8Badge = createComponent({
    react: React,
    tagName: 'cre8-badge',
    elementClass: cre8BadgeElement,
});
