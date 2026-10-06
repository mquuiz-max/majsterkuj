// Dane kalkulatora kosztów remontu.
// Stawki są orientacyjne (średnie rynkowe w zł/m² dla standardu "standardowy").
// Po uzyskaniu kont afiliacyjnych (Awin/Ceneo) podmień pole `affiliateUrl`.

export type RoomId = 'lazienka' | 'kuchnia' | 'salon' | 'sypialnia' | 'przedpokoj' | 'garaz';
export type StandardId = 'ekonomiczny' | 'standardowy' | 'premium';

export interface Tool {
  id: string;
  name: string;
  category: string;
  priceRange: string;
  /** Link afiliacyjny — placeholder `#`, do podmiany po uzyskaniu konta Awin/Ceneo. */
  affiliateUrl: string;
}

export interface Room {
  id: RoomId;
  name: string;
  emoji: string;
  /** Całkowity koszt (robocizna + materiały) za m² w standardzie "standardowy". */
  baseCostPerM2: number;
  /** Udział robocizny w koszcie całkowitym (0–1). */
  laborShare: number;
  scope: string[];
  toolIds: string[];
}

export interface Standard {
  id: StandardId;
  name: string;
  multiplier: number;
  description: string;
}

export const standards: Standard[] = [
  {
    id: 'ekonomiczny',
    name: 'Ekonomiczny',
    multiplier: 0.7,
    description: 'Budżetowe materiały, podstawowe wykończenie, część prac samodzielnie.',
  },
  {
    id: 'standardowy',
    name: 'Standardowy',
    multiplier: 1.0,
    description: 'Dobre materiały ze średniej półki i sprawdzona robocizna.',
  },
  {
    id: 'premium',
    name: 'Premium',
    multiplier: 1.5,
    description: 'Materiały z górnej półki, wykończenie na zamówienie, najlepsi fachowcy.',
  },
];

export const tools: Tool[] = [
  { id: 'wiertarko-wkretarka', name: 'Wiertarko-wkrętarka akumulatorowa', category: 'Wiercenie', priceRange: '250–600 zł', affiliateUrl: '#' },
  { id: 'wiertarka-udarowa', name: 'Wiertarka udarowa (SDS-Plus)', category: 'Wiercenie', priceRange: '200–500 zł', affiliateUrl: '#' },
  { id: 'szlifierka-katowa', name: 'Szlifierka kątowa 125 mm', category: 'Cięcie i szlifowanie', priceRange: '150–400 zł', affiliateUrl: '#' },
  { id: 'poziomica-laserowa', name: 'Poziomica laserowa krzyżowa', category: 'Pomiary', priceRange: '150–350 zł', affiliateUrl: '#' },
  { id: 'mieszadlo', name: 'Mieszadło do kleju i zapraw', category: 'Wykończenia', priceRange: '80–200 zł', affiliateUrl: '#' },
  { id: 'paca-kielnia', name: 'Zestaw paca + kielnia', category: 'Wykończenia', priceRange: '40–150 zł', affiliateUrl: '#' },
  { id: 'przecinarka-glazury', name: 'Przecinarka do glazury', category: 'Cięcie i szlifowanie', priceRange: '150–700 zł', affiliateUrl: '#' },
  { id: 'pila-ukosnica', name: 'Piła ukośnica', category: 'Cięcie i szlifowanie', priceRange: '400–1200 zł', affiliateUrl: '#' },
  { id: 'pila-tarczowa', name: 'Piła tarczowa ręczna', category: 'Cięcie i szlifowanie', priceRange: '250–700 zł', affiliateUrl: '#' },
  { id: 'oscylacyjna', name: 'Narzędzie wielofunkcyjne (oscylacyjne)', category: 'Cięcie i szlifowanie', priceRange: '200–500 zł', affiliateUrl: '#' },
  { id: 'walek-pedzel', name: 'Zestaw malarski (wałek, pędzel, kuweta)', category: 'Malowanie', priceRange: '50–120 zł', affiliateUrl: '#' },
  { id: 'drabina', name: 'Drabina / rusztowanie składane', category: 'Akcesoria', priceRange: '200–600 zł', affiliateUrl: '#' },
  { id: 'odkurzacz', name: 'Odkurzacz warsztatowy', category: 'Akcesoria', priceRange: '150–500 zł', affiliateUrl: '#' },
  { id: 'osprzet-wiertla', name: 'Komplet wierteł i bitów', category: 'Osprzęt', priceRange: '60–200 zł', affiliateUrl: '#' },
  { id: 'lampa-budowlana', name: 'Lampa budowlana LED', category: 'Akcesoria', priceRange: '80–250 zł', affiliateUrl: '#' },
];

export const rooms: Room[] = [
  {
    id: 'lazienka',
    name: 'Łazienka',
    emoji: '🛁',
    baseCostPerM2: 2800,
    laborShare: 0.5,
    scope: ['Demontaż starej armatury', 'Hydraulika i kanalizacja', 'Elektryka', 'Glazura i terakota', 'Armatura i sanitariaty', 'Malowanie sufitu'],
    toolIds: ['wiertarko-wkretarka', 'wiertarka-udarowa', 'mieszadlo', 'paca-kielnia', 'przecinarka-glazury', 'poziomica-laserowa'],
  },
  {
    id: 'kuchnia',
    name: 'Kuchnia',
    emoji: '🍳',
    baseCostPerM2: 1700,
    laborShare: 0.5,
    scope: ['Elektryka i hydraulika', 'Glazura (pas między szafkami)', 'Podłoga', 'Malowanie', 'Montaż (bez mebli na wymiar)'],
    toolIds: ['wiertarko-wkretarka', 'wiertarka-udarowa', 'poziomica-laserowa', 'pila-ukosnica', 'oscylacyjna'],
  },
  {
    id: 'salon',
    name: 'Salon',
    emoji: '🛋️',
    baseCostPerM2: 1000,
    laborShare: 0.55,
    scope: ['Malowanie ścian i sufitu', 'Podłoga (panele / parkiet)', 'Gładzie', 'Listwy przypodłogowe'],
    toolIds: ['szlifierka-katowa', 'walek-pedzel', 'wiertarko-wkretarka', 'pila-tarczowa', 'poziomica-laserowa'],
  },
  {
    id: 'sypialnia',
    name: 'Sypialnia',
    emoji: '🛏️',
    baseCostPerM2: 850,
    laborShare: 0.55,
    scope: ['Malowanie', 'Podłoga', 'Gładzie', 'Listwy'],
    toolIds: ['walek-pedzel', 'szlifierka-katowa', 'wiertarko-wkretarka', 'pila-tarczowa'],
  },
  {
    id: 'przedpokoj',
    name: 'Przedpokój / korytarz',
    emoji: '🚪',
    baseCostPerM2: 1100,
    laborShare: 0.5,
    scope: ['Malowanie', 'Podłoga (płytki / panele)', 'Gładzie', 'Oświetlenie'],
    toolIds: ['wiertarko-wkretarka', 'poziomica-laserowa', 'walek-pedzel', 'pila-tarczowa'],
  },
  {
    id: 'garaz',
    name: 'Garaż / pom. gospodarcze',
    emoji: '🔧',
    baseCostPerM2: 550,
    laborShare: 0.5,
    scope: ['Malowanie', 'Posadzka (żywica / farba)', 'Półki i regały', 'Oświetlenie'],
    toolIds: ['wiertarko-wkretarka', 'szlifierka-katowa', 'wiertarka-udarowa', 'pila-tarczowa'],
  },
];
