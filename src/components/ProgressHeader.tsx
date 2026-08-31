interface ProgressHeaderProps {
  current: number;
  total: number;
}

export default function ProgressHeader({ current, total }: ProgressHeaderProps) {
  const progress = Math.max(0, Math.min(100, Math.round((current / total) * 100)));

  return (
    <div className="rounded-3xl border border-white/70 bg-white/55 p-5 shadow-2xl shadow-sky-200/40 backdrop-blur-xl">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>当前进度</span>
        <span>
          第 {current} / {total} 题
        </span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-sky-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-300 via-sky-200 to-pink-300 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
