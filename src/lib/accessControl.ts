import { supabase } from './supabaseClient';

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

  try {
    const { data, error } = await supabase
      .from('access_tokens')
      .select('token, expires_at')
      .eq('token', token)
      .maybeSingle();

    if (error) return { ok: false, reason: 'error' };
    if (!data?.expires_at) return { ok: false, reason: 'invalid' };

    const expiresAt = new Date(data.expires_at).getTime();
    if (Number.isNaN(expiresAt)) return { ok: false, reason: 'error' };

    if (expiresAt <= Date.now()) return { ok: false, reason: 'expired' };

    return { ok: true, token, expiresAt: data.expires_at };
  } catch {
    return { ok: false, reason: 'error' };
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
