import { useState } from "react"
import { Panel, Label, DeltaPill, PeerDot, Segmented } from "../ui"
import { AreaChart, FunnelBars, HBars } from "../charts"
import { KPIS, FUNNEL, TRAFFIC_HOURS, WINDOW_ENGAGEMENT, PEER_NOTE } from "../../data/dashboard"

export function Overview() {
  const [period, setPeriod] = useState<"Today" | "This week">("Today")
  const kpis = period === "Today" ? KPIS.today : KPIS.week
  const funnel = period === "Today" ? FUNNEL.today : FUNNEL.week

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-inter text-[22px] font-bold tracking-[-0.01em] text-[var(--app-text)]">Overview</h1>
          <p className="mt-0.5 font-inter text-[12.5px] text-[var(--app-faint)]">
            The five numbers that matter — and what to do about them.
          </p>
        </div>
        <Segmented options={["Today", "This week"] as const} value={period} onChange={setPeriod} />
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Panel key={k.id} className="group">
            <div className="flex items-start justify-between gap-2">
              <Label>{k.label}</Label>
              {k.peer && <PeerDot peer={k.peer} />}
            </div>
            <p className="mt-2.5 font-inter text-[26px] font-bold font-num leading-none tracking-[-0.01em] text-[var(--app-text)]">
              {k.value}
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <DeltaPill delta={k.delta} tone={k.deltaTone} note={`${k.deltaNote} · ${k.hint}`} />
              <span className="truncate font-inter text-[10.5px] text-[var(--app-faint)]">{k.deltaNote}</span>
            </div>
            <p className="mt-2.5 border-t border-[var(--app-line)] pt-2.5 font-inter text-[11px] leading-snug text-[var(--app-sub)]">
              {k.hint}
            </p>
          </Panel>
        ))}
      </div>

      {/* Chart + Funnel */}
      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Panel
          title="Street footfall by hour"
          action={<span className="font-inter text-[11px] font-medium text-[var(--app-faint)]">Peak 15:00 – 17:00 · staff up 2</span>}
        >
          <AreaChart data={TRAFFIC_HOURS} peaks={[{ from: "15", to: "17" }]} />
        </Panel>
        <Panel title="Continuous physical funnel" action={<Label>{period}</Label>}>
          <FunnelBars stages={funnel} />
        </Panel>
      </div>

      {/* Engagement + benchmark */}
      <div className="grid gap-5 xl:grid-cols-[1fr_1.6fr]">
        <Panel title="Window engagement breakdown">
          <HBars items={WINDOW_ENGAGEMENT} />
          <p className="mt-4 border-t border-[var(--app-line)] pt-3 font-inter text-[10.5px] text-[var(--app-faint)]">
            Peak window attention 15:00 – 17:00 · computed on the store edge device
          </p>
        </Panel>
        <Panel
          title="This week's three actions"
          action={
            <span
              className="rounded-full px-2.5 py-1 font-inter text-[10.5px] font-bold"
              style={{ background: "var(--app-gold-soft)", color: "var(--app-gold)" }}
            >
              Monday Brief · Wk 12
            </span>
          }
        >
          <ol className="flex flex-col gap-3">
            {[
              { t: "Move the Leather Island 1.5m into the window sightline", p: "High · Layout" },
              { t: "Staff up 2 for the 15:00 – 17:00 attention peak", p: "Medium · Staffing" },
              { t: "Refresh Vitrine West — deep attention fell 6pp in two weeks", p: "High · Visual" },
            ].map((a, i) => (
              <li key={a.t} className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full font-inter text-[11px] font-bold"
                  style={{ background: "var(--app-gold-soft)", color: "var(--app-gold)" }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-inter text-[13.5px] font-medium leading-snug text-[var(--app-text)]">{a.t}</p>
                  <p className="mt-0.5 font-inter text-[11px] text-[var(--app-faint)]">{a.p}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 border-t border-[var(--app-line)] pt-3 font-inter text-[10.5px] text-[var(--app-faint)]">
            {PEER_NOTE}
          </p>
        </Panel>
      </div>
    </div>
  )
}
