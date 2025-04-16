import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8ButtonGroup as Cre8ButtonGroupElement } from '@cre8_dev/cre8-wc/lib/components/button-group/button-group';

export const Cre8ButtonGroup = createComponent({
    react: React,
    tagName: 'Cre8-button-group',
    elementClass: Cre8ButtonGroupElement,

});
