import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { SECTORS } from "../data/site"

export function Sectors() {
  const s = SECTORS
  return (
    <section id="sectors" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeader index={s.index} kicker={s.kicker}>
        {s.h2}
      </SectionHeader>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {s.cards.map((c, i) => (
          <Reveal key={c.num} delay={i * 0.09}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-[rgba(18,18,18,0.1)] shadow-clay transition-all duration-300 hover:-translate-y-1 hover:shadow-clay-lg">
              <img
                src={c.image}
                alt={c.sub}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#D4F53C]">{c.tag}</p>
                <h3 className="mt-2 font-serif text-[30px] leading-none text-[#FAF8F5]">{c.title}</h3>
                <p className="mt-2 text-[12.5px] leading-snug text-[#FAF8F5]/70">{c.sub}</p>
              </div>
              <span className="absolute right-5 top-5 font-mono text-[11px] text-[#FAF8F5]/60">{c.num}</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
