"use client"

import { useState } from "react"
import { Check, Cpu, Cloud } from "lucide-react"
import { Reveal } from "../components/Reveal"
import { Section } from "../components/Section"
import { SectionHeader } from "../components/SectionHeader"
import { PLANS } from "../data/site"

type Path = "edge" | "cloud"

export function Plans({ onPilot }: { onPilot?: () => void }) {
  const p = PLANS
  const [path, setPath] = useState<Path>("edge")
  const active = path === "edge" ? p.edge : p.cloud
  const Icon = path === "edge" ? Cpu : Cloud

  return (
    <Section id="plans" className="site-scope scroll-mt-24" bg="var(--cosmic-deep)">
      <div className="mx-auto max-w-[1200px] px-6 relative z-10">
        <div className="max-w-2xl">
          <SectionHeader index={p.index} kicker={p.kicker} sub={p.sub}>
            {p.h2}
          </SectionHeader>
        </div>

        <Reveal delay={0.08}>
          <div
            className="mt-8 inline-flex rounded-full border border-white/10 bg-[#0b0b12]/80 p-1"
            role="tablist"
            aria-label="Deployment path"
          >
            {(["edge", "cloud"] as const).map((id) => {
              const selected = path === id
              const label = id === "edge" ? p.toggle.edge : p.toggle.cloud
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setPath(id)}
                  className={`rounded-full px-6 py-2.5 cosmic-text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                    selected
                      ? "bg-[#8B7CF6] text-[#05050a]"
                      : "text-[#a1a1aa] hover:text-[#f5f5f7]"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.12} key={path}>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="cosmic-card rounded-3xl p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#8B7CF6]/10 text-[#8B7CF6]">
                  <Icon size={22} strokeWidth={1.9} />
                </span>
                <div>
                  <h3 className="cosmic-text-2xl font-bold text-[#f5f5f7]">{active.title}</h3>
                  <p className="mt-1 cosmic-text-sm text-[#8B7CF6]">{active.tagline}</p>
                </div>
              </div>

              <p className="mt-6 cosmic-text-base leading-relaxed text-[#a1a1aa]">{active.when}</p>

              <ul className="mt-6 space-y-3">
                {active.runs.map((line) => (
                  <li key={line} className="flex items-start gap-3 cosmic-text-sm text-[#f5f5f7]">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#8B7CF6]/10 text-[#8B7CF6]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-[#a1a1aa]">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="cosmic-text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7CF6]">
                  Privacy on this path
                </p>
                <p className="mt-3 cosmic-text-base leading-relaxed text-[#a1a1aa]">{active.privacy}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-[#05050a]/50 p-4">
                    <p className="cosmic-text-2xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                      Never as identity
                    </p>
                    <p className="mt-2 cosmic-text-sm text-[#f5f5f7]">{active.neverLeaves}</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-[#05050a]/50 p-4">
                    <p className="cosmic-text-2xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                      What can leave
                    </p>
                    <p className="mt-2 cosmic-text-sm text-[#f5f5f7]">{active.canLeave}</p>
                  </div>
                </div>
              </div>
            </article>

            <aside className="flex flex-col gap-5">
              <div className="cosmic-card-glow rounded-3xl p-8">
                <p className="cosmic-text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7CF6]">
                  Shared on both paths
                </p>
                <ul className="mt-5 space-y-3">
                  {p.shared.map((line) => (
                    <li key={line} className="flex items-start gap-3 cosmic-text-sm text-[#a1a1aa]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B7CF6]" />
                      {line}
                    </li>
                  ))}
                </ul>
                {onPilot && (
                  <button
                    type="button"
                    onClick={onPilot}
                    className="mt-8 w-full rounded-full bg-[#8B7CF6] px-6 py-3.5 cosmic-text-sm font-semibold text-[#05050a] transition-all duration-200 hover:bg-[#6E5CE6] active:scale-[0.98]"
                  >
                    {p.cta}
                  </button>
                )}
              </div>
              <p className="px-1 cosmic-text-xs leading-relaxed text-[#86868b]">
                Edge and Cloud are peer options. Pilot terms are scoped on a short call — no public rate card.
              </p>
            </aside>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
