import { ArrowRight, Clapperboard, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pageMeta } from '../lib/quiz-config';

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
      <section className="w-full max-w-2xl rounded-[1.5rem] border border-white/70 bg-gradient-to-br from-sky-200/50 via-white/50 to-pink-200/50 p-6 shadow-2xl shadow-sky-200/40 backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-300/50 bg-pink-200/50 px-3 py-1.5 text-xs text-pink-700 sm:px-4 sm:py-2 sm:text-sm">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          情感关系小测试
        </div>

        <h1 className="mt-5 text-2xl font-semibold leading-tight text-slate-800 sm:mt-6 sm:text-4xl lg:text-5xl">
          {pageMeta.title}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 sm:mt-4 sm:text-lg sm:leading-8">
          {pageMeta.subtitle}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 rounded-full bg-pink-400 px-5 py-3 text-sm font-medium text-white transition hover:bg-pink-500"
          >
            开始测试
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/result"
            className="inline-flex items-center gap-2 rounded-full border border-sky-300/70 bg-white/60 px-5 py-3 text-sm font-medium text-sky-700 transition hover:bg-white/90"
          >
            预览结果页
          </Link>
        </div>
      </section>

      {/* 开发信息提示 - 仅桌面端展示 */}
      <div className="mt-6 hidden w-full max-w-2xl rounded-[1.5rem] border border-white/70 bg-white/55 p-5 backdrop-blur-xl sm:block sm:rounded-[2rem] sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-sky-200/60 p-2.5 text-sky-700">
            <Clapperboard className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-500">首版重点</p>
            <p className="text-base font-semibold text-slate-800">页面骨架 + 交互跑通</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
          <li>• 当前版本：已接入完整 24 题题库与真实结果计算</li>
          <li>• 下一步：接 Supabase 记录结果与埋点</li>
        </ul>
      </div>
    </div>
  );
}
