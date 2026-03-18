import { Navigate, Route, Routes } from 'react-router-dom';
import { IntroPage } from './pages/IntroPage';
import { PortfolioPage } from './pages/PortfolioPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
