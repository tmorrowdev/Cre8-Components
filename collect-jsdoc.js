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
var crypto = require('crypto');

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
    const jsdocEntries = [];
    
    // Match JSDoc comments (/** ... */)
    const jsdocPattern = /\/\*\*([\s\S]*?)\*\//g;
    const matches = [...content.matchAll(jsdocPattern)];
    
    // Match class declarations
    const classPattern = /export\s+class\s+(\w+)/g;
    const classMatches = [...content.matchAll(classPattern)];
    
    // Match property declarations with @property decorator
    const propertyPattern = /@property\(([^)]*)\)\s*(\w+)\??\s*[:=]\s*([^;]*);?/g;
    const propertyMatches = [...content.matchAll(propertyPattern)];
    
    // Match function declarations
    const functionPattern = /(export\s+)?(async\s+)?function\s+(\w+)/g;
    const functionMatches = [...content.matchAll(functionPattern)];
    
    // Match React component exports
    const reactComponentPattern = /export\s+const\s+(\w+)\s*=\s*createComponent/g;
    const reactMatches = [...content.matchAll(reactComponentPattern)];
    
    let currentIndex = 0;
    
    for (const match of matches) {
        const jsdocComment = match[1];
        const startIndex = match.index + match[0].length;
        
        // Find what follows this JSDoc comment
        const nextCode = content.slice(startIndex, startIndex + 500);
        
        // Determine the type of documentation
        let docType = 'general';
        let elementName = '';
        let elementDetails = {};
        
        // Check if it's a class
        const classMatch = nextCode.match(/export\s+class\s+(\w+)/);
        if (classMatch) {
            docType = 'class';
            elementName = classMatch[1];
        }
        
        // Check if it's a property
        const propertyMatch = nextCode.match(/@property\(([^)]*)\)\s*(\w+)/);
        if (propertyMatch) {
            docType = 'property';
            elementName = propertyMatch[2];
            elementDetails.decorator = propertyMatch[1];
        }
        
        // Check if it's a function
        const functionMatch = nextCode.match(/(export\s+)?(async\s+)?function\s+(\w+)/);
        if (functionMatch) {
            docType = 'function';
            elementName = functionMatch[3];
        }
        
        // Check if it's a React component
        const reactMatch = nextCode.match(/export\s+const\s+(\w+)\s*=\s*createComponent/);
        if (reactMatch) {
            docType = 'react-component';
            elementName = reactMatch[1];
        }
        
        jsdocEntries.push({
            filePath,
            type: docType,
            name: elementName,
            comment: jsdocComment,
            details: elementDetails,
            rawMatch: match[0]
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
    const lines = comment.split('\n').map(line => line.trim().replace(/^\*\s?/, ''));
    
    const parsed = {
        description: '',
        params: [],
        returns: null,
        examples: [],
        tags: [],
        since: null,
        deprecated: null,
        author: null
    };
    
    let currentSection = 'description';
    let currentParam = null;
    
    for (const line of lines) {
        if (line.startsWith('@param')) {
            currentSection = 'param';
            const paramMatch = line.match(/@param\s+\{([^}]+)\}\s+(\w+)\s*-?\s*(.*)/);
            if (paramMatch) {
                currentParam = {
                    type: paramMatch[1],
                    name: paramMatch[2],
                    description: paramMatch[3]
                };
                parsed.params.push(currentParam);
            }
        } else if (line.startsWith('@returns') || line.startsWith('@return')) {
            currentSection = 'returns';
            const returnMatch = line.match(/@returns?\s+\{([^}]+)\}\s*(.*)/);
            if (returnMatch) {
                parsed.returns = {
                    type: returnMatch[1],
                    description: returnMatch[2]
                };
            }
        } else if (line.startsWith('@example')) {
            currentSection = 'example';
        } else if (line.startsWith('@since')) {
            parsed.since = line.replace('@since', '').trim();
        } else if (line.startsWith('@deprecated')) {
            parsed.deprecated = line.replace('@deprecated', '').trim();
        } else if (line.startsWith('@author')) {
            parsed.author = line.replace('@author', '').trim();
        } else if (line.startsWith('@')) {
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
    let files = [];
    
    if (!fs.existsSync(dir)) {
        console.warn(`Directory does not exist: ${dir}`);
        return files;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Skip node_modules and other build directories
            if (!['node_modules', 'dist', 'build', '.git', 'coverage'].includes(item)) {
                files = files.concat(scanDirectory(fullPath, extensions));
            }
        } else if (stat.isFile()) {
            const ext = path.extname(fullPath);
            if (extensions.includes(ext)) {
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
    const timestamp = new Date().toISOString();
    const totalEntries = allEntries.length;
    const componentCount = allEntries.filter(e => e.type === 'class' || e.type === 'react-component').length;
    const propertyCount = allEntries.filter(e => e.type === 'property').length;
    
    let markdown = `# Cre8 Web Components Library - JSDoc Documentation

> **Generated:** ${timestamp}  
> **Total Entries:** ${totalEntries}  
> **Components:** ${componentCount}  
> **Properties:** ${propertyCount}  

## Table of Contents

`;

    // Group entries by component
    const componentGroups = {};
    
    for (const entry of allEntries) {
        const componentPath = entry.filePath.replace(/\\/g, '/');
        const componentMatch = componentPath.match(/\/([^/]+)\/[^/]+\.(ts|tsx)$/);
        const componentName = componentMatch ? componentMatch[1] : 'Other';
        
        if (!componentGroups[componentName]) {
            componentGroups[componentName] = [];
        }
        componentGroups[componentName].push(entry);
    }
    
    // Generate table of contents
    const sortedComponents = Object.keys(componentGroups).sort();
    for (const componentName of sortedComponents) {
        markdown += `- [${componentName}](#${componentName.toLowerCase().replace(/[^a-z0-9]/g, '-')})\n`;
    }
    
    markdown += `\n---\n\n`;
    
    // Generate documentation for each component
    for (const componentName of sortedComponents) {
        const entries = componentGroups[componentName];
        markdown += `## ${componentName}\n\n`;
        
        // Find main component documentation
        const mainEntry = entries.find(e => e.type === 'class' || e.type === 'react-component');
        if (mainEntry) {
            const parsed = parseJSDocComment(mainEntry.comment);
            markdown += `### Overview\n\n${parsed.description}\n\n`;
            
            if (parsed.deprecated) {
                markdown += `> **⚠️ DEPRECATED:** ${parsed.deprecated}\n\n`;
            }
            
            if (parsed.since) {
                markdown += `**Since:** ${parsed.since}\n\n`;
            }
            
            if (parsed.author) {
                markdown += `**Author:** ${parsed.author}\n\n`;
            }
        }
        
        // Properties section
        const properties = entries.filter(e => e.type === 'property');
        if (properties.length > 0) {
            markdown += `### Properties\n\n`;
            markdown += `| Property | Type | Description |\n`;
            markdown += `|----------|------|-------------|\n`;
            
            for (const prop of properties) {
                const parsed = parseJSDocComment(prop.comment);
                const description = parsed.description.replace(/\n/g, ' ').replace(/\|/g, '\\|');
                const type = prop.details.decorator || 'unknown';
                markdown += `| \`${prop.name}\` | ${type} | ${description} |\n`;
            }
            markdown += `\n`;
        }
        
        // Methods section
        const methods = entries.filter(e => e.type === 'function');
        if (methods.length > 0) {
            markdown += `### Methods\n\n`;
            
            for (const method of methods) {
                const parsed = parseJSDocComment(method.comment);
                markdown += `#### \`${method.name}()\`\n\n`;
                markdown += `${parsed.description}\n\n`;
                
                if (parsed.params.length > 0) {
                    markdown += `**Parameters:**\n\n`;
                    for (const param of parsed.params) {
                        markdown += `- \`${param.name}\` (\`${param.type}\`): ${param.description}\n`;
                    }
                    markdown += `\n`;
                }
                
                if (parsed.returns) {
                    markdown += `**Returns:** \`${parsed.returns.type}\` - ${parsed.returns.description}\n\n`;
                }
                
                if (parsed.examples.length > 0) {
                    markdown += `**Example:**\n\n\`\`\`javascript\n${parsed.examples.join('\\n')}\n\`\`\`\n\n`;
                }
            }
        }
        
        // File path information
        markdown += `### File Location\n\n`;
        markdown += `\`${entries[0].filePath}\`\n\n`;
        
        markdown += `---\n\n`;
    }
    
    // Appendix
    markdown += `## Appendix\n\n`;
    markdown += `### Generation Information\n\n`;
    markdown += `- **Script:** JSDoc Documentation Collector\n`;
    markdown += `- **Timestamp:** ${timestamp}\n`;
    markdown += `- **Total Files Processed:** ${[...new Set(allEntries.map(e => e.filePath))].length}\n`;
    markdown += `- **Components Found:** ${componentCount}\n`;
    markdown += `- **Properties Documented:** ${propertyCount}\n`;
    markdown += `- **Methods Documented:** ${allEntries.filter(e => e.type === 'function').length}\n\n`;
    
    markdown += `### Usage Guidelines for LLMs\n\n`;
    markdown += `This documentation is structured to be easily consumed by Large Language Models. Key features:\n\n`;
    markdown += `- **Hierarchical Structure:** Components are grouped logically\n`;
    markdown += `- **Property Tables:** Easy-to-scan property information\n`;
    markdown += `- **Type Information:** Comprehensive type annotations\n`;
    markdown += `- **Usage Examples:** Practical implementation examples\n`;
    markdown += `- **Cross-References:** Links between related components\n\n`;
    
    markdown += `### Component Categories\n\n`;
    markdown += `The Cre8 library includes components in these categories:\n\n`;
    markdown += `- **Layout:** Grid, Section, Container components\n`;
    markdown += `- **Navigation:** Nav, Breadcrumbs, Tabs\n`;
    markdown += `- **Forms:** Button, Field, Select, Checkbox, Radio\n`;
    markdown += `- **Data Display:** Table, Card, Badge, Progress\n`;
    markdown += `- **Feedback:** Alert, Modal, Tooltip, Loading Spinner\n`;
    markdown += `- **Typography:** Heading, Link, Text Passage\n\n`;
    
    return markdown;
}

/**
 * Main function
 */
async function main() {
    console.log('🔍 Starting JSDoc documentation collection...\n');
    
    // Parse command line arguments
    const args = process.argv.slice(2);
    let outputFile = CONFIG.outputFile;
    
    for (const arg of args) {
        if (arg.startsWith('--output=')) {
            outputFile = arg.split('=')[1];
        }
    }
    
    // Collect all files
    let allFiles = [];
    for (const scanPath of CONFIG.paths) {
        console.log(`📂 Scanning: ${scanPath}`);
        const files = scanDirectory(scanPath, CONFIG.extensions);
        allFiles = allFiles.concat(files);
        console.log(`   Found ${files.length} files`);
    }
    
    console.log(`\n📄 Total files to process: ${allFiles.length}\n`);
    
    // Extract JSDoc from all files
    const allEntries = [];
    let processedFiles = 0;
    
    for (const filePath of allFiles) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const entries = extractJSDocFromFile(filePath, content);
            
            if (entries.length > 0) {
                allEntries.push(...entries);
                console.log(`✅ ${filePath}: ${entries.length} entries`);
            }
            
            processedFiles++;
        } catch (error) {
            console.error(`❌ Error processing ${filePath}:`, error.message);
        }
    }
    
    console.log(`\n📊 Processing complete:`);
    console.log(`   Files processed: ${processedFiles}`);
    console.log(`   JSDoc entries found: ${allEntries.length}`);
    
    // Generate markdown documentation
    console.log(`\n📝 Generating markdown documentation...`);
    const markdown = generateMarkdownDocumentation(allEntries);
    
    // Write output file
    fs.writeFileSync(outputFile, markdown, 'utf8');
    
    console.log(`\n✅ Documentation generated successfully!`);
    console.log(`   Output file: ${outputFile}`);
    console.log(`   Size: ${(markdown.length / 1024).toFixed(2)} KB`);
    console.log(`   Components documented: ${allEntries.filter(e => e.type === 'class' || e.type === 'react-component').length}`);
    
    // Generate summary statistics
    const stats = {
        totalEntries: allEntries.length,
        components: allEntries.filter(e => e.type === 'class' || e.type === 'react-component').length,
        properties: allEntries.filter(e => e.type === 'property').length,
        methods: allEntries.filter(e => e.type === 'function').length,
        files: [...new Set(allEntries.map(e => e.filePath))].length
    };
    
    console.log(`\n📈 Documentation Statistics:`);
    console.log(`   📦 Components: ${stats.components}`);
    console.log(`   🔧 Properties: ${stats.properties}`);
    console.log(`   ⚙️  Methods: ${stats.methods}`);
    console.log(`   📁 Files: ${stats.files}`);
    
    console.log(`\n🎉 Ready for LLM consumption!`);
}

// Run the script
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    extractJSDocFromFile,
    parseJSDocComment,
    scanDirectory,
    generateMarkdownDocumentation
};
