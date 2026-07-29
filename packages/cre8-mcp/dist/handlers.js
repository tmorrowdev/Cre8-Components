/**
 * Cre8 MCP Tool Handlers
 *
 * Functions that implement the Cre8 Design System MCP tools.
 * Supports both Web Components (default) and React formats.
 */
import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { registerCatalog, validateSpec, } from '@tmorrow/cre8-wc/a2ui/index.js';
let _kgCache = null;
function loadKG() {
    if (_kgCache)
        return _kgCache;
    const req = createRequire(import.meta.url);
    const kgPath = req.resolve('@tmorrow/cre8-wc/a2ui/catalog-kg.json');
    const kg = JSON.parse(readFileSync(kgPath, 'utf-8'));
    const nodesById = new Map(kg.nodes.map((n) => [n.id, n]));
    const components = new Map(kg.nodes.filter((n) => n.type === 'component').map((n) => [n.id, n]));
    const edgesFrom = new Map();
    for (const edge of kg.edges) {
        if (!edgesFrom.has(edge.from))
            edgesFrom.set(edge.from, []);
        edgesFrom.get(edge.from).push(edge);
    }
    _kgCache = { components, nodesById, edgesFrom };
    return _kgCache;
}
// Cache for catalogs
const catalogs = {
    web: null,
    react: null,
};
function getCatalogPath(format) {
    const filename = format === 'react' ? 'react-manifest.json' : 'mcp-manifest.json';
    const require = createRequire(import.meta.url);
    return require.resolve(`@tmorrow/cre8-wc/${filename}`);
}
function loadCatalog(format = 'web') {
    if (catalogs[format])
        return catalogs[format];
    const catalogPath = getCatalogPath(format);
    catalogs[format] = JSON.parse(readFileSync(catalogPath, 'utf-8'));
    return catalogs[format];
}
/**
 * list_components - Lists all available Cre8 components (KG-backed)
 */
export function handleListComponents(input) {
    const { components } = loadKG();
    let comps = Array.from(components.values());
    if (input.category) {
        comps = comps.filter((c) => (c.category ?? '').toLowerCase() === input.category.toLowerCase());
    }
    const grouped = {};
    for (const comp of comps) {
        const cat = comp.category ?? 'Other';
        if (!grouped[cat])
            grouped[cat] = [];
        grouped[cat].push({
            name: comp.id,
            description: (comp.description ?? '').slice(0, 160),
        });
    }
    return JSON.stringify({
        format: input.format ?? 'web',
        library: '@tmorrow/cre8-wc',
        categories: Object.entries(grouped).map(([category, items]) => ({ category, components: items })),
        totalComponents: comps.length,
    }, null, 2);
}
/**
 * get_component - Gets detailed info for a specific component (KG-backed)
 */
export function handleGetComponent(input) {
    const { components, edgesFrom, nodesById } = loadKG();
    const searchName = input.name.toLowerCase().replace(/^cre8-?/, '').replace(/-/g, '');
    let comp = components.get(input.name.toLowerCase()) ??
        components.get(`cre8-${input.name.toLowerCase()}`);
    if (!comp) {
        comp = Array.from(components.values()).find((c) => {
            const cn = c.id.toLowerCase().replace(/^cre8-/, '').replace(/-/g, '');
            return cn === searchName;
        });
    }
    if (!comp) {
        return JSON.stringify({
            error: `Component "${input.name}" not found`,
            suggestion: 'Use list_components to see available components',
        });
    }
    const edges = edgesFrom.get(comp.id) ?? [];
    const slots = edges
        .filter((e) => e.rel === 'HAS_SLOT')
        .map((e) => nodesById.get(e.to))
        .filter(Boolean)
        .map((s) => ({ name: s.name, description: s.description ?? '' }));
    const shortName = comp.id.replace('cre8-', '');
    const format = input.format ?? 'web';
    // cre8-button → Cre8Button (matches generate_code's tag conversion)
    const reactName = 'Cre8' + shortName
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
    return JSON.stringify({
        format,
        name: format === 'react' ? reactName : comp.id,
        tagName: comp.id,
        category: comp.category ?? 'Other',
        description: comp.description ?? '',
        import: format === 'react'
            ? `import { ${reactName} } from '@tmorrow/cre8-react';`
            : `import '@tmorrow/cre8-wc/lib/components/${shortName}/${shortName}.js';`,
        props: comp.props ?? {},
        slots,
        accepts_children: comp.accepts_children ?? false,
    }, null, 2);
}
/**
 * get_patterns - Gets layout patterns and templates
 */
