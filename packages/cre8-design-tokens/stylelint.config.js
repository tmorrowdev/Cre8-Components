const config = require('@esi/stylelint-config');

// "No `autoFix` function provided, consider using `disableFix` for "scale-unlimited/declaration-strict-value""
config.rules['scale-unlimited/declaration-strict-value'][1].disableFix = true;

module.exports = config;

