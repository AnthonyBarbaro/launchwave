import Link from 'next/link';
import { Waves } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { services } from '@/data/services';
import { blogPosts } from '@/data/blog';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/15 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Link className="mb-4 flex items-center gap-2 font-bold" href="/">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Waves aria-hidden className="h-5 w-5" />
            </span>
            {siteConfig.brandName}
          </Link>
          <p className="max-w-sm text-sm leading-7 text-muted">{siteConfig.description}</p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">Services</h2>
          <ul className="grid gap-3 text-sm">
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link className="text-muted transition hover:text-accent" href={`/services/${service.slug}`}>
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">Resources</h2>
          <ul className="grid gap-3 text-sm">
            <li>
              <Link className="text-muted transition hover:text-accent" href="/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="text-muted transition hover:text-accent" href="/case-studies">
                Case Studies
              </Link>
            </li>
            {blogPosts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link className="text-muted transition hover:text-accent" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">Newsletter</h2>
          <p className="mb-4 text-sm leading-7 text-muted">Conversion, AI, SEO, and launch notes for growth-focused teams.</p>
          <NewsletterForm compact source="footer" />
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-border/15 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {siteConfig.brandName}. All rights reserved.</p>
        <div className="flex gap-5">
          <Link className="transition hover:text-accent" href="/contact">
            Contact
          </Link>
          <Link className="transition hover:text-accent" href="/privacy">
            Privacy
          </Link>
          <Link className="transition hover:text-accent" href="/terms">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
