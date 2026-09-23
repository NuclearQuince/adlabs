"use client"

import { Reveal } from "../components/Reveal"
import { HERO } from "../data/site"
import Link from "next/link"
import { ArrowRight, Eye, Zap, Shield } from "lucide-react"

export function Hero({ onPilot }: { onPilot: () => void }) {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0">
        <img 
          src="/images/cosmic/nebula1.jpg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05050a]/80 via-[#05050a]/60 to-[#05050a]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#8B7CF6]/40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: The Hook */}
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
              <p className="mt-6 visual-sub max-w-[500px]">
                {HERO.sub}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#8B7CF6] px-8 py-4 ds-text-base font-semibold text-white transition-all duration-300 hover:bg-[#6E5CE6] hover:shadow-[0_0_40px_rgba(139,124,246,0.4)] active:scale-[0.98]"
                >
                  {HERO.demoCta ?? "See it live"}
                  <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <button
                  onClick={onPilot}
                  className="inline-flex items-center gap-2 rounded-full border border-[#8B7CF6]/30 bg-[#8B7CF6]/10 px-8 py-4 ds-text-base font-medium text-[#8B7CF6] transition-all duration-300 hover:bg-[#8B7CF6]/20 hover:border-[#8B7CF6]/50 active:scale-[0.98]"
                >
                  {HERO.primaryCta}
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right: The Product */}
          <Reveal delay={0.2} y={20} scale={0.98}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-10 bg-[radial-gradient(400px_400px_at_50%_50%,rgba(139,124,246,0.15),transparent_70%)]" />
              
              {/* Product card */}
              <div className="relative overflow-hidden rounded-[24px] border border-[#8B7CF6]/20 bg-[#0c0c14]/80 backdrop-blur-xl p-8">
                <img
                  src="/images/product-edge-box.svg"
                  alt="AD Labs Edge Observer"
                  className="w-full max-w-[400px] mx-auto"
                />
                
                {/* Live indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-[#8B7CF6]/20 px-3 py-1.5 cosmic-text-xs font-medium text-[#8B7CF6] backdrop-blur-sm border border-[#8B7CF6]/30">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3ECF8E]" />
                  {HERO.cam}
                </div>

                {/* Product info */}
                <div className="mt-6 text-center">
                  <p className="cosmic-text-lg font-bold text-white">Edge Observer</p>
                  <p className="mt-2 cosmic-text-sm text-white/60">
                    12W · PoE · Your cameras · Zero faces
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Visual metrics strip */}
        <Reveal delay={0.4}>
          <div className="mt-16 grid grid-cols-3 gap-4">
            {[
              { icon: Eye, value: "2,481", label: "People counted today", color: "#8B7CF6" },
              { icon: Zap, value: "7.5%", label: "Stopped to look", color: "#3ECF8E" },
              { icon: Shield, value: "0", label: "Faces stored", color: "#5ac8fa" },
            ].map((m) => (
              <div key={m.label} className="metric-visual">
                <m.icon size={24} style={{ color: m.color }} />
                <span className="value mt-3" style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {m.value}
                </span>
                <span className="label">{m.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
