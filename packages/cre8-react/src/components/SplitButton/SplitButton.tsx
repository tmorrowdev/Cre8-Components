import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8SplitButton as cre8SplitButtonElement } from '@cre8/cre8-wc/lib/components/split-button/split-button';

export const cre8SplitButton = createComponent({
    react: React,
    tagName: 'cre8-split-button',
    elementClass: cre8SplitButtonElement,

});
