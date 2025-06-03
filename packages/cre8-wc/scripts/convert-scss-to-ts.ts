import fs from 'fs';
import path from 'path';

// Use the correct baseDir relative to this script's location
const baseDir = path.join(__dirname, '../components');

function walk(dir: string, callback: (file: string) => void): void {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      walk(fullPath, callback);
    } else if (dirent.isFile() && dirent.name.endsWith('.scss')) {
      callback(fullPath);
    }
  });
}

walk(baseDir, (scssPath) => {
  const tsPath = scssPath.replace(/\.scss$/, '.ts');
  const scssContent = fs.readFileSync(scssPath, 'utf8');
  const tsContent =
    `import { css } from 'lit';\nconst styles = css\`` +
    scssContent.replace(/`/g, '\`') +
    `\`;\nexport default styles;\n`;
  fs.writeFileSync(tsPath, tsContent, 'utf8');
  console.log(`Converted: ${scssPath} -> ${tsPath}`);
});
