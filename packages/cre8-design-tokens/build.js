/* eslint-disable no-console */
const fs = require('fs-extra');
const path = require('path');
const deepmerge = require('deepmerge');
const camelCase = require('lodash/camelCase');
const StyleDictionary = require('style-dictionary');
const { cobrandConfig } = require('./cobrand_config.js');
// Parser
// Formats
require('./formats/brandFormat.js')(StyleDictionary);
// Transforms and TransformGroups
require('./transforms/brandTransform.js')(StyleDictionary);
// Actions
require('./actions/brandAction.js')(StyleDictionary);

// all functions, within other function closures,
// need to be defined on this for testing
const self = {};

// Brands that will have files built
self.getBrands = () => ['marketing', 'legacy', 'femmecubator', 'minimalist', 'blue', 'blue-v1', 'cre8'];

self.isTokenTypeNotTypographyAndFontFiles = (type) => (type !== ('typography') && (type !== ('fontFiles')));
self.brands = self.getBrands();

self.getImportedScssConfig = (brand, tokens, webBrandsBuildPath) => ({
    basePxFontSize: 16,
    prefix: 'cre8',
    options: {
        outputReferences: true,
    },
    transformGroup: 'custom/scss',
    buildPath: `${webBrandsBuildPath}${brand}/`,
    files: Object.keys(tokens).map((item) => ({
        format: 'scss/variables',
        filter: (token) => (
            // TODO: Move this into a registerFilter SD function
            self.isTokenTypeNotTypographyAndFontFiles(token.type)
                ? token.path[0] === item
                : null),
        destination: `${item}.scss`,
        options: {
            fileHeader: () => [`SCSS tokens for ${brand}: ${item}`],
        },
    })),
});

