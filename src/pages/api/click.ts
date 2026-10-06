import type { APIRoute } from 'astro';
import { ALLOWED_RETAILER_DOMAINS, isAwinConfigured } from '../../lib/affiliate/config';
import { buildAwinDeepLink } from '../../lib/affiliate/links';

// Endpoint musi być renderowany na żądanie (serverless), nie jako strona statyczna.
export const prerender = false;

/**
 * Endpoint cloakujący kliknięcia afiliacyjne.
 * GET /api/click?to=<adres produktu>&ref=<id kliknięcia>&awinmid=<id programu>
 *
 * 1. Waliduje adres docelowy (tylko dozwolone domeny sklepów).
 * 2. Gdy Awin jest skonfigurowany, buduje deep-link i przekierowuje (302).
 * 3. W przeciwnym razie przekierowuje bezpośrednio (tryb bez afiliacji).
 */
export const GET: APIRoute = async ({ url }) => {
  const to = url.searchParams.get('to');
  const ref = (url.searchParams.get('ref') ?? '').slice(0, 128) || undefined;
  const awinmid = (url.searchParams.get('awinmid') ?? '').slice(0, 32) || undefined;

  // 1. Walidacja adresu docelowego.
  let destination: URL;
  try {
    destination = new URL(to ?? '');
  } catch {
    return new Response('Nieprawidłowy adres docelowy.', { status: 400 });
  }
  if (destination.protocol !== 'https:' && destination.protocol !== 'http:') {
    return new Response('Niedozwolony protokół.', { status: 400 });
  }
  if (!ALLOWED_RETAILER_DOMAINS.includes(destination.hostname.toLowerCase())) {
    return new Response('Domena nie jest dozwolona.', { status: 403 });
  }

  // 2. Budowa linku (afiliacyjny lub bezpośredni).
  let target = destination.toString();
  if (awinmid && isAwinConfigured) {
    target = buildAwinDeepLink({
      awinmid,
      destinationUrl: destination.toString(),
      clickref: ref,
    });
  }

  // 3. Logowanie kliknięcia (prosty log; w produkcji podepnij Vercel Analytics / magazyn).
  console.log(`[affiliate:click] host=${destination.hostname} ref=${ref ?? '-'} awin=${isAwinConfigured}`);

  // 4. Redirect 302 — użytkownik nie widzi linku afiliacyjnego.
  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      'Cache-Control': 'no-store',
    },
  });
};
