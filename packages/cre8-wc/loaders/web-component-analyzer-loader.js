const fs = require('fs')
const path = require('path')

const loaderUtils = require('loader-utils')

const {
    analyzeText,
    transformAnalyzerResult
} = require('web-component-analyzer')

const defaultOptions = {
    analyzerOptions: {},
    tsconfigPath: path.resolve(process.cwd(), 'tsconfig.json'),
    ignoreLoadersResult: false
}

module.exports = async function(loadersResult) {
    const callback = this.async()
    const defaultOptions = {
        analyzerOptions
    }
    const options = {
     ...defaultOptions,
        // ...(clone(loaderUtils.getOptions(this)) || {})
    }

    const content = options.ignoreLoadersResult
        ? await fs.promises.readFile(this.resourcePath, 'utf-8')
        : loadersResult

    const { results, program } = analyzeText(content, options)

    callback(
        null,
        'module.exports=' + transformAnalyzerResult('json', results, program)
    )
}
