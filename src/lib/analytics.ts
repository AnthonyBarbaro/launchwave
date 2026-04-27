import { getSessionId, postToApi } from './api';
import { readStoredUtm } from './utm';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | 'cta_click'
  | 'chat_open'
  | 'chat_message_sent'
  | 'lead_qualified'
  | 'contact_submit'
  | 'roi_calculator_used'
  | 'pricing_viewed'
  | 'color_scheme_changed'
  | 'theme_changed'
  | 'blog_article_viewed'
  | 'newsletter_signup';

export function trackEvent(eventName: AnalyticsEventName, metadata: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const page = window.location.pathname;
  const payload = {
    eventName,
    page,
    metadata,
    sessionId: getSessionId(),
    utm: readStoredUtm(),
    timestamp: new Date().toISOString()
  };

  if (window.gtag) {
    window.gtag('event', eventName, {
      page_path: page,
      ...metadata
    });
  }

  postToApi('/analytics-event', payload, { fallback: { ok: true } }).catch(() => {
    // Analytics must never interrupt the user journey.
  });
}

export const trackCtaClick = (label: string, location: string) =>
  trackEvent('cta_click', { label, location });

export const trackChatOpen = () => trackEvent('chat_open');

export const trackLeadQualified = (score: number) => trackEvent('lead_qualified', { score });

export const trackCalculatorUsed = (data: Record<string, unknown>) =>
  trackEvent('roi_calculator_used', data);

export { captureUtmParams } from './utm';
