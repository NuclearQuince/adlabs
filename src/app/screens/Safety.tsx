import { ShieldAlert } from "lucide-react"
import { Panel, Chip, ScreenHeader, Label } from "../ui"
import { SAFETY_CAUTIONS, SIMULATED_NOTE, ALERTS } from "../../data/dashboard"

const KIND_STYLE: Record<string, string> = {
  cv: "var(--app-accent)",
  ops: "var(--app-gold)",
  integration: "var(--app-faint)",
}

export function Safety() {
  const s = SAFETY_CAUTIONS
  const loss = ALERTS.filter((a) => a.category === "loss-risk" || a.category === "safety")

  return (
    <div className="flex flex-col gap-5">
      <ScreenHeader icon={ShieldAlert} eyebrow="Owner actions" title={s.title} sub={s.sub}>
        <Chip tone="gold">Ops cautions</Chip>
        <Chip tone="neutral" title={SIMULATED_NOTE}>Demo</Chip>
      </ScreenHeader>

      <div
        className="rounded-2xl border px-4 py-3.5 font-inter cosmic-text-xs leading-relaxed"
        style={{
          borderColor: "var(--app-line)",
          background: "var(--app-raise)",
          color: "var(--app-sub)",
        }}
      >
        {s.honesty}
      </div>

      <Panel title="Cautions" action={<Label>{s.items.length} items</Label>} sub="Each card: what it is · what you can do · CV vs integration">
        <ul className="grid gap-3 sm:grid-cols-2">
          {s.items.map((item) => (
            <li key={item.id} className="rounded-xl border border-[var(--app-line)] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2 py-0.5 font-inter cosmic-text-2xs font-bold uppercase tracking-[0.08em]"
                  style={{
                    color: item.severity === "high" ? "var(--app-neg)" : item.severity === "medium" ? "var(--app-gold)" : "var(--app-faint)",
                    background:
                      item.severity === "high"
                        ? "color-mix(in srgb, var(--app-neg) 12%, transparent)"
                        : item.severity === "medium"
                          ? "color-mix(in srgb, var(--app-gold) 12%, transparent)"
                          : "var(--app-raise)",
                  }}
                >
                  {item.severity}
                </span>
                <span className="font-mono cosmic-text-2xs font-semibold" style={{ color: KIND_STYLE[item.kind] }}>
                  {item.label}
                </span>
              </div>
              <p className="mt-2.5 font-inter cosmic-text-sm font-semibold text-[var(--app-text)]">{item.title}</p>
              <p className="mt-1 font-inter cosmic-text-xs leading-relaxed text-[var(--app-sub)]">{item.detail}</p>
              <p className="mt-3 border-t border-[var(--app-line)] pt-2.5 font-inter cosmic-text-xs font-medium text-[var(--app-accent)]">
                What you can do: {item.do}
              </p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Loss-risk & safety alerts (linked)" sub={s.lossRiskNote}>
        <ul className="space-y-2.5">
          {loss.map((a) => (
            <li key={a.id} className="rounded-xl border border-[var(--app-line)] px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-inter cosmic-text-sm font-semibold text-[var(--app-text)]">{a.title}</span>
                <span className="font-inter cosmic-text-2xs uppercase text-[var(--app-faint)]">{a.category}</span>
                <span className="font-inter cosmic-text-2xs text-[var(--app-faint)]">{a.time}</span>
              </div>
              <p className="mt-1 font-inter cosmic-text-xs text-[var(--app-sub)]">{a.message}</p>
              <p className="mt-2 font-inter cosmic-text-xs text-[var(--app-accent)]">Do: {a.action}</p>
              <p className="mt-1 font-inter cosmic-text-2xs text-[var(--app-faint)]">{a.source}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
