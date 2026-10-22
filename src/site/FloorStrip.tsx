import { Reveal } from "../components/Reveal"
import { ATELIER } from "../data/site"

/** Short “see the floor” strip — zone imagery for spatial understanding, not a junk section. */
export function FloorStrip() {
  const a = ATELIER
  return (
    <section id="floor" className="site-scope scroll-mt-24 bg-[#05050a] py-10 sm:py-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="font-mono cosmic-text-2xs font-semibold uppercase tracking-[0.18em] text-[#8B7CF6]">
                See the floor
              </p>
              <h2 className="mt-3 cosmic-text-2xl font-semibold tracking-[-0.02em] text-[#f5f5f7] sm:cosmic-text-3xl">
                Zones make the store readable.
              </h2>
              <p className="mt-2 cosmic-text-sm leading-relaxed text-[#a1a1aa]">
                Traffic share and dwell by zone — same picture on Edge or Cloud.
              </p>
            </div>
            <p className="font-mono cosmic-text-2xs tracking-[0.12em] text-[#86868b]">
              {a.ui.store}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10">
            <img
              src={a.image}
              alt="In-store zone map — Organic Clothing Co. Bandra"
              className="aspect-[21/9] w-full object-cover sm:aspect-[2.4/1]"
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#05050a]/80 via-transparent to-transparent"
            />
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-4 sm:gap-3 sm:p-6">
              {a.tabs[0].markers.slice(0, 4).map((m) => (
                <span
                  key={m.title}
                  className="rounded-lg border border-white/15 bg-[#05050a]/75 px-3 py-2 backdrop-blur-sm"
                >
                  <span className="block cosmic-text-2xs font-semibold text-[#f5f5f7]">{m.title}</span>
                  <span className="mt-0.5 block cosmic-text-2xs text-[#86868b]">{m.value}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
