import { getIp, getMethod, jsonResponse, optionsResponse, type LambdaEvent } from '../shared/cors';
import { isRateLimited } from '../shared/rate-limit';
import { scoreLead } from '../shared/score';
import { notifyLead } from '../shared/notify';
import { honeypotTriggered, isEmail, parseJsonBody, sanitizeStringArray, sanitizeText } from '../shared/validate';

type LeadPayload = Record<string, unknown>;

export async function handler(event: LambdaEvent) {
  if (getMethod(event) === 'OPTIONS') return optionsResponse(event);
  if (getMethod(event) !== 'POST') return jsonResponse(405, { error: 'Method not allowed.' }, event);
  if (isRateLimited(`lead-score:${getIp(event)}`, 20)) return jsonResponse(429, { error: 'Too many requests.' }, event);

  try {
    const payload = parseJsonBody<LeadPayload>(event);
    if (honeypotTriggered(payload)) return jsonResponse(200, { ok: true }, event);

    const email = sanitizeText(payload.email, 240);
    if (email && !isEmail(email)) return jsonResponse(400, { error: 'Invalid email address.' }, event);

    const normalized = {
      name: sanitizeText(payload.name, 160),
      email,
      phone: sanitizeText(payload.phone, 80),
      businessType: sanitizeText(payload.businessType, 240),
      websiteUrl: sanitizeText(payload.websiteUrl, 240),
      servicesInterested: sanitizeStringArray(payload.servicesInterested),
      timeline: sanitizeText(payload.timeline, 160),
      budget: sanitizeText(payload.budget, 160),
      message: sanitizeText(payload.message, 1800),
      utm: payload.utm || {},
      sourcePage: sanitizeText(payload.sourcePage, 260)
    };

    const result = scoreLead(normalized);

    await notifyLead('Lead scored by LaunchWave', {
      type: 'lead_score',
      ...normalized,
      ...result
    });

    return jsonResponse(200, result, event);
  } catch (error) {
    return jsonResponse(400, { error: error instanceof Error ? error.message : 'Invalid request.' }, event);
  }
}
