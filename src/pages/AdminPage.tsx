import { Copy, KeyRound, Plus, RefreshCw, Shield } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type TokenRow = {
  token: string;
  created_at: string;
  expires_at: string;
};

function generateTokenHex(bytes = 16) {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function formatDateTime(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString('zh-CN', { hour12: false });
}

function isExpired(expiresAt: string) {
  const t = new Date(expiresAt).getTime();
  if (Number.isNaN(t)) return false;
  return t <= Date.now();
}

export default function AdminPage() {
  const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);

  const [rows, setRows] = useState<TokenRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newLink, setNewLink] = useState<string>('');
  const [error, setError] = useState<string>('');

  const adminHint = useMemo(() => {
    if (!expectedPassword) {
      return '未配置 VITE_ADMIN_PASSWORD（建议在 .env 中配置一个管理密码）。';
    }
    return '输入管理密码后即可使用。';
  }, [expectedPassword]);

  async function loadList() {
    setError('');
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('access_tokens')
        .select('token, created_at, expires_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setRows((data ?? []) as TokenRow[]);
    } catch (e) {
      setError('拉取历史列表失败：请检查 Supabase 表结构/RLS/环境变量是否配置正确。');
    } finally {
      setLoading(false);
    }
  }

  async function createToken() {
    setError('');
    setCreating(true);

    try {
      const token = generateTokenHex(16);
      const expiresAt = addDays(new Date(), 30).toISOString();

      const { error } = await supabase.from('access_tokens').insert({
        token,
        expires_at: expiresAt,
      });

      if (error) throw error;

      const link = `${window.location.origin}/?token=${token}`;
      setNewLink(link);
      await loadList();
    } catch {
      setError(
        '创建 token 失败：大概率是 RLS 没放开 INSERT。请按 supabase/access_tokens.sql 增加 INSERT policy，或改用 SQL Editor 手动插入。',
      );
    } finally {
      setCreating(false);
    }
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (!authed) return;
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
      <section className="w-full max-w-3xl rounded-[1.5rem] border border-white/70 bg-gradient-to-br from-sky-200/50 via-white/50 to-pink-200/50 p-6 shadow-2xl shadow-sky-200/40 backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-white/60 px-4 py-2 text-sm text-slate-600">
            <Shield className="h-4 w-4" />
            管理页 /admin
          </div>

          {authed && (
            <button
              type="button"
              onClick={loadList}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm text-slate-700 transition hover:bg-white"
            >
              <RefreshCw className={loading ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
              刷新列表
            </button>
          )}
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-slate-800 sm:text-3xl">专属链接生成器</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{adminHint}</p>

        {!authed ? (
          <div className="mt-6 rounded-2xl border border-white/70 bg-white/55 p-5">
            <label className="text-sm text-slate-700">管理密码</label>
            <div className="mt-2 flex flex-wrap gap-3">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="请输入…"
                className="min-w-[220px] flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-pink-300"
              />
              <button
                type="button"
                onClick={() => {
                  // 如果没配 env，就把“当前输入的密码”视为管理员密码（用于本地/临时场景）。
                  if (!expectedPassword) {
                    setAuthed(Boolean(password));
                    return;
                  }
                  setAuthed(password === expectedPassword);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-pink-400 px-5 py-3 text-sm font-medium text-white transition hover:bg-pink-500"
              >
                <KeyRound className="h-4 w-4" />
                进入
              </button>
            </div>
            {expectedPassword && password && password !== expectedPassword && (
              <p className="mt-3 text-sm text-pink-700">密码不正确。</p>
            )}
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/55 p-5">
              <div>
                <div className="text-sm text-slate-600">默认有效期</div>
                <div className="mt-1 text-base font-medium text-slate-800">30 天</div>
              </div>
              <button
                type="button"
                onClick={createToken}
                disabled={creating}
                className="inline-flex items-center gap-2 rounded-full bg-pink-400 px-5 py-3 text-sm font-medium text-white transition hover:bg-pink-500 disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
                {creating ? '生成中…' : '一键生成新链接'}
              </button>
            </div>

            {newLink && (
              <div className="mt-4 rounded-2xl border border-white/70 bg-white/60 p-5">
                <div className="text-sm font-medium text-slate-800">最新生成</div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <code className="flex-1 break-all rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-700">
                    {newLink}
                  </code>
                  <button
                    type="button"
                    onClick={() => copy(newLink)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-700 transition hover:bg-white"
                  >
                    <Copy className="h-4 w-4" />
                    复制
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-2xl border border-pink-200 bg-pink-50/70 p-4 text-sm leading-6 text-pink-800">
                {error}
              </div>
            )}

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/70 bg-white/55">
              <div className="border-b border-white/70 px-5 py-4 text-sm font-medium text-slate-700">历史链接</div>

              <div className="divide-y divide-white/70">
                {rows.length === 0 && !loading ? (
                  <div className="px-5 py-6 text-sm text-slate-600">暂无记录。</div>
                ) : (
                  rows.map((row) => {
                    const link = `${window.location.origin}/?token=${row.token}`;
                    const expired = isExpired(row.expires_at);

                    return (
                      <div key={row.token} className="px-5 py-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={
                                  expired
                                    ? 'rounded-full bg-slate-200 px-2.5 py-1 text-xs text-slate-600'
                                    : 'rounded-full bg-emerald-100 px-2.5 py-1 text-xs text-emerald-700'
                                }
                              >
                                {expired ? '已过期' : '有效'}
                              </span>
                              <span className="text-xs text-slate-500">
                                创建：{formatDateTime(row.created_at)}
                              </span>
                              <span className="text-xs text-slate-500">
                                到期：{formatDateTime(row.expires_at)}
                              </span>
                            </div>

                            <code className="mt-2 block break-all rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-700">
                              {link}
                            </code>
                          </div>

                          <button
                            type="button"
                            onClick={() => copy(link)}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-700 transition hover:bg-white"
                          >
                            <Copy className="h-4 w-4" />
                            复制
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
