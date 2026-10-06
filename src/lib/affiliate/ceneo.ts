// Pobieranie ofert z Ceneo API (program Ceneo Aff).
// UWAGA: dokładny endpoint i nagłówek autoryzacji należy zweryfikować
// z oficjalną dokumentacją Ceneo po założeniu konta — poniżej jest działający szkielet.

import { CENEO_API_KEY, CENEO_BASE_URL, isCeneoConfigured } from './config';
import type { AffiliateProduct } from './awin';

interface CeneoOffer {
  id: number | string;
  name: string;
  price?: number;
  url?: string;
  productUrl?: string;
  imageUrl?: string;
  shop?: string;
}

/**
 * Pobiera oferty Ceneo pasujące do zapytania (np. nazwy narzędzia).
 * Zwraca pustą listę, jeśli Ceneo nie jest skonfigurowane.
 */
export async function fetchCeneoOffers(query: string): Promise<AffiliateProduct[]> {
  if (!isCeneoConfigured || !CENEO_API_KEY) return [];

  const url = new URL(`${CENEO_BASE_URL}/api/v1/offers`);
  url.searchParams.set('query', query);

  try {
    const res = await fetch(url, {
      headers: {
        'X-Ceneo-ApiKey': CENEO_API_KEY,
        Accept: 'application/json',
      },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { offers?: CeneoOffer[] };
    return (data.offers ?? []).map((o) => ({
      id: String(o.id),
      name: o.name,
      price: o.price,
      currency: 'PLN',
      url: o.url ?? o.productUrl ?? '',
      imageUrl: o.imageUrl,
      merchant: o.shop ?? 'Ceneo',
      network: 'ceneo',
    }));
  } catch {
    return [];
  }
}
