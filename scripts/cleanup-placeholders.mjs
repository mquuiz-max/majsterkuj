// Usuwa notki-placeholdery (⚠️) oraz martwe linki afiliacyjne (awinmid=0000)
// z wszystkich artykułów w src/content/articles/.
// Uruchom: node scripts/cleanup-placeholders.mjs
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
  for (const raw of lines) {
    let line = raw;
    const hadAwin = line.includes('awinmid=0000');

    // 1. Notki-placeholdery z ikoną ostrzeżenia — usuń całą linię.
    if (line.includes('⚠️')) continue;

    // 2. Martwe linki Awin (awinmid=0000) — usuń sam link.
    if (hadAwin) {
      line = line.replace(
        /\[[^\]]*\]\(https:\/\/www\.awin1\.com\/cread\.php\?awinmid=0000[^)]*\)/g,
        '',
      );
      const t = line.trim();
      if (t === '' || t === '-' || t === '*' || t === '- ' || t === '* ') continue;
    }

    out.push(line);
  }

  // 3. Końcowa notka "*Powyższe linki to przykład..." + poprzedzający ją "---".
  const final = [];
  for (let i = 0; i < out.length; i++) {
    if (out[i].trim().startsWith('*Powyższe linki to przykład')) {
      while (final.length && final[final.length - 1].trim() === '') final.pop();
      if (final.length && final[final.length - 1].trim() === '---') final.pop();
      while (final.length && final[final.length - 1].trim() === '') final.pop();
      continue;
    }
    final.push(out[i]);
  }

  let result = final.join(eol).replace(/(\r?\n)+$/, '') + eol;

  if (result !== original) {
    writeFileSync(p, result, 'utf8');
    changed += 1;
    console.log('UPDATED:', f);
  }
}

console.log('Changed files:', changed);
