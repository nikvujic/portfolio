import { useEffect, useState } from 'react';

import { Content } from './components/content/Content';
import { IntroContent } from './components/intro/IntroContent';
import { ResetIntroButton } from './components/widgets/ResetIntroButton';

const INTRO_SEEN_STORAGE_KEY = 'intro-animation-seen';

function App() {
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(INTRO_SEEN_STORAGE_KEY) === 'true';
  });
  const [introComplete, setIntroComplete] = useState(hasSeenIntro);
  const [introRunId, setIntroRunId] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!hasSeenIntro) {
      window.localStorage.setItem(INTRO_SEEN_STORAGE_KEY, 'true');
    }
  }, [hasSeenIntro]);

  const handleIntroComplete = () => {
    setHasSeenIntro(true);
    setIntroComplete(true);
  };

  const handleResetIntro = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(INTRO_SEEN_STORAGE_KEY);
    }

    setHasSeenIntro(false);
    setIntroComplete(false);
    setIntroRunId((current) => current + 1);
  };

  return (
    <main className="relative flex flex-col">
      <ResetIntroButton onReset={handleResetIntro} />
      <IntroContent
        key={introRunId}
        skipAnimation={hasSeenIntro}
        onComplete={handleIntroComplete}
      />
      <Content visible={introComplete} />
    </main>
  );
}

export default App;
