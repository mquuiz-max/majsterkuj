# HANDOFF — Majsterkuj (serwis afiliacyjny „narzędzia do majsterkowania")

> Dokument dla kolejnej sesji/agenta — żeby od razu wiedzieć, o co chodzi i kontynuować pracę bez powtarzania ustaleń.

## 1. Cel projektu
Strona webowa + narzędzie + treści SEO, zarabiająca na prowizjach afiliacyjnych (Ceneo API, Awin) w niszy **elektronarzędzia / majsterkowanie**.
Model: przydatne narzędzie + poradniki → ruch z Google → linki afiliacyjne → prowizja od zakupów.

**Ograniczenia (z briefu — NIE negocjować ponownie):**
- ❌ Zero monetyzacji do czasu zgody pracodawcy (właściciel pracuje w sądzie).
- ❌ Web only (zero apki mobilnej).
- ❌ Zero scrapowania OLX/Allegro — tylko legalne feedy (Ceneo API, Awin).
- ❌ Zero pracy z klientami — czysta afiliacja, zero B2B/lead-gen.

## 2. Stack technologiczny
- **Astro 7.3.5** (wybrane zamiast Next.js — priorytet: szybkość i treści statyczne)
- **TypeScript**, **Tailwind CSS 4.3.3** (via `@tailwindcss/vite`)
- **@astrojs/sitemap**, **@vercel/analytics** (v2.0.1)
- Hosting: **Vercel** (darmowy) → `https://majsterkuj.vercel.app/`
- GitHub: user **`mquuiz-max`**, repo **`majsterkuj`**

## 3. LOKALIZACJA (kluczowe)
- Projekt: **`C:\Users\user\Desktop\webpage`**
- Domyślny katalog narzędzia (workspace IDE): `c:\plugin` — **pusty i NIEUŻYWANY**; nie da się go zmienić z poziomu narzędzia (resetuje się przed każdym poleceniem).
- Każde polecenie wymaga prefiksu: `cd /d C:\Users\user\Desktop\webpage && ...`

## 4. Struktura — kluczowe pliki
```
webpage/
├── astro.config.mjs          # site + adapter @astrojs/vercel; integrations: sitemap(); vite: tailwind
├── package.json              # ⚠️ zawiera "allowScripts": {"esbuild": true} — NIE usuwać!
├── .env.example              # ⭐ wzór zmiennych afiliacyjnych (Awin / Ceneo / domeny)
├── tsconfig.json
├── run-dev.bat               # skrót do `npm.cmd run dev`
├── public/robots.txt         # z wpisem Sitemap
├── public/favicon.svg
├── src/
│   ├── styles/global.css     # Tailwind + style .article-body (proza)
│   ├── layouts/Layout.astro  # <head> meta+SEO+google-site-verification, nav, footer, <Analytics/>
│   ├── content.config.ts     # kolekcja "articles" (glob loader + schema z)
│   ├── content/articles/     # 10 artykułów SEO (.md)
│   ├── data/renovation.ts    # ⭐ pomieszczenia + prace(works) + narzędzia + standardy (stawki!)
│   ├── data/seo-keywords.ts  # 10 fraz SEO z researchu
│   ├── lib/affiliate/        # ⭐ config.ts + links.ts (deep-link Awin, cloak) + awin.ts + ceneo.ts
│   └── pages/
│       ├── api/click.ts      # ⭐ cloakowanie kliknięć (302 → link afiliacyjny)
│       ├── api/offers.ts     # dane produktów z Ceneo/Awin
│       ├── index.astro       # ⭐ kalkulator kosztów remontu (formularz + wynik, vanilla JS)
│       ├── poradniki/index.astro        # lista artykułów
│       ├── poradniki/[...slug].astro    # szablon artykułu
│       ├── o-nas.astro
│       └── polityka-prywatnosci.astro
```

## 5. Co jest zbudowane i DZIAŁA
1. **Kalkulator kosztów remontu** — pomieszczenie + metraż + standard + **checkboxy zakresu prac** → przedział kosztów (robocizna/materiały) + lista narzędzi z linkami afiliacyjnymi (placeholdery `#`).
2. **10 artykułów SEO** (content collection) — rankingi, porównania, kosztorysy.
3. **sitemap-index.xml + sitemap-0.xml** (14 adresów).
4. **Google Search Console** — tag weryfikacyjny w `<head>`.
5. **Vercel Analytics** — `<Analytics />` w layout.
6. Strony **„O nas"** i **„Polityka prywatności"** + linki w stopce.
7. **Build przechodzi** (14 stron, exit 0). Ostatnia weryfikacja OK.
8. **Integracja afiliacyjna (szkielet)** — endpointy serverless `/api/click` (cloakowanie kliknięć) i `/api/offers` (dane produktów), konfiguracja z env (Awin/Ceneo). Działa bez kluczy: linki przekierowują bezpośrednio do sklepu (bez prowizji).

