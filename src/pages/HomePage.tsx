import { ArrowRight, Sparkles } from 'lucide-react';
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

        <div className="mt-5 space-y-2 rounded-2xl border border-white/70 bg-white/45 px-4 py-3 text-sm leading-6 text-slate-700 sm:mt-6 sm:px-5 sm:py-4 sm:text-base">
          <p>用 24 道剧情题，读懂 TA 在恋爱里的真实模式。</p>
          <p>对照真实影视角色拆解，并给出能直接用在日常相处中的建议。</p>
        </div>

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
    </div>
  );
}
