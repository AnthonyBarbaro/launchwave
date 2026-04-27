import {
  BarChart3,
  Bot,
  LineChart,
  LucideIcon,
  Rocket,
  Search,
  ShoppingCart,
  Sparkles,
  Workflow
} from 'lucide-react';

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  deliverables: string[];
  recommendedFor: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const services: Service[] = [
  {
    slug: '48-hour-website-launch',
    title: '48-Hour Website Launch',
    shortTitle: '48-Hour Launch',
    seoTitle: '48-Hour Website Launch Services | LaunchWave Digital',
    seoDescription:
      'Launch a conversion-ready landing page or business website fast with strategy, copy, design, contact forms, SEO basics, and analytics.',
    description:
      'Get a polished, conversion-ready website live quickly without skipping the essentials that help visitors take action.',
    icon: Rocket,
    benefits: [
      'Move from idea to live site in days, not months.',
      'Focus the first launch around calls, forms, and measurable action.',
      'Start with a clean foundation that can expand into SEO, AI, and automation.'
    ],
    deliverables: ['Launch strategy', 'Conversion-focused page structure', 'Responsive build', 'Contact form', 'SEO metadata', 'Analytics baseline'],
    recommendedFor: ['New businesses', 'Service providers', 'Campaign launches', 'Founders validating an offer'],
    faqs: [
      {
        question: 'What can launch in 48 hours?',
        answer:
          'A focused landing page or compact website can launch in 48 hours when content, offer, and approvals are ready.'
      },
      {
        question: 'Can it be expanded later?',
        answer:
          'Yes. We build the foundation so service pages, blog content, AI chat, analytics, and automations can be added cleanly.'
      }
    ]
  },
  {
    slug: 'custom-website-development',
    title: 'Custom Website Development',
    shortTitle: 'Custom Websites',
    seoTitle: 'Custom Website Development for Growth-Focused Businesses',
    seoDescription:
      'Custom websites built for speed, trust, conversion, SEO, analytics, and long-term growth systems.',
    description:
      'A custom website built around your offer, sales process, customer journey, and measurable business outcomes.',
    icon: Sparkles,
    benefits: [
      'Turn your website into a clearer sales asset.',
      'Improve trust with polished design, focused messaging, and responsive UX.',
      'Build the right structure for ongoing campaigns and SEO.'
    ],
    deliverables: ['Information architecture', 'UX and UI design', 'Copy guidance', 'Static Next.js build', 'Forms and CTAs', 'Launch QA'],
    recommendedFor: ['Growing service businesses', 'Professional firms', 'Funded startups', 'Brands with complex offers'],
    faqs: [
      {
        question: 'Do you write the copy?',
        answer:
          'We can create or refine the core page copy so the site communicates clearly and drives action.'
      },
      {
        question: 'Can you rebuild an existing website?',
        answer:
          'Yes. We can preserve what works, improve what does not, and migrate the site into a faster growth-focused structure.'
      }
    ]
  },
  {
    slug: 'ai-chatbot-lead-qualification',
    title: 'AI Chatbot + Lead Qualification',
    shortTitle: 'AI Lead Systems',
    seoTitle: 'AI Chatbot and Lead Qualification Systems',
    seoDescription:
      'AI chatbot systems that ask the right questions, qualify prospects, recommend next steps, and send structured lead data.',
    description:
      'Let your website ask the right questions before you ever get on the phone, then route strong leads toward the next step.',
    icon: Bot,
    benefits: [
      'Capture more context from visitors while interest is high.',
      'Score leads by service need, budget, urgency, and fit.',
      'Send cleaner lead data to your inbox, CRM, or Slack.'
    ],
    deliverables: ['Chat strategy', 'Prompt system', 'Lead profile fields', 'Lead scoring', 'Booking CTA', 'Notification workflow'],
    recommendedFor: ['Agencies', 'Clinics', 'Contractors', 'Ecommerce brands', 'High-ticket service providers'],
    faqs: [
      {
        question: 'Will the chatbot make promises for us?',
        answer:
          'No. It is designed to be helpful, concise, and honest about timelines and scope.'
      },
      {
        question: 'Where does the lead data go?',
        answer:
          'It can be sent to email, Slack, DynamoDB, or another workflow depending on your setup.'
      }
    ]
  },
  {
    slug: 'seo-content-engine',
    title: 'SEO Content Engine',
    shortTitle: 'SEO Content',
    seoTitle: 'SEO Content Engine for Service Businesses',
    seoDescription:
      'Build crawlable service pages, helpful content, structured metadata, and internal links that support organic growth.',
    description:
      'Create a structured SEO foundation that helps your site answer the searches your customers already make.',
    icon: Search,
    benefits: [
      'Target services and buying questions with focused pages.',
      'Improve crawlability with metadata, structured data, and internal links.',
      'Turn expertise into a repeatable publishing system.'
    ],
    deliverables: ['SEO page map', 'Metadata system', 'Blog plan', 'Internal linking', 'Schema markup', 'RSS and sitemap generation'],
    recommendedFor: ['Local services', 'B2B services', 'Professional firms', 'Niche ecommerce brands'],
    faqs: [
      {
        question: 'Do you guarantee rankings?',
        answer:
          'No ethical SEO partner can guarantee rankings. We build the technical and content foundation that improves your ability to compete.'
      },
      {
        question: 'Can SEO be added after launch?',
        answer:
          'Yes, but it is more efficient when the website structure is planned with search demand and internal linking from the start.'
      }
    ]
  },
  {
    slug: 'programmatic-seo',
    title: 'Programmatic SEO Pages',
    shortTitle: 'Programmatic SEO',
    seoTitle: 'Programmatic SEO Pages for Scalable Search Growth',
    seoDescription:
      'Create scalable service and industry pages without fake location spam, using structured content and clear user intent.',
    description:
      'Build scalable service and industry pages around real offers, useful content, and the searches your customers already make.',
    icon: LineChart,
    benefits: [
      'Scale targeted landing pages without copying thin content.',
      'Create consistent page structures for services, industries, and use cases.',
      'Support organic acquisition with clean static pages and schema.'
    ],
    deliverables: ['Page templates', 'Structured content data', 'Static route generation', 'Sitemap inclusion', 'Breadcrumb schema', 'CTA system'],
    recommendedFor: ['Multi-service companies', 'SaaS', 'Agencies', 'B2B providers', 'Service marketplaces'],
    faqs: [
      {
        question: 'Do you create fake local pages?',
        answer:
          'No. We avoid spammy location pages and focus on real services, industries, use cases, and content that helps buyers.'
      },
      {
        question: 'Is this static export compatible?',
        answer:
          'Yes. Pages can be generated at build time and served from S3 and CloudFront.'
      }
    ]
  },
  {
    slug: 'automation-systems',
    title: 'Automation Systems',
    shortTitle: 'Automations',
    seoTitle: 'Marketing Automation Systems for Lead Follow-Up',
    seoDescription:
      'Automate lead capture, notifications, qualification, handoffs, and follow-up workflows for your website.',
    description:
      'Stop manually chasing every inquiry with workflows that move leads from first touch to the right next step.',
    icon: Workflow,
    benefits: [
      'Notify the right person when a qualified lead arrives.',
      'Route leads by service, budget, timeline, and source.',
      'Connect your website to the operational tools your team already uses.'
    ],
    deliverables: ['Workflow map', 'Lead routing', 'Email notifications', 'Slack alerts', 'CRM handoff guidance', 'Automation QA'],
    recommendedFor: ['Sales teams', 'Service businesses', 'Agencies', 'Clinics', 'Ecommerce teams'],
    faqs: [
      {
        question: 'Can you connect to our CRM?',
        answer:
          'Usually, yes. The exact integration depends on your CRM and whether it supports APIs, webhooks, or automation tools.'
      },
      {
        question: 'Can automations start simple?',
        answer:
          'Yes. A reliable lead notification and routing workflow is often the best first automation.'
      }
    ]
  },
  {
    slug: 'analytics-conversion-tracking',
    title: 'Analytics + Conversion Tracking',
    shortTitle: 'Analytics',
    seoTitle: 'Analytics and Conversion Tracking Setup',
    seoDescription:
      'Track CTA clicks, form submissions, chat engagement, ROI calculator usage, traffic sources, and conversion performance.',
    description:
      'Know which pages, campaigns, and calls-to-action are actually producing leads so you can improve what matters.',
    icon: BarChart3,
    benefits: [
      'See how visitors move through your website.',
      'Track the actions that indicate buying intent.',
      'Make design, copy, and campaign decisions from clearer data.'
    ],
    deliverables: ['GA4 setup', 'Internal event tracking', 'UTM capture', 'Conversion events', 'Dashboard guidance', 'Web vitals reporting'],
    recommendedFor: ['Campaign-driven teams', 'Growth marketers', 'Service businesses', 'Ecommerce brands'],
    faqs: [
      {
        question: 'Can you track custom events?',
        answer:
          'Yes. We can track events such as CTA clicks, chat opens, lead qualification, pricing views, and calculator usage.'
      },
      {
        question: 'Will analytics slow down the site?',
        answer:
          'We load optional analytics only when configured and keep tracking lightweight.'
      }
    ]
  },
  {
    slug: 'ecommerce-growth-systems',
    title: 'Ecommerce Growth Systems',
    shortTitle: 'Ecommerce Growth',
    seoTitle: 'Ecommerce Website Growth Systems',
    seoDescription:
      'Improve ecommerce conversion paths with better landing pages, AI support, analytics, automation, and SEO systems.',
    description:
      'Give shoppers clearer paths to products, answers, offers, and follow-up so more visits turn into revenue.',
    icon: ShoppingCart,
    benefits: [
      'Improve product discovery and buying confidence.',
      'Use AI chat to answer purchase questions and capture intent.',
      'Track traffic, conversion paths, and revenue lift opportunities.'
    ],
    deliverables: ['Landing page improvements', 'AI shopping assistant strategy', 'SEO content map', 'Analytics events', 'Lifecycle automation guidance'],
    recommendedFor: ['Ecommerce brands', 'DTC teams', 'Retailers', 'Subscription products'],
    faqs: [
      {
        question: 'Do you replace our ecommerce platform?',
        answer:
          'Not always. We can improve conversion paths around your current platform or plan a deeper rebuild if that is the right move.'
      },
      {
        question: 'Can AI help shoppers choose products?',
        answer:
          'Yes, when product data and guardrails are clear. We focus on helpful guidance rather than aggressive or inaccurate claims.'
      }
    ]
  }
];

export const getServiceBySlug = (slug: string) => services.find((service) => service.slug === slug);
