import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Hero as Cre8HeroElement } from '@tmorrow/cre8-wc/lib/components/hero/hero';

export const Cre8Hero = createComponent({
    react: React,
    tagName: 'Cre8-hero',
    elementClass: Cre8HeroElement,

});
