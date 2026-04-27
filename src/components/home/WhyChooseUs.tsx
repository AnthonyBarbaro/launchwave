import { Bot, Rocket, Search, Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

const benefits = [
  {
    title: 'Speed',
    copy: 'Launch faster without sacrificing quality.',
    icon: Rocket
  },
  {
    title: 'Conversion',
    copy: 'Built around calls, forms, and qualified leads.',
    icon: Target
  },
  {
    title: 'Automation',
    copy: 'Stop manually chasing every inquiry.',
    icon: Bot
  },
  {
    title: 'SEO',
    copy: 'Built to be crawlable, structured, and scalable.',
    icon: Search
  }
];

export function WhyChooseUs() {
  return (
    <Section eyebrow="Why businesses choose us" title="Simple process. Fast launch. Measurable results.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <Card className="p-6" key={benefit.title}>
            <benefit.icon aria-hidden className="h-8 w-8 text-accent" />
            <h3 className="mt-5 text-xl font-bold">{benefit.title}</h3>
            <p className="mt-3 leading-7 text-muted">{benefit.copy}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
