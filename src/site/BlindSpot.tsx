import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { BLINDSPOT } from "../data/site"

export function BlindSpot() {
  const b = BLINDSPOT
  return (
    <section id="blindspot" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeader index={b.index} kicker={b.kicker} sub="">
        {b.h2a}
        <br />
        <em className="italic text-[#121212]/75">{b.h2b}</em>
      </SectionHeader>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {b.cards.map((c, i) => (
          <Reveal key={c.num} delay={i * 0.1}>
            <article
              className={`group flex h-full flex-col overflow-hidden rounded-3xl border bg-[#FFFFFF] transition-all duration-300 hover:-translate-y-1 ${
                c.highlight
                  ? "border-[#D4F53C] shadow-[0_0_35px_rgba(212,245,60,0.35)]"
                  : "border-[rgba(18,18,18,0.1)] shadow-clay hover:shadow-clay-lg"
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-[#FAF8F5] backdrop-blur-sm">
                  {c.tag}
                </span>
                {c.highlight && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#D4F53C] px-3 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-black">
                    CRUCIAL
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[11px] text-[#121212]/40">{c.num}</span>
                <h3 className="mt-2 font-serif text-[26px] leading-tight tracking-[-0.01em] text-[#121212]">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-[#121212]/60">{c.desc}</p>
                <p className="mt-5 border-t border-[rgba(18,18,18,0.08)] pt-4 font-mono text-[11px] tracking-[0.08em] text-[#121212]/50">
                  {c.metric}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <p className="mx-auto mt-16 max-w-2xl text-center text-[18px] leading-relaxed text-[#121212]/60 sm:text-[20px]">
          {b.closer} <strong className="font-semibold text-[#121212]">{b.closerBold}</strong>
        </p>
      </Reveal>
    </section>
  )
}
