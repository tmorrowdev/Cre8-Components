import Link from "next/link";
import StackBuilder from "@/components/stack-builder";

export default function StackPage() {
  return (
    <main className="app app--fullbleed">
      <header className="header">
        <h1>cre8 stack</h1>
        <span className="subtitle">chat · build · preview — full stack in one view</span>
        <Link href="/" className="header-nav-link">← Studio</Link>
      </header>
      <StackBuilder />
    </main>
  );
}
