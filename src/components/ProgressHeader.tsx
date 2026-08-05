interface ProgressHeaderProps {
  current: number;
  total: number;
}

export default function ProgressHeader({ current, total }: ProgressHeaderProps) {
  const progress = Math.max(0, Math.min(100, Math.round((current / total) * 100)));

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between text-sm text-stone-300">
        <span>当前进度</span>
        <span>
          第 {current} / {total} 题
        </span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-300 via-orange-300 to-violet-300 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
