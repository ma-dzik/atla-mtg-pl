import { PageLayout } from '../components/PageLayout';
import './PlaceholderPage.css';

export function SlowniczekPage() {
  return (
    <PageLayout title="Słowniczek">
      <div className="placeholder-page">
        <p className="placeholder-page__info">
          Tutaj znajdziesz słownik terminów używanych w Magic: The Gathering
          przetłumaczonych na język polski.
        </p>
        <p className="placeholder-page__coming-soon">Treść w przygotowaniu…</p>
      </div>
    </PageLayout>
  );
}
