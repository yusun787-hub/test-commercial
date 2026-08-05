import { BadgeHelp, Download, Image, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { roleHighlights } from '../lib/quiz-config';

const primaryRole = roleHighlights[1]; // 示例主角色

// 模拟相似度（70~100），后续接入真实计算
const similarityScore = 86;

export default function ResultPage() {
  const [shareImageReady, setShareImageReady] = useState(false);

  const handleGenerateShareImage = () => {
    // TODO: 后续接 html2canvas / dom-to-image 生成真实截图
    setShareImageReady(true);
  };

  const handleDownloadImage = () => {
    // TODO: 后续接真实下载逻辑
    alert('下载功能将在接入 html2canvas 后可用');
  };

  return (
    <div className="space-y-5 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
      {/* 主结果卡片 */}
      <section className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-violet-200/15 via-stone-950/10 to-rose-200/15 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[2.25rem] sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-400 sm:text-sm sm:tracking-[0.3em]">你的结果</p>

        <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
          你的另一半像 {primaryRole.source} 里的「{primaryRole.name}」
        </h2>

        {/* 相似度展示 */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-300 to-violet-300 transition-all"
              style={{ width: `${similarityScore}%` }}
            />
          </div>
          <span className="text-lg font-semibold text-rose-100">{similarityScore}%</span>
        </div>
        <p className="mt-1 text-xs text-stone-400">相似度</p>

        <p className="mt-4 text-base leading-7 text-stone-200/85 sm:text-lg sm:leading-8">
          {primaryRole.title}。{primaryRole.oneLiner}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
          {primaryRole.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white sm:px-4 sm:py-2 sm:text-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={handleGenerateShareImage}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-stone-950 transition hover:bg-rose-100 sm:px-5 sm:py-3"
          >
            <Image className="h-4 w-4" />
            生成分享图
          </button>
          <button
            onClick={handleDownloadImage}
            disabled={!shareImageReady}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:py-3"
          >
            <Download className="h-4 w-4" />
            下载图片
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 sm:px-5 sm:py-3">
            <RefreshCcw className="h-4 w-4" />
            再测一个人
          </button>
        </div>

        {/* 分享图预览区 */}
        {shareImageReady && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-stone-400">分享图预览（示意）</p>
            <div className="mt-2 flex h-48 items-center justify-center rounded-xl bg-gradient-to-br from-rose-200/10 to-violet-200/10">
              <p className="text-sm text-stone-300">分享图将在此处生成预览</p>
            </div>
          </div>
        )}
      </section>

      {/* 底部三栏 */}
      <section className="grid gap-4 sm:gap-6 sm:grid-cols-3">
        <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
          <p className="text-sm font-medium text-stone-300">结果解析</p>
          <p className="mt-3 text-sm leading-7 text-stone-400">
            这里后面会接入：高分题命中说明、关系原型得分、对应剧情行为解释。当前先把结果页模块结构搭出来。
          </p>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
          <p className="text-sm font-medium text-stone-300">TA的恋爱观</p>
          <p className="mt-3 text-sm leading-7 text-stone-400">这里后面会放"他在剧里是怎么处理亲密关系的"，让结果更有画面感。</p>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-stone-300">
            <BadgeHelp className="h-4 w-4" />
            继续探索
          </div>
          <p className="mt-3 text-sm leading-7 text-stone-400">这里预留给相似角色、角色池入口和后续转化模块。首版先保证分享体验干净。</p>
        </article>
      </section>
    </div>
  );
}
