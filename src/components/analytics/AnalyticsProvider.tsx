'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { captureUtmParams } from '@/lib/analytics';

export function AnalyticsProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    captureUtmParams();
  }, []);

  if (!gaId) return null;

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
