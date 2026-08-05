import { Download, X } from 'lucide-react';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  roleName: string;
  roleSource: string;
  similarity: number;
}

export default function ShareModal({ open, onClose, roleName, roleSource, similarity }: ShareModalProps) {
  if (!open) return null;

  const handleDownload = () => {
    // TODO: 后续接 html2canvas 真实生成图片并下载
    alert('下载功能将在接入 html2canvas 后可用');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-sm rounded-[1.5rem] border border-white/10 bg-stone-900 p-5 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-stone-300">分享图预览</p>
          <button onClick={onClose} className="rounded-full p-1.5 text-stone-400 transition hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 预览图区域 */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-rose-200/10 via-stone-950/20 to-violet-200/10">
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <p className="text-xs uppercase tracking-widest text-stone-400">蓝瞳测评局</p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              你的另一半像「{roleName}」
            </h3>
            <p className="mt-1 text-sm text-stone-300">{roleSource}</p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-rose-200/30 bg-rose-200/10 px-3 py-1.5">
              <span className="text-xs font-medium text-rose-100">MATCH {similarity}%</span>
            </div>
          </div>
        </div>

        {/* 下载按钮 */}
        <button
          onClick={handleDownload}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-rose-100"
        >
          <Download className="h-4 w-4" />
          下载图片到本地
        </button>
      </div>
    </div>
  );
}
