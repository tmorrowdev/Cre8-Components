import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8DangerButton as cre8DangerButtonElement } from '@cre8/cre8-wc/lib/components/danger-button/danger-button';

export const cre8DangerButton = createComponent({
    react: React,
    tagName: 'cre8-danger-button',
    elementClass: cre8DangerButtonElement,

});
