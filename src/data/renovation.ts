// Dane kalkulatora kosztów remontu.
// Stawki są orientacyjne (średnie rynkowe w zł/m² dla standardu "standardowy").
// Po uzyskaniu kont afiliacyjnych (Awin/Ceneo) podmień pole `affiliateUrl`.

export type RoomId = 'lazienka' | 'kuchnia' | 'salon' | 'sypialnia' | 'przedpokoj' | 'garaz' | 'poddasze' | 'piwnica' | 'taras' | 'pralnia' | 'garderoba';
export type StandardId = 'ekonomiczny' | 'standardowy' | 'premium';

export interface Tool {
  id: string;
  name: string;
  category: string;
  priceRange: string;
  /** Link afiliacyjny — placeholder `#`, do podmiany po uzyskaniu konta Awin/Ceneo. */
  affiliateUrl: string;
}

export interface WorkItem {
  id: string;
  label: string;
  /** Udział tej pracy w całkowitym koszcie pomieszczenia (0–1). */
  share: number;
  toolIds: string[];
}

export interface Room {
  id: RoomId;
  name: string;
  emoji: string;
  /** Całkowity koszt (robocizna + materiały) za m² w standardzie "standardowy". */
  baseCostPerM2: number;
  /** Udział robocizny w koszcie całkowitym (0–1). */
  laborShare: number;
  works: WorkItem[];
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
    works: [
      { id: 'demontaz', label: 'Demontaż starej armatury', share: 0.08, toolIds: ['wiertarko-wkretarka', 'osprzet-wiertla'] },
      { id: 'hydraulika', label: 'Hydraulika i kanalizacja', share: 0.22, toolIds: ['wiertarka-udarowa', 'wiertarko-wkretarka'] },
      { id: 'elektryka', label: 'Elektryka', share: 0.1, toolIds: ['wiertarko-wkretarka', 'osprzet-wiertla'] },
      { id: 'glazura', label: 'Glazura i terakota', share: 0.3, toolIds: ['mieszadlo', 'paca-kielnia', 'przecinarka-glazury', 'poziomica-laserowa'] },
      { id: 'armatura', label: 'Armatura i sanitariaty', share: 0.25, toolIds: ['wiertarko-wkretarka'] },
      { id: 'malowanie', label: 'Malowanie sufitu', share: 0.05, toolIds: ['walek-pedzel', 'drabina'] },
    ],
  },
  {
    id: 'kuchnia',
    name: 'Kuchnia',
    emoji: '🍳',
    baseCostPerM2: 1700,
    laborShare: 0.5,
    works: [
      { id: 'instalacje', label: 'Elektryka i hydraulika', share: 0.25, toolIds: ['wiertarko-wkretarka', 'wiertarka-udarowa'] },
      { id: 'glazura', label: 'Glazura (pas między szafkami)', share: 0.15, toolIds: ['mieszadlo', 'paca-kielnia', 'poziomica-laserowa'] },
      { id: 'podloga', label: 'Podłoga', share: 0.2, toolIds: ['pila-ukosnica', 'poziomica-laserowa'] },
      { id: 'malowanie', label: 'Malowanie', share: 0.15, toolIds: ['walek-pedzel', 'drabina'] },
      { id: 'montaz', label: 'Montaż (bez mebli na wymiar)', share: 0.25, toolIds: ['wiertarko-wkretarka', 'oscylacyjna'] },
    ],
  },
  {
    id: 'salon',
    name: 'Salon',
    emoji: '🛋️',
    baseCostPerM2: 1000,
    laborShare: 0.55,
    works: [
      { id: 'malowanie', label: 'Malowanie ścian i sufitu', share: 0.35, toolIds: ['walek-pedzel', 'drabina'] },
      { id: 'podloga', label: 'Podłoga (panele / parkiet)', share: 0.35, toolIds: ['pila-tarczowa', 'poziomica-laserowa'] },
      { id: 'gladzie', label: 'Gładzie', share: 0.2, toolIds: ['szlifierka-katowa'] },
      { id: 'listwy', label: 'Listwy przypodłogowe', share: 0.1, toolIds: ['pila-ukosnica', 'wiertarko-wkretarka'] },
    ],
  },
  {
    id: 'sypialnia',
    name: 'Sypialnia',
    emoji: '🛏️',
    baseCostPerM2: 850,
    laborShare: 0.55,
    works: [
      { id: 'malowanie', label: 'Malowanie', share: 0.4, toolIds: ['walek-pedzel', 'drabina'] },
      { id: 'podloga', label: 'Podłoga', share: 0.35, toolIds: ['pila-tarczowa', 'poziomica-laserowa'] },
      { id: 'gladzie', label: 'Gładzie', share: 0.15, toolIds: ['szlifierka-katowa'] },
      { id: 'listwy', label: 'Listwy', share: 0.1, toolIds: ['pila-ukosnica', 'wiertarko-wkretarka'] },
    ],
  },
  {
    id: 'przedpokoj',
    name: 'Przedpokój / korytarz',
    emoji: '🚪',
    baseCostPerM2: 1100,
    laborShare: 0.5,
    works: [
      { id: 'malowanie', label: 'Malowanie', share: 0.3, toolIds: ['walek-pedzel', 'drabina'] },
      { id: 'podloga', label: 'Podłoga (płytki / panele)', share: 0.35, toolIds: ['pila-tarczowa', 'poziomica-laserowa'] },
      { id: 'gladzie', label: 'Gładzie', share: 0.2, toolIds: ['szlifierka-katowa'] },
      { id: 'oswietlenie', label: 'Oświetlenie', share: 0.15, toolIds: ['wiertarko-wkretarka'] },
    ],
  },
  {
    id: 'garaz',
    name: 'Garaż / pom. gospodarcze',
    emoji: '🔧',
    baseCostPerM2: 550,
    laborShare: 0.5,
    works: [
      { id: 'malowanie', label: 'Malowanie', share: 0.35, toolIds: ['walek-pedzel'] },
      { id: 'posadzka', label: 'Posadzka (żywica / farba)', share: 0.35, toolIds: ['szlifierka-katowa', 'mieszadlo'] },
      { id: 'polki', label: 'Półki i regały', share: 0.2, toolIds: ['wiertarko-wkretarka', 'poziomica-laserowa'] },
      { id: 'oswietlenie', label: 'Oświetlenie', share: 0.1, toolIds: ['wiertarko-wkretarka', 'osprzet-wiertla'] },
    ],
  },
  {
    id: 'poddasze',
    name: 'Poddasze / strych',
    emoji: '🏚️',
    baseCostPerM2: 1200,
    laborShare: 0.55,
    works: [
      { id: 'ocieplenie', label: 'Ocieplenie i izolacja', share: 0.3, toolIds: ['pila-tarczowa', 'wiertarko-wkretarka'] },
      { id: 'zabudowa', label: 'Zabudowa (karton-gips)', share: 0.25, toolIds: ['wiertarko-wkretarka', 'szlifierka-katowa'] },
      { id: 'podloga', label: 'Podłoga', share: 0.2, toolIds: ['pila-ukosnica', 'poziomica-laserowa'] },
      { id: 'malowanie', label: 'Malowanie', share: 0.15, toolIds: ['walek-pedzel', 'drabina'] },
      { id: 'oswietlenie', label: 'Oświetlenie', share: 0.1, toolIds: ['wiertarko-wkretarka', 'osprzet-wiertla'] },
    ],
  },
  {
    id: 'piwnica',
    name: 'Piwnica',
    emoji: '🧱',
    baseCostPerM2: 700,
    laborShare: 0.55,
    works: [
      { id: 'osuszanie', label: 'Osuszanie i izolacja', share: 0.35, toolIds: ['mieszadlo', 'szlifierka-katowa'] },
      { id: 'posadzka', label: 'Posadzka', share: 0.25, toolIds: ['mieszadlo', 'poziomica-laserowa'] },
      { id: 'malowanie', label: 'Malowanie', share: 0.15, toolIds: ['walek-pedzel'] },
      { id: 'polki', label: 'Półki i regały', share: 0.15, toolIds: ['wiertarko-wkretarka', 'poziomica-laserowa'] },
      { id: 'oswietlenie', label: 'Oświetlenie', share: 0.1, toolIds: ['wiertarko-wkretarka'] },
    ],
  },
  {
    id: 'taras',
    name: 'Balkon / taras',
    emoji: '🪴',
    baseCostPerM2: 800,
    laborShare: 0.5,
    works: [
      { id: 'hydroizolacja', label: 'Hydroizolacja', share: 0.25, toolIds: ['mieszadlo', 'paca-kielnia'] },
      { id: 'plytki', label: 'Płytki', share: 0.35, toolIds: ['mieszadlo', 'paca-kielnia', 'przecinarka-glazury', 'poziomica-laserowa'] },
      { id: 'balustrada', label: 'Balustrada / obróbki', share: 0.25, toolIds: ['wiertarko-wkretarka', 'wiertarka-udarowa'] },
      { id: 'malowanie', label: 'Wykończenie i malowanie', share: 0.15, toolIds: ['walek-pedzel'] },
    ],
  },
  {
    id: 'pralnia',
    name: 'Pralnia',
    emoji: '🧺',
    baseCostPerM2: 1900,
    laborShare: 0.5,
    works: [
      { id: 'instalacje', label: 'Woda, kanalizacja i prąd', share: 0.3, toolIds: ['wiertarko-wkretarka', 'wiertarka-udarowa'] },
      { id: 'glazura', label: 'Glazura', share: 0.25, toolIds: ['mieszadlo', 'paca-kielnia', 'przecinarka-glazury', 'poziomica-laserowa'] },
      { id: 'zabudowa', label: 'Zabudowa i montaż', share: 0.2, toolIds: ['wiertarko-wkretarka', 'oscylacyjna'] },
      { id: 'malowanie', label: 'Malowanie', share: 0.15, toolIds: ['walek-pedzel', 'drabina'] },
      { id: 'podloga', label: 'Podłoga', share: 0.1, toolIds: ['poziomica-laserowa'] },
    ],
  },
  {
    id: 'garderoba',
    name: 'Garderoba',
    emoji: '🧥',
    baseCostPerM2: 1000,
    laborShare: 0.55,
    works: [
      { id: 'zabudowa', label: 'Zabudowa (szafy)', share: 0.45, toolIds: ['wiertarko-wkretarka', 'oscylacyjna', 'poziomica-laserowa'] },
      { id: 'podloga', label: 'Podłoga', share: 0.2, toolIds: ['pila-ukosnica', 'poziomica-laserowa'] },
      { id: 'malowanie', label: 'Malowanie', share: 0.2, toolIds: ['walek-pedzel', 'drabina'] },
      { id: 'oswietlenie', label: 'Oświetlenie', share: 0.15, toolIds: ['wiertarko-wkretarka', 'osprzet-wiertla'] },
    ],
  },
];
