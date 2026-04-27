export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
};

const UTM_KEY = 'launchwave_utm';

export function readStoredUtm(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const stored = window.localStorage.getItem(UTM_KEY);
    return stored ? (JSON.parse(stored) as UtmParams) : {};
  } catch {
    return {};
  }
}

export function captureUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {
    referrer: document.referrer || undefined
  };

  (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const).forEach((key) => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });

  const hasUtm = Object.values(utm).some(Boolean);
  if (hasUtm) {
    window.localStorage.setItem(UTM_KEY, JSON.stringify(utm));
    return utm;
  }

  return readStoredUtm();
}
