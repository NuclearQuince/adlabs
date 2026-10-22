import { Reveal } from "../components/Reveal"
import { ATELIER, PROOF } from "../data/site"

/** Floor zones + window before/after — visual storytelling without junk sections. */
export function FloorStrip() {
  const a = ATELIER
  const p = PROOF

  return (
    <section id="floor" className="site-scope scroll-mt-24 bg-[#05050a] py-12 sm:py-14">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <div className="max-w-xl">
            <p className="font-mono cosmic-text-2xs font-semibold uppercase tracking-[0.18em] text-[#8B7CF6]">
              See it
            </p>
            <h2 className="mt-3 cosmic-text-2xl font-semibold tracking-[-0.02em] text-[#f5f5f7] sm:cosmic-text-3xl">
              The floor. The glass. Measured.
            </h2>
            <p className="mt-2 cosmic-text-sm leading-relaxed text-[#a1a1aa]">
              Zone dwell inside. Window stop rate outside. Same signals on Edge or Cloud.
            </p>
          </div>
        </Reveal>

        {/* In-store zones */}
        <Reveal delay={0.06}>
          <figure className="relative mt-8 overflow-hidden rounded-2xl border border-white/10">
            <img
              src={a.image}
              alt="In-store zones — Organic Clothing Co. Bandra"
              className="aspect-[21/9] w-full object-cover sm:aspect-[2.4/1]"
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#05050a]/85 via-transparent to-transparent"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <p className="cosmic-text-sm font-semibold text-[#f5f5f7]">In-store zones</p>
              <p className="mt-1 cosmic-text-xs text-[#a1a1aa]">Traffic share and dwell by area of the floor.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {a.tabs[0].markers.slice(0, 4).map((m) => (
                  <span
                    key={m.title}
                    className="rounded-lg border border-white/12 bg-[#05050a]/70 px-2.5 py-1.5 backdrop-blur-sm"
                  >
                    <span className="block cosmic-text-2xs font-semibold text-[#f5f5f7]">{m.title.split("·")[0].trim()}</span>
                    <span className="block cosmic-text-2xs text-[#86868b]">{m.value}</span>
                  </span>
                ))}
              </div>
            </figcaption>
          </figure>
        </Reveal>

        {/* Window before / after */}
        <Reveal delay={0.1}>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c14]">
              <div className="relative aspect-[16/10]">
                <img
                  src={p.before.image}
                  alt="Window before — baseline display"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#05050a]/90 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="font-mono cosmic-text-2xs tracking-[0.14em] text-[#86868b]">Window before</p>
                  <p className="mt-1 cosmic-text-lg font-semibold text-[#f5f5f7]">
                    {p.before.value} <span className="cosmic-text-sm font-normal text-[#a1a1aa]">{p.before.metric}</span>
                  </p>
                </figcaption>
              </div>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c14]">
              <div className="relative aspect-[16/10]">
                <img
                  src={p.after.image}
                  alt="Window after — new rotation"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#05050a]/90 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="font-mono cosmic-text-2xs tracking-[0.14em] text-[#8B7CF6]">Window after</p>
                  <p className="mt-1 cosmic-text-lg font-semibold text-[#f5f5f7]">
                    {p.after.value} <span className="cosmic-text-sm font-normal text-[#a1a1aa]">{p.after.metric}</span>
                  </p>
                  <p className="mt-1 cosmic-text-xs font-semibold text-[#8B7CF6]">{p.uplift}</p>
                </figcaption>
              </div>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
