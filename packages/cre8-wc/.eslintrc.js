module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        '@open-wc/eslint-config',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint', 'jest', 'lit'],
      rules: {
        'lit-a11y/list': 'warn', // Remove when we finish refactoring the way lists are handled
        'lit-a11y/no-redundant-role': 'off', // Remove when we find a solution to making custom web elements semantically meaningful
        'max-len': [
          'error',
          {
            code: 120,
            ignorePattern: 'd="(.*?)"' // Adding this regex pattern exception for long svg path definitions
          },
        ],
        'class-methods-use-this': 'warn', // some class methods are inherited and thus are not defined, but overridden within our components, keep as warn
        'no-shadow': 'off', // javascript specific no-shadow, n/a to typescript see rule below
        '@typescript-eslint/no-shadow': ['error'],
        'import/extensions': [
          'off',
          'always',
          {
            ignorePackages: true,
          },
        ],
        'no-param-reassign': [
          'error',
          {
            props: false
          },
        ],
        '@typescript-eslint/ban-ts-comment': ['warn', {'ts-ignore': 'allow-with-description', 'ts-nocheck': 'allow-with-description'}],
        'no-underscore-dangle': 'off', // this is how handle private methods for now so it has to stay on
        // >>> future story for handling with private js methods
      },
    },
    {
      files: ['*.test.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        '@cre8/eslint-config',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint', 'jest', 'lit'],
      rules : {
        'jest/valid-expect': 'warn',
        'jest/expect-expect': 'warn',
        'jest/prefer-to-be': 'warn',
        'jest/consistent-test-it': 'warn',
        'jest/require-top-level-describe': 'warn',
        'indent': 'warn',
        'padded-blocks': 'warn',
        'jest/valid-title': 'warn',
        'camelcase': 'warn',
        'semi': 'warn',
        'function-paren-newline': 'warn',
        'object-curly-spacing': 'warn',
        'no-trailing-spaces': 'warn',
        'no-await-in-loop': 'warn',
        'no-restricted-syntax': 'warn',
        'comma-dangle': 'warn',
        'import/no-duplicates': 'warn',
        'no-duplicate-imports': 'warn', // we probably dont need both of these
        'quotes': 'warn',
        'max-len': 'warn',
        'eol-last': 'warn',
        'object-curly-newline': 'warn',
        'no-multiple-empty-lines': 'warn',
        'no-promise-executor-return': 'warn',
        'jest/no-alias-methods': 'warn',
        'comma-spacing': 'warn',
        'arrow-spacing':  'warn',
        'jest/prefer-to-have-length': 'warn',
        'import/newline-after-import': 'warn',
        'import/order': 'warn',
        'no-unexpected-multiline': 'warn',
        'template-tag-spacing': 'warn',
        'space-infix-ops': 'warn',
        // These are shared with the src files potentially vvv
        'import/extensions': [
          'warn',
          'always',
          {
            ignorePackages: true,
          },
        ],
        'no-unused-expressions': 'warn',
        '@typescript-eslint/ban-ts-comment': ['warn', {'ts-ignore': 'allow-with-description', 'ts-nocheck': 'allow-with-description'}],
        'lit-a11y/accessible-name': 'warn',
        'lit/no-classfield-shadowing': 'off', // This rule is blowing up, not sure why
      }
    }
  ],
};
