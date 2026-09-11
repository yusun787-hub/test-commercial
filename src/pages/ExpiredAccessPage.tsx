import { Sparkles, WifiOff } from 'lucide-react';

type Props = {
  reason?: 'missing' | 'invalid' | 'expired' | 'error';
};

export default function ExpiredAccessPage({ reason }: Props) {
  const isNetworkError = reason === 'error';

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
      <section className="w-full max-w-2xl rounded-[1.5rem] border border-white/70 bg-gradient-to-br from-sky-200/50 via-white/50 to-pink-200/50 p-6 text-center shadow-2xl shadow-sky-200/40 backdrop-blur-xl sm:rounded-[2rem] sm:p-10">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-pink-300/50 bg-pink-200/50 px-4 py-2 text-sm text-pink-700">
          {isNetworkError ? <WifiOff className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          {isNetworkError ? '网络异常' : '访问受限'}
        </div>

        {isNetworkError ? (
          <>
            <h1 className="mt-6 text-2xl font-semibold leading-snug text-slate-800 sm:text-3xl">
              当前网络无法连接验证服务
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              我们需要访问 Supabase 来校验你的 token，但你当前网络环境可能无法解析或访问
              <span className="break-all"> wrxptduwsnivppotjtox.supabase.co </span>
              （常见于 DNS 污染/跨境网络不稳定/公司网络策略）。
            </p>
            <p className="mt-3 text-base leading-7 text-slate-600">
              你可以尝试：切换网络（4G/热点）、更换 DNS（如 1.1.1.1 / 8.8.8.8）、或稍后重试。
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-6 text-2xl font-semibold leading-snug text-slate-800 sm:text-3xl">
              宝贝，您的链接过期啦！请联系蓝瞳测评局进行免费续期哦
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              如果你刚刚打开的是专属链接，可以让对方重新给你发送一次最新链接～
            </p>
          </>
        )}
      </section>
    </div>
  );
}
