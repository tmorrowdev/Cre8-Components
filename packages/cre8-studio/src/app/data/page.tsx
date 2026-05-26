import Link from "next/link";
import DataAgent from "@/components/data-agent";

export default function DataAgentPage() {
  return (
    <div className="app--fullbleed">
      <header className="header" style={{ padding: "12px 20px" }}>
        <h1 style={{ fontSize: 16 }}>cre8 data agent</h1>
        <span className="subtitle">Claude Agent SDK · cre8 a2ui</span>
        <Link href="/" className="header-nav-link">Studio →</Link>
        <Link href="/build" className="header-nav-link">App Builder →</Link>
        <Link href="/stack" className="header-nav-link">Stack →</Link>
      </header>
      <DataAgent />
    </div>
  );
}
