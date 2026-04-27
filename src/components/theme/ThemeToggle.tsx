'use client';

import { Moon, Sun } from 'lucide-react';
import { useThemeSettings } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeSettings();
  const isDark = theme === 'dark';

  return (
    <button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/25 bg-panel/70 text-foreground transition hover:border-accent/60 hover:text-accent"
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? <Sun aria-hidden className="h-4 w-4" /> : <Moon aria-hidden className="h-4 w-4" />}
    </button>
  );
}
