#!/usr/bin/env node
/**
 * JSDoc Documentation Collector for Cre8 Web Components Library
 * 
 * This script collects all JSDoc documentation from the Cre8 React and Web Components 
 * libraries and formats it into a comprehensive guide that's easily consumable by LLMs.
 * 
 * Usage: node collect-jsdoc.js [--output=filename.md]
 */

var fs = require('fs');
var path = require('path');

// Configuration
var CONFIG = {
    // Paths to scan for JSDoc documentation
    paths: [
        './packages/cre8-react/src/components',
        './packages/cre8-wc/components'
    ],
    // File extensions to scan
    extensions: ['.ts', '.tsx'],
    // Output file name
    outputFile: 'cre8-jsdoc-documentation.md'
};

/**
 * Extract JSDoc comments from a file
 * @param {string} filePath - Path to the file
 * @param {string} content - File content
 * @returns {Array} Array of JSDoc entries
 */
function extractJSDocFromFile(filePath, content) {
    var jsdocEntries = [];
    
    // Match JSDoc comments (/** ... */)
    var jsdocPattern = /\/\*\*([\s\S]*?)\*\//g;
    var match;
    var matches = [];
    
    while ((match = jsdocPattern.exec(content)) !== null) {
        matches.push(match);
    }
    
    // Match class declarations
    var classPattern = /export\s+class\s+(\w+)/g;
    var classMatches = [];
    while ((match = classPattern.exec(content)) !== null) {
        classMatches.push(match);
    }
    
    // Match property declarations with @property decorator
    var propertyPattern = /@property\(([^)]*)\)\s*(\w+)\??\s*[:=]\s*([^;]*);?/g;
    var propertyMatches = [];
    while ((match = propertyPattern.exec(content)) !== null) {
        propertyMatches.push(match);
    }
    
    // Match React component exports
    var reactComponentPattern = /export\s+const\s+(\w+)\s*=\s*createComponent/g;
    var reactMatches = [];
    while ((match = reactComponentPattern.exec(content)) !== null) {
        reactMatches.push(match);
    }
    
    for (var i = 0; i < matches.length; i++) {
        var jsdocMatch = matches[i];
        var jsdocComment = jsdocMatch[1];
        var startIndex = jsdocMatch.index + jsdocMatch[0].length;
        
        // Find what follows this JSDoc comment
        var nextCode = content.slice(startIndex, startIndex + 500);
        
        // Determine the type of documentation
        var docType = 'general';
        var elementName = '';
        var elementDetails = {};
        
        // Check if it's a class
        var classMatch = nextCode.match(/export\s+class\s+(\w+)/);
        if (classMatch) {
            docType = 'class';
            elementName = classMatch[1];
        }
        
        // Check if it's a property
        var propertyMatch = nextCode.match(/@property\(([^)]*)\)\s*(\w+)/);
        if (propertyMatch) {
            docType = 'property';
            elementName = propertyMatch[2];
            elementDetails.decorator = propertyMatch[1];
        }
        
        // Check if it's a function
        var functionMatch = nextCode.match(/(export\s+)?(async\s+)?function\s+(\w+)/);
        if (functionMatch) {
            docType = 'function';
            elementName = functionMatch[3];
        }
        
        // Check if it's a React component
        var reactMatch = nextCode.match(/export\s+const\s+(\w+)\s*=\s*createComponent/);
        if (reactMatch) {
            docType = 'react-component';
            elementName = reactMatch[1];
        }
        
        jsdocEntries.push({
            filePath: filePath,
            type: docType,
            name: elementName,
            comment: jsdocComment,
            details: elementDetails,
            rawMatch: jsdocMatch[0]
        });
    }
    
    return jsdocEntries;
}

/**
 * Parse JSDoc comment into structured data
 * @param {string} comment - Raw JSDoc comment
 * @returns {Object} Parsed JSDoc data
 */
