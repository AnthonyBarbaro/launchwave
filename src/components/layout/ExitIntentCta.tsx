'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

const KEY = 'launchwave_exit_cta_seen';

export function ExitIntentCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return;
    if (window.sessionStorage.getItem(KEY)) return;

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        window.sessionStorage.setItem(KEY, 'true');
        setVisible(true);
      }
    };

    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 hidden items-center justify-center bg-black/55 p-4 backdrop-blur-sm md:flex"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.div
            animate={{ scale: 1, y: 0 }}
            className="relative w-full max-w-lg rounded-lg border border-border/25 bg-panel p-8 shadow-2xl"
            exit={{ scale: 0.96, y: 12 }}
            initial={{ scale: 0.96, y: 12 }}
          >
            <button
              aria-label="Close launch help offer"
              className="absolute right-4 top-4 rounded-full p-2 text-muted transition hover:bg-accent/10 hover:text-foreground"
              onClick={() => setVisible(false)}
              type="button"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">Before you go</p>
            <h2 className="text-3xl font-bold">Want help launching faster?</h2>
            <p className="mt-4 text-muted">
              Get a focused launch plan for your website, AI lead capture, SEO foundation, and conversion tracking.
            </p>
            <div className="mt-6">
              <Button href={siteConfig.bookingUrl || '/contact#contact-form'} location="exit_intent">
                Start My 48-Hour Launch
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
