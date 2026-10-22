import { Building2 } from "lucide-react"
import { Panel, Chip, ScreenHeader, Label } from "../ui"
import { OccupancyGauge } from "../Business"
import { STORE_INTEL, SIMULATED_NOTE, MATURITY, ZONE_METRIC_NOTE } from "../../data/dashboard"

export function StoreIntel() {
  return (
    <div className="flex flex-col gap-5">
      <ScreenHeader
        icon={Building2}
        eyebrow="Intelligence"
        title={STORE_INTEL.title}
        sub={STORE_INTEL.sub}
      >
        <Chip tone="live">{MATURITY.live}</Chip>
        <Chip tone="neutral" title={SIMULATED_NOTE}>Demo</Chip>
      </ScreenHeader>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <OccupancyGauge />
          <p className="mt-2 px-1 font-inter cosmic-text-xs leading-relaxed text-[var(--app-faint)]">
            {STORE_INTEL.consensusNote}
          </p>
        </div>
        <Panel title="Staffing windows" sub="What you can do: match floor count to peaks">
          <ul className="space-y-3">
            {STORE_INTEL.staffing.map((s) => (
              <li key={s.window} className="rounded-xl border border-[var(--app-line)] px-4 py-3">
                <p className="font-num cosmic-text-sm font-semibold text-[var(--app-text)]">{s.window}</p>
                <p className="mt-1 font-inter cosmic-text-xs text-[var(--app-accent)]">{s.need}</p>
                <p className="mt-0.5 font-inter cosmic-text-xs text-[var(--app-faint)]">{s.note}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Under-lit / dead zones" sub={ZONE_METRIC_NOTE} action={<Label>Act</Label>}>
        <ul className="space-y-3">
          {STORE_INTEL.deadZones.map((z) => (
            <li
              key={z.code}
              className="flex flex-wrap items-start justify-between gap-2 rounded-xl border border-[var(--app-line)] px-4 py-3"
            >
              <div>
                <p className="font-mono cosmic-text-2xs text-[var(--app-accent)]">{z.code}</p>
                <p className="mt-0.5 font-inter cosmic-text-sm font-semibold text-[var(--app-text)]">{z.name}</p>
                <p className="mt-1 font-inter cosmic-text-xs text-[var(--app-sub)]">
                  {z.flag ?? z.note ?? `${z.traffic}% entered · heat ${z.heat}`}
                </p>
                <p className="mt-2 font-inter cosmic-text-xs text-[var(--app-accent)]">
                  What you can do: relight / add anchor; re-measure 7 days
                </p>
              </div>
              <span className="font-num cosmic-text-sm font-bold text-[var(--app-text)]">{z.traffic}% entered</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
