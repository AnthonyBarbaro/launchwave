'use client';

import Link from 'next/link';
import { Menu, Waves, X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { ColorPalettePicker } from '@/components/theme/ColorPalettePicker';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/15 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link aria-label={`${siteConfig.brandName} home`} className="flex items-center gap-2 font-bold" href="/">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent shadow-glow">
            <Waves aria-hidden className="h-5 w-5" />
          </span>
          <span>{siteConfig.brandName}</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link className="text-sm font-medium text-muted transition hover:text-foreground" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ColorPalettePicker />
          <Button className="hidden lg:inline-flex" href={siteConfig.bookingUrl || '/contact#contact-form'} location="navbar">
            Launch in 48 Hours
          </Button>
          <button
            aria-expanded={open}
            aria-label="Toggle mobile menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/25 bg-panel/70 transition hover:border-accent/60 lg:hidden"
            onClick={() => setOpen((current) => !current)}
            type="button"
          >
            {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <MobileMenu onClose={() => setOpen(false)} open={open} />
    </header>
  );
}
