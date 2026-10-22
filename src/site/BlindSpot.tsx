import { Reveal } from "../components/Reveal"
import { BLINDSPOT } from "../data/site"

const STEPS = [
  {
    caption: "People pass",
    metric: "2,481",
    image: "/images/blindspot-pass.jpg",
    alt: "Pedestrians walking past a storefront",
  },
  {
    caption: "They stop",
    metric: "186",
    image: "/images/blindspot-stop.jpg",
    alt: "Shopper pausing at the window",
  },
  {
    caption: "They enter",
    metric: "39",
    image: "/images/blindspot-enter.jpg",
    alt: "Visitor crossing the store threshold",
  },
]

export function BlindSpot() {
  const b = BLINDSPOT

  return (
    <section
      id="blindspot"
      className="relative scroll-mt-24 bg-[#05050a] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono cosmic-text-2xs font-semibold uppercase tracking-[0.18em] text-[#8B7CF6]">
              The Problem
            </p>
            <h2 className="mt-4 visual-headline text-[#f5f5f7]">
              {b.h2a}
              <br />
              <span className="text-[#8B7CF6]">{b.h2b}</span>
            </h2>
            <p className="mt-4 max-w-lg cosmic-text-base leading-relaxed text-[#a1a1aa]">
              Pass uncounted. Stop unmeasured. Window unproven.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.caption} delay={i * 0.06}>
              <figure className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c14]">
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/35 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="font-mono cosmic-text-2xs tracking-[0.16em] text-white/50">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 cosmic-text-xl font-semibold text-[#f5f5f7]">{s.caption}</p>
                    <p className="mt-1 font-num cosmic-text-2xl font-bold text-[#8B7CF6]">{s.metric}</p>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl cosmic-text-sm leading-relaxed text-[#86868b]">
            {b.closer}{" "}
            <span className="font-medium text-[#c4c4cc]">{b.closerBold}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
