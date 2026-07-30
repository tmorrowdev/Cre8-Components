#!/usr/bin/env python3
"""Record the /website "brand in, UI out" demo to a video.

    python recording/record.py     # -> recording/cre8-brand-demo.webm

Records website/demo.html, served with the *exact* CSP from website/vercel.json.
That matters: the deploy sends `script-src 'self'` and `connect-src 'none'`, and
a demo that only works on a permissive static server is a demo that breaks in
production. Recording under the real policy means the video and the deploy agree.

Nothing is mocked. The schema is the one the MCP tool returns, exported by
scripts/export_website_demo.py; the components are the vendored shipped build;
the brand tokens come from the design system.

Requires:  pip install playwright && playwright install chromium ffmpeg
"""

from __future__ import annotations

import glob
import http.server
import json
import os
import shutil
import socketserver
import subprocess
import sys
import threading
from functools import partial
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
PKG = HERE.parent
WEBSITE = PKG.parent.parent / "website"
PORT = 8934
W, H = 1280, 720


# ── serving under the production CSP ──────────────────────────────────

def csp_headers() -> dict[str, str]:
    cfg = json.loads((WEBSITE / "vercel.json").read_text())
    for block in cfg.get("headers", []):
        if block.get("source") == "/(.*)":
            return {h["key"]: h["value"] for h in block["headers"]}
    return {}


def serve() -> socketserver.TCPServer:
    headers = csp_headers()

    class Handler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self):
            for k, v in headers.items():
                self.send_header(k, v)
            super().end_headers()

        def log_message(self, *a):
            pass

    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(
        ("127.0.0.1", PORT), partial(Handler, directory=str(WEBSITE)))
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def export() -> None:
    """Refresh the generated assets so the recording can't show stale output."""
    subprocess.run([sys.executable, str(PKG / "scripts" / "export_website_demo.py")],
                   check=True, capture_output=True)


def smooth_scroll(page, selector, to, steps=30, pause=32):
    start = page.evaluate(f"document.querySelector('{selector}').scrollTop")
    for i in range(1, steps + 1):
        y = start + (to - start) * i / steps
        page.evaluate(f"document.querySelector('{selector}').scrollTop = {y}")
        page.wait_for_timeout(pause)


def main() -> int:
    export()
    httpd = serve()
    raw = HERE / "raw"
    shutil.rmtree(raw, ignore_errors=True)
    raw.mkdir(parents=True)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            ctx = browser.new_context(
                viewport={"width": W, "height": H},
                record_video_dir=str(raw),
                record_video_size={"width": W, "height": H},
            )
            page = ctx.new_page()
            errors: list[str] = []
            page.on("console", lambda m: m.type == "error" and errors.append(m.text))

            page.goto(f"http://127.0.0.1:{PORT}/demo.html", wait_until="networkidle")
            page.wait_for_timeout(2400)     # components register, fonts paint

            # ── the pitch ─────────────────────────────────────────────
            page.wait_for_timeout(2600)

            # ── the run: brand → tokens → schema → UI ─────────────────
            page.click("#run")
            # play() takes ~11s: 13 typed lines, token count, 10 sections
            page.wait_for_timeout(13500)

            # ── read the finished page ────────────────────────────────
            span = page.evaluate(
                "document.querySelector('#preview').scrollHeight"
                " - document.querySelector('#preview').clientHeight")
            for frac in (0.3, 0.62, 1.0):
                smooth_scroll(page, "#preview", span * frac)
                page.wait_for_timeout(800)
            smooth_scroll(page, "#preview", 0)
            page.wait_for_timeout(900)

            # ── the payoff: same schema, different brand ──────────────
            switch = page.locator(".switcher .ghost")
            switch.nth(1).click()            # Cre8 default
            page.wait_for_timeout(2900)
            smooth_scroll(page, "#preview", span * 0.35)
            page.wait_for_timeout(1700)
            smooth_scroll(page, "#preview", 0)
            switch.nth(0).click()            # back to Regal Bank
            page.wait_for_timeout(2600)

            # ── the UI is wired, not a picture ────────────────────────
            page.evaluate("""() => {
                const el = document.querySelector(
                  '#canvas [data-cre8-action="tool:open_account"]');
                if (el) { el.scrollIntoView({block:'center'}); el.click(); }
            }""")
            page.wait_for_timeout(2300)
            page.evaluate("""() => {
                const c = document.querySelector('#canvas');
                const tile = [...c.querySelectorAll('cre8-card')].find(
                  x => (x.getAttribute('data-cre8-params')||'').includes('Savings'));
                if (tile) { tile.scrollIntoView({block:'center'}); tile.click(); }
            }""")
            page.wait_for_timeout(2600)

            ctx.close()
            browser.close()

        if errors:
            print(f"note   : {len(errors)} console error(s) during capture:",
                  file=sys.stderr)
            for e in errors[:5]:
                print("         " + e[:140], file=sys.stderr)
    finally:
        httpd.shutdown()

    files = sorted(glob.glob(str(raw / "*.webm")), key=os.path.getsize, reverse=True)
    if not files:
        print("no video produced", file=sys.stderr)
        return 1

    webm = HERE / "cre8-brand-demo.webm"
    shutil.move(files[0], webm)
    shutil.rmtree(raw, ignore_errors=True)
    print(f"webm : {webm.relative_to(PKG)}  ({webm.stat().st_size / 1e6:.1f} MB)")

    system_ffmpeg = shutil.which("ffmpeg")
    if system_ffmpeg:
        mp4 = HERE / "cre8-brand-demo.mp4"
        r = subprocess.run(
            [system_ffmpeg, "-y", "-loglevel", "error", "-i", str(webm),
             "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24",
             "-movflags", "+faststart", str(mp4)],
            capture_output=True, text=True)
        if r.returncode == 0:
            print(f"mp4  : {mp4.relative_to(PKG)}  ({mp4.stat().st_size / 1e6:.1f} MB)")
        else:
            print("mp4 conversion failed:", r.stderr[-300:], file=sys.stderr)
    else:
        print("mp4  : skipped — no system ffmpeg on PATH (Playwright's bundled "
              "build is VP8-only). `brew install ffmpeg` to also get an .mp4.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
