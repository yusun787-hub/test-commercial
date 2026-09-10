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

// 从 theme.accent 中提取纯背景色类（去掉 hover: 部分），用作标题左侧竖线
function extractAccentBar(accent: string) {
  return accent
    .split(' ')
    .filter((cls) => !cls.startsWith('hover:'))
    .join(' ');
}

// 通用：把带 \n\n 的正文拆成多段落渲染，段间保留清晰间距
function Paragraphs({
  text,
  size = 'sm',
}: {
  text: string;
  size?: 'sm' | 'base';
}) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const textCls =
    size === 'base'
      ? 'text-sm leading-7 text-slate-600 sm:text-base sm:leading-8'
      : 'text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8';

  return (
    <div className="space-y-3 sm:space-y-4">
      {paragraphs.map((p, idx) => (
        <p key={idx} className={`whitespace-pre-line ${textCls}`}>
          {p}
        </p>
      ))}
    </div>
  );
}

// 模块标题（带主题色左竖线 + 更强视觉权重）
function SectionHeader({
  title,
  description,
  accentBar,
  accentText,
}: {
  title: string;
  description?: string;
  accentBar: string;
  accentText: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`mt-1.5 block h-5 w-1 shrink-0 rounded-full sm:h-6 ${accentBar}`}
        aria-hidden
      />
      <div className="min-w-0">
        <h2 className={`text-lg font-semibold leading-tight sm:text-xl ${accentText}`}>
          {title}
        </h2>
        {description ? (
          <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

// 内容卡片：统一移动端内边距和圆角
function ModuleCard({
  title,
  body,
  accentText,
}: {
  title: string;
  body: string;
  accentText: string;
}) {
  return (
    <article className="rounded-[1.25rem] border border-white/70 bg-white/55 p-5 shadow-sm sm:p-6">
      <h3 className={`text-base font-semibold sm:text-lg ${accentText}`}>{title}</h3>
      <div className="mt-4">
        <Paragraphs text={body} size="base" />
      </div>
    </article>
  );
}

export default function ResultPage() {
  const [showShareModal, setShowShareModal] = useState(false);
  const location = useLocation();
  const selectedMap = (location.state as { selectedMap?: Record<number, string> } | null)?.selectedMap ?? getStoredAnswers();
  const result = useMemo(() => calculateQuizResult(selectedMap), [selectedMap]);
  const { role: primaryRole, profile, similarity, answeredCount } = result;
  const dimensions = primaryRole.dimensionOverrides ?? profile.dimensions;
  const theme = roleThemes[primaryRole.id] ?? defaultRoleTheme;
  const accentBar = extractAccentBar(theme.accent);
  const thoughtModules = getRoleThoughtModules(primaryRole);
  const loveViewModules = getRoleLoveViewModules(primaryRole);
  const adviceModules = getRoleAdviceModules(primaryRole);

  return (
    <div
      className={`-mx-4 -my-4 min-h-screen bg-gradient-to-br ${theme.page} px-4 py-4 transition-colors duration-500 sm:-mx-6 sm:-my-6 sm:px-6 sm:py-6`}
    >
      {/* 英雄区 + 数据区（贴近） */}
      <div className="space-y-5 sm:space-y-6">
        {answeredCount === 0 && (
          <section
            className={`rounded-[1.5rem] border ${theme.card} p-4 text-sm leading-6 ${theme.accentText} backdrop-blur-xl`}
          >
            还没有检测到本次答题记录，当前展示的是默认结果示例。想体验真实测评，请从首页重新开始答题。
          </section>
        )}

        {/* 主结果卡片（英雄区） */}
        <section
          className={`rounded-[1.5rem] border border-white/70 bg-gradient-to-br ${theme.hero} p-6 shadow-2xl ${theme.shadow} backdrop-blur-xl sm:rounded-[2.25rem] sm:p-8`}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 sm:text-sm sm:tracking-[0.3em]">
            你的结果
          </p>

          <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-800 sm:text-4xl">
            你的另一半像 {primaryRole.source} 里的「{primaryRole.name}」
          </h2>

          {/* 相似度 - 胶囊文字样式 */}
          <div
            className={`mt-4 inline-flex items-center gap-2 rounded-full border border-white/70 ${theme.tag} px-4 py-2`}
          >
            <span className={`text-sm font-semibold ${theme.accentText}`}>
              MATCH {similarity}%
            </span>
            <span className="text-xs text-slate-500">
              基于本次 {answeredCount || 24} 题选择
            </span>
          </div>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {primaryRole.title}。{primaryRole.oneLiner}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            {primaryRole.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm ${theme.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 数据区：关系原型得分 - 雷达图 */}
        <section
          className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}
        >
          <SectionHeader
            title="关系原型得分"
            description="基于你的答题数据，对他在关系中的表现做多维度评估"
            accentBar={accentBar}
            accentText={theme.accentText}
          />
          <div className="mt-5 sm:mt-6">
            <RadarChart dimensions={dimensions} />
          </div>
        </section>
      </div>

      {/* 内容区：角色金句 / 他的恋爱观 / 你的想法 / 相处建议 —— 移动端拉开明显间距 */}
      <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-14">
        {/* 角色金句 */}
        <section
          className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}
        >
          <SectionHeader
            title="角色金句"
            accentBar={accentBar}
            accentText={theme.accentText}
          />
          <blockquote className="mt-5 rounded-[1.25rem] border border-white/70 bg-white/55 p-5 shadow-sm sm:p-6">
            <p className="text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
              「{primaryRole.iconicQuote}」
            </p>
          </blockquote>
        </section>

        {/* 他的恋爱观 */}
        <section
          className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}
        >
          <SectionHeader
            title="他的恋爱观"
            description="用生活化的方式，说清楚他表达爱、面对亲密、处理边界时的真实样子。"
            accentBar={accentBar}
            accentText={theme.accentText}
          />
          <div className="mt-6 grid gap-5 sm:gap-6">
            {loveViewModules.map((module) => (
              <ModuleCard
                key={module.title}
                title={module.title}
                body={module.body}
                accentText={theme.accentText}
              />
            ))}
          </div>
        </section>

        {/* 你的想法 */}
        <section
          className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}
        >
          <SectionHeader
            title="你的想法"
            description="从你被打动的那一刻讲起，聊一聊你真正想要的，以及你其实不能接受的部分。"
            accentBar={accentBar}
            accentText={theme.accentText}
          />
          <div className="mt-6 grid gap-5 sm:gap-6">
            {thoughtModules.map((module) => (
              <ModuleCard
                key={module.title}
                title={module.title}
                body={module.body}
                accentText={theme.accentText}
              />
            ))}
          </div>
        </section>

        {/* 相处建议 */}
        <section
          className={`rounded-[1.5rem] border ${theme.card} p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6`}
        >
          <SectionHeader
            title="相处建议"
            accentBar={accentBar}
            accentText={theme.accentText}
          />
          <div className="mt-6 grid gap-5 sm:gap-6">
            {adviceModules.map((module) => (
              <ModuleCard
                key={module.title}
                title={module.title}
                body={module.body}
                accentText={theme.accentText}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 操作区：与内容区拉开留白 */}
      <div className="mt-12 flex flex-wrap justify-center gap-3 pb-6 sm:mt-16 sm:pb-8">
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
        dimensions={dimensions}
        loveView={profile.loveView}
      />
    </div>
  );
}
