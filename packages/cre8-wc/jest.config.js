const esModules = [
  'chai-a11y-axe',
  'cleave.js',
  'lit',
  'lit-html',
  '@lit',
  '@open-wc',
  '@web',
  '@esm-bundle',
  'storybook-mock-date-decorator',
  '@a11y',
  '@jest-axe',
].join('|');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.ts',
    '!<rootDir>/components/**/*.d.ts',
    '!<rootDir>/components/**/*.spec.ts',
    '!<rootDir>/components/**/*.stories.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['clover', 'json', 'lcov', 'text'],
  displayName: 'web-components',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/components/**/test/*.test.ts'],
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
      },
    ],
    '^.+\\.mjs$': ['babel-jest', {presets: ['@nrwl/react/babel']}],
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)(\\?inline)?(\\?raw)?$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`,],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs', 'json'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-canvas-mock', 'element-internals-polyfill', require.resolve('./toBeAccessible.ts'), require.resolve('./matchMedia.js')],
};
