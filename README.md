# 🔧 Sprzętomierz — serwis afiliacyjny „rankingi i testy elektronarzędzi"

Strona webowa z **rankingami i testami elektronarzędzi** + **treściami SEO**, zarabiająca na prowizjach afiliacyjnych (Ceneo API, Awin). Cel: długoterminowe, pasywne źródło dochodu — bez pracy z klientami.

## Stack

- **Astro 7** (statyczny HTML → maksymalna szybkość i świetne SEO)
- **TypeScript** (dane i logika — bezpieczeństwo typów)
- **Tailwind CSS 4** (szybki, responsywny UI bez grafika)
- **Hosting:** Vercel (darmowy) — gotowy do wdrożenia `astro build`
- **Baza/Afiliacja:** Supabase + Ceneo API + Awin (do podłączenia później)

## Jak uruchomić lokalnie

```bash
npm install
npm run dev        # tryb deweloperski: http://localhost:4321
npm run build      # build produkcyjny -> folder dist/
npm run preview    # podgląd builda
```

> Uwaga (Windows/PowerShell): jeśli `npm` jest blokowane przez politykę wykonywania skryptów, używaj `cmd /c npm ...` albo `npm.cmd`.

## Struktura projektu

```
webpage/
├── astro.config.mjs               # konfiguracja Astro + Tailwind
├── tsconfig.json
├── package.json
├── public/                        # pliki statyczne (favicon, robots.txt)
├── src/
│   ├── styles/global.css          # Tailwind + style treści artykułów
│   ├── layouts/Layout.astro       # wspólny szkielet HTML (header/footer/meta)
│   ├── data/
│   │   ├── renovation.ts          # ⭐ stawki remontowe, pomieszczenia, narzędzia (linki afiliacyjne)
│   │   └── seo-keywords.ts        # ⭐ lista 10 fraz SEO z researchu
│   ├── content.config.ts          # schemat kolekcji artykułów
│   ├── content/articles/          # artykuły SEO (Markdown) — szablon niżej
│   └── pages/
│       ├── index.astro            # ⭐ kalkulator kosztów remontu (strona główna)
│       └── poradniki/
│           ├── index.astro        # lista artykułów
│           └── [...slug].astro    # szablon pojedynczego artykułu
```

## Kalkulator kosztów remontu (wersja 1)

**Wejście:** pomieszczenie + metraż + standard (ekonomiczny / standardowy / premium).

**Wyjście:** przedział kosztów (robocizna + materiały) + zakres prac + **lista narzędzi z linkami afiliacyjnymi**.

Logika i stawki są w `src/data/renovation.ts` (jedno źródło prawdy — łatwo edytować bez dotykania kodu strony):

- `baseCostPerM2` — całkowity koszt za m² (średnia rynkowa),
- `laborShare` — udział robocizny,
- `multiplier` — mnożnik standardu (0.7 / 1.0 / 1.5),
- przedział = ±15% od wartości środkowej.

## Linki afiliacyjne — jak to podłączyć później

Obecnie wszystkie linki to placeholder `#` (kalkulator) lub `awinmid=0000` (artykuły). **Zero monetyzacji do czasu zgody pracodawcy (sąd).**

Gdy nadejdzie czas:
1. **Awin** — podmień `affiliateUrl` w `src/data/renovation.ts` i `awinmid=0000` w artykułach na prawdziwe linki.
2. **Ceneo API** — dane produktów (ceny, dostępność) można pobierać: na etapie builda (SSG), po stronie klienta albo przez endpoint `/api/` (chroni klucz API).

## Szablon artykułu SEO

Każdy artykuł to plik Markdown w `src/content/articles/` z frontmatter:

```yaml
---
title: "Tytuł z frazą kluczową"
description: "Meta opis (do 160 znaków) z frazą kluczową"
publishDate: 2026-10-06
seoKeyword: "fraza kluczowa"
tags: ["tag1", "tag2"]
readTime: "6 min"
---
```

Struktura treści (sprawdzony wzorzec pod featured snippet + konwersję):
1. **Intro** — odpowiedź na pytanie z frazy w pierwszym akapicie.
2. **Na co zwrócić uwagę** (h2/h3) — poradnik zakupowy.
3. **Ranking / porównanie** — z linkami afiliacyjnymi.
4. **FAQ** — pytania i krótkie odpowiedzi (featured snippets).
5. **Podsumowanie** + CTA.

Przykład: `src/content/articles/jaka-wiertarko-wkretarka-do-400-zl.md`.

## 10 fraz SEO z researchu (Tydzień 1)

| # | Fraza | Intencja | Typ treści | Trudność |
|---|-------|----------|------------|----------|
| 1 | jaka wiertarko-wkrętarka do 400 zł | zakupowa | artykuł ✅ | średnia |
| 2 | wiertarka udarowa czy zwykła | porównawcza | artykuł | niska |
| 3 | najlepsza szlifierka kątowa do 300 zł | zakupowa | artykuł | średnia |
| 4 | jaka wiertarka do betonu do 500 zł | zakupowa | artykuł | średnia |
| 5 | jaki osprzęt do wkrętarki na start | zakupowa | artykuł | niska |
| 6 | wkrętarka makita czy bosch | porównawcza | artykuł | średnia |
| 7 | ile kosztuje remont łazienki 5m2 | informacyjna | kalkulator | niska |
| 8 | ile kosztuje remont mieszkania 50m2 | informacyjna | kalkulator | średnia |
| 9 | najlepsza wiertarko-wkrętarka dla początkującego | zakupowa | artykuł | niska |
| 10 | jaka pilarka do cięcia drewna do domu | zakupowa | artykuł | średnia |

Pełna lista z notatkami: `src/data/seo-keywords.ts`.

## Kolejne kroki (plan)

- [ ] Zweryfikować frazy w Google (gdzie wyniki są stare/cienkie).
- [ ] Założyć konta: Ceneo API + Awin (programy Castorama/Leroy/x-kom).
- [ ] Wdrożyć na Vercel (`npm run build` → import repo → deploy).
- [x] Napisać 10 artykułów SEO (wszystkie frazy z researchu — w `src/content/articles/`).
- [ ] Wrzucić link na fora (Wykop #remontujzwykopem, muratordom).
- [x] Dodać `@astrojs/sitemap` (sitemap.xml generowana automatycznie przy buildzie).
- [ ] Dodać `@astrojs/vercel` (gdy pojawią się endpointy `/api`).
- [ ] Po zgodzie pracodawcy: podmienić linki afiliacyjne i włączyć monetyzację.
