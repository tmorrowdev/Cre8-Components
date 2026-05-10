#!/usr/bin/env python3
"""CLI entry point for cre8-apps.

Usage:
  python main.py "Build a contact form with name, email, and message"
  adk run cre8_apps   # interactive mode via ADK web UI
"""

import asyncio
import subprocess
import sys
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env", override=True)

import os
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from cre8_apps.agent import root_agent


async def run(prompt: str) -> None:
    session_service = InMemorySessionService()
    session = await session_service.create_session(
        state={}, app_name="cre8-apps", user_id="cli"
    )

    runner = Runner(
        app_name="cre8-apps",
        agent=root_agent,
        session_service=session_service,
    )

    message = types.Content(role="user", parts=[types.Part(text=prompt)])

    print(f"\n[cre8-apps] Building: {prompt}\n")
    print("=" * 60)

    final_state: dict = {}

    async for event in runner.run_async(
        session_id=session.id,
        user_id=session.user_id,
        new_message=message,
    ):
        if hasattr(event, "content") and event.content:
            for part in event.content.parts or []:
                if hasattr(part, "text") and part.text:
                    print(part.text, end="", flush=True)

        if hasattr(event, "actions") and event.actions and event.actions.state_delta:
            final_state.update(event.actions.state_delta)

    print("\n" + "=" * 60)

    # Write output files if we have generated app code
    session_data = await session_service.get_session(
        app_name="cre8-apps", user_id="cli", session_id=session.id
    )
    state = session_data.state if session_data else {}

    if "generated_app" in state:
        _write_output(state)


def _write_output(state: dict) -> None:
    out_dir = Path("output")
    out_dir.mkdir(exist_ok=True)

    generated = state.get("generated_app", "")

    page_tsx = _extract_block(generated, "PAGE_TSX")
    env_vars = _extract_block(generated, "ENV_VARS")
    db_provision = state.get("db_provision", "")
    migration_sql = _extract_block(db_provision, "MIGRATION_SQL")
    supabase_types = _extract_block(db_provision, "SUPABASE_TYPES")

    if page_tsx:
        _scaffold_nextjs_app(out_dir, page_tsx, migration_sql, env_vars, supabase_types)
        _launch_app(out_dir)
    else:
        if migration_sql:
            (out_dir / "migration.sql").write_text(migration_sql)
            print(f"[output] migration.sql written to {out_dir}/migration.sql")
        if env_vars:
            (out_dir / "env.example").write_text(env_vars)
            print(f"[output] env.example written to {out_dir}/env.example")


