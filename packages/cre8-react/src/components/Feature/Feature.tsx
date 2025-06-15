import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Feature as Cre8FeatureElement } from '@cre8_dev/cre8-wc/lib/components/feature/feature';

export const Cre8Feature = createComponent({
    react: React,
    tagName: 'cre8-feature',
    elementClass: Cre8FeatureElement,

});
