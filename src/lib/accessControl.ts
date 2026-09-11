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

  // 有些网络环境下（DNS 污染/跨境网络不稳/公司网络策略等）
  // Supabase 域名可能解析失败或请求长期挂起，导致页面一直卡在“正在验证…”。
  // 这里加一个超时，给用户更明确的提示。
  const controller = new AbortController();
  const timeoutMs = 8000;
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    // supabase-js v2 的 PostgREST builder 在运行时支持 abortSignal，但 TS 类型里不一定暴露
    // 所以这里用 any 做一次“软兼容”，避免 build 失败。
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = supabase
      .from('access_tokens')
      .select('token, expires_at')
      .eq('token', token)
      .maybeSingle();

    const { data, error } = await query.abortSignal(controller.signal);

    if (error) return { ok: false, reason: 'error' };
    if (!data?.expires_at) return { ok: false, reason: 'invalid' };

    const expiresAt = new Date(data.expires_at).getTime();
    if (Number.isNaN(expiresAt)) return { ok: false, reason: 'error' };

    if (expiresAt <= Date.now()) return { ok: false, reason: 'expired' };

    return { ok: true, token, expiresAt: data.expires_at };
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
