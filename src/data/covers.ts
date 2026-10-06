// Emotikony okładek artykułów (używane w kartach listy i na stronie artykułu).
// To lekka, wektorowa "grafika" w kolorystyce serwisu. Po dodaniu prawdziwych
// zdjęć produktów możesz podmienić na <img> i pole `image` w schemacie treści.

const byId: Record<string, string> = {
  'jaka-wiertarko-wkretarka-do-400-zl': '🔩',
  'wiertarka-udarowa-czy-zwykla': '🧱',
  'najlepsza-szlifierka-katowa-do-300-zl': '⚙️',
  'jaka-wiertarka-do-betonu-do-500-zl': '🧱',
  'jaki-osprzet-do-wkretarki-na-start': '🧰',
  'wkretarka-makita-czy-bosch': '🔧',
  'ile-kosztuje-remont-lazienki-5m2': '🛁',
  'ile-kosztuje-remont-mieszkania-50m2': '🏠',
  'najlepsza-wiertarko-wkretarka-dla-poczatkujacego': '🔩',
  'jaka-pilarka-do-ciecia-drewna-do-domu': '🪚',
  'jaka-szlifierka-oscylacyjna-do-domu': '⚙️',
  'jaka-poziomica-laserowa-do-remontu': '📐',
  'ile-kosztuje-remont-kuchni': '🍳',
  'jak-pomalowac-sciany-krok-po-kroku': '🎨',
  'ranking-wiertarek-udarowych': '🧱',
  'ranking-wkretarek-akumulatorowych': '🔩',
  'ranking-szlifierek-mimosrodowych': '🪵',
  'ranking-pil-ukosnic': '🪚',
  'ranking-odkurzaczy-warsztatowych': '🧹',
  'ranking-frezarek-gornowrzecionowych': '🪵',
  'ranking-kompresorow': '💨',
  'ranking-szlifierek-tasmowych': '⚙️',
  'ranking-kluczy-udarowych': '🔧',
  'ranking-mlotowiertarek': '🔨',
};

export function coverEmoji(id: string): string {
  return byId[id] ?? '🧰';
}