## 6. Git
- Repo zainicjalizowane, branch **`main`**, zdalne `origin` → `https://github.com/mquuiz-max/majsterkuj.git`.
- Autor commitów: `mquuiz-max <mquuiz-max@users.noreply.github.com>`.
- 5 commitów (od najnowszego): `kalkulator-checkboxy-i-strony-info`, `dodaj-google-search-console`, `dodaj-vercel-analytics`, `fix-sitemap-domain`, `Initial-commit`.
- ⚠️ Ostatnie 4 commity mogą wymagać `git push` (właściciel robi to sam — wymaga logowania GitHub).

## 7. PUŁAPKI TECHNICZNE (ważne dla kontynuacji)
1. **PowerShell blokuje `npm`** (polityka wykonywania). Używać `npm.cmd` lub `cmd /c npm ...`.
2. **npm 11 `allowScripts`** — `package.json` ma wpis dla esbuild. **Nie usuwać**, bo zablokuje postinstall esbuild i zepsuje binarki.
3. **npm 11 bug #4828** (pomijanie opcjonalnych zależności natywnych) — jeśli brakuje binarek rolldown/esbuild: usunąć `node_modules` + `package-lock.json` i reinstalować.
4. **Terminal gubi wyjście** — używać `> plik.log 2>&1` + odczytać plik; do długich operacji marker `&& echo SUCCESS > x.ok || echo FAIL > x.ok` i odpytywać marker przez odczyt pliku (nie uruchamiać kolejnych poleceń w trakcie — zabijają proces).
5. **Linki afiliacyjne to placeholdery**: `#` w `renovation.ts`, `awinmid=0000` w artykułach. Podmienić dopiero po: założeniu kont Awin/Ceneo + zgodzie pracodawcy.
6. **Domena w `site`** (`astro.config.mjs`) = `majsterkuj.vercel.app`. Po kupnie własnej domeny — zaktualizować i przebudować.
7. **Astro 7** — usunięto `output: "hybrid"`; endpointy serverless wymagają `export const prerender = false` + adaptera `@astrojs/vercel`.
8. **Node 26 lokalnie** — Vercel Serverless używają Node 24 (build pokazuje warning, nie blokuje).

## 8. Do zrobienia (po stronie właściciela — wymaga jego kont/logowań)
- [ ] `git push` (4 commity).
- [ ] Google Search Console: kliknąć „Zweryfikuj" + zgłosić sitemap `https://majsterkuj.vercel.app/sitemap-index.xml`.
- [ ] Włączyć Vercel Analytics w panelu (Settings → Analytics → Enable).
- [ ] Wrzucić link na fora (Wykop #remontujzwykopem, muratordom) — pierwszy ruch.
- [ ] Założyć konta: Ceneo API + Awin (programy Castorama/Leroy/x-kom).
- [ ] Ustawić zmienne w Vercel (Settings → Environment Variables): `AWIN_PUBLISHER_ID`, `AWIN_API_TOKEN`, `CENEO_API_KEY`, `ALLOWED_RETAILER_DOMAINS` (wzór w `.env.example`).
- [ ] Po zgodzie pracodawcy: podmienić linki afiliacyjne i włączyć monetyzację.

## 9. Sugerowane dalsze kroki (do wykonania przez agenta)
1. Potwierdzić stan gita (`git status`) i czy commity wypchnięte.
2. Rozbudowa kalkulatora: więcej pomieszczeń / prac (struktura `works` już jest).
3. Więcej treści: kolejne frazy (lista w `seo-keywords.ts`), kategorie produktów, porównania, „historia cen".
4. ✅ Integracja afiliacji (szkielet): `src/lib/affiliate/*` + `/api/click` (cloak) + `/api/offers`. Pozostało: podpiąć klucze + podać prawdziwe linki produktów (i zweryfikować endpoint Ceneo wg oficjalnej dokumentacji).
5. SEO: dodać og:image, schema.org (Article, FAQPage), poprawić Core Web Vitals.
6. Opcjonalnie: domena własna `majsterkuj.pl` podpięta do Vercel.

## 10. Jak uruchomić
```bash
cd /d C:\Users\user\Desktop\webpage
npm.cmd install          # tylko przy pierwszym razie / po czyszczeniu
npm.cmd run dev          # http://localhost:4321
npm.cmd run build        # produkcyjny -> dist/
npm.cmd run preview      # podgląd builda
```
