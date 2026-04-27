import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { industries, getIndustryBySlug } from '@/data/industries';
import { services, getServiceBySlug } from '@/data/services';
import { breadcrumbSchema, createMetadata, faqSchema } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return createMetadata({
    title: industry.seoTitle,
    description: industry.seoDescription,
    path: `/industries/${industry.slug}`
  });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const recommended = industry.recommendedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Industries', href: '/services' },
    { name: industry.name, href: `/industries/${industry.slug}` }
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(industry.faqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Industry growth system</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">{industry.headline}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted">{industry.description}</p>
          <div className="mt-8">
            <Button href={siteConfig.bookingUrl || '/contact#contact-form'} location={`industry_${industry.slug}`}>
              Build My Growth System
            </Button>
          </div>
        </div>
      </section>

      <Section eyebrow="Benefits" title={`What ${industry.name.toLowerCase()} need from a website`}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {industry.benefits.map((benefit) => (
            <Card className="p-5" key={benefit}>
              <Check aria-hidden className="h-5 w-5 text-accent" />
              <h2 className="mt-4 font-bold">{benefit}</h2>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Recommended services" title="A practical stack for this market">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {recommended.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>
              <Card className="h-full p-5 transition hover:border-accent/45">
                <service.icon aria-hidden className="h-7 w-7 text-accent" />
                <h2 className="mt-4 text-lg font-bold">{service.shortTitle}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{service.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Process" title="Launch, qualify, track, improve">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {['Clarify the offer and audience', 'Build the conversion path', 'Add AI and analytics where useful', 'Use data to decide the next improvement'].map((step) => (
            <Card className="p-5" key={step}>
              <h2 className="font-bold">{step}</h2>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title={`Questions for ${industry.name.toLowerCase()}`}>
        <div className="mx-auto grid max-w-4xl gap-4">
          {industry.faqs.map((faq) => (
            <Card className="p-5" key={faq.question}>
              <h2 className="font-bold">{faq.question}</h2>
              <p className="mt-2 text-sm leading-7 text-muted">{faq.answer}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href={siteConfig.bookingUrl || '/contact#contact-form'} location={`industry_final_${industry.slug}`}>
            Start My 48-Hour Launch
          </Button>
        </div>
      </Section>

      <Section eyebrow="Explore services" title="Related growth systems">
        <div className="flex flex-wrap justify-center gap-3">
          {services.slice(0, 6).map((service) => (
            <Link className="rounded-full border border-border/25 px-4 py-2 text-sm text-muted transition hover:border-accent/60 hover:text-accent" href={`/services/${service.slug}`} key={service.slug}>
              {service.shortTitle}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
