import { describe, expect, it } from 'vitest'
import glossaryJson from '../data/glossary.json'
import type { GlossaryData } from '../types'
import { searchGlossary } from './glossarySearch'

const entries = (glossaryJson as GlossaryData).entries

describe('searchGlossary', () => {
  it('searches without Polish diacritics', () => {
    expect(searchGlossary(entries, 'czujnosc').some(entry => entry.id === 'vigilance')).toBe(true)
  })

  it('finds Landcycling and its expanded content', () => {
    const entry = searchGlossary(entries, 'landcycling').find(item => item.id === 'landcycling')
    expect(entry?.stepsPl?.length).toBeGreaterThanOrEqual(5)
    expect(entry?.howItWorksPl).toContain('odrzucasz')
  })
})
