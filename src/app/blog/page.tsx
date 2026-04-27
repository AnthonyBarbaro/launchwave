import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { blogPosts } from '@/data/blog';
import { breadcrumbSchema, createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Growth Marketing Blog',
  description:
    'Articles about 48-hour website launches, AI lead qualification, programmatic SEO, conversion tracking, and analytics.',
  path: '/blog'
});

export default function BlogPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Section
        description="Practical playbooks for launching faster, qualifying leads, improving conversions, and scaling search traffic."
        eyebrow="Blog"
        title="Growth systems, clearly explained"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <Card as="article" className="group h-full p-6 transition hover:-translate-y-1 hover:border-accent/45">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{post.category}</p>
                <h2 className="mt-4 text-2xl font-bold">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted">
                  <span>{post.readingTime}</span>
                  <span>{new Date(`${post.date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Read article
                  <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-2xl rounded-lg border border-accent/25 bg-accent/10 p-6 text-center">
          <h2 className="text-2xl font-bold">Get the 48-hour launch checklist</h2>
          <p className="mt-2 text-sm text-muted">A short, useful checklist for websites that need to launch cleanly.</p>
          <div className="mt-5">
            <NewsletterForm source="blog_index" />
          </div>
        </div>
      </Section>
    </>
  );
}
