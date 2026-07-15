# Avatar MTG Guide — instrukcje dla Copilota

## Cel produktu

Prywatna, mobilna PWA do grania w MTG Avatar po polsku. Użytkownik korzysta głównie z telefonu z Androidem w orientacji pionowej.

## Zasady bezwzględne

- Nie dodawaj backendu, logowania, analityki, OCR, AI ani zapytań do Scryfall w runtime.
- Nie pokazuj obrazów kart.
- Nie pokazuj angielskiego Oracle Text jako zastępstwa za brak polskiego tłumaczenia.
- Nazwy kart pozostają po angielsku; typy i tekst zasad są po polsku.
- Wyniki wyszukiwania zawsze są pokazane przed wejściem w szczegóły, nawet przy jednym wyniku.
- `printKey` ma format `set:collector_number` i jest identyfikatorem rekordu źródłowego.
- Kody Beginner Box są osobnymi metadanymi z `tutorial-prints.json`; nie zastępują `printKey`.
- TLA i TLE mogą mieć ten sam collector number i oznaczać inne karty.
- `tap` tłumaczymy jako „tapnij/tapowanie”, `untap` jako „odtapuj/odtapowanie”.
- Ważne pojęcia w polskim tekście zasad są klikalne i prowadzą do słowniczka.
- Nie skracaj słownikowych definicji do jednego zdania, gdy mechanika ma kilka kroków.
- Nie twórz nowych katalogów głównych bez wyraźnie innej odpowiedzialności.

## UI

- Zachowuj motyw pergaminu, brązów i niebieskiej strzałki Aanga.
- Minimalny obszar głównych przycisków: 44×44 px.
- Bez poziomego przewijania przy 320 px.
- Utrzymuj wysoki kontrast kosztu many, typu, ataku i obrony.
- Dolna nawigacja Quick Startu nie może zasłaniać treści.

## Jakość

Po zmianach uruchom:

```bash
npm run validate:data
npm test
npm run build
```

Nie oznaczaj zadania jako ukończonego, jeśli którykolwiek krok kończy się błędem.
