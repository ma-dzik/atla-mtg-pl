import { describe, expect, it } from 'vitest'
import { parseRoute } from './routes'

describe('parseRoute', () => {
  it('parses Quick Start step', () => {
    expect(parseRoute('/instrukcja/zuko/12')).toEqual({ kind: 'quickStart', step: 12 })
  })

  it('parses encoded card key after decoding by caller', () => {
    expect(parseRoute('/karty/tle:235')).toEqual({ kind: 'card', printKey: 'tle:235' })
  })
})
