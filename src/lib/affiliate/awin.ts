// Pobieranie danych produktów z Awin Product Feed API.
// Gdy konto nie jest skonfigurowane, zwraca pustą listę (fallback do danych statycznych).

import { AWIN_PUBLISHER_ID, AWIN_API_TOKEN, isAwinConfigured } from './config';

export interface AffiliateProduct {
  id: string;
  name: string;
  price?: number;
  currency?: string;
  url: string;
  imageUrl?: string;
  merchant: string;
  network: 'awin' | 'ceneo';
}

interface AwinProduct {
  id: number | string;
  name: string;
  price?: number;
  currency?: string;
  merchantProductUrl?: string;
  aw_deep_link?: string;
  url?: string;
  productImage?: string;
  merchantName?: string;
}

/**
 * Pobiera produkty z feedu Awin dla danego programu (advertiserId).
 * Zwraca pustą listę, jeśli Awin nie jest skonfigurowany.
 */
export async function fetchAwinProducts(advertiserId: string): Promise<AffiliateProduct[]> {
  if (!isAwinConfigured || !AWIN_API_TOKEN || !AWIN_PUBLISHER_ID) {
    return [];
  }

  const url = new URL(
    `https://api.awin.com/publishers/${AWIN_PUBLISHER_ID}/programmes/${advertiserId}/products`,
  );
  url.searchParams.set('accessToken', AWIN_API_TOKEN);
  url.searchParams.set('region', 'pl-PL');

  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return [];
    const data = (await res.json()) as { results?: AwinProduct[] };
    return (data.results ?? []).map((p) => ({
      id: String(p.id),
      name: p.name,
      price: p.price,
      currency: p.currency,
      url: p.merchantProductUrl ?? p.aw_deep_link ?? p.url ?? '',
      imageUrl: p.productImage,
      merchant: p.merchantName ?? 'Awin',
      network: 'awin',
    }));
  } catch {
    return [];
  }
}
