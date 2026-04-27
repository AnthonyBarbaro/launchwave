import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

const examples = [
  { label: 'Website design for local service businesses', href: '/industries/local-service-businesses' },
  { label: 'AI chatbot for ecommerce stores', href: '/industries/ecommerce-brands' },
  { label: 'SEO pages for contractors', href: '/industries/contractors' },
  { label: 'Website launch for startups', href: '/industries/startups' }
];

export function SeoPreview() {
  return (
    <Section
      description="We create scalable service and industry pages so your site can rank for the searches your customers are already making."
      eyebrow="Programmatic SEO"
      title="Structured pages for high-intent searches"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {examples.map((example) => (
          <Link href={example.href} key={example.href}>
            <Card className="group flex items-center justify-between gap-4 p-5 transition hover:border-accent/45">
              <span className="font-semibold">{example.label}</span>
              <ArrowRight aria-hidden className="h-5 w-5 text-accent transition group-hover:translate-x-1" />
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
