interface TopBarProps {
  title: string
  onBack: () => void
  action?: { label: string; onClick: () => void }
}

export function TopBar({ title, onBack, action }: TopBarProps) {
  return (
    <header className="topbar">
      <button className="back-button" type="button" aria-label="Wróć" onClick={onBack}>‹</button>
      <h1>{title}</h1>
      {action ? <button className="topbar-action" type="button" onClick={action.onClick}>{action.label}</button> : <span className="topbar-spacer" />}
    </header>
  )
}
