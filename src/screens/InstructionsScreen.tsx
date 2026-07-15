import { Content, Screen } from '../components/Screen'
import { TopBar } from '../components/TopBar'

interface Props {
  progress: number
  onBack: () => void
  onChooseDeck: () => void
  onRestart: () => void
}

export function InstructionsScreen({ progress, onBack, onChooseDeck, onRestart }: Props) {
  return (
    <Screen>
      <TopBar title="Instrukcja" onBack={onBack} />
      <Content>
        <section className="panel">
          <h2 className="question">Grasz pierwszy raz?</h2>
          <div className="menu-stack">
            <button className="choice-button" type="button" onClick={onChooseDeck}>Tak</button>
            <button className="choice-button disabled" type="button" disabled>Nie <span className="badge">Wkrótce</span></button>
          </div>
          <button className="secondary-button blue" type="button" onClick={onRestart}>
            {progress > 0 ? 'Zacznij Quick Start od nowa' : 'Zacznij od nowa'}
          </button>
        </section>
      </Content>
    </Screen>
  )
}
