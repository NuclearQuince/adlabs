import { Link } from "react-router-dom"
import { ArrowRight, TrendingUp } from "lucide-react"
import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { SYSTEM } from "../data/site"
import { TRAFFIC_HOURS } from "../data/dashboard"

function MiniTrend() {
  const w = 260
  const h = 56
  const max = Math.max(...TRAFFIC_HOURS.map((d) => d.v)) * 1.1
  const pts = TRAFFIC_HOURS.map(
    (d, i) => `${(i / (TRAFFIC_HOURS.length - 1)) * w},${h - (d.v / max) * h}`,
  )
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" aria-hidden>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="#A9792B"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function System() {
  const s = SYSTEM
  const itf = s.interface
  return (
    <section id="system" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeader index={s.index} kicker={s.kicker} sub={s.sub}>
        {s.h2}
      </SectionHeader>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {s.trio.map((t, i) => (
          <Reveal key={t.k} delay={i * 0.1}>
            <article className="h-full rounded-3xl border border-[rgba(18,18,18,0.1)] bg-[#FFFFFF] p-7 shadow-clay transition-all duration-300 hover:-translate-y-1 hover:shadow-clay-lg">
              <span className="font-mono text-[11px] text-[#121212]/35">{t.k}</span>
              <h3 className="mt-3 font-serif text-[26px] leading-tight text-[#121212]">{t.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#121212]/60">{t.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="kicker text-[#121212]/45">{itf.kicker}</span>
            <h3 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-[#121212] sm:text-5xl">
              {itf.h2}
            </h3>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#121212]/60">{itf.sub}</p>
            <Link
              to="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#121212] px-6 py-3 text-[13.5px] font-semibold text-[#FAF8F5] shadow-clay transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D4F53C] hover:text-black"
            >
              {itf.cta}
              <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
          </div>

          <div className="rounded-3xl border border-[rgba(18,18,18,0.1)] bg-[#F5F5F7] p-6 shadow-clay-lg sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-[#1D1D1F]">{itf.store}</p>
                <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-[#6E6E73]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#D4F53C]" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#A9792B]" />
                  </span>
                  {itf.live}
                </p>
              </div>
              <span className="font-mono text-[10px] tracking-[0.1em] text-[#86868B]">{itf.hours}</span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {itf.stats.map((st) => (
                <div key={st.label} className="rounded-2xl bg-[#FFFFFF] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <p className="font-inter text-[22px] font-bold font-num text-[#1D1D1F]">
                    {typeof st.value === "number" ? st.value.toLocaleString("en-US") : st.value}
                    {st.suffix ?? ""}
                  </p>
                  <p className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.1em] text-[#86868B]">
                    {st.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[#FFFFFF] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9.5px] tracking-[0.16em] text-[#86868B]">{itf.trend}</p>
                <p className="flex items-center gap-1 font-inter text-[12px] font-bold font-num text-[#1D8A4E]">
                  <TrendingUp size={13} strokeWidth={2.5} />
                  {itf.trendDelta}
                </p>
              </div>
              <MiniTrend />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
