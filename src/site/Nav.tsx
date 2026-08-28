import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { NAV } from "../data/site"
import { Logo } from "../components/Logo"

export function Nav({ onPilot }: { onPilot: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    fn()
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-[rgba(18,18,18,0.08)] bg-[#FAF8F5]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a href="#top" aria-label="AD Labs home" className="transition-opacity hover:opacity-70">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[13.5px] font-medium text-[#121212]/65 transition-colors duration-150 hover:text-[#121212]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onPilot}
            className="hidden rounded-full bg-[#121212] px-5 py-2.5 text-[13.5px] font-semibold text-[#FAF8F5] shadow-clay transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D4F53C] hover:text-black active:scale-[0.98] sm:block"
          >
            Book a Pilot
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(18,18,18,0.14)] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[rgba(18,18,18,0.08)] bg-[#FAF8F5] px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-[15px] font-medium text-[#121212]/75"
              >
                {n.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                onPilot()
              }}
              className="mt-2 w-full rounded-full bg-[#121212] px-5 py-3 text-[14px] font-semibold text-[#FAF8F5]"
            >
              Book a Pilot
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
