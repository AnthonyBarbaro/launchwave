import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { services, getServiceBySlug } from '@/data/services';
import { breadcrumbSchema, createMetadata, faqSchema, serviceSchema } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return createMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: service.shortTitle, href: `/services/${service.slug}` }
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), serviceSchema(service), faqSchema(service.faqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Service</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{service.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.bookingUrl || '/contact#contact-form'} location={`service_${service.slug}`}>
                Book a Free Strategy Call
              </Button>
              <Button href="/pricing" location={`service_pricing_${service.slug}`} variant="secondary">
                See Packages
              </Button>
            </div>
          </div>
          <Card className="p-6">
            <service.icon aria-hidden className="h-10 w-10 text-accent" />
            <h2 className="mt-5 text-2xl font-bold">What this helps you do</h2>
            <ul className="mt-5 grid gap-4 text-sm leading-7 text-muted">
              {service.benefits.map((benefit) => (
                <li className="flex gap-3" key={benefit}>
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <Section eyebrow="Deliverables" title="Built around outcomes, not decoration">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.map((deliverable) => (
            <Card className="p-5" key={deliverable}>
              <h3 className="font-bold">{deliverable}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">A practical piece of the system that supports launch speed, lead capture, trust, and measurement.</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Recommended for" title="Best fit">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {service.recommendedFor.map((item) => (
            <Card className="p-5 text-center font-semibold" key={item}>
              {item}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title={`Questions about ${service.shortTitle}`}>
        <div className="mx-auto grid max-w-4xl gap-4">
          {service.faqs.map((faq) => (
            <Card className="p-5" key={faq.question}>
              <h3 className="font-bold">{faq.question}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Next step" title="Ready to turn this into a launch plan?">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-8 text-muted">Tell us what you are building, what needs to improve, and how fast you want to move.</p>
          <div className="mt-8">
            <Button href={siteConfig.bookingUrl || '/contact#contact-form'} location={`service_final_${service.slug}`}>
              Start My 48-Hour Launch
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted">
            {services
              .filter((item) => item.slug !== service.slug)
              .slice(0, 4)
              .map((item) => (
                <Link className="inline-flex items-center gap-1 transition hover:text-accent" href={`/services/${item.slug}`} key={item.slug}>
                  {item.shortTitle}
                  <ChevronRight aria-hidden className="h-4 w-4" />
                </Link>
              ))}
          </div>
        </div>
      </Section>
    </>
  );
}
