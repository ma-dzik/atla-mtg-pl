import { PageLayout } from '../components/PageLayout';
import './PlaceholderPage.css';

export function KartyPage() {
  return (
    <PageLayout title="Karty">
      <div className="placeholder-page">
        <p className="placeholder-page__info">
          Tutaj znajdziesz przeglądarkę kart z setu Avatar: The Last Airbender.
        </p>
        <p className="placeholder-page__coming-soon">Treść w przygotowaniu…</p>
      </div>
    </PageLayout>
  );
}
