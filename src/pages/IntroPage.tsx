import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IntroContent } from '../components/intro/IntroContent';
import { useHasBeenVisible } from '../hooks/useHasBeenVisible';

const INTRO_SEEN_KEY = 'intro-animation-seen';

export function IntroPage() {
  const navigate = useNavigate();
  const visible = useHasBeenVisible();

  useEffect(() => {
    if (localStorage.getItem(INTRO_SEEN_KEY)) {
      navigate('/portfolio', { replace: true });
    }
  }, [navigate]);

  const handleNavigate = (sectionId: string) => {
    localStorage.setItem(INTRO_SEEN_KEY, 'true');
    navigate('/portfolio', { state: { section: sectionId } });
  };

  if (!visible) return null;
  return <IntroContent onNavigate={handleNavigate} />;
}
