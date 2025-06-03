"use strict";
const fs = require("fs");
const path = require("path");
// Use the correct baseDir relative to this script's location
const baseDir = path.join(__dirname, '../.storybook/patterns');
function walk(dir, callback) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(function (dirent) {
        const fullPath = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
            walk(fullPath, callback);
        }
        else if (dirent.isFile() && dirent.name.endsWith('.scss')) {
            callback(fullPath);
        }
    });
}
walk(baseDir, function (scssPath) {
    const tsPath = scssPath.replace(/\.scss$/, '.ts');
    const scssContent = fs.readFileSync(scssPath, 'utf8');
    const tsContent = "import { css } from 'lit';\nconst styles = css`" +
        scssContent.replace(/`/g, '\`') +
        "`;\nexport default styles;\n";
    fs.writeFileSync(tsPath, tsContent, 'utf8');
    console.log("Converted: " + scssPath + " -> " + tsPath);
});