self.getImportedCssConfig = (brand, tokens, webBrandsBuildPath) => (
    [
        {
            basePxFontSize: 16,
            prefix: 'cre8',
            options: {
                outputReferences: true,
            },
            transformGroup: 'custom/css',
            buildPath: `${webBrandsBuildPath}${brand}/css/`,
            files: Object.keys(tokens).map((item) => ({
                filter: (token) => (
                    // TODO: Move this into a registerFilter SD function
                    self.isTokenTypeNotTypographyAndFontFiles(token.type)
                        ? token.path[0] === item
                        : null),
                format: 'css/variables',
                destination: `${item}.css`,
                options: {
                    root: (token) => [`${token.name}:--var(${token.value})`],
                },
            })),
        },
        {
            basePxFontSize: 16,
            options: {
                outputReferences: true,
            },
            transformGroup: 'custom/css',
            buildPath: `${webBrandsBuildPath}${brand}/css/`,
            files: Object.keys(tokens).map((item) => ({
                filter: (token) => (
                    // TODO: Move this into a registerFilter SD function
                    (token.type === ('typography') && (token.type !== ('fontFiles')))
                        ? token.path[0] === item
                        : null),
                format: 'css/typography',
                destination: `${item}.css`,
                options: {
                    importedCss: './tokens_brand.css',
                    root: (token) => token,
                },
            })),
        },
    ]
);
self.getWebSettingsConfig = (brand, webBrandsBuildPath) => ({
    basePxFontSize: 16,
    prefix: 'cre8',
    options: {
        brand, // Used to grab current brand in our various registered functions
    },
    transformGroup: 'custom/web',
    buildPath: `${webBrandsBuildPath}${brand}/`,
    files: [
        {
            destination: 'tokens-brand.scss',
            format: 'scss/brandWithGlobals',
            filter: (token) => (
                self.isTokenTypeNotTypographyAndFontFiles(token.type)
                && token.attributes.category !== 'accent'
            ),
            options: {
                fileHeader: () => [`${brand} tokens`],
            },
        },
    // This is mostly a sanity check against filtering; not sure if we'll need it
        {
            destination: `tokens-all-${brand}.scss`,
            format: 'scss/variables',
            filter: (token) => (
                self.isTokenTypeNotTypographyAndFontFiles(token.type)
                && token.attributes.category !== 'accent'
            ),
            options: {
                fileHeader: () => [`${brand}: all tokens`],
            },
        },

        {
            destination: 'css/tokens_brand.css',
            format: 'css/variables',
            filter: (token) => (
                self.isTokenTypeNotTypographyAndFontFiles(token.type)
                && token.attributes.category !== 'accent'
                && token.attributes.category !== '_base'
            ),
            options: {
                fileHeader: () => [`${brand}: all tokens`],
            },
        },
        {
            destination: 'css/tokens_accent.css',
            format: 'css/variables',
            filter: (token) => token.attributes.category === 'accent',
            options: {
                fileHeader: () => [`${brand}: accent tokens`],
            },
        },
        {
            destination: `css/tokens_${brand}.css`,
            format: 'css/typography',
            filter: (token) => (token.type === ('typography')
                && (token.type !== ('fontFiles')) && (token.attributes.category !== '_base')),
            options: {
                import: ['./tokens_brand.css', './fonts.css'],
                root: (items) => [...items],
            },
        },
    ],
    actions: ['copy_brand_assets'], // Copies brand's associated assets from root assets directory
});
self.getMixinSettings = () => ({
    basePxFontSize: 16,
    prefix: 'cre8',
    buildPath: 'lib/web/',
    transformGroup: 'custom/web',
    files: [
        {
            destination: 'mixins/typography-usage.scss',
            format: 'scss/mixinFormat',
            filter: (token) => (token.type === 'typography') && (token.attributes.category !== '_base'),
            options: {
                fileHeader: () => [
                    'Typography usage provided via mixins.',
                    'Typography applications are Tier 2 values that map',
                    'typography presets to high-level UI applications.',
                ],
            },
        },
        {
            destination: 'layouts/breakpoints.scss',
            format: 'scss/variables',
            filter: (token) => (token.type === 'breakpoints') && (token.attributes.category !== '_base'),
            options: {
                fileHeader: () => [
                    'Breakpoints used in responsive layouts and media queries',
                ],
            },
        },
    ],
});
self.getSassVarToCSSVarConfig = (brand) => ({
    transformGroup: 'custom/scss',
    prefix: 'cre8',
    buildPath: `lib/support/brands/${brand}/`,
    files: [
        {
            destination: `${brand}-sass-support.scss`,
            format: 'support-scss/variables',
            filter: (token) => token.type !== 'typography',
            options: {
                fileHeader: () => [
                    `Sass Variable Tokens to CSS Vars for ${brand} for backward compatible support`,
                ],
                outputReferences: true,
            },
        },
    ],
});
// DYNAMICALLY GENERATE STYLE DICTIONARY CONFIG
self.getStyleDictionaryConfig = (brand, tokenJson) => {
  // Get the Updated JSON that's been fixed so it should get passed as an arg
    const tokens = tokenJson;
    const webBrandsBuildPath = 'lib/web/brands/';
    return {
        tokens,
        platforms: {
            // Setups up the @font-face rule for a brand's defined font to point to font files.
            // TODO: Need to determine same pattern for SCSS
            cssFontFace: {
                transforms: ['attribute/font'],
                buildPath: `${webBrandsBuildPath}${brand}/css/`,
                files: [
                    {
                        destination: 'fonts.css',
                        format: 'font-face',
                        filter: {
                            attributes: {
                                category: 'asset',
                                type: 'font',
                            },
                        },
                        options: {
                            fontPathPrefix: '../assets/fonts/', // path needs to end in directory holding fonts
                        },
                    },
                ],
            },
            // TODO: Determine if we're still going to be splitting up scss/css files by modular files
            // First group of platforms generates the separated token files for importing
            importedScss: self.getImportedScssConfig(brand, tokens, webBrandsBuildPath),
            importedCss: self.getImportedCssConfig(brand, tokens, webBrandsBuildPath),
            web: self.getWebSettingsConfig(brand, webBrandsBuildPath),
            mixins: self.getMixinSettings(),
      // Test backwards compatible map, idea came from mixin issue
      // https://github.com/amzn/style-dictionary/issues/360
            sassVarToCSSVar: self.getSassVarToCSSVarConfig(brand),
            reactNative: {
                basePxFontSize: 16,
                prefix: 'cre8',
                transformGroup: 'custom/react-native',
                buildPath: `lib/react-native/brands/${brand}/`,
                files: [
                    {
                        format: 'react-native/object',
                        destination: 'tokens-brand.js',
                    },
                    {
                        format: 'react-native/typescript-declarations',
                        destination: 'tokens-brand.d.ts',
                    },
                ],
            },
        },
    };
};

