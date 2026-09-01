import { RefreshCcw, Share2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RadarChart from '../components/RadarChart';
import ShareModal from '../components/ShareModal';
import { calculateQuizResult } from '../lib/quiz-config';
import { getRoleThoughtModules } from '../lib/role-thought-modules';

const ANSWER_STORAGE_KEY = 'tv-character-quiz-answers';

type RoleTheme = {
  page: string;
  hero: string;
  card: string;
  accent: string;
  accentText: string;
  tag: string;
  shadow: string;
};

const roleThemes: Record<string, RoleTheme> = {
  'mei-changsu': { page: 'from-slate-200 via-stone-100 to-blue-100', hero: 'from-slate-300/70 via-white/60 to-blue-200/60', card: 'bg-white/60 border-slate-200/80', accent: 'bg-slate-700 hover:bg-slate-800', accentText: 'text-slate-700', tag: 'bg-slate-100/80 text-slate-700', shadow: 'shadow-slate-300/50' },
  'guo-junwang': { page: 'from-emerald-100 via-white to-rose-100', hero: 'from-emerald-200/60 via-white/70 to-rose-200/60', card: 'bg-white/60 border-emerald-100/80', accent: 'bg-emerald-500 hover:bg-emerald-600', accentText: 'text-emerald-700', tag: 'bg-emerald-50/90 text-emerald-700', shadow: 'shadow-emerald-200/50' },
  'wen-shichu': { page: 'from-teal-100 via-white to-amber-100', hero: 'from-teal-200/60 via-white/70 to-amber-200/60', card: 'bg-white/60 border-teal-100/80', accent: 'bg-teal-500 hover:bg-teal-600', accentText: 'text-teal-700', tag: 'bg-teal-50/90 text-teal-700', shadow: 'shadow-teal-200/50' },
  'jiang-defu': { page: 'from-orange-100 via-white to-sky-100', hero: 'from-orange-200/60 via-white/70 to-sky-200/60', card: 'bg-white/60 border-orange-100/80', accent: 'bg-orange-500 hover:bg-orange-600', accentText: 'text-orange-700', tag: 'bg-orange-50/90 text-orange-700', shadow: 'shadow-orange-200/50' },
  'feng-teng': { page: 'from-zinc-200 via-white to-red-100', hero: 'from-zinc-300/70 via-white/70 to-red-200/60', card: 'bg-white/60 border-zinc-200/80', accent: 'bg-zinc-800 hover:bg-zinc-900', accentText: 'text-zinc-800', tag: 'bg-zinc-100/90 text-zinc-800', shadow: 'shadow-zinc-300/50' },
  'chen-yu': { page: 'from-cyan-100 via-slate-50 to-gray-200', hero: 'from-cyan-200/50 via-white/70 to-gray-200/60', card: 'bg-white/60 border-cyan-100/80', accent: 'bg-cyan-600 hover:bg-cyan-700', accentText: 'text-cyan-700', tag: 'bg-cyan-50/90 text-cyan-700', shadow: 'shadow-cyan-200/50' },
  yongzheng: { page: 'from-yellow-100 via-stone-100 to-purple-100', hero: 'from-yellow-200/60 via-white/70 to-purple-200/60', card: 'bg-white/60 border-yellow-100/80', accent: 'bg-yellow-700 hover:bg-yellow-800', accentText: 'text-yellow-800', tag: 'bg-yellow-50/90 text-yellow-800', shadow: 'shadow-yellow-200/50' },
  'xiao-feng': { page: 'from-amber-100 via-orange-50 to-stone-200', hero: 'from-amber-200/70 via-white/70 to-stone-300/60', card: 'bg-white/60 border-amber-100/80', accent: 'bg-amber-700 hover:bg-amber-800', accentText: 'text-amber-800', tag: 'bg-amber-50/90 text-amber-800', shadow: 'shadow-amber-200/50' },
  'li-chengyin': { page: 'from-red-100 via-rose-50 to-amber-100', hero: 'from-red-200/60 via-white/70 to-amber-200/60', card: 'bg-white/60 border-red-100/80', accent: 'bg-red-600 hover:bg-red-700', accentText: 'text-red-700', tag: 'bg-red-50/90 text-red-700', shadow: 'shadow-red-200/50' },
  'gu-tingye': { page: 'from-lime-100 via-white to-stone-200', hero: 'from-lime-200/60 via-white/70 to-stone-300/60', card: 'bg-white/60 border-lime-100/80', accent: 'bg-lime-700 hover:bg-lime-800', accentText: 'text-lime-800', tag: 'bg-lime-50/90 text-lime-800', shadow: 'shadow-lime-200/50' },
  'qi-heng': { page: 'from-blue-100 via-white to-violet-100', hero: 'from-blue-200/60 via-white/70 to-violet-200/60', card: 'bg-white/60 border-blue-100/80', accent: 'bg-blue-500 hover:bg-blue-600', accentText: 'text-blue-700', tag: 'bg-blue-50/90 text-blue-700', shadow: 'shadow-blue-200/50' },
  'he-hongwen': { page: 'from-green-100 via-white to-teal-100', hero: 'from-green-200/60 via-white/70 to-teal-200/60', card: 'bg-white/60 border-green-100/80', accent: 'bg-green-500 hover:bg-green-600', accentText: 'text-green-700', tag: 'bg-green-50/90 text-green-700', shadow: 'shadow-green-200/50' },
  'sheng-zhangbai': { page: 'from-stone-100 via-white to-indigo-100', hero: 'from-stone-200/60 via-white/70 to-indigo-200/60', card: 'bg-white/60 border-stone-200/80', accent: 'bg-indigo-700 hover:bg-indigo-800', accentText: 'text-indigo-700', tag: 'bg-indigo-50/90 text-indigo-700', shadow: 'shadow-indigo-200/50' },
  'liang-han': { page: 'from-fuchsia-100 via-white to-rose-100', hero: 'from-fuchsia-200/60 via-white/70 to-rose-200/60', card: 'bg-white/60 border-fuchsia-100/80', accent: 'bg-fuchsia-500 hover:bg-fuchsia-600', accentText: 'text-fuchsia-700', tag: 'bg-fuchsia-50/90 text-fuchsia-700', shadow: 'shadow-fuchsia-200/50' },
  'dongfang-qingcang': { page: 'from-purple-200 via-slate-100 to-indigo-200', hero: 'from-purple-300/70 via-white/60 to-indigo-300/70', card: 'bg-white/60 border-purple-100/80', accent: 'bg-purple-700 hover:bg-purple-800', accentText: 'text-purple-800', tag: 'bg-purple-50/90 text-purple-800', shadow: 'shadow-purple-300/50' },
  'fan-xian': { page: 'from-emerald-100 via-white to-cyan-100', hero: 'from-emerald-200/60 via-white/70 to-cyan-200/60', card: 'bg-white/60 border-emerald-100/80', accent: 'bg-emerald-600 hover:bg-emerald-700', accentText: 'text-emerald-700', tag: 'bg-emerald-50/90 text-emerald-700', shadow: 'shadow-emerald-200/50' },
  'wang-kuan': { page: 'from-sky-100 via-white to-blue-100', hero: 'from-sky-200/60 via-white/70 to-blue-200/60', card: 'bg-white/60 border-sky-100/80', accent: 'bg-sky-600 hover:bg-sky-700', accentText: 'text-sky-700', tag: 'bg-sky-50/90 text-sky-700', shadow: 'shadow-sky-200/50' },
  yongqi: { page: 'from-rose-100 via-white to-orange-100', hero: 'from-rose-200/60 via-white/70 to-orange-200/60', card: 'bg-white/60 border-rose-100/80', accent: 'bg-rose-500 hover:bg-rose-600', accentText: 'text-rose-700', tag: 'bg-rose-50/90 text-rose-700', shadow: 'shadow-rose-200/50' },
  'er-kang': { page: 'from-pink-100 via-white to-red-100', hero: 'from-pink-200/60 via-white/70 to-red-200/60', card: 'bg-white/60 border-pink-100/80', accent: 'bg-pink-500 hover:bg-pink-600', accentText: 'text-pink-700', tag: 'bg-pink-50/90 text-pink-700', shadow: 'shadow-pink-200/50' },
  'li-daren': { page: 'from-sky-100 via-white to-amber-100', hero: 'from-sky-200/60 via-white/70 to-amber-200/60', card: 'bg-white/60 border-sky-100/80', accent: 'bg-sky-500 hover:bg-sky-600', accentText: 'text-sky-700', tag: 'bg-sky-50/90 text-sky-700', shadow: 'shadow-sky-200/50' },
  'xie-zhiyao': { page: 'from-emerald-100 via-white to-yellow-100', hero: 'from-emerald-200/60 via-white/70 to-yellow-200/60', card: 'bg-white/60 border-emerald-100/80', accent: 'bg-emerald-500 hover:bg-emerald-600', accentText: 'text-emerald-700', tag: 'bg-emerald-50/90 text-emerald-700', shadow: 'shadow-emerald-200/50' },
  'meng-dan': { page: 'from-rose-100 via-white to-purple-100', hero: 'from-rose-200/60 via-white/70 to-purple-200/60', card: 'bg-white/60 border-rose-100/80', accent: 'bg-rose-600 hover:bg-rose-700', accentText: 'text-rose-700', tag: 'bg-rose-50/90 text-rose-700', shadow: 'shadow-rose-200/50' },
};

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
  const theme = roleThemes[primaryRole.id] ?? roleThemes['er-kang'];
  const thoughtModules = getRoleThoughtModules(primaryRole);

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

        {/* 剧情演绎 */}
        <section className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}>
          <p className="text-sm font-medium text-slate-700">剧情演绎</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{primaryRole.dramaScene}</p>
        </section>

        {/* 恋爱观与心理分析 */}
        <section className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}>
          <p className="text-sm font-medium text-slate-700">他的恋爱观</p>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">{primaryRole.partnerView}</p>
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
