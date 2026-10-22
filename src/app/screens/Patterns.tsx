import { Repeat } from "lucide-react"
import { Panel, Chip, ScreenHeader, Label } from "../ui"
import { PATTERN_INTEL, SIMULATED_NOTE } from "../../data/dashboard"

export function Patterns() {
  return (
    <div className="flex flex-col gap-5">
      <ScreenHeader icon={Repeat} eyebrow="Intelligence" title={PATTERN_INTEL.title} sub={PATTERN_INTEL.sub}>
        <Chip tone="gold">{PATTERN_INTEL.label}</Chip>
        <Chip tone="neutral" title={SIMULATED_NOTE}>Demo</Chip>
      </ScreenHeader>

      <Panel title="Motifs from monitoring history" action={<Label>Anonymous rollups</Label>}>
        <ul className="space-y-3">
          {PATTERN_INTEL.motifs.map((m) => (
            <li key={m.id} className="rounded-xl border border-[var(--app-line)] px-4 py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-inter cosmic-text-sm font-semibold text-[var(--app-text)]">{m.title}</p>
                <span className="font-mono cosmic-text-2xs font-semibold uppercase tracking-[0.08em] text-[var(--app-accent)]">
                  {m.strength} · {m.weeks}w
                </span>
              </div>
              <p className="mt-1.5 font-inter cosmic-text-xs leading-relaxed text-[var(--app-sub)]">{m.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-inter cosmic-text-xs leading-relaxed text-[var(--app-faint)]">{PATTERN_INTEL.note}</p>
      </Panel>
    </div>
  )
}
