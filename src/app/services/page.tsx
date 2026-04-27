import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { services } from '@/data/services';
import { breadcrumbSchema, createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Website, AI, SEO, and Automation Services',
  description:
    'Explore LaunchWave Digital services for 48-hour website launches, custom development, AI chatbots, SEO content, analytics, ecommerce growth, and automation.',
  path: '/services'
});

export default function ServicesPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' }
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Section
        description="Pick the system your business needs now, then expand into SEO, AI, analytics, and automations as you grow."
        eyebrow="Services"
        title="Growth systems for modern business websites"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>
              <Card className="group h-full p-6 transition hover:-translate-y-1 hover:border-accent/45">
                <service.icon aria-hidden className="h-8 w-8 text-accent" />
                <h2 className="mt-5 text-xl font-bold">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Learn more
                  <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
