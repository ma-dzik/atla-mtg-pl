import type { GlossaryEntry } from '../types'

interface GlossarySheetProps {
  entry: GlossaryEntry
  onClose: () => void
  onOpenFull: () => void
}

export function GlossarySheet({ entry, onClose, onOpenFull }: GlossarySheetProps) {
  return (
    <div className="sheet-backdrop" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <button className="sheet-close" type="button" aria-label="Zamknij definicję" onClick={onClose}>×</button>
        <div className="sheet-grip" />
        <h2 id="sheet-title">{entry.polishTerm}</h2>
        <p className="sheet-english">{entry.englishTerm}</p>
        <p><strong>{entry.shortDefinitionPl}</strong></p>
        <p>{entry.howItWorksPl ?? entry.fullDefinitionPl}</p>
        <button className="sheet-more" type="button" onClick={onOpenFull}>Otwórz pełne wyjaśnienie</button>
      </section>
    </div>
  )
}
