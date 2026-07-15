import { useNavigate } from 'react-router-dom';
import './MainMenu.css';

interface MenuButton {
  label: string;
  path: string;
  description: string;
}

const menuButtons: MenuButton[] = [
  {
    label: 'Instrukcja',
    path: '/instrukcja',
    description: 'Naucz się zasad gry',
  },
  {
    label: 'Karty',
    path: '/karty',
    description: 'Przeglądaj karty z setu',
  },
  {
    label: 'Słowniczek',
    path: '/slowniczek',
    description: 'Słownik terminów MTG',
  },
];

export function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="main-menu">
      <header className="main-menu__header">
        <div className="main-menu__emblem" aria-hidden="true">☯</div>
        <h1 className="main-menu__title">Avatar MTG</h1>
        <p className="main-menu__subtitle">Przewodnik</p>
      </header>
      <nav className="main-menu__nav" aria-label="Menu główne">
        {menuButtons.map((btn) => (
          <button
            key={btn.path}
            className="main-menu__button"
            onClick={() => navigate(btn.path)}
          >
            <span className="main-menu__button-label">{btn.label}</span>
            <span className="main-menu__button-desc">{btn.description}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
