import { CountUp } from "../components/CountUp"
import { Reveal } from "../components/Reveal"
import { HERO } from "../data/site"

export function Hero({ onPilot }: { onPilot: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(212,245,60,0.10), transparent)" }}
      />
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
        <div>
          <Reveal>
            <span className="kicker text-[#121212]/50">{HERO.kicker}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-serif text-[clamp(3.2rem,7.5vw,5.6rem)] leading-[0.98] tracking-[-0.03em] text-[#121212]">
              {HERO.headlineA}{" "}
              <em className="font-serif italic text-[#121212]/80">{HERO.headlineB}</em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-[#121212]/65">{HERO.sub}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={onPilot}
                className="rounded-full bg-[#121212] px-7 py-3.5 text-[14px] font-semibold text-[#FAF8F5] shadow-clay transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D4F53C] hover:text-black active:scale-[0.98]"
              >
                {HERO.primaryCta}
              </button>
              <a
                href="#journey"
                className="rounded-full border border-[rgba(18,18,18,0.18)] px-7 py-3.5 text-[14px] font-semibold text-[#121212] transition-all duration-200 hover:border-[#121212] active:scale-[0.98]"
              >
                {HERO.secondaryCta}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <dl className="mt-12 flex divide-x divide-[rgba(18,18,18,0.12)]">
              {HERO.live.map((s, i) => (
                <div key={s.label} className={i === 0 ? "pr-8" : "px-8"}>
                  <dd className="font-mono text-2xl font-bold text-[#121212] sm:text-[28px]">
                    <CountUp to={s.value} decimals={s.value % 1 !== 0 ? 1 : 0} />
                    {s.suffix ?? ""}
                  </dd>
                  <dt className="mt-1 text-[12px] font-medium uppercase tracking-[0.1em] text-[#121212]/45">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={32}>
          <figure className="group relative">
            <div className="overflow-hidden rounded-3xl border border-[rgba(18,18,18,0.1)] shadow-clay-lg">
              <img
                src="/images/hero-storefront.jpg"
                alt="Luxury storefront at dusk with passers-by"
                className="aspect-[16/11] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="animate-scanline h-16 w-full bg-gradient-to-b from-transparent via-[#D4F53C]/10 to-transparent" />
              </div>
            </div>

            <figcaption className="absolute left-4 top-4 rounded-full bg-black/70 px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-[#FAF8F5] backdrop-blur-sm">
              {HERO.badgeTenant}
            </figcaption>
            <figcaption className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/70 px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.1em] text-[#FAF8F5] backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#D4F53C]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D4F53C]" />
              </span>
              {HERO.badgePrivacy}
            </figcaption>

            <div className="absolute -left-3 top-1/2 hidden -translate-y-1/2 flex-col gap-2 sm:flex">
              {HERO.ticker.map((t, i) => (
                <span
                  key={t}
                  className="animate-subtle-float rounded-full border border-[rgba(18,18,18,0.1)] bg-[#FAF8F5]/90 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-[#121212]/70 shadow-clay backdrop-blur-sm"
                  style={{ animationDelay: `${i * 1.2}s`, marginLeft: `${i * 10}px` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </figure>
        </Reveal>
      </div>

      <div className="border-y border-[rgba(18,18,18,0.08)] bg-beige/60 py-3.5">
        <div className="flex overflow-hidden" aria-hidden>
          <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12">
            {[...HERO.marquee, ...HERO.marquee, ...HERO.marquee, ...HERO.marquee].map((m, i) => (
              <span key={i} className="flex items-center gap-12 whitespace-nowrap font-mono text-[11px] tracking-[0.22em] text-[#121212]/45">
                {m}
                <span className="h-1 w-1 rounded-full bg-[#D4F53C]" />
              </span>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12">
            {[...HERO.marquee, ...HERO.marquee, ...HERO.marquee, ...HERO.marquee].map((m, i) => (
              <span key={i} className="flex items-center gap-12 whitespace-nowrap font-mono text-[11px] tracking-[0.22em] text-[#121212]/45">
                {m}
                <span className="h-1 w-1 rounded-full bg-[#D4F53C]" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-5">
        {HERO.footline.map((f) => (
          <span key={f} className="font-mono text-[10px] tracking-[0.18em] text-[#121212]/35">
            {f}
          </span>
        ))}
      </div>
    </section>
  )
}
