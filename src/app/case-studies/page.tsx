import { CaseStudyPreview } from '@/components/home/CaseStudyPreview';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { breadcrumbSchema, createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Demo Case Studies and Sample Growth Models',
  description:
    'Explore demo case study models for local service businesses, ecommerce brands, and professional services firms.',
  path: '/case-studies'
});

export default function CaseStudiesPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Case Studies', href: '/case-studies' }
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Section
        description="These examples are labeled as demo scenarios and sample growth models. They show how the system can be assembled without pretending to be verified client results."
        eyebrow="Case studies"
        title="Demo models for website, AI, SEO, and analytics projects"
      >
        <div />
      </Section>
      <CaseStudyPreview />
    </>
  );
}
