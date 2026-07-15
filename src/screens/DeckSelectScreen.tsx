import { Content, Screen } from '../components/Screen'
import { TopBar } from '../components/TopBar'

interface Props {
  progress: number
  onBack: () => void
  onStart: () => void
  onRestart: () => void
}

export function DeckSelectScreen({ progress, onBack, onStart, onRestart }: Props) {
  return (
    <Screen>
      <TopBar title="Wybierz talię" onBack={onBack} />
      <Content>
        <div className="menu-stack">
          <button className="choice-button" type="button" onClick={onStart}>
            {progress > 0 ? 'Kontynuuj talią Zuko' : 'Rozpocznij talią Zuko'}
          </button>
          <button className="secondary-button blue" type="button" onClick={onRestart}>Zacznij od nowa</button>
          <button className="choice-button disabled" type="button" disabled>Aang <span className="badge">Wkrótce</span></button>
        </div>
      </Content>
    </Screen>
  )
}
