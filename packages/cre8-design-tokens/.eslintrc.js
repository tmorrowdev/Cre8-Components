const baseConfig = require('@esi/eslint-config');

baseConfig.extends.push('plugin:json/recommended');

const baseConfigCopy = JSON.parse(JSON.stringify(baseConfig));

baseConfigCopy.ignorePatterns.push(
    '/build/',
    '/docs/'
);

module.exports = baseConfigCopy;
