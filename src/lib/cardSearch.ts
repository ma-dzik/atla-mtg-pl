import type { CardRecord } from '../types'
import { normalizeSearch } from './normalize'
import { getTutorialLabel } from './tutorial'

interface ScoredCard { card: CardRecord; score: number; tutorial: boolean }

export function searchCards(cards: CardRecord[], query: string, limit = 60): CardRecord[] {
  const needle = normalizeSearch(query)
  if (!needle) return []

  return cards
    .map((card): ScoredCard => {
      const sourceNumber = String(card.collectorNumberNumeric ?? card.collectorNumber)
      const tutorial = getTutorialLabel(card)
      const candidates = [
        card.search.normalizedName,
        ...card.search.normalizedFaceNames,
        normalizeSearch(card.printKey),
        normalizeSearch(sourceNumber),
        normalizeSearch(`${card.setCode} ${sourceNumber}`),
        normalizeSearch(`${card.setCode}:${sourceNumber}`),
      ]

      if (tutorial) {
        candidates.push(
          normalizeSearch(tutorial.code),
          normalizeSearch(`${tutorial.setCode} ${tutorial.collector}`),
          normalizeSearch(`${tutorial.setCode}:${tutorial.collector}`),
          normalizeSearch(tutorial.positionLabel),
          ...tutorial.positions.map(position => normalizeSearch(`Zuko Tutorial ${position}`)),
        )
      }

      let score = Number.POSITIVE_INFINITY
      if (candidates.some(value => value === needle)) score = 0
      else if (candidates.some(value => value.startsWith(needle))) score = 1
      else if (candidates.some(value => value.includes(needle))) score = 2

      return { card, score, tutorial: Boolean(tutorial) }
    })
    .filter(item => Number.isFinite(item.score))
    .sort((a, b) =>
      a.score - b.score ||
      Number(b.tutorial) - Number(a.tutorial) ||
      a.card.name.localeCompare(b.card.name, 'en') ||
      a.card.setCode.localeCompare(b.card.setCode) ||
      a.card.collectorNumber.localeCompare(b.card.collectorNumber, undefined, { numeric: true }),
    )
    .slice(0, limit)
    .map(item => item.card)
}
