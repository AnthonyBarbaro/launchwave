'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ColorPalette } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

type Theme = 'dark' | 'light';

type ThemeContextValue = {
  theme: Theme;
  palette: ColorPalette;
  setTheme: (theme: Theme) => void;
  setPalette: (palette: ColorPalette) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = 'launchwave_theme';
const PALETTE_KEY = 'launchwave_palette';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [palette, setPaletteState] = useState<ColorPalette>('ocean');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_KEY) as Theme | null;
    const storedPalette = window.localStorage.getItem(PALETTE_KEY) as ColorPalette | null;
    const preferredLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    setThemeState(storedTheme || (preferredLight ? 'light' : 'dark'));
    setPaletteState(storedPalette || 'ocean');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('dark', theme === 'dark');
    root.classList.remove('palette-ocean', 'palette-purple', 'palette-emerald', 'palette-sunset', 'palette-cyan');
    root.classList.add(`palette-${palette}`);
  }, [theme, palette]);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    trackEvent('theme_changed', { theme: nextTheme });
  };

  const setPalette = (nextPalette: ColorPalette) => {
    setPaletteState(nextPalette);
    window.localStorage.setItem(PALETTE_KEY, nextPalette);
    trackEvent('color_scheme_changed', { palette: nextPalette });
  };

  const value = useMemo(
    () => ({
      theme,
      palette,
      setTheme,
      setPalette,
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark')
    }),
    [palette, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeSettings() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useThemeSettings must be used inside ThemeProvider.');
  return value;
}
