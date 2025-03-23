import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8TableObject as cre8TableObjectElement } from '@cre8/cre8-wc/lib/components/table-object/table-object';

export const cre8TableObject = createComponent({
    react: React,
    tagName: 'cre8-table-object',
    elementClass: cre8TableObjectElement,

});
