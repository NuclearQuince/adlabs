import { ShoppingBag } from "lucide-react"
import { Panel, Label, Chip, ScreenHeader } from "../ui"
import { FunnelBars } from "../charts"
import { FUNNEL, RETAIL_INTEL, CAMPAIGNS, SIMULATED_NOTE, MATURITY } from "../../data/dashboard"
import { AnnotatedImage } from "../../components/AnnotatedImage"

export function Retail() {
  const c = RETAIL_INTEL.campaign
  const camp = CAMPAIGNS[0]

  return (
    <div className="flex flex-col gap-5">
      <ScreenHeader
        icon={ShoppingBag}
        eyebrow="Intelligence"
        title={RETAIL_INTEL.title}
        sub={RETAIL_INTEL.sub}
      >
        <Chip tone="live">{MATURITY.live}</Chip>
        <Chip tone="neutral" title={SIMULATED_NOTE}>Demo</Chip>
      </ScreenHeader>

      <Panel title="Physical funnel · this week" sub={RETAIL_INTEL.funnelNote} action={<Label>Pass → Engage</Label>}>
        <FunnelBars stages={FUNNEL.week} />
      </Panel>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Peak windows" info="From entry / stop rollups — staffing follows the curve.">
          <ul className="space-y-3">
            {RETAIL_INTEL.peaks.map((p) => (
              <li key={p.label} className="flex items-start justify-between gap-3 rounded-xl border border-[var(--app-line)] px-4 py-3">
                <div>
                  <p className="font-num cosmic-text-sm font-semibold text-[var(--app-text)]">{p.label}</p>
                  <p className="mt-0.5 font-inter cosmic-text-xs text-[var(--app-faint)]">{p.kind}</p>
                </div>
                <p className="shrink-0 font-inter cosmic-text-xs font-medium text-[var(--app-accent)]">{p.action}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Campaign / window uplift" sub={`${c.metric} · ${c.window}`} pad={false}>
          <div className="grid grid-cols-2 gap-px" style={{ background: "var(--app-line)" }}>
            <AnnotatedImage
              src={camp.imageBefore}
              alt="Window before rotation"
              aspectClass="aspect-[4/3]"
              badges={[{ text: "BEFORE", tone: "before", corner: "tl" }]}
              caption="Baseline"
              metric={`Stop rate ${c.before}`}
              explain="Static install. Same ≥4s window-zone definition."
              className="bg-[var(--app-card)]"
              gradient={false}
            />
            <AnnotatedImage
              src={camp.imageAfter}
              alt="Window after rotation"
              aspectClass="aspect-[4/3]"
              badges={[{ text: "AFTER", tone: "after", corner: "tl" }]}
              caption="New rotation"
              metric={`Stop rate ${c.after} · ${c.uplift}`}
              explain="Schedule A/B uplift — not POS conversion."
              className="bg-[var(--app-card)]"
              gradient={false}
            />
          </div>
        </Panel>
      </div>
    </div>
  )
}
