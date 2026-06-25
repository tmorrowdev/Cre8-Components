import { readFile, readdir } from "fs/promises";
import path from "path";
import type { Pattern } from "@/lib/a2ui-demo/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Human metadata for the bundled a2ui example specs. Files live in the cre8-wc
// package; we read them at request time (like the cdn route) to seed the
// workspace's builtin pattern library — full UI pages the user can @-mention.
const META: Record<string, { name: string; description: string; category: string }> = {
  "portfolio.json": {
    name: "Portfolio Page",
    description: "Full single-page portfolio: hero, work grid, about, contact.",
    category: "Page",
  },
  "card-gallery.json": {
    name: "Card Gallery",
    description: "Responsive grid of product/content cards with actions.",
    category: "Layout",
  },
  "dating-grid.json": {
    name: "Profile Grid",
    description: "Profile cards with like/pass actions in a responsive grid.",
    category: "Layout",
  },
};

const EXAMPLES_DIR = "../cre8-wc/a2ui/examples";

export async function GET() {
  try {
    const dir = path.resolve(process.cwd(), EXAMPLES_DIR);
    const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
    const patterns: Pattern[] = [];
    for (const file of files) {
      const meta = META[file];
      if (!meta) continue;
      try {
        const raw = await readFile(path.join(dir, file), "utf8");
        const spec = JSON.parse(raw);
        patterns.push({
          id: `builtin:${file.replace(/\.json$/, "")}`,
          name: meta.name,
          description: meta.description,
          category: meta.category,
          spec,
          builtin: true,
        });
      } catch {
        // skip unreadable / invalid example
      }
    }
    return Response.json({ patterns });
  } catch (err) {
    return Response.json(
      { patterns: [], error: err instanceof Error ? err.message : String(err) },
      { status: 200 },
    );
  }
}
