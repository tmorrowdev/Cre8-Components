#!/usr/bin/env node
/**
 * pnpm tokens:build [brand...]   regenerate one, several or all brands
 * pnpm tokens:check              validate every brand + contrast; fail on
 *                                errors or on generated css that is stale
 */
import fs from 'node:fs';
import path from 'node:path';
import { BRANDS_DIR, checkContrast, generateBrandFiles, listBrands, loadBrand, validateBrand } from './brand.mjs';

const [cmd = 'check', ...args] = process.argv.slice(2);

/** A brand keeps its Storybook .module.ts if it already has one. */
const hasModule = (name) => fs.existsSync(path.join(BRANDS_DIR, name, 'css', `tokens_${name}.module.ts`));

function report(name, result, contrast) {
  for (const w of result.warnings) console.log(`  warn  ${w}`);
  for (const e of result.errors) console.log(`  FAIL  ${e}`);
  if (contrast) {
    for (const c of contrast.corrections) console.log(`  fix   ${c}`);
    const failing = contrast.pairs.filter((p) => !p.pass);
    console.log(`  contrast ${contrast.target}: ${contrast.pairs.length - failing.length}/${contrast.pairs.length} pairs pass${failing.length ? ` (${failing.filter((p) => p.waived).length} waived)` : ''}`);
  }
}

function build(names) {
  let failed = false;
  for (const name of names) {
    const brand = loadBrand(name);
    const result = validateBrand(brand);
    console.log(`${name}`);
    report(name, result, result.errors.length ? null : checkContrast(brand));
    if (!result.ok) { failed = true; continue; }
    const files = generateBrandFiles(brand, { withModule: hasModule(name) });
    for (const [rel, content] of Object.entries(files)) {
      const file = path.join(BRANDS_DIR, name, rel);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      const prev = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
      if (prev !== content) fs.writeFileSync(file, content);
      console.log(`  ${prev === content ? 'same ' : 'wrote'} ${path.join(name, rel)}`);
    }
  }
  return failed ? 1 : 0;
}

function check(names) {
  let failed = false;
  for (const name of names) {
    console.log(name);
    let brand;
    try { brand = loadBrand(name); } catch (e) { console.log(`  FAIL  ${e.message}`); failed = true; continue; }
    const result = validateBrand(brand);
    report(name, result, result.errors.length ? null : checkContrast(brand));
    if (!result.ok) { failed = true; continue; }
    const files = generateBrandFiles(brand, { withModule: hasModule(name) });
    for (const [rel, content] of Object.entries(files)) {
      const file = path.join(BRANDS_DIR, name, rel);
      if (!fs.existsSync(file)) { console.log(`  FAIL  ${rel} missing — run pnpm tokens:build ${name}`); failed = true; continue; }
      if (fs.readFileSync(file, 'utf8') !== content) {
        console.log(`  FAIL  ${rel} is stale (differs from brand.json) — run pnpm tokens:build ${name}`);
        failed = true;
      }
    }
  }
  console.log(failed ? '\ntokens:check failed' : '\ntokens:check ok');
  return failed ? 1 : 0;
}

const names = args.length ? args : listBrands();
if (cmd === 'build') process.exitCode = build(names);
else if (cmd === 'check') process.exitCode = check(names);
else {
  console.error(`usage: brand-cli.mjs build [brand...] | check [brand...]`);
  process.exitCode = 2;
}
