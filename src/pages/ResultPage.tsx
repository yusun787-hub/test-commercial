import { BadgeHelp, RefreshCcw, Share2 } from 'lucide-react';
import { useState } from 'react';
import RadarChart from '../components/RadarChart';
import ShareModal from '../components/ShareModal';
import { roleHighlights } from '../lib/quiz-config';

const primaryRole = roleHighlights[1]; // 示例主角色

// 模拟相似度（70~100），后续接入真实计算
const similarityScore = 83;

// 模拟关系原型维度数据
const archetypeDimensions = [
  { label: '情绪价值', value: 4, description: '不太会主动提供情绪支持，多用道理回应你的感受。' },
  { label: '责任感', value: 6, description: '事业上有担当，但在关系细节中容易掉线。' },
  { label: '边界感', value: 3, description: '与外界关系暧昧，给人不够明确的距离信号。' },
  { label: '稳定性', value: 5, description: '情绪整体平稳，但压力大时可能选择回避。' },
  { label: '浪漫感', value: 7, description: '偶尔会制造仪式感，但持续性一般。' },
  { label: '现实感', value: 8, description: '对生活规划清晰，做事讲效率和体面。' },
];

export default function ResultPage() {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <div className="space-y-5 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
      {/* 主结果卡片 */}
      <section className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-violet-200/15 via-stone-950/10 to-rose-200/15 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[2.25rem] sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-400 sm:text-sm sm:tracking-[0.3em]">你的结果</p>

        <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
          你的另一半像 {primaryRole.source} 里的「{primaryRole.name}」
        </h2>

        {/* 相似度 - 胶囊文字样式 */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-200/30 bg-rose-200/10 px-4 py-2">
          <span className="text-sm font-semibold text-rose-100">MATCH {similarityScore}%</span>
          <span className="text-xs text-stone-400">based on this session</span>
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

      {/* 操作按钮 - 放在所有内容最后 */}
      <div className="flex flex-wrap justify-center gap-3 pb-4">
        <button
          onClick={() => setShowShareModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-rose-100"
        >
          <Share2 className="h-4 w-4" />
          生成分享图
        </button>
        <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
          <RefreshCcw className="h-4 w-4" />
          再测一个人
        </button>
      </div>

      {/* 分享弹窗 */}
      <ShareModal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        roleName={primaryRole.name}
        roleSource={primaryRole.source}
        similarity={similarityScore}
        dimensions={archetypeDimensions}
        loveView="他习惯用解决问题的方式回应你的情绪，表面体面周全，但在需要真正暴露脆弱或承担冲突时，更倾向于退一步维护秩序。爱的方式偏理性、偏安排，浪漫是有的，但持续性和主动性不够稳定。"
      />
    </div>
  );
}
