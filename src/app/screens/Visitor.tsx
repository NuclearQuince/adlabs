import { Users } from "lucide-react"
import { Panel, Label, Chip, ScreenHeader } from "../ui"
import { DayHourHeatmap } from "../charts"
import {
  VISITOR_INTEL, VISITOR_FLOW, DAY_HOUR_HEATMAP, SIMULATED_NOTE, MATURITY,
} from "../../data/dashboard"

export function Visitor() {
  const d = VISITOR_INTEL.cohorts

  return (
    <div className="flex flex-col gap-5">
      <ScreenHeader
        icon={Users}
        eyebrow="Intelligence"
        title={VISITOR_INTEL.title}
        sub={VISITOR_INTEL.sub}
      >
        <Chip tone="live">{MATURITY.live}</Chip>
        <Chip tone="neutral" title={SIMULATED_NOTE}>Demo</Chip>
      </ScreenHeader>

      <div className="grid gap-5 md:grid-cols-3">
        <Panel title="Age cohorts" sub="k-anonymous · min 10 per bucket">
          <ul className="space-y-2.5">
            {d.ages.map((a) => (
              <li key={a.band} className="flex items-center justify-between gap-2">
                <span className="font-inter cosmic-text-sm text-[var(--app-sub)]">{a.band}</span>
                <span className="font-num cosmic-text-sm font-bold text-[var(--app-text)]">{a.pct}%</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Solo vs group" sub="Proximity geometry · no faces">
          <p className="font-num cosmic-text-3xl font-bold text-[var(--app-text)]">{d.dynamics.solo}%</p>
          <p className="mt-1 font-inter cosmic-text-xs text-[var(--app-faint)]">Solo · {d.dynamics.pair}% pair/group</p>
          <p className="mt-4 font-inter cosmic-text-xs text-[var(--app-sub)]">Peak cohort window {d.peak}</p>
        </Panel>
        <Panel title="Gender mix" sub="Aggregate only">
          <p className="font-inter cosmic-text-sm text-[var(--app-sub)]">
            {d.gender.female}% · {d.gender.male}% (presentation order · k-anon)
          </p>
          <p className="mt-3 font-inter cosmic-text-xs leading-relaxed text-[var(--app-faint)]">{d.note}</p>
        </Panel>
      </div>

      <Panel
        title="Dwell journeys"
        sub={VISITOR_FLOW.sub}
        action={<Chip tone="gold">{VISITOR_INTEL.maturityPaths}</Chip>}
      >
        <ul className="space-y-3">
          {VISITOR_INTEL.journeys.map((j) => (
            <li key={j.path} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--app-line)] px-4 py-3">
              <div>
                <p className="font-inter cosmic-text-sm font-semibold text-[var(--app-text)]">{j.path}</p>
                <p className="mt-0.5 font-inter cosmic-text-xs text-[var(--app-faint)]">{j.note}</p>
              </div>
              <span className="font-num cosmic-text-lg font-bold text-[var(--app-accent)]">{j.share}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-inter cosmic-text-xs leading-relaxed text-[var(--app-faint)]">{VISITOR_INTEL.privacy}</p>
      </Panel>

      <Panel title="Visit intensity · day × hour" action={<Label>Aggregate heat</Label>}>
        <DayHourHeatmap data={DAY_HOUR_HEATMAP} />
      </Panel>
    </div>
  )
}
