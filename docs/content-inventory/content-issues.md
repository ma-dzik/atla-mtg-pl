# Problemy i decyzje treściowe

## Statusy

- `open` — wymaga decyzji właściciela produktu;
- `accepted` — decyzja przyjęta;
- `resolved` — problem rozwiązany w materiałach;
- `deferred` — świadomie przeniesione poza MVP.

## Lista

### CONTENT-001 — język linii typu

- **Kategoria:** terminology-decision
- **Status:** open
- **Źródło:** JSON kart / ekran szczegółów
- **Problem:** nazwa karty ma pozostać angielska, ale nie ustalono jednoznacznie, czy `type_line` ma być pokazany po angielsku (`Legendary Creature — Human Avatar Ally`), czy przetłumaczony.
- **Wpływ:** struktura `cards.json`, lista wyników oraz nakład pracy tłumaczeniowej.
- **Rekomendacja:** tłumaczyć główny typ (`Creature`, `Land`, `Instant`, `Sorcery`, `Artifact`, `Enchantment`), a nazwy podtypów zachowywać spójnie ze słowniczkiem.

### CONTENT-002 — etykiety power/toughness

- **Kategoria:** terminology-decision
- **Status:** accepted
- **Decyzja:** w interfejsie używać **Atak / Obrona**, zgodnie z wymaganiem właściciela produktu.
- **Źródłowe pola:** `power` / `toughness`.

### CONTENT-003 — Firebend kontra Firebending

- **Kategoria:** terminology-decision
- **Status:** accepted
- **Problem:** Rules Reference używa hasła `FIREBEND`, a dane Scryfall keyword `Firebending`.
- **Decyzja:** jeden wpis słowniczka z aliasami `Firebend` i `Firebending`.

### CONTENT-004 — licznik życia w Quick Start

- **Kategoria:** future-feature
- **Status:** accepted
- **Problem:** tutorial wielokrotnie zmienia życie graczy, ale MVP nie zawiera licznika.
- **Decyzja:** wartości życia są częścią tekstu i grafik kroku. Użytkownik zmienia je fizyczną kością.

### CONTENT-005 — numeracja stron

- **Kategoria:** source-ambiguous
- **Status:** resolved
- **Problem:** PDF Quick Start ma 22 strony, a drukowana numeracja dochodzi do 30, ponieważ część skanów zawiera rozkładówki.
- **Decyzja:** wszystkie pliki inwentaryzacyjne używają numeru strony PDF (`source_page`).

### CONTENT-006 — obrazy źródłowe

- **Kategoria:** source-usage
- **Status:** accepted
- **Decyzja:** skany pozostają w `private-source/`; w repo trafiają wyłącznie przycięte assety potrzebne aplikacji albo własne diagramy.

### CONTENT-007 — karty transformujące

- **Kategoria:** layout-exception
- **Status:** accepted
- **Dane:** 8 rekordów `layout=transform`.
- **Decyzja:** jeden wynik wyszukiwania i jeden ekran szczegółów z dwiema sekcjami/stronami.

### CONTENT-008 — puste oracle_text

- **Kategoria:** layout-exception
- **Status:** resolved
- **Dane:** 11 rekordów bez top-level `oracle_text`.
- **Wyjaśnienie:** 8 transformów przechowuje tekst w `card_faces`; 3 normalne karty są vanilla creatures.
- **Decyzja:** pusty polski tekst zasad jest dozwolony, ale sekcja „Co to znaczy?” może wyjaśniać podstawowe użycie karty.

### CONTENT-009 — oznaczenia Zuko Tutorial 1–20

- **Kategoria:** future-feature
- **Status:** deferred
- **Decyzja:** nie dodajemy ich do wyszukiwarki ani bazy MVP. Quick Start identyfikuje karty nazwami z instrukcji.

### CONTENT-010 — pełna instrukcja po odpowiedzi „Nie”

- **Kategoria:** future-feature
- **Status:** deferred
- **Decyzja:** przycisk pozostaje wyszarzony. Sekcje Rules Reference oznaczone `future-full-guide` są tylko zinwentaryzowane.

### CONTENT-011 — kolizje numerów TLA/TLE

- **Kategoria:** duplicate-print
- **Status:** accepted
- **Dane:** 225 numerów kolekcjonerskich występuje w obu zestawach.
- **Decyzja:** wyniki rozróżnia `set + collector_number`; sam numer zawsze prowadzi najpierw do listy.

### CONTENT-012 — liczba ekranów Quick Start

- **Kategoria:** content-granularity
- **Status:** open
- **Propozycja:** 64 kroki aplikacji.
- **Uzasadnienie:** pojedynczy krok zawiera jedną czynność, jedno rozstrzygnięcie albo jedno ważne pojęcie. Podsumowania stołu pozostają osobnymi krokami.
- **Decyzja potrzebna:** zaakceptować 64 kroki albo wskazać, że kroki startu tury (`odtapuj + dobierz + zagraj ląd`) mają zostać łączone mocniej.

### CONTENT-013 — terminologia mechanik bez oficjalnego polskiego słownika

- **Kategoria:** translation-decision
- **Status:** open
- **Problem:** część mechanik ma rozpoznawalne angielskie nazwy (`hexproof`, `scry`, `surveil`), a dosłowne polskie odpowiedniki mogą utrudnić korzystanie z angielskich kart.
- **Rekomendacja:** nagłówek wpisu zachowuje angielski termin, obok pokazuje robocze polskie określenie; definicja jest w całości po polsku.

## Blokery przed zamknięciem MVP-003

1. CONTENT-001 — język linii typu.
2. CONTENT-012 — akceptacja granularity 64 kroków.
3. CONTENT-013 — format nazw mechanik w słowniczku.
