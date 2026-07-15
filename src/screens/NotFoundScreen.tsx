import { Content, Screen } from '../components/Screen'

export function NotFoundScreen({ onHome }: { onHome: () => void }) {
  return <Screen><Content><div className="panel"><h1>Nie znaleziono ekranu</h1><button className="secondary-button blue" type="button" onClick={onHome}>Wróć do menu</button></div></Content></Screen>
}
