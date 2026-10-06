# WYTYCZNE SEO — ŚWIĘTOŚĆ przy tworzeniu artykułów

> **Zasada nadrzędna:** każdy nowy artykuł MUSI przejść poniższą checklistę.
> To nie są „wskazówki" — to obowiązkowy standard. Jeśli artykuł nie spełnia
> kryteriów, NIE trafia do repo.

---

## 0. Fraza (zanim napiszesz słowo)

- [ ] Fraza **long-tail**, zweryfikowana przez Google Autocomplete:
      `https://suggestqueries.google.com/complete/search?client=firefox&hl=pl&q=...`
- [ ] Jasna **intencja**: `zakupowy` (jaka/ranking/najlepsza) | `informacyjny` (jak/czym/ile kosztuje) | `porównawczy` (X czy Y).
- [ ] **Wygrywalna** (mała konkurencja) — nowy serwis nie walczy o frazy głowowe.
- [ ] Wpisana do `src/data/seo-keywords.ts` (phrase, intent, difficulty, targetUrl, notes).

## 1. Title / H1 / URL / meta

- [ ] H1 = **dokładna fraza na początku** + benefit/rok. Np. „Jak usunąć silikon z brodzika prysznicowego — bez rysowania powierzchni".
- [ ] Title **≤ 60 znaków**.
- [ ] Rok w tytule przy treściach zakupowych/kosztorysach („Ranking… 2026", „Cennik 2026").
- [ ] Slug krótki, z frazą, bez stop-słów.
- [ ] `description` **150–160 znaków**, fraza + korzyść, unikalna.

## 2. Struktura nagłówków

- [ ] H2 = **pytania z „People Also Ask"** (odpowiedź 40–60 słów ZARAZ pod nagłówkiem → featured snippet).
- [ ] Hierarchia H1 → H2 → H3 (bez przeskoków).
- [ ] Sekcja FAQ w formacie **`### Pytanie?`** + akapit (→ automatyczny schema `FAQPage`).
- [ ] DIY: kroki w formacie **`## Krok N: …`** (→ automatyczny schema `HowTo`).

## 3. Treść

- [ ] Odpowiedź na zapytanie **w pierwszym akapicie**.
- [ ] **Konkret**: tabele, stawki, widełki, liczby — nie ogólniki.
- [ ] Unikalna wartość (dane Ceneo, kalkulator, własne zestawienie).
- [ ] Długość dopasowana do top-3 w SERP (często 400–800 słów dla long-tail), zero wody i kopiowania.

## 4. E-E-A-T + świeżość

- [ ] `publishDate` z bieżącym rokiem; `updatedDate` przy aktualizacji.
- [ ] Autor (docelowo realna osoba + „O nas"); na razie „Redakcja Majsterkuj".
- [ ] Po wejściu monetyzacji: schema `Product` + realne ceny.

## 5. Linkowanie wewnętrzne

- [ ] 2–3 linki wychodzące, deskryptywny anchor (filar ↔ satelita).
- [ ] Filar ma sekcję **„Zobacz też"** → satelita; satelita linkuje do filara automatycznie (tagi).
- [ ] **Tagi spójne** z klastrem (jeden bazowy tag per temat — patrz HANDOFF §7 p.11).

## 6. Obrazy + technika

- [ ] Okładka (mapa w `src/data/covers.ts`), alt opisowy z frazą.
- [ ] Zasoby skompresowane, `loading="lazy"`.
- [ ] Build przechodzi; podgląd w `/poradniki/`.

---

## Szablon (kopiuj-wklej)

```markdown
---
title: "FRAZA na początku — benefit lub rok"        # ≤60 znaków, fraza dokładna
description: "Fraza + korzyść. 150–160 znaków, unikalna."
publishDate: 2026-10-06
seoKeyword: "dokładna fraza long-tail"
tags: ["tag-bazowy-klastra", "tag-2", "poradnik DIY"]   # poradnik DIY | poradnik zakupowy
readTime: "5 min"
---

Odpowiedź na zapytanie W PIERWSZYM AKAPICIE. 1–2 zdania, konkret.

## Krok 1: …          # tylko dla DIY → generuje schema HowTo
## Krok 2: …
## Krok 3: …

## Najczęściej zadawane pytania

### Pytanie 1?        # → generuje schema FAQPage
Krótka, konkretna odpowiedź.

### Pytanie 2?
Krótka odpowiedź.

## Zobacz też          # w filarach — link do satelity
Węższy temat? Zobacz: [tytuł satelity](/poradniki/slug-satelity/).

## Podsumowanie
2–3 zdania podsumowujące z najważniejszą liczbą/wnioskiem.
```

### Wariant zakupowy/ranking (zamiast kroków)

```markdown
## Na co zwrócić uwagę
### 1. Parametr
### 2. Parametr

## Ranking — …
> ⚠️ Linki afiliacyjne to placeholder (`awinmid=0000`) — do podmiany po założeniu konta Awin.
### 1. Marka Model
- [Zobacz cenę →](https://www.awin1.com/cread.php?awinmid=0000&clickref=sluga)
```
