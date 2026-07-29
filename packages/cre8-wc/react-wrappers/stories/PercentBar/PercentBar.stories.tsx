import type { StoryObj } from '@storybook/react-vite';
import { excludeRegexArray } from '../../.storybook/preview';
import { Cre8PercentBar } from '../../index';
import { action } from 'storybook/actions';

export default {
    title: 'In Development/Percent Bar',
    component: Cre8PercentBar,
    parameters: {
        status: { type: 'inProgress' },
        controls: { exclude: new RegExp(`${excludeRegexArray.join('|')}`) },
    },
    argTypes: {
        max: { control: 'number' },
        value: { control: 'number' },
    },
    args: {
        onPercentBarLeftActionClick: action('percent-bar-left-action-click'),
    },
};

export const Default: StoryObj<typeof Cre8PercentBar> = {
    args: { value: '2', max: '10' },
};

export const tenPercent: StoryObj<typeof Cre8PercentBar> = {
    args: {
        value: '1',
        max: '10',
    },
};

export const thirtyThreePercent: StoryObj<typeof Cre8PercentBar> = {
    args: {
        value: '1',
        max: '3',
    },
};

export const fiftyPercent: StoryObj<typeof Cre8PercentBar> = {
    args: {
        value: '5',
        max: '10',
    },
};

export const oneHundredPercent: StoryObj<typeof Cre8PercentBar> = {
    args: {
        value: '10',
        max: '10',
    },
};

export const noActionLeft = {
    args: {
        value: '2',
        max: '10',
        disableActionLeft: true,
    },
};
