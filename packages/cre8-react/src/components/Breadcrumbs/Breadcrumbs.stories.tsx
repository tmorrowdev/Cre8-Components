import type { StoryObj } from '@storybook/react';
import { cre8Breadcrumbs, cre8BreadcrumbsItem, cre8Link } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';

export default {
  title: 'cre8 Components/Breadcrumbs',
  component: cre8Breadcrumbs,
  subcomponents: { cre8BreadcrumbsItem },
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}|^rendercre8BreadcrumbsItems$|^navigateToByMobile$|^navigateToByMobile$|^emitPathChangedEvent$`)
    }
  },
};

export const Default: StoryObj<typeof cre8Breadcrumbs> = { args: {
  children: (
    <>
      <cre8BreadcrumbsItem> <cre8Link href="#">Grandparent</cre8Link></cre8BreadcrumbsItem>
      <cre8BreadcrumbsItem> <cre8Link href="#">Parent</cre8Link></cre8BreadcrumbsItem>
      <cre8BreadcrumbsItem>Current</cre8BreadcrumbsItem>
    </>
  )
} };
