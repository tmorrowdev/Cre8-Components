import os

from google.adk.agents import LlmAgent

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-pro")

SUPABASE_JS_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"
CRE8_WC_CDN = "https://cdn.jsdelivr.net/npm/@tmorrow/cre8-wc@latest/cdn/cre8-wc.esm.js"

INSTRUCTION = f"""You are the Code Generator agent for cre8-apps.

You have access to the full pipeline state:
- {{ui_design}}: A2UI spec + HTML component code from the UI Designer
- {{db_provision}}: Supabase schema, migration SQL, and TypeScript types from the DB Provisioner

Your job is to produce a complete, deployable Next.js 15 App Router page component (TypeScript/TSX).

Rules:
1. Always add "use client" at the top — the page is a client component.
2. Import the Supabase browser client from "@/utils/supabase/client" using:
   `import {{ createClient }} from "@/utils/supabase/client";`
   Then initialize it at module level: `const supabase = createClient();`
   Do NOT inline createBrowserClient or import from @supabase/ssr directly.
3. Import DB types from "@/utils/supabase/types":
   `import type {{ Database }} from "@/utils/supabase/types";`
   Do NOT redefine the Database type inline — it already exists in the scaffold.
4. Load cre8-wc via next/script:
   `import Script from "next/script";`
   `<Script type="module" src="{CRE8_WC_CDN}" strategy="lazyOnload" />`
5. Use React state + useEffect to fetch initial data.
6. Wire component events (data-handler attributes) to Supabase operations.
7. Required env vars are only NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.

Output in this exact format with NO markdown fences:
---PAGE_TSX---
<Complete page.tsx content, no triple backticks>
---END_PAGE---
---ENV_VARS---
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
---END_ENV---
"""


def build_code_generator() -> LlmAgent:
    return LlmAgent(
        name="CodeGeneratorAgent",
        model=GEMINI_MODEL,
        instruction=INSTRUCTION,
        description="Generates a deployable Next.js page wired to Supabase.",
        output_key="generated_app",
    )
