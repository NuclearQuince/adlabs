import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { METRICS } from "../data/site"

export function Metrics() {
  const m = METRICS
  return (
    <section id="metrics" className="scroll-mt-24 border-y border-[rgba(18,18,18,0.08)] bg-beige/50 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeader index={m.index} kicker={m.kicker} sub={m.sub}>
          {m.h2}
        </SectionHeader>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[rgba(18,18,18,0.1)] bg-[rgba(18,18,18,0.08)] sm:grid-cols-2 lg:grid-cols-4">
          {m.items.map((it, i) => (
            <div
              key={it.title}
              className="group bg-[#FAF8F5] p-6 transition-colors duration-200 hover:bg-[#FFFFFF]"
            >
              <Reveal delay={Math.min(i * 0.04, 0.3)}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-[21px] leading-none text-[#121212]">{it.title}</h3>
                  <span className="font-mono text-[10px] text-[#121212]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-[#121212]/55">{it.desc}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
