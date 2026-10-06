// Budowanie linków afiliacyjnych oraz linków cloakowanych (przez /api/click).

import { AWIN_PUBLISHER_ID } from './config';

export interface DeepLinkParams {
  /** ID reklamodawcy (programu) w Awin. */
  awinmid: string;
  /** Adres docelowy (np. strona produktu). */
  destinationUrl?: string;
  /** Identyfikator kliknięcia (do raportowania). */
  clickref?: string;
}

/**
 * Buduje deep-link Awin (format cread.php).
 * https://www.awin1.com/cread.php?awinmid=...&awinaffid=...&ued=...&clickref=...
 */
export function buildAwinDeepLink({ awinmid, destinationUrl, clickref }: DeepLinkParams): string {
  const q = new URLSearchParams();
  q.set('awinmid', awinmid);
  if (AWIN_PUBLISHER_ID) q.set('awinaffid', AWIN_PUBLISHER_ID);
  if (destinationUrl) q.set('ued', destinationUrl);
  if (clickref) q.set('clickref', clickref);
  return `https://www.awin1.com/cread.php?${q.toString()}`;
}

export interface CloakedLinkParams {
  /** Adres docelowy produktu (na stronie sklepu). */
  destinationUrl: string;
  /** Opcjonalny identyfikator kliknięcia. */
  clickref?: string;
  /** Opcjonalny ID programu Awin (reklamodawcy). */
  awinmid?: string;
}

/**
 * Buduje wewnętrzny (cloakowany) link prowadzący przez /api/click.
 * Użytkownik widzi nasz adres, a serwer 302 przekierowuje na link afiliacyjny.
 */
export function buildCloakedClickUrl({ destinationUrl, clickref, awinmid }: CloakedLinkParams): string {
  const q = new URLSearchParams();
  q.set('to', destinationUrl);
  if (clickref) q.set('ref', clickref);
  if (awinmid) q.set('awinmid', awinmid);
  return `/api/click?${q.toString()}`;
}
