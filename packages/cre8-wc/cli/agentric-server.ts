#!/usr/bin/env node

import { AgentRPC } from 'agentrpc';
import { z } from 'zod';
import { ThemeGenerator } from './theme-generator';
import { ThemeManager } from './theme-manager';

// Initialize AgentRPC server
const rpc = new AgentRPC({
  apiSecret: process.env.AGENTRPC_API_SECRET,
});

const themeGenerator = new ThemeGenerator();
const themeManager = new ThemeManager();

// Register theme generation endpoint
rpc.register({
  name: 'generateTheme',
  description: 'Generate a new theme from a website URL',
  schema: z.object({ 
    name: z.string().min(1).max(50),
    url: z.string().url(),
    description: z.string().optional()
  }),
  handler: async ({ name, url, description }) => {
    try {
      console.log(`🚀 Generating theme "${name}" from ${url}`);
      
      const themePath = await themeGenerator.generateTheme({
        name,
        url,
        description
      });
      
      return {
        success: true,
        message: `Theme "${name}" generated successfully`,
        themePath,
        previewUrl: `${themePath.replace('tokens.css', 'preview.html')}`
      };
    } catch (error) {
      console.error('Theme generation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: `Failed to generate theme "${name}"`
      };
    }
  },
});

// Register CSS extraction endpoint (for direct CSS analysis)
rpc.register({
  name: 'extractCssFromUrl',
  description: 'Extract and analyze CSS from a website URL',
  schema: z.object({ url: z.string().url() }),
  handler: async ({ url }) => {
    try {
      console.log(`🔍 Extracting CSS from ${url}`);
      
      const cssText = await themeGenerator.extractCssFromUrl(url);
      const tokens = themeGenerator.parseCss(cssText);
      
      return {
        success: true,
        url,
        cssLength: cssText.length,
        tokens,
        message: 'CSS extracted and analyzed successfully'
      };
    } catch (error) {
      console.error('CSS extraction failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: `Failed to extract CSS from ${url}`
      };
    }
  },
});

// Register theme management endpoints
rpc.register({
  name: 'listThemes',
  description: 'List all available themes',
  schema: z.object({}),
  handler: async () => {
    try {
      const themes = await themeManager.listThemes();
      return {
        success: true,
        themes,
        count: themes.length
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },
});

rpc.register({
  name: 'activateTheme',
  description: 'Activate a theme in Storybook',
  schema: z.object({ name: z.string() }),
  handler: async ({ name }) => {
    try {
      await themeManager.activateTheme(name);
      return {
        success: true,
        message: `Theme "${name}" activated successfully`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },
});

rpc.register({
  name: 'validateTheme',
  description: 'Validate a theme for errors and warnings',
  schema: z.object({ name: z.string() }),
  handler: async ({ name }) => {
    try {
      const validation = await themeManager.validateTheme(name);
      return {
        success: true,
        validation,
        isValid: validation.isValid
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },
});

rpc.register({
  name: 'generateThemePreview',
  description: 'Generate an HTML preview for a theme',
  schema: z.object({ name: z.string() }),
  handler: async ({ name }) => {
    try {
      const previewPath = await themeManager.generateThemePreview(name);
      return {
        success: true,
        previewPath,
        message: `Preview generated for theme "${name}"`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },
});

// Health check endpoint
rpc.register({
  name: 'healthCheck',
  description: 'Check if the theme service is running',
  schema: z.object({}),
  handler: async () => {
    return {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        themeGenerator: true,
        themeManager: true,
        openai: !!process.env.OPENAI_API_KEY
      }
    };
  },
});

// Start the server
console.log('🚀 Starting AgentRPC Theme Service...');
console.log('📋 Available endpoints:');
console.log('  - generateTheme(name, url, description?)');
console.log('  - extractCssFromUrl(url)');
console.log('  - listThemes()');
console.log('  - activateTheme(name)');
console.log('  - validateTheme(name)');
console.log('  - generateThemePreview(name)');
console.log('  - healthCheck()');

if (!process.env.AGENTRPC_API_SECRET) {
  console.warn('⚠️  Warning: AGENTRPC_API_SECRET not set - using default');
}

if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️  Warning: OPENAI_API_KEY not set - AI features will not work');
}

console.log('\n🌐 AgentRPC server listening...');
rpc.listen();