module.exports = {
    stories: [
    '../**/src/**/*.stories.mdx'
    ],
    addons: [
    "@storybook/addon-essentials",
    { name: 'storybook-design-token', options: { preserveCSSVars: true } },
    ],
    framework: "@storybook/react-webpack5",
    core: {
    disableTelemetry: true
    },
    staticDirs: [
        './static',
    ],
};
