import { Content, Screen } from '../components/Screen'

interface MenuScreenProps { onNavigate: (path: string) => void }

export function MenuScreen({ onNavigate }: MenuScreenProps) {
  return (
    <Screen>
      <Content>
        <img className="hero-aang" src="./assets/ui/aang-art.jpg" alt="Aang ze strzałką na czole" />
        <div className="brand">Avatar MTG Guide</div>
        <div className="subtitle">mobilny przewodnik do grania po polsku</div>
        <nav className="menu-stack" aria-label="Menu główne">
          <button className="menu-button" type="button" onClick={() => onNavigate('/instrukcja')}>Instrukcja</button>
          <button className="menu-button" type="button" onClick={() => onNavigate('/karty')}>Karty</button>
          <button className="menu-button" type="button" onClick={() => onNavigate('/slowniczek')}>Słowniczek</button>
        </nav>
      </Content>
    </Screen>
  )
}
