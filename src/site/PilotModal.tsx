import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { PILOT_FORM } from "../data/site"

const inputCls =
  "w-full rounded-xl border border-[rgba(18,18,18,0.16)] bg-[#FAF8F5] px-4 py-3 text-[14px] text-[#121212] placeholder:text-[#121212]/35 transition-colors duration-150 focus:border-[#121212] focus:outline-none"

export function PilotModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false)
  const f = PILOT_FORM

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    if (open) {
      document.addEventListener("keydown", esc)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", esc)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={f.title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-[#FAF8F5] shadow-clay-lg sm:rounded-3xl"
      >
        <div className="flex items-start justify-between p-6 pb-0 sm:p-8 sm:pb-0">
          <span className="kicker text-[#121212]/45">{f.title}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(18,18,18,0.14)] text-[#121212]/60 transition-colors hover:border-[#121212] hover:text-[#121212]"
          >
            <X size={16} />
          </button>
        </div>

        {!sent ? (
          <div className="p-6 sm:p-8">
            <h3 className="font-serif text-3xl leading-tight tracking-[-0.01em] text-[#121212]">{f.h2}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-[#121212]/60">{f.sub}</p>

            <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
              <div>
                <label htmlFor="pf-brand" className="mb-1.5 block text-[12px] font-semibold text-[#121212]/70">
                  {f.fields.brand.label}
                </label>
                <input id="pf-brand" required placeholder={f.fields.brand.placeholder} className={inputCls} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="pf-sector" className="mb-1.5 block text-[12px] font-semibold text-[#121212]/70">
                    {f.fields.sector.label}
                  </label>
                  <div className="relative">
                    <select id="pf-sector" className={`${inputCls} appearance-none pr-10`} defaultValue={f.fields.sector.options[0]}>
                      {f.fields.sector.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#121212]/40" />
                  </div>
                </div>
                <div>
                  <label htmlFor="pf-loc" className="mb-1.5 block text-[12px] font-semibold text-[#121212]/70">
                    {f.fields.locations.label}
                  </label>
                  <div className="relative">
                    <select id="pf-loc" className={`${inputCls} appearance-none pr-10`} defaultValue={f.fields.locations.options[0]}>
                      {f.fields.locations.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#121212]/40" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="pf-email" className="mb-1.5 block text-[12px] font-semibold text-[#121212]/70">
                  {f.fields.email.label}
                </label>
                <input id="pf-email" type="email" required placeholder={f.fields.email.placeholder} className={inputCls} />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-[#121212] px-7 py-3.5 text-[14px] font-semibold text-[#FAF8F5] shadow-clay transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D4F53C] hover:text-black active:scale-[0.98]"
              >
                {f.submit}
              </button>
              <p className="text-[11.5px] leading-relaxed text-[#121212]/40">{f.note}</p>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-start p-8 sm:p-10">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#D4F53C] text-black">
              <Check size={22} strokeWidth={2.6} />
            </span>
            <h3 className="mt-5 font-serif text-3xl text-[#121212]">{f.successTitle}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[#121212]/60">{f.successBody}</p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full border border-[rgba(18,18,18,0.2)] px-6 py-3 text-[13.5px] font-semibold text-[#121212] transition-colors hover:border-[#121212]"
            >
              {f.return}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
