import { describe, expect, it } from 'vitest'
import cardsJson from '../data/avatar-cards.app.json'
import type { CardsData } from '../types'
import { searchCards } from './cardSearch'

const cards = (cardsJson as CardsData).records

describe('searchCards', () => {
  it.each(['Dragon Moose', 'C0278', 'TLE 278', 'Zuko Tutorial 19'])(
    'finds Dragon Moose for %s', query => {
      expect(searchCards(cards, query)[0]?.name).toBe('Dragon Moose')
    },
  )

  it('finds the tutorial Mountain', () => {
    const results = searchCards(cards, 'Mountain')
    expect(results.some(card => card.printKey === 'tla:285')).toBe(true)
  })

  it('can return more than one set for a shared collector number', () => {
    const results = searchCards(cards, '74')
    expect(new Set(results.map(card => card.setCode)).size).toBeGreaterThanOrEqual(2)
  })
})
