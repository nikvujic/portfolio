import { useState } from 'react';

import { Content } from './components/Content';
import { IntroContent } from './components/IntroContent';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="flex flex-col">
      <IntroContent onComplete={() => setIntroComplete(true)} />
      <Content visible={introComplete} />
    </main>
  );
}

export default App;