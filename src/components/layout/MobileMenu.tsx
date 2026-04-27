'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="border-t border-border/20 bg-background/96 px-4 py-4 shadow-2xl backdrop-blur-xl lg:hidden"
      initial={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.18 }}
    >
      <div className="grid gap-2">
        {siteConfig.nav.map((item) => (
          <Link
            className="rounded-md px-3 py-3 text-sm font-semibold text-muted transition hover:bg-accent/10 hover:text-foreground"
            href={item.href}
            key={item.href}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
        <Button
          className="mt-2 w-full"
          href={siteConfig.bookingUrl || '/contact#contact-form'}
          location="mobile_menu"
        >
          Launch in 48 Hours
        </Button>
      </div>
    </motion.div>
  );
}
