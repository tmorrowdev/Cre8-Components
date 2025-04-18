import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8ProgressSteps } from '../..';
import svgCheckCircle from '@Cre8/Cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgError from '@Cre8/Cre8-icons/lib/icons/System/Filled/Error.svg?raw';
import svgFilledCircleTwo from '@Cre8/Cre8-icons/lib/icons/System/Filled/Circle Two.svg?raw';
import svgFilledCircleFive from '@Cre8/Cre8-icons/lib/icons/System/Filled/Circle Five.svg?raw';
import svgRegularCircleThree from '@Cre8/Cre8-icons/lib/icons/System/Regular/Circle Three.svg?raw';
import svgRegularCircleSix from '@Cre8/Cre8-icons/lib/icons/System/Regular/Circle Six.svg?raw';
import svgWarning from '@Cre8/Cre8-icons/lib/icons/System/Filled/Warning.svg?raw';

export default {
  title: 'In Development/ProgressSteps',
  component: Cre8ProgressSteps,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const shortExample: StoryObj<typeof Cre8ProgressSteps> = { args: {
  children: [
    <Cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></Cre8-progress-steps-item>,
    <Cre8-progress-steps-item svg={svgFilledCircleTwo} message="Optional step message should be succinct" name="Step Two Name" state="current"></Cre8-progress-steps-item>,
    <Cre8-progress-steps-item svg={svgRegularCircleThree} message="Optional step message should be succinct" name="Step Three Name" state="incomplete"></Cre8-progress-steps-item>
  ]} };

export const longExample: StoryObj<typeof Cre8ProgressSteps> = { args: {
    children: [
      <Cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></Cre8-progress-steps-item>,
      <Cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step Two Name" state="complete"></Cre8-progress-steps-item>,
      <Cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step Three Name" state="complete"></Cre8-progress-steps-item>,
      <Cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step Four Name" state="complete"></Cre8-progress-steps-item>,
      <Cre8-progress-steps-item svg={svgFilledCircleFive} message="Optional step message should be succinct" name="Step Five Name" state="current"></Cre8-progress-steps-item>,
      <Cre8-progress-steps-item svg={svgRegularCircleSix} message="Optional step message should be succinct" name="Step Six Name" state="incomplete"></Cre8-progress-steps-item>
    ]} };

export const Error: StoryObj<typeof Cre8ProgressSteps> = { args: {
    children: [
      <Cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></Cre8-progress-steps-item>,
      <Cre8-progress-steps-item svg={svgError} message="Optional step message should be succinct" name="Step Two Name" state="error"></Cre8-progress-steps-item>,
      <Cre8-progress-steps-item svg={svgRegularCircleThree} message="Optional step message should be succinct" name="Step Three Name" state="incomplete"></Cre8-progress-steps-item>
    ]} };

export const Warning: StoryObj<typeof Cre8ProgressSteps> = { args: {
    children: [
      <Cre8-progress-steps-item svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></Cre8-progress-steps-item>,
      <Cre8-progress-steps-item svg={svgWarning} message="Optional step message should be succinct" name="Step Two Name" state="warning"></Cre8-progress-steps-item>,
      <Cre8-progress-steps-item svg={svgRegularCircleThree} message="Optional step message should be succinct" name="Step Three Name" state="incomplete"></Cre8-progress-steps-item>
    ]} };
