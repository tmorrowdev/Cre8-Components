import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8ProgressSteps } from '../..';
import svgCheckCircle from '@cre8/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgError from '@cre8/cre8-icons/lib/icons/System/Filled/Error.svg?raw';
import svgFilledCircleTwo from '@cre8/cre8-icons/lib/icons/System/Filled/Circle Two.svg?raw';
import svgFilledCircleFive from '@cre8/cre8-icons/lib/icons/System/Filled/Circle Five.svg?raw';
import svgRegularCircleThree from '@cre8/cre8-icons/lib/icons/System/Regular/Circle Three.svg?raw';
import svgRegularCircleSix from '@cre8/cre8-icons/lib/icons/System/Regular/Circle Six.svg?raw';
import svgWarning from '@cre8/cre8-icons/lib/icons/System/Filled/Warning.svg?raw';

export default {
  title: 'In Development/ProgressSteps',
  component: cre8ProgressSteps,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const shortExample: StoryObj<typeof cre8ProgressSteps> = { args: {
  children: [
    <cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></cre8-progress-steps-item>,
    <cre8-progress-steps-item svg={svgFilledCircleTwo} message="Optional step message should be succinct" name="Step Two Name" state="current"></cre8-progress-steps-item>,
    <cre8-progress-steps-item svg={svgRegularCircleThree} message="Optional step message should be succinct" name="Step Three Name" state="incomplete"></cre8-progress-steps-item>
  ]} };

export const longExample: StoryObj<typeof cre8ProgressSteps> = { args: {
    children: [
      <cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></cre8-progress-steps-item>,
      <cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step Two Name" state="complete"></cre8-progress-steps-item>,
      <cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step Three Name" state="complete"></cre8-progress-steps-item>,
      <cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step Four Name" state="complete"></cre8-progress-steps-item>,
      <cre8-progress-steps-item svg={svgFilledCircleFive} message="Optional step message should be succinct" name="Step Five Name" state="current"></cre8-progress-steps-item>,
      <cre8-progress-steps-item svg={svgRegularCircleSix} message="Optional step message should be succinct" name="Step Six Name" state="incomplete"></cre8-progress-steps-item>
    ]} };

export const Error: StoryObj<typeof cre8ProgressSteps> = { args: {
    children: [
      <cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></cre8-progress-steps-item>,
      <cre8-progress-steps-item svg={svgError} message="Optional step message should be succinct" name="Step Two Name" state="error"></cre8-progress-steps-item>,
      <cre8-progress-steps-item svg={svgRegularCircleThree} message="Optional step message should be succinct" name="Step Three Name" state="incomplete"></cre8-progress-steps-item>
    ]} };

export const Warning: StoryObj<typeof cre8ProgressSteps> = { args: {
    children: [
      <cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></cre8-progress-steps-item>,
      <cre8-progress-steps-item svg={svgWarning} message="Optional step message should be succinct" name="Step Two Name" state="warning"></cre8-progress-steps-item>,
      <cre8-progress-steps-item svg={svgRegularCircleThree} message="Optional step message should be succinct" name="Step Three Name" state="incomplete"></cre8-progress-steps-item>
    ]} };
