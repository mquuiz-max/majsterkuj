// Porządki po usunięciu placeholderów: usuwa sieroce bulletpointy (typu "- **Label:**")
// oraz trailing whitespace we wszystkich artykułach.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'C:/Users/user/Desktop/webpage/src/content/articles';
const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
let changed = 0;

for (const f of files) {
  const p = join(dir, f);
  const original = readFileSync(p, 'utf8');
  const eol = original.includes('\r\n') ? '\r\n' : '\n';
  const lines = original.split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    const s = line.replace(/[ \t]+$/, '');
    // sierota: "- **Label:**" (pogrubiony podpis + dwukropek, nic więcej)
    if (/^[-*]\s+\*\*[^*]+:\*\*\s*$/.test(s)) continue;
    out.push(s);
  }
  let result = out.join(eol).replace(/(\r?\n){3,}/g, eol + eol);
  result = result.replace(/(\r?\n)+$/, '') + eol;
  if (result !== original) {
    writeFileSync(p, result, 'utf8');
    changed += 1;
    console.log('UPDATED:', f);
  }
}
console.log('Changed files:', changed);
