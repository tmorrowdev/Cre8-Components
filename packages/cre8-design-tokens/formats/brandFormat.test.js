const StyleDictionary = require('style-dictionary');
const brandFormat = require('./brandFormat.js');

describe('brandFormat', () => {
    beforeAll(() => {
        jest.spyOn(StyleDictionary, 'registerFormat').mockImplementation();
        brandFormat(StyleDictionary);
    });
    const getBrandFormat = (name) => {
        const mockCalls = StyleDictionary.registerFormat.mock.calls;
        return mockCalls.filter(([transform]) => transform.name === name)[0][0];
    };

    describe('font-face', () => {
        let fontFaceFormat;
        let sampleAllTokens;
        beforeAll(() => {
            fontFaceFormat = getBrandFormat('font-face');
            sampleAllTokens = {
                allTokens: [{
                    value: 'fonts/rubik-v4-latin-300',
                    formats: ['woff2', 'woff'],
                    name: 'normal',
                    attributes: {
                        category: 'asset',
                        type: 'font',
                        family: 'Rubik',
                        weight: '300',
                        style: 'normal',
                    },
                    path: ['asset', 'font', 'Rubik', '300', 'normal'],
                },
                ],
            };
        });

        test('looks for fontPathPrefix in options', () => {
            const tokenWithOptions = {
                dictionary: sampleAllTokens,
                options: {
                    fontPathPrefix: '../static/',
                },
            };
            const fontFaceFormatPrefix = fontFaceFormat.formatter(tokenWithOptions);
            expect(fontFaceFormatPrefix).toContain('../static/');
        });

        test('provides default for fontPathPrefix if not provided in options', () => {
            const tokenWithOutOptions = {
                dictionary: sampleAllTokens,
                options: {},
            };
            const fontFaceFormatNoPrefix = fontFaceFormat.formatter(tokenWithOutOptions);
            expect(fontFaceFormatNoPrefix).toContain('../');
        });

        test('builds a css url path format based on token attributes', () => {
            const tokenWithOutOptions = {
                dictionary: sampleAllTokens,
                options: {},
            };
            const fontFaceFormatUrl = fontFaceFormat.formatter(tokenWithOutOptions);
            expect(fontFaceFormatUrl).toContain('url(\'../fonts/rubik-v4-latin-300.woff\') format(\'woff\')');
        });

        test('has the @font-face format in generated file', () => {
            const tokenWithOptions = {
                dictionary: sampleAllTokens,
                options: {
                    fontPathPrefix: '../static/',
                },
            };
            const fontFace = `@font-face {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 300;
                src: url('../static/fonts/rubik-v4-latin-300.woff2') format('woff2'),
                    url('../static/fonts/rubik-v4-latin-300.woff') format('woff');
                font-display: fallback;
            }`;

            const fontFaceDeclaration = fontFaceFormat.formatter(tokenWithOptions);
            expect(fontFaceDeclaration.replace(/\s/g, '')).toContain(fontFace.replace(/\s/g, ''));
        });
    });

    describe('scss/mixinFormat', () => {
        let mixinFormat;
        let mockAllTokens;
        beforeAll(() => {
            mixinFormat = getBrandFormat('scss/mixinFormat');
            mockAllTokens = [
                {
                    value: {
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: '700',
                        lineHeight: 1.1300000000000001,
                        fontSize: '4rem',
                        letterSpacing: '-1.5',
                        paragraphSpacing: '0',
                        paragraphIndent: '0px',
                        textCase: 'none',
                        textDecoration: 'none',
                    },
                    type: 'typography',
                    name: 'cre8-test-display-default',
                },
            ];
        });

        test('mixin name contains token type of `typography`', () => {
            const tokensForMixins = {
                dictionary: {
                    allTokens: mockAllTokens,
                },
            };
            const mixinNameFormat = mixinFormat.formatter(tokensForMixins);
            expect(mixinNameFormat).toContain('@mixin cre8-typography-test-display-default');
        });

        test('breakpoints are imported into file', () => {
            const tokensForMixins = {
                dictionary: {
                    allTokens: mockAllTokens,
                },
            };
            const imported = "@import '../layouts/breakpoints.scss';";
            expect(mixinFormat.formatter(tokensForMixins)).toContain(imported);
        });

        test('mixin properties contain typography declarations', () => {
            const tokensForMixins = {
                dictionary: {
                    allTokens: mockAllTokens,
                },
            };
            const mixinProperties = mixinFormat.formatter(tokensForMixins);
            expect(mixinProperties)
                .toContain('font-family: var(--cre8-typography-test-display-default-font-family)');
            expect(mixinProperties)
                .toContain('font-size: var(--cre8-typography-test-display-default-font-size)');
            expect(mixinProperties)
                .toContain('font-weight: var(--cre8-typography-test-display-default-font-weight)');
            expect(mixinProperties)
                .toContain('line-height: var(--cre8-typography-test-display-default-line-height)');
            expect(mixinProperties)
                .toContain('text-decoration: var(--cre8-typography-test-display-default-text-decoration)');
            expect(mixinProperties)
                .toContain('text-transform: var(--cre8-typography-test-display-default-text-transform)');
        });
    });

    describe('scss/brandWithGlobals', () => {
        let importFormat;
        beforeAll(() => {
            importFormat = getBrandFormat('scss/brandWithGlobals');
        });
        test('token keys should convert to imports and print help message on top', () => {
            const token = {
                dictionary: {
                    tokens: {
                        testOne: 'testOneValue',
                        testTwo: 'testTwoValue',
                    },
                },
                file: 'abc',
            };
            const formattedText = importFormat.formatter(token);
            expect(formattedText).toContain('@import \'./testOne.scss\'');
            expect(formattedText).toContain('@import \'./testTwo.scss\'');
        });
    });
    describe('support-scss/variables', () => {
        let varFormat;
        beforeAll(() => {
            varFormat = getBrandFormat('support-scss/variables');
        });
        test('should print short comments and map token names variables', () => {
            const token = {
                dictionary: {
                    allTokens: [
                        {
                            name: 'pbm',
                        },
                        {
                            name: 'tcg',
                        },
                    ],
                },
                file: 'abc',
            };
            const formattedVariables = varFormat.formatter(token);

            expect(formattedVariables).toContain('$pbm: var(--pbm);');
            expect(formattedVariables).toContain('$tcg: var(--tcg);');
        });
    });
    describe('css/typography', () => {
        let varFormat;
        beforeAll(() => {
            varFormat = getBrandFormat('css/typography');
        });
        test('should convert typography tokens', () => {
            const dictionary = {
                allTokens: [
                    {
                        name: 'cre8-base-12',
                        original: {
                            value: {
                                fontFamily: '{fontFamilies.value-serif-pro}',
                                fontWeight: '{fontWeights.value-serif-pro-0}',
                                lineHeight: '{lineHeights.0}',
                                fontSize: '{fontSize.11}',
                                letterSpacing: '{letterSpacing.0}',
                                paragraphSpacing: '{paragraphSpacing.0}',
                                paragraphIndent: '{paragraphIndent.0}',
                                textCase: '{textCase.none}',
                                textDecoration: '{textDecoration.none}',
                            },
                        },
                        type: 'font-size',
                    },
                ],
            };
            const config = {
                prefix: 'cre8',
                options: {
                    brand: 'pbm',
                },
            };

            const file = {
                options: {
                    import: ['./tokens_brand.css', './fonts.css'],
                },
            };

            const typographyVariables = varFormat.formatter(dictionary, config, file);
            const shortCommentsMatch = /:root{/;
            expect(typographyVariables)
                .toContain("@import './tokens_brand.css';");
            expect(typographyVariables)
                .toContain("@import './fonts.css';");
            expect(typographyVariables)
                .toContain('--cre8-font-size-base-12-font-family: var(--cre8-font-families-value-serif-pro);');
            expect(typographyVariables)
                .toContain('--cre8-font-size-base-12-font-size: var(--cre8-font-size-11);');
            expect(typographyVariables)
                .toContain('--cre8-font-size-base-12-font-weight: var(--cre8-font-weights-value-serif-pro-0);');
            expect(typographyVariables)
                .toContain('--cre8-font-size-base-12-line-height: var(--cre8-line-heights-0);');
            expect(typographyVariables)
                .toContain('--cre8-font-size-base-12-text-decoration: var(--cre8-text-decoration-none);');
            expect(typographyVariables)
                .toContain('--cre8-font-size-base-12-text-transform: var(--cre8-text-case-none);}');
            expect(typographyVariables).toMatch(shortCommentsMatch);
        });
    });
    describe('react-native/typescript-declarations', () => {
        let varFormat;
        beforeAll(() => {
            varFormat = getBrandFormat('react-native/typescript-declarations');
        });
        test('map token name and value type and should exclude tokens starts with cre8-base', () => {
            const token = {
                dictionary: {
                    allTokens: [
                        {
                            name: 'active',
                            value: '#333333',
                        },
                        {
                            name: 'content-pressed',
                            value: 2,
                        },
                        {
                            name: 'cre8-base-bg',
                            value: 'red',
                        },
                        {
                            name: 'color',
                            value: { fontFamily: 'abc' },
                        },
                    ],
                },
                file: 'abc',
            };
            const mappedTokenNameValues = varFormat.formatter(token);
            expect(mappedTokenNameValues).toContain('\'active\': string;');
            expect(mappedTokenNameValues).toContain('\'content-pressed\': number;');
            expect(mappedTokenNameValues).toContain('\'color\': TextStyle;');
            expect(mappedTokenNameValues).not.toContain('\'cre8-base-bg\': string;');
        });
    });
    describe('react-native/object', () => {
        let varFormat;
        beforeAll(() => {
            varFormat = getBrandFormat('react-native/object');
        });
        test('mapping token object', () => {
            const token = {
                dictionary: {
                    allTokens: [
                        {
                            name: 'active',
                            value: '#333333',
                        },
                        {
                            name: 'content-pressed',
                            value: 2,
                        },
                        {
                            name: 'cre8-base-bg',
                            value: 'red',
                        },
                        {
                            name: 'color',
                            value: '#333',
                        },
                    ],
                },
                file: 'abc',
            };
            const mappedTokenObject = varFormat.formatter(token);
            expect(mappedTokenObject)
                .toContain('module.exports = { active: \'#333333\', \'content-pressed\': 2, color: \'#333\' }');
        });
    });
});
