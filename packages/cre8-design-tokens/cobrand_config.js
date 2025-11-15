const cobrandConfig = (cobrand) => ({
    basePxFontSize: 16,
    prefix: 'cre8',
    transformGroup: 'custom/web',
    buildPath: 'lib/web/cobrands/',
    files: [{
        destination: `${cobrand}.css`,
        format: 'css/variables',
        filter: (token) => (token.attributes.category !== '_base'),
        options: {
            fileHeader: () => [`${cobrand} tokens`],
        },
    }],
});

module.exports = {
    cobrandConfig,
};