// We want the final, transformed JSON to be fixed up BEFORE SD even looks at it
// So we're gonna parse through the token files and fix some stuff first
self.reformatBrandTokenJson = async (brand) => {
    console.log(`Reformatting brand tokens for...${brand}`);

    const brandFile = fs.readFile(
        `./tokens/brands/${brand}/tokens_${brand}.json`,
        'utf8'
    );
    const injectedTokensFile = fs.readFile(
        `./tokens/brands/${brand}/tokens_injected.json`,
        'utf8'
    ).catch(() => {
        console.log('No extra static tokens to inject');
        return '{}';
    });

    return Promise.all([brandFile, injectedTokensFile])
        .then(([brandFileData, injectedTokensFileData]) => {
            console.log('Injecting static tokens');
            const injectedTokens = JSON.parse(injectedTokensFileData);
            const newJSON = JSON.parse(brandFileData);
            console.log(`\n...Reformatting for ${brand}: complete.`);
            return deepmerge(newJSON, injectedTokens);
        });
};
self.createReactNativeIndex = async () => {
    console.log('Building react native indexes...');
    const jsPromise = fs.writeFile(
        './lib/react-native/index.js',
        `module.exports = {${self.brands
            .map((br) => `'${br}': require('./brands/${br}/tokens-brand.js')`)
            .join(',')}}`
    );
    const tsPromise = fs.writeFile(
        './lib/react-native/index.d.ts',
        `${self.brands
            .map(
                (br) => `import type { RootObject as RootObject${camelCase(br)} } from './brands/${br}/tokens-brand';`
            )
            .join('\n')}

export interface DesignTokens {
  ${self.brands.map((br) => `'${br}': RootObject${camelCase(br)}`).join('\n  ')}
}
  
declare const root: DesignTokens;
export default root;`
    );

    return Promise.all([jsPromise, tsPromise]);
};

self.getPlatforms = () => [
    'cssFontFace',
    'importedScss',
    'importedCss',
    'web',
    'mixins',
    'sassVarToCSSVar',
    'reactNative',
];
self.buildBrands = async (supportedBrands) => {
    console.log('Building brands...');
    const brandPromises = supportedBrands.map(async (brand) => {
        const brandTokens = await self.reformatBrandTokenJson(brand);
        const platForms = self.getPlatforms();
        const StyleDictionaryConfig = StyleDictionary.extend(
            self.getStyleDictionaryConfig(brand, brandTokens)
        );

        platForms.forEach((platform) => {
            console.log('\n--- Starting Style Dictionary build... ---');

            console.log(`\nProcessing: brand [${brand}], platform [${platform}]`);
            StyleDictionaryConfig.buildPlatform(platform);

            console.log('\n--- End Style Dictionary build. ---');
        });
    });

    return Promise.all(brandPromises);
};

self.buildCobrands = async () => {
    console.log('Building Cobrands...');

    // Get all cobrand files from within `./tokens/cobrands` directory
    const cobrandsPath = './tokens/cobrands/';
    const cobrandFiles = fs.readdirSync(cobrandsPath);

    // Run Style Dictionary for each found cobrand file
    const cobrandPromises = cobrandFiles.map(async (file) => {
        const filePath = `${cobrandsPath}${file}`;
        const fileJson = fs.readFileSync(filePath, 'utf8');
        const tokens = JSON.parse(fileJson);
        const cobrand = path.parse(file).name;

        const StyleDictionaryConfig = StyleDictionary.extend({
            tokens,
            platforms: {
                cobrand: cobrandConfig(cobrand),
            },
        });
        console.log(`\nProcessing: cobrand [${cobrand}]`);
        StyleDictionaryConfig.buildAllPlatforms();
    });
    return Promise.all(cobrandPromises);
};

self.main = async (supportedBrands) => {
    try {
        console.log('Building...');
        await self.buildBrands(supportedBrands);
        await self.buildCobrands();
        await self.createReactNativeIndex();
        console.log('Build complete!');
    } catch (error) {
        console.error('Build failed.');
        console.error(error);

        // Fail jenkins pipeline on error
        process.exit(1);
    }
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    self.main(self.brands);
}

module.exports = self;
