/**
 * Cre8 MCP Tool Definitions
 */
import { z } from 'zod';
export const tools = [
    {
        name: 'list_components',
        description: 'Lists all available Cre8 components from @tmorrow/cre8-wc. ' +
            'Returns components grouped by category (Actions, Forms, Layout, Navigation, etc.). ' +
            'Optionally filter by category.',
        inputSchema: {
            type: 'object',
            properties: {
                category: {
                    type: 'string',
                    description: 'Filter by category: Actions, Forms, Layout, Typography, Navigation, Disclosure, Feedback, Data, Media, Marketing',
                },
                format: {
                    type: 'string',
                    enum: ['web', 'react'],
                    description: 'Component format: "web" (default) or "react"',
                },
            },
        },
    },
    {
        name: 'get_component',
        description: 'Gets detailed information about a specific Cre8 component including attributes/props, ' +
            'slots, events, import statement, and usage examples. Works with or without the "cre8-" prefix.',
        inputSchema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Component name (e.g., "cre8-button", "button", or "Cre8Button")',
                },
                format: {
                    type: 'string',
                    enum: ['web', 'react'],
                    description: 'Component format: "web" (default) or "react"',
                },
            },
            required: ['name'],
        },
    },
    {
        name: 'get_patterns',
        description: 'Gets pre-built UI patterns and templates using Cre8 components. ' +
            'Includes common patterns like Login Form, Data Table, Page Layout, etc. ' +
            'Optionally get a specific pattern by name.',
        inputSchema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Pattern name to get details (optional)',
                },
                format: {
                    type: 'string',
                    enum: ['web', 'react'],
                    description: 'Component format: "web" (default) or "react"',
                },
            },
        },
    },
    {
        name: 'search_components',
        description: 'Find components by describing what the user is trying to do - an intent, ' +
            'not just a name. Queries like "show progress toward a goal", "warn the ' +
            'user about a problem" or "big eye-catching banner" return a ranked list; ' +
            'exact names and categories still work. Confirm the winning component\'s ' +
            'API with get_component before using it.',
        inputSchema: {
            type: 'object',
            properties: {
                query: {
                    type: 'string',
                    description: 'Search query (e.g., "button", "form", "navigation")',
                },
                format: {
                    type: 'string',
                    enum: ['web', 'react'],
                    description: 'Component format: "web" (default) or "react"',
                },
            },
            required: ['query'],
        },
    },
    {
        name: 'generate_code',
        description: 'Generates Web Component HTML or React JSX code from a JSON schema. ' +
            'Takes a component tree definition and outputs formatted code ready to use.',
        inputSchema: {
            type: 'object',
            properties: {
                schema: {
                    type: 'object',
                    description: 'Component tree schema with { component, props?, children?, slots? }',
                },
                format: {
                    type: 'string',
                    enum: ['web', 'react'],
                    description: 'Output format: "web" for HTML (default) or "react" for JSX',
                },
            },
            required: ['schema'],
        },
    },
    {
        name: 'get_a2ui_catalog',
        description: 'Returns the cre8-wc A2UI catalog (JSON Schema 2020-12). The catalog lists every ' +
            'component with typed props, enum constraints, slot shape, and events. Use ' +
            'view="metadata" for a lightweight summary, "component" for a single component def, ' +
            'or "full" for the entire schema.',
        inputSchema: {
            type: 'object',
            properties: {
                view: {
                    type: 'string',
                    enum: ['metadata', 'component', 'full'],
                    description: '"metadata" (default) = catalog id, version, component names/categories. ' +
                        '"component" = a single component definition (requires `component`). ' +
                        '"full" = the entire catalog JSON Schema (large).',
                },
                component: {
                    type: 'string',
                    description: 'Component tag name when view="component" (e.g., "cre8-button"). ' +
                        'The "cre8-" prefix is optional.',
                },
            },
        },
    },
    {
        name: 'validate_a2ui_spec',
        description: 'Validates an A2UI ComponentSpec tree against the cre8-wc catalog. Checks component ' +
            'allowlist, prop names, enum/const/type constraints, slot names, and event binding ' +
            'shape. Returns either { ok: true } or { ok: false, error } with a path-qualified ' +
            'message like "$.slots.body[0].props.variant: value \'bogus\' not in enum [\'primary\', ...]".',
        inputSchema: {
            type: 'object',
            properties: {
                spec: {
                    type: 'object',
                    description: 'ComponentSpec: { component: string, props?: object, children?: (spec|string)[], ' +
                        'slots?: Record<string, (spec|string)[]>, events?: Record<string, {handler: string}> }',
                },
            },
            required: ['spec'],
        },
    },
];
// Zod schemas for input validation
export const ListComponentsSchema = z.object({
    category: z.string().optional(),
    format: z.enum(['web', 'react']).optional(),
});
export const GetComponentSchema = z.object({
    name: z.string(),
    format: z.enum(['web', 'react']).optional(),
});
export const GetPatternsSchema = z.object({
    name: z.string().optional(),
    format: z.enum(['web', 'react']).optional(),
});
export const SearchComponentsSchema = z.object({
    query: z.string(),
    format: z.enum(['web', 'react']).optional(),
});
const ComponentNodeSchema = z.lazy(() => z.object({
    component: z.string(),
    props: z.record(z.unknown()).optional(),
    children: z.union([z.string(), ComponentNodeSchema, z.array(z.union([z.string(), ComponentNodeSchema]))]).optional(),
    slots: z.record(z.union([z.string(), ComponentNodeSchema, z.array(z.union([z.string(), ComponentNodeSchema]))])).optional(),
    content: z.string().optional(),
}));
export const GenerateCodeSchema = z.object({
    schema: z.union([ComponentNodeSchema, z.array(ComponentNodeSchema)]),
    format: z.enum(['react', 'web']).optional(),
    indent: z.number().optional(),
});
export const GetA2uiCatalogSchema = z.object({
    view: z.enum(['metadata', 'component', 'full']).optional(),
    component: z.string().optional(),
});
export const ValidateA2uiSpecSchema = z.object({
    spec: z.unknown(),
});
