import { ArrowLeft, ArrowRight, Drama, HeartCrack } from 'lucide-react';
import { useMemo, useState } from 'react';
import ProgressHeader from '../components/ProgressHeader';
import { sampleQuestions } from '../lib/quiz-config';

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMap, setSelectedMap] = useState<Record<number, string>>({});
  const currentQuestion = sampleQuestions[currentIndex];

  const answeredCount = useMemo(() => Object.keys(selectedMap).length || 1, [selectedMap]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <ProgressHeader current={Math.min(answeredCount, sampleQuestions.length)} total={sampleQuestions.length} />

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-300">
            <Drama className="h-4 w-4" />
            题目骨架示意
          </div>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            当前先放了 3 道示例题，方便我们把题卡结构、进度条和按钮状态跑通。后面把完整 15 题 JSON 补进来即可。
          </p>
        </div>
      </div>

      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-rose-100/70">scene {currentQuestion.id}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{currentQuestion.title}</h2>
            <p className="mt-2 text-stone-300">{currentQuestion.scene}</p>
          </div>
          <div className="hidden rounded-3xl border border-white/10 bg-black/10 p-4 text-center sm:block">
            <p className="text-xs text-stone-400">当前方向</p>
            <p className="mt-2 text-sm font-medium text-white">{selectedMap[currentQuestion.id] ?? '未选择'}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {currentQuestion.options.map((option) => {
            const isActive = selectedMap[currentQuestion.id] === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedMap((prev) => ({ ...prev, [currentQuestion.id]: option.id }))}
                className={`rounded-3xl border p-5 text-left transition ${
                  isActive
                    ? 'border-rose-200/40 bg-rose-200/15 shadow-lg shadow-rose-950/20'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-base leading-7 text-white">{option.label}</p>
                  <span className="rounded-full bg-black/20 px-3 py-1 text-xs text-stone-300">{option.archetype}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => setCurrentIndex((value) => Math.max(0, value - 1))}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            上一题
          </button>

          <div className="hidden items-center gap-2 text-sm text-stone-400 sm:inline-flex">
            <HeartCrack className="h-4 w-4" />
            这里后面会接完整 15 题与角色映射逻辑
          </div>

          <button
            type="button"
            onClick={() => setCurrentIndex((value) => Math.min(sampleQuestions.length - 1, value + 1))}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-stone-950 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentIndex === sampleQuestions.length - 1}
          >
            下一题
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
