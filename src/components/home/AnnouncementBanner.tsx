'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const KEY = 'launchwave_announcement_dismissed';

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(KEY) !== 'true');
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      className="relative z-30 border-b border-accent/20 bg-accent/10 px-4 py-2 text-sm text-foreground"
      initial={{ y: -16, opacity: 0 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 pr-10 text-center">
        <span>New: Launch a conversion-ready website in less than 48 hours.</span>
        <Link className="font-semibold text-accent underline-offset-4 hover:underline" href="/pricing">
          See packages
        </Link>
      </div>
      <button
        aria-label="Dismiss announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition hover:bg-accent/10 hover:text-foreground"
        onClick={() => {
          window.localStorage.setItem(KEY, 'true');
          setVisible(false);
        }}
        type="button"
      >
        <X aria-hidden className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
