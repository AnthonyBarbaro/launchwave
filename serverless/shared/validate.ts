import type { LambdaEvent } from './cors';

export function parseJsonBody<T>(event: LambdaEvent): T {
  if (!event.body) throw new Error('Missing request body.');

  try {
    return JSON.parse(event.body) as T;
  } catch {
    throw new Error('Invalid JSON body.');
  }
}

export function sanitizeText(value: unknown, maxLength = 1200) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function sanitizeStringArray(value: unknown, maxItems = 12) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => sanitizeText(item, 120)).filter(Boolean).slice(0, maxItems);
}

export function isEmail(value: unknown) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function honeypotTriggered(payload: Record<string, unknown>) {
  return Boolean(payload.hp || payload.fax || payload.company_website || payload.middleName);
}

export function looksSpammy(text: string) {
  const lowered = text.toLowerCase();
  const linkCount = (text.match(/https?:\/\//g) || []).length;
  const spamTerms = ['casino', 'crypto pump', 'viagra', 'loan offer', 'telegram', 'whatsapp only'];
  return linkCount > 3 || spamTerms.some((term) => lowered.includes(term));
}

export function requireFields(payload: Record<string, unknown>, fields: string[]) {
  const missing = fields.filter((field) => !sanitizeText(payload[field], 400));
  if (missing.length) {
    throw new Error(`Missing required field: ${missing.join(', ')}.`);
  }
}
