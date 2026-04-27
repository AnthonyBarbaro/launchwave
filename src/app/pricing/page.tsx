import { PricingPreview } from '@/components/home/PricingPreview';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Website, SEO, AI, and Automation Packages',
  description:
    'Compare Starter Launch, Growth System, and Scale Engine packages for websites, AI lead qualification, SEO pages, automations, and analytics.',
  path: '/pricing'
});

export default function PricingPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' }
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <PricingPreview />
    </>
  );
}
