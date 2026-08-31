import { ArrowRight, Clapperboard, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pageMeta } from '../lib/quiz-config';

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
      <section className="w-full max-w-2xl rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-rose-200/15 via-stone-950/10 to-violet-200/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-rose-200/10 px-3 py-1.5 text-xs text-rose-100 sm:px-4 sm:py-2 sm:text-sm">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          情感关系小测试
        </div>

        <h1 className="mt-5 text-2xl font-semibold leading-tight text-white sm:mt-6 sm:text-4xl lg:text-5xl">
          {pageMeta.title}
        </h1>
        <p className="mt-3 text-base leading-7 text-stone-200/85 sm:mt-4 sm:text-lg sm:leading-8">
          {pageMeta.subtitle}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-rose-100"
          >
            开始测试
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/result"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            预览结果页
          </Link>
        </div>
      </section>

      {/* 开发信息提示 - 仅桌面端展示 */}
      <div className="mt-6 hidden w-full max-w-2xl rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:block sm:rounded-[2rem] sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-200/15 p-2.5 text-orange-100">
            <Clapperboard className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-stone-400">首版重点</p>
            <p className="text-base font-semibold text-white">页面骨架 + 交互跑通</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-stone-300">
          <li>• 当前版本：已接入完整 24 题题库与真实结果计算</li>
          <li>• 下一步：接 Supabase 记录结果与埋点</li>
        </ul>
      </div>
    </div>
  );
}
