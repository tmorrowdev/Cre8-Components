import type { StoryObj } from '@storybook/react';
import { IconDescription } from './IconDescription';

export default {
  title: 'Examples/Icon Description',
  component: IconDescription,
  parameters: { status: { type: 'inProgress' } },
};

export const Default: StoryObj<typeof IconDescription> = { args: {} };
