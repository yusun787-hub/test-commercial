import { BadgeHelp, Download, RefreshCcw, Share2 } from 'lucide-react';
import { roleHighlights } from '../lib/quiz-config';

const primaryRole = roleHighlights[1];
const secondaryRole = roleHighlights[0];

export default function ResultPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-violet-200/15 via-stone-950/10 to-rose-200/15 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-300">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">主结果示意</span>
          <span className="rounded-full border border-rose-200/20 bg-rose-200/10 px-4 py-2 text-rose-100">支持双角色结果</span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-400">result hero</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-white">
              你的另一半像 {primaryRole.source} 里的「{primaryRole.name}」
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-200/85">{primaryRole.title}。{primaryRole.oneLiner}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {primaryRole.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-rose-100">
                <Share2 className="h-4 w-4" />
                生成分享图
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                <Download className="h-4 w-4" />
                下载图片
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                <RefreshCcw className="h-4 w-4" />
                再测一个人
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/10 p-6">
            <p className="text-sm text-stone-400">副角色倾向</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-lg font-semibold text-white">{secondaryRole.name}</p>
              <p className="mt-2 text-sm text-stone-300">{secondaryRole.oneLiner}</p>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-stone-400">关系提醒</p>
              <p className="mt-2 text-sm leading-7 text-stone-300">{primaryRole.riskHint}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-sm text-stone-400">你为什么测到他</p>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            这里后面会接入：高分题命中说明、关系原型得分、对应剧情行为解释。当前先把结果页模块结构搭出来。
          </p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-sm text-stone-400">剧中关系参照</p>
          <p className="mt-4 text-sm leading-7 text-stone-300">这里后面会放“他在剧里是怎么处理亲密关系的”，让结果更有画面感。</p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 text-sm text-stone-400">
            <BadgeHelp className="h-4 w-4" />
            结果页扩展位
          </div>
          <p className="mt-4 text-sm leading-7 text-stone-300">这里预留给相似角色、角色池入口和后续转化模块。首版先保证分享体验干净。</p>
        </article>
      </section>
    </div>
  );
}
