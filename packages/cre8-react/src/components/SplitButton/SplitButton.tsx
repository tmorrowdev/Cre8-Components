import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8SplitButton as Cre8SplitButtonElement } from '@tmorrow/cre8-wc/lib/components/split-button/split-button';

export const Cre8SplitButton = createComponent({
    react: React,
    tagName: 'Cre8-split-button',
    elementClass: Cre8SplitButtonElement,

});
