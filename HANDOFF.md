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
- **@astrojs/sitemap**, **@vercel/analytics** (v2.0.1), **@astrojs/vercel** (adapter — endpointy serverless)
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
├── public/robots.txt         # z wpisem Sitemap + Disallow /api/
├── public/favicon.svg
├── public/og-image.svg       # og:image (SVG — docelowo podmienić na PNG)
├── public/images/            # ⭐ 20 zdjęć okładek (Wikimedia Commons, CC)
├── src/
│   ├── styles/global.css     # Tailwind + style .article-body (proza)
│   ├── layouts/Layout.astro  # <head> meta+SEO+JSON-LD+google-site-verification, nav, footer, <Analytics/>
│   ├── content.config.ts     # kolekcja "articles" (glob loader + schema z)
│   ├── content/articles/     # ⭐ 72 artykuły SEO (.md) — rankingi/kosztorysy/DIY + satelity
│   ├── data/renovation.ts    # ⭐ pomieszczenia + prace(works) + narzędzia + standardy (stawki!)
│   ├── data/seo-keywords.ts  # 42 frazy SEO z researchu (startowy + long-tail + satelity)
│   ├── data/covers.ts        # ⭐ emoji + zdjęcia okładek per artykuł (coverEmoji / articleImage)
│   ├── data/categories.ts    # ⭐ 4 kategorie + mapowanie artykuł->kategoria (categoryFor)
│   ├── lib/affiliate/        # ⭐ config.ts + links.ts (deep-link Awin, cloak) + awin.ts + ceneo.ts
│   ├── lib/seo.ts            # ⭐ extractFaq + extractSteps + relatedArticles (schema + linkowanie)
│   └── pages/
│       ├── api/click.ts      # ⭐ cloakowanie kliknięć (302 → link afiliacyjny)
│       ├── api/offers.ts     # dane produktów z Ceneo/Awin
│       ├── index.astro       # ⭐ kalkulator kosztów remontu (formularz + wynik, vanilla JS)
│       ├── poradniki/index.astro        # lista artykułów + filtry kategorii
│       ├── poradniki/[...slug].astro    # szablon artykułu (breadcrumbs, powiązane, schema)
│       ├── kategorie/[slug].astro       # ⭐ strony kategorii
│       ├── o-nas.astro
│       └── polityka-prywatnosci.astro
```

## 5. Co jest zbudowane i DZIAŁA
1. **Kalkulator kosztów remontu** — pomieszczenie (11 typów: łazienka, kuchnia, salon, sypialnia, przedpokój, garaż, poddasze, piwnica, balkon/taras, pralnia, garderoba) + metraż + standard + checkboxy zakresu prac → przedział kosztów (robocizna/materiały) + lista narzędzi (linki to placeholdery `#`).
2. **72 artykuły SEO** (content collection): rankingi narzędzi, kosztorysy remontów, poradniki DIY „jak zrobić", poradniki zakupowe + satelity długiego ogona.
3. **4 kategorie** + strony `/kategorie/[slug]` + filtry na liście poradników.
4. **SEO techniczne**: canonical, og:*/twitter, sitemap, robots.txt, JSON-LD (WebSite, Organization, BlogPosting, BreadcrumbList, FAQPage per artykuł, HowTo per DIY).
5. **Linkowanie wewnętrzne**: sekcja „Powiązane artykuły" + CTA do kalkulatora (dobierane auto wg tagów).
6. **Zdjęcia okładek**: 20 plików w `public/images/` + mapowanie per artykuł (`covers.ts`).
7. **Google Search Console** (tag weryfikacyjny) + **Vercel Analytics**.
8. Strony „O nas" / „Polityka prywatności".
9. **Integracja afiliacyjna (szkielet, UŚPIONA)**: `/api/click` (cloak) + `/api/offers` — bez kluczy linki są neutralne (zero prowizji).
10. **Build przechodzi** (40+ stron + 2 funkcje serverless, exit 0).

## 6. Git
- Repo zainicjalizowane, branch **`main`**, zdalne `origin` → `https://github.com/mquuiz-max/majsterkuj.git`.
- Autor commitów: `mquuiz-max <mquuiz-max@users.noreply.github.com>`.
- Historia (od najnowszych): `dodaj-6-artykulow-oraz-schema-howto`, `dodaj-artykuly-pod-slowa-kluczowe-diy-i-kosztorysy`, `popraw-mape-zdjec-klucz-i-mlotowiertarka`, `dodaj-zdjecia-per-artykul`, `dodaj-zdjecia-okladek-kategorii`, `seo-strony-kategorii-robots-i-e-e-a-t`, `seo-linkowanie-wewnetrzne-faq-schema-i-breadcrumbs`, `dodaj-rankingi-frezarek-kompresorow-szlifierek-tasmowych-kluczy-i-mlotowiertarek`, `dodaj-rankingi-wiertarek-wkretarek-szlifierek-pil-i-odkurzaczy`, `dodaj-grafiki-okladki-artykulow-i-ilustracje-hero`, `seo-szkielet-afiliacji-nowe-artykuly-i-odswiezenie-wizualne`, `dodaj-dokument-handoff`, `kalkulator-checkboxy-i-strony-info`, `dodaj-google-search-console`, `dodaj-vercel-analytics`, `fix-sitemap-domain`, `Initial-commit`.
- ⚠️ Ok. 12 commitów przed `origin/main` — wymagają `git push` (właściciel robi to sam).

