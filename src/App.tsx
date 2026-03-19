import { Navigate, Route, Routes } from 'react-router-dom';
import { DarkBackground } from './components/shared/DarkBackground';
import { useTheme } from './contexts/useTheme';
import { IntroPage } from './pages/IntroPage';
import { PortfolioPage } from './pages/PortfolioPage';

export default function App() {
  const { theme, bgVariant } = useTheme();

  return (
    <>
      {theme === 'dark' && bgVariant !== 'none' && <DarkBackground variant={bgVariant} />}
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
