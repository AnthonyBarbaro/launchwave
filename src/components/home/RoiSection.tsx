import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { RoiCalculator } from '@/components/visuals/RoiCalculator';

export function RoiSection() {
  return (
    <Section
      description="Estimate how conversion improvements could affect lead volume and monthly revenue. Use it as a planning tool, not a promise."
      eyebrow="ROI calculator"
      id="roi-calculator"
      title="What happens when more visitors become qualified leads?"
    >
      <RoiCalculator />
      <div className="mt-8 text-center">
        <Button href="/contact#contact-form" location="roi_inline_cta">
          Review My Growth Opportunity
        </Button>
      </div>
    </Section>
  );
}
