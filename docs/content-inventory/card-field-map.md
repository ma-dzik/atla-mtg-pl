# Mapa pól kart: Scryfall → Avatar MTG Guide

## 1. Założenia

Plik `avatar-cards.raw.json` pozostaje niezmienionym źródłem danych.

Finalne dane aplikacji:

- nie zawierają grafik kart;
- nie zawierają cen ani linków zakupowych;
- nie pokazują użytkownikowi angielskiego tekstu Oracle;
- zachowują angielską nazwę karty;
- pokazują typ karty po polsku;
- pokazują polskie tłumaczenie działania karty;
- wyróżniają pojęcia zasad i łączą je ze słowniczkiem.

---

## 2. Model identyfikacji

- `cardId` — wartość `id` ze Scryfall;
- `oracleId` — wartość `oracle_id`;
- `setCode` — `TLA` albo `TLE`;
- `collectorNumber` — tekst, nigdy liczba;
- `printKey` — `${set}:${collector_number}`, np. `tle:74`.

Sam `collectorNumber` nie jest unikalny. Ta sama wartość może występować w TLA i TLE.

Przykład:

```text
tle:296
tla:296
```

to dwa różne rekordy.

---

## 3. Decyzje językowe

### Nazwa karty

Pozostaje po angielsku.

```text
Aang, Airbending Master
```

### Typ karty

Jest prezentowany po polsku.

```text
Legendarne stworzenie — Człowiek Avatar Sojusznik
```

Angielskie `type_line` pozostaje w danych źródłowych, ale nie musi być pokazywane użytkownikowi.

### Tekst zasad

Jest prezentowany po polsku.

Angielski `oracle_text` jest przechowywany jako źródło tłumaczenia, ale nie jest wyświetlany użytkownikowi.

### Pojęcia zasad i słowa kluczowe

W polskim tekście zasad używany jest polski termin, np.:

```text
Czujność
Groźba
Latanie
Tapnij
Odtapuj
```

Każde ważne pojęcie zasad:

- jest pogrubione;
- jest oznaczone jako interaktywne;
- może zostać tapnięte;
- otwiera krótką definicję;
- może prowadzić do pełnego wpisu w słowniczku.

Przy pierwszym wystąpieniu na ekranie można pokazać:

```text
Czujność (Vigilance)
```

Przy kolejnych wystąpieniach wystarczy:

```text
czujność
```

---

## 4. Mapa pól

| Pole Scryfall | Pole aplikacji | Finalny JSON | Użycie / transformacja |
|---|---|---:|---|
| `id` | `cardId` | tak | Bez zmian; identyfikator rekordu. |
| `oracle_id` | `oracleId` | tak | Bez zmian; powiązania i aktualizacje. |
| `name` | `name` | tak | Angielska nazwa wyświetlana i wyszukiwana. |
| `lang` | — | nie | Walidacja źródła; oczekiwane `en`. |
| `set` | `setCode` | tak | W UI wielkie litery. |
| `set_name` | `setName` | opcjonalnie | Może pozostać ukryte. |
| `collector_number` | `collectorNumber` | tak | Przechowywane jako tekst. |
| `mana_cost` | `manaCost` | tak | Dla kart wielostronnych pobierane dla każdej strony osobno. |
| `cmc` | `manaValue` | opcjonalnie | Nie jest wymagane w UI MVP. |
| `type_line` | `typeLineSource` | źródło | Angielski typ źródłowy. |
| — | `typeLinePl` | tak | Polski typ karty. |
| `oracle_text` | `rulesTextSource` | źródło | Angielski tekst do tłumaczenia; nie jest pokazywany. |
| — | `rulesTextPlPlain` | tak | Pełny polski tekst bez znaczników, używany m.in. do testów i dostępności. |
| — | `rulesTextParts` | tak | Strukturalny tekst z klikalnymi pojęciami. |
| — | `explanationPl` | tak | Sekcja „Co to znaczy?”. |
| — | `importantPl` | opcjonalnie | Częsty błąd, ograniczenie lub istotna uwaga. |
| `power` | `power` | opcjonalnie | Etykieta UI: Atak. |
| `toughness` | `toughness` | opcjonalnie | Etykieta UI: Obrona. |
| `keywords` | `sourceKeywords` | źródło | Angielskie słowa kluczowe ze Scryfall. |
| — | `glossaryTermIds` | tak | Lista wpisów słowniczka użytych przez kartę. |
| `layout` | `layout` | tak | Obecne: `normal`, `transform`, `saga`. |
| `card_faces` | `faces` | tak dla kart wielostronnych | Każda strona ma osobne dane i tekst. |
| `colors` | `colors` | opcjonalnie | Przydatne później dla talii. |
| `color_identity` | `colorIdentity` | nie w MVP | Przydatne później dla Commandera. |
| `rarity` | — | nie | Poza zakresem MVP. |
| `all_parts` | — | nie w MVP | Może wrócić przy tokenach i kartach powiązanych. |
| `image_uris` | — | nie | Grafiki kart nie są pokazywane. |
| `prices` | — | nie | Poza zakresem. |
| `purchase_uris` | — | nie | Poza zakresem. |
| `legalities` | — | nie | Poza zakresem. |
| `artist`, `artist_ids`, `illustration_id` | — | nie | Poza zakresem. |
| URI Scryfall i pozostałe linki | — | nie | Pozostają wyłącznie w raw JSON. |

---

## 5. Struktura klikalnego tekstu zasad

Nie przechowujemy interaktywnego tekstu wyłącznie jako jednego ciągu znaków.

Finalny rekord zawiera:

- `rulesTextPlPlain` — pełny tekst do odczytu, wyszukiwania i dostępności;
- `rulesTextParts` — segmenty używane do renderowania wyróżnionych pojęć.

