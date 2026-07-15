import { Screen } from '../components/Screen'

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <Screen className="start-screen">
      <button className="start-button" type="button" onClick={onStart} aria-label="Rozpocznij">
        <img className="start-box" src="./assets/ui/box-cover-front.jpg" alt="Avatar: The Last Airbender Beginner Box" />
        <span className="start-prompt">Naciśnij, aby rozpocząć</span>
      </button>
    </Screen>
  )
}
