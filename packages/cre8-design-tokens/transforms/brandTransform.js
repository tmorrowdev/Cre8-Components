/* eslint-disable max-statements */
const _ = require('lodash');
const { parseToRgba } = require('color2k');

const unitless = (value) => {
    if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        return Number.isNaN(parsedValue) ? value : parsedValue;
    }
    return value;
};

// Recreating sd-transform of HexRGBA due to that package's current instability, replace when stable
// Requires color2k to be installed to use parseToRgba
// https://github.com/tokens-studio/sd-transforms/blob/v0.13.4/src/css/transformHEXRGBa.ts
const hexRGBAForCSS = (value) => {
    if (value === undefined) {
        return value;
    }

    const regex = /rgba\(\s*(?<hex>#.+?)\s*,\s*(?<alpha>\d*(\.\d*|%)*)\s*\)/g;

    return value.replace(regex, (match, hex, alpha) => {
        try {
            const [r, g, b] = parseToRgba(hex);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } catch (e) {
            console.warn(`Tried parsing "${hex}" as a hex value, but failed.`);
            return match;
        }
    });
};

// TODO: Modularize the transforms so that this export isn't breaking max statements
module.exports = (StyleDictionary) => {
    // Register our custom transform that's pulled from ts/color/css/hexrgba
    // We currently only want to match tokens that are base opacity tokens
    // Example Path: path: [ '_base', 'opacity', 'neutral-75' ]
    StyleDictionary.registerTransform({
        name: 'web/hexrgba', // renamed with our namespace
        type: 'value',
        transitive: true,
        matcher: (token) => (token.path.includes('opacity') && token.path.includes('_base')),
        transformer: (token) => hexRGBAForCSS(token.value),
    });

    // Register an "attribute" transform to codify the font's details
    // as named attributes.
    // Ref: https://github.com/amzn/style-dictionary/tree/main/examples/advanced/font-face-rules
    StyleDictionary.registerTransform({
        name: 'attribute/font',
        type: 'attribute',
        transformer: (prop) => ({
            category: prop.path[0],
            type: prop.path[1],
            family: prop.path[2],
            weight: prop.path[3],
            style: prop.path[4],
        }),
    });


    StyleDictionary.registerTransform({
        name: 'size/convertPxToRem', // Name used in the registered transform group
        type: 'value',
    // TODO: We need to refactor this function to pass linting,
    // as it returns an assignment that was always truthy, but also still does what it should do.
    // Disabling now to follow up later.
    // This should match only if a token's attribute type is either 'fontSize' or 'spacing'
    // so that those tokens can have their 'px' values transformed to using 'rem' units

        matcher: (token) => token.type === 'fontSizes'
      || token.type === 'spacing'
      || token.type === 'borderWidth',
        transformer: (token, configs) => {
            let tokenValue = token.value;
            const baseFontSize = configs.basePxFontSize;

      // Safety check to only do this if value ends in `px`
            if (_.isString(tokenValue) && tokenValue.endsWith('px')) {
                const number = tokenValue.replace('px', '');
                tokenValue = number / baseFontSize;
                return `${tokenValue}rem`;
            }
            return `${tokenValue / baseFontSize}rem`;
        },
    });
    StyleDictionary.registerTransform({
        name: 'name/cre8Format', // Name used in the registered transform group
        type: 'name',
        transformer: (token) => {
            if (token.path[0] === '_base' && token.type === 'color') {
                return token.name.replace('base', `base-${token.type}`);
            }
            if (token.type === 'color') {
                return token.name.replace('-', `-${token.type}-`);
            }
            return token.name;
        },
    });
    StyleDictionary.registerTransform({
        name: 'lineHeights/percentageToUnitless',
        type: 'value',
        matcher: (token) => token.type === 'lineHeights',
        transformer: (token) => {
      // converting lineHeight percentages into unitless values

            const val = token.value.toString().substr(0, 3);
            return val * 0.01;
        },
    });
    StyleDictionary.registerTransform({
        name: 'name/cre8FormatJs', // Name used in the registered transform group
        type: 'name',

        transformer: (token) => {
            if (
                token.path[0] === '_base'
        && token.type === 'color') {
                return token.name.replace('Base', `Base${_.capitalize(token.type)}`);
            }
            if (token.type === 'color' || token.type === 'typography') {
        // Ex: cre8ContentSubtle needs to be cre8ColorContentSubtle
        // Find the first part of the name (minus prefix)
        // and check for that to add token type to it
                const firstPartOfName = _.capitalize(token.attributes.category);
                return token.name.replace(
                    firstPartOfName,
                    `${_.capitalize(token.type)}${firstPartOfName}`
                );
            }

            return token.name;
        },
    });

    StyleDictionary.registerTransform({
        name: 'rn/unitlessValues',
        type: 'value',
        transformer: (token) => {
            const tokenValue = token.value;
            if (token.type === 'fontWeights') {
                return unitless(tokenValue).toString();
            }
            if (['letterSpacing', 'lineHeights'].includes(token.type)) {
                if (tokenValue.toString().endsWith('%')) {
                    return unitless(tokenValue) * 0.01;
                }
                return unitless(tokenValue);
            }
            if (
                [
                    'fontSizes',
                    'borderWidths',
                    'spacing',
                    'dimension',
                    'borderRadius',
                    'paragraphSpacing',
                    'borderWidth',
                ].includes(token.type)
            ) {
                return unitless(tokenValue);
            }
            return tokenValue;
        },
    });

    StyleDictionary.registerTransform({
        name: 'rn/typographyValue',
        type: 'value',
        transitive: true,
        matcher: (token) => token.type === 'typography' && token.name.indexOf('cre8-base-') !== 0,
        transformer: (token) => {
            const {
                fontFamily,
                fontWeight,
                fontSize,
                letterSpacing,
                lineHeight,
                textCase,
                textDecoration,
            } = token.value;

            const computedLineHeight = lineHeight * fontSize;
            const roundedLineHeight = Math.round((computedLineHeight + Number.EPSILON) * 100) / 100;

            return {
                fontFamily,
                fontWeight,
                fontSize,
                letterSpacing,
                lineHeight: roundedLineHeight,
                textTransform: textCase,
                textDecorationLine: textDecoration,
            };
        },
    });

    StyleDictionary.registerTransform({
        name: 'rn/shadow',
        type: 'value',
        matcher: (token) => token.type === 'boxShadow',
        transformer: (token) => {
            if (token.value === 'none') return undefined;
            const isString = typeof token.value === 'string';
            const tokenValue = isString ? token.value.split(' ') : token.value;

            const w = unitless(isString ? tokenValue[0] : tokenValue.x);
            const h = unitless(isString ? tokenValue[1] : tokenValue.y);
            const rad = isString ? tokenValue[2] : tokenValue.blur;
            const col = isString ? tokenValue[4] : tokenValue.color;

            return {
                shadowOpacity: 1,
                shadowOffset: { width: w, height: h },
                elevation: Math.ceil(Math.max(w, h) / 3),
                shadowRadius: unitless(rad),
                shadowColor: col,
            };
        },
    });
  // We're using the custom "size/convertPxToRem" declared above
  // instead of "size/px" for our custom declared transformGroups.
  // Note that ordering matters when it comes to transforms

  // Custom replacement for "css"
    StyleDictionary.registerTransformGroup({
        name: 'custom/css',
        transforms: [
            'attribute/cti',
            'name/cti/kebab',
            'name/cre8Format',
            'time/seconds',
            'content/icon',
            'size/convertPxToRem',
            'lineHeights/percentageToUnitless',
            'color/css',
        ],
    });

  // Custom replacement for "scss"
    StyleDictionary.registerTransformGroup({
        name: 'custom/scss',
        transforms: [
            'attribute/cti',
            'name/cti/kebab',
            'name/cre8Format',
            'time/seconds',
            'content/icon',
            'size/convertPxToRem',
            'lineHeights/percentageToUnitless',
            'color/css',
        ],
    });

  // Custom replacement for "web"
    StyleDictionary.registerTransformGroup({
        name: 'custom/web',
        transforms: [
            'attribute/cti',
            'name/cti/kebab',
            'name/cre8Format',
            'size/convertPxToRem',
            'lineHeights/percentageToUnitless',
            'color/css',
            'web/hexrgba',
        ],
    });

  // Custom replacement for "react-native"
    StyleDictionary.registerTransformGroup({
        name: 'custom/react-native',
        transforms: [
            'name/cti/kebab',
            'name/cre8Format',
            'rn/shadow',
            'rn/typographyValue',
            'rn/unitlessValues',
            'color/css',
        ],
    });
};
