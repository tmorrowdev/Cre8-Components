const StyleDictionary = require('style-dictionary');
const brandTransForm = require('./brandTransform.js');

describe('brandTransform', () => {
    const basePxFontSize = 16;
    const getTransformer = (type) => {
        const mockCalls = StyleDictionary.registerTransform.mock.calls;
        return mockCalls.filter(([transform]) => transform.name === type)[0][0];
    };

    beforeAll(() => {
        jest.spyOn(StyleDictionary, 'registerTransform').mockImplementation();
        jest.spyOn(StyleDictionary, 'registerTransformGroup').mockImplementation();
        brandTransForm(StyleDictionary);
    });

    describe('web/hexrgba', () => {
        let hexRGBATransform;
        beforeAll(() => {
            hexRGBATransform = getTransformer('web/hexrgba');
        });
        test('tokens should contain RGBA format instead of hex when transformed', () => {
            const token = {
                value: 'rgba(#2d2d2d,0.25)',
                original: { value: 'rgba({_base.neutral.100},0.25)', type: 'color' },
                path: ['_base', 'opacity', 'neutral-25'],
            };
            const result = hexRGBATransform.transformer(token);
            expect(result).toBe('rgba(45, 45, 45, 0.25)');
        });
        test('transform only matches for `base/opacity` tokens', () => {
            const token = {
                value: '#eff8fc',
                original: { value: '#eff8fc', type: 'color' },
                path: ['_base', 'blue', '10'],
            };
            const result = hexRGBATransform.transformer(token);
            const matcher = hexRGBATransform.matcher(token);
            expect(matcher).toBe(false);
            expect(result).toBe('#eff8fc');
        });
    });

    describe('attribute/font', () => {
        let fontAttributeTransform;
        beforeAll(() => {
            fontAttributeTransform = getTransformer('attribute/font');
        });
        test('token should include font attribute if path contains asset', () => {
            const token = {
                path: ['asset', 'font', 'Rubik', '300', 'normal'],
            };
            const fontAttributes = fontAttributeTransform.transformer(token);
            expect(fontAttributes).toEqual(
                {
                    category: 'asset',
                    type: 'font',
                    family: 'Rubik',
                    weight: '300',
                    style: 'normal',
                }
            );
        });
    });

    describe('sizeConvertToPxRem', () => {
        let convertPxTransform;
        beforeAll(() => {
            convertPxTransform = getTransformer('size/convertPxToRem');
        });
        test('should transform fontSizes correctly', () => {
            const token = { type: 'fontSizes', value: '32px' };
            const result = convertPxTransform.transformer(token, { basePxFontSize });
            expect(result).toBe('2rem');
        });
        test('should transform spacing correctly', () => {
            const token = { type: 'spacing', value: '16px' };
            const result = convertPxTransform.transformer(token, { basePxFontSize });
            expect(result).toBe('1rem');
        });
        test('should transform borderWidth correctly', () => {
            const token = { type: 'borderWidth', value: '4px' };
            const result = convertPxTransform.transformer(token, { basePxFontSize });
            expect(result).toBe('0.25rem');
        });
        test('token is not string, should return correct rem value', () => {
            const token = { type: 'spacing', value: 16 };
            const result = convertPxTransform.transformer(token, { basePxFontSize });
            expect(result).toBe('1rem');
        });
        test('matcher should return true', () => {
            const supportedTypes = ['fontSizes', 'spacing', 'borderWidth'];
            supportedTypes.forEach((type) => {
                const token = { type, value: 16 };
                const matcher = convertPxTransform.matcher(token);
                expect(matcher).toBe(true);
            });
        });
        test('unsupported token type, matcher should return false', () => {
            const token = { type: 'test', value: 16 };
            const matcher = convertPxTransform.matcher(token);
            expect(matcher).toBe(false);
        });
    });
    describe('cre8Format', () => {
        let cre8Transform;
        beforeAll(() => {
            cre8Transform = getTransformer('name/cre8Format');
        });
        test('should format base color token names by appending token.type', () => {
            const token = {
                path: ['_base'],
                type: 'color',
                name: 'color-base',
            };
            const transformedName = cre8Transform.transformer(token);
            expect(transformedName).toBe('color-base-color');
        });
        test('token type color, include color in the token name in the middle', () => {
            const token = {
                path: [''],
                type: 'color',
                name: 'button-base',
            };
            const transformedName = cre8Transform.transformer(token);
            expect(transformedName).toBe('button-color-base');
        });
        test('should not format the non-color token names', () => {
            const token = {
                path: [''],
                type: 'border',
                name: 'button-base',
            };
            const transformedName = cre8Transform.transformer(token);
            expect(transformedName).toBe('button-base');
        });
    });
    describe('ConvertLineHeightPercentageToUnitless', () => {
        let convertTransform;
        beforeAll(() => {
            convertTransform = getTransformer('lineHeights/percentageToUnitless');
        });
        test('should convert the token value to decimal', () => {
            const token = { value: 50 };
            const convertedValue = convertTransform.transformer(token);
            expect(convertedValue).toBe(0.5);
        });
        test('should consider only first 3 digits of a number or string value', () => {
            const token = { value: '50000' };
            const convertedValue = convertTransform.transformer(token);
            expect(convertedValue).toBe(5);
        });
        test('token type lineHeights, matcher should return true', () => {
            const token = { type: 'lineHeights' };
            const matcher = convertTransform.matcher(token);
            expect(matcher).toBe(true);
        });
    });
    describe('cre8FormatCapitalize', () => {
        let cre8CapitalTransform;
        beforeAll(() => {
            cre8CapitalTransform = getTransformer('name/cre8FormatJs');
        });
        test('should capitalize the base color token names', () => {
            const token = {
                path: ['_base'],
                type: 'color',
                name: 'bg-Base',
            };
            const transformedName = cre8CapitalTransform.transformer(token);
            expect(transformedName).toBe('bg-BaseColor');
        });
        test('should append the token type if the category is part of the name for color token', () => {
            const token = {
                path: [''],
                type: 'color',
                name: 'cre8ContentSubtle',
                attributes: {
                    category: 'content',
                },
            };
            const transformedName = cre8CapitalTransform.transformer(token);
            expect(transformedName).toBe('cre8ColorContentSubtle');
        });
        test('should append the token type if the category is part of the name for typography token', () => {
            const token = {
                path: [''],
                type: 'typography',
                name: 'cre8ContentSubtle',
                attributes: {
                    category: 'content',
                },
            };
            const transformedName = cre8CapitalTransform.transformer(token);
            expect(transformedName).toBe('cre8TypographyContentSubtle');
        });
        test('should return the input token name if token type is not color or typography', () => {
            const token = {
                path: [''],
                type: 'test',
                name: 'cre8ContentSubtle',
                attributes: {
                    category: 'content',
                },
            };
            const transformedName = cre8CapitalTransform.transformer(token);
            expect(transformedName).toBe('cre8ContentSubtle');
        });
    });
    describe('unitLessvalues', () => {
        let unitLessTransform;
        beforeAll(() => {
            unitLessTransform = getTransformer('rn/unitlessValues');
        });
        test('token type fontWeights should remove units from the token value', () => {
            const token = {
                type: 'fontWeights',
                value: '16px',
            };
            const transformedTokenValue = unitLessTransform.transformer(token);
            expect(transformedTokenValue).toBe('16');
        });
        test('token type lineHeights and unit should convert from percentage to unitless', () => {
            const token = {
                type: 'lineHeights',
                value: '4%',
            };
            const transformedTokenValue = unitLessTransform.transformer(token);
            expect(transformedTokenValue).toBe(0.04);
        });
        test('token types letterSpacing and lineHeights percentage values should convert to actual values', () => {
            const tokenTypes = ['letterSpacing', 'lineHeights'];
            tokenTypes.forEach((item) => {
                const token = {
                    type: item,
                    value: '4%',
                };
                const transformedTokenValue = unitLessTransform.transformer(token);
                expect(transformedTokenValue).toBe(0.04);
            });
        });
        test('token types letterSpacing and lineHeights non percentage values should remove unit type', () => {
            const tokenTypes = ['letterSpacing', 'lineHeights'];
            tokenTypes.forEach((item) => {
                const token = {
                    type: item,
                    value: 8,
                };
                const transformedTokenValue = unitLessTransform.transformer(token);
                expect(transformedTokenValue).toBe(8);
            });
        });
        test('should return the unit less values for multiple token types', () => {
            const tokenTypes = [
                'fontSizes',
                'borderWidths',
                'spacing',
                'dimension',
                'borderRadius',
                'paragraphSpacing',
                'borderWidth',
            ];
            tokenTypes.forEach((item) => {
                const token = {
                    type: item,
                    value: '8px',
                };
                const transformedTokenValue = unitLessTransform.transformer(token);
                expect(transformedTokenValue).toBe(8);
            });
        });
        test('should return actual token value if not match the un supported token type,', () => {
            const token = {
                type: 'test',
                value: 4,
            };
            const transformedTokenValue = unitLessTransform.transformer(token);
            expect(transformedTokenValue).toBe(4);
        });
        test('token contains string value it should return the same string', () => {
            const token = {
                type: 'fontSizes',
                value: 'abc',
            };
            const transformedTokenValue = unitLessTransform.transformer(token);
            expect(transformedTokenValue).toBe('abc');
        });
    });
    describe('typographyValue', () => {
        let typographyTransform;
        beforeAll(() => {
            typographyTransform = getTransformer('rn/typographyValue');
        });
        test('lineHeight should be re-calculated for typography tokens', () => {
            const token = {
                type: 'typography',
                name: 'cre8-base-content-color',
                value: {
                    fontFamily: 'Rubik',
                    fontWeight: 'Bold',
                    fontSize: 12,
                    letterSpacing: 1,
                    lineHeight: 8,
                    textCase: 'Upper',
                    textDecoration: 'UnderLine',
                },
            };
            const transformedValue = typographyTransform.transformer(token);
            expect(transformedValue).toEqual(
                {
                    fontFamily: 'Rubik',
                    fontWeight: 'Bold',
                    fontSize: 12,
                    letterSpacing: 1,
                    lineHeight: 96,
                    textTransform: 'Upper',
                    textDecorationLine: 'UnderLine',
                }
            );
        });
        test('token type typography and name not starting with cre8-base-, matcher should return true', () => {
            const token = { type: 'typography', name: 'content-bg-color' };
            const matcher = typographyTransform.matcher(token);
            expect(matcher).toBe(true);
        });
        test('token type typography and name starting with cre8-base-, matcher should return false', () => {
            const token = { type: 'typography', name: 'cre8-base-color' };
            const matcher = typographyTransform.matcher(token);
            expect(matcher).toBe(false);
        });
    });
    describe('boxShadow', () => {
        let boxShadowTransform;
        beforeAll(() => {
            boxShadowTransform = getTransformer('rn/shadow');
        });
        test('should transform box shadow values', () => {
            const token = {
                value: '12px 10px 2px 4px red',
            };
            const shadowTransformedValue = boxShadowTransform.transformer(token);
            expect(shadowTransformedValue).toEqual(
                {
                    shadowOffset: { width: 12, height: 10 },
                    shadowColor: 'red',
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    elevation: 4,
                }
            );
        });
        test('token value is none should return undefined result', () => {
            const token = {
                value: 'none',
            };
            const shadowTransformedValue = boxShadowTransform.transformer(token);
            expect(shadowTransformedValue).toBeUndefined();
        });
        test('token value is object should return mapping token object', () => {
            const token = {
                value: {
                    x: 12,
                    y: 10,
                    color: 'red',
                    blur: '2px',
                },
            };
            const shadowTransformedValue = boxShadowTransform.transformer(token);
            expect(shadowTransformedValue).toEqual(
                {
                    shadowOffset: { width: 12, height: 10 },
                    shadowColor: 'red',
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    elevation: 4,
                }
            );
        });
        test('token type boxShadow matcher should return true', () => {
            const token = {
                type: 'boxShadow',
                value: '12px 10px 2px 4px red',
            };
            const matcher = boxShadowTransform.matcher(token);
            expect(matcher).toBe(true);
        });
    });
});
