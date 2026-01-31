import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8DangerButton as Cre8DangerButtonElement } from '@tmorrow/cre8-wc/lib/components/danger-button/danger-button';

export const Cre8DangerButton = createComponent({
    react: React,
    tagName: 'Cre8-danger-button',
    elementClass: Cre8DangerButtonElement,

});
