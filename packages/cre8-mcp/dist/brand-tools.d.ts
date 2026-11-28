/**
 * Brand and token tools: the theming half of the connector.
 *
 * A brand is one `brand.json` (design-tokens/schema/brand.schema.json). Every
 * stylesheet a brand ships is generated from it by
 * `design-tokens/tools/brand.mjs`, the module these tools call — so the CSS an
 * agent gets from apply_brand is byte-for-byte what `pnpm tokens:build` would
 * write, and the contrast verdict is the one `pnpm tokens:check` enforces.
 * Nothing here re-implements colour math.
 *
 * `brand.mjs` is plain ESM outside this package. It is located at
 * `<cre8-wc root>/design-tokens/tools/brand.mjs` (set CRE8_WC_ROOT to point at
 * a checkout), or exactly at CRE8_BRAND_MODULE when that is set. Tests inject a
 * stub through either the env var or `setBrandModule`. A published
 * `@tmorrow/cre8-wc` does not ship `design-tokens/tools/`; the tools that need
 * it then fail with a message saying so, and the ones that only read JSON
 * (get_brand_contract, list_brands, list_tokens descriptions) keep working.
 */
import { z } from 'zod';
export type TokenTier = 'seed' | 'primitive' | 'semantic' | 'component' | 'legacy';
export type Brand = Record<string, unknown> & {
    name: string;
};
export interface ValidationResult {
    ok: boolean;
    errors: string[];
    warnings: string[];
}
export interface ContrastResult {
    target: 'AA' | 'AAA';
    pairs: Array<{
        fg: string;
        bg: string;
        mode: string;
        ratio: number;
        required: number;
        pass: boolean;
    }>;
    pass: boolean;
}
export interface GeneratedCss {
    brandCss: string;
    themeCss: string;
    fontsCss: string;
}
export interface BrandModule {
    loadBrand(nameOrPath: string): Brand | Promise<Brand>;
    validateBrand(brand: unknown): ValidationResult;
    generateBrandCss(brand: Brand, opts?: {
        scope?: string;
    }): GeneratedCss;
    checkContrast(brand: Brand): ContrastResult;
    listTokens(opts?: {
        tier?: TokenTier;
    }): Array<{
        name: string;
        tier: TokenTier;
        value: string;
        description?: string;
    }>;
    resolveToken(brand: Brand, name: string, mode?: string): string;
}
/** Dependency injection for tests and embedders. Pass null to go back to the file. */
export declare function setBrandModule(mod: BrandModule | null): void;
export declare function brandModulePath(): string;
export declare function brandModule(): Promise<BrandModule>;
/** `design-tokens/` in a checkout, or the built copy in a published package. */
export declare function designTokensDir(): string;
export declare function brandsDir(): string;
/** The brand.json as written, `extends` not applied. Null when absent. */
export declare function readBrandJson(name: string): Brand | null;
export declare function brandNames(): {
    withContract: string[];
    withoutContract: string[];
};
export interface BrandVoice {
    tone?: string;
    avoid?: string[];
    prefer?: string[];
}
/**
 * A brand's copy guidance, following `extends` until one sets it. Synchronous
 * and JSON-only so the generation path can attach it without brand.mjs.
 */
export declare function brandVoice(name: string): {
    brand: string;
    displayName?: string;
    voice: BrandVoice | null;
};
interface TokenIntent {
    tier: TokenTier;
    use: string;
    never: string;
    brandField?: string;
    modeAware?: boolean;
    legacyAlias?: string;
}
interface TokenIntents {
    tiers: Record<TokenTier, {
        order: number;
        summary: string;
        change: string;
    }>;
    tokens: Record<string, TokenIntent>;
    patterns: Array<{
        pattern: string;
        tier: TokenTier;
        use: string;
        never: string;
    }>;
}
export declare function loadTokenIntents(): TokenIntents;
export interface ListTokensInput {
    tier?: TokenTier;
    query?: string;
}
export declare function handleListTokens(input: ListTokensInput): Promise<string>;
export declare function handleGetBrandContract(): string;
export declare function handleListBrands(): Promise<string>;
export declare function handleValidateBrand(input: {
    brand: unknown;
}): Promise<string>;
export interface ApplyBrandInput {
    brand: unknown;
    scope?: string;
    surface_id?: string;
}
export declare function handleApplyBrand(input: ApplyBrandInput): Promise<string>;
export declare const brandTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            tier: {
                type: string;
                enum: ("component" | "semantic" | "seed" | "primitive" | "legacy")[];
                description: string;
            };
            query: {
                type: string;
                description: string;
            };
            brand?: undefined;
            scope?: undefined;
            surface_id?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            tier?: undefined;
            query?: undefined;
            brand?: undefined;
            scope?: undefined;
            surface_id?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            brand: {
                description: string;
                oneOf: {
                    type: string;
                }[];
            };
            tier?: undefined;
            query?: undefined;
            scope?: undefined;
            surface_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            brand: {
                description: string;
                oneOf: {
                    type: string;
                }[];
            };
            scope: {
                type: string;
                description: string;
            };
            surface_id: {
                type: string;
                description: string;
            };
            tier?: undefined;
            query?: undefined;
        };
        required: string[];
    };
})[];
export declare const BRAND_TOOL_NAMES: Set<string>;
export declare const ListTokensSchema: z.ZodObject<{
    tier: z.ZodOptional<z.ZodEnum<["seed", "primitive", "semantic", "component", "legacy"]>>;
    query: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    query?: string | undefined;
    tier?: "component" | "semantic" | "seed" | "primitive" | "legacy" | undefined;
}, {
    query?: string | undefined;
    tier?: "component" | "semantic" | "seed" | "primitive" | "legacy" | undefined;
}>;
export declare const ValidateBrandSchema: z.ZodObject<{
    brand: z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnknown>]>;
}, "strip", z.ZodTypeAny, {
    brand: string | Record<string, unknown>;
}, {
    brand: string | Record<string, unknown>;
}>;
export declare const ApplyBrandSchema: z.ZodObject<{
    brand: z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnknown>]>;
    scope: z.ZodOptional<z.ZodString>;
    surface_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    brand: string | Record<string, unknown>;
    scope?: string | undefined;
    surface_id?: string | undefined;
}, {
    brand: string | Record<string, unknown>;
    scope?: string | undefined;
    surface_id?: string | undefined;
}>;
export declare function handleBrandTool(name: string, args: unknown): Promise<string>;
export {};
