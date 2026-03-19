import { useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { BG_VARIANTS, ThemeContext, type BgVariant, type Theme } from './useTheme';

function resolveInitialTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
}

function resolveInitialBgVariant(): BgVariant {
  const stored = localStorage.getItem('bgVariant');
  if (stored === 'waves-h' || stored === 'waves-d') return stored;
  return 'none';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const resolved = resolveInitialTheme();
    document.documentElement.setAttribute('data-theme', resolved);
    return resolved;
  });

  const [bgVariant, setBgVariant] = useState<BgVariant>(resolveInitialBgVariant);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useLayoutEffect(() => {
    localStorage.setItem('bgVariant', bgVariant);
  }, [bgVariant]);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  };

  const cycleBgVariant = () => {
    setBgVariant((current) => {
      const idx = BG_VARIANTS.indexOf(current);
      return BG_VARIANTS[(idx + 1) % BG_VARIANTS.length];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, bgVariant, cycleBgVariant }}>
      {children}
    </ThemeContext.Provider>
  );
}
