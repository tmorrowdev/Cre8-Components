import Link from "next/link";
import Chat from "@/components/chat";

export default function Home() {
  return (
    <main className="app">
      <header className="header">
        <h1>cre8 studio</h1>
        <span className="subtitle">Gemini + cre8-wc A2UI · streaming chat</span>
        <Link href="/build" className="header-nav-link">App Builder →</Link>
        <Link href="/stack" className="header-nav-link">Stack →</Link>
        <Link href="/data" className="header-nav-link">Data Agent →</Link>
      </header>
      <Chat />
    </main>
  );
}
