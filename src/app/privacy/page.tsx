import { Section } from '@/components/ui/Section';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for LaunchWave Digital website visitors, leads, newsletter subscribers, and analytics events.',
  path: '/privacy'
});

export default function PrivacyPage() {
  return (
    <Section eyebrow="Privacy" title="Privacy Policy">
      <div className="mx-auto max-w-3xl space-y-8 text-muted">
        <p>
          LaunchWave Digital collects information you choose to submit through forms, chatbot interactions, newsletter signups, and booking requests. This may include your name, email, company, website URL, service interests, budget range, timeline, and project notes.
        </p>
        <p>
          We use this information to respond to inquiries, qualify project fit, improve website performance, send requested resources, and understand which pages and campaigns produce leads. Analytics events may include page paths, session identifiers, UTM parameters, CTA clicks, chat engagement, form submissions, and calculator usage.
        </p>
        <p>
          Serverless functions may store data in AWS services such as DynamoDB when configured and may send notifications through email or Slack. OpenAI API keys are used only server-side for chatbot and qualification features and are never exposed to the browser.
        </p>
        <p>
          You can request access, correction, or deletion of your submitted information by contacting us. We do not sell personal information.
        </p>
      </div>
    </Section>
  );
}
