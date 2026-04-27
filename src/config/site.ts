export const siteConfig = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || 'LaunchWave Digital',
  shortName: 'LaunchWave',
  tagline: 'Launch a conversion-ready website in less than 48 hours.',
  description:
    'We build websites, AI lead systems, automations, and SEO engines that help businesses get more leads and close faster.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.launchwavedigital.com',
  bookingUrl: '',
  contactEmail: 'hello@launchwavedigital.com',
  phone: '',
  address: {
    country: 'US'
  },
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'AI Systems', href: '/services/ai-chatbot-lead-qualification' },
    { label: 'SEO', href: '/services/seo-content-engine' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ],
  social: {
    linkedin: '',
    x: ''
  }
};

export type ColorPalette = 'ocean' | 'purple' | 'emerald' | 'sunset' | 'cyan';

export const colorPalettes: Array<{ id: ColorPalette; label: string; swatch: string }> = [
  { id: 'ocean', label: 'Ocean Blue', swatch: 'rgb(39 143 255)' },
  { id: 'purple', label: 'Electric Purple', swatch: 'rgb(169 87 255)' },
  { id: 'emerald', label: 'Emerald Green', swatch: 'rgb(28 190 128)' },
  { id: 'sunset', label: 'Sunset Orange', swatch: 'rgb(255 122 59)' },
  { id: 'cyan', label: 'Neon Cyan', swatch: 'rgb(20 221 255)' }
];
