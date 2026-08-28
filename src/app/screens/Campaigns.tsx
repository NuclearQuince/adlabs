import { BadgeCheck } from "lucide-react"
import { Panel, Label, Chip } from "../ui"
import { CAMPAIGNS, CAMPAIGN_TIMELINE, CAMPAIGN_VERDICT } from "../../data/dashboard"

export function Campaigns() {
  const w = 640
  const h = 200
  const padB = 26
  const vals = CAMPAIGN_TIMELINE.map((d) => d.stop)
  const min = Math.min(...vals) - 0.6
  const max = Math.max(...vals) + 0.4
  const x = (i: number) => (i / (CAMPAIGN_TIMELINE.length - 1)) * w
  const y = (v: number) => h - padB - ((v - min) / (max - min)) * (h - padB - 14)
  const pts = CAMPAIGN_TIMELINE.map((d, i) => `${x(i).toFixed(1)},${y(d.stop).toFixed(1)}`)
  const path = `M ${pts.join(" L ")}`

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-inter text-[22px] font-bold tracking-[-0.01em] text-[var(--app-text)]">Campaigns</h1>
          <p className="mt-0.5 font-inter text-[12.5px] text-[var(--app-faint)]">
            Physical A/B: what you changed in the window — and what the street did next.
          </p>
        </div>
        <Chip tone="gold">12-week arc</Chip>
      </div>

      <Panel title="Stop rate · W1 → W12" action={<Label>WINDOW EVENTS MARKED</Label>}>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label="Stop rate across 12 weeks">
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={0}
              x2={w}
              y1={14 + f * (h - padB - 14)}
              y2={14 + f * (h - padB - 14)}
              stroke="var(--app-grid)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path d={path} fill="none" stroke="var(--app-gold)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          {CAMPAIGN_TIMELINE.map((d, i) => {
            const ev = d.event ? (
              <g key={d.week}>
                <line
                  x1={x(i)}
                  x2={x(i)}
                  y1={14}
                  y2={h - padB}
                  stroke="var(--app-line-strong)"
                  strokeDasharray="3 4"
                  vectorEffect="non-scaling-stroke"
                />
                <rect x={x(i) - 26} y={2} width={52} height={16} rx={8} fill="var(--app-gold-soft)" />
                <text x={x(i)} y={13.5} textAnchor="middle" fontSize={8.5} fill="var(--app-gold)" className="font-inter" fontWeight={700}>
                  {d.week}
                </text>
              </g>
            ) : null
            return (
              <g key={d.week}>
                {ev}
                <circle cx={x(i)} cy={y(d.stop)} r={d.event ? 4.4 : 2.8} fill={d.event ? "var(--app-gold)" : "var(--app-card)"} stroke="var(--app-gold)" strokeWidth={d.event ? 0 : 1.6} />
                <title>{`${d.week} — stop rate ${d.stop}%${d.event ? ` · ${d.event}` : ""}`}</title>
              </g>
            )
          })}
          {CAMPAIGN_TIMELINE.map((d, i) =>
            i % 2 === 0 ? (
              <text key={d.week} x={x(i)} y={h - 8} textAnchor="middle" fontSize={10} fill="var(--app-faint)" className="font-inter">
                {d.week}
              </text>
            ) : null,
          )}
        </svg>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-2">
        {CAMPAIGNS.map((c) => (
          <Panel key={c.id} pad={false}>
            <div className="flex items-center justify-between gap-3 p-5 pb-0 sm:p-6 sm:pb-0">
              <div>
                <p className="font-inter text-[14px] font-semibold text-[var(--app-text)]">{c.name}</p>
                <p className="font-inter text-[11.5px] text-[var(--app-faint)]">
                  {c.week} · {c.type} · {c.window}
                </p>
              </div>
              {c.verified && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-inter text-[10.5px] font-bold"
                  style={{ background: "color-mix(in srgb, var(--app-pos) 12%, transparent)", color: "var(--app-pos)" }}
                >
                  <BadgeCheck size={11} strokeWidth={2.6} />
                  VERIFIED
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-px p-5 sm:p-6" style={{ background: "var(--app-line)" }}>
              <figure className="rounded-xl" style={{ background: "var(--app-card)" }}>
                <img src={c.imageBefore} alt={`${c.name} before`} loading="lazy" className="aspect-[4/3] w-full rounded-t-xl object-cover grayscale-[30%]" />
                <figcaption className="p-3.5">
                  <Label>Before</Label>
                  <p className="mt-1 font-inter text-xl font-bold font-num text-[var(--app-sub)]">{c.before}</p>
                </figcaption>
              </figure>
              <figure className="rounded-xl" style={{ background: "var(--app-card)" }}>
                <img src={c.imageAfter} alt={`${c.name} after`} loading="lazy" className="aspect-[4/3] w-full rounded-t-xl object-cover" />
                <figcaption className="p-3.5">
                  <Label>After</Label>
                  <p className="mt-1 font-inter text-xl font-bold font-num text-[var(--app-text)]">{c.after}</p>
                </figcaption>
              </figure>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-[var(--app-line)] p-5 sm:p-6">
              <span className="font-inter text-[12px] text-[var(--app-faint)]">{c.metricLabel}</span>
              <span className="font-inter text-[13px] font-bold font-num" style={{ color: "var(--app-pos)" }}>
                {c.uplift}
              </span>
            </div>
          </Panel>
        ))}
      </div>

      <Panel
        title="Verdict"
        action={
          <span
            className="rounded-full px-2.5 py-1 font-inter text-[10.5px] font-bold"
            style={{ background: "var(--app-gold-soft)", color: "var(--app-gold)" }}
          >
            ENGINE-GENERATED
          </span>
        }
      >
        <p className="font-inter text-[15px] leading-relaxed text-[var(--app-text)]">{CAMPAIGN_VERDICT}</p>
      </Panel>
    </div>
  )
}
