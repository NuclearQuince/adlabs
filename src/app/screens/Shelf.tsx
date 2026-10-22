import { Package } from "lucide-react"
import { Panel, Chip, ScreenHeader } from "../ui"
import { AnnotatedImage } from "../../components/AnnotatedImage"
import { SHELF_INTEL, SIMULATED_NOTE, MATURITY, CAMPAIGNS } from "../../data/dashboard"

export function Shelf() {
  return (
    <div className="flex flex-col gap-5">
      <ScreenHeader icon={Package} eyebrow="Intelligence" title={SHELF_INTEL.title} sub={SHELF_INTEL.sub}>
        <Chip tone="live">{MATURITY.live}</Chip>
        <Chip tone="neutral" title={SIMULATED_NOTE}>Demo</Chip>
      </ScreenHeader>

      <AnnotatedImage
        src={CAMPAIGNS[1]?.imageBefore ?? "/images/in-store-zones.jpg"}
        alt="In-store display — near-shelf attention"
        aspectClass="aspect-[21/9] sm:aspect-[2.4/1]"
        className="overflow-hidden rounded-3xl border border-[var(--app-line)]"
        badges={[
          { text: "DISPLAY INTEREST", tone: "after", corner: "tl" },
          { text: "CATEGORY · NOT SKU OCR", tone: "neutral", corner: "tr" },
        ]}
        callouts={[
          { n: 1, label: "Hero vitrine", detail: "Near-shelf attention", x: 58, y: 40, tone: "accent" },
          { n: 2, label: "Proximity dwell", detail: "YOLO-World + head-pose", x: 32, y: 62, tone: "pos" },
        ]}
        caption="Near-display interest"
        metric="Category-level · not barcode POS"
        explain={SHELF_INTEL.honesty}
      />

      <Panel title="Fixtures · near interest">
        <ul className="grid gap-3 sm:grid-cols-2">
          {SHELF_INTEL.fixtures.map((f) => (
            <li key={f.name} className="rounded-xl border border-[var(--app-line)] px-4 py-3.5">
              <p className="font-inter cosmic-text-sm font-semibold text-[var(--app-text)]">{f.name}</p>
              <p className="mt-2 font-num cosmic-text-xl font-bold text-[var(--app-accent)]">{f.interest}</p>
              <p className="mt-0.5 font-inter cosmic-text-2xs uppercase tracking-[0.06em] text-[var(--app-faint)]">
                Near interest
              </p>
              <p className="mt-2 font-inter cosmic-text-xs text-[var(--app-sub)]">
                {f.dwell} · {f.note}
              </p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
