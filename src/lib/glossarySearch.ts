import type { GlossaryEntry } from '../types'
import { normalizeSearch } from './normalize'

export function searchGlossary(entries: GlossaryEntry[], query: string): GlossaryEntry[] {
  const needle = normalizeSearch(query)
  if (!needle) return entries

  return entries.filter(entry => [
    entry.englishTerm,
    entry.polishTerm,
    entry.shortDefinitionPl,
    entry.fullDefinitionPl,
    entry.howItWorksPl ?? '',
    ...(entry.aliases ?? []),
  ].some(value => normalizeSearch(value).includes(needle)))
}
