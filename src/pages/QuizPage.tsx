import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressHeader from '../components/ProgressHeader';
import { sampleQuestions } from '../lib/quiz-config';

const ANSWER_STORAGE_KEY = 'tv-character-quiz-answers';

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMap, setSelectedMap] = useState<Record<number, string>>({});
  const currentQuestion = sampleQuestions[currentIndex];
  const currentAnswer = selectedMap[currentQuestion.id];
  const isLastQuestion = currentIndex === sampleQuestions.length - 1;
  const navigate = useNavigate();

  const handleNext = () => {
    if (!currentAnswer) return;

    if (isLastQuestion) {
      sessionStorage.setItem(ANSWER_STORAGE_KEY, JSON.stringify(selectedMap));
      navigate('/loading', { state: { selectedMap } });
    } else {
      setCurrentIndex((v) => v + 1);
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col px-4 py-4 sm:px-6 sm:py-6">
      {/* 进度条：基于当前正在看第几题 */}
      <ProgressHeader current={currentIndex + 1} total={sampleQuestions.length} />

      {/* 题卡主体 - 移动端需首屏展示完整 */}
      <section className="mt-4 flex flex-1 flex-col rounded-[1.5rem] border border-white/70 bg-gradient-to-br from-sky-100/70 to-pink-100/60 p-5 shadow-2xl shadow-sky-200/40 backdrop-blur-xl sm:mt-6 sm:rounded-[2rem] sm:p-6">
        {/* 题号 + 情境描述(弱化) */}
        <div className="mb-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 sm:text-sm sm:tracking-[0.28em]">
            第 {currentQuestion.id} 题
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">{currentQuestion.scene}</p>
        </div>

        {/* 问题(突出) */}
        <h2 className="text-lg font-semibold leading-snug text-slate-800 sm:text-xl">
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
                    ? 'border-pink-300/70 bg-pink-200/50 shadow-lg shadow-pink-200/40'
                    : 'border-sky-200/60 bg-white/60 hover:border-sky-300/80 hover:bg-white/90'
                }`}
              >
                <p className="text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">{option.label}</p>
              </button>
            );
          })}
        </div>

        {/* 翻页按钮 */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-sky-200/60 pt-4 sm:mt-6 sm:pt-6">
          <button
            type="button"
            onClick={() => setCurrentIndex((v) => Math.max(0, v - 1))}
            className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/70 bg-white/60 px-3 py-2.5 text-sm text-sky-700 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 sm:gap-2 sm:px-4 sm:py-3"
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            上一题
          </button>

          <span className="text-xs text-slate-400 sm:text-sm">
            {currentIndex + 1} / {sampleQuestions.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={!currentAnswer}
            className="inline-flex items-center gap-1.5 rounded-full bg-pink-400 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-40 sm:gap-2 sm:px-4 sm:py-3"
          >
            {isLastQuestion ? (
              <>
                揭晓答案
                <Sparkles className="h-4 w-4" />
              </>
            ) : (
              <>
                下一题
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
