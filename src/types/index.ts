export type AppRoute = '/' | '/menu' | '/instrukcja' | '/karty' | '/slowniczek';

export interface Card {
  id: string;
  name: string;
  namePl: string;
  type: string;
  manaCost: string;
  text: string;
  textPl: string;
  set: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export interface TutorialSection {
  id: string;
  title: string;
  content: string;
}
