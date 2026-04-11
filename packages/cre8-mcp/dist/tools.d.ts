/**
 * Cre8 MCP Tool Definitions
 */
import { z } from 'zod';
export declare const tools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            category: {
                type: string;
                description: string;
            };
            format: {
                type: string;
                enum: string[];
                description: string;
            };
            name?: undefined;
            query?: undefined;
            schema?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            format: {
                type: string;
                enum: string[];
                description: string;
            };
            category?: undefined;
            query?: undefined;
            schema?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            format: {
                type: string;
                enum: string[];
                description: string;
            };
            category?: undefined;
            query?: undefined;
            schema?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            query: {
                type: string;
                description: string;
            };
            format: {
                type: string;
                enum: string[];
                description: string;
            };
            category?: undefined;
            name?: undefined;
            schema?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            schema: {
                type: string;
                description: string;
            };
            format: {
                type: string;
                enum: string[];
                description: string;
            };
            category?: undefined;
            name?: undefined;
            query?: undefined;
        };
        required: string[];
    };
})[];
export declare const ListComponentsSchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodEnum<["web", "react"]>>;
}, "strip", z.ZodTypeAny, {
    category?: string | undefined;
    format?: "web" | "react" | undefined;
}, {
    category?: string | undefined;
    format?: "web" | "react" | undefined;
}>;
export declare const GetComponentSchema: z.ZodObject<{
    name: z.ZodString;
    format: z.ZodOptional<z.ZodEnum<["web", "react"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    format?: "web" | "react" | undefined;
}, {
    name: string;
    format?: "web" | "react" | undefined;
}>;
export declare const GetPatternsSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodEnum<["web", "react"]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    format?: "web" | "react" | undefined;
}, {
    name?: string | undefined;
    format?: "web" | "react" | undefined;
}>;
export declare const SearchComponentsSchema: z.ZodObject<{
    query: z.ZodString;
    format: z.ZodOptional<z.ZodEnum<["web", "react"]>>;
}, "strip", z.ZodTypeAny, {
    query: string;
    format?: "web" | "react" | undefined;
}, {
    query: string;
    format?: "web" | "react" | undefined;
}>;
export declare const GenerateCodeSchema: z.ZodObject<{
    schema: z.ZodUnion<[z.ZodType<unknown, z.ZodTypeDef, unknown>, z.ZodArray<z.ZodType<unknown, z.ZodTypeDef, unknown>, "many">]>;
    format: z.ZodOptional<z.ZodEnum<["react", "web"]>>;
    indent: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    schema?: unknown;
    format?: "web" | "react" | undefined;
    indent?: number | undefined;
}, {
    schema?: unknown;
    format?: "web" | "react" | undefined;
    indent?: number | undefined;
}>;
