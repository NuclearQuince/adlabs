import { Plug, Focus, FileText, ArrowRight } from "lucide-react"
import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { HOW } from "../data/site"

const HOW_ICONS = [Plug, Focus, FileText]
const HOW_TIMES = ["Live measurement", "First full week", "Weekly verdicts"]

export function How({ onPilot }: { onPilot: () => void }) {
  const h = HOW

  return (
    <section id="how" className="scroll-mt-24 bg-[#0c0c14] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeader index={h.index} kicker={h.kicker}>
          {h.h2}
        </SectionHeader>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {h.steps.map((s, i) => {
            const HowIcon = HOW_ICONS[i]
            return (
              <Reveal key={s.num} delay={i * 0.1}>
                <article className="site-card group relative h-full overflow-hidden p-8">
                  <span className="absolute -right-3 -top-6 cosmic-text-6xl font-bold leading-none text-[#f5f5f7]/[0.03]">
                    {s.num}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#8B7CF6]/10 text-[#8B7CF6]">
                      {HowIcon && <HowIcon size={22} strokeWidth={1.9} />}
                    </span>
                    <span className="rounded-full border border-[#8B7CF6]/30 bg-[#8B7CF6]/10 px-3 py-1 cosmic-text-2xs font-semibold uppercase tracking-wide text-[#8B7CF6]">
                      {HOW_TIMES[i]}
                    </span>
                  </div>
                  <h3 className="mt-6 cosmic-text-2xl font-semibold text-[#f5f5f7]">{s.title}</h3>
                  <p className="mt-3 cosmic-text-base leading-relaxed text-[#a1a1aa]">{s.desc}</p>
                  <p className="mt-5 border-t border-white/8 pt-4 cosmic-text-sm leading-relaxed text-[#86868b]">
                    {s.answer}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#12121a] px-6 py-5 sm:px-8">
            <div>
              <p className="cosmic-text-sm font-semibold text-[#f5f5f7]">{h.wishlist.h2}</p>
              <p className="mt-1 cosmic-text-xs text-[#86868b]">{h.compat}</p>
            </div>
            <button
              type="button"
              onClick={onPilot}
              className="inline-flex items-center gap-2 rounded-full bg-[#8B7CF6] px-6 py-3 cosmic-text-sm font-semibold text-[#05050a] transition-all duration-200 hover:bg-[#6E5CE6] active:scale-[0.98]"
            >
              Talk to us
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
