import { Section } from '@/components/ui/Section';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Terms of Use',
  description: 'Terms of use for LaunchWave Digital website content, examples, estimates, and lead forms.',
  path: '/terms'
});

export default function TermsPage() {
  return (
    <Section eyebrow="Terms" title="Terms of Use">
      <div className="mx-auto max-w-3xl space-y-8 text-muted">
        <p>
          This website provides general information about website design, AI lead systems, automation, SEO, analytics, and marketing services. Examples, calculator outputs, case study models, and estimated outcomes are illustrative only and are not guarantees of performance.
        </p>
        <p>
          Project timelines, deliverables, and pricing depend on scope, content readiness, approvals, integrations, and technical requirements. A 48-hour launch path applies to focused projects with clear scope and ready inputs.
        </p>
        <p>
          You agree not to submit spam, malicious content, confidential secrets, or unlawful material through forms or chatbot interactions. We may reject submissions that appear abusive, automated, or unrelated to legitimate project inquiries.
        </p>
        <p>
          All website content, design, and code examples are provided as-is unless a separate written agreement states otherwise.
        </p>
      </div>
    </Section>
  );
}
