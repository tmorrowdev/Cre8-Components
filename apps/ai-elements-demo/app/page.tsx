import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Elements Demo</h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600">
          A Next.js demonstration app showcasing how{" "}
          <a
            href="https://www.npmjs.com/package/ai-elements"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            AI Elements
          </a>{" "}
          can work alongside{" "}
          <span className="font-semibold">cre8-react</span> components.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-3">AI Elements</h2>
            <p className="text-gray-600 mb-4">
              Pre-built AI-native components for conversations, messages, and more. Built on shadcn/ui and the Vercel AI SDK.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
              <li>Next.js App Router</li>
              <li>Tailwind CSS 4</li>
              <li>shadcn/ui components</li>
              <li>Vercel AI SDK</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-3">cre8-react</h2>
            <p className="text-gray-600 mb-4">
              Comprehensive React component library with 82+ components built on Web Components.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
              <li>82+ React components</li>
              <li>Web Components architecture</li>
              <li>Multiple brand themes</li>
              <li>Design token system</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-3">Quick Start</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Copy <code className="bg-gray-200 px-2 py-1 rounded">.env.example</code> to <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code></li>
            <li>Add your OpenAI API key or AI Gateway key</li>
            <li>Run <code className="bg-gray-200 px-2 py-1 rounded">pnpm ai-demo:dev</code> from the root</li>
            <li>Try the demos below!</li>
          </ol>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Demos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/chat"
              className="block border border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all"
            >
              <h4 className="text-xl font-semibold mb-2">Basic Chat →</h4>
              <p className="text-gray-600">
                Simple chat interface using the Vercel AI SDK with streaming responses.
              </p>
            </Link>

            <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 opacity-75">
              <h4 className="text-xl font-semibold mb-2">AI Elements Components</h4>
              <p className="text-gray-600">
                Coming soon: Pre-built conversation and message components.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Install with: <code className="bg-gray-200 px-1 rounded">npx ai-elements@latest add</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
