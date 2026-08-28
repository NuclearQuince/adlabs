import { TriangleAlert } from "lucide-react"
import { Panel, Label } from "../ui"
import { HeatGrid, HBars } from "../charts"
import { ZONES } from "../../data/dashboard"

export function Zones() {
  const sorted = [...ZONES].sort((a, b) => b.traffic - a.traffic).slice(0, 6)
  const flagged = ZONES.filter((z) => z.flag)

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-inter text-[22px] font-bold tracking-[-0.01em] text-[var(--app-text)]">Zones</h1>
        <p className="mt-0.5 font-inter text-[12.5px] text-[var(--app-faint)]">
          Traffic share per zone · hover any cell for dwell and notes. Red dot = flagged.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="Floor heat · today" action={<Label>10 ZONES</Label>}>
          <HeatGrid zones={ZONES} />
          <div className="mt-4 flex items-center gap-3">
            <span className="font-inter text-[10.5px] text-[var(--app-faint)]">Cold</span>
            <div
              className="h-1.5 flex-1 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, var(--app-card), color-mix(in srgb, var(--app-gold) 72%, var(--app-card)))",
              }}
            />
            <span className="font-inter text-[10.5px] text-[var(--app-faint)]">Hot</span>
          </div>
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel title="Attention share">
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
                  <p className="font-inter text-[13.5px] font-semibold text-[var(--app-text)]">
                    Zone {z.code} — {z.name}
                  </p>
                  <p className="mt-1 font-inter text-[12.5px] leading-relaxed text-[var(--app-sub)]">{z.flag}</p>
                  <p className="mt-2 font-inter text-[11.5px] text-[var(--app-faint)]">
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
