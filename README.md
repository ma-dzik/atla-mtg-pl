# Avatar MTG Przewodnik

Mobilna aplikacja PWA dla Androida – przewodnik po kartach Magic: The Gathering z setu Avatar: The Last Airbender.

## Wymagania

- [Node.js](https://nodejs.org/) w wersji 18 lub nowszej
- npm (dołączone do Node.js)

## Konfiguracja

```bash
# Sklonuj repozytorium
git clone https://github.com/ma-dzik/atla-mtg-pl.git
cd atla-mtg-pl

# Zainstaluj zależności
npm install
```

## Lokalne uruchomienie

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

## Budowanie

```bash
npm run build
```

Pliki produkcyjne zostaną wygenerowane w katalogu `dist/`.

### Podgląd wersji produkcyjnej

```bash
npm run preview
```

## Wdrożenie na GitHub Pages

Upewnij się, że w ustawieniach repozytorium GitHub włączone jest GitHub Pages (Branch: `gh-pages`, folder: `/`).

```bash
npm run deploy
```

Polecenie zbuduje aplikację i opublikuje zawartość katalogu `dist/` na gałęzi `gh-pages`.

Aplikacja będzie dostępna pod adresem:
`https://ma-dzik.github.io/atla-mtg-pl/`

## Struktura projektu

```
src/
├── components/        # Wielokrotnie używane komponenty UI
│   ├── BackButton     # Przycisk powrotu do menu głównego
│   └── PageLayout     # Wspólny układ strony z nagłówkiem
├── data/              # Lokalne dane JSON (bez backendu)
│   ├── cards.json     # Dane kart (do uzupełnienia)
│   ├── glossary.json  # Słowniczek terminów (do uzupełnienia)
│   └── tutorial.json  # Treść instrukcji (do uzupełnienia)
├── pages/             # Widoki aplikacji (jeden na trasę)
│   ├── StartScreen    # Ekran powitalny
│   ├── MainMenu       # Menu główne
│   ├── InstrukcjaPage # Przewodnik po zasadach
│   ├── KartyPage      # Przeglądarka kart
│   └── SlowniczekPage # Słowniczek MTG
├── services/          # Warstwa dostępu do danych
│   └── dataService.ts # Funkcje odczytu danych JSON
└── types/             # Definicje typów TypeScript
    └── index.ts
```

## Technologie

- **React 19** + **TypeScript** – interfejs użytkownika
- **Vite** – bundler i serwer deweloperski
- **React Router DOM** – nawigacja po stronie klienta (HashRouter dla GitHub Pages)
- **vite-plugin-pwa** – wsparcie PWA (service worker, manifest)
- **gh-pages** – wdrożenie na GitHub Pages

## Lintowanie

```bash
npm run lint
```

## Uwagi

- Aplikacja jest zoptymalizowana pod pionowe ekrany mobilne (min. 360 px szerokości).
- Dane kart, słownik i treść instrukcji są placeholderami – należy je uzupełnić w plikach JSON w katalogu `src/data/`.
- Nie zawiera backendu, API, uwierzytelniania ani zewnętrznej bazy danych.
