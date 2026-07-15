# Zasady wyszukiwania

Dokument opisuje dwa niezależne mechanizmy:

1. wyszukiwanie kart;
2. wyszukiwanie pojęć w słowniczku.

---

# 1. Wyszukiwanie kart

## 1.1. Stan początkowy

Po wejściu do zakładki **Karty**:

- widoczna jest strzałka do menu głównego;
- widoczny jest search bar;
- widoczny jest komunikat: **„Wyszukaj kartę po angielskiej nazwie lub kodzie.”**;
- lista 524 kart nie jest pokazywana.

## 1.2. Wyszukiwane pola

1. `name` — pełna angielska nazwa albo jej fragment;
2. nazwy poszczególnych stron w `faces`;
3. `collectorNumber`;
4. `setCode`;
5. połączenie `setCode + collectorNumber`.

Karty nie są wyszukiwane po:

- polskim typie;
- polskim tekście zasad;
- polskim objaśnieniu;
- nazwie przetłumaczonej, ponieważ nazwy kart pozostają angielskie.

## 1.3. Normalizacja zapytania

Przed wyszukaniem:

1. usuń spacje z początku i końca;
2. zamień wielokrotne spacje na jedną;
3. porównuj bez rozróżniania wielkości liter;
4. dla kodu uznaj spację, dwukropek i myślnik za równoważne:
   - `TLE 74`
   - `tle:74`
   - `tle-74`
5. przy porównywaniu czysto cyfrowego numeru usuń zera wiodące:
   - `0074` = `74`;
6. oryginalny `collectorNumber` pozostaje tekstem.

## 1.4. Lista przed szczegółami

Po wpisaniu zapytania aplikacja zawsze pokazuje listę wyników.

- Szczegóły nie otwierają się automatycznie.
- Zasada obowiązuje również przy jednym wyniku.
- Tapnięcie wyniku otwiera szczegóły.
- Powrót przywraca zapytanie i pozycję listy.

## 1.5. Kolejność dopasowań

1. dokładny pełny kod `set + number`;
2. dokładna pełna nazwa;
3. początek nazwy;
4. fragment nazwy;
5. sam numer;
6. sam kod zestawu.

W obrębie tej samej jakości dopasowania:

1. alfabetycznie po nazwie;
2. `TLA` przed `TLE`;
3. numerycznie po `collectorNumber`, gdy jest czysto cyfrowy.

## 1.6. Prezentacja wyniku karty

Każdy wynik pokazuje:

```text
Aang, Airbending Master
Legendarne stworzenie — Człowiek Avatar Sojusznik
Koszt: {4}{W}
TLE 74
```

Ustalenia:

- nazwa pozostaje po angielsku;
- typ jest po polsku;
- jeżeli karta nie ma kosztu, wiersz kosztu może być ukryty;
- lista nie pokazuje grafiki karty;
- lista nie pokazuje pełnego tekstu zasad.

## 1.7. Przykłady

### Pełna nazwa

```text
Aang, Airbending Master
```

Zwraca dokładne dopasowanie.

### Fragment nazwy

```text
airbending
```

Zwraca wszystkie nazwy zawierające `airbending`.

### Sam numer

```text
74
```

Może zwrócić więcej niż jeden wynik, np. rekordy z TLA i TLE.

### Pełny kod

```text
TLE 74
tle:74
tle-0074
```

Są traktowane równoważnie.

### Karta transformująca

Wyszukanie nazwy dowolnej strony prowadzi do jednego rekordu pokazującego wszystkie strony.

### Brak wyniku

Komunikat:

> Nie znaleziono takiej karty. Sprawdź angielską nazwę albo kod karty.

Wpisana fraza pozostaje w search barze.

## 1.8. Minimalne przypadki testowe

| Zapytanie | Oczekiwane zachowanie |
|---|---|
| `AANG` | wyniki zawierające Aang |
| ` air nomad ` | ignorowanie skrajnych spacji |
| `74` | lista kart TLA/TLE z numerem 74 |
| `TLE 74` | wynik dla TLE 74 |
| `tla-074` | wynik dla TLA 74 |
| nazwa drugiej strony transform | właściwy rekord transform |
| `xyz-nie-istnieje` | komunikat o braku wyników |
| pusty tekst | komunikat początkowy, bez listy |

---

# 2. Wyszukiwanie słowniczka

## 2.1. Stan początkowy

Po wejściu do zakładki **Słowniczek**:

- widoczna jest strzałka do menu głównego;
- widoczny jest search bar;
- poniżej widoczna jest pełna lista pojęć posortowana alfabetycznie;
- lista jest filtrowana podczas wpisywania.

## 2.2. Wyszukiwane pola

Każdy wpis słowniczka może zostać znaleziony po:

1. `englishTerm`;
2. `polishTerm`;
3. `aliases`;
4. słowach występujących w krótkiej definicji;
5. opcjonalnie po formach odmienionych zapisanych jako aliasy.

