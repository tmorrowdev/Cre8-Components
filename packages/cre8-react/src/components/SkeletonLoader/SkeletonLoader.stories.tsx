import type { StoryObj } from '@storybook/react';
import { cre8SkeletonLoader } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
    title: 'cre8 Components/Skeleton Loader',
    component: cre8SkeletonLoader,
    parameters: {
        status: { type: 'inProgress' },
        controls: {
            exclude: new RegExp(`${excludeRegexArray.join('|')}`),
        },
    },
    argTypes: {
        variant: {
            options: ['rectangle', 'square', 'circle'],
            control: { type: 'radio' },
        },
    },
};

export const Default: StoryObj<typeof cre8SkeletonLoader> = { args: {} };

export const Rectangle: StoryObj<typeof cre8SkeletonLoader> = {
    args: {
        variant: 'rectangle',
    },
};

export const Square: StoryObj<typeof cre8SkeletonLoader> = {
    args: {
        variant: 'square',
    },
};

export const Circle: StoryObj<typeof cre8SkeletonLoader> = {
    args: {
        variant: 'circle',
    },
};

export const CustomHeightWidth: StoryObj<typeof cre8SkeletonLoader> = {
    args: {
        height: '20px',
        width: '300px',
    },
};

export const CustomHeight: StoryObj<typeof cre8SkeletonLoader> = {
    args: {
        height: '100px',
    },
};

export const CustomWidth: StoryObj<typeof cre8SkeletonLoader> = {
    args: {
        width: '100px',
    },
};
