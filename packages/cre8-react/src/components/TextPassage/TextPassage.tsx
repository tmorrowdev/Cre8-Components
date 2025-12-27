import { createComponent } from '@lit/react';
import { Cre8TextPassage as Cre8TextPassageElement } from '@cre8_dev/cre8-wc';
import React from 'react';

export const Cre8TextPassage = createComponent({
    react: React,
    tagName: 'Cre8-text-passage',
    elementClass: Cre8TextPassageElement,
});
