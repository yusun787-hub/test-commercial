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
        <section className="rounded-[1.5rem] border border-amber-200/20 bg-amber-200/10 p-4 text-sm leading-6 text-amber-50 backdrop-blur-xl">
          还没有检测到本次答题记录，当前展示的是默认结果示例。想体验真实测评，请从首页重新开始答题。
        </section>
      )}

      {/* 主结果卡片 */}
      <section className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-violet-200/15 via-stone-950/10 to-rose-200/15 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[2.25rem] sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-400 sm:text-sm sm:tracking-[0.3em]">你的结果</p>

        <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
          你的另一半像 {primaryRole.source} 里的「{primaryRole.name}」
        </h2>

        {/* 相似度 - 胶囊文字样式 */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-200/30 bg-rose-200/10 px-4 py-2">
          <span className="text-sm font-semibold text-rose-100">MATCH {similarity}%</span>
          <span className="text-xs text-stone-400">基于本次 {answeredCount || 24} 题选择</span>
        </div>

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
      </section>

      {/* 关系原型得分 - 雷达图模块 */}
      <section className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
        <p className="text-sm font-medium text-stone-300">关系原型得分</p>
        <p className="mt-1 text-xs text-stone-500">基于你的答题数据，对 TA 在关系中的表现做多维度评估</p>
        <div className="mt-5">
          <RadarChart dimensions={archetypeDimensions} />
        </div>
      </section>

      {/* 底部两栏 */}
      <section className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
          <p className="text-sm font-medium text-stone-300">结果解析</p>
          <p className="mt-3 text-sm leading-7 text-stone-400">{profile.analysis}</p>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
          <p className="text-sm font-medium text-stone-300">TA的恋爱观</p>
          <p className="mt-3 text-sm leading-7 text-stone-400">{profile.partnerView}</p>
        </article>
      </section>

      {/* 操作按钮 - 放在所有内容最后 */}
      <div className="flex flex-wrap justify-center gap-3 pb-4">
        <button
          onClick={() => setShowShareModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-rose-100"
        >
          <Share2 className="h-4 w-4" />
          生成分享图
        </button>
        <Link
          to="/quiz"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
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
