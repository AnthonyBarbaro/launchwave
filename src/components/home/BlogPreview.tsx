import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function BlogPreview() {
  return (
    <Section
      description="Practical notes on launches, conversion, AI, SEO, analytics, and growth systems."
      eyebrow="Blog"
      title="Latest growth playbooks"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {blogPosts.slice(0, 3).map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <Card as="article" className="group h-full p-6 transition hover:border-accent/45">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{post.category}</p>
              <h3 className="mt-4 text-xl font-bold">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{post.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Read article
                <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-2xl rounded-lg border border-accent/25 bg-accent/10 p-6 text-center">
        <h3 className="text-2xl font-bold">Free 48-Hour Website Launch Checklist</h3>
        <p className="mt-2 text-sm text-muted">Get a practical checklist for your next launch.</p>
        <div className="mt-5">
          <NewsletterForm source="blog_preview" />
        </div>
      </div>
    </Section>
  );
}
