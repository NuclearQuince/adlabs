import { useState } from "react"
import type { FormEvent } from "react"
import { Check, ChevronDown, Send } from "lucide-react"
import { Reveal } from "../components/Reveal"
import { SectionHeader } from "../components/SectionHeader"
import { HOW, PILOT_FORM, BRAND } from "../data/site"

const inputCls =
  "w-full rounded-xl border border-[rgba(18,18,18,0.16)] bg-[#FAF8F5] px-4 py-3 text-[14px] text-[#121212] placeholder:text-[#121212]/35 transition-colors duration-150 focus:border-[#121212] focus:outline-none"

export function How({ onPilot }: { onPilot: () => void }) {
  const h = HOW
  const [sent, setSent] = useState(false)
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null)
  const [email, setEmail] = useState("")

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="how" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeader index={h.index} kicker={h.kicker}>
        {h.h2}
      </SectionHeader>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {h.steps.map((s, i) => (
          <Reveal key={s.num} delay={i * 0.1}>
            <article className="relative h-full overflow-hidden rounded-3xl border border-[rgba(18,18,18,0.1)] bg-[#FFFFFF] p-7 shadow-clay">
              <span className="absolute -right-3 -top-6 font-serif text-[120px] leading-none text-[#121212]/[0.05]">
                {s.num}
              </span>
              <h3 className="font-serif text-[28px] text-[#121212]">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#121212]/60">{s.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-16 grid gap-10 rounded-3xl border border-[rgba(18,18,18,0.1)] bg-beige/60 p-8 shadow-clay sm:p-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <span className="kicker text-[#121212]/45">{h.wishlist.kicker}</span>
            <h3 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-[#121212]">
              What happens <em className="italic">outside</em> your store matters.
              <br />
              Start understanding it.
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#121212]/60">{h.wishlist.sub}</p>
            <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-[#121212]/35">
              {h.compat}
            </p>
            <button
              onClick={onPilot}
              className="mt-8 w-fit rounded-full border border-[rgba(18,18,18,0.2)] px-6 py-3 text-[13.5px] font-semibold text-[#121212] transition-all duration-200 hover:border-[#121212] active:scale-[0.98]"
            >
              Or book a full pilot →
            </button>
          </div>

          {!sent ? (
            <form onSubmit={submit} className="flex flex-col gap-4" aria-label="Join the pilot list">
              <div>
                <label htmlFor="wl-brand" className="mb-1.5 block text-[12px] font-semibold text-[#121212]/70">
                  {PILOT_FORM.fields.brand.label}
                </label>
                <input
                  id="wl-brand"
                  required
                  placeholder={PILOT_FORM.fields.brand.placeholder}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="wl-email" className="mb-1.5 block text-[12px] font-semibold text-[#121212]/70">
                  {PILOT_FORM.fields.email.label}
                </label>
                <input
                  id="wl-email"
                  type="email"
                  required
                  placeholder={PILOT_FORM.fields.email.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="wl-stores" className="mb-1.5 block text-[12px] font-semibold text-[#121212]/70">
                    Store Locations
                  </label>
                  <div className="relative">
                    <select id="wl-stores" className={`${inputCls} appearance-none pr-10`} defaultValue="1-5 Stores">
                      {PILOT_FORM.fields.locations.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#121212]/40" />
                  </div>
                </div>
                <div>
                  <label htmlFor="wl-sector" className="mb-1.5 block text-[12px] font-semibold text-[#121212]/70">
                    {PILOT_FORM.fields.sector.label}
                  </label>
                  <div className="relative">
                    <select id="wl-sector" className={`${inputCls} appearance-none pr-10`} defaultValue={PILOT_FORM.fields.sector.options[0]}>
                      {PILOT_FORM.fields.sector.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#121212]/40" />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#121212] px-7 py-3.5 text-[14px] font-semibold text-[#FAF8F5] shadow-clay transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D4F53C] hover:text-black active:scale-[0.98]"
              >
                <Send size={15} strokeWidth={2.4} />
                Join the pilot list
              </button>
              <p className="text-[11.5px] leading-relaxed text-[#121212]/40">
                {PILOT_FORM.note} Replies land at {BRAND.email}.
              </p>
            </form>
          ) : (
            <div className="flex flex-col items-start justify-center rounded-2xl bg-[#FFFFFF] p-8 shadow-clay">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#D4F53C] text-black">
                <Check size={22} strokeWidth={2.6} />
              </span>
              <h4 className="mt-5 font-serif text-3xl text-[#121212]">{h.wishlist.successTitle}</h4>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#121212]/60">{h.wishlist.successBody}</p>
              {email && (
                <p className="mt-3 font-mono text-[12px] text-[#121212]/45">
                  {h.wishlist.successNote} {email}
                </p>
              )}
              <div className="mt-8 border-t border-[rgba(18,18,18,0.08)] pt-6">
                {feedback === null ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[13px] font-medium text-[#121212]/70">{h.wishlist.feedbackQ}</span>
                    <button
                      onClick={() => setFeedback("yes")}
                      className="rounded-full border border-[rgba(18,18,18,0.18)] px-4 py-1.5 text-[12.5px] font-semibold text-[#121212] transition-colors hover:border-[#121212]"
                    >
                      {h.wishlist.feedbackYes}
                    </button>
                    <button
                      onClick={() => setFeedback("no")}
                      className="rounded-full border border-[rgba(18,18,18,0.18)] px-4 py-1.5 text-[12.5px] font-semibold text-[#121212] transition-colors hover:border-[#121212]"
                    >
                      {h.wishlist.feedbackNo}
                    </button>
                  </div>
                ) : (
                  <p className="text-[13px] font-medium text-[#121212]/60">{h.wishlist.feedbackThanks}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}
