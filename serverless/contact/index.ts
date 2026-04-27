import { getIp, getMethod, jsonResponse, optionsResponse, type LambdaEvent } from '../shared/cors';
import { isRateLimited } from '../shared/rate-limit';
import { scoreLead } from '../shared/score';
import { notifyLead } from '../shared/notify';
import { honeypotTriggered, isEmail, looksSpammy, parseJsonBody, requireFields, sanitizeText } from '../shared/validate';

type ContactPayload = Record<string, unknown>;

export async function handler(event: LambdaEvent) {
  if (getMethod(event) === 'OPTIONS') return optionsResponse(event);
  if (getMethod(event) !== 'POST') return jsonResponse(405, { error: 'Method not allowed.' }, event);
  if (isRateLimited(`contact:${getIp(event)}`, 12)) return jsonResponse(429, { error: 'Too many requests.' }, event);

  try {
    const payload = parseJsonBody<ContactPayload>(event);
    if (honeypotTriggered(payload)) return jsonResponse(200, { ok: true }, event);

    requireFields(payload, ['name', 'email', 'message']);
    const email = sanitizeText(payload.email, 240);
    if (!isEmail(email)) return jsonResponse(400, { error: 'Please enter a valid email address.' }, event);

    const message = sanitizeText(payload.message, 1800);
    if (looksSpammy(message)) return jsonResponse(400, { error: 'Submission rejected.' }, event);

    const lead = {
      type: 'contact',
      name: sanitizeText(payload.name, 160),
      email,
      phone: sanitizeText(payload.phone, 80),
      company: sanitizeText(payload.company, 180),
      websiteUrl: sanitizeText(payload.website || payload.websiteUrl, 240),
      budget: sanitizeText(payload.budget, 160),
      timeline: sanitizeText(payload.timeline, 160),
      message,
      selectedService: sanitizeText(payload.selectedService, 200),
      utm: payload.utm || {},
      sessionId: sanitizeText(payload.sessionId, 160)
    };

    const scoring = scoreLead({
      ...lead,
      businessType: lead.company,
      servicesInterested: lead.selectedService ? [lead.selectedService] : []
    });

    await notifyLead('New LaunchWave contact form lead', {
      ...lead,
      ...scoring
    });

    return jsonResponse(200, {
      ok: true,
      message: 'Thanks. Your message was received.',
      score: scoring.score,
      recommendedPackage: scoring.recommendedPackage
    }, event);
  } catch (error) {
    return jsonResponse(400, { error: error instanceof Error ? error.message : 'Invalid request.' }, event);
  }
}
