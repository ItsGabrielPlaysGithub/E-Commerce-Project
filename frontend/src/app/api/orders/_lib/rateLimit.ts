type RateLimitEntry = { count: number; resetTime: number };

const requestCounts = new Map<string, RateLimitEntry>();

export function checkRateLimit(clientId: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = requestCounts.get(clientId);

  if (!entry || now > entry.resetTime) {
    requestCounts.set(clientId, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count += 1;
  return true;
}

export function getClientIdentifier(headers: Headers): string {
  return headers.get("x-forwarded-for") || headers.get("x-real-ip") || "unknown";
}
