/* eslint-disable no-console */
const fs = require('fs-extra');

module.exports = (StyleDictionary) => {
    StyleDictionary.registerAction({
        name: 'copy_brand_assets',
        do(dictionary, config) {
            if (fs.existsSync(`assets/fonts/${config.options.brand}`)) {
                console.log('Copying brand assets directory', config.buildPath);
                fs.copySync(`assets/fonts/${config.options.brand}`, `${config.buildPath}assets/fonts`);
            } else {
                console.log('Brand assets directory does not exist. Skipping.');
            }
        },
        undo(dictionary, config) {
            console.log('Cleaning brand assets directory');
            fs.removeSync(`${config.buildPath}assets`);
        },
    });
};