export function handleGetPatterns(input) {
    const format = input.format || 'web';
    const cat = loadCatalog(format);
    if (input.name) {
        const pattern = cat.patterns.find((p) => p.name.toLowerCase() === input.name.toLowerCase());
        if (!pattern) {
            return JSON.stringify({
                error: `Pattern "${input.name}" not found`,
                available: cat.patterns.map((p) => p.name),
            });
        }
        return JSON.stringify({ format, ...pattern }, null, 2);
    }
    return JSON.stringify({
        format,
        patterns: cat.patterns.map((p) => ({
            name: p.name,
            description: p.description,
        })),
    }, null, 2);
}
/**
 * search_components - Search components by name, description, or category (KG-backed)
 */
export function handleSearchComponents(input) {
    const { components } = loadKG();
    const query = input.query.toLowerCase();
    const matches = Array.from(components.values()).filter((c) => c.id.toLowerCase().includes(query) ||
        (c.description ?? '').toLowerCase().includes(query) ||
        (c.category ?? '').toLowerCase().includes(query));
    if (matches.length === 0) {
        return JSON.stringify({
            format: input.format ?? 'web',
            message: `No components found matching "${input.query}"`,
            suggestion: 'Try a broader search term or use list_components',
        });
    }
    return JSON.stringify({
        format: input.format ?? 'web',
        query: input.query,
        results: matches.map((c) => ({
            name: c.id,
            category: c.category ?? 'Other',
            description: (c.description ?? '').slice(0, 160),
        })),
        count: matches.length,
    }, null, 2);
}
/**
 * generate_code - Generates React or Web Component code from a JSON schema
 */
