# Avatar MTG Guide

Prywatna, mobilna aplikacja PWA do grania w **Magic: The Gathering — Avatar: The Last Airbender** po polsku.

## Aktualny zakres

- ekran startowy i menu zaakceptowane w MVP-007;
- Quick Start Zuko: 65 kroków, grafiki i zapis postępu;
- przycisk „Zacznij od nowa”;
- wyszukiwanie 524 rekordów kart po angielskiej nazwie, numerze, `printKey` i kodach tutorialowych;
- poprawne kody talii treningowej, m.in. `C0278`, `TLE 278`, `Zuko Tutorial 19` dla Dragon Moose;
- szczegóły kart bez obrazów i bez pokazywania angielskiego Oracle Text;
- 21 unikalnych kart Quick Startu z polskim tekstem i sekcją „Co to znaczy?”;
- słowniczek 127 pojęć z rozwiniętymi definicjami, przykładami i powiązaniami;
- instalowalna PWA i cache offline;
- brak backendu, logowania, analityki i zapytań do API podczas działania.

## Wymagania

- Node.js 20.19+ albo 22.12+;
- npm 10+.

## Uruchomienie

```bash
npm install
npm run dev
```

Następnie otwórz adres pokazany przez Vite.

Do testu na innym urządzeniu w tej samej sieci:

```bash
npm run dev -- --host
```

Interfejs będzie dostępny po adresie IP komputera. Instalacja PWA i service worker wymagają `localhost` albo połączenia HTTPS.

## Testy i build

```bash
npm run validate:data
npm test
npm run build
npm run preview
```

Gotowy build trafia do `dist/`.

## Struktura

```text
src/data/                         dane używane przez aplikację
public/assets/ui/                 motyw i grafiki interfejsu
public/assets/quick-start-zuko/   grafiki kroków tutorialu
source-data/scryfall/             niezmienione dane źródłowe
scripts/                          walidacja i import źródeł
docs/                             dokumentacja i materiały przeglądowe
```

## Dane kart

`printKey` nadal identyfikuje rekord źródłowy jako `set:collector_number`. Specjalne wydruki Beginner Box mają dodatkową mapę w `src/data/tutorial-prints.json`, dlatego Dragon Moose może używać rekordu zasad `tle:235`, ale w aplikacji jest poprawnie pokazywany i wyszukiwany jako:

```text
Zuko Tutorial 19
C0278
TLE 278
```

Analogicznie tutorialowy Mountain jest pokazywany jako `C0289 / TLE 289`.

## Prywatność

Aplikacja działa lokalnie. Nie wysyła zapytań do Scryfall, nie posiada backendu i nie zbiera danych użytkownika.

## Ograniczenia obecnego MVP

- Aang Quick Start oraz ścieżka „Nie gram pierwszy raz” są oznaczone jako „Wkrótce”;
- pełne polskie teksty zasad są obecnie dostępne dla kart wykorzystywanych w Quick Starcie; inne karty wyświetlają jasny komunikat o braku tłumaczenia;
- aplikacja jest projektowana i testowana przede wszystkim dla Androida w orientacji pionowej.