### Typy segmentów

#### Zwykły tekst

```json
{
  "type": "text",
  "text": "Inne stworzenia, które kontrolujesz, mają "
}
```

#### Pojęcie słownikowe

```json
{
  "type": "glossary",
  "termId": "vigilance",
  "text": "czujność",
  "showEnglishTerm": false
}
```

#### Pierwsze wystąpienie pojęcia

```json
{
  "type": "glossary",
  "termId": "vigilance",
  "text": "Czujność",
  "showEnglishTerm": true
}
```

W interfejsie segment może zostać pokazany jako:

```text
Czujność (Vigilance)
```

---

## 6. Zachowanie po tapnięciu pojęcia

Po tapnięciu wyróżnionego pojęcia aplikacja otwiera mobilny panel, a nie klasyczny tooltip zależny od kursora.

Panel zawiera:

- polski termin;
- angielski termin;
- krótką definicję po polsku;
- opcjonalny przykład;
- przycisk „Otwórz w słowniczku”.

Przykład:

```text
CZUJNOŚĆ — VIGILANCE

Atakowanie tym stworem nie powoduje jego tapnięcia.

[Otwórz w słowniczku]
```

Powrót ze słowniczka prowadzi do tej samej karty i tej samej pozycji ekranu.

---

## 7. Zasady wyróżniania pojęć

### Zawsze wyróżniane

- słowa kluczowe, np. `Flying`, `Vigilance`, `Menace`;
- mechaniki Avatar, np. `Airbend`, `Earthbend`, `Firebending`;
- działania o ścisłym znaczeniu zasad, np. tapowanie, poświęcenie, wygnanie;
- strefy, jeżeli ich zrozumienie jest konieczne w danym zdaniu;
- liczniki i znaczniki, np. znacznik +1/+1;
- terminy mające bezpośredni wpływ na wykonanie działania karty.

### Wyróżniane przy pierwszym ważnym użyciu

- pole bitwy;
- cmentarz;
- biblioteka;
- wskazany cel;
- permanent;
- zdolność aktywowana lub wyzwalana.

### Niewyróżniane automatycznie przy każdym użyciu

- karta;
- gracz;
- tura;
- stworzenie, jeżeli jest użyte jako zwykły element zdania;
- słowa, które nie wymagają dodatkowego wyjaśnienia w danym kontekście.

Celem jest nauka zasad bez zamieniania całego akapitu w zbiór linków.

---

## 8. Layout: normal

Dane znajdują się na poziomie głównym rekordu.

Brak `oracle_text` jest dozwolony dla kart bez tekstu zasad.

W takim przypadku:

```json
{
  "rulesTextPlPlain": "",
  "rulesTextParts": []
}
```

Sekcja „Działanie karty” może zostać ukryta.

---

## 9. Layout: transform

Dla kart transformujących każda strona ma osobne:

- `name`;
- `manaCost`;
- `typeLinePl`;
- `power`;
- `toughness`;
- `rulesTextPlPlain`;
- `rulesTextParts`;
- `glossaryTermIds`.

Przykład:

```json
{
  "layout": "transform",
  "faces": [
    {
      "name": "Aang, at the Crossroads",
      "manaCost": "{2}{G}{W}{U}",
      "typeLinePl": "Legendarne stworzenie — Człowiek Avatar Sojusznik",
      "rulesTextPlPlain": "...",
      "rulesTextParts": [],
      "glossaryTermIds": ["flying", "transform"]
    },
    {
      "name": "Aang, Destined Savior",
      "manaCost": "",
      "typeLinePl": "Legendarne stworzenie — Avatar Sojusznik",
      "rulesTextPlPlain": "...",
      "rulesTextParts": [],
      "glossaryTermIds": ["flying", "vigilance", "earthbend"]
    }
  ]
}
```

Wyszukiwanie działa po:

- pełnej nazwie łączonej;
- nazwie pierwszej strony;
- nazwie drugiej strony.

---

## 10. Layout: saga

Sagi:

- nie mają ataku i obrony;
- mogą być prezentowane jak zwykła karta;
- zachowują polski typ;
- zachowują podział tekstu na segmenty słownikowe.

---

## 11. Minimalny finalny rekord

```json
{
  "cardId": "f369827d-e4cd-4bc7-8c5e-72882eff0908",
  "oracleId": "e46b2ac6-97d6-48f2-aba3-cd92f8e092c6",
  "printKey": "tle:210",
  "name": "Aang, Air Nomad",
  "setCode": "TLE",
  "collectorNumber": "210",
  "layout": "normal",
  "manaCost": "{3}{W}{W}",
  "typeLinePl": "Legendarne stworzenie — Człowiek Avatar Sojusznik",
  "power": "5",
  "toughness": "4",
  "rulesTextPlPlain": "Latanie. Czujność. Inne stworzenia, które kontrolujesz, mają czujność.",
  "rulesTextParts": [
    {
      "type": "glossary",
      "termId": "flying",
      "text": "Latanie",
      "showEnglishTerm": true
    },
    {
      "type": "text",
      "text": ". "
    },
    {
      "type": "glossary",
      "termId": "vigilance",
      "text": "Czujność",
      "showEnglishTerm": true
    },
    {
      "type": "text",
      "text": ". Inne stworzenia, które kontrolujesz, mają "
    },
    {
      "type": "glossary",
      "termId": "vigilance",
      "text": "czujność",
      "showEnglishTerm": false
    },
    {
      "type": "text",
      "text": "."
    }
  ],
  "glossaryTermIds": ["flying", "vigilance"],
  "explanationPl": "",
  "importantPl": null
}
```

Przykładowe polskie treści pokazują strukturę, a nie zatwierdzone finalne tłumaczenie.