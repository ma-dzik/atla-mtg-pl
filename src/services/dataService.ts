import type { Card, GlossaryEntry, TutorialSection } from '../types';
import cardsData from '../data/cards.json';
import glossaryData from '../data/glossary.json';
import tutorialData from '../data/tutorial.json';

export function getCards(): Card[] {
  return cardsData as Card[];
}

export function getGlossaryEntries(): GlossaryEntry[] {
  return glossaryData as GlossaryEntry[];
}

export function getTutorialSections(): TutorialSection[] {
  return tutorialData as TutorialSection[];
}
