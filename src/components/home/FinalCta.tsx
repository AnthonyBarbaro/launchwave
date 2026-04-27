import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

export function FinalCta() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-lg border border-accent/30 bg-accent/10 p-8 text-center shadow-glow sm:p-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Your website should be more than a digital business card.</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted">
          Launch a site that captures leads, qualifies prospects, tracks conversions, and helps your business grow.
        </p>
        <div className="mt-8">
          <Button href={siteConfig.bookingUrl || '/contact#contact-form'} location="final_cta">
            Start My 48-Hour Launch
          </Button>
        </div>
      </div>
    </section>
  );
}