export function handleGenerateCode(input) {
    const format = input.format || 'web';
    const baseIndent = input.indent || 0;
    function generateNode(node, indentLevel) {
        const indent = '  '.repeat(indentLevel);
        // Handle string content
        if (typeof node === 'string') {
            return `${indent}${node}`;
        }
        // Get component name in correct format
        let tagName = node.component;
        // Check if this is a plain HTML element (not a cre8 component)
        const htmlTags = new Set([
            'a', 'abbr', 'article', 'aside', 'b', 'blockquote', 'br', 'button',
            'caption', 'cite', 'code', 'col', 'colgroup', 'dd', 'details', 'div',
            'dl', 'dt', 'em', 'fieldset', 'figcaption', 'figure', 'form', 'h1',
            'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'i', 'iframe', 'img',
            'input', 'label', 'legend', 'li', 'main', 'mark', 'nav', 'ol', 'option',
            'p', 'pre', 'section', 'select', 'small', 'span', 'strong', 'sub',
            'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th',
            'thead', 'time', 'tr', 'u', 'ul', 'video',
        ]);
        const isHtmlElement = htmlTags.has(tagName.toLowerCase());
        // Only normalize cre8 component names, leave HTML tags as-is
        if (!isHtmlElement) {
            if (format === 'react') {
                // Ensure React format: Cre8Button
                if (!tagName.startsWith('Cre8')) {
                    tagName = tagName.startsWith('cre8-')
                        ? 'Cre8' + tagName.slice(5).split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
                        : 'Cre8' + tagName.charAt(0).toUpperCase() + tagName.slice(1);
                }
            }
            else {
                // Ensure Web Component format: cre8-button
                if (!tagName.startsWith('cre8-')) {
                    tagName = tagName.startsWith('Cre8')
                        ? 'cre8-' + tagName.slice(4).replace(/([A-Z])/g, '-$1').toLowerCase().slice(1)
                        : 'cre8-' + tagName.toLowerCase();
                }
            }
        }
        // Build props/attributes string
        let propsStr = '';
        if (node.props) {
            const propEntries = Object.entries(node.props);
            for (const [key, value] of propEntries) {
                let propName = key;
                // Convert prop names for web components (camelCase -> kebab-case)
                if (format === 'web' && /[A-Z]/.test(key)) {
                    propName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                }
                // Format the value
                if (typeof value === 'boolean') {
                    if (value) {
                        propsStr += ` ${propName}`;
                    }
                }
                else if (typeof value === 'string') {
                    propsStr += ` ${propName}="${value}"`;
                }
                else if (typeof value === 'number') {
                    propsStr += format === 'react' ? ` ${propName}={${value}}` : ` ${propName}="${value}"`;
                }
                else if (typeof value === 'object') {
                    propsStr += format === 'react' ? ` ${propName}={${JSON.stringify(value)}}` : ` ${propName}='${JSON.stringify(value)}'`;
                }
            }
        }
        // Check for children/content
        const hasChildren = node.children || node.content || node.slots;
        if (!hasChildren) {
            // Self-closing tag
            return format === 'react'
                ? `${indent}<${tagName}${propsStr} />`
                : `${indent}<${tagName}${propsStr}></${tagName}>`;
        }
        // Build children
        const childLines = [];
        // Handle content
        if (node.content) {
            childLines.push(`${'  '.repeat(indentLevel + 1)}${node.content}`);
        }
        // Handle children
        if (node.children) {
            const children = Array.isArray(node.children) ? node.children : [node.children];
            for (const child of children) {
                childLines.push(generateNode(child, indentLevel + 1));
            }
        }
        // Handle slots
        if (node.slots) {
            for (const [slotName, slotContent] of Object.entries(node.slots)) {
                const slotChildren = Array.isArray(slotContent) ? slotContent : [slotContent];
                for (const child of slotChildren) {
                    if (typeof child === 'string') {
                        if (format === 'react') {
                            childLines.push(`${'  '.repeat(indentLevel + 1)}{/* slot: ${slotName} */}`);
                            childLines.push(`${'  '.repeat(indentLevel + 1)}${child}`);
                        }
                        else if (slotName === 'default') {
                            childLines.push(`${'  '.repeat(indentLevel + 1)}${child}`);
                        }
                        else {
                            childLines.push(`${'  '.repeat(indentLevel + 1)}<span slot="${slotName}">${child}</span>`);
                        }
                    }
                    else {
                        const childCode = generateNode(child, indentLevel + 1);
                        if (format === 'web' && slotName !== 'default') {
                            // Add slot attribute for web components
                            const slotAttr = ` slot="${slotName}"`;
                            const firstTagEnd = childCode.indexOf('>');
                            if (firstTagEnd > 0) {
                                childLines.push(childCode.slice(0, firstTagEnd) + slotAttr + childCode.slice(firstTagEnd));
                            }
                            else {
                                childLines.push(childCode);
                            }
                        }
                        else {
                            childLines.push(childCode);
                        }
                    }
                }
            }
        }
        // Combine
        const openTag = `${indent}<${tagName}${propsStr}>`;
        const closeTag = `${indent}</${tagName}>`;
        if (childLines.length === 1 && !childLines[0].includes('\n') && childLines[0].trim().length < 40) {
            // Single short child - inline
            return `${indent}<${tagName}${propsStr}>${childLines[0].trim()}</${tagName}>`;
        }
        return `${openTag}\n${childLines.join('\n')}\n${closeTag}`;
    }
    // Handle array of nodes
    if (Array.isArray(input.schema)) {
        const lines = input.schema.map(node => generateNode(node, baseIndent));
        return JSON.stringify({
            format,
            code: lines.join('\n'),
        }, null, 2);
    }
    // Single node
    const code = generateNode(input.schema, baseIndent);
    return JSON.stringify({
        format,
        code,
    }, null, 2);
}
// ─── A2UI catalog tools ──────────────────────────────────────────────
let registeredCatalogCache = null;
export function loadA2uiCatalog() {
    if (registeredCatalogCache)
        return registeredCatalogCache;
    const require = createRequire(import.meta.url);
    const catalogPath = require.resolve('@tmorrow/cre8-wc/a2ui/catalog.json');
    const schema = JSON.parse(readFileSync(catalogPath, 'utf-8'));
    registeredCatalogCache = registerCatalog(schema);
    return registeredCatalogCache;
}
function normalizeComponentName(name) {
    return name.startsWith('cre8-') ? name : `cre8-${name}`;
}
export function handleGetA2uiCatalog(input) {
    const catalog = loadA2uiCatalog();
    const view = input.view ?? 'metadata';
    if (view === 'full') {
        return JSON.stringify(catalog.schema, null, 2);
    }
    if (view === 'component') {
        if (!input.component) {
            throw new Error('view="component" requires a `component` argument');
        }
        const tag = normalizeComponentName(input.component);
        const def = catalog.components.get(tag);
        if (!def) {
            const available = Array.from(catalog.components.keys()).sort().join(', ');
            throw new Error(`Component "${tag}" not found in A2UI catalog. Available: ${available}`);
        }
        return JSON.stringify({ component: tag, definition: def }, null, 2);
    }
    // metadata (default)
    const meta = catalog.schema['x-a2ui'] ?? {};
    const components = Array.from(catalog.components.entries()).map(([tag, def]) => ({
        name: tag,
        category: def['x-category'] ?? 'Other',
        description: (def.description ?? '').split('\n')[0].slice(0, 160),
        slotNames: def.properties?.slots?.properties
            ? Object.keys(def.properties.slots.properties)
            : def.properties?.children
                ? ['children']
                : [],
    }));
    return JSON.stringify({
        catalogId: catalog.id,
        ...meta,
        totalComponents: components.length,
        components,
    }, null, 2);
}
export function handleValidateA2uiSpec(input) {
    const catalog = loadA2uiCatalog();
    try {
        validateSpec(input.spec, catalog);
        return JSON.stringify({ ok: true }, null, 2);
    }
    catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        return JSON.stringify({ ok: false, error: message }, null, 2);
    }
}
