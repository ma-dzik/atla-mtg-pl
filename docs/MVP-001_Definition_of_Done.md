# MVP-001 — Definition of Done

## Story

**Jako właściciel produktu chcę zamknąć zakres pierwszej wersji aplikacji Avatar MTG Guide, aby rozpocząć tworzenie backlogu i implementację bez rozszerzania MVP o dodatkowe funkcje.**

## Cel MVP

Avatar MTG Guide ma być prostą, działającą offline aplikacją mobilną pomagającą początkującemu graczowi korzystać z talii **Zuko Tutorial** z zestawu *Magic: The Gathering — Avatar: The Last Airbender Beginner Box*.

Pierwsza wersja jest przeznaczona wyłącznie do prywatnego użytku na dwóch telefonach z Androidem, w orientacji pionowej.

## Zakres funkcjonalny

MVP zawiera:

- ekran startowy z grafiką pudełka i napisem „Naciśnij, aby rozpocząć”;
- menu główne z trzema przyciskami:
  - Instrukcja,
  - Karty,
  - Słowniczek;
- Quick Start Guide dla talii Zuko;
- 20 kart z talii Zuko Tutorial;
- Rules Reference przepisane i wykorzystane jako źródło słowniczka;
- Rules Reference przepisane i przygotowane jako podstawa przyszłej pełnej instrukcji;
- wyszukiwanie kart po angielskiej nazwie, fragmencie nazwy, numerze lub kodzie;
- słowniczek z wyszukiwarką i alfabetyczną listą pojęć;
- zapisywanie postępu Quick Start;
- działanie offline po pierwszym uruchomieniu;
- nawigację dostosowaną do telefonu.

## Ekran startowy

- Po uruchomieniu widoczna jest grafika pudełka Beginner Box.
- Na dole widoczny jest napis „Naciśnij, aby rozpocząć”.
- Tapnięcie ekranu otwiera menu główne.

## Menu główne

Menu zawiera trzy duże przyciski ułożone pionowo:

1. Instrukcja
2. Karty
3. Słowniczek

Przyciski są wygodne do obsługi kciukiem.

## Instrukcja

Po wybraniu „Instrukcja” pojawia się pytanie:

**„Czy grasz w Magic: The Gathering po raz pierwszy?”**

Dostępne opcje:

- **Tak, to moja pierwsza gra** — aktywna;
- **Nie, znam już podstawy** — wyszarzona, nieaktywna i oznaczona „Wkrótce”.

Po wybraniu aktywnej opcji pojawia się wybór talii:

- **Zuko** — aktywna;
- **Aang** — wyszarzona, nieaktywna i oznaczona „Wkrótce”.

Wybranie Zuko otwiera Quick Start Guide.

## Quick Start Guide Zuko

Każdy krok zawiera:

- numer kroku;
- pasek postępu;
- tytuł;
- polecenie;
- krótkie wyjaśnienie;
- grafikę lub fragment grafiki z instrukcji, jeśli jest potrzebny;
- strzałkę w lewo;
- strzałkę w prawo;
- możliwość powrotu do menu głównego.

Postęp jest zapisywany lokalnie.

Po ponownym wejściu użytkownik może:

- kontynuować od zapisanego kroku;
- rozpocząć tutorial od początku.

Rozpoczęcie od początku wymaga potwierdzenia.

## Karty

Ekran zawiera:

- strzałkę powrotu do menu głównego;
- pole wyszukiwania u góry;
- komunikat początkowy zachęcający do wyszukania karty.

Przed wpisaniem tekstu lista kart nie jest wyświetlana.

Wyszukiwanie działa po:

- angielskiej nazwie;
- fragmencie angielskiej nazwy;
- numerze karty;
- pełnym kodzie karty.

Po znalezieniu karty wyświetlane są:

- angielska nazwa;
- koszt;
- typ;
- atak i obrona, jeśli występują;
- polski tekst działania;
- sekcja „Co to znaczy?”;
- dodatkowa uwaga, jeśli jest potrzebna;
- kod i numer karty.

Grafika karty oraz angielski tekst zasad nie są wyświetlane.

## Słowniczek

Ekran zawiera:

- strzałkę powrotu do menu głównego;
- pole wyszukiwania;
- alfabetyczną listę pojęć.

Lista jest widoczna od razu i filtrowana podczas wpisywania.

Wyszukiwanie działa po:

- angielskim terminie;
- polskiej nazwie;
- słowach występujących w definicji.

Każdy wpis może zawierać:

- angielski termin;
- polską nazwę;
- krótką definicję;
- szersze wyjaśnienie;
- przykład;
- powiązane pojęcia.

## Wygląd

Motyw wizualny nawiązuje do Avatar: The Last Airbender:

- jasne beżowe tło;
- brązowe elementy i tekst;
- niebieskie akcenty inspirowane strzałką Aanga;
- zaokrąglone przyciski;
- proste obramowania nawiązujące do papieru lub zwoju;
- czytelny interfejs bez nadmiaru dekoracji.

## Urządzenia i technologia

- aplikacja jest projektowana na telefon z Androidem;
- obsługiwana jest orientacja pionowa;
- minimalna szerokość projektowa: około 360 px;
- aplikacja nie wymaga backendu;
- aplikacja nie korzysta z API ani AI;
- dane są przechowywane lokalnie;
- aplikacja działa offline po pierwszym otwarciu.

## Poza zakresem MVP

MVP nie zawiera:

- aktywnej talii Aanga;
- pełnej instrukcji dla osób znających podstawy;
- innych talii z Beginner Boxa;
- zakładki „Moja talia”;
- licznika życia;
- liczników obrażeń lub innych miar;
- Commandera;
- gry dla trzech lub większej liczby graczy;
- logowania i kont użytkowników;
- synchronizacji między urządzeniami;
- aparatu;
- OCR;
- AI;
- API;
- grafik kart;
- monitorowania rozgrywki na żywo;
- automatycznego rozstrzygania zasad.

## Materiały źródłowe

Właściciel produktu dostarczy:

- skan grafiki pudełka;
- skany Zuko Quick Start Guide;
- skany Rules Reference;
- dane lub zdjęcia 20 kart talii Zuko Tutorial.

Skanowane materiały będą użyte jako źródło tekstów i grafik do prywatnej aplikacji.

## Kryteria zamknięcia MVP-001

MVP-001 jest zakończone, gdy:

- nazwa aplikacji została ustalona jako **Avatar MTG Guide**;
- zakres funkcjonalny MVP został zapisany;
- funkcje pozostające poza MVP zostały jasno określone;
- aktywne i wyszarzone ścieżki instrukcji zostały ustalone;
- zawartość bazy została ograniczona do talii Zuko Tutorial;
- ustalono zachowanie ekranów Karty i Słowniczek;
- ustalono zapisywanie postępu Quick Start;
- ustalono tryb offline;
- ustalono docelowe urządzenia;
- dokument został zaakceptowany przez właściciela produktu.

## Status

**Gotowe do zamknięcia po akceptacji właściciela produktu.**
