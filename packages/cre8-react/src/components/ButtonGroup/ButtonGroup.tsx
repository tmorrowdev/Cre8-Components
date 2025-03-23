import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8ButtonGroup as cre8ButtonGroupElement } from '@cre8/cre8-wc/lib/components/button-group/button-group';

export const cre8ButtonGroup = createComponent({
    react: React,
    tagName: 'cre8-button-group',
    elementClass: cre8ButtonGroupElement,

});
