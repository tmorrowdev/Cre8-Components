import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8LinelengthContainer as cre8LinelengthContainerElement } from '@cre8/cre8-wc/lib/components/linelength-container/linelength-container';

export const cre8LinelengthContainer = createComponent({
    react: React,
    tagName: 'cre8-linelength-container',
    elementClass: cre8LinelengthContainerElement,

});
