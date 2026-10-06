// Konfiguracja programów afiliacyjnych.
// Wartości czytane są ze zmiennych środowiskowych (Vercel → Settings → Environment Variables).
// W środowisku produkcyjnym (Vercel / Node) te wartości są dostępne przez `process.env`.
// Dopóki konta Awin/Ceneo nie są założone, serwis działa w trybie „bez afiliacji"
// (linki /api/click przekierowują bezpośrednio do sklepu, bez prowizji).

const env =
  typeof process !== 'undefined'
    ? process.env
    : ({} as Record<string, string | undefined>);

function read(name: string): string | undefined {
  const value = env[name];
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;
}

/** ID wydawcy (publisher) w Awin. */
export const AWIN_PUBLISHER_ID = read('AWIN_PUBLISHER_ID');
/** Token do Awin Product Feed API (opcjonalny). */
export const AWIN_API_TOKEN = read('AWIN_API_TOKEN');
/** Klucz API Ceneo (program Ceneo Aff). */
export const CENEO_API_KEY = read('CENEO_API_KEY');
/** Bazowy adres API Ceneo. */
export const CENEO_BASE_URL = read('CENEO_BASE_URL') ?? 'https://apigateway.ceneo.pl';

/** Dozwolone domeny sklepów dla /api/click (ochrona przed open-redirect). */
export const ALLOWED_RETAILER_DOMAINS = (
  read('ALLOWED_RETAILER_DOMAINS') ??
  'castorama.pl,leroymerlin.pl,obi.pl,x-kom.pl,mediaexpert.pl,morele.net,euro.com.pl'
)
  .split(',')
  .map((d) => d.trim().toLowerCase())
  .filter(Boolean);

export const isAwinConfigured = Boolean(AWIN_PUBLISHER_ID);
export const isCeneoConfigured = Boolean(CENEO_API_KEY);
