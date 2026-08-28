import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { BRAND, SOCIALS, NAV } from "../data/site"
import { Logo } from "../components/Logo"
import { LinkedInIcon, InstagramIcon } from "../components/BrandIcons"

export function Footer() {
  const year = new Date().getFullYear()
  const social = (url: string, label: string, icon: ReactNode) => (
    <a
      href={url || "#"}
      onClick={(e) => !url && e.preventDefault()}
      title={url ? label : `${label} — ${SOCIALS.label}`}
      aria-label={label}
      className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-200 ${
        url
          ? "border-[#FAF8F5]/20 text-[#FAF8F5]/70 hover:border-[#D4F53C] hover:text-[#D4F53C]"
          : "cursor-not-allowed border-[#FAF8F5]/10 text-[#FAF8F5]/30"
      }`}
    >
      {icon}
    </a>
  )
  return (
    <footer className="bg-[#121212] pb-10 pt-20 text-[#FAF8F5]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-sm">
            <Logo dark />
            <p className="mt-5 text-[14px] leading-relaxed text-[#FAF8F5]/55">{BRAND.tagline}</p>
            <div className="mt-7 flex gap-3">
              {social(SOCIALS.linkedin, "LinkedIn", <LinkedInIcon size={16} />)}
              {social(SOCIALS.instagram, "Instagram", <InstagramIcon size={16} />)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Sections">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#FAF8F5]/35">EXPLORE</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="text-[13.5px] text-[#FAF8F5]/60 transition-colors hover:text-[#FAF8F5]">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Product">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#FAF8F5]/35">PRODUCT</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1 text-[13.5px] text-[#FAF8F5]/60 transition-colors hover:text-[#FAF8F5]"
                  >
                    The Dashboard <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <a href="#system" className="text-[13.5px] text-[#FAF8F5]/60 transition-colors hover:text-[#FAF8F5]">
                    One Sensor System
                  </a>
                </li>
                <li>
                  <a href="#how" className="text-[13.5px] text-[#FAF8F5]/60 transition-colors hover:text-[#FAF8F5]">
                    Pilot Program
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="text-[13.5px] text-[#FAF8F5]/60 transition-colors hover:text-[#FAF8F5]">
                    Privacy Charter
                  </a>
                </li>
              </ul>
            </nav>
            <nav aria-label="Company">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#FAF8F5]/35">COMPANY</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a href="#team" className="text-[13.5px] text-[#FAF8F5]/60 transition-colors hover:text-[#FAF8F5]">
                    Team
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BRAND.email}`} className="text-[13.5px] text-[#FAF8F5]/60 transition-colors hover:text-[#FAF8F5]">
                    {BRAND.email}
                  </a>
                </li>
                <li className="text-[13.5px] text-[#FAF8F5]/60">{BRAND.city}</li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#FAF8F5]/10 pt-8 sm:flex-row">
          <p className="font-mono text-[10.5px] tracking-[0.08em] text-[#FAF8F5]/35">
            © {year} {BRAND.legal} · {BRAND.city}
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.08em] text-[#FAF8F5]/35">{BRAND.domain}</p>
        </div>
      </div>
    </footer>
  )
}
