import { createComponent } from '@lit-labs/react';
import { cre8TextPassage as cre8TextPassageElement } from '@cre8/cre8-wc/lib/components/text-passage/text-passage';
import React from 'react';

export const cre8TextPassage = createComponent({
    react: React,
    tagName: 'cre8-text-passage',
    elementClass: cre8TextPassageElement,
});
