import { TriangleAlert, Map } from "lucide-react"
import { Panel, Label, ScreenHeader, Chip } from "../ui"
import { HeatGrid, HBars } from "../charts"
import { ZONES, TENANT, SIMULATED_NOTE } from "../../data/dashboard"

export function Zones() {
  const sorted = [...ZONES].sort((a, b) => b.traffic - a.traffic).slice(0, 6)
  const flagged = ZONES.filter((z) => z.flag)

  return (
    <div className="flex flex-col gap-5">
      <ScreenHeader
        icon={Map}
        eyebrow="Live now"
        title="Floor zones"
        sub="Traffic share and dwell by zone — spatial meaning from the floor plan."
      >
        <Chip tone="live">Live</Chip>
        <Chip tone="neutral" title={SIMULATED_NOTE}>Demo</Chip>
      </ScreenHeader>

      {/* Spatial anchor */}
      <Panel pad={false} className="overflow-hidden">
        <div className="relative">
          <img
            src="/images/in-store-zones.jpg"
            alt={`${TENANT.store} — in-store zones`}
            loading="lazy"
            className="aspect-[21/9] w-full object-cover sm:aspect-[2.6/1]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[var(--app-bg)] via-[var(--app-bg)]/40 to-transparent" />
          <div className="absolute left-0 right-0 top-4 flex flex-wrap gap-2 px-5">
            <Chip tone="live">Cam 02 · floor</Chip>
            <Chip tone="neutral">{TENANT.store}</Chip>
          </div>
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-2 p-4 sm:grid-cols-4 sm:p-5">
            {sorted.slice(0, 4).map((z) => (
              <div
                key={z.code}
                className="rounded-xl border border-[var(--app-line)] bg-[var(--app-card)]/92 px-3 py-2.5 backdrop-blur-sm"
              >
                <p className="font-mono cosmic-text-2xs text-[var(--app-accent)]">{z.code}</p>
                <p className="mt-0.5 truncate font-inter cosmic-text-xs font-semibold text-[var(--app-text)]">{z.name}</p>
                <p className="mt-0.5 font-num cosmic-text-xs text-[var(--app-faint)]">
                  {z.traffic}% traffic · {z.dwell}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Floor heat · today"
          action={<Label>{ZONES.length} zones</Label>}
          info="Each cell = floor zone · colour = traffic share · red dot = flagged. Hover for dwell."
        >
          <HeatGrid zones={ZONES} />
          <div className="mt-4 flex items-center gap-3">
            <span className="font-inter cosmic-text-2xs text-[var(--app-faint)]">Cold</span>
            <div
              className="h-1.5 flex-1 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, var(--app-card), color-mix(in srgb, var(--app-gold) 72%, var(--app-card)))",
              }}
            />
            <span className="font-inter cosmic-text-2xs text-[var(--app-faint)]">Hot</span>
          </div>
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel title="Attention share" info="Where footfall actually goes.">
            <HBars items={sorted.map((z) => ({ label: z.name, pct: z.traffic }))} />
          </Panel>

          {flagged.map((z) => (
            <Panel key={z.code} pad={false}>
              <div className="flex items-start gap-3 p-5">
                <span
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full"
                  style={{ background: "color-mix(in srgb, var(--app-neg) 12%, transparent)", color: "var(--app-neg)" }}
                >
                  <TriangleAlert size={15} strokeWidth={2.3} />
                </span>
                <div>
                  <p className="font-inter cosmic-text-sm font-semibold text-[var(--app-text)]">
                    Zone {z.code} — {z.name}
                  </p>
                  <p className="mt-1 font-inter cosmic-text-xs leading-relaxed text-[var(--app-sub)]">{z.flag}</p>
                  <p className="mt-2 font-inter cosmic-text-xs text-[var(--app-faint)]">
                    Suggested move: relight at 18:00 and re-measure for 7 days.
                  </p>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  )
}
