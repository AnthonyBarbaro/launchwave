'use client';

import { Check, Palette } from 'lucide-react';
import { colorPalettes } from '@/config/site';
import { useThemeSettings } from './ThemeProvider';

export function ColorPalettePicker() {
  const { palette, setPalette } = useThemeSettings();

  return (
    <div className="group relative">
      <button
        aria-label="Choose accent color palette"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/25 bg-panel/70 text-foreground transition hover:border-accent/60 hover:text-accent"
        type="button"
      >
        <Palette aria-hidden className="h-4 w-4" />
      </button>
      <div className="invisible absolute right-0 top-12 z-50 w-64 translate-y-2 rounded-lg border border-border/25 bg-panel/95 p-3 opacity-0 shadow-2xl backdrop-blur-xl transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Color palette</p>
        <div className="grid gap-1">
          {colorPalettes.map((option) => (
            <button
              aria-pressed={palette === option.id}
              className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition hover:bg-accent/10"
              key={option.id}
              onClick={() => setPalette(option.id)}
              type="button"
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-4 w-4 rounded-full border border-white/30"
                  style={{ backgroundColor: option.swatch }}
                />
                {option.label}
              </span>
              {palette === option.id && <Check aria-hidden className="h-4 w-4 text-accent" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
