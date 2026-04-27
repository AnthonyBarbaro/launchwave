import { Bot, Gauge, Search, Server, Zap } from 'lucide-react';

const items = [
  { label: 'Fast launches', icon: Zap },
  { label: 'SEO-ready builds', icon: Search },
  { label: 'AI-powered lead capture', icon: Bot },
  { label: 'Conversion tracking', icon: Gauge },
  { label: 'Serverless scalable infrastructure', icon: Server }
];

export function TrustBar() {
  return (
    <section className="border-y border-border/15 bg-panel/30 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div className="flex items-center gap-3 text-sm font-medium text-muted" key={item.label}>
            <item.icon aria-hidden className="h-5 w-5 text-accent" />
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}
