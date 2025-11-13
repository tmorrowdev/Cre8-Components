# AI Elements Demo

A Next.js demonstration application showcasing how [AI Elements](https://www.npmjs.com/package/ai-elements) can work alongside the cre8-react component library.

## Overview

This demo app demonstrates the integration of:

- **AI Elements**: Pre-built AI-native components for conversations, messages, and more
- **Vercel AI SDK**: For AI chat functionality and streaming responses
- **shadcn/ui**: Component library and custom registry
- **Next.js 15**: With App Router and React 19
- **Tailwind CSS 4**: For styling
- **cre8-react**: 82+ React components (can coexist with AI Elements)

## Prerequisites

Before running this demo, ensure you have:

- Node.js 20 or later
- pnpm 8 or later
- An OpenAI API key or AI Gateway key

## Getting Started

### 1. Install Dependencies

From the repository root:

```bash
pnpm install
```

### 2. Set Up Environment Variables

Copy the example environment file and add your API keys:

```bash
cd apps/ai-elements-demo
cp .env.example .env.local
```

Edit `.env.local` and add your API key:

```env
# Option 1: OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Option 2: AI Gateway (recommended - includes $5/month free credits)
AI_GATEWAY_API_KEY=your_ai_gateway_key_here
```

**Recommended**: Use [AI Gateway](https://vercel.com/docs/ai-gateway) which provides:
- $5 in free usage per month
- Access to multiple AI providers
- No need for individual API keys from each provider

Get your AI Gateway key here: https://vercel.com/ai/api-keys

### 3. Run the Development Server

From the repository root:

```bash
pnpm ai-demo:dev
```

Or from this directory:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

## Features

### Basic Chat Demo

A simple chat interface demonstrating:
- Real-time streaming AI responses
- Message history
- Clean, responsive UI

Access it at: [http://localhost:3000/chat](http://localhost:3000/chat)

### AI Elements Integration

The app is configured to use AI Elements components. To add AI Elements components:

```bash
# From this directory
npx ai-elements@latest add [component-name]

# Or using shadcn CLI with the AI Elements registry
npx shadcn@latest add [component-name] --registry ai-elements
```

Available AI Elements components include:
- Conversation components
- Message components
- Chat interfaces
- And more...

Visit the [AI Elements documentation](https://www.npmjs.com/package/ai-elements) for a full list of components.

## Project Structure

```
apps/ai-elements-demo/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI chat API endpoint
│   ├── chat/
│   │   └── page.tsx              # Chat demo page
│   ├── globals.css               # Global styles with Tailwind & shadcn
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ai-elements/              # AI Elements components (add via CLI)
│   └── ui/                       # shadcn/ui components
├── lib/
│   └── utils.ts                  # Utility functions
├── components.json               # shadcn/ui & AI Elements config
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Configuration

### shadcn/ui Configuration

The `components.json` file configures both shadcn/ui and AI Elements:

```json
{
  "style": "new-york",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "ai-elements": "@/components/ai-elements"
  },
  "registries": {
    "ai-elements": "https://ai-elements.vercel.app/r"
  }
}
```

### AI SDK Configuration

The AI SDK is configured in the API route at `app/api/chat/route.ts`. You can customize:

- Model selection (currently using `gpt-4-turbo`)
- Provider (OpenAI, Anthropic, etc.)
- Max duration for streaming responses
- Additional AI SDK features

## Using with cre8-react

While this demo focuses on AI Elements, you can also use cre8-react components alongside AI Elements:

```tsx
import { Button } from '@cre8/cre8-react';
import { ConversationComponent } from '@/components/ai-elements/conversation';

export default function MyPage() {
  return (
    <div>
      {/* cre8-react component */}
      <Button>Click me</Button>

      {/* AI Elements component */}
      <ConversationComponent />
    </div>
  );
}
```

Note that cre8-react uses Web Components and CSS Custom Properties for theming, while AI Elements uses Tailwind CSS, so you may need to adjust styling for consistency.

## Available Scripts

From the repository root:

- `pnpm ai-demo:dev` - Start development server
- `pnpm ai-demo:build` - Build for production
- `pnpm ai-demo:start` - Start production server

From this directory:

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Learn More

### AI Elements
- [AI Elements Documentation](https://www.npmjs.com/package/ai-elements)
- [AI Elements GitHub](https://github.com/vercel/ai-elements) (if available)

### Vercel AI SDK
- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [AI SDK Examples](https://sdk.vercel.ai/examples)

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### shadcn/ui
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [shadcn/ui GitHub](https://github.com/shadcn/ui)

### cre8-react
- See the `packages/cre8-react` directory in this monorepo
- View cre8-react Storybook for component documentation

## Troubleshooting

### API Key Issues

If you're getting API errors:
1. Verify your API key is correct in `.env.local`
2. Ensure the file is named `.env.local` (not `.env`)
3. Restart the development server after changing environment variables

### Build Errors

If you encounter build errors:
1. Delete `.next` folder: `rm -rf .next`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
3. Clear pnpm cache: `pnpm store prune`

### Tailwind CSS Not Working

If styles aren't applying:
1. Verify `globals.css` is imported in `app/layout.tsx`
2. Check that your component files are included in `tailwind.config.ts` content array
3. Restart the development server

## Contributing

This is a demo application within the Cre8 Components monorepo. For contribution guidelines, see the main repository README.

## License

MIT
