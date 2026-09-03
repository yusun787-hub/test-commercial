import { Download, X } from 'lucide-react';
import { defaultRoleTheme, roleThemes, type RoleTheme } from '../lib/role-themes';

interface Dimension {
  label: string;
  value: number;
  roleAvg: number;
  description: string;
}

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  roleId: string;
  roleName: string;
  roleSource: string;
  similarity: number;
  dimensions: Dimension[];
  loveView: string;
}

// 迷你雷达图 - 专用于分享图
function MiniRadar({ dimensions, theme }: { dimensions: Dimension[]; theme: RoleTheme }) {
  const count = dimensions.length;
  const cx = 80;
  const cy = 80;
  const radius = 60;

  const getPoint = (index: number, scale: number) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    return { x: cx + radius * scale * Math.cos(angle), y: cy + radius * scale * Math.sin(angle) };
  };

  const gridLevels = [0.5, 1];
  const dataPoints = dimensions.map((d, i) => getPoint(i, d.value / 10));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // 角色均值参考线（固定基准分，非当次测评计算得出）
  const avgPoints = dimensions.map((d, i) => getPoint(i, d.roleAvg / 10));
  const avgPath = avgPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 160 160" className="h-32 w-32">
      {gridLevels.map((level) => {
        const points = Array.from({ length: count }, (_, i) => getPoint(i, level));
        const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return <path key={level} d={path} fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />;
      })}
      {dimensions.map((_, i) => {
        const p = getPoint(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(56,189,248,0.2)" strokeWidth="1" />;
      })}
      <path d={dataPath} fill={theme.radarFill} stroke={theme.radar} strokeWidth="1.5" />
      <path d={avgPath} fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="1" strokeDasharray="3 2" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={theme.radar} />
      ))}
      {dimensions.map((d, i) => {
        const lp = getPoint(i, 1.3);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" className="fill-slate-500 text-[8px]">
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

export default function ShareModal({ open, onClose, roleId, roleName, roleSource, similarity, dimensions, loveView }: ShareModalProps) {
  const theme = roleThemes[roleId] ?? defaultRoleTheme;

  if (!open) return null;

  const handleDownload = () => {
    // TODO: 后续接 html2canvas 真实生成图片并下载
    alert('下载功能将在接入 html2canvas 后可用');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-[1.5rem] border border-white/70 bg-white p-5 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">分享图预览</p>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 分享图内容区 */}
        <div className={`mt-4 overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br ${theme.hero} p-5`}>
          {/* 品牌 + 主结果 */}
          <p className="text-center text-[10px] uppercase tracking-widest text-slate-400">蓝瞳测评局</p>
          <h3 className="mt-2 text-center text-lg font-semibold text-slate-800">
            你的另一半像「{roleName}」
          </h3>
          <p className="mt-0.5 text-center text-xs text-slate-500">{roleSource}</p>
          <div className="mt-3 flex justify-center">
            <span className={`inline-flex items-center gap-1.5 rounded-full border border-white/70 px-3 py-1 ${theme.tag}`}>
              <span className={`text-xs font-medium ${theme.accentText}`}>MATCH {similarity}%</span>
            </span>
          </div>

          {/* 雷达图 */}
          <div className="mt-4 flex flex-col items-center">
            <MiniRadar dimensions={dimensions} theme={theme} />
            <div className="mt-1.5 flex items-center gap-3 text-[9px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.radar }} />
                测评结果
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-0 w-2.5 border-t border-dashed border-sky-400" />
                角色均值
              </span>
            </div>
          </div>

          {/* 维度得分简表 */}
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {dimensions.map((d) => (
              <div key={d.label} className="rounded-lg bg-white/70 px-2 py-1.5 text-center">
                <p className="text-[10px] text-slate-500">{d.label}</p>
                <p className={`text-xs font-semibold ${theme.accentText}`}>{d.value * 10}%</p>
              </div>
            ))}
          </div>

          {/* 他的恋爱观 */}
          <div className="mt-4 rounded-xl bg-white/70 p-3">
            <p className="text-[10px] font-medium text-slate-500">他的恋爱观</p>
            <p className="mt-1.5 text-xs leading-5 text-slate-600">{loveView}</p>
          </div>

          {/* 底部水印 */}
          <p className="mt-4 text-center text-[9px] text-slate-400">扫码测测你的另一半是谁 · 蓝瞳测评局</p>
        </div>

        {/* 下载按钮 */}
        <button
          onClick={handleDownload}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition ${theme.accent}`}
        >
          <Download className="h-4 w-4" />
          下载图片到本地
        </button>
      </div>
    </div>
  );
}
