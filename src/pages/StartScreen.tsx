import { useNavigate } from 'react-router-dom';
import './StartScreen.css';

export function StartScreen() {
  const navigate = useNavigate();

  function handleStart() {
    navigate('/menu');
  }

  return (
    <div className="start-screen" onClick={handleStart} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleStart()}>
      <div className="start-screen__inner">
        <div className="start-screen__emblem" aria-hidden="true">
          <span className="start-screen__emblem-symbol">☯</span>
        </div>
        <h1 className="start-screen__title">Avatar<br />MTG</h1>
        <p className="start-screen__subtitle">Przewodnik</p>
        <p className="start-screen__cta">Naciśnij, aby rozpocząć</p>
      </div>
    </div>
  );
}
