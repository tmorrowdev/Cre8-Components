import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8ProgressSteps, Cre8ProgressStepsItem } from '../..';
import svgCheckCircle from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgError from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Error.svg?raw';
import svgFilledCircleTwo from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Circle_Two.svg?raw';
import svgFilledCircleFive from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Circle_Five.svg?raw';
import svgRegularCircleThree from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Circle_Three.svg?raw';
import svgRegularCircleSix from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Circle_Six.svg?raw';
import svgWarning from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Warning.svg?raw';

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
    <Cre8ProgressStepsItem svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></Cre8ProgressStepsItem>,
    <Cre8ProgressStepsItem svg={svgFilledCircleTwo} message="Optional step message should be succinct" name="Step Two Name" state="current"></Cre8ProgressStepsItem>,
    <Cre8ProgressStepsItem svg={svgRegularCircleThree} message="Optional step message should be succinct" name="Step Three Name" state="incomplete"></Cre8ProgressStepsItem>
  ]} };

export const longExample: StoryObj<typeof Cre8ProgressSteps> = { args: {
    children: [
      <Cre8ProgressStepsItem svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></Cre8ProgressStepsItem>,
      <Cre8ProgressStepsItem svg={svgCheckCircle} message="Optional step message should be succinct" name="Step Two Name" state="complete"></Cre8ProgressStepsItem>,
      <Cre8ProgressStepsItem svg={svgCheckCircle} message="Optional step message should be succinct" name="Step Three Name" state="complete"></Cre8ProgressStepsItem>,
      <Cre8ProgressStepsItem svg={svgCheckCircle} message="Optional step message should be succinct" name="Step Four Name" state="complete"></Cre8ProgressStepsItem>,
      <Cre8ProgressStepsItem svg={svgFilledCircleFive} message="Optional step message should be succinct" name="Step Five Name" state="current"></Cre8ProgressStepsItem>,
      <Cre8ProgressStepsItem svg={svgRegularCircleSix} message="Optional step message should be succinct" name="Step Six Name" state="incomplete"></Cre8ProgressStepsItem>
    ]} };

export const Error: StoryObj<typeof Cre8ProgressSteps> = { args: {
    children: [
      <Cre8ProgressStepsItem svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></Cre8ProgressStepsItem>,
      <Cre8ProgressStepsItem svg={svgError} message="Optional step message should be succinct" name="Step Two Name" state="error"></Cre8ProgressStepsItem>,
      <Cre8ProgressStepsItem svg={svgRegularCircleThree} message="Optional step message should be succinct" name="Step Three Name" state="incomplete"></Cre8ProgressStepsItem>
    ]} };

export const Warning: StoryObj<typeof Cre8ProgressSteps> = { args: {
    children: [
      <Cre8ProgressStepsItem svg={svgCheckCircle} message="Optional step message should be succinct" name="Step One Name" state="complete"></Cre8ProgressStepsItem>,
      <Cre8ProgressStepsItem svg={svgWarning} message="Optional step message should be succinct" name="Step Two Name" state="warning"></Cre8ProgressStepsItem>,
      <Cre8ProgressStepsItem svg={svgRegularCircleThree} message="Optional step message should be succinct" name="Step Three Name" state="incomplete"></Cre8ProgressStepsItem>
    ]} };
