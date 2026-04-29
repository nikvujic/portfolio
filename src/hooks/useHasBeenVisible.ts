import { useEffect, useState } from 'react';

export function useHasBeenVisible(): boolean {
  const [hasBeenVisible, setHasBeenVisible] = useState(
    () => typeof document === 'undefined' || document.visibilityState === 'visible',
  );

  useEffect(() => {
    if (hasBeenVisible) return;
    const onChange = () => {
      if (document.visibilityState === 'visible') setHasBeenVisible(true);
    };
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, [hasBeenVisible]);

  return hasBeenVisible;
}
