import { useState } from "react"
import { MapPin } from "lucide-react"
import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { ATELIER } from "../data/site"

export function Atelier() {
  const a = ATELIER
  const [tab, setTab] = useState(a.tabs[0].id)
  const active = a.tabs.find((t) => t.id === tab) ?? a.tabs[0]

  return (
    <section id="atelier" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeader index={a.index} kicker={a.kicker} sub={a.sub}>
        {a.h2}
      </SectionHeader>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-wrap gap-2.5" role="tablist" aria-label="In-store intelligence views">
          {a.tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full border px-4.5 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                tab === t.id
                  ? "border-[#121212] bg-[#121212] text-[#FAF8F5]"
                  : "border-[rgba(18,18,18,0.16)] text-[#121212]/60 hover:border-[#121212]/40 hover:text-[#121212]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <figure className="group relative mt-8">
          <div className="overflow-hidden rounded-3xl border border-[rgba(18,18,18,0.1)] shadow-clay-lg">
            <img
              src={a.image}
              alt="Boutique interior with analytics zones"
              loading="lazy"
              className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
          </div>

          <figcaption className="absolute left-4 top-4 rounded-full bg-black/65 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] text-[#FAF8F5] backdrop-blur-sm">
            {a.camLabel}
          </figcaption>

          <div
            key={active.id}
            className="absolute bottom-4 left-4 max-w-[280px] rounded-2xl bg-[#FAF8F5]/92 p-5 shadow-clay-lg backdrop-blur-md sm:bottom-6 sm:left-6"
          >
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-[#121212]/45">{active.overlay.tag}</p>
            <p className="mt-2 font-mono text-xl font-bold text-[#121212]">{active.overlay.big}</p>
            {active.overlay.lines.map((l) => (
              <p key={l} className="mt-1.5 text-[12px] leading-snug text-[#121212]/60">
                {l}
              </p>
            ))}
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-[#D4F53C] px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] text-black shadow-lime sm:right-6 sm:top-6">
            <MapPin size={12} strokeWidth={2.5} />
            <span>
              {active.pin.title} — {active.pin.value}
            </span>
          </div>
        </figure>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {a.features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <article className="h-full rounded-3xl border border-[rgba(18,18,18,0.1)] bg-[#FFFFFF] p-6 shadow-clay transition-all duration-300 hover:-translate-y-1 hover:shadow-clay-lg">
              <h3 className="font-serif text-[22px] leading-tight text-[#121212]">{f.title}</h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#121212]/40">{f.sub}</p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[#121212]/60">{f.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
