"use client"

import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Reveal } from "../components/Reveal"
import { Section } from "../components/Section"
import { SectionHeader } from "../components/SectionHeader"
import { PRICING } from "../data/site"

export function Pricing() {
  const p = PRICING
  return (
    <Section id="pricing" className="site-scope scroll-mt-24 bg-[#12121a]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeader index={p.index} kicker={p.kicker} sub={p.sub} center>
          {p.h2}
        </SectionHeader>

        <div className="mt-8 mx-auto grid max-w-4xl items-stretch gap-6 lg:grid-cols-2">
          {p.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <article
                className={`flex h-full min-h-[420px] flex-col p-8 ${
                  plan.featured ? "site-card-featured" : "site-card"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="cosmic-text-xs font-semibold uppercase tracking-normal text-[#8B7CF6]">{plan.tag}</span>
                  {plan.featured && (
                    <span className="rounded-full bg-[#8B7CF6] px-4 py-1.5 cosmic-text-xs font-bold text-[#05050a]">
                      POPULAR
                    </span>
                  )}
                </div>
                <h3 className="cosmic-text-2xl font-bold text-[#f5f5f7]">{plan.name}</h3>
                <p className="mt-3 cosmic-text-base leading-relaxed text-[#a1a1aa]">{plan.desc}</p>

                <ul className="mt-8 flex flex-col gap-3">
                  {plan.includes.map((f) => (
                    <li key={f} className="flex items-start gap-3 cosmic-text-sm text-[#f5f5f7]">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#8B7CF6]/10 text-[#8B7CF6]">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-[#a1a1aa]">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <div className="border-t border-white/8 pt-6">
                    <p className="cosmic-text-sm font-semibold leading-snug text-[#f5f5f7]">{plan.price}</p>
                  </div>
                  <Link
                    href="/#contact"
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 cosmic-text-base font-semibold transition-all duration-300 active:scale-[0.98] ${
                      plan.featured
                        ? "bg-[#8B7CF6] text-[#05050a] font-semibold shadow-[0_8px_24px_rgba(139,124,246,0.25)] hover:bg-[#6E5CE6] hover:shadow-[0_12px_32px_rgba(139,124,246,0.35)]"
                        : "border border-white/15 text-[#f5f5f7] hover:border-[#8B7CF6] hover:text-[#8B7CF6]"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center cosmic-text-sm font-medium text-[#86868b]">{p.bottom}</p>
      </div>
    </Section>
  )
}
