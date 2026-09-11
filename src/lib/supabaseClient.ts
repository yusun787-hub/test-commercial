import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // 这里直接 throw 能更快暴露环境配置问题（避免线上静默失败导致所有用户都进不去）。
  throw new Error('缺少 Supabase 环境变量：请配置 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY');
}

const supabaseFetch: typeof fetch = (input, init) => {
  const headers = new Headers(init?.headers ?? undefined);

  // 兜底补齐 apikey，避免任何请求因 header 丢失而直接暴露 Supabase 原始 JSON 错误。
  if (!headers.has('apikey')) {
    headers.set('apikey', supabaseAnonKey);
  }

  // 对匿名请求也显式补 Bearer，确保 REST / Auth / Realtime 相关请求头一致。
  if (!headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${supabaseAnonKey}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: supabaseFetch,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  },
});
