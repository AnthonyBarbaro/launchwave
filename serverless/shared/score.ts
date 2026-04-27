import { looksSpammy, sanitizeStringArray, sanitizeText } from './validate';

export type LeadScoreInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  businessType?: unknown;
  websiteUrl?: unknown;
  servicesInterested?: unknown;
  timeline?: unknown;
  budget?: unknown;
  message?: unknown;
};

export type LeadScoreResult = {
  score: number;
  temperature: 'hot' | 'warm' | 'cold';
  recommendedPackage: 'Starter Launch' | 'Growth System' | 'Scale Engine';
  reasons: string[];
  nextStep: string;
};

export function scoreLead(input: LeadScoreInput): LeadScoreResult {
  const reasons: string[] = [];
  let score = 20;

  const timeline = sanitizeText(input.timeline, 120).toLowerCase();
  const budget = sanitizeText(input.budget, 120).toLowerCase();
  const websiteUrl = sanitizeText(input.websiteUrl, 240);
  const message = sanitizeText(input.message, 2000);
  const services = sanitizeStringArray(input.servicesInterested);
  const combined = `${sanitizeText(input.businessType, 240)} ${message}`.toLowerCase();
  const hasScaleBudget = /\$?15k|\$?15,?000|15k\+|\$?10k\s*-\s*\$?15k|\$?10,?000\s*-\s*\$?15,?000|scale/.test(budget);
  const hasGrowthBudget = /\$?5k|\$?5,?000|\$?10k|\$?10,?000|5k\s*-\s*\$?10k|5,?000\s*-\s*\$?10,?000/.test(budget);
  const hasStarterBudget = /\$?2k|\$?2,?000|starter/.test(budget);

  if (timeline.includes('asap') || timeline.includes('this week') || timeline.includes('48')) {
    score += 22;
    reasons.push('Urgent launch timeline');
  } else if (timeline.includes('month')) {
    score += 12;
    reasons.push('Near-term project timeline');
  }

  if (hasScaleBudget) {
    score += 22;
    reasons.push('Clear higher-value budget range');
  } else if (hasGrowthBudget) {
    score += 14;
    reasons.push('Clear growth budget range');
  } else if (hasStarterBudget) {
    score += 8;
    reasons.push('Starter budget range provided');
  }

  if (services.length >= 3) {
    score += 16;
    reasons.push('Interested in multiple growth services');
  } else if (services.length > 0) {
    score += 8;
    reasons.push('Specific service interest provided');
  }

  if (websiteUrl) {
    score += 10;
    reasons.push('Existing website or URL provided');
  }

  if (/(owner|founder|ceo|partner|director|decision|my business|our company)/i.test(combined)) {
    score += 12;
    reasons.push('Decision-maker language detected');
  }

  if (sanitizeText(input.email, 240)) score += 6;
  if (sanitizeText(input.phone, 80)) score += 4;

  if (!message || message.length < 20) {
    score -= 10;
    reasons.push('Limited project detail');
  }

  if (looksSpammy(message)) {
    score -= 35;
    reasons.push('Submission appears spammy');
  }

  score = Math.max(0, Math.min(100, score));

  const temperature = score >= 75 ? 'hot' : score >= 45 ? 'warm' : 'cold';
  const recommendedPackage =
    services.length >= 4 || hasScaleBudget
      ? 'Scale Engine'
      : services.length >= 2 || hasGrowthBudget
        ? 'Growth System'
        : 'Starter Launch';

  const nextStep =
    temperature === 'hot'
      ? 'Book a strategy call and confirm scope, timeline, and implementation path.'
      : temperature === 'warm'
        ? 'Send a focused follow-up with package fit and missing qualification details.'
        : 'Offer the launch checklist and ask one clarifying question before scheduling.';

  return { score, temperature, recommendedPackage, reasons, nextStep };
}
