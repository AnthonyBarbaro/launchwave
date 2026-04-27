import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { DeferredChatbot } from '@/components/ai/DeferredChatbot';
import { ExitIntentCta } from '@/components/layout/ExitIntentCta';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyCta } from '@/components/layout/MobileStickyCta';
import { Navbar } from '@/components/layout/Navbar';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ColorWaveBackground } from '@/components/ui/ColorWaveBackground';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.brandName} | Websites, AI Lead Systems, SEO, and Automation`,
    template: `%s | ${siteConfig.brandName}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.brandName,
  alternates: {
    canonical: siteConfig.siteUrl
  },
  openGraph: {
    title: `${siteConfig.brandName} | Launch a Website That Gets Leads`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brandName} | Launch a Website That Gets Leads`,
    description: siteConfig.description
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080c12'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark palette-ocean" lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AnalyticsProvider />
          <ColorWaveBackground />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileStickyCta />
          <ExitIntentCta />
          <DeferredChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
