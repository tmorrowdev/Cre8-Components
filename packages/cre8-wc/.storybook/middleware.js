const fs = require('fs');
const path = require('path');

const touch = (file) => {
  const time = new Date();

  try {
    fs.utimesSync(file, time, time);
  } catch (err) {
    fs.closeSync(fs.openSync(file, 'w'));
  }
}

module.exports = router => {
  router.get('/set-theme', (req, res, next) => {
    let node_modules = path.resolve(process.cwd(), 'node_modules');
    const cacheDir = path.resolve(node_modules, '.cache/storybook-theme');
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.writeFileSync(`${cacheDir}/theme`, req.query.theme);
    touch(path.resolve(node_modules, '../package.json'));
    res.send(JSON.stringify({status: 'OK'}));
  });
}
