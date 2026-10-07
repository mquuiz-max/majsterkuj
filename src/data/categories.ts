// Kategorie artykułów — używane do stron kategorii i nawigacji.

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  /** Ścieżka do zdjęcia w public/images/ (opcjonalna okładka kategorii). */
  image?: string;
}

export const categories: Category[] = [
  {
    id: 'wiertarki-wkretarki',
    name: 'Wiertarki i wkrętarki',
    emoji: '🔩',
    description: 'Rankingi i poradniki o wiertarkach, wiertarko-wkrętarkach, wkrętarkach i młotowiertarkach.',
    image: '/images/cordless-drill.jpg',
  },
  {
    id: 'szlifierki-pily',
    name: 'Szlifierki i piły',
    emoji: '🪚',
    description: 'Rankingi szlifierek, pilarek i frezarek do drewna, metalu i wykończeń.',
    image: '/images/angle-grinder.jpg',
  },
  {
    id: 'warsztat-akcesoria',
    name: 'Warsztat i akcesoria',
    emoji: '🧰',
    description: 'Narzędzia i akcesoria warsztatowe: poziomice, odkurzacze, kompresory, klucze udarowe.',
    image: '/images/toolbox.jpg',
  },
];

// Mapa: id artykułu -> id kategorii.
const articleCategory: Record<string, string> = {
  // Wiertarki i wkrętarki
  'jaka-wiertarko-wkretarka-do-400-zl': 'wiertarki-wkretarki',
  'wiertarka-udarowa-czy-zwykla': 'wiertarki-wkretarki',
  'jaka-wiertarka-do-betonu-do-500-zl': 'wiertarki-wkretarki',
  'jaki-osprzet-do-wkretarki-na-start': 'wiertarki-wkretarki',
  'wkretarka-makita-czy-bosch': 'wiertarki-wkretarki',
  'najlepsza-wiertarko-wkretarka-dla-poczatkujacego': 'wiertarki-wkretarki',
  'ranking-wiertarek-udarowych': 'wiertarki-wkretarki',
  'ranking-wkretarek-akumulatorowych': 'wiertarki-wkretarki',
  'jaka-wiertarka-do-domu': 'wiertarki-wkretarki',
  'jakie-wiertla-do-betonu': 'wiertarki-wkretarki',
  'czym-wiercic-w-plytkach': 'wiertarki-wkretarki',
  'czym-wiercic-w-plytkach-gresowych': 'wiertarki-wkretarki',
  'ranking-wkretarek-akumulatorowych-18v': 'wiertarki-wkretarki',
  // Szlifierki i piły
  'najlepsza-szlifierka-katowa-do-300-zl': 'szlifierki-pily',
  'jaka-pilarka-do-ciecia-drewna-do-domu': 'szlifierki-pily',
  'jaka-szlifierka-oscylacyjna-do-domu': 'szlifierki-pily',
  'ranking-szlifierek-mimosrodowych': 'szlifierki-pily',
  'ranking-pil-ukosnic': 'szlifierki-pily',
  'ranking-szlifierek-tasmowych': 'szlifierki-pily',
  'ranking-frezarek-gornowrzecionowych': 'szlifierki-pily',
  'jaka-pila-do-galezi': 'szlifierki-pily',
  'jaka-wyrzynarka-do-drewna': 'szlifierki-pily',
  'jaka-wyrzynarka-do-paneli-podlogowych': 'szlifierki-pily',
  'jaka-pila-do-galezi-na-wysiegniku': 'szlifierki-pily',
  // Warsztat i akcesoria
  'jaka-poziomica-laserowa-do-remontu': 'warsztat-akcesoria',
  'ranking-odkurzaczy-warsztatowych': 'warsztat-akcesoria',
  'ranking-kompresorow': 'warsztat-akcesoria',
  'ranking-kluczy-udarowych': 'warsztat-akcesoria',
  'ranking-mlotowiertarek': 'warsztat-akcesoria',
  'jaki-zestaw-narzedzi-na-start': 'warsztat-akcesoria',
  'jaki-wykrywacz-przewodow': 'warsztat-akcesoria',
  'jaka-opalarka-do-czego-sluzy': 'warsztat-akcesoria',
  'jaka-opalarka-do-usuwania-farby': 'warsztat-akcesoria',
  'ranking-kluczy-udarowych-do-500-zl': 'warsztat-akcesoria',
  'ranking-kompresorow-bezolejowych': 'warsztat-akcesoria',
  'ranking-mlotowiertarek-sds-max': 'warsztat-akcesoria',
};

export function categoryFor(articleId: string): Category {
  const id = articleCategory[articleId] ?? 'warsztat-akcesoria';
  return categories.find((c) => c.id === id) ?? categories[categories.length - 1];
}
