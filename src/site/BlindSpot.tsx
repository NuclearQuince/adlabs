import { Reveal } from "../components/Reveal"
import { AnnotatedImage } from "../components/AnnotatedImage"
import { BLINDSPOT } from "../data/site"

const STEPS = [
  {
    caption: "People pass",
    metric: "2,481 passes at glass · today",
    explain:
      "Street / outdoor camera tracks people walking past the storefront. This is the top of the physical funnel — not POS traffic.",
    image: "/images/blindspot-pass.jpg",
    alt: "Pedestrians walking past a storefront window",
    badges: [{ text: "01 · PASS", tone: "neutral" as const, corner: "tl" as const }],
    callouts: [
      { n: 1, label: "Glass plane", detail: "Window FOV", x: 72, y: 42, tone: "accent" as const },
      { n: 2, label: "Passer tracks", detail: "YOLO26s + ByteTrack", x: 28, y: 62, tone: "neutral" as const },
    ],
  },
  {
    caption: "They stop",
    metric: "186 stopped ≥4s · 7.5% stop rate",
    explain:
      "A pause of 4+ seconds inside the window zone is intent. Window stop rate is the first honest score for the display — not pupil gaze.",
    image: "/images/blindspot-stop.jpg",
    alt: "Shopper pausing at the storefront window",
    badges: [{ text: "02 · STOP", tone: "after" as const, corner: "tl" as const }],
    callouts: [
      { n: 1, label: "Window zone", detail: "≥4s dwell rule", x: 55, y: 48, tone: "accent" as const },
      { n: 2, label: "Stop event", detail: "Velocity / dwell", x: 38, y: 68, tone: "pos" as const },
    ],
  },
  {
    caption: "They enter",
    metric: "39 entries · 21% of stops",
    explain:
      "Entrance tripwire counts IN crossings. Entry is what most stores already see — the leak sits before it, at pass and stop.",
    image: "/images/blindspot-enter.jpg",
    alt: "Visitor crossing the store threshold",
    badges: [{ text: "03 · ENTER", tone: "live" as const, corner: "tl" as const }],
    callouts: [
      { n: 1, label: "Tripwire", detail: "IN crossing", x: 48, y: 55, tone: "pos" as const },
      { n: 2, label: "Threshold", detail: "Door FOV", x: 70, y: 35, tone: "neutral" as const },
    ],
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
              Pass uncounted. Stop unmeasured. Window unproven. Each photo below is one stage of the funnel the till never sees.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.caption} delay={i * 0.06}>
              <AnnotatedImage
                src={s.image}
                alt={s.alt}
                loading={i === 0 ? "eager" : "lazy"}
                aspectClass="aspect-[4/5] sm:aspect-[3/4]"
                className="rounded-2xl border border-white/10 bg-[#0c0c14]"
                badges={s.badges}
                callouts={s.callouts}
                caption={s.caption}
                metric={s.metric}
                explain={s.explain}
              />
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
