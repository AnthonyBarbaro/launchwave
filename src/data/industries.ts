export type Industry = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  description: string;
  benefits: string[];
  recommendedServices: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const industries: Industry[] = [
  {
    slug: 'local-service-businesses',
    name: 'Local Service Businesses',
    seoTitle: 'Websites and AI Lead Systems for Local Service Businesses',
    seoDescription:
      'Launch a fast, conversion-ready website for local service businesses with SEO, lead capture, AI qualification, and analytics.',
    headline: 'Website growth systems for local service businesses',
    description:
      'Make it easier for local prospects to understand your service, trust your team, and request a quote or consultation.',
    benefits: ['Clear service pages', 'Lead forms that capture context', 'Local search-ready structure', 'Fast mobile experience'],
    recommendedServices: ['48-hour-website-launch', 'ai-chatbot-lead-qualification', 'seo-content-engine', 'analytics-conversion-tracking'],
    faqs: [
      {
        question: 'Can this help with quote requests?',
        answer: 'Yes. We structure calls-to-action and forms around quote requests, booking, and qualified service inquiries.'
      },
      {
        question: 'Do you create city spam pages?',
        answer: 'No. We focus on useful service and industry pages, not thin pages pretending to be local offices.'
      }
    ]
  },
  {
    slug: 'ecommerce-brands',
    name: 'Ecommerce Brands',
    seoTitle: 'Ecommerce Growth Websites, AI Chat, and Conversion Tracking',
    seoDescription:
      'Improve ecommerce conversion paths with landing pages, AI chat, SEO content, analytics, and automation systems.',
    headline: 'Conversion systems for ecommerce brands',
    description:
      'Help shoppers find the right product, get answers quickly, and move from interest to purchase with less friction.',
    benefits: ['Product education pages', 'AI purchase guidance', 'Revenue-focused analytics', 'Campaign landing pages'],
    recommendedServices: ['ecommerce-growth-systems', 'ai-chatbot-lead-qualification', 'analytics-conversion-tracking', 'seo-content-engine'],
    faqs: [
      {
        question: 'Can you integrate with our store?',
        answer: 'We can plan around your current platform and connect forms, analytics, and workflows where APIs allow.'
      },
      {
        question: 'Do you track revenue?',
        answer: 'We can set up ecommerce and conversion tracking depending on the platform and analytics access available.'
      }
    ]
  },
  {
    slug: 'contractors',
    name: 'Contractors',
    seoTitle: 'Websites and Lead Qualification for Contractors',
    seoDescription:
      'Contractor websites built for quote requests, service pages, AI lead qualification, SEO, and conversion tracking.',
    headline: 'Websites that turn contractor traffic into qualified jobs',
    description:
      'Show your work clearly, answer buyer questions, and collect the details you need before the first call.',
    benefits: ['Project-focused service pages', 'Estimate request workflows', 'Lead qualification', 'Before-and-after proof sections'],
    recommendedServices: ['48-hour-website-launch', 'custom-website-development', 'ai-chatbot-lead-qualification', 'seo-content-engine'],
    faqs: [
      {
        question: 'Can forms ask about project details?',
        answer: 'Yes. Forms and chat can ask about service type, location, timeline, budget, and project notes.'
      },
      {
        question: 'Can you help with photos and proof?',
        answer: 'We can structure galleries, testimonials, and project sections if you provide the source material.'
      }
    ]
  },
  {
    slug: 'medical-wellness',
    name: 'Medical + Wellness',
    seoTitle: 'Websites for Medical and Wellness Practices',
    seoDescription:
      'Professional medical and wellness websites with clear services, booking CTAs, compliant messaging, and analytics.',
    headline: 'Clear, trust-building websites for medical and wellness practices',
    description:
      'Create a calm, professional web experience that helps visitors understand services and take the right next step.',
    benefits: ['Trust-focused design', 'Service education', 'Booking-oriented CTAs', 'Careful claims and messaging'],
    recommendedServices: ['custom-website-development', 'analytics-conversion-tracking', 'seo-content-engine', 'automation-systems'],
    faqs: [
      {
        question: 'Do you make medical claims?',
        answer: 'No. We keep messaging careful and recommend legal or compliance review for regulated claims.'
      },
      {
        question: 'Can you connect booking tools?',
        answer: 'Often, yes. We can link or integrate booking tools depending on the vendor and requirements.'
      }
    ]
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    seoTitle: 'Real Estate Websites, Lead Capture, and Automation',
    seoDescription:
      'Real estate website systems with landing pages, lead capture, AI qualification, local content, and follow-up automation.',
    headline: 'Lead capture systems for real estate teams',
    description:
      'Build landing pages and qualification flows that help buyers, sellers, renters, or investors raise their hand.',
    benefits: ['Segmented lead paths', 'Property or offer landing pages', 'AI pre-qualification', 'Follow-up workflows'],
    recommendedServices: ['48-hour-website-launch', 'ai-chatbot-lead-qualification', 'automation-systems', 'analytics-conversion-tracking'],
    faqs: [
      {
        question: 'Can the chat ask buyer or seller questions?',
        answer: 'Yes. It can ask about goals, timeline, budget range, location, property type, and contact preferences.'
      },
      {
        question: 'Can this support campaigns?',
        answer: 'Yes. Fast landing pages are useful for listing, valuation, niche, and paid campaign offers.'
      }
    ]
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    seoTitle: 'Websites for Professional Services Firms',
    seoDescription:
      'Professional services websites built for authority, lead capture, AI intake, SEO content, and measurable conversion paths.',
    headline: 'Authority-building websites for professional services',
    description:
      'Explain complex services clearly, build trust quickly, and route qualified prospects toward consultation.',
    benefits: ['Clear service architecture', 'Authority content', 'Consultation CTAs', 'Qualified intake workflows'],
    recommendedServices: ['custom-website-development', 'seo-content-engine', 'ai-chatbot-lead-qualification', 'analytics-conversion-tracking'],
    faqs: [
      {
        question: 'Can you handle complex service offers?',
        answer: 'Yes. We turn complex offers into clearer page structures, messaging, and calls-to-action.'
      },
      {
        question: 'Can content support thought leadership?',
        answer: 'Yes. Blog and article templates can support helpful, expertise-driven content.'
      }
    ]
  },
  {
    slug: 'startups',
    name: 'Startups',
    seoTitle: 'Startup Website Launch, AI Systems, and Growth Tracking',
    seoDescription:
      'Fast startup websites with landing pages, conversion tracking, AI chat, waitlists, and scalable content systems.',
    headline: 'Launch faster with a website built for learning and growth',
    description:
      'Get a credible site live quickly, validate demand, capture leads, and learn which messages drive action.',
    benefits: ['Fast MVP launch', 'Waitlist or demo CTAs', 'Analytics from day one', 'Scalable growth foundation'],
    recommendedServices: ['48-hour-website-launch', 'analytics-conversion-tracking', 'ai-chatbot-lead-qualification', 'programmatic-seo'],
    faqs: [
      {
        question: 'Can this support a waitlist?',
        answer: 'Yes. We can add a newsletter or waitlist flow and store submissions through serverless functions.'
      },
      {
        question: 'Can the site evolve after launch?',
        answer: 'Yes. The first launch can become the base for more pages, SEO, and product education.'
      }
    ]
  },
  {
    slug: 'saas',
    name: 'SaaS',
    seoTitle: 'SaaS Marketing Websites, SEO Pages, and AI Lead Systems',
    seoDescription:
      'SaaS marketing websites with product positioning, conversion paths, programmatic SEO, AI chat, and analytics.',
    headline: 'SaaS marketing pages built for demos, trials, and search growth',
    description:
      'Clarify your product, guide visitors by use case, and track the actions that indicate buying intent.',
    benefits: ['Use case pages', 'Demo and trial CTAs', 'Programmatic SEO templates', 'Product-aware AI chat'],
    recommendedServices: ['custom-website-development', 'programmatic-seo', 'ai-chatbot-lead-qualification', 'analytics-conversion-tracking'],
    faqs: [
      {
        question: 'Can you build use case pages?',
        answer: 'Yes. Use case, integration, industry, and comparison pages can be generated from structured content.'
      },
      {
        question: 'Can chat route enterprise leads?',
        answer: 'Yes. Lead scoring can account for company size, urgency, use case, and buying intent.'
      }
    ]
  }
];

export const getIndustryBySlug = (slug: string) => industries.find((industry) => industry.slug === slug);