function parseJSDocComment(comment) {
    var lines = comment.split('\n').map(function(line) {
        return line.trim().replace(/^\*\s?/, '');
    });
    
    var parsed = {
        description: '',
        params: [],
        returns: null,
        examples: [],
        tags: [],
        since: null,
        deprecated: null,
        author: null
    };
    
    var currentSection = 'description';
    var currentParam = null;
    
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        
        if (line.indexOf('@param') === 0) {
            currentSection = 'param';
            var paramMatch = line.match(/@param\s+\{([^}]+)\}\s+(\w+)\s*-?\s*(.*)/);
            if (paramMatch) {
                currentParam = {
                    type: paramMatch[1],
                    name: paramMatch[2],
                    description: paramMatch[3]
                };
                parsed.params.push(currentParam);
            }
        } else if (line.indexOf('@returns') === 0 || line.indexOf('@return') === 0) {
            currentSection = 'returns';
            var returnMatch = line.match(/@returns?\s+\{([^}]+)\}\s*(.*)/);
            if (returnMatch) {
                parsed.returns = {
                    type: returnMatch[1],
                    description: returnMatch[2]
                };
            }
        } else if (line.indexOf('@example') === 0) {
            currentSection = 'example';
        } else if (line.indexOf('@since') === 0) {
            parsed.since = line.replace('@since', '').trim();
        } else if (line.indexOf('@deprecated') === 0) {
            parsed.deprecated = line.replace('@deprecated', '').trim();
        } else if (line.indexOf('@author') === 0) {
            parsed.author = line.replace('@author', '').trim();
        } else if (line.indexOf('@') === 0) {
            // Other tags
            parsed.tags.push(line);
        } else if (currentSection === 'description' && line) {
            parsed.description += (parsed.description ? '\n' : '') + line;
        } else if (currentSection === 'param' && currentParam && line) {
            currentParam.description += (currentParam.description ? ' ' : '') + line;
        } else if (currentSection === 'returns' && parsed.returns && line) {
            parsed.returns.description += (parsed.returns.description ? ' ' : '') + line;
        } else if (currentSection === 'example' && line) {
            parsed.examples.push(line);
        }
    }
    
    return parsed;
}

/**
 * Scan directory recursively for files
 * @param {string} dir - Directory to scan
 * @param {Array} extensions - File extensions to include
 * @returns {Array} Array of file paths
 */
function scanDirectory(dir, extensions) {
    var files = [];
    
    if (!fs.existsSync(dir)) {
        console.warn('Directory does not exist: ' + dir);
        return files;
    }
    
    var items = fs.readdirSync(dir);
    
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var fullPath = path.join(dir, item);
        var stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Skip node_modules and other build directories
            var skipDirs = ['node_modules', 'dist', 'build', '.git', 'coverage'];
            if (skipDirs.indexOf(item) === -1) {
                files = files.concat(scanDirectory(fullPath, extensions));
            }
        } else if (stat.isFile()) {
            var ext = path.extname(fullPath);
            if (extensions.indexOf(ext) !== -1) {
                files.push(fullPath);
            }
        }
    }
    
    return files;
}

/**
 * Generate markdown documentation from collected JSDoc entries
 * @param {Array} allEntries - All JSDoc entries
 * @returns {string} Markdown content
 */
