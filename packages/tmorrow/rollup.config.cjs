const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const {terser}  = require('rollup-plugin-terser');
const copy = require('rollup-plugin-copy');

module.exports = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    typescript(),
    terser(),
    copy({
      targets: [
        { src: 'index.html', dest: 'dist/' },
        { src: 'styles/**/*', dest: 'dist/styles/' },
        { src: 'assets/**/*', dest: 'dist/assets/' }
      ]
    })
  ],
  preserveEntrySignatures: 'strict'
};
