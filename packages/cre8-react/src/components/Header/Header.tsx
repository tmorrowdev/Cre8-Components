import { createComponent } from '@lit-labs/react';
import { cre8Header as cre8HeaderElement } from '@cre8/cre8-wc/lib/components/header/header';
import React from 'react';

export const cre8Header = createComponent({
    react: React,
    tagName: 'cre8-header',
    elementClass: cre8HeaderElement,
});
