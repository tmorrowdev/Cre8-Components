import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8CheckboxField as Cre8CheckboxFieldElement } from '@cre8_dev/cre8-wc/lib/components/checkbox-field/checkbox-field';

export const Cre8CheckboxField = createComponent({
    react: React,
    tagName: 'cre8-checkbox-field',
    elementClass: Cre8CheckboxFieldElement,

});
