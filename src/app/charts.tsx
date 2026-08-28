export function Sparkline({ data, tone = "gold" }: { data: number[]; tone?: "gold" | "pos" | "neg" }) {
  const w = 120
  const h = 34
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - 3 - ((d - min) / span) * (h - 6)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const color = tone === "pos" ? "var(--app-pos)" : tone === "neg" ? "var(--app-neg)" : "var(--app-gold)"
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible" aria-hidden>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r={2.4} fill={color} />
    </svg>
  )
}

export function AreaChart({
  data,
  peaks,
  height = 210,
}: {
  data: { h: string; v: number }[]
  peaks?: { from: string; to: string }[]
  height?: number
}) {
  const w = 660
  const h = height
  const padB = 26
  const max = Math.max(...data.map((d) => d.v)) * 1.15
  const x = (i: number) => (i / (data.length - 1)) * w
  const y = (v: number) => h - padB - (v / max) * (h - padB - 12)

  const pts = data.map((d, i) => [x(i), y(d.v)] as const)
  let path = `M ${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i]
    const [x1, y1] = pts[i + 1]
    const mx = (x0 + x1) / 2
    path += ` C ${mx},${y0} ${mx},${y1} ${x1},${y1}`
  }
  const area = `${path} L ${w},${h - padB} L 0,${h - padB} Z`

  const peakRects = (peaks ?? []).map((p) => {
    const i0 = data.findIndex((d) => d.h === p.from)
    const i1 = data.findIndex((d) => d.h === p.to)
    if (i0 < 0 || i1 < 0) return null
    return (
      <rect
        key={p.from + p.to}
        x={x(i0)}
        y={10}
        width={x(i1) - x(i0)}
        height={h - padB - 10}
        fill="var(--app-gold-soft)"
      />
    )
  })

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-auto w-full"
      role="img"
      aria-label="Street footfall by hour"
    >
      <defs>
        <linearGradient id="areaGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--app-gold)" stopOpacity={0.22} />
          <stop offset="100%" stopColor="var(--app-gold)" stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={0}
          x2={w}
          y1={10 + f * (h - padB - 10)}
          y2={10 + f * (h - padB - 10)}
          stroke="var(--app-grid)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {peakRects}
      <path d={area} fill="url(#areaGold)" />
      <path
        d={path}
        fill="none"
        stroke="var(--app-gold)"
        strokeWidth={2.2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {data.map((d, i) => (
        <g key={d.h}>
          <circle cx={x(i)} cy={y(d.v)} r={2.6} fill="var(--app-gold)" />
          <title>{`${d.h}:00 — ${d.v.toLocaleString("en-US")} passers-by`}</title>
        </g>
      ))}
      {[0, 3, 6, 9, 12].map((i) => (
        <text
          key={i}
          x={x(i)}
          y={h - 8}
          textAnchor={i === 0 ? "start" : i === 12 ? "end" : "middle"}
          fontSize={10}
          fill="var(--app-faint)"
          className="font-inter"
        >
          {data[i].h}:00
        </text>
      ))}
    </svg>
  )
}

export function FunnelBars({
  stages,
}: {
  stages: { stage: string; value: number; rate: string; label: string }[]
}) {
  const max = stages[0].value
  return (
    <div className="flex flex-col gap-2.5">
      {stages.map((s, i) => {
        const w = Math.max((s.value / max) * 100, 6)
        return (
          <div key={s.stage} className="group">
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="font-inter text-[12.5px] font-semibold text-[var(--app-text)]">
                {s.stage}
                <span className="ml-2 font-normal text-[var(--app-faint)]">{s.label}</span>
              </span>
              <span className="font-inter text-[12.5px] font-semibold font-num text-[var(--app-text)]">
                {s.value.toLocaleString("en-US")}
                <span className="ml-2 text-[var(--app-faint)]">{s.rate}</span>
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ background: "var(--app-grid)" }}>
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out"
                style={{
                  width: `${w}%`,
                  background: `color-mix(in srgb, var(--app-gold) ${100 - i * 14}%, var(--app-card))`,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function HeatGrid({
  zones,
}: {
  zones: { code: string; name: string; traffic: number; dwell: string; heat: number; note?: string; flag?: string }[]
}) {
  return (
    <div className="grid grid-cols-5 gap-2.5">
      {zones.map((z) => (
        <div
          key={z.code}
          title={`${z.name} — ${z.traffic}% traffic · dwell ${z.dwell}${z.note ? ` · ${z.note}` : ""}${
            z.flag ? ` · ⚠ ${z.flag}` : ""
          }`}
          className={`group relative aspect-square cursor-default rounded-xl border p-2 transition-transform duration-150 hover:-translate-y-0.5 ${
            z.flag ? "border-[var(--app-neg)]" : "border-[var(--app-line)]"
          }`}
          style={{
            background: `color-mix(in srgb, var(--app-gold) ${Math.round(z.heat * 72)}%, var(--app-card))`,
          }}
        >
          <span className="font-mono text-[10px] tracking-[0.08em] text-[var(--app-sub)]">{z.code}</span>
          <div className="mt-1 font-inter text-[15px] font-bold font-num leading-none text-[var(--app-text)]">
            {z.traffic}%
          </div>
          {z.flag && (
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "var(--app-neg)" }} />
          )}
        </div>
      ))}
    </div>
  )
}

export function HBars({
  items,
}: {
  items: { label: string; pct: number; sub?: string }[]
}) {
  const max = Math.max(...items.map((i) => i.pct))
  return (
    <div className="flex flex-col gap-3.5">
      {items.map((i) => (
        <div key={i.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="font-inter text-[12.5px] text-[var(--app-text)]">{i.label}</span>
            <span className="font-inter text-[12.5px] font-semibold font-num text-[var(--app-text)]">{i.pct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--app-grid)" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${(i.pct / max) * 100}%`, background: "var(--app-gold)" }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
