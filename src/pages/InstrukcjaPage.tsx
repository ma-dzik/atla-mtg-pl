import { PageLayout } from '../components/PageLayout';
import './PlaceholderPage.css';

export function InstrukcjaPage() {
  return (
    <PageLayout title="Instrukcja">
      <div className="placeholder-page">
        <p className="placeholder-page__info">
          Tutaj znajdziesz przewodnik po zasadach gry Magic: The Gathering
          w kontekście setu Avatar.
        </p>
        <p className="placeholder-page__coming-soon">Treść w przygotowaniu…</p>
      </div>
    </PageLayout>
  );
}