Przykładowy rekord:

```json
{
  "id": "vigilance",
  "englishTerm": "Vigilance",
  "polishTerm": "Czujność",
  "aliases": [
    "vigilant",
    "czujnosc",
    "czujny"
  ],
  "shortDefinitionPl": "Atakowanie tym stworem nie powoduje jego tapnięcia."
}
```

## 2.3. Normalizacja zapytania

Przed porównaniem:

1. usuń skrajne spacje;
2. zamień wiele spacji na jedną;
3. ignoruj wielkość liter;
4. wyszukiwanie powinno działać zarówno z polskimi znakami, jak i bez nich:
   - `czujność`
   - `czujnosc`
5. odmienione formy nie są generowane automatycznie — istotne warianty są dodawane do `aliases`.

## 2.4. Przykłady aliasów

### Tap

```json
{
  "englishTerm": "Tap",
  "polishTerm": "Tapowanie",
  "aliases": [
    "tapnij",
    "tapniecie",
    "tapnięcie",
    "tapnieta",
    "tapnięta",
    "obroc",
    "obróć",
    "obrocenie",
    "obrócenie"
  ]
}
```

### Untap

```json
{
  "englishTerm": "Untap",
  "polishTerm": "Odtapowanie",
  "aliases": [
    "odtapuj",
    "odtapniecie",
    "odtapnięcie",
    "odtapowany",
    "odtapowana"
  ]
}
```

### Menace

```json
{
  "englishTerm": "Menace",
  "polishTerm": "Groźba",
  "aliases": [
    "grozba",
    "groźba"
  ]
}
```

## 2.5. Kolejność wyników słowniczka

1. dokładne dopasowanie angielskiego terminu;
2. dokładne dopasowanie polskiego terminu;
3. dokładne dopasowanie aliasu;
4. początek terminu;
5. fragment terminu;
6. dopasowanie w definicji.

Wyniki o tej samej jakości są sortowane alfabetycznie według `englishTerm`.

## 2.6. Prezentacja wyniku słowniczka

Element listy pokazuje:

```text
VIGILANCE — CZUJNOŚĆ

Atakowanie tym stworem nie powoduje jego tapnięcia.
```

Po tapnięciu otwiera się pełny wpis.

## 2.7. Powiązanie z kartą

Terminy wyróżnione w tekście karty nie uruchamiają wyszukiwarki.

Tapnięcie terminu:

1. otwiera krótki panel definicji;
2. pokazuje termin polski i angielski;
3. pokazuje krótką definicję po polsku;
4. umożliwia przejście bezpośrednio do pełnego wpisu słownika.

Przykład:

```text
CZUJNOŚĆ — VIGILANCE

Atakowanie tym stworem nie powoduje jego tapnięcia.

[Otwórz w słowniczku]
```

Powrót ze słowniczka przywraca tę samą kartę.

## 2.8. Brak wyników

Komunikat:

> Nie znaleziono takiego pojęcia. Spróbuj wpisać termin z karty po angielsku albo jego polski odpowiednik.

Wpisana fraza pozostaje w search barze.

## 2.9. Minimalne przypadki testowe

| Zapytanie | Oczekiwane zachowanie |
|---|---|
| `vigilance` | Czujność — Vigilance |
| `czujność` | Czujność — Vigilance |
| `czujnosc` | wynik bez polskich znaków |
| `vigilant` | wynik przez alias |
| `tap` | Tap — Tapowanie |
| `tapnij` | wynik przez polską formę czasownika |
| `groźba` | Menace — Groźba |
| `grozba` | wynik bez polskich znaków |
| `obrót` | wynik tylko wtedy, gdy zapisano odpowiedni alias lub występuje w definicji |
| `xyz-nie-istnieje` | komunikat o braku wyników |
| pusty tekst | pełna lista alfabetyczna |

---

# 3. Wyróżnione pojęcia na ekranie karty

## 3.1. Wygląd

Pojęcie zasad w tekście karty powinno być:

- pogrubione;
- podkreślone albo oznaczone innym niekolorystycznym wskaźnikiem;
- wyróżnione niebieskim akcentem;
- wystarczająco duże do tapnięcia.

Nie wolno polegać wyłącznie na kolorze.

## 3.2. Pierwsze i kolejne wystąpienia

Pierwsze ważne wystąpienie na ekranie:

```text
Czujność (Vigilance)
```

Kolejne:

```text
czujność
```

Oba prowadzą do tego samego wpisu `vigilance`.

## 3.3. Dostępność

Każdy interaktywny termin musi mieć:

- tekstową nazwę dostępną dla czytnika ekranu;
- informację, że element otwiera definicję;
- obszar tapnięcia większy niż sam kształt liter;
- możliwość zamknięcia panelu bez utraty pozycji na karcie.