def _scaffold_nextjs_app(out_dir: Path, page_tsx: str, migration_sql: str, env_vars: str, supabase_types: str = "") -> None:
    app_dir = out_dir / "app"
    app_dir.mkdir(parents=True, exist_ok=True)

    (app_dir / "page.tsx").write_text(page_tsx)
    print(f"\n[output] app/page.tsx written")

    (app_dir / "layout.tsx").write_text(
        'import "./globals.css";\n\n'
        'export default function RootLayout({ children }: { children: React.ReactNode }) {\n'
        '  return (\n'
        '    <html lang="en">\n'
        '      <body>{children}</body>\n'
        '    </html>\n'
        '  );\n'
        '}\n'
    )

    (app_dir / "globals.css").write_text(
        "*, *::before, *::after { box-sizing: border-box; }\n"
        "body { margin: 0; font-family: sans-serif; }\n"
    )

    (out_dir / "next.config.ts").write_text(
        'import type { NextConfig } from "next";\n\n'
        'const nextConfig: NextConfig = {\n'
        '  outputFileTracingRoot: __dirname,\n'
        '};\n\n'
        'export default nextConfig;\n'
    )

    (out_dir / "tsconfig.json").write_text(
        '{\n'
        '  "compilerOptions": {\n'
        '    "target": "ES2017",\n'
        '    "lib": ["dom", "dom.iterable", "esnext"],\n'
        '    "allowJs": true,\n'
        '    "skipLibCheck": true,\n'
        '    "strict": true,\n'
        '    "noEmit": true,\n'
        '    "esModuleInterop": true,\n'
        '    "module": "esnext",\n'
        '    "moduleResolution": "bundler",\n'
        '    "resolveJsonModule": true,\n'
        '    "isolatedModules": true,\n'
        '    "jsx": "preserve",\n'
        '    "incremental": true,\n'
        '    "plugins": [{ "name": "next" }],\n'
        '    "paths": { "@/*": ["./*"] }\n'
        '  },\n'
        '  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],\n'
        '  "exclude": ["node_modules"]\n'
        '}\n'
    )

    (out_dir / "package.json").write_text(
        '{\n'
        '  "name": "cre8-generated-app",\n'
        '  "version": "0.1.0",\n'
        '  "private": true,\n'
        '  "scripts": {\n'
        '    "dev": "next dev",\n'
        '    "build": "next build",\n'
        '    "start": "next start"\n'
        '  },\n'
        '  "dependencies": {\n'
        '    "next": "^15.0.0",\n'
        '    "react": "^19.0.0",\n'
        '    "react-dom": "^19.0.0",\n'
        '    "@supabase/supabase-js": "^2.0.0",\n'
        '    "@supabase/ssr": "^0.6.0"\n'
        '  },\n'
        '  "devDependencies": {\n'
        '    "typescript": "^5.0.0",\n'
        '    "@types/node": "^20.0.0",\n'
        '    "@types/react": "^19.0.0",\n'
        '    "@types/react-dom": "^19.0.0"\n'
        '  }\n'
        '}\n'
    )

    utils_dir = out_dir / "utils" / "supabase"
    utils_dir.mkdir(parents=True, exist_ok=True)

    if supabase_types:
        (utils_dir / "types.ts").write_text(supabase_types)
        print("[output] utils/supabase/types.ts written")

    (utils_dir / "client.ts").write_text(
        'import { createBrowserClient } from "@supabase/ssr";\n\n'
        'export const createClient = () =>\n'
        '  createBrowserClient(\n'
        '    process.env.NEXT_PUBLIC_SUPABASE_URL!,\n'
        '    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,\n'
        '  );\n'
    )

    (utils_dir / "server.ts").write_text(
        'import { createServerClient } from "@supabase/ssr";\n'
        'import { cookies } from "next/headers";\n\n'
        'export const createClient = async () => {\n'
        '  const cookieStore = await cookies();\n'
        '  return createServerClient(\n'
        '    process.env.NEXT_PUBLIC_SUPABASE_URL!,\n'
        '    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,\n'
        '    {\n'
        '      cookies: {\n'
        '        getAll: () => cookieStore.getAll(),\n'
        '        setAll: (cookiesToSet) => {\n'
        '          try {\n'
        '            cookiesToSet.forEach(({ name, value, options }) =>\n'
        '              cookieStore.set(name, value, options)\n'
        '            );\n'
        '          } catch {}\n'
        '        },\n'
        '      },\n'
        '    },\n'
        '  );\n'
        '};\n'
    )

    (utils_dir / "middleware.ts").write_text(
        'import { createServerClient } from "@supabase/ssr";\n'
        'import { type NextRequest, NextResponse } from "next/server";\n\n'
        'export const updateSession = async (request: NextRequest) => {\n'
        '  let response = NextResponse.next({ request });\n'
        '  const supabase = createServerClient(\n'
        '    process.env.NEXT_PUBLIC_SUPABASE_URL!,\n'
        '    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,\n'
        '    {\n'
        '      cookies: {\n'
        '        getAll: () => request.cookies.getAll(),\n'
        '        setAll: (cookiesToSet) => {\n'
        '          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));\n'
        '          response = NextResponse.next({ request });\n'
        '          cookiesToSet.forEach(({ name, value, options }) =>\n'
        '            response.cookies.set(name, value, options)\n'
        '          );\n'
        '        },\n'
        '      },\n'
        '    },\n'
        '  );\n'
        '  await supabase.auth.getUser();\n'
        '  return response;\n'
        '};\n'
    )

    (out_dir / "middleware.ts").write_text(
        'import { type NextRequest } from "next/server";\n'
        'import { updateSession } from "@/utils/supabase/middleware";\n\n'
        'export async function middleware(request: NextRequest) {\n'
        '  return await updateSession(request);\n'
        '}\n\n'
        'export const config = {\n'
        '  matcher: [\n'
        '    "/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"\n'
        '  ],\n'
        '};\n'
    )

    (out_dir / ".gitignore").write_text(
        ".next/\nnode_modules/\n.env.local\n.env\n"
    )

    if env_vars:
        (out_dir / ".env.local").write_text(env_vars)
        print("[output] .env.local written (fill in your Supabase credentials)")

    if migration_sql:
        (out_dir / "migration.sql").write_text(migration_sql)
        print("[output] migration.sql written")

    print(f"\n[output] Next.js app scaffolded at {out_dir}/")


def _launch_app(out_dir: Path) -> None:
    print("\n[launch] Installing dependencies...")
    try:
        subprocess.run(["npm", "install"], cwd=out_dir, check=True)
    except subprocess.CalledProcessError:
        print("[launch] npm install failed — check the output above.")
        return

    print("\n[launch] Starting dev server at http://localhost:3000 (Ctrl+C to stop)\n")
    try:
        subprocess.run(["npm", "run", "dev"], cwd=out_dir)
    except KeyboardInterrupt:
        print("\n[launch] Dev server stopped.")


def _strip_fences(text: str) -> str:
    import re
    return re.sub(r"^```[a-zA-Z]*\n?", "", text.strip(), flags=re.MULTILINE).removesuffix("```").strip()


def _extract_block(text: str, tag: str) -> str:
    start = f"---{tag}---"
    if start not in text:
        return ""
    parts = tag.split("_")
    candidates = [f"---END_{tag}---"] + [f"---END_{p}---" for p in parts]
    for end_tag in candidates:
        if end_tag in text:
            return _strip_fences(text.split(start, 1)[1].split(end_tag, 1)[0].strip())
    return ""


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python main.py \"<description of the app you want to build>\"")
        sys.exit(1)
    asyncio.run(run(" ".join(sys.argv[1:])))
