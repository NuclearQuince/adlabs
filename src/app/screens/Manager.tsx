import { useState } from "react"
import { Check, Users } from "lucide-react"
import { Panel, Label, Chip } from "../ui"
import { AreaChart } from "../charts"
import { MANAGER, TRAFFIC_HOURS } from "../../data/dashboard"

export function Manager() {
  const [done, setDone] = useState<number[]>([])
  const m = MANAGER

  const toggle = (i: number) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-inter text-[22px] font-bold tracking-[-0.01em] text-[var(--app-text)]">Today</h1>
          <p className="mt-0.5 font-inter text-[12.5px] text-[var(--app-faint)]">
            {m.store} · {m.date}
          </p>
        </div>
        <Chip tone="live">Live</Chip>
      </div>

      <div
        className="flex items-start gap-3 rounded-2xl border p-4"
        style={{ background: "var(--app-gold-soft)", borderColor: "color-mix(in srgb, var(--app-gold) 30%, transparent)" }}
      >
        <Users size={16} className="mt-0.5 shrink-0" style={{ color: "var(--app-gold)" }} />
        <p className="font-inter text-[13px] leading-relaxed text-[var(--app-text)]">{m.alert}</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Today's curve" action={<Label>PEAK 15:00 – 17:00</Label>}>
          <AreaChart data={TRAFFIC_HOURS} peaks={[{ from: "15", to: "17" }]} height={190} />
        </Panel>

        <Panel title="Staffing plan">
          <div className="flex flex-col gap-3">
            {m.staffing.map((s) => (
              <div key={s.window} className="rounded-xl border border-[var(--app-line)] p-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-inter text-[13.5px] font-semibold font-num text-[var(--app-text)]">{s.window}</span>
                  <span
                    className="rounded-full px-2.5 py-0.5 font-inter text-[11px] font-bold"
                    style={{ background: "var(--app-gold-soft)", color: "var(--app-gold)" }}
                  >
                    {s.need}
                  </span>
                </div>
                <p className="mt-1 font-inter text-[11.5px] text-[var(--app-faint)]">{s.note}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Opening checklist">
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {m.checklist.map((c, i) => {
            const isDone = done.includes(i)
            return (
              <li key={c}>
                <button
                  onClick={() => toggle(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors duration-150 ${
                    isDone ? "opacity-60" : "hover:bg-[var(--app-raise)]"
                  }`}
                  style={{ borderColor: "var(--app-line)" }}
                  aria-pressed={isDone}
                >
                  <span
                    className="grid h-5.5 w-5.5 shrink-0 place-items-center rounded-md border transition-colors duration-150"
                    style={{
                      borderColor: isDone ? "var(--app-gold)" : "var(--app-line-strong)",
                      background: isDone ? "var(--app-gold)" : "transparent",
                    }}
                  >
                    {isDone && <Check size={13} strokeWidth={3} style={{ color: "var(--app-card)" }} />}
                  </span>
                  <span
                    className={`font-inter text-[13px] ${isDone ? "line-through" : ""}`}
                    style={{ color: "var(--app-text)" }}
                  >
                    {c}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </Panel>
    </div>
  )
}