## 7. PUŁAPKI TECHNICZNE (ważne dla kontynuacji)
1. **PowerShell blokuje `npm`** (polityka wykonywania). Używać `npm.cmd` lub `cmd /c npm ...`.
2. **npm 11 `allowScripts`** — `package.json` ma wpis dla esbuild. **Nie usuwać**, bo zablokuje postinstall esbuild i zepsuje binarki.
3. **npm 11 bug #4828** (pomijanie opcjonalnych zależności natywnych) — jeśli brakuje binarek rolldown/esbuild: usunąć `node_modules` + `package-lock.json` i reinstalować.
4. **Terminal gubi wyjście** — używać `> plik.log 2>&1` + odczytać plik; do długich operacji marker `&& echo SUCCESS > x.ok || echo FAIL > x.ok` i odpytywać marker przez odczyt pliku (nie uruchamiać kolejnych poleceń w trakcie — zabijają proces).
5. **Linki afiliacyjne to placeholdery**: `#` w `renovation.ts`, `awinmid=0000` w artykułach. Podmienić dopiero po: założeniu kont Awin/Ceneo + zgodzie pracodawcy.
6. **Domena w `site`** (`astro.config.mjs`) = `majsterkuj.vercel.app`. Po kupnie własnej domeny — zaktualizować i przebudować.
7. **Astro 7** — usunięto `output: "hybrid"`; endpointy serverless wymagają `export const prerender = false` + adaptera `@astrojs/vercel`.
8. **Node 26 lokalnie** — Vercel Serverless używają Node 24 (build pokazuje warning, nie blokuje).
9. **Terminal PSReadLine** — przy długich/wieloznakowych komendach potrafi się wysypać (błędy „SetCursorPosition"). Pisać skrypty do `.ps1` i odpalać `powershell -ExecutionPolicy Bypass -File x.ps1`; długie operacje puszczać przez pliki-marker (`.ok`/`.log`).
10. **Wikimedia Commons rate-limiting (429)** — przy pobieraniu zdjęć robić opóźnienia (`Start-Sleep`) i ustawiać User-Agent; nie szarżować z liczbą zapytań.
11. **Konwencja tagów** — tagi łączą artykuły w klastry (`relatedArticles` porównuje je DOKŁADNIE, znak po znaku). Używaj jednego spójnego tagu bazowego per temat: `panele podłogowe` (nie `panele`/`panele winylowe`), `płytki` (nie `glazura`), `renowacja mebli` (nie `renowacja`), `szlifowanie drewna` (nie `szlifowanie`), `montaż półki` (nie `półka`).

## 8. Do zrobienia (po stronie właściciela — wymaga jego kont/logowań)
- [ ] `git push` (ok. 12 commitów).
- [ ] Google Search Console: kliknąć „Zweryfikuj" + zgłosić sitemap `https://majsterkuj.vercel.app/sitemap-index.xml`.
- [ ] Włączyć Vercel Analytics w panelu (Settings → Analytics → Enable).
- [ ] Wrzucić link na fora (Wykop #remontujzwykopem, muratordom) — pierwszy ruch.
- [ ] Założyć konta: Ceneo API + Awin (programy Castorama/Leroy/x-kom).
- [ ] Ustawić zmienne w Vercel (Settings → Environment Variables): `AWIN_PUBLISHER_ID`, `AWIN_API_TOKEN`, `CENEO_API_KEY`, `ALLOWED_RETAILER_DOMAINS` (wzór w `.env.example`).
- [ ] Po zgodzie pracodawcy: podmienić linki afiliacyjne i włączyć monetyzację.

## 9. Sugerowane dalsze kroki (do wykonania przez agenta)
1. Potwierdzić stan gita (`git status`) i czy commity wypchnięte.
2. ✅ Rozbudowa kalkulatora — dodano 5 pomieszczeń (poddasze, piwnica, balkon/taras, pralnia, garderoba; łącznie 11). Dalej opcjonalnie: więcej prac/standardów, wariant „całe mieszkanie” (suma pomieszczeń).
3. ✅ Zasada treści = **niszowe (long-tail) zapytania, o które ludzie naprawdę pytają** — weryfikacja przez Google Autocomplete (`suggestqueries.google.com/complete/search`). Model: **filar (szeroki) + satelity (wąskie, linkowane sekcją „Zobacz też")**. Łącznie: 12 nowych filarów + 20 satelitów (8 do nowych + 12 do istniejących artykułów). Dalej: skalować tę zasadę, kategorie produktów, „historia cen" (Ceneo API).
4. ✅ Integracja afiliacji (szkielet) — pozostało: podpiąć klucze + prawdziwe linki (zweryfikować endpoint Ceneo wg oficjalnej dokumentacji).
5. ✅ SEO (canonical, og:image, schema Article/FAQPage/HowTo/BreadcrumbList, linkowanie wewnętrzne, kategorie, robots.txt, E-E-A-T). Ewentualnie dalej: og:image jako PNG, Core Web Vitals, schema Product w rankingach (po podpięciu prawdziwych cen).
6. Opcjonalnie: domena własna `majsterkuj.pl` podpięta do Vercel.

## 10. Jak uruchomić
```bash
cd /d C:\Users\user\Desktop\webpage
npm.cmd install          # tylko przy pierwszym razie / po czyszczeniu
npm.cmd run dev          # http://localhost:4321
npm.cmd run build        # produkcyjny -> dist/
npm.cmd run preview      # podgląd builda
```
