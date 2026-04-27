import OpenAI from 'openai';
import { getIp, getMethod, jsonResponse, optionsResponse, type LambdaEvent } from '../shared/cors';
import { isRateLimited } from '../shared/rate-limit';
import { scoreLead } from '../shared/score';
import { notifyLead } from '../shared/notify';
import { honeypotTriggered, looksSpammy, parseJsonBody, sanitizeText } from '../shared/validate';

type ChatMessage = {
  role: 'assistant' | 'user';
  content: string;
};

type ChatPayload = {
  sessionId?: string;
  messages?: ChatMessage[];
  leadProfile?: Record<string, unknown>;
  pageUrl?: string;
  utm?: Record<string, unknown>;
  hp?: string;
};

type ChatResult = {
  reply: string;
  leadProfile: Record<string, unknown>;
  leadScore: number;
  recommendedPackage: 'Starter Launch' | 'Growth System' | 'Scale Engine';
  nextStep: string;
  shouldShowBookingCta: boolean;
};

let openai: OpenAI | null = null;

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured.');
  if (!openai) openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openai;
}

const systemPrompt = `
You are the AI Growth Assistant for LaunchWave Digital, a website and growth agency.
Your goal is to qualify website, SEO, AI chatbot, automation, analytics, and ecommerce growth leads.
Be professional, friendly, concise, and sales-oriented without pressure.
Ask one useful question at a time when information is missing.
Never make unrealistic promises. Say timelines depend on scope, content readiness, integrations, and approvals.
Guide strong-fit leads toward booking a strategy call.
Return only valid JSON with this shape:
{
  "reply": "short helpful message",
  "leadProfile": {
    "businessType": "",
    "servicesInterested": [],
    "timeline": "",
    "budget": "",
    "websiteUrl": "",
    "name": "",
    "email": ""
  },
  "leadScore": 0,
  "recommendedPackage": "Starter Launch | Growth System | Scale Engine",
  "nextStep": "",
  "shouldShowBookingCta": true
}
`;

export async function handler(event: LambdaEvent) {
  if (getMethod(event) === 'OPTIONS') return optionsResponse(event);
  if (getMethod(event) !== 'POST') return jsonResponse(405, { error: 'Method not allowed.' }, event);
  if (isRateLimited(`chat:${getIp(event)}`, 40)) return jsonResponse(429, { error: 'Too many requests.' }, event);

  try {
    const payload = parseJsonBody<ChatPayload>(event);
    if (honeypotTriggered(payload as Record<string, unknown>)) return jsonResponse(200, { ok: true }, event);

    const messages = Array.isArray(payload.messages)
      ? payload.messages
          .filter((message) => message.role === 'assistant' || message.role === 'user')
          .slice(-12)
          .map((message) => ({
            role: message.role,
            content: sanitizeText(message.content, 900)
          }))
          .filter((message) => message.content)
      : [];

    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content || '';
    if (!messages.length) return jsonResponse(400, { error: 'Messages are required.' }, event);
    if (looksSpammy(lastUserMessage)) return jsonResponse(400, { error: 'Message rejected.' }, event);

    const existingProfile = payload.leadProfile || {};
    const scoring = scoreLead({
      businessType: existingProfile.businessType,
      servicesInterested: existingProfile.servicesInterested,
      timeline: existingProfile.timeline,
      budget: existingProfile.budget,
      websiteUrl: existingProfile.websiteUrl,
      name: existingProfile.name,
      email: existingProfile.email,
      message: messages.map((message) => message.content).join(' ')
    });

    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.45,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: JSON.stringify({
            conversation: messages,
            existingLeadProfile: existingProfile,
            pageUrl: sanitizeText(payload.pageUrl, 260),
            serverSideScore: scoring,
            instruction:
              'Update the lead profile from the conversation. Ask for missing business type, service need, timeline, budget, website URL, and contact info. Keep reply under 90 words.'
          })
        }
      ]
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(raw) as Partial<ChatResult>;
    const leadProfile = {
      ...existingProfile,
      ...(parsed.leadProfile || {})
    };
    const finalScore = typeof parsed.leadScore === 'number' ? Math.max(0, Math.min(100, parsed.leadScore)) : scoring.score;
    const recommendedPackage = isPackage(parsed.recommendedPackage) ? parsed.recommendedPackage : scoring.recommendedPackage;
    const shouldShowBookingCta = Boolean(parsed.shouldShowBookingCta || finalScore >= 65);

    const response: ChatResult = {
      reply:
        sanitizeText(parsed.reply, 700) ||
        'Thanks. Based on what you shared, the next step is to confirm scope, timeline, and the best launch path.',
      leadProfile,
      leadScore: finalScore,
      recommendedPackage,
      nextStep: sanitizeText(parsed.nextStep, 240) || scoring.nextStep,
      shouldShowBookingCta
    };

    if (finalScore >= 65 || shouldShowBookingCta) {
      await notifyLead('Qualified chat lead from LaunchWave', {
        type: 'chat_lead',
        sessionId: sanitizeText(payload.sessionId, 160),
        pageUrl: sanitizeText(payload.pageUrl, 260),
        utm: payload.utm || {},
        transcript: messages,
        ...response
      });
    }

    return jsonResponse(200, response, event);
  } catch (error) {
    return jsonResponse(400, { error: error instanceof Error ? error.message : 'Invalid request.' }, event);
  }
}

function isPackage(value: unknown): value is ChatResult['recommendedPackage'] {
  return value === 'Starter Launch' || value === 'Growth System' || value === 'Scale Engine';
}
