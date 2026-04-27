'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { formatCurrency, formatNumber } from '@/lib/format';

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  currency?: boolean;
};

export function AnimatedCounter({ value, prefix = '', suffix = '', currency }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!inView || reducedMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const frames = 48;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / frames, 3);
      setDisplay(Math.round(value * progress));
      if (frame >= frames) window.clearInterval(timer);
    }, 20);

    return () => window.clearInterval(timer);
  }, [inView, reducedMotion, value]);

  const formatted = useMemo(() => {
    if (currency) return formatCurrency(display);
    return `${prefix}${formatNumber(display)}${suffix}`;
  }, [currency, display, prefix, suffix]);

  return <span ref={ref}>{formatted}</span>;
}
