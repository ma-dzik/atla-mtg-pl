import { useNavigate } from 'react-router-dom';
import './BackButton.css';

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = '← Menu główne' }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className="back-button"
      onClick={() => navigate('/menu')}
      aria-label="Powrót do menu głównego"
    >
      {label}
    </button>
  );
}
