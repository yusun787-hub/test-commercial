import { RefreshCcw, Share2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RadarChart from '../components/RadarChart';
import ShareModal from '../components/ShareModal';
import { calculateQuizResult } from '../lib/quiz-config';

const ANSWER_STORAGE_KEY = 'tv-character-quiz-answers';

function getStoredAnswers() {
  try {
    const raw = sessionStorage.getItem(ANSWER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<number, string>) : {};
  } catch {
    return {};
  }
}

export default function ResultPage() {
  const [showShareModal, setShowShareModal] = useState(false);
  const location = useLocation();
  const selectedMap = (location.state as { selectedMap?: Record<number, string> } | null)?.selectedMap ?? getStoredAnswers();
  const result = useMemo(() => calculateQuizResult(selectedMap), [selectedMap]);
  const { role: primaryRole, profile, similarity, answeredCount } = result;
  const archetypeDimensions = profile.dimensions;

  return (
    <div className="space-y-5 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
      {answeredCount === 0 && (
        <section className="rounded-[1.5rem] border border-pink-300/50 bg-pink-100/60 p-4 text-sm leading-6 text-pink-700 backdrop-blur-xl">
          还没有检测到本次答题记录，当前展示的是默认结果示例。想体验真实测评，请从首页重新开始答题。
        </section>
      )}

      {/* 主结果卡片 */}
      <section className="rounded-[1.5rem] border border-white/70 bg-gradient-to-br from-sky-200/50 via-white/50 to-pink-200/50 p-6 shadow-2xl shadow-sky-200/40 backdrop-blur-xl sm:rounded-[2.25rem] sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 sm:text-sm sm:tracking-[0.3em]">你的结果</p>

        <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-800 sm:text-4xl">
          你的另一半像 {primaryRole.source} 里的「{primaryRole.name}」
        </h2>

        {/* 相似度 - 胶囊文字样式 */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-pink-300/50 bg-pink-200/50 px-4 py-2">
          <span className="text-sm font-semibold text-pink-700">MATCH {similarity}%</span>
          <span className="text-xs text-slate-500">基于本次 {answeredCount || 24} 题选择</span>
        </div>

        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          {primaryRole.title}。{primaryRole.oneLiner}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
          {primaryRole.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/70 px-3 py-1.5 text-xs text-sky-700 sm:px-4 sm:py-2 sm:text-sm">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 关系原型得分 - 雷达图模块 */}
      <section className="rounded-[1.5rem] border border-white/70 bg-white/55 p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
        <p className="text-sm font-medium text-slate-700">关系原型得分</p>
        <p className="mt-1 text-xs text-slate-500">基于你的答题数据，对他在关系中的表现做多维度评估</p>
        <div className="mt-5">
          <RadarChart dimensions={archetypeDimensions} />
        </div>
      </section>

      {/* 底部两栏 */}
      <section className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <article className="rounded-[1.5rem] border border-white/70 bg-white/55 p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
          <p className="text-sm font-medium text-slate-700">他的恋爱观</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{profile.partnerView}</p>
        </article>

        <article className="rounded-[1.5rem] border border-white/70 bg-white/55 p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
          <p className="text-sm font-medium text-slate-700">你的想法</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{profile.analysis}</p>
        </article>
      </section>

      {/* 操作按钮 - 放在所有内容最后 */}
      <div className="flex flex-wrap justify-center gap-3 pb-4">
        <button
          onClick={() => setShowShareModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-pink-400 px-5 py-3 text-sm font-medium text-white transition hover:bg-pink-500"
        >
          <Share2 className="h-4 w-4" />
          生成分享图
        </button>
        <Link
          to="/quiz"
          className="inline-flex items-center gap-2 rounded-full border border-sky-300/70 bg-white/60 px-5 py-3 text-sm font-medium text-sky-700 transition hover:bg-white/90"
        >
          <RefreshCcw className="h-4 w-4" />
          再测一个人
        </Link>
      </div>

      {/* 分享弹窗 */}
      <ShareModal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        roleName={primaryRole.name}
        roleSource={primaryRole.source}
        similarity={similarity}
        dimensions={archetypeDimensions}
        loveView={profile.loveView}
      />
    </div>
  );
}
