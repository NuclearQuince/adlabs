import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { LinkedInIcon } from "../components/BrandIcons"
import { FOUNDERS, BRAND } from "../data/site"

export function Team() {
  return (
    <section id="team" className="scroll-mt-24 border-y border-[rgba(18,18,18,0.08)] bg-beige/50 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeader
          index="10"
          kicker="The Lab"
          sub={`Founded in ${BRAND.founded} in ${BRAND.city}. Retail people and machine people — building the instrument the street was missing.`}
        >
          Small team. Singular obsession.
        </SectionHeader>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1}>
              <article className="group h-full rounded-3xl border border-[rgba(18,18,18,0.1)] bg-[#FAF8F5] p-7 shadow-clay transition-all duration-300 hover:-translate-y-1 hover:shadow-clay-lg">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#121212] font-inter text-[17px] font-bold text-[#D4F53C]">
                    {f.initials}
                  </span>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${f.name} on LinkedIn`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(18,18,18,0.15)] text-[#121212]/55 transition-all duration-200 hover:border-[#121212] hover:text-[#121212]"
                  >
                    <LinkedInIcon size={16} />
                  </a>
                </div>
                <h3 className="mt-6 font-serif text-[27px] leading-tight text-[#121212]">{f.name}</h3>
                <p className="mt-1 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[#121212]/45">
                  {f.role}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-[#121212]/60">{f.line}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
