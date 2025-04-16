import { createComponent } from '@lit/react';
import { Cre8Header as Cre8HeaderElement } from '@cre8_dev/cre8-wc/lib/components/header/header';
import React from 'react';

export const Cre8Header = createComponent({
    react: React,
    tagName: 'Cre8-header',
    elementClass: Cre8HeaderElement,
});
