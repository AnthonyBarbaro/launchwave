import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { blogPosts } from '../src/data/blog';
import { industries } from '../src/data/industries';
import { services } from '../src/data/services';
import { siteConfig } from '../src/config/site';

const publicDir = join(process.cwd(), 'public');
mkdirSync(publicDir, { recursive: true });

const siteUrl = siteConfig.siteUrl.replace(/\/$/, '');

const staticRoutes = ['/', '/services', '/blog', '/pricing', '/case-studies', '/contact', '/privacy', '/terms'];
const serviceRoutes = services.map((service) => `/services/${service.slug}`);
const industryRoutes = industries.map((industry) => `/industries/${industry.slug}`);
const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

const allRoutes = [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...blogRoutes];

function absolute(path: string) {
  return `${siteUrl}${path === '/' ? '' : path}`;
}

function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${xmlEscape(absolute(route))}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.includes('/blog/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/blog/') ? '0.7' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${absolute('/sitemap.xml')}
`;

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(siteConfig.brandName)} Blog</title>
    <link>${xmlEscape(absolute('/blog'))}</link>
    <description>${xmlEscape(siteConfig.description)}</description>
    <language>en-us</language>
    ${blogPosts
      .map(
        (post) => `<item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(absolute(`/blog/${post.slug}`))}</link>
      <guid>${xmlEscape(absolute(`/blog/${post.slug}`))}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${xmlEscape(post.excerpt)}</description>
    </item>`
      )
      .join('\n    ')}
  </channel>
</rss>
`;

const llms = `# ${siteConfig.brandName}

${siteConfig.description}

## Core Positioning

${siteConfig.tagline}

## Key Pages

${allRoutes.map((route) => `- ${absolute(route)}`).join('\n')}

## Services

${services.map((service) => `- ${service.title}: ${service.description}`).join('\n')}

## Blog

${blogPosts.map((post) => `- ${post.title}: ${post.excerpt}`).join('\n')}
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
writeFileSync(join(publicDir, 'robots.txt'), robots);
writeFileSync(join(publicDir, 'feed.xml'), feed);
writeFileSync(join(publicDir, 'llms.txt'), llms);

console.log(`Generated SEO files for ${allRoutes.length} routes.`);
