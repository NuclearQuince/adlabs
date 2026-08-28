import { ArrowRight, ShieldCheck } from "lucide-react"
import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { PRIVACY } from "../data/site"

export function Privacy() {
  const p = PRIVACY
  return (
    <section id="privacy" className="scroll-mt-24 bg-[#121212] py-24 text-[#FAF8F5] sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-2xl">
          <SectionHeader index={p.index} kicker={p.kicker} sub={p.sub} light>
            {p.h2}
          </SectionHeader>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {p.principles.map((pr, i) => (
            <Reveal key={pr.num} delay={i * 0.1}>
              <article className="h-full rounded-3xl border border-[#FAF8F5]/12 bg-[#FAF8F5]/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-[#D4F53C]/40">
                <span className="font-mono text-[11px] text-[#FAF8F5]/40">{pr.num}</span>
                <h3 className="mt-3 font-serif text-[26px] leading-tight text-[#FAF8F5]">{pr.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#FAF8F5]/60">{pr.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-stretch gap-4 rounded-3xl border border-[#FAF8F5]/12 p-6 sm:flex-row sm:items-center sm:gap-0 sm:p-8">
            {p.pipeline.map((st, i) => (
              <div key={st.stage} className="flex flex-1 items-center gap-4">
                <div className="flex-1">
                  <p className="font-mono text-[9.5px] tracking-[0.2em] text-[#D4F53C]">{st.stage}</p>
                  <p className="mt-1.5 font-serif text-[22px] leading-none text-[#FAF8F5]">{st.title}</p>
                  <p className="mt-1.5 text-[12.5px] text-[#FAF8F5]/50">{st.desc}</p>
                  {st.badge && (
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D4F53C]/40 px-3 py-1 font-mono text-[9.5px] tracking-[0.12em] text-[#D4F53C]">
                      <ShieldCheck size={11} strokeWidth={2.5} />
                      {st.badge}
                    </span>
                  )}
                </div>
                {i < p.pipeline.length - 1 && (
                  <span className="hidden shrink-0 text-[#FAF8F5]/30 sm:block" aria-hidden>
                    <ArrowRight size={20} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center font-mono text-[10px] tracking-[0.2em] text-[#FAF8F5]/35">
            DPDP 2023 COMPLIANT BY DESIGN · GDPR-ALIGNED · ZERO BIOMETRICS
          </p>
        </Reveal>
      </div>
    </section>
  )
}
