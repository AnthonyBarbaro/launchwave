import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

const steps = [
  { step: '01', title: 'Strategy Call', copy: 'Clarify your offer, audience, scope, timeline, and best launch path.' },
  { step: '02', title: 'Design + Copy', copy: 'Shape the page structure, message, proof, and conversion moments.' },
  { step: '03', title: 'Build + Automate', copy: 'Develop the static frontend, forms, AI flows, analytics events, and serverless endpoints.' },
  { step: '04', title: 'Launch + Track', copy: 'Deploy to S3 and CloudFront, verify events, and start improving from real behavior.' }
];

export function ProcessSection() {
  return (
    <Section
      description="Simple process. Fast launch. Measurable results."
      eyebrow="Process"
      id="process"
      title="From strategy to launch without the usual drag"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((item) => (
          <Card className="p-6" key={item.step}>
            <p className="text-sm font-bold text-accent">{item.step}</p>
            <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{item.copy}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
