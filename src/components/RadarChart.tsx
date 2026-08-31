interface RadarChartProps {
  dimensions: { label: string; value: number; roleAvg: number; description: string }[];
}

export default function RadarChart({ dimensions }: RadarChartProps) {
  const count = dimensions.length;
  const cx = 120;
  const cy = 120;
  const radius = 90;

  // 计算多边形顶点坐标
  const getPoint = (index: number, scale: number) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    return {
      x: cx + radius * scale * Math.cos(angle),
      y: cy + radius * scale * Math.sin(angle),
    };
  };

  // 背景网格层级
  const gridLevels = [0.25, 0.5, 0.75, 1];

  // 测评结果多边形路径
  const dataPoints = dimensions.map((d, i) => getPoint(i, d.value / 10));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // 角色均值参考线（该角色各维度的固定基准分，非当次测评计算得出）
  const avgPoints = dimensions.map((d, i) => getPoint(i, d.roleAvg / 10));
  const avgPath = avgPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // 找出最高分维度，作为本次测评的最优势维度
  const maxIndex = dimensions.reduce((maxI, d, i, arr) => (d.value > arr[maxI].value ? i : maxI), 0);
  const maxPoint = dataPoints[maxIndex];
  const maxDimension = dimensions[maxIndex];

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
      {/* SVG 雷达图 */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 240 240" className="h-48 w-48 shrink-0 sm:h-56 sm:w-56">
          {/* 网格 */}
          {gridLevels.map((level) => {
            const points = Array.from({ length: count }, (_, i) => getPoint(i, level));
            const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
            return <path key={level} d={path} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
          })}

          {/* 轴线 */}
          {dimensions.map((_, i) => {
            const p = getPoint(i, 1);
            return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
          })}

          {/* 测评结果区域 */}
          <path d={dataPath} fill="rgba(244,114,182,0.2)" stroke="rgba(244,114,182,0.7)" strokeWidth="2" />

          {/* 角色均值参考线 */}
          <path d={avgPath} fill="none" stroke="rgba(148,163,184,0.8)" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* 数据点 */}
          {dataPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={i === maxIndex ? '6' : '4'} fill={i === maxIndex ? '#fbbf24' : '#f472b6'} />
          ))}

          {/* 最优势维度标注 */}
          <g>
            <circle cx={maxPoint.x} cy={maxPoint.y} r="11" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.75" />
            <text
              x={maxPoint.x}
              y={Math.max(14, maxPoint.y - 16)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-amber-200 text-[9px] font-semibold sm:text-[10px]"
            >
              最优势 · {maxDimension.label}
            </text>
          </g>

          {/* 标签 */}
          {dimensions.map((d, i) => {
            const labelPoint = getPoint(i, 1.2);
            return (
              <text
                key={i}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-stone-300 text-[9px] sm:text-[10px]"
              >
                {d.label}
              </text>
            );
          })}
        </svg>

        {/* 图例 */}
        <div className="mt-2 flex items-center gap-4 text-[10px] text-stone-400 sm:text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-300" />
            测评结果
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0 w-3 border-t-2 border-dashed border-slate-400" />
            角色均值
          </span>
        </div>
      </div>

      {/* 维度解读 */}
      <div className="flex-1 space-y-2.5">
        {dimensions.map((d, i) => (
          <div key={d.label} className={`rounded-xl p-3 ${i === maxIndex ? 'border border-amber-400/30 bg-amber-400/10' : 'bg-white/5'}`}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-white">{d.label}</span>
              <span className={`text-xs font-medium ${i === maxIndex ? 'text-amber-300' : 'text-rose-200'}`}>
                {d.value * 10}%
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-400">{d.description}</p>
            {i === maxIndex && (
              <p className="mt-1 text-xs font-medium text-amber-300">🌟 这是 TA 最突出的优势项</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
