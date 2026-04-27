import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
};

export function absoluteUrl(path = '/') {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export function createMetadata({
  title,
  description,
  path = '/',
  image = '/og-default.svg',
  type = 'website',
  publishedTime,
  tags
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const escapedBrand = siteConfig.brandName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const baseTitle = title.replace(new RegExp(`\\s*\\|\\s*${escapedBrand}$`), '');
  const fullTitle = title.includes(siteConfig.brandName) ? title : `${title} | ${siteConfig.brandName}`;

  return {
    title: baseTitle,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.brandName,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: `${siteConfig.brandName} website preview` }],
      locale: 'en_US',
      type,
      publishedTime,
      tags
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl(image)]
    }
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    address: {
      '@type': 'PostalAddress',
      addressCountry: siteConfig.address.country
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean)
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.siteUrl}/blog/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function serviceSchema(service: { title: string; description: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: siteConfig.siteUrl
    },
    url: absoluteUrl(`/services/${service.slug}`)
  };
}

export function blogPostingSchema(post: {
  title: string;
  seoDescription: string;
  slug: string;
  date: string;
  author: string;
  tags: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brandName
    },
    keywords: post.tags.join(', '),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`)
  };
}
