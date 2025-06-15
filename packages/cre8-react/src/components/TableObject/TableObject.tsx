import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8TableObject as Cre8TableObjectElement } from '@cre8_dev/cre8-wc/lib/components/table-object/table-object';

export const Cre8TableObject = createComponent({
    react: React,
    tagName: 'cre8-table-object',
    elementClass: Cre8TableObjectElement,

});
