import { defineConfig } from 'vite';
import { globSync } from 'glob';
import fs from 'fs';
import dts from 'vite-plugin-dts';

// Get base components
const baseComponents = globSync('./components/*.ts').reduce((acc, baseComponentPath) => {
  const name = baseComponentPath.replace('./components/', '').replace('.ts', '');
  acc[name] = baseComponentPath;
  return acc;
}, {} as Record<string, string>);

// Only cre8-element and cre8-form-element are in the above location
// To allow extending off a web component it must be listed below
baseComponents['cre8-field'] = './components/field/field.ts';

// Get all component files
const components = globSync('./components/*/*.ts').reduce((acc, componentPath) => {
  // Exclude stories files
  if (componentPath.includes('.stories.')) {
    return acc;
  }
  
  // Exclude icon because there are some specific things that need to happen based on the URL inclusion of `icon.js`
  // in order for routing to work correctly (also has unused imports causing TS errors)
  if (componentPath.match(/icon\.ts$/)) {
    return acc;
  }

  // Excludes any components that are not extending the base components.
  const contents = fs.readFileSync(componentPath, 'utf-8');
  const baseComponentNames = Object.keys(baseComponents).map((baseComponent) => (
    // convert dash-case to UpperCamelCase
    baseComponent
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  ));
  
  const extendsBaseComponent = baseComponentNames.some((baseComponentName) => 
    contents.includes(`extends ${baseComponentName}`)
  );
  
  if (extendsBaseComponent) {
    const name = componentPath.replace('./components/', '').replace('.ts', '').split('/').pop()!;
    acc[name] = componentPath;
  } else {
    console.warn(`${componentPath} doesn't extend any base components: ${baseComponentNames.join(', ')}`);
  }

  return acc;
}, {} as Record<string, string>);

const entry = {
  ...components,
  ...baseComponents,
  // Temporarily excluding icon due to unused import errors
  // icon: './components/icon/icon.ts',
  index: './index.ts',
};

export default defineConfig({
  plugins: [
    dts({
      outDir: 'lib',
      include: [
        'components/**/*.ts',
        'index.ts',
        'design-tokens/**/*.ts',
        'directives/**/*.ts',
        'utilities/**/*.ts'
      ],
      exclude: [
        '**/*.test.ts',
        '**/*.stories.ts'
      ]
    })
  ],
  assetsInclude: ['**/*.scss'],
  build: {
    lib: {
      entry,
      formats: ['es'],
    },
    outDir: 'lib',
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index') {
            return 'index.js';
          }
          return `components/${chunkInfo.name}/${chunkInfo.name}.js`;
        },
        assetFileNames: (assetInfo) => {
          if (/\.(css|scss)$/.test(assetInfo.name!)) {
            return `components/[name]/[name].[ext]`;
          }
          if (/\.(svg\?raw|svg)$/.test(assetInfo.name!)) {
            return `svgs/[name].[ext]`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name!)) {
            return `fonts/[name].[ext]`;
          }
          return `assets/[name].[ext]`;
        },
      },
      external: [
        'lit',
        'lit-html',
        'lit/decorators.js',
        '@cre8_dev/cre8-design-tokens',
        '@cre8_dev/cre8-icons',
        /^@cre8_dev\/cre8-icons\/lib\//,
        'nanoid',
        'classnames',
        '@a11y/focus-trap',
        'chart.js',
        'zod',
        'agentrpc',
        /\.scss$/
      ]
    },
    copyPublicDir: false,
    sourcemap: true,
    minify: false, // Keep unminified for better debugging
    target: 'es2021'
  },
  resolve: {
    extensions: ['.js', '.cjs', '.ts', '.jsx', '.tsx','.svg?raw', '.scss','.scss', '.css', '.otf', '.ttf', '.yml']
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import'],
        additionalData: `@import "./design-tokens/core/scss/theming/head.module.css";`
      }
    }
  },
  esbuild: {
    // Use a custom loader to preprocess TypeScript files
    loader: 'ts',
    include: /\.(ts|js)$/,
    exclude: [],
  }
});