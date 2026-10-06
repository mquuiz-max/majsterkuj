import type { APIRoute } from 'astro';
import { fetchAwinProducts } from '../../lib/affiliate/awin';
import { fetchCeneoOffers } from '../../lib/affiliate/ceneo';

// Endpoint musi być renderowany na żądanie (serverless), nie jako strona statyczna.
export const prerender = false;

/**
 * Endpoint z danymi produktów / ofert z programów afiliacyjnych.
 * GET /api/offers?network=ceneo&q=<zapytanie>      (Ceneo)
 * GET /api/offers?network=awin&advertiserId=<id>   (Awin)
 *
 * Zwraca pustą listę, dopóki konta nie są skonfigurowane.
 */
export const GET: APIRoute = async ({ url }) => {
  const network = (url.searchParams.get('network') ?? 'ceneo').toLowerCase();
  const query = (url.searchParams.get('q') ?? '').slice(0, 200);
  const advertiserId = (url.searchParams.get('advertiserId') ?? '').slice(0, 32);

  let products;
  if (network === 'awin') {
    products = await fetchAwinProducts(advertiserId);
  } else {
    products = await fetchCeneoOffers(query);
  }

  return new Response(JSON.stringify({ network, products }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
};
