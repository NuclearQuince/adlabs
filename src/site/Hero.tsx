"use client"

import { Reveal } from "../components/Reveal"
import { HERO } from "../data/site"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const hash01 = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const PARTICLES = [...Array(20)].map((_, i) => ({
  left: hash01(i, 1) * 100,
  top: hash01(i, 2) * 100,
  delay: hash01(i, 3) * 6,
  duration: 4 + hash01(i, 4) * 4,
}))

const RHYTHM = [34, 41, 38, 52, 63, 58, 71, 66, 84, 77, 92, 88, 96, 100]

export function Hero({ onPilot }: { onPilot: () => void }) {
  const scrollToPlans = () => {
    const el = document.getElementById("plans")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="top" className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_75%_35%,rgba(139,124,246,0.16),transparent_60%),radial-gradient(700px_500px_at_15%_85%,rgba(62,207,142,0.08),transparent_60%)]" />
      <div className="absolute inset-0 cosmic-bg opacity-70" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#8B7CF6]/40 animate-float"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="badge-cosmic">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8B7CF6]" />
                {HERO.kicker}
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-8 visual-headline">
                {HERO.headlineA}
                <br />
                <span className="text-[#8B7CF6]">{HERO.headlineB}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 visual-sub max-w-[480px]">
                {HERO.sub}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#8B7CF6] px-7 py-3.5 cosmic-text-base font-semibold text-white transition-all duration-300 hover:bg-[#6E5CE6] active:scale-[0.98]"
                >
                  {HERO.demoCta}
                  <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <button
                  onClick={onPilot}
                  className="inline-flex items-center gap-2 rounded-full border border-[#8B7CF6]/30 bg-[#8B7CF6]/10 px-7 py-3.5 cosmic-text-base font-medium text-[#8B7CF6] transition-all duration-300 hover:bg-[#8B7CF6]/20 hover:border-[#8B7CF6]/50 active:scale-[0.98]"
                >
                  {HERO.primaryCta}
                </button>
                <button
                  onClick={scrollToPlans}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 cosmic-text-base font-medium text-[#f5f5f7] transition-all duration-300 hover:border-[#8B7CF6]/50 hover:text-[#8B7CF6] active:scale-[0.98]"
                >
                  {HERO.secondaryCta}
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={20} scale={0.98}>
            <div className="relative">
              <div className="absolute -inset-10 bg-[radial-gradient(500px_420px_at_50%_50%,rgba(139,124,246,0.18),transparent_70%)]" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b12] shadow-[0_0_80px_rgba(0,0,0,0.6)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/hero-storefront.jpg"
                    alt="Organic Clothing Co. Bandra storefront — pass / stop / enter from existing cameras"
                    className="h-full w-full object-cover"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-[#0b0b12]/55 to-transparent" />
                  {/* Scene markings */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#3ECF8E]/40 bg-[#0b0b12]/70 px-2.5 py-1 font-mono cosmic-text-2xs text-[#6effb0] backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3ECF8E]" />
                    LIVE · BANDRA · CAM 01
                  </div>
                  <div
                    className="absolute z-10 max-w-[40%] -translate-x-1/2 -translate-y-1/2"
                    style={{ left: "28%", top: "38%" }}
                  >
                    <div className="flex items-start gap-1.5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/90 font-mono cosmic-text-2xs font-bold text-[#111] ring-2 ring-white/30">1</span>
                      <div className="rounded-lg border border-white/15 bg-[#0b0b12]/78 px-2 py-1 backdrop-blur-sm">
                        <p className="font-inter cosmic-text-2xs font-semibold text-white/95">Street passers</p>
                        <p className="mt-0.5 font-inter cosmic-text-2xs text-white/55">Tracks past glass</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute z-10 max-w-[40%] -translate-x-1/2 -translate-y-1/2"
                    style={{ left: "62%", top: "48%" }}
                  >
                    <div className="flex items-start gap-1.5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#8B7CF6] font-mono cosmic-text-2xs font-bold text-white ring-2 ring-[#8B7CF6]/40">2</span>
                      <div className="rounded-lg border border-white/15 bg-[#0b0b12]/78 px-2 py-1 backdrop-blur-sm">
                        <p className="font-inter cosmic-text-2xs font-semibold text-white/95">Window stop</p>
                        <p className="mt-0.5 font-inter cosmic-text-2xs text-white/55">≥4s in zone</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute z-10 max-w-[40%] -translate-x-1/2 -translate-y-1/2"
                    style={{ left: "78%", top: "62%" }}
                  >
                    <div className="flex items-start gap-1.5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#3ECF8E] font-mono cosmic-text-2xs font-bold text-[#062016] ring-2 ring-[#3ECF8E]/40">3</span>
                      <div className="rounded-lg border border-white/15 bg-[#0b0b12]/78 px-2 py-1 backdrop-blur-sm">
                        <p className="font-inter cosmic-text-2xs font-semibold text-white/95">Enter</p>
                        <p className="mt-0.5 font-inter cosmic-text-2xs text-white/55">Tripwire IN</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <p className="mb-2 font-inter cosmic-text-2xs leading-snug text-white/50">
                      Looking at: Bandra flagship glass from Cam 01. Numbers = demo funnel for today — passers, window stops, entries.
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { k: "Pass", v: "2,481", d: "at glass" },
                        { k: "Stop", v: "186", d: "≥4s · 7.5%" },
                        { k: "Enter", v: "39", d: "tripwire" },
                      ].map((r) => (
                        <div key={r.k} className="rounded-xl border border-white/12 bg-[#0b0b12]/75 px-3 py-2.5 backdrop-blur-sm">
                          <p className="font-mono cosmic-text-2xs tracking-[0.12em] text-white/45">{r.k}</p>
                          <p className="mt-0.5 font-num cosmic-text-lg font-bold text-[#f5f5f7]">{r.v}</p>
                          <p className="mt-0.5 font-inter cosmic-text-2xs text-white/40">{r.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex h-10 items-end gap-1 border-t border-white/10 px-4 py-2.5">
                  {RHYTHM.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${Math.max(h * 0.55, 12)}%`,
                        background: i >= 12 ? "#3ECF8E" : "rgba(139,124,246,0.55)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
