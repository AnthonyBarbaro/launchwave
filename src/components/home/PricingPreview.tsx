import { Check } from 'lucide-react';
import { pricingConfig } from '@/config/pricing';
import { siteConfig } from '@/config/site';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function PricingPreview() {
  return (
    <Section
      description="Packages are configurable. Use starting prices when you want public pricing, or keep pricing call-based."
      eyebrow="Packages"
      title="Choose the right launch path"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {pricingConfig.packages.map((item) => (
          <Card
            className={`relative p-6 ${item.featured ? 'border-accent/50 shadow-glow' : ''}`}
            key={item.name}
          >
            {item.featured && (
              <span className="absolute right-5 top-5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">Popular</span>
            )}
            <h3 className="text-2xl font-bold">{item.name}</h3>
            <p className="mt-2 text-sm text-muted">{item.bestFor}</p>
            <p className="mt-5 text-3xl font-bold">
              {pricingConfig.showPrices ? `Starting at ${item.startingAt}` : 'Starting at $___'}
            </p>
            <p className="mt-4 leading-7 text-muted">{item.description}</p>
            <ul className="mt-6 grid gap-3 text-sm text-muted">
              {item.features.map((feature) => (
                <li className="flex gap-2" key={feature}>
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-7 w-full" href={siteConfig.bookingUrl || '/contact#contact-form'} location={`pricing_${item.slug}`}>
              {item.cta}
            </Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}
