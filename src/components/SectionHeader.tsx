import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

export function SectionHeader({
  index,
  kicker,
  children,
  sub,
  center = false,
  light = false,
}: {
  index?: string
  kicker: string
  children: ReactNode
  sub?: string
  center?: boolean
  light?: boolean
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        {index && (
          <span
            className="font-mono text-[11px] tracking-[0.18em]"
            style={{ color: light ? "rgba(250,248,245,0.55)" : "rgba(18,18,18,0.45)" }}
          >
            {index} /
          </span>
        )}
        <span
          className="kicker"
          style={{ color: light ? "rgba(250,248,245,0.55)" : "rgba(18,18,18,0.5)" }}
        >
          {kicker}
        </span>
      </div>
      <h2
        className={`mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl ${
          light ? "text-[#FAF8F5]" : "text-[#121212]"
        }`}
      >
        {children}
      </h2>
      {sub && (
        <p
          className={`mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base ${
            center ? "mx-auto" : ""
          } ${light ? "text-[#FAF8F5]/70" : "text-[#121212]/65"}`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  )
}
