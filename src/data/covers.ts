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

// Mapowanie artykuł -> zdjęcie okładki (public/images/).
// Niektóre artykuły o tym samym typie narzędzia współdzielą zdjęcie.
const articleImages: Record<string, string> = {
  'jaka-wiertarko-wkretarka-do-400-zl': '/images/cordless-drill.jpg',
  'wiertarka-udarowa-czy-zwykla': '/images/hammer-drill.jpg',
  'najlepsza-szlifierka-katowa-do-300-zl': '/images/angle-grinder.jpg',
  'jaka-wiertarka-do-betonu-do-500-zl': '/images/hammer-drill.jpg',
  'jaki-osprzet-do-wkretarki-na-start': '/images/drill-bits.jpg',
  'wkretarka-makita-czy-bosch': '/images/impact-driver.png',
  'ile-kosztuje-remont-lazienki-5m2': '/images/bathroom.jpg',
  'ile-kosztuje-remont-mieszkania-50m2': '/images/apartment.jpg',
  'najlepsza-wiertarko-wkretarka-dla-poczatkujacego': '/images/cordless-drill.jpg',
  'jaka-pilarka-do-ciecia-drewna-do-domu': '/images/circular-saw.jpg',
  'jaka-szlifierka-oscylacyjna-do-domu': '/images/oscillating-tool.jpg',
  'jaka-poziomica-laserowa-do-remontu': '/images/laser-level.jpg',
  'ile-kosztuje-remont-kuchni': '/images/apartment.jpg',
  'jak-pomalowac-sciany-krok-po-kroku': '/images/paint-roller.jpg',
  'ranking-wiertarek-udarowych': '/images/hammer-drill.jpg',
  'ranking-wkretarek-akumulatorowych': '/images/impact-driver.png',
  'ranking-szlifierek-mimosrodowych': '/images/orbital-sander.jpg',
  'ranking-pil-ukosnic': '/images/miter-saw.jpg',
  'ranking-odkurzaczy-warsztatowych': '/images/shop-vacuum.jpg',
  'ranking-frezarek-gornowrzecionowych': '/images/wood-router.jpg',
  'ranking-kompresorow': '/images/air-compressor.webp',
  'ranking-szlifierek-tasmowych': '/images/belt-sander.jpg',
  'ranking-kluczy-udarowych': '/images/toolbox.jpg',
  'ranking-mlotowiertarek': '/images/hammer-drill.jpg',
};

export function articleImage(id: string): string | undefined {
  return articleImages[id];
}
