import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ProgressHeader from '../components/ProgressHeader';
import { sampleQuestions } from '../lib/quiz-config';

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMap, setSelectedMap] = useState<Record<number, string>>({});
  const currentQuestion = sampleQuestions[currentIndex];

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col px-4 py-4 sm:px-6 sm:py-6">
      {/* 进度条：基于当前正在看第几题 */}
      <ProgressHeader current={currentIndex + 1} total={sampleQuestions.length} />

      {/* 题卡主体 - 移动端需首屏展示完整 */}
      <section className="mt-4 flex flex-1 flex-col rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:mt-6 sm:rounded-[2rem] sm:p-6">
        {/* 题号 + 情境描述(弱化) */}
        <div className="mb-2">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 sm:text-sm sm:tracking-[0.28em]">
            第 {currentQuestion.id} 题
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-400">{currentQuestion.scene}</p>
        </div>

        {/* 问题(突出) */}
        <h2 className="text-lg font-semibold leading-snug text-white sm:text-xl">
          {currentQuestion.title}
        </h2>

        {/* 选项 */}
        <div className="mt-4 grid flex-1 content-start gap-3 sm:mt-6 sm:gap-4">
          {currentQuestion.options.map((option) => {
            const isActive = selectedMap[currentQuestion.id] === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedMap((prev) => ({ ...prev, [currentQuestion.id]: option.id }))}
                className={`rounded-2xl border p-4 text-left transition sm:rounded-3xl sm:p-5 ${
                  isActive
                    ? 'border-rose-200/40 bg-rose-200/15 shadow-lg shadow-rose-950/20'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <p className="text-sm leading-6 text-white sm:text-base sm:leading-7">{option.label}</p>
              </button>
            );
          })}
        </div>

        {/* 翻页按钮 */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4 sm:mt-6 sm:pt-6">
          <button
            type="button"
            onClick={() => setCurrentIndex((v) => Math.max(0, v - 1))}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:gap-2 sm:px-4 sm:py-3"
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            上一题
          </button>

          <span className="text-xs text-stone-500 sm:text-sm">
            {currentIndex + 1} / {sampleQuestions.length}
          </span>

          <button
            type="button"
            onClick={() => setCurrentIndex((v) => Math.min(sampleQuestions.length - 1, v + 1))}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2.5 text-sm font-medium text-stone-950 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40 sm:gap-2 sm:px-4 sm:py-3"
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
