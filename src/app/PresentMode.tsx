import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { KPIS, FUNNEL, CAMPAIGN_VERDICT, BRIEF, ZONES, SIMULATED_NOTE } from "../data/dashboard"
import { FunnelBars, HeatGrid } from "./charts"
import { Label } from "./ui"

const SLIDES = ["The five numbers", "The funnel", "Did it work?", "Monday Brief", "The floor"] as const

export function PresentMode({ theme, onClose }: { theme: "light" | "dark"; onClose: () => void }) {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") { setI((v) => Math.min(v + 1, SLIDES.length - 1)); setAuto(false) }
      if (e.key === "ArrowLeft") { setI((v) => Math.max(v - 1, 0)); setAuto(false) }
    }
    document.addEventListener("keydown", key)
    return () => document.removeEventListener("keydown", key)
  }, [onClose])

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 8000)
    return () => clearInterval(t)
  }, [auto])

  return (
    <div className="app-scope fixed inset-0 z-50 flex flex-col" data-theme={theme} style={{ background: "var(--app-bg)" }}>
      <header className="flex items-center justify-between border-b border-[var(--app-line)] px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-[9px] font-inter text-[13px] font-extrabold" style={{ background: theme === "dark" ? "#f5f5f7" : "#1d1d1f", color: theme === "dark" ? "#1d1d1f" : "#fff" }}>
            Ad
          </span>
          <span className="font-inter text-[14px] font-bold text-[var(--app-text)]">AD Labs · Present</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 font-inter text-[10.5px] font-bold tracking-[0.08em]"
            style={{ background: "var(--app-gold-soft)", color: "var(--app-gold)" }}
          >
            {SIMULATED_NOTE.toUpperCase()}
          </span>
          <button
            onClick={onClose}
            aria-label="Exit present mode"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--app-line)] text-[var(--app-sub)] transition-colors hover:text-[var(--app-text)]"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-14">
        <div className="w-full max-w-5xl">
          {i === 0 && (
            <div>
              <Label>{SLIDES[0]}</Label>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
                {KPIS.week.map((k) => (
                  <div key={k.id} className="rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] p-5" style={{ boxShadow: "var(--app-shadow)" }}>
                    <Label>{k.label}</Label>
                    <p className="mt-2 font-inter text-[30px] font-bold font-num leading-none text-[var(--app-text)]">{k.value}</p>
                    <p className="mt-2 font-inter text-[12px] font-semibold font-num" style={{ color: "var(--app-pos)" }}>{k.delta} · {k.deltaNote}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-inter text-[13px] text-[var(--app-faint)]">{KPIS.week[1].hint}</p>
            </div>
          )}

          {i === 1 && (
            <div>
              <Label>{SLIDES[1]}</Label>
              <div className="mt-6 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] p-6 sm:p-8" style={{ boxShadow: "var(--app-shadow)" }}>
                <FunnelBars stages={FUNNEL.week} />
              </div>
              <p className="mt-6 font-inter text-[13px] text-[var(--app-faint)]">
                Every stage is measured on the store's edge device — pass, stop, enter, explore, engage.
              </p>
            </div>
          )}

          {i === 2 && (
            <div>
              <Label>{SLIDES[2]}</Label>
              <p className="mt-6 max-w-3xl font-inter text-[22px] font-semibold leading-snug text-[var(--app-text)] sm:text-[26px]">
                “{CAMPAIGN_VERDICT}”
              </p>
              <div className="mt-8 flex gap-3">
                <span className="rounded-full px-4 py-2 font-inter text-[12.5px] font-bold font-num" style={{ background: "var(--app-gold-soft)", color: "var(--app-gold)" }}>6.4% → 7.3% capture</span>
                <span className="rounded-full px-4 py-2 font-inter text-[12.5px] font-bold font-num" style={{ background: "color-mix(in srgb, var(--app-pos) 12%, transparent)", color: "var(--app-pos)" }}>+14.6% uplift · verified 14-day A/B</span>
              </div>
            </div>
          )}

          {i === 3 && (
            <div>
              <Label>{SLIDES[3]} · {BRIEF.week}</Label>
              <p className="mt-6 max-w-3xl font-inter text-[18px] leading-relaxed text-[var(--app-text)] sm:text-[20px]">{BRIEF.verdict}</p>
              <ol className="mt-8 flex flex-col gap-3">
                {BRIEF.actions.map((a, idx) => (
                  <li key={a.title} className="flex items-start gap-4 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] p-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full font-inter text-[12px] font-bold" style={{ background: "var(--app-gold-soft)", color: "var(--app-gold)" }}>{idx + 1}</span>
                    <div>
                      <p className="font-inter text-[14.5px] font-semibold text-[var(--app-text)]">{a.title}</p>
                      <p className="mt-1 font-inter text-[12px] text-[var(--app-faint)]">{a.priority} · {a.tag}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {i === 4 && (
            <div>
              <Label>{SLIDES[4]}</Label>
              <div className="mt-6 rounded-2xl border border-[var(--app-line)] bg-[var(--app-card)] p-6 sm:p-8" style={{ boxShadow: "var(--app-shadow)" }}>
                <HeatGrid zones={ZONES} />
              </div>
              <p className="mt-6 font-inter text-[13px] text-[var(--app-faint)]">
                Ten zones · traffic share · red dot = flagged for attention this week.
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="flex items-center justify-between border-t border-[var(--app-line)] px-6 py-4">
        <div className="flex items-center gap-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s}
              onClick={() => { setI(idx); setAuto(false) }}
              aria-label={`Slide ${idx + 1}: ${s}`}
              className="h-1.5 rounded-full transition-all duration-200"
              style={{
                width: idx === i ? 28 : 10,
                background: idx === i ? "var(--app-gold)" : "var(--app-line-strong)",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-2 font-inter text-[11px] font-medium font-num text-[var(--app-faint)]">
            {i + 1} / {SLIDES.length} {auto ? "· auto" : ""}
          </span>
          <button
            onClick={() => { setI((v) => Math.max(v - 1, 0)); setAuto(false) }}
            aria-label="Previous slide"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--app-line)] text-[var(--app-sub)] transition-colors hover:text-[var(--app-text)]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => { setI((v) => Math.min(v + 1, SLIDES.length - 1)); setAuto(false) }}
            aria-label="Next slide"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--app-line)] text-[var(--app-sub)] transition-colors hover:text-[var(--app-text)]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  )
}
