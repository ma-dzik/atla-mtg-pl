import type { GlossaryEntry } from '../types'
import { Content, Screen } from '../components/Screen'
import { TopBar } from '../components/TopBar'

interface Props {
  query: string
  entries: GlossaryEntry[]
  onQuery: (query: string) => void
  onBack: () => void
  onOpen: (termId: string) => void
}

export function GlossaryScreen({ query, entries, onQuery, onBack, onOpen }: Props) {
  let previousLetter = ''
  return (
    <Screen>
      <TopBar title="Słowniczek" onBack={onBack} />
      <Content>
        <label className="visually-hidden" htmlFor="glossary-search">Szukaj w słowniczku</label>
        <input id="glossary-search" className="searchbox" value={query} onChange={event => onQuery(event.target.value)} placeholder="Szukaj po angielsku lub polsku" autoComplete="off" />
        <div className="glossary-list">
          {entries.map(entry => {
            const letter = entry.englishTerm.charAt(0).toUpperCase()
            const showLetter = !query.trim() && letter !== previousLetter
            previousLetter = letter
            return <div key={entry.id} className="glossary-row">
              {showLetter && <div className="alpha">{letter}</div>}
              <button className="glossary-button" type="button" onClick={() => onOpen(entry.id)}>
                <strong>{entry.englishTerm} — {entry.polishTerm}</strong>
                <small>{entry.shortDefinitionPl}<br /><b>Otwórz pełne wyjaśnienie ›</b></small>
              </button>
            </div>
          })}
          {entries.length === 0 && <div className="empty">Brak wyników.</div>}
        </div>
      </Content>
    </Screen>
  )
}
