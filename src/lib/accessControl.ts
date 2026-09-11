const STORAGE_KEY = 'tv-character-quiz:access_token';

export type AccessCheckResult =
  | { ok: true; token: string; expiresAt: string }
  | { ok: false; reason: 'missing' | 'invalid' | 'expired' | 'error' };

export function getStoredToken(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storeToken(token: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // ignore
  }
}

export function clearStoredToken() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export async function validateAccessToken(token: string): Promise<AccessCheckResult> {
  if (!token) return { ok: false, reason: 'missing' };

  const controller = new AbortController();
  const timeoutMs = 10000;
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`/api/verify-token?token=${encodeURIComponent(token)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    if (!response.ok) return { ok: false, reason: 'error' };

    const result = (await response.json()) as {
      valid?: boolean;
      reason?: 'invalid' | 'expired' | 'error';
      expiresAt?: string;
    };

    if (!result.valid) {
      return { ok: false, reason: result.reason ?? 'invalid' };
    }
    if (!result.expiresAt) return { ok: false, reason: 'error' };

    return { ok: true, token, expiresAt: result.expiresAt };
  } catch {
    return { ok: false, reason: 'error' };
  } finally {
    window.clearTimeout(timer);
  }
}

export function readTokenFromUrl(search: string): string | null {
  try {
    const params = new URLSearchParams(search);
    return params.get('token');
  } catch {
    return null;
  }
}

export function stripTokenParamFromUrl(currentUrl: string): string {
  const url = new URL(currentUrl);
  url.searchParams.delete('token');
  return url.pathname + url.search + url.hash;
}
