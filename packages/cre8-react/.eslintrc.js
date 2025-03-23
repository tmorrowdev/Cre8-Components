module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['@cre8/eslint-config'],
    overrides: [
        {
            files: ['**/*.tsx', '**/*.ts'],
            parser: '@typescript-eslint/parser',
            extends: ['plugin:@typescript-eslint/recommended'],
            plugins: ['@typescript-eslint', 'react'],
            rules: {
                '@typescript-eslint/ban-ts-comment': [
                    'error',
                    {
                        'ts-ignore': 'allow-with-description',
                        'ts-nocheck': 'allow-with-description',
                    },
                ],
                '@typescript-eslint/indent': 'off',
                '@typescript-eslint/no-explicit-any': 'warn', // temporary disable
                'prefer-default-export': 'off',
                'jsx-a11y/anchor-is-valid': 'warn', // temporary disable
                'react/jsx-filename-extension': 'warn', // temporary disable
                'react/function-component-definition': 'warn', // temporary disable
                'eol-last': 'warn', // temporary disable
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-non-null-assertion': 'warn',
                // all of our conditional property types break this rule so, setting it to warn to address later/
                'max-len': 'warn', // temporary disable
                'import/extensions': 'warn',
                'import/no-unresolved': 'warn', // temporary disable
                'import/prefer-default-export': 'warn', // temporary disable
                '@typescript-eslint/no-unused-vars': [
                    'warn',
                    {
                        argsIgnorePattern: '^_',
                        varsIgnorePattern: '^_',
                    },
                ],
            },
        },
    ],
};
