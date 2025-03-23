const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const clone = require('clone');
const loaderUtils = require('loader-utils');
const glob = require('glob');
const {createProgram} = require('typescript');
const {analyzeSourceFile, transformAnalyzerResult} = require('web-component-analyzer');

module.exports = async function (loadersResult, map, meta) {
  const callback = this.async();

  const defaultOptions = {};

  const options = {
    ...defaultOptions,
    ...(clone(loaderUtils.getOptions(this)) || {}),
  };

  // const content = options.ignoreLoadersResult
  //     ? await fs.promises.readFile(this.resourcePath, 'utf-8')
  //     : loadersResult

  const files = glob.sync('./components/**/*.ts').map((f) => path.resolve(f));
  files.forEach((file) => {
    this.addDependency(file);
  });

  // Inspired by https://github.com/runem/web-component-analyzer/issues/204
  const compilerOptions = {};
  const program = createProgram(files, compilerOptions);
  const sourceFiles = program.getSourceFiles().filter((sf) => files.includes(sf.fileName));
  const results = sourceFiles.map((sourceFile) =>
    analyzeSourceFile(sourceFile, {
      program,
      verbose: true,
      config: {
        format: 'custom-elements.json',
        analyzeGlobalFeatures: true,
      },
    })
  );
  const transformed = transformAnalyzerResult('json', results, program);

  callback(
    null,
    // `{ "customElements": []}`
    // `module.exports=${transformed}`
    transformed
  );
};
