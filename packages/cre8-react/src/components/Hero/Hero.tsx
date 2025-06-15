import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Hero as Cre8HeroElement } from '@cre8_dev/cre8-wc/lib/components/hero/hero';

export const Cre8Hero = createComponent({
    react: React,
    tagName: 'cre8-hero',
    elementClass: Cre8HeroElement,

});
