import type { CardRecord } from '../types'
import { Content, Screen } from '../components/Screen'
import { TopBar } from '../components/TopBar'
import { RulesText } from '../components/RulesText'
import { getTutorialLabel } from '../lib/tutorial'

interface Props {
  card: CardRecord
  onBack: () => void
  onOpenTerm: (termId: string) => void
  getEnglishTerm: (termId: string) => string | undefined
}

export function CardDetailScreen({ card, onBack, onOpenTerm, getEnglishTerm }: Props) {
  const tutorial = getTutorialLabel(card)

  return (
    <Screen>
      <TopBar title="Szczegóły karty" onBack={onBack} />
      <Content>
        <header className="card-head">
          <h2 className="card-name">{card.name}</h2>
          {tutorial && <div className="card-code-line">
            <span className="tutorial-badge">{tutorial.positionLabel}</span>
            <span className="tutorial-badge">Kod {tutorial.code}</span>
            <span className="tutorial-badge">{tutorial.setCode} {tutorial.collector}</span>
          </div>}
        </header>

        {card.faces.map(face => (
          <section key={face.faceIndex} className="card-face-section">
            {card.faces.length > 1 && <h3 className="face-name">{face.name}</h3>}
            <div className="info-grid">
              <div className="info-box"><span className="info-label">Koszt many</span><span className="info-value">{face.manaCost || 'Brak'}</span></div>
              {(face.power !== null || face.toughness !== null) && <div className="info-box"><span className="info-label">Atak / obrona</span><span className="info-value">{face.power ?? '—'} / {face.toughness ?? '—'}</span></div>}
              <div className="info-box wide"><span className="info-label">Typ karty</span><span className="info-value">{face.typeLinePl}</span></div>
              {!tutorial && <div className="info-box wide"><span className="info-label">Zestaw / numer</span><span className="info-value">{card.setCode} {card.collectorNumber}</span></div>}
            </div>
            <div className="section-label">Tekst zasad</div>
            <div className="rules-panel"><RulesText face={face} onOpenTerm={onOpenTerm} getEnglishTerm={getEnglishTerm} /></div>
            {face.explanationPl && <><div className="section-label">Co to znaczy?</div><div className="note">{face.explanationPl}</div></>}
            {face.importantPl && <div className="note warning"><strong>Ważne:</strong> {face.importantPl}</div>}
          </section>
        ))}
      </Content>
    </Screen>
  )
}
