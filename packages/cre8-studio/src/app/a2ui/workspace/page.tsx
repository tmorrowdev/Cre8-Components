import Link from "next/link";
import Workspace from "@/components/a2ui-demo/workspace";

export default function WorkspacePage() {
  return (
    <main className="app--fullbleed a2ui-workspace-page">
      <header className="header" style={{ padding: "10px 16px" }}>
        <h1 style={{ fontSize: 16 }}>A2UI workspace</h1>
        <span className="subtitle">@mention patterns · components · data → live app renderer</span>
        <Link href="/a2ui/brand" className="header-nav-link">Brand →</Link>
        <Link href="/a2ui" className="header-nav-link">← A2UI</Link>
      </header>
      <Workspace />
    </main>
  );
}
