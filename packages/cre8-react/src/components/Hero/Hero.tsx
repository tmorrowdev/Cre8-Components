import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Hero as cre8HeroElement } from '@cre8/cre8-wc/lib/components/hero/hero';

export const cre8Hero = createComponent({
    react: React,
    tagName: 'cre8-hero',
    elementClass: cre8HeroElement,

});
