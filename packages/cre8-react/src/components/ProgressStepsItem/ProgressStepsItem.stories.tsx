import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8ProgressStepsItem } from '../..';
import svgCheckCircle from '@cre8/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgError from '@cre8/cre8-icons/lib/icons/System/Filled/Error.svg?raw';
import svgFilledCircleOne from '@cre8/cre8-icons/lib/icons/System/Filled/Circle One.svg?raw';
import svgRegularCircleOne from '@cre8/cre8-icons/lib/icons/System/Regular/Circle One.svg?raw';
import svgWarning from '@cre8/cre8-icons/lib/icons/System/Filled/Warning.svg?raw';

export default {
  title: 'In Development/ProgressStepsItem',
  component: cre8ProgressStepsItem,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Complete: StoryObj<typeof cre8ProgressStepsItem> = { args: {
    message: 'Optional step message should be succinct',
    name: 'Step Name',
    state: 'complete',
    svg: svgCheckCircle,
  } };

export const Current: StoryObj<typeof cre8ProgressStepsItem> = { args: {
    message: 'Optional step message should be succinct',
    name: 'Step Name',
    state: 'current',
    svg: svgFilledCircleOne,
  } };

export const Error: StoryObj<typeof cre8ProgressStepsItem> = { args: {
    message: 'Optional step message should be succinct',
    name: 'Step Name',
    state: 'error',
    svg: svgError,
  } };

export const Incomplete: StoryObj<typeof cre8ProgressStepsItem> = { args: {
    message: 'Optional step message should be succinct',
    name: 'Step Name',
    state: 'incomplete',
    svg: svgRegularCircleOne,
  } };

export const Warning: StoryObj<typeof cre8ProgressStepsItem> = { args: {
    message: 'Optional step message should be succinct',
    name: 'Step Name',
    state: 'warning',
    svg: svgWarning,
  } };
