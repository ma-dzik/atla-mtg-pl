import type { GlossaryEntry } from '../types'
import { Content, Screen } from '../components/Screen'
import { TopBar } from '../components/TopBar'

interface Props {
  entry: GlossaryEntry
  entriesById: Map<string, GlossaryEntry>
  onBack: () => void
  onOpenRelated: (termId: string) => void
}

export function GlossaryDetailScreen({ entry, entriesById, onBack, onOpenRelated }: Props) {
  const related = entry.relatedTermIds.map(id => entriesById.get(id)).filter((value): value is GlossaryEntry => Boolean(value))
  return (
    <Screen>
      <TopBar title="Słowniczek" onBack={onBack} />
      <Content>
        <article className="glossary-detail">
          <h2>{entry.polishTerm}</h2>
          <div className="glossary-en">{entry.englishTerm}</div>
          <section className="detail-section"><h3>W skrócie</h3><p><strong>{entry.shortDefinitionPl}</strong></p></section>
          <section className="detail-section"><h3>Jak to działa</h3><p>{entry.howItWorksPl ?? entry.fullDefinitionPl}</p></section>
          {entry.stepsPl && entry.stepsPl.length > 0 && <section className="detail-section"><h3>Jak wykonać krok po kroku</h3><ol className="detail-steps">{entry.stepsPl.map(step => <li key={step}>{step}</li>)}</ol></section>}
          {entry.examplePl && <section className="detail-section"><h3>Przykład</h3><p>{entry.examplePl}</p></section>}
          {entry.tipPl && <section className="detail-section"><h3>Warto pamiętać</h3><p>{entry.tipPl}</p></section>}
          {related.length > 0 && <section className="detail-section"><h3>Powiązane pojęcia</h3><div className="related-links">{related.map(item => <button className="related-link" key={item.id} type="button" onClick={() => onOpenRelated(item.id)}>{item.polishTerm}</button>)}</div></section>}
        </article>
      </Content>
    </Screen>
  )
}
