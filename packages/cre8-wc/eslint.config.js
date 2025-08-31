// Modern ESLint Flat Config for Lit Web Components
// Requires Node.js 22+ for full compatibility with ESLint 9 and modern plugins

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import lit from 'eslint-plugin-lit';
import litA11y from 'eslint-plugin-lit-a11y';
import wc from 'eslint-plugin-wc';

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/lib/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/storybook-static/**',
      '**/*.min.js',
      // Ignore third party and build files
      '.storybook/components/system-docs/prism.js',
      '.storybook/components/system-docs/prism.module.ts',
      'scripts/version-bump.cjs',
      'scripts/release.cjs',
      'scripts/merge-uber-theme.js',
      'scripts/extract-tokens.js',
      'webpack.config.cjs',
      'extract-tokens.cjs',
      'token-config.js',
    ]
  },

  // Base configurations
  js.configs.recommended,

  // Main TypeScript web component files
  {
    files: ['components/**/*.ts', 'src/**/*.ts', 'directives/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        customElements: 'readonly',
        HTMLElement: 'readonly',
        Element: 'readonly',
        Document: 'readonly',
        Window: 'readonly',
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        // Lit globals
        html: 'readonly',
        css: 'readonly',
        LitElement: 'readonly',
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'lit': lit,
      'lit-a11y': litA11y,
      'wc': wc,
    },
    settings: {
      // Configure lit-a11y to only lint lit-html template literals
      litHtmlSources: true,
      // Configure wc plugin to recognize custom element base classes
      wc: {
        elementBaseClasses: ['LitElement', 'Cre8Element', 'Cre8FormElement']
      }
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      
      // ESLint base rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off', // Handled by TypeScript
      'prefer-const': 'error',
      'no-var': 'error',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description'
        }
      ],
      '@typescript-eslint/no-shadow': 'error',
      
      // Code quality rules optimized for web components
      'max-len': [
        'error',
        {
          code: 120,
          ignorePattern: 'd="(.*?)"', // SVG path exception
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true
        }
      ],
      'no-underscore-dangle': 'off', // Allow private method naming
      'class-methods-use-this': [
        'error',
        {
          exceptMethods: [
            // Web Components lifecycle
            'connectedCallback',
            'disconnectedCallback',
            'adoptedCallback',
            'attributeChangedCallback',
            // LitElement lifecycle
            'render',
            'createRenderRoot',
            'performUpdate',
            'shouldUpdate',
            'update',
            'updated',
            'firstUpdated',
            // Form element callbacks
            'formResetCallback',
            'formStateRestoreCallback',
            'checkValidity',
            'reportValidity',
          ]
        }
      ],

      // Lit-specific rules (using available rules only)
      'lit/no-classfield-shadowing': 'off', // Can be problematic with decorators
      'lit/no-invalid-html': 'error',
      'lit/no-useless-template-literals': 'error',
      'lit/attribute-value-entities': 'off', // Allow HTML entities in attributes
      'lit/binding-positions': 'error',
      'lit/no-duplicate-template-bindings': 'error',
      'lit/no-property-change-update': 'off', // Allow property changes in update
      'lit/prefer-static-styles': 'error',
      'lit/no-template-bind': 'error',
      'lit/no-template-map': 'error',

      // Web Components rules (using available rules only)
      'wc/no-invalid-element-name': 'error',
      'wc/no-self-class': 'error',
      'wc/no-typos': 'error',
      'wc/no-constructor-attributes': 'error',
      'wc/guard-super-call': 'error',
      'wc/file-name-matches-element': ['error', { 
        prefix: 'cre8',
        suffix: '',
        transform: 'kebab'
      }],
      'wc/no-invalid-extends': ['error', {
        allowedSuperNames: ['LitElement', 'Cre8Element', 'Cre8FormElement']
      }],

      // Basic accessibility rules for Lit templates (only using available rules)
      'lit-a11y/alt-text': 'error',
      'lit-a11y/anchor-is-valid': 'error',
      'lit-a11y/aria-attrs': 'error',
      'lit-a11y/aria-role': 'error',
      'lit-a11y/aria-unsupported-elements': 'error',
      'lit-a11y/autocomplete-valid': 'off', // Can be restrictive for custom elements
      'lit-a11y/click-events-have-key-events': 'warn',
      'lit-a11y/img-redundant-alt': 'warn',
      'lit-a11y/mouse-events-have-key-events': 'warn',
      'lit-a11y/no-access-key': 'warn',
      'lit-a11y/no-autofocus': 'warn', // Allow for specific UX needs
      'lit-a11y/no-redundant-role': 'off', // Custom elements may need explicit roles
      'lit-a11y/role-has-required-aria-attrs': 'error',
      'lit-a11y/tabindex-no-positive': 'error',
      'lit-a11y/valid-lang': 'error',

      // Rules that help with Lit best practices
      'no-param-reassign': [
        'error',
        {
          props: false // Allow property mutation in web components
        }
      ],
      'import/extensions': 'off', // Modern bundlers handle this
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.name="document.querySelector"]',
          message: 'Use this.shadowRoot.querySelector() or this.renderRoot.querySelector() in web components'
        }
      ],
    }
  },

  // Utility files (non-component TypeScript)
  {
    files: ['utilities/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true
        }
      ],
    }
  },

  // Storybook files (relaxed rules)
  {
    files: ['.storybook/**/*.ts', '**/*.stories.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module', // Don't require strict tsconfig project
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        customElements: 'readonly',
        HTMLElement: 'readonly',
        console: 'readonly',
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off', // Storybook args pattern
    }
  },

  // Test files
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/test/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        console: 'readonly',
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
    }
  },

  // Configuration files
  {
    files: ['vite.config.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-console': 'off',
    }
  }
);