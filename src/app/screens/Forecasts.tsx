import { LineChart as LineIcon } from "lucide-react"
import { Panel, Chip, ScreenHeader, Label } from "../ui"
import { LineChart } from "../charts"
import { FORECAST_INTEL, FORECAST, WEEKLY_HISTORY, SIMULATED_NOTE } from "../../data/dashboard"

export function Forecasts() {
  const trend = WEEKLY_HISTORY.map((w) => ({ week: w.week, value: w.stopRate }))

  return (
    <div className="flex flex-col gap-5">
      <ScreenHeader icon={LineIcon} eyebrow="Intelligence" title={FORECAST_INTEL.title} sub={FORECAST_INTEL.sub}>
        <Chip tone="gold">{FORECAST_INTEL.label}</Chip>
        <Chip tone="neutral" title={SIMULATED_NOTE}>Demo</Chip>
      </ScreenHeader>

      <div
        className="rounded-2xl border px-4 py-3.5 font-inter cosmic-text-xs leading-relaxed"
        style={{
          borderColor: "color-mix(in srgb, var(--app-gold) 35%, var(--app-line))",
          background: "color-mix(in srgb, var(--app-gold) 8%, transparent)",
          color: "var(--app-sub)",
        }}
      >
        {FORECAST_INTEL.honestBanner}
      </div>

      <Panel
        title={FORECAST.title}
        sub={FORECAST.sub}
        action={<Label>Illustrative</Label>}
      >
        <LineChart
          data={trend}
          prediction={{
            startIdx: 11,
            points: FORECAST.projected.map((p) => ({ week: p.week, value: p.value })),
          }}
          height={200}
        />
      </Panel>

      <Panel title="Prediction rows" action={<Label>Method · weeks</Label>}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-[var(--app-line)] font-inter cosmic-text-2xs uppercase tracking-[0.08em] text-[var(--app-faint)]">
                <th className="pb-2 pr-3 font-semibold">Metric</th>
                <th className="pb-2 pr-3 font-semibold">Projected</th>
                <th className="pb-2 pr-3 font-semibold">Band</th>
                <th className="pb-2 pr-3 font-semibold">Method</th>
                <th className="pb-2 font-semibold">Weeks</th>
              </tr>
            </thead>
            <tbody>
              {FORECAST_INTEL.rows.map((r) => (
                <tr key={r.metric} className="border-b border-[var(--app-line)]">
                  <td className="py-3 pr-3 font-inter cosmic-text-sm text-[var(--app-text)]">{r.metric}</td>
                  <td className="py-3 pr-3 font-num cosmic-text-sm font-semibold text-[var(--app-text)]">{r.projected}</td>
                  <td className="py-3 pr-3 font-inter cosmic-text-xs text-[var(--app-faint)]">{r.band}</td>
                  <td className="py-3 pr-3 font-inter cosmic-text-xs text-[var(--app-sub)]">{r.method}</td>
                  <td className="py-3 font-num cosmic-text-xs text-[var(--app-faint)]">{r.weeks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-inter cosmic-text-xs leading-relaxed text-[var(--app-faint)]">{FORECAST_INTEL.methods}</p>
      </Panel>
    </div>
  )
}
