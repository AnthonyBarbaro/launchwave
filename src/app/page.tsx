import { AnnouncementBanner } from '@/components/home/AnnouncementBanner';
import { AiPreview } from '@/components/home/AiPreview';
import { BlogPreview } from '@/components/home/BlogPreview';
import { CaseStudyPreview } from '@/components/home/CaseStudyPreview';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCta } from '@/components/home/FinalCta';
import { Hero } from '@/components/home/Hero';
import { PricingPreview } from '@/components/home/PricingPreview';
import { ProcessSection } from '@/components/home/ProcessSection';
import { RoiSection } from '@/components/home/RoiSection';
import { SeoPreview } from '@/components/home/SeoPreview';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TrustBar } from '@/components/home/TrustBar';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqs } from '@/data/faqs';
import { createMetadata, faqSchema, organizationSchema, websiteSchema } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Launch a Website That Gets Leads in Less Than 48 Hours',
  description:
    'LaunchWave Digital builds conversion-ready websites, AI chatbots, automations, SEO engines, and analytics systems for businesses that want more leads.',
  path: '/'
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), faqSchema(faqs)]} />
      <AnnouncementBanner />
      <Hero />
      <TrustBar />
      <ServicesSection />
      <WhyChooseUs />
      <RoiSection />
      <AiPreview />
      <ProcessSection />
      <SeoPreview />
      <CaseStudyPreview />
      <PricingPreview />
      <BlogPreview />
      <FaqSection />
      <FinalCta />
    </>
  );
}
