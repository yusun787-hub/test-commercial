interface RadarChartProps {
  dimensions: { label: string; value: number; roleAvg: number; description: string }[];
}

export default function RadarChart({ dimensions }: RadarChartProps) {
  const count = dimensions.length;
  const svgSize = 300;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const radius = 92;
  const labelRadius = radius + 34;

  // 计算多边形顶点坐标
  const getPoint = (index: number, scale: number, baseRadius = radius) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    return {
      x: cx + baseRadius * scale * Math.cos(angle),
      y: cy + baseRadius * scale * Math.sin(angle),
      angle,
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

  // 找出最高分和最低分维度，分别标注本次测评的优势与劣势
  const maxIndex = dimensions.reduce((maxI, d, i, arr) => (d.value > arr[maxI].value ? i : maxI), 0);
  const minIndex = dimensions.reduce((minI, d, i, arr) => (d.value < arr[minI].value ? i : minI), 0);
  const maxPoint = dataPoints[maxIndex];
  const minPoint = dataPoints[minIndex];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      {/* SVG 雷达图 */}
      <div className="flex w-full flex-col items-center sm:w-auto">
        <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="h-64 w-64 shrink-0 overflow-visible sm:h-72 sm:w-72">
          {/* 网格 */}
          {gridLevels.map((level) => {
            const points = Array.from({ length: count }, (_, i) => getPoint(i, level));
            const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
            return <path key={level} d={path} fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1" />;
          })}

          {/* 轴线 */}
          {dimensions.map((dimension, i) => {
            const p = getPoint(i, 1);
            return <line key={dimension.label} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(56,189,248,0.2)" strokeWidth="1" />;
          })}

          {/* 测评结果区域 */}
          <path d={dataPath} fill="rgba(244,114,182,0.25)" stroke="rgba(236,72,153,0.8)" strokeWidth="2" />

          {/* 角色均值参考线 */}
          <path d={avgPath} fill="none" stroke="rgba(56,189,248,0.85)" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* 数据点 */}
          {dataPoints.map((p, i) => (
            <circle
              key={dimensions[i]?.label ?? `${p.x}-${p.y}`}
              cx={p.x}
              cy={p.y}
              r={i === maxIndex ? '6' : '4'}
              fill={i === maxIndex ? '#ec4899' : '#f472b6'}
            />
          ))}

          {/* 最优势与最劣势维度标注 */}
          <g>
            <circle cx={maxPoint.x} cy={maxPoint.y} r="11" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.75" />
            {minIndex !== maxIndex && (
              <circle cx={minPoint.x} cy={minPoint.y} r="11" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.75" />
            )}
          </g>

          {/* 标签 */}
          {dimensions.map((d, i) => {
            const labelPoint = getPoint(i, 1, labelRadius);
            const cos = Math.cos(labelPoint.angle);
            const sin = Math.sin(labelPoint.angle);
            const isNearVertical = Math.abs(cos) < 0.35;
            const isLeftSide = cos < -0.35;
            const labelX = labelPoint.x + (isNearVertical ? 0 : cos > 0 ? 12 : -12);
            const labelY = labelPoint.y + (sin > 0.35 ? 10 : sin < -0.35 ? -10 : 0);
            const textAnchor = isNearVertical ? 'middle' : isLeftSide ? 'end' : 'start';

            return (
              <g key={d.label}>
                <rect
                  x={labelX - (isNearVertical ? 28 : isLeftSide ? 52 : 4)}
                  y={labelY - 11}
                  width="56"
                  height="22"
                  rx="11"
                  fill="rgba(255,255,255,0.85)"
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  fill="#475569"
                  fontSize="12"
                  fontWeight="500"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 图例 */}
        <div className="mt-2 flex items-center gap-4 text-[10px] text-slate-500 sm:text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-pink-400" />
            测评结果
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0 w-3 border-t-2 border-dashed border-sky-400" />
            角色均值
          </span>
        </div>
      </div>

      {/* 维度解读 */}
      <div className="w-full flex-1 space-y-2.5">
        {dimensions.map((d, i) => (
          <div
            key={d.label}
            className={`rounded-xl p-3 ${
              i === maxIndex
                ? 'border border-pink-300/50 bg-pink-100/60'
                : i === minIndex
                  ? 'border border-slate-200/50 bg-slate-100/60'
                  : 'bg-white/60'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-slate-700">{d.label}</span>
              <span className={`text-xs font-medium ${i === maxIndex ? 'text-pink-600' : 'text-sky-600'}`}>
                {d.value * 10}%
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-500">{d.description}</p>
            {i === maxIndex ? (
              <p className="mt-1 text-xs font-medium text-pink-600">🌟 这是他最突出的优势项</p>
            ) : i === minIndex ? (
              <p className="mt-1 text-xs font-medium text-slate-500">📉 这是他相对较弱的维度</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
