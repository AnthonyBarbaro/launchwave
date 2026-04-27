import { readStoredUtm } from './utm';

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export function getSessionId() {
  if (typeof window === 'undefined') return 'server';

  const key = 'launchwave_session_id';
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const id = `lw_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(key, id);
  return id;
}

export async function postToApi<TResponse>(
  path: string,
  payload: Record<string, unknown>,
  options: { fallback?: TResponse } = {}
): Promise<TResponse> {
  if (!apiBaseUrl) {
    if (options.fallback !== undefined) return options.fallback;
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured.');
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...payload,
      sessionId: payload.sessionId || getSessionId(),
      utm: payload.utm || readStoredUtm()
    })
  });

  const data = (await response.json()) as TResponse & { error?: string };
  if (!response.ok) {
    throw new Error(data.error || 'Request failed.');
  }

  return data;
}
