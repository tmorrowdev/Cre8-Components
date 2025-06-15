import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8DangerButton as Cre8DangerButtonElement } from '@cre8_dev/cre8-wc/lib/components/danger-button/danger-button';

export const Cre8DangerButton = createComponent({
    react: React,
    tagName: 'cre8-danger-button',
    elementClass: Cre8DangerButtonElement,

});
