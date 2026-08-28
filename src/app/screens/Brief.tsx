import { useState } from "react"
import { Panel, Label } from "../ui"
import { BRIEF, PEER_NOTE } from "../../data/dashboard"

export function Brief() {
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null)
  const b = BRIEF
  const prio = (p: string) =>
    p === "High" ? "var(--app-gold)" : "var(--app-sub)"

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-inter text-[22px] font-bold tracking-[-0.01em] text-[var(--app-text)]">
            {b.title} · {b.week}
          </h1>
          <p className="mt-0.5 font-inter text-[12.5px] text-[var(--app-faint)]">{b.minutes}</p>
        </div>
        <span
          className="rounded-full px-3 py-1.5 font-inter text-[11px] font-bold"
          style={{ background: "var(--app-gold-soft)", color: "var(--app-gold)" }}
        >
          READ IN 15 MINUTES
        </span>
      </div>

      <Panel>
        <Label>Verdict</Label>
        <p className="mt-3 font-inter text-[16px] leading-relaxed text-[var(--app-text)]">{b.verdict}</p>
        <p className="mt-4 border-t border-[var(--app-line)] pt-3 font-inter text-[11.5px] text-[var(--app-faint)]">
          {b.benchmark} — {PEER_NOTE.toLowerCase()}
        </p>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-3">
        {b.actions.map((a, i) => (
          <Panel key={a.title}>
            <div className="flex items-center justify-between">
              <span
                className="grid h-7 w-7 place-items-center rounded-full font-inter text-[12px] font-bold"
                style={{ background: "var(--app-gold-soft)", color: "var(--app-gold)" }}
              >
                {i + 1}
              </span>
              <span
                className="rounded-full px-2.5 py-1 font-inter text-[10px] font-bold uppercase tracking-[0.1em]"
                style={{ color: prio(a.priority), background: "color-mix(in srgb, var(--app-raise), transparent)" }}
              >
                {a.priority} · {a.tag}
              </span>
            </div>
            <h3 className="mt-4 font-inter text-[15px] font-semibold leading-snug text-[var(--app-text)]">{a.title}</h3>
            <p className="mt-2.5 font-inter text-[12.5px] leading-relaxed text-[var(--app-sub)]">{a.why}</p>
          </Panel>
        ))}
      </div>

      <Panel title="Evidence · anonymised frames">
        <div className="grid grid-cols-3 gap-4">
          {b.evidence.map((e) => (
            <figure key={e.label}>
              <img
                src={e.image}
                alt={e.label}
                loading="lazy"
                className="aspect-[16/10] w-full rounded-xl border border-[var(--app-line)] object-cover"
              />
              <figcaption className="mt-2 font-inter text-[11px] text-[var(--app-faint)]">{e.label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 font-inter text-[10.5px] text-[var(--app-faint)]">
          Frames are blurred at the edge before this brief is ever assembled. No identities, ever.
        </p>
      </Panel>

      <Panel>
        {feedback === null ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-inter text-[13px] font-medium text-[var(--app-text)]">
              Did this brief change something on your floor?
            </span>
            <button
              onClick={() => setFeedback("yes")}
              className="rounded-full px-4 py-1.5 font-inter text-[12px] font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--app-text)", color: "var(--app-card)" }}
            >
              Yes — actioned
            </button>
            <button
              onClick={() => setFeedback("no")}
              className="rounded-full border border-[var(--app-line-strong)] px-4 py-1.5 font-inter text-[12px] font-semibold text-[var(--app-sub)] transition-colors hover:text-[var(--app-text)]"
            >
              Not this week
            </button>
          </div>
        ) : (
          <p className="font-inter text-[13px] font-medium text-[var(--app-sub)]">
            Thank you — noted. Next brief lands Monday, 09:00.
          </p>
        )}
      </Panel>
    </div>
  )
}
