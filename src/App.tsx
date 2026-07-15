import { useEffect, useMemo, useRef, useState } from 'react'
import cardsJson from './data/avatar-cards.app.json'
import glossaryJson from './data/glossary.json'
import quickStartJson from './data/quick-start-zuko.json'
import type { CardsData, GlossaryData, QuickStartData } from './types'
import { getPath, navigate, parseRoute, routeKey } from './lib/routes'
import { readQuickStartStep, resetQuickStart, saveQuickStartStep } from './lib/storage'
import { searchCards } from './lib/cardSearch'
import { searchGlossary } from './lib/glossarySearch'
import { StartScreen } from './screens/StartScreen'
import { MenuScreen } from './screens/MenuScreen'
import { InstructionsScreen } from './screens/InstructionsScreen'
import { DeckSelectScreen } from './screens/DeckSelectScreen'
import { QuickStartScreen } from './screens/QuickStartScreen'
import { CardsScreen } from './screens/CardsScreen'
import { CardDetailScreen } from './screens/CardDetailScreen'
import { GlossaryScreen } from './screens/GlossaryScreen'
import { GlossaryDetailScreen } from './screens/GlossaryDetailScreen'
import { NotFoundScreen } from './screens/NotFoundScreen'
import { GlossarySheet } from './components/GlossarySheet'

const cardsData = cardsJson as CardsData
const glossaryData = glossaryJson as GlossaryData
const quickStartData = quickStartJson as QuickStartData

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(getPath()))
  const [quickProgress, setQuickProgress] = useState(() => readQuickStartStep(quickStartData.steps.length - 1))
  const [cardQuery, setCardQuery] = useState(() => sessionStorage.getItem('avatar-mtg-guide:card-query') ?? '')
  const [glossaryQuery, setGlossaryQuery] = useState(() => sessionStorage.getItem('avatar-mtg-guide:glossary-query') ?? '')
  const [sheetTermId, setSheetTermId] = useState<string | null>(null)
  const previousRoute = useRef(routeKey(route))

  const cardsByKey = useMemo(() => new Map(cardsData.records.map(card => [card.printKey, card])), [])
  const glossaryById = useMemo(() => new Map(glossaryData.entries.map(entry => [entry.id, entry])), [])
  const cardResults = useMemo(() => searchCards(cardsData.records, cardQuery), [cardQuery])
  const glossaryResults = useMemo(() => searchGlossary(glossaryData.entries, glossaryQuery), [glossaryQuery])

  useEffect(() => {
    const onHashChange = () => {
      sessionStorage.setItem(`avatar-mtg-guide:scroll:${previousRoute.current}`, String(window.scrollY))
      const next = parseRoute(getPath())
      const key = routeKey(next)
      previousRoute.current = key
      setRoute(next)
      setSheetTermId(null)
      requestAnimationFrame(() => {
        const saved = Number(sessionStorage.getItem(`avatar-mtg-guide:scroll:${key}`) ?? 0)
        window.scrollTo({ top: Number.isFinite(saved) ? saved : 0 })
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (route.kind !== 'quickStart' || route.step === 'resume') return
    const step = Math.max(0, Math.min(route.step, quickStartData.steps.length - 1))
    if (step !== quickProgress) {
      saveQuickStartStep(step)
      setQuickProgress(step)
    }
  }, [route, quickProgress])

  useEffect(() => { sessionStorage.setItem('avatar-mtg-guide:card-query', cardQuery) }, [cardQuery])
  useEffect(() => { sessionStorage.setItem('avatar-mtg-guide:glossary-query', glossaryQuery) }, [glossaryQuery])

  const restart = () => {
    resetQuickStart()
    setQuickProgress(0)
    navigate('/instrukcja/zuko/0')
  }

  let screen
  switch (route.kind) {
    case 'start':
      screen = <StartScreen onStart={() => navigate('/menu')} />
      break
    case 'menu':
      screen = <MenuScreen onNavigate={navigate} />
      break
    case 'instructions':
      screen = <InstructionsScreen progress={quickProgress} onBack={() => navigate('/menu')} onChooseDeck={() => navigate('/instrukcja/talia')} onRestart={restart} />
      break
    case 'deckSelect':
      screen = <DeckSelectScreen progress={quickProgress} onBack={() => navigate('/instrukcja')} onStart={() => navigate('/instrukcja/zuko/resume')} onRestart={restart} />
      break
    case 'quickStart': {
      const step = route.step === 'resume' ? quickProgress : Math.max(0, Math.min(route.step, quickStartData.steps.length - 1))
      screen = <QuickStartScreen data={quickStartData} stepIndex={step} onBack={() => navigate('/menu')} onRestart={restart} onStep={next => {
        saveQuickStartStep(next)
        setQuickProgress(next)
        navigate(`/instrukcja/zuko/${next}`)
      }} />
      break
    }
    case 'cards':
      screen = <CardsScreen query={cardQuery} results={cardResults} onQuery={setCardQuery} onBack={() => navigate('/menu')} onOpenCard={key => navigate(`/karty/${encodeURIComponent(key)}`)} />
      break
    case 'card': {
      const card = cardsByKey.get(route.printKey)
      screen = card
        ? <CardDetailScreen card={card} onBack={() => navigate('/karty')} onOpenTerm={setSheetTermId} getEnglishTerm={id => glossaryById.get(id)?.englishTerm} />
        : <NotFoundScreen onHome={() => navigate('/karty')} />
      break
    }
    case 'glossary':
      screen = <GlossaryScreen query={glossaryQuery} entries={glossaryResults} onQuery={setGlossaryQuery} onBack={() => navigate('/menu')} onOpen={id => navigate(`/slowniczek/${encodeURIComponent(id)}`)} />
      break
    case 'glossaryDetail': {
      const entry = glossaryById.get(route.termId)
      screen = entry
        ? <GlossaryDetailScreen entry={entry} entriesById={glossaryById} onBack={() => navigate('/slowniczek')} onOpenRelated={id => navigate(`/slowniczek/${encodeURIComponent(id)}`)} />
        : <NotFoundScreen onHome={() => navigate('/slowniczek')} />
      break
    }
    default:
      screen = <NotFoundScreen onHome={() => navigate('/menu')} />
  }

  const sheetEntry = sheetTermId ? glossaryById.get(sheetTermId) : undefined
  return <>
    {screen}
    {sheetEntry && <GlossarySheet entry={sheetEntry} onClose={() => setSheetTermId(null)} onOpenFull={() => {
      setSheetTermId(null)
      navigate(`/slowniczek/${encodeURIComponent(sheetEntry.id)}`)
    }} />}
  </>
}
