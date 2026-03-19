import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';
export type BgVariant = 'none' | 'waves-h' | 'waves-d' | 'flow' | 'radial' | 'circles';

export const BG_VARIANTS: BgVariant[] = ['none', 'waves-h', 'waves-d', 'flow', 'radial', 'circles'];

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  bgVariant: BgVariant;
  cycleBgVariant: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  bgVariant: 'none',
  cycleBgVariant: () => {},
});

export const useTheme = () => useContext(ThemeContext);
