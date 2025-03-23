import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8CheckboxField as cre8CheckboxFieldElement } from '@cre8/cre8-wc/lib/components/checkbox-field/checkbox-field';

export const cre8CheckboxField = createComponent({
    react: React,
    tagName: 'cre8-checkbox-field',
    elementClass: cre8CheckboxFieldElement,

});
