import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StartScreen } from './pages/StartScreen';
import { MainMenu } from './pages/MainMenu';
import { InstrukcjaPage } from './pages/InstrukcjaPage';
import { KartyPage } from './pages/KartyPage';
import { SlowniczekPage } from './pages/SlowniczekPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/instrukcja" element={<InstrukcjaPage />} />
        <Route path="/karty" element={<KartyPage />} />
        <Route path="/slowniczek" element={<SlowniczekPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
