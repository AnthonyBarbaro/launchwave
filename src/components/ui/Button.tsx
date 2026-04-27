'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { trackCtaClick } from '@/lib/analytics';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  location?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
};

const variantClasses = {
  primary:
    'bg-accent text-white shadow-glow hover:bg-accent/90 border border-accent/70',
  secondary:
    'bg-panel/70 text-foreground border border-border/25 hover:border-accent/60 hover:bg-accent/10',
  ghost:
    'bg-transparent text-foreground border border-transparent hover:bg-accent/10 hover:border-accent/30'
};

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  location = 'unknown',
  icon,
  type = 'button',
  disabled,
  ariaLabel
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {icon ?? <ArrowRight aria-hidden className="h-4 w-4" />}
    </>
  );

  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60 ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <motion.span whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="inline-flex">
        <Link
          aria-label={ariaLabel}
          className={classes}
          href={href}
          onClick={() => trackCtaClick(String(children), location)}
        >
          {content}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      aria-label={ariaLabel}
      className={classes}
      disabled={disabled}
      onClick={() => {
        trackCtaClick(String(children), location);
        onClick?.();
      }}
      type={type}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
