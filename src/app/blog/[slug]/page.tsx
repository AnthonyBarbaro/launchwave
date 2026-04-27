import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { BlogViewTracker } from '@/components/analytics/BlogViewTracker';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { breadcrumbSchema, blogPostingSchema, createMetadata, faqSchema } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return createMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    tags: post.tags
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` }
  ];

  return (
    <>
      <BlogViewTracker slug={post.slug} />
      <JsonLd data={[breadcrumbSchema(breadcrumbs), blogPostingSchema(post), ...(post.faq ? [faqSchema(post.faq)] : [])]} />
      <Breadcrumbs items={breadcrumbs} />
      <article className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_0.28fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{post.category}</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">{post.title}</h1>
            <p className="mt-6 text-lg leading-8 text-muted">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted">
              <span>{post.author}</span>
              <span aria-hidden>•</span>
              <time dateTime={post.date}>{new Date(`${post.date}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
              <span aria-hidden>•</span>
              <span>{post.readingTime}</span>
            </div>

            <div className="mt-12 space-y-12">
              {post.content.map((section, index) => (
                <section id={toId(section.heading)} key={section.heading}>
                  <h2 className="text-3xl font-bold">{section.heading}</h2>
                  <div className="mt-5 space-y-5 text-lg leading-8 text-muted">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {index === 1 && (
                    <Card className="mt-8 p-6">
                      <h3 className="text-2xl font-bold">Want this handled for your business?</h3>
                      <p className="mt-3 text-muted">LaunchWave can plan, build, track, and improve the system with you.</p>
                      <Button className="mt-5" href="/contact#contact-form" location={`blog_inline_${post.slug}`}>
                        Book a Free Strategy Call
                      </Button>
                    </Card>
                  )}
                </section>
              ))}
            </div>

            {post.faq && (
              <section className="mt-12">
                <h2 className="text-3xl font-bold">Article FAQ</h2>
                <div className="mt-5 grid gap-4">
                  {post.faq.map((faq) => (
                    <Card className="p-5" key={faq.question}>
                      <h3 className="font-bold">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{faq.answer}</p>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <h2 className="font-bold">Table of contents</h2>
              <nav className="mt-4 grid gap-3 text-sm text-muted">
                {post.content.map((section) => (
                  <a className="transition hover:text-accent" href={`#${toId(section.heading)}`} key={section.heading}>
                    {section.heading}
                  </a>
                ))}
              </nav>
            </Card>
            <Card className="p-5">
              <h2 className="font-bold">Free launch checklist</h2>
              <p className="mt-2 text-sm leading-7 text-muted">Get the essentials for a faster, cleaner website launch.</p>
              <div className="mt-4">
                <NewsletterForm compact source={`blog_article_${post.slug}`} />
              </div>
            </Card>
          </aside>
        </div>
      </article>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Related posts</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {related.map((item) => (
              <Link href={`/blog/${item.slug}`} key={item.slug}>
                <Card className="group h-full p-5 transition hover:border-accent/45">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{item.category}</p>
                  <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Read next
                    <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function toId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
