// Lista fraz SEO z researchu (Tydzień 1).
// To pierwsze cele treściowe — wyniki w Google dla tych fraz są stare/cienkie lub spamowe.
// Klucz: fraza -> typ treści -> cel URL.

export interface SeoKeyword {
  phrase: string;
  intent: 'zakupowy' | 'porównawczy' | 'informacyjny';
  difficulty: 'niska' | 'średnia';
  contentType: 'artykul' | 'kalkulator';
  targetUrl: string;
  notes: string;
}

export const seoKeywords: SeoKeyword[] = [
  {
    phrase: 'jaka wiertarko-wkrętarka do 400 zł',
    intent: 'zakupowy',
    difficulty: 'średnia',
    contentType: 'artykul',
    targetUrl: '/poradniki/jaka-wiertarko-wkretarka-do-400-zl/',
    notes: 'Ranking + poradnik zakupowy. Wysoka intencja zakupu, gotowy szablon artykułu w projekcie.',
  },
  {
    phrase: 'wiertarka udarowa czy zwykła',
    intent: 'porównawczy',
    difficulty: 'niska',
    contentType: 'artykul',
    targetUrl: '/poradniki/wiertarka-udarowa-czy-zwykla/',
    notes: 'Porównanie typów wiertarek. Świetne pod featured snippet (pytanie w tytule).',
  },
  {
    phrase: 'najlepsza szlifierka kątowa do 300 zł',
    intent: 'zakupowy',
    difficulty: 'średnia',
    contentType: 'artykul',
    targetUrl: '/poradniki/najlepsza-szlifierka-katowa-do-300-zl/',
    notes: 'Ranking w niskim budżecie. Duża grupa kupujących na start.',
  },
  {
    phrase: 'jaka wiertarka do betonu do 500 zł',
    intent: 'zakupowy',
    difficulty: 'średnia',
    contentType: 'artykul',
    targetUrl: '/poradniki/jaka-wiertarka-do-betonu-do-500-zl/',
    notes: 'Wiertarka udarowa/SDS. Konkretne zastosowanie (beton) = łatwa konwersja.',
  },
  {
    phrase: 'jaki osprzęt do wkrętarki na start',
    intent: 'zakupowy',
    difficulty: 'niska',
    contentType: 'artykul',
    targetUrl: '/poradniki/jaki-osprzet-do-wkretarki-na-start/',
    notes: 'Zestaw startowy bitów/wierteł. Niska konkurencja, sprzedaż koszyka (wiele tanich produktów).',
  },
  {
    phrase: 'wkrętarka makita czy bosch',
    intent: 'porównawczy',
    difficulty: 'średnia',
    contentType: 'artykul',
    targetUrl: '/poradniki/wkretarka-makita-czy-bosch/',
    notes: 'Porównanie marek. Ogromne zainteresowanie, dobre pod linki afiliacyjne obu marek.',
  },
  {
    phrase: 'ile kosztuje remont łazienki 5m2',
    intent: 'informacyjny',
    difficulty: 'niska',
    contentType: 'kalkulator',
    targetUrl: '/',
    notes: 'Kieruje prosto do kalkulatora. Wysoka zgodność z naszym narzędziem.',
  },
  {
    phrase: 'ile kosztuje remont mieszkania 50m2',
    intent: 'informacyjny',
    difficulty: 'średnia',
    contentType: 'kalkulator',
    targetUrl: '/',
    notes: 'Szersze zapytanie o koszt całego mieszkania — artykuł + link do kalkulatora.',
  },
  {
    phrase: 'najlepsza wiertarko-wkrętarka dla początkującego',
    intent: 'zakupowy',
    difficulty: 'niska',
    contentType: 'artykul',
    targetUrl: '/poradniki/najlepsza-wiertarko-wkretarka-dla-poczatkujacego/',
    notes: 'Segment "pierwsze narzędzie". Niska konkurencja, mocna intencja zakupu.',
  },
  {
    phrase: 'jaka pilarka do cięcia drewna do domu',
    intent: 'zakupowy',
    difficulty: 'średnia',
    contentType: 'artykul',
    targetUrl: '/poradniki/jaka-pilarka-do-ciecia-drewna-do-domu/',
    notes: 'Pilarka tarczowa/ukośnica. Wyższa cena produktu = wyższa prowizja.',
  },
];
