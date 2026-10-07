// Usuwa artykuły o tematyce remontowej/DIY — serwis zostaje "tylko o narzędziach".
// Uruchom: node scripts/delete-renovation.mjs
import { unlinkSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'C:/Users/user/Desktop/webpage/src/content/articles';
const toDelete = [
  'czym-ciac-styropian.md',
  'czym-odgrzybic-sciane.md',
  'ile-kosztuje-gladz.md',
  'ile-kosztuje-malowanie-mieszkania.md',
  'ile-kosztuje-polozenie-paneli.md',
  'ile-kosztuje-polozenie-paneli-winylowych.md',
  'ile-kosztuje-polozenie-plytek.md',
  'ile-kosztuje-remont-kuchni.md',
  'ile-kosztuje-remont-kuchni-bez-mebli.md',
  'ile-kosztuje-remont-lazienki-5m2.md',
  'ile-kosztuje-remont-mieszkania-50m2.md',
  'ile-kosztuje-remont-pokoju.md',
  'ile-kosztuje-wylewka.md',
  'ile-kosztuje-wylewka-samopoziomujaca.md',
  'jak-odgrzybic-fugi.md',
  'jak-odgrzybic-pralke.md',
  'jak-odnowic-meble.md',
  'jak-odnowic-meble-kuchenne.md',
  'jak-podlaczyc-pralke.md',
  'jak-podlaczyc-pralke-i-suszarke-do-jednego-odplywu.md',
  'jak-polozyc-panele-podlogowe-krok-po-kroku.md',
  'jak-polozyc-panele-w-jodelke.md',
  'jak-polozyc-plytki-krok-po-kroku.md',
  'jak-polozyc-plytki-na-plytki.md',
  'jak-polozyc-tapete.md',
  'jak-polozyc-tapete-na-suficie.md',
  'jak-pomalowac-sciany-krok-po-kroku.md',
  'jak-usunac-silikon.md',
  'jak-usunac-silikon-z-brodzika-prysznicowego.md',
  'jak-uszczelnic-wanne.md',
  'jak-wytlumic-sciane-od-sasiada.md',
  'jak-wywiercic-otwor-w-betonie.md',
  'jak-zamontowac-polke.md',
  'jak-zamontowac-polke-do-karton-gipsu.md',
  'jak-zrobic-gladz-bez-szlifowania.md',
  'jak-zrobic-gladz-na-scianie.md',
];

let removed = 0;
for (const f of toDelete) {
  const p = join(dir, f);
  if (existsSync(p)) {
    unlinkSync(p);
    removed += 1;
    console.log('DELETED:', f);
  } else {
    console.log('SKIP (brak):', f);
  }
}
console.log('Removed files:', removed);
