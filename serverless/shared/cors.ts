export type LambdaEvent = {
  httpMethod?: string;
  requestContext?: {
    http?: {
      method?: string;
      sourceIp?: string;
    };
  };
  headers?: Record<string, string | undefined>;
  body?: string | null;
};

export function getMethod(event: LambdaEvent) {
  return event.requestContext?.http?.method || event.httpMethod || 'GET';
}

export function getIp(event: LambdaEvent) {
  return (
    event.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
    event.headers?.['X-Forwarded-For']?.split(',')[0]?.trim() ||
    event.requestContext?.http?.sourceIp ||
    'unknown'
  );
}

export function corsHeaders(event?: LambdaEvent) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  const origin = event?.headers?.origin || event?.headers?.Origin;
  const allowOrigin = allowedOrigin === '*' || !origin ? allowedOrigin : allowedOrigin.split(',').map((item) => item.trim()).includes(origin) ? origin : allowedOrigin.split(',')[0];

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'content-type,authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
  };
}

export function jsonResponse(statusCode: number, body: Record<string, unknown>, event?: LambdaEvent) {
  return {
    statusCode,
    headers: corsHeaders(event),
    body: JSON.stringify(body)
  };
}

export function optionsResponse(event?: LambdaEvent) {
  return {
    statusCode: 204,
    headers: corsHeaders(event),
    body: ''
  };
}
