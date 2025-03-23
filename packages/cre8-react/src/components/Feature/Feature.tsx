import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Feature as cre8FeatureElement } from '@cre8/cre8-wc/lib/components/feature/feature';

export const cre8Feature = createComponent({
    react: React,
    tagName: 'cre8-feature',
    elementClass: cre8FeatureElement,

});
