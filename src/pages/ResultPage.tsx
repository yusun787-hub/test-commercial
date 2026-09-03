import { RefreshCcw, Share2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RadarChart from '../components/RadarChart';
import ShareModal from '../components/ShareModal';
import { calculateQuizResult } from '../lib/quiz-config';
import { getRoleAdviceModules } from '../lib/role-advice-modules';
import { getRoleThoughtModules } from '../lib/role-thought-modules';
import { getRoleLoveViewModules } from '../lib/role-love-view-modules';
import { defaultRoleTheme, roleThemes } from '../lib/role-themes';

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
  const theme = roleThemes[primaryRole.id] ?? defaultRoleTheme;
  const thoughtModules = getRoleThoughtModules(primaryRole);
  const loveViewModules = getRoleLoveViewModules(primaryRole);
  const adviceModules = getRoleAdviceModules(primaryRole);

  return (
    <div className={`-mx-4 -my-4 min-h-screen bg-gradient-to-br ${theme.page} px-4 py-4 transition-colors duration-500 sm:-mx-6 sm:-my-6 sm:px-6 sm:py-6`}>
      <div className="space-y-5 sm:space-y-6">
        {answeredCount === 0 && (
          <section className={`rounded-[1.5rem] border ${theme.card} p-4 text-sm leading-6 ${theme.accentText} backdrop-blur-xl`}>
            还没有检测到本次答题记录，当前展示的是默认结果示例。想体验真实测评，请从首页重新开始答题。
          </section>
        )}

        {/* 主结果卡片 */}
        <section className={`rounded-[1.5rem] border border-white/70 bg-gradient-to-br ${theme.hero} p-6 shadow-2xl ${theme.shadow} backdrop-blur-xl sm:rounded-[2.25rem] sm:p-8`}>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 sm:text-sm sm:tracking-[0.3em]">你的结果</p>

          <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-800 sm:text-4xl">
            你的另一半像 {primaryRole.source} 里的「{primaryRole.name}」
          </h2>

          {/* 相似度 - 胶囊文字样式 */}
          <div className={`mt-4 inline-flex items-center gap-2 rounded-full border border-white/70 ${theme.tag} px-4 py-2`}>
            <span className={`text-sm font-semibold ${theme.accentText}`}>MATCH {similarity}%</span>
            <span className="text-xs text-slate-500">基于本次 {answeredCount || 24} 题选择</span>
          </div>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {primaryRole.title}。{primaryRole.oneLiner}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            {primaryRole.tags.map((tag) => (
              <span key={tag} className={`rounded-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm ${theme.tag}`}>
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 关系原型得分 - 雷达图模块 */}
        <section className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}>
          <p className="text-sm font-medium text-slate-700">关系原型得分</p>
          <p className="mt-1 text-xs text-slate-500">基于你的答题数据，对他在关系中的表现做多维度评估</p>
          <div className="mt-5">
            <RadarChart dimensions={archetypeDimensions} />
          </div>
        </section>

        {/* 角色金句 */}
        <section className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}>
          <p className="text-sm font-medium text-slate-700">角色金句</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{primaryRole.iconicQuote}</p>
        </section>

        {/* 恋爱观与心理分析 */}
        <section className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}>
          <p className="text-sm font-medium text-slate-700">他的恋爱观</p>
          <p className="mt-1 text-xs text-slate-500">结合识人术、依恋理论、原型心理学、五种爱的语言、沟通风格与人格投射，拆解他的关系底层逻辑。</p>
          <div className="mt-5 grid gap-4">
            {loveViewModules.map((module) => (
              <article key={module.title} className="rounded-[1.25rem] border border-white/70 bg-white/45 p-4 sm:p-5">
                <h3 className={`text-base font-semibold ${theme.accentText}`}>{module.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{module.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}>
          <p className="text-sm font-medium text-slate-700">你的想法</p>
          <p className="mt-1 text-xs text-slate-500">结合依恋理论、斯滕伯格爱情三角论、Five Love Languages 与投射效应，拆解你被这个角色打动的深层心理。</p>
          <div className="mt-5 grid gap-4">
            {thoughtModules.map((module) => (
              <article key={module.title} className="rounded-[1.25rem] border border-white/70 bg-white/45 p-4 sm:p-5">
                <h3 className={`text-base font-semibold ${theme.accentText}`}>{module.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{module.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 相处建议 */}
        <section className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}>
          <p className="text-sm font-medium text-slate-700">相处建议</p>
          <p className="mt-1 text-xs text-slate-500">结合心理学分析，以及他的恋爱观与你的偏好，给出 5 条有温度的相处思路。</p>
          <div className="mt-5 grid gap-4">
            {adviceModules.map((module) => (
              <article key={module.title} className="rounded-[1.25rem] border border-white/70 bg-white/45 p-4 sm:p-5">
                <h3 className={`text-base font-semibold ${theme.accentText}`}>{module.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{module.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 操作按钮 - 放在所有内容最后 */}
        <div className="flex flex-wrap justify-center gap-3 pb-4">
          <button
            onClick={() => setShowShareModal(true)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition ${theme.accent}`}
          >
            <Share2 className="h-4 w-4" />
            生成分享图
          </button>
          <Link
            to="/quiz"
            className={`inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-5 py-3 text-sm font-medium transition hover:bg-white/90 ${theme.accentText}`}
          >
            <RefreshCcw className="h-4 w-4" />
            再测一个人
          </Link>
        </div>

        {/* 分享弹窗 */}
        <ShareModal
          open={showShareModal}
          onClose={() => setShowShareModal(false)}
          roleId={primaryRole.id}
          roleName={primaryRole.name}
          roleSource={primaryRole.source}
          similarity={similarity}
          dimensions={archetypeDimensions}
          loveView={profile.loveView}
        />
      </div>
    </div>
  );
}
