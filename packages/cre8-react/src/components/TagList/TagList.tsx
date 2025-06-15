import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8TagList as Cre8TagListElement } from '@cre8_dev/cre8-wc/lib/components/tag-list/tag-list';

/**
 * Tag List must have children which are Tag components that are of type `checkbox` or `radio`.
 * The Tags must use the `neutral` variant and the `round` shape when they are inside a Tag List.
 * Tag List has a label that should be used to describe the purpose of the list.
 */
export const Cre8TagList = createComponent({
    react: React,
    tagName: 'cre8-tag-list',
    elementClass: Cre8TagListElement,
});
