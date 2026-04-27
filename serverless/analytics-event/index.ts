import { getIp, getMethod, jsonResponse, optionsResponse, type LambdaEvent } from '../shared/cors';
import { putItem } from '../shared/dynamodb';
import { isRateLimited } from '../shared/rate-limit';
import { parseJsonBody, sanitizeText } from '../shared/validate';

const allowedEvents = new Set([
  'cta_click',
  'chat_open',
  'chat_message_sent',
  'lead_qualified',
  'contact_submit',
  'roi_calculator_used',
  'pricing_viewed',
  'color_scheme_changed',
  'theme_changed',
  'blog_article_viewed',
  'newsletter_signup'
]);

type AnalyticsPayload = Record<string, unknown>;

export async function handler(event: LambdaEvent) {
  if (getMethod(event) === 'OPTIONS') return optionsResponse(event);
  if (getMethod(event) !== 'POST') return jsonResponse(405, { error: 'Method not allowed.' }, event);
  if (isRateLimited(`analytics:${getIp(event)}`, 120)) return jsonResponse(429, { error: 'Too many requests.' }, event);

  try {
    const payload = parseJsonBody<AnalyticsPayload>(event);
    const eventName = sanitizeText(payload.eventName, 80);

    if (!allowedEvents.has(eventName)) {
      return jsonResponse(400, { error: 'Unsupported analytics event.' }, event);
    }

    await putItem(process.env.DYNAMODB_ANALYTICS_TABLE, {
      type: 'analytics_event',
      eventName,
      page: sanitizeText(payload.page, 260),
      metadata: payload.metadata || {},
      sessionId: sanitizeText(payload.sessionId, 160),
      utm: payload.utm || {},
      timestamp: sanitizeText(payload.timestamp, 80) || new Date().toISOString()
    });

    return jsonResponse(200, { ok: true }, event);
  } catch (error) {
    return jsonResponse(400, { error: error instanceof Error ? error.message : 'Invalid request.' }, event);
  }
}
