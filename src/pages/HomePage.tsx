import { ArrowRight, BadgeCheck, Clapperboard, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pageMeta, roleHighlights } from '../lib/quiz-config';

export default function HomePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-rose-200/15 via-stone-950/10 to-violet-200/10 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-rose-200/10 px-4 py-2 text-sm text-rose-100">
          <Sparkles className="h-4 w-4" />
          React + Vite 初版骨架已搭好
        </div>
        <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-white lg:text-5xl">
          {pageMeta.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-200/85">{pageMeta.subtitle}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ['15 道题', '剧情式情景题'],
            ['22 角色', '结果映射角色池'],
            ['4 页面', '封面、答题、过渡、结果'],
          ].map(([value, label]) => (
            <div key={value} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="mt-2 text-sm text-stone-300">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-rose-100"
          >
            开始查看答题页
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/result"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            先看结果页结构
          </Link>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-orange-200/15 p-3 text-orange-100">
              <Clapperboard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-stone-400">首版重点</p>
              <p className="text-lg font-semibold text-white">先把页面骨架跑通</p>
            </div>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-300">
            <li>• 已预留 15 题、22 角色、结果页扩展位</li>
            <li>• 下一步适合接入题库 JSON 与角色映射配置</li>
            <li>• 再下一步再接 Supabase 记录结果与埋点</li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-sm text-stone-400">角色池预览</p>
          <div className="mt-4 space-y-3">
            {roleHighlights.map((role) => (
              <div key={role.id} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{role.name}</p>
                    <p className="text-sm text-stone-400">{role.source}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-stone-200">{role.archetype}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-300">{role.oneLiner}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-emerald-200">
            <BadgeCheck className="h-4 w-4" />
            PRD 里的角色标签表已可继续转成配置文件
          </div>
        </div>
      </aside>
    </div>
  );
}