function generateMarkdownDocumentation(allEntries) {
    var timestamp = new Date().toISOString();
    var totalEntries = allEntries.length;
    var componentCount = allEntries.filter(function(e) { 
        return e.type === 'class' || e.type === 'react-component'; 
    }).length;
    var propertyCount = allEntries.filter(function(e) { 
        return e.type === 'property'; 
    }).length;
    
    var markdown = '# Cre8 Web Components Library - JSDoc Documentation\n\n';
    markdown += '> **Generated:** ' + timestamp + '\n';
    markdown += '> **Total Entries:** ' + totalEntries + '\n';
    markdown += '> **Components:** ' + componentCount + '\n';
    markdown += '> **Properties:** ' + propertyCount + '\n\n';
    markdown += '## Table of Contents\n\n';

    // Group entries by component
    var componentGroups = {};
    
    for (var i = 0; i < allEntries.length; i++) {
        var entry = allEntries[i];
        var componentPath = entry.filePath.replace(/\\/g, '/');
        var componentMatch = componentPath.match(/\/([^/]+)\/[^/]+\.(ts|tsx)$/);
        var componentName = componentMatch ? componentMatch[1] : 'Other';
        
        if (!componentGroups[componentName]) {
            componentGroups[componentName] = [];
        }
        componentGroups[componentName].push(entry);
    }
    
    // Generate table of contents
    var sortedComponents = Object.keys(componentGroups).sort();
    for (var i = 0; i < sortedComponents.length; i++) {
        var componentName = sortedComponents[i];
        var anchor = componentName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        markdown += '- [' + componentName + '](#' + anchor + ')\n';
    }
    
    markdown += '\n---\n\n';
    
    // Generate documentation for each component
    for (var i = 0; i < sortedComponents.length; i++) {
        var componentName = sortedComponents[i];
        var entries = componentGroups[componentName];
        markdown += '## ' + componentName + '\n\n';
        
        // Find main component documentation
        var mainEntry = null;
        for (var j = 0; j < entries.length; j++) {
            if (entries[j].type === 'class' || entries[j].type === 'react-component') {
                mainEntry = entries[j];
                break;
            }
        }
        
        if (mainEntry) {
            var parsed = parseJSDocComment(mainEntry.comment);
            markdown += '### Overview\n\n' + parsed.description + '\n\n';
            
            if (parsed.deprecated) {
                markdown += '> **⚠️ DEPRECATED:** ' + parsed.deprecated + '\n\n';
            }
            
            if (parsed.since) {
                markdown += '**Since:** ' + parsed.since + '\n\n';
            }
            
            if (parsed.author) {
                markdown += '**Author:** ' + parsed.author + '\n\n';
            }
        }
        
        // Properties section
        var properties = entries.filter(function(e) { return e.type === 'property'; });
        if (properties.length > 0) {
            markdown += '### Properties\n\n';
            markdown += '| Property | Type | Description |\n';
            markdown += '|----------|------|-------------|\n';
            
            for (var j = 0; j < properties.length; j++) {
                var prop = properties[j];
                var parsed = parseJSDocComment(prop.comment);
                var description = parsed.description.replace(/\n/g, ' ').replace(/\|/g, '\\|');
                var type = prop.details.decorator || 'unknown';
                markdown += '| `' + prop.name + '` | ' + type + ' | ' + description + ' |\n';
            }
            markdown += '\n';
        }
        
        // Methods section
        var methods = entries.filter(function(e) { return e.type === 'function'; });
        if (methods.length > 0) {
            markdown += '### Methods\n\n';
            
            for (var j = 0; j < methods.length; j++) {
                var method = methods[j];
                var parsed = parseJSDocComment(method.comment);
                markdown += '#### `' + method.name + '()`\n\n';
                markdown += parsed.description + '\n\n';
                
                if (parsed.params.length > 0) {
                    markdown += '**Parameters:**\n\n';
                    for (var k = 0; k < parsed.params.length; k++) {
                        var param = parsed.params[k];
                        markdown += '- `' + param.name + '` (`' + param.type + '`): ' + param.description + '\n';
                    }
                    markdown += '\n';
                }
                
                if (parsed.returns) {
                    markdown += '**Returns:** `' + parsed.returns.type + '` - ' + parsed.returns.description + '\n\n';
                }
                
                if (parsed.examples.length > 0) {
                    markdown += '**Example:**\n\n```javascript\n' + parsed.examples.join('\n') + '\n```\n\n';
                }
            }
        }
        
        // File path information
        markdown += '### File Location\n\n';
        markdown += '`' + entries[0].filePath + '`\n\n';
        
        markdown += '---\n\n';
    }
    
    // Appendix
    markdown += '## Appendix\n\n';
    markdown += '### Generation Information\n\n';
    markdown += '- **Script:** JSDoc Documentation Collector\n';
    markdown += '- **Timestamp:** ' + timestamp + '\n';
    
    // Get unique file paths
    var uniqueFiles = {};
    for (var i = 0; i < allEntries.length; i++) {
        uniqueFiles[allEntries[i].filePath] = true;
    }
    var fileCount = Object.keys(uniqueFiles).length;
    
    markdown += '- **Total Files Processed:** ' + fileCount + '\n';
    markdown += '- **Components Found:** ' + componentCount + '\n';
    markdown += '- **Properties Documented:** ' + propertyCount + '\n';
    markdown += '- **Methods Documented:** ' + allEntries.filter(function(e) { return e.type === 'function'; }).length + '\n\n';
    
    markdown += '### Usage Guidelines for LLMs\n\n';
    markdown += 'This documentation is structured to be easily consumed by Large Language Models. Key features:\n\n';
    markdown += '- **Hierarchical Structure:** Components are grouped logically\n';
    markdown += '- **Property Tables:** Easy-to-scan property information\n';
    markdown += '- **Type Information:** Comprehensive type annotations\n';
    markdown += '- **Usage Examples:** Practical implementation examples\n';
    markdown += '- **Cross-References:** Links between related components\n\n';
    
    return markdown;
}

