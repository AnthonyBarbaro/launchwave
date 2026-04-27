import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const cases = [
  {
    label: 'Example outcome',
    title: 'Local service business',
    challenge: 'Visitors were not sure which service to request.',
    solution: 'A focused service page structure, quote CTA, AI intake, and lead source tracking.',
    outcome: 'Sample model: more qualified quote requests and faster follow-up.'
  },
  {
    label: 'Sample growth model',
    title: 'Ecommerce brand',
    challenge: 'Campaign traffic needed clearer product education and support.',
    solution: 'Landing pages, AI purchase guidance, analytics events, and SEO content planning.',
    outcome: 'Sample model: better buyer confidence and clearer revenue attribution.'
  },
  {
    label: 'Demo case study',
    title: 'Professional services firm',
    challenge: 'Complex offers made it hard for prospects to choose the next step.',
    solution: 'Authority pages, consultation CTAs, lead qualification, and conversion tracking.',
    outcome: 'Sample model: cleaner consultation requests and stronger sales context.'
  }
];

export function CaseStudyPreview() {
  return (
    <Section
      description="These are demo scenarios and sample growth models, not claimed client results."
      eyebrow="Case studies"
      title="How growth systems come together"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {cases.map((study) => (
          <Card as="article" className="p-6" key={study.title}>
            <Badge>{study.label}</Badge>
            <h3 className="mt-5 text-2xl font-bold">{study.title}</h3>
            <div className="mt-5 grid gap-4 text-sm leading-7 text-muted">
              <p><strong className="text-foreground">Challenge:</strong> {study.challenge}</p>
              <p><strong className="text-foreground">Solution:</strong> {study.solution}</p>
              <p><strong className="text-foreground">Estimated outcome:</strong> {study.outcome}</p>
            </div>
            <Button className="mt-6" href="/case-studies" icon={<ArrowRight aria-hidden className="h-4 w-4" />} location="case_preview" variant="secondary">
              View Models
            </Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}
