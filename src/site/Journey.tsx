import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { JOURNEY } from "../data/site"

export function Journey() {
  const j = JOURNEY
  const max = Math.max(...j.bars.map((b) => b.value))
  return (
    <section id="journey" className="scroll-mt-24 border-y border-[rgba(18,18,18,0.08)] bg-beige/50 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1fr]">
          <SectionHeader index={j.index} kicker={j.kicker} sub={j.sub}>
            {j.h2}
          </SectionHeader>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-[rgba(18,18,18,0.1)] bg-[#FAF8F5] p-6 shadow-clay sm:p-8">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-[#121212]/45">
                {j.funnelLabel}
              </p>
              <p className="mt-1 font-mono text-[9.5px] tracking-[0.18em] text-[#121212]/35">{j.funnelSub}</p>
              <div className="mt-6 flex flex-col gap-3">
                {j.bars.map((b, i) => (
                  <div key={b.label} className="flex items-center gap-4">
                    <span className="w-16 shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.1em] text-[#121212]/55">
                      {b.label}
                    </span>
                    <div className="h-7 flex-1 overflow-hidden rounded-lg bg-[#121212]/[0.06]">
                      <div
                        className="flex h-full items-center justify-end rounded-lg pr-2.5 transition-[width] duration-1000 ease-out"
                        style={{
                          width: `${Math.max((b.value / max) * 100, 9)}%`,
                          background: `color-mix(in srgb, #D4F53C ${100 - i * 12}%, #121212)`,
                        }}
                      >
                        <span className="font-mono text-[10.5px] font-bold text-[#121212]">
                          {b.value.toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {j.steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <article className="group flex h-full flex-col rounded-3xl border border-[rgba(18,18,18,0.1)] bg-[#FAF8F5] p-6 shadow-clay transition-all duration-300 hover:-translate-y-1 hover:shadow-clay-lg">
                <span className="font-mono text-[10px] tracking-[0.18em] text-[#121212]/40">{s.step}</span>
                <div className="mt-3 flex items-baseline justify-between">
                  <h3 className="font-serif text-[24px] tracking-[0.01em] text-[#121212]">{s.name}</h3>
                  <span className="font-mono text-xl font-bold text-[#121212]">{s.count.toLocaleString("en-US")}</span>
                </div>
                <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.08em] text-[#121212]/45">
                  {s.countLabel}
                </p>
                <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-[#121212]/60">{s.desc}</p>
                <div className="mt-5 border-t border-[rgba(18,18,18,0.08)] pt-4">
                  <p className="font-mono text-[13px] font-bold text-[#121212]">{s.rate}</p>
                  <p className="text-[11px] text-[#121212]/45">{s.rateLabel}</p>
                  {s.metrics.map((m) => (
                    <p key={m} className="mt-2 font-mono text-[10px] leading-relaxed tracking-[0.04em] text-[#121212]/40">
                      {m}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-[rgba(18,18,18,0.1)] bg-[#121212] px-8 py-10 text-center">
            <h3 className="font-serif text-3xl tracking-[-0.01em] text-[#FAF8F5] sm:text-4xl">{j.band.title}</h3>
            <p className="text-[14.5px] text-[#FAF8F5]/60">{j.band.sub}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2.5">
              {j.band.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#D4F53C]/40 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-[#D4F53C]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