/**
 * Main function
 */
function main() {
    console.log('🔍 Starting JSDoc documentation collection...\n');
    
    // Parse command line arguments
    var args = process.argv.slice(2);
    var outputFile = CONFIG.outputFile;
    
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (arg.indexOf('--output=') === 0) {
            outputFile = arg.split('=')[1];
        }
    }
    
    // Collect all files
    var allFiles = [];
    for (var i = 0; i < CONFIG.paths.length; i++) {
        var scanPath = CONFIG.paths[i];
        console.log('📂 Scanning: ' + scanPath);
        var files = scanDirectory(scanPath, CONFIG.extensions);
        allFiles = allFiles.concat(files);
        console.log('   Found ' + files.length + ' files');
    }
    
    console.log('\n📄 Total files to process: ' + allFiles.length + '\n');
    
    // Extract JSDoc from all files
    var allEntries = [];
    var processedFiles = 0;
    
    for (var i = 0; i < allFiles.length; i++) {
        var filePath = allFiles[i];
        try {
            var content = fs.readFileSync(filePath, 'utf8');
            var entries = extractJSDocFromFile(filePath, content);
            
            if (entries.length > 0) {
                allEntries = allEntries.concat(entries);
                console.log('✅ ' + filePath + ': ' + entries.length + ' entries');
            }
            
            processedFiles++;
        } catch (error) {
            console.error('❌ Error processing ' + filePath + ':', error.message);
        }
    }
    
    console.log('\n📊 Processing complete:');
    console.log('   Files processed: ' + processedFiles);
    console.log('   JSDoc entries found: ' + allEntries.length);
    
    // Generate markdown documentation
    console.log('\n📝 Generating markdown documentation...');
    var markdown = generateMarkdownDocumentation(allEntries);
    
    // Write output file
    fs.writeFileSync(outputFile, markdown, 'utf8');
    
    console.log('\n✅ Documentation generated successfully!');
    console.log('   Output file: ' + outputFile);
    console.log('   Size: ' + (markdown.length / 1024).toFixed(2) + ' KB');
    
    var componentCount = allEntries.filter(function(e) { 
        return e.type === 'class' || e.type === 'react-component'; 
    }).length;
    console.log('   Components documented: ' + componentCount);
    
    // Generate summary statistics
    var stats = {
        totalEntries: allEntries.length,
        components: componentCount,
        properties: allEntries.filter(function(e) { return e.type === 'property'; }).length,
        methods: allEntries.filter(function(e) { return e.type === 'function'; }).length
    };
    
    // Get unique file paths
    var uniqueFiles = {};
    for (var i = 0; i < allEntries.length; i++) {
        uniqueFiles[allEntries[i].filePath] = true;
    }
    stats.files = Object.keys(uniqueFiles).length;
    
    console.log('\n📈 Documentation Statistics:');
    console.log('   📦 Components: ' + stats.components);
    console.log('   🔧 Properties: ' + stats.properties);
    console.log('   ⚙️  Methods: ' + stats.methods);
    console.log('   📁 Files: ' + stats.files);
    
    console.log('\n🎉 Ready for LLM consumption!');
}

// Run the script
if (require.main === module) {
    try {
        main();
    } catch (error) {
        console.error('Fatal error:', error);
        process.exit(1);
    }
}

module.exports = {
    extractJSDocFromFile: extractJSDocFromFile,
    parseJSDocComment: parseJSDocComment,
    scanDirectory: scanDirectory,
    generateMarkdownDocumentation: generateMarkdownDocumentation
};
