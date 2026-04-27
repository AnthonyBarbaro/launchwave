'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function ColorWaveBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: ['-8%', '5%', '-8%'],
                y: ['-4%', '4%', '-4%'],
                scale: [1, 1.06, 1]
              }
        }
        className="absolute left-1/2 top-[-18rem] h-[42rem] w-[72rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgb(var(--gradient-start) / 0.72), transparent 42%), radial-gradient(circle at 68% 40%, rgb(var(--gradient-mid) / 0.45), transparent 38%), radial-gradient(circle at 50% 70%, rgb(var(--gradient-end) / 0.5), transparent 48%)'
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        animate={reducedMotion ? undefined : { x: ['12%', '-2%', '12%'], rotate: [0, 4, 0] }}
        className="absolute bottom-[-22rem] right-[-12rem] h-[44rem] w-[58rem] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'linear-gradient(135deg, rgb(var(--gradient-mid) / 0.42), rgb(var(--gradient-start) / 0.36), rgb(var(--gradient-end) / 0.28))'
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgb(var(--color-background)/0.62)_55%,rgb(var(--color-background)))]" />
    </div>
  );
}
