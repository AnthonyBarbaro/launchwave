import { getIp, getMethod, jsonResponse, optionsResponse, type LambdaEvent } from '../shared/cors';
import { putItem } from '../shared/dynamodb';
import { isRateLimited } from '../shared/rate-limit';
import { honeypotTriggered, isEmail, parseJsonBody, sanitizeText } from '../shared/validate';

type NewsletterPayload = Record<string, unknown>;

export async function handler(event: LambdaEvent) {
  if (getMethod(event) === 'OPTIONS') return optionsResponse(event);
  if (getMethod(event) !== 'POST') return jsonResponse(405, { error: 'Method not allowed.' }, event);
  if (isRateLimited(`newsletter:${getIp(event)}`, 20)) return jsonResponse(429, { error: 'Too many requests.' }, event);

  try {
    const payload = parseJsonBody<NewsletterPayload>(event);
    if (honeypotTriggered(payload)) return jsonResponse(200, { ok: true }, event);

    const email = sanitizeText(payload.email, 240);
    if (!isEmail(email)) return jsonResponse(400, { error: 'Please enter a valid email address.' }, event);

    await putItem(process.env.DYNAMODB_NEWSLETTER_TABLE, {
      type: 'newsletter',
      email,
      source: sanitizeText(payload.source, 160),
      utm: payload.utm || {},
      sessionId: sanitizeText(payload.sessionId, 160)
    });

    return jsonResponse(200, { ok: true, message: 'Subscribed.' }, event);
  } catch (error) {
    return jsonResponse(400, { error: error instanceof Error ? error.message : 'Invalid request.' }, event);
  }
}
