import type { CardRecord } from '../types'
import { Content, Screen } from '../components/Screen'
import { TopBar } from '../components/TopBar'
import { getTutorialLabel } from '../lib/tutorial'

interface Props {
  query: string
  results: CardRecord[]
  onQuery: (query: string) => void
  onBack: () => void
  onOpenCard: (printKey: string) => void
}

export function CardsScreen({ query, results, onQuery, onBack, onOpenCard }: Props) {
  return (
    <Screen>
      <TopBar title="Karty" onBack={onBack} />
      <Content>
        <label className="visually-hidden" htmlFor="card-search">Szukaj karty</label>
        <input id="card-search" className="searchbox" value={query} onChange={event => onQuery(event.target.value)} placeholder="Nazwa, C0278, TLE 278..." autoComplete="off" />
        {!query.trim() && <div className="empty">Wpisz angielską nazwę, kod z dołu karty albo numer tutorialu, np. <strong>Dragon Moose</strong>, <strong>C0278</strong>, <strong>TLE 278</strong>, <strong>Zuko Tutorial 19</strong> albo <strong>Mountain</strong>.</div>}
        {query.trim() && results.length === 0 && <div className="empty">Nie znaleziono karty pasującej do „{query}”.</div>}
        {results.length > 0 && <div className="result-list">{results.map(card => {
          const tutorial = getTutorialLabel(card)
          const metadata = tutorial
            ? `${tutorial.code} · ${tutorial.setCode} ${tutorial.collector} · ${tutorial.positionLabel}`
            : `${card.setCode} ${card.collectorNumber}`
          return (
            <button key={card.printKey} className="result-button" type="button" onClick={() => onOpenCard(card.printKey)}>
              <strong>{card.name}</strong>
              <small>{card.faces[0].typeLinePl} · {metadata}</small>
            </button>
          )
        })}</div>}
      </Content>
    </Screen>
  )
}
