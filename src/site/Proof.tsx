import { ArrowUpRight, BadgeCheck } from "lucide-react"
import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { PROOF } from "../data/site"

export function Proof() {
  const p = PROOF
  return (
    <section id="proof" className="scroll-mt-24 border-y border-[rgba(18,18,18,0.08)] bg-beige/50 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader index={p.index} kicker={p.kicker} sub={p.sub} center>
            {p.h2}
          </SectionHeader>
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <span className="rounded-full border border-[rgba(18,18,18,0.18)] px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] text-[#121212]/55">
                {p.chip}
              </span>
              <span className="rounded-full bg-[#121212] px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] text-[#FAF8F5]">
                {p.store}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <Reveal>
            <figure className="overflow-hidden rounded-3xl border border-[rgba(18,18,18,0.1)] bg-[#FAF8F5] shadow-clay">
              <div className="relative">
                <img
                  src={p.before.image}
                  alt="Window display before the change"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover grayscale-[35%]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 font-mono text-[9.5px] tracking-[0.14em] text-[#FAF8F5]">
                  {p.before.label}
                </span>
              </div>
              <figcaption className="p-6">
                <p className="font-mono text-4xl font-bold text-[#121212]/55">{p.before.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#121212]/40">
                  {p.before.metric}
                </p>
                <p className="mt-3 text-[13.5px] text-[#121212]/55">{p.before.desc}</p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center justify-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#D4F53C] text-black shadow-lime transition-transform duration-300 hover:scale-110">
                <ArrowUpRight size={26} strokeWidth={2.4} />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <figure className="overflow-hidden rounded-3xl border-2 border-[#D4F53C] bg-[#FAF8F5] shadow-[0_0_35px_rgba(212,245,60,0.35)]">
              <div className="relative">
                <img
                  src={p.after.image}
                  alt="Window display after the rotation"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 font-mono text-[9.5px] tracking-[0.14em] text-[#FAF8F5]">
                  {p.after.label}
                </span>
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#D4F53C] px-3 py-1 font-mono text-[9.5px] font-bold tracking-[0.1em] text-black">
                  <BadgeCheck size={12} strokeWidth={2.6} />
                  {p.after.badges.join(" · ")}
                </span>
              </div>
              <figcaption className="p-6">
                <p className="font-mono text-4xl font-bold text-[#121212]">{p.after.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#121212]/40">
                  {p.after.metric}
                </p>
                <p className="mt-3 text-[13.5px] text-[#121212]/55">{p.after.desc}</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center font-mono text-lg font-bold tracking-[0.06em] text-[#121212] sm:text-xl">
            {p.uplift}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
