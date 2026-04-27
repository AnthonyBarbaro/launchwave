'use client';

import { Calendar } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/20 bg-background/90 p-3 backdrop-blur-xl sm:hidden">
      <Button
        className="w-full"
        href={siteConfig.bookingUrl || '/contact#contact-form'}
        icon={<Calendar aria-hidden className="h-4 w-4" />}
        location="mobile_sticky"
      >
        Book a Call
      </Button>
    </div>
  );
}
