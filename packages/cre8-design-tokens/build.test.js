const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');
const allBuild = require('./build.js');

jest.mock('fs-extra');
jest.mock('style-dictionary');
const logSpy = jest.spyOn(console, 'log')
    .mockImplementation(() => {}); // comment to see logs
const errorSpy = jest.spyOn(console, 'error') // eslint-disable-line no-unused-vars
    .mockImplementation(() => {}); // comment to see errors

describe('brands', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getBrands', () => {
        test('brands should not altered', () => {
            const expectedBrands = allBuild.getBrands();
            expect(expectedBrands).toEqual(['tcg', 'pbm', 'pharmacy', 'legacy', 'chc', 'cre8-legacy', 'cre8']);
        });
    });

    describe('reformatBrandTokenJson', () => {
        test('should reformat brand token with injected tokens', async () => {
            const brand = 'pbm';
            const brandFileContent = '{"bg": "red"}';
            const injectedTokenFileContent = '{"formats": "woff2"}';

            fs.readFile.mockResolvedValueOnce(brandFileContent);
            fs.readFile.mockResolvedValueOnce(injectedTokenFileContent);

            const expectedMergedData = { bg: 'red', formats: 'woff2' };

            const brandedTokenJson = await allBuild.reformatBrandTokenJson(brand);

            expect(fs.readFile).toHaveBeenCalledWith(`./tokens/brands/${brand}/tokens_${brand}.json`, 'utf8');
            expect(fs.readFile).toHaveBeenCalledWith(`./tokens/brands/${brand}/tokens_injected.json`, 'utf8');
            expect(brandedTokenJson).toEqual(expectedMergedData);
        });

        test('should return rejected promise when reading brand file fails', () => {
            const fileError = new Error('file not found');
            const injectedTokenFileContent = '{"formats": "woff2"}';

            fs.readFile.mockRejectedValueOnce(fileError);
            fs.readFile.mockResolvedValueOnce(injectedTokenFileContent);

            const brandJsonPromise = allBuild.reformatBrandTokenJson('brand-does-not-exist');

            return expect(brandJsonPromise).rejects.toEqual(fileError);
        });

        test('should recover rejection when injectable tokens not found', async () => {
            const brand = 'pbm';
            const brandFileContent = '{}';

            fs.readFile.mockResolvedValueOnce(brandFileContent);
            fs.readFile.mockRejectedValueOnce(new Error('file not found'));

            const brandedTokenJson = await allBuild.reformatBrandTokenJson(brand);

            expect(fs.readFile).toHaveBeenCalledWith(`./tokens/brands/${brand}/tokens_injected.json`, 'utf8');
            expect(brandedTokenJson).toEqual({});
        });
    });

    describe('createReactNativeIndex', () => {
        test('should create React Native index files correctly', async () => {
            fs.writeFile.mockResolvedValueOnce();
            fs.watchFile.mockImplementation((path, callback) => {
                callback();
            });
            await allBuild.createReactNativeIndex();
            expect(fs.writeFile).toHaveBeenCalledWith(
                './lib/react-native/index.js',
                expect.stringContaining('module.exports = {')
            );
            expect(fs.writeFile).toHaveBeenCalledWith(
                './lib/react-native/index.d.ts',
                expect.stringContaining('export interface DesignTokens')
            );
        });
    });

    describe('getStyleDictionaryConfig', () => {
        const brand = 'pbm';
        const tokenJson = { bg: 'red', formats: 'woff2', type: 'color' };
        const webBrandsBuildPath = 'lib/web/brands/';
        const tokens = {
            _base: {
                neutral: {
                    10: {
                        value: '#f8f8f9',
                        type: 'color',
                    },
                    20: {
                        value: '#edeeef',
                        type: 'color',
                    },
                },
            },
        };

        test('should return the correct configuration for cssFontFace', () => {
            const config = allBuild.getStyleDictionaryConfig(brand, tokenJson);
            const cssFontFace = config.platforms.cssFontFace;
            expect(config.tokens).toEqual(tokenJson);
            expect(cssFontFace).toEqual({
                transforms: ['attribute/font'],
                buildPath: 'lib/web/brands/pbm/css/',
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
                            fontPathPrefix: '../assets/fonts/',
                        },
                    },
                ],
            });
        });

        describe('getImportedScssConfig', () => {
            test('should return the correct configuration for importedScss', () => {
                const importedScss = allBuild.getImportedScssConfig(brand, tokenJson, webBrandsBuildPath);

                expect(importedScss).toEqual({
                    basePxFontSize: 16,
                    prefix: 'cre8',
                    options: {
                        outputReferences: true,
                    },
                    transformGroup: 'custom/scss',
                    buildPath: 'lib/web/brands/pbm/',
                    files: expect.any(Array),
                });
            });

            test('should define a filter function that filters tokens correctly', () => {
                const importedScssConfig = allBuild.getImportedScssConfig(brand, tokens, webBrandsBuildPath);
                const filterFunction = importedScssConfig.files[0].filter;
                const tokenToTest = {
                    type: 'color',
                    path: ['_base', 'neutral', '16'],
                };
                expect(filterFunction(tokenToTest)).toBe(true);
            });

            test('should return the token type is typography', () => {
                const importedScssConfig = allBuild.getImportedScssConfig(brand, tokens, webBrandsBuildPath);
                const filterFunction = importedScssConfig.files[0].filter;
                const tokenToTest = {
                    type: 'typography',
                    path: ['_base', 'neutral', '16'],
                };
                expect(filterFunction(tokenToTest)).toBeNull();
            });

            test('should define a fileHeader function that returns the expected header', () => {
                const importedScssConfig = allBuild.getImportedScssConfig(brand, tokens, webBrandsBuildPath);
                const filterHeaderFunction = importedScssConfig.files[0].options.fileHeader;
                expect(filterHeaderFunction()).toEqual(['SCSS tokens for pbm: _base']);
            });
        });

        describe('getImportedCssConfig', () => {
            test('should return the correct configuration for importedCss', () => {
                const importedCssConfig = allBuild.getImportedCssConfig(brand, tokenJson, webBrandsBuildPath);
                expect(importedCssConfig).toEqual(
                    [
                        {
                            basePxFontSize: 16,
                            prefix: 'cre8',
                            options: { outputReferences: true },
                            transformGroup: 'custom/css',
                            buildPath: 'lib/web/brands/pbm/css/',
                            files: expect.any(Array),
                        },
                        {
                            basePxFontSize: 16,
                            options: { outputReferences: true },
                            transformGroup: 'custom/css',
                            buildPath: 'lib/web/brands/pbm/css/',
                            files: expect.any(Array),
                        },
                    ]
                );
            });

            test('should define a filter function that filters tokens correctly', () => {
                const importedCssConfig = allBuild.getImportedCssConfig(brand, tokens, webBrandsBuildPath);
                const filterFunction = importedCssConfig[0].files[0].filter;
                const tokenToTest = {
                    type: 'color',
                    path: ['_base', 'neutral', '16'],
                };
                expect(filterFunction(tokenToTest)).toBe(true);
            });

            test('should return the token type is typography', () => {
                const importedCssConfig = allBuild.getImportedCssConfig(brand, tokens, webBrandsBuildPath);
                const filterFunction = importedCssConfig[0].files[0].filter;
                const tokenToTest = {
                    type: 'typography',
                    path: ['_base', 'neutral', '16'],
                };
                expect(filterFunction(tokenToTest)).toBeNull();
            });

            test('should define a root function that returns the expected root', () => {
                const importedCssConfig = allBuild.getImportedCssConfig(brand, tokens, webBrandsBuildPath);
                const filterRootFunction = importedCssConfig[0].files[0].options.root;
                const tokenToTest = {
                    name: 'abc',
                    value: 123,
                };
                expect(filterRootFunction(tokenToTest)).toEqual(['abc:--var(123)']);
            });

            test('typography token type second option filter should return true', () => {
                const importedCssConfig = allBuild.getImportedCssConfig(brand, tokens, webBrandsBuildPath);
                const filterFunction = importedCssConfig[1].files[0].filter;
                const tokenToTest = {
                    type: 'typography',
                    path: ['_base', 'neutral', '16'],
                };
                expect(filterFunction(tokenToTest)).toBe(true);
            });

            test('not typography token type second option filter should return null', () => {
                const importedCssConfig = allBuild.getImportedCssConfig(brand, tokens, webBrandsBuildPath);
                const filterFunction = importedCssConfig[1].files[0].filter;
                const tokenToTest = {
                    type: 'fontFiles',
                    path: ['_base', 'neutral', '16'],
                };
                expect(filterFunction(tokenToTest)).toBeNull();
            });

            test('option two root should return correct token', () => {
                const importedCssConfig = allBuild.getImportedCssConfig(brand, tokens, webBrandsBuildPath);
                const filterRootFunction = importedCssConfig[1].files[0].options.root;
                const tokenToTest = {
                    name: 'abc',
                    value: 123,
                };
                expect(filterRootFunction(tokenToTest)).toEqual(tokenToTest);
            });
        });

        describe('getWebSettingsConfig', () => {
            const webConfig = allBuild.getWebSettingsConfig(brand, webBrandsBuildPath);
            const headerToken = {
                type: 'color',
                attributes: {
                    category: 'header',
                },
            };
            const accentToken = {
                type: 'color',
                attributes: {
                    category: 'accent',
                },
            };
            const baseToken = {
                type: 'color',
                attributes: {
                    category: '_base',
                },
            };

            test('should return the correct configuration for web', () => {
                expect(webConfig).toEqual(
                    {
                        basePxFontSize: 16,
                        prefix: 'cre8',
                        options: { brand: 'pbm' },
                        transformGroup: 'custom/web',
                        buildPath: 'lib/web/brands/pbm/',
                        files:
                    [
                        {
                            destination: 'tokens-brand.scss',
                            format: 'scss/brandWithGlobals',
                            filter: expect.any(Function),
                            options: {
                                fileHeader: expect.any(Function),
                            },
                        },
                        {
                            destination: 'tokens-all-pbm.scss',
                            format: 'scss/variables',
                            filter: expect.any(Function),
                            options: {
                                fileHeader: expect.any(Function),
                            },
                        },
                        {
                            destination: 'css/tokens_brand.css',
                            format: 'css/variables',
                            filter: expect.any(Function),
                            options: {
                                fileHeader: expect.any(Function),
                            },
                        },
                        {
                            destination: 'css/tokens_accent.css',
                            format: 'css/variables',
                            filter: expect.any(Function),
                            options: {
                                fileHeader: expect.any(Function),
                            },
                        },
                        {
                            destination: 'css/tokens_pbm.css',
                            format: 'css/typography',
                            filter: expect.any(Function),
                            options: expect.any(Object),
                        },
                    ],
                        actions: ['copy_brand_assets'],
                    }
                );
            });

            test.each([
                [headerToken, webConfig.files[0].filter, true],
                [headerToken, webConfig.files[1].filter, true],
                [headerToken, webConfig.files[2].filter, true],
                [headerToken, webConfig.files[3].filter, false],
                [headerToken, webConfig.files[4].filter, false],
            ])('should return correct filter for web config files options', (token, filterFn, response) => {
                expect(filterFn(token)).toBe(response);
            });

            // Sass files currently export base tokens in a modular file of _base.scss
            test.each([
                [baseToken, webConfig.files[0].filter, true], // sass file
                [baseToken, webConfig.files[1].filter, true], // sass file
                [baseToken, webConfig.files[2].filter, false],
                [baseToken, webConfig.files[3].filter, false],
                [baseToken, webConfig.files[4].filter, false],
            ])('should exclude _base tokens for certain files', (token, filterFn, response) => {
                expect(filterFn(token)).toBe(response);
            });

            test.each([
                [accentToken, webConfig.files[0].filter, false], // tokens-brand.scss
                [accentToken, webConfig.files[1].filter, false], // tokens-all-${brand}.scss
                [accentToken, webConfig.files[2].filter, false], // css/tokens_brand.css
                [accentToken, webConfig.files[3].filter, true], // css/tokens_accent.css
                [accentToken, webConfig.files[4].filter, false], // css/tokens_${brand}.css
            ])('should filter accent tokens only in accent_tokens.css', (token, filterFn, response) => {
                expect(filterFn(token)).toBe(response);
            });

            test.each([
                ['', webConfig.files[0].options.fileHeader, [`${brand} tokens`]],
                ['', webConfig.files[1].options.fileHeader, [`${brand}: all tokens`]],
                ['', webConfig.files[2].options.fileHeader, [`${brand}: all tokens`]],
                ['', webConfig.files[3].options.fileHeader, [`${brand}: accent tokens`]],
                [[{ color: 'red' }], webConfig.files[4].options.root, [{ color: 'red' }]],
            ])('should return correct headers', (token, filterHeaderFunction, response) => {
                expect(filterHeaderFunction(token)).toEqual(response);
            });
        });

        describe('getMixinSettings', () => {
            test('should return the correct configuration for mixins', () => {
                const mixins = allBuild.getMixinSettings();
                expect(mixins).toEqual({
                    basePxFontSize: 16,
                    prefix: 'cre8',
                    buildPath: 'lib/web/',
                    transformGroup: 'custom/web',
                    files: [
                        {
                            destination: 'mixins/typography-usage.scss',
                            format: 'scss/mixinFormat',
                            filter: expect.any(Function),
                            options: expect.any(Object),
                        },
                        {
                            destination: 'layouts/breakpoints.scss',
                            format: 'scss/variables',
                            filter: expect.any(Function),
                            options: expect.any(Object),
                        },
                    ],
                });
            });

            test('should define a filter function that filters tokens correctly', () => {
                const importedScssConfig = allBuild.getMixinSettings();
                const filterFunction = importedScssConfig.files[0].filter;
                const tokenToTest = {
                    type: 'typography',
                    attributes: {
                        category: 'abc',
                    },
                };
                expect(filterFunction(tokenToTest)).toBe(true);
            });

            test('should define a fileHeader function that returns the expected header', () => {
                const importedScssConfig = allBuild.getMixinSettings();
                const filterHeaderFunction = importedScssConfig.files[0].options.fileHeader;
                expect(filterHeaderFunction()).toEqual([
                    'Typography usage provided via mixins.',
                    'Typography applications are Tier 2 values that map',
                    'typography presets to high-level UI applications.',
                ]);
            });
        });

        describe('getSassVarToCSSVarConfig', () => {
            test('should return the correct configuration for sassVarToCSSVar', () => {
                const sassVarToCSSVar = allBuild.getSassVarToCSSVarConfig(brand);
                expect(sassVarToCSSVar).toEqual({
                    transformGroup: 'custom/scss',
                    prefix: 'cre8',
                    buildPath: 'lib/support/brands/pbm/',
                    files: [
                        {
                            destination: 'pbm-sass-support.scss',
                            format: 'support-scss/variables',
                            filter: expect.any(Function),
                            options: expect.any(Object),
                        },
                    ],
                });
            });

            test('should define a filter function that filters tokens correctly', () => {
                const importedScssConfig = allBuild.getSassVarToCSSVarConfig(brand);
                const filterFunction = importedScssConfig.files[0].filter;
                const tokenToTest = {
                    type: 'color',
                };
                expect(filterFunction(tokenToTest)).toBe(true);
            });

            test('should define a fileHeader function that returns the expected header', () => {
                const importedScssConfig = allBuild.getSassVarToCSSVarConfig(brand);
                const filterHeaderFunction = importedScssConfig.files[0].options.fileHeader;
                expect(filterHeaderFunction()).toEqual([
                    `Sass Variable Tokens to CSS Vars for ${brand} for backward compatible support`,
                ]);
            });
        });

        test('should return the correct configuration for reactNative', () => {
            const config = allBuild.getStyleDictionaryConfig(brand, tokenJson);
            const reactNative = config.platforms.reactNative;
            expect(reactNative).toEqual({
                basePxFontSize: 16,
                prefix: 'cre8',
                transformGroup: 'custom/react-native',
                buildPath: 'lib/react-native/brands/pbm/',
                files: [
                    { format: 'react-native/object', destination: 'tokens-brand.js' },
                    {
                        format: 'react-native/typescript-declarations',
                        destination: 'tokens-brand.d.ts',
                    },
                ],
            });
        });
    });

    describe('buildBrands', () => {
        test('calls style dictionary for each brand/platform combo', async () => {
            const brands = ['abc', 'xyz'];
            const platforms = allBuild.getPlatforms();

            const reformatJsonSpy = jest.spyOn(allBuild, 'reformatBrandTokenJson')
                .mockImplementation(() => {});
            const getConfigSpy = jest.spyOn(allBuild, 'getStyleDictionaryConfig')
                .mockImplementation(() => {});
            const buildPlatform = jest.fn();
            StyleDictionary.extend.mockReturnValue({ buildPlatform });

            await allBuild.buildBrands(brands);

            expect(StyleDictionary.extend).toHaveBeenCalledTimes(brands.length);
            expect(buildPlatform).toHaveBeenCalledTimes(brands.length * platforms.length);

            reformatJsonSpy.mockRestore();
            getConfigSpy.mockRestore();
        });
    });

    describe('buildCobrands', () => {
        test('calls style dictionary for each cobrand', async () => {
            const cobrandFiles = ['cobrand.json', 'ers.json', 'trs.json'];
            const readFileOutput = '{\n'
                + '  "_base": {\n'
                + '      "blue": {\n'
                + '          "10": {\n'
                + '              "value": "#eff8fc",\n'
                + '              "type": "color"\n'
                + '          }\n'
                + '      }\n'
                + '  },\n'
                + '  "bg": {\n'
                + '      "brand": {\n'
                + '          "value": "{_base.blue.10}",\n'
                + '          "type": "color"\n'
                + '      }\n'
                + '  }\n'
                + '}\n';

            const buildAllPlatforms = jest.fn();
            StyleDictionary.extend.mockReturnValue({ buildAllPlatforms });
            fs.readdirSync.mockReturnValue(cobrandFiles);
            fs.readFileSync.mockReturnValue(readFileOutput);

            await allBuild.buildCobrands();
            cobrandFiles.forEach((file) => expect(fs.readFileSync)
                .toHaveBeenCalledWith(`./tokens/cobrands/${file}`, 'utf8'));
            expect(StyleDictionary.extend).toHaveBeenCalledTimes(cobrandFiles.length);
        });
    });

    describe('main', () => {
        test('when building succeeds', async () => {
            const brandsSpy = jest.spyOn(allBuild, 'buildBrands')
                .mockImplementation(() => Promise.resolve({}));
            const cobrandsSpy = jest.spyOn(allBuild, 'buildCobrands')
                .mockImplementation(() => Promise.resolve({}));
            const indexSpy = jest.spyOn(allBuild, 'createReactNativeIndex')
                .mockImplementation(() => Promise.resolve({}));

            const brands = ['abc', 'xyz'];
            await allBuild.main(brands);

            expect(allBuild.buildBrands).toBeCalledWith(brands);
            expect(allBuild.buildCobrands).toBeCalled();
            expect(allBuild.createReactNativeIndex).toBeCalled();
            expect(logSpy).toBeCalledWith('Build complete!');

            brandsSpy.mockRestore();
            cobrandsSpy.mockRestore();
            indexSpy.mockRestore();
        });

        test('when building fails', async () => {
            const brands = ['abc', 'xyz'];
            const brandsSpy = jest.spyOn(allBuild, 'buildBrands')
                .mockImplementationOnce(() => Promise.reject(new Error('file not found')));
            const indexSpy = jest.spyOn(allBuild, 'createReactNativeIndex')
                .mockImplementationOnce(() => Promise.resolve({}));
            const exitSpy = jest.spyOn(process, 'exit')
                .mockImplementationOnce(() => {});

            await allBuild.main(brands);

            expect(exitSpy).toBeCalledWith(1);

            brandsSpy.mockRestore();
            indexSpy.mockRestore();
            exitSpy.mockRestore();
        });
    });

    describe('isTokenTypeNotTypographyAndFontFiles', () => {
        test('no supported token type should return false', () => {
            const tokenTypes = ['typography', 'fontFiles'];
            tokenTypes.forEach((type) => {
                expect(allBuild.isTokenTypeNotTypographyAndFontFiles(type)).toBeFalsy();
            });
        });

        test('should return true for valid token types', () => {
            const tokenTypes = ['color', 'spacing'];
            tokenTypes.forEach((type) => {
                expect(allBuild.isTokenTypeNotTypographyAndFontFiles(type)).toBeTruthy();
            });
        });
    });
});
