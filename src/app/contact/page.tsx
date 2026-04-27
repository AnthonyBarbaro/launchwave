import { Mail, MessageSquare, Timer } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Card } from '@/components/ui/Card';
import { breadcrumbSchema, createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Contact LaunchWave Digital',
  description:
    'Tell LaunchWave Digital about your website, AI lead system, SEO, automation, analytics, or 48-hour launch project.',
  path: '/contact'
});

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Contact</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">Tell us what you want to launch or improve.</h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Share the project goals, timeline, budget range, and what would make this website or growth system successful.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Timer, title: 'Fast launch path', copy: 'Focused sites can move toward launch in less than 48 hours.' },
                { icon: MessageSquare, title: 'Clear recommendation', copy: 'We will recommend the best package or next step based on your goals.' },
                { icon: Mail, title: 'Qualified follow-up', copy: 'Your details help us respond with useful context, not generic questions.' }
              ].map((item) => (
                <Card className="flex gap-4 p-5" key={item.title}>
                  <item.icon aria-hidden className="h-6 w-6 shrink-0 text-accent" />
                  <div>
                    <h2 className="font-bold">{item.title}</h2>
                    <p className="mt-1 text-sm leading-7 text-muted">{item.copy}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
