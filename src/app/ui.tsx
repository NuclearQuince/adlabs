import type { ReactNode } from "react"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

export function Panel({
  title,
  action,
  children,
  className,
  pad = true,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  pad?: boolean
}) {
  return (
    <section
      className={`rounded-2xl border bg-[var(--app-card)] text-[var(--app-text)] ${
        pad ? "p-5 sm:p-6" : ""
      } border-[var(--app-line)] ${className ?? ""}`}
      style={{ boxShadow: "var(--app-shadow)" }}
    >
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          {title && (
            <h3 className="font-inter text-[13px] font-semibold tracking-[0.02em] text-[var(--app-text)]">
              {title}
            </h3>
          )}
          {action}
        </header>
      )}
      {children}
    </section>
  )
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--app-faint)]">
      {children}
    </span>
  )
}

export function DeltaPill({ delta, tone, note }: { delta: string; tone: "pos" | "neg" | "flat"; note?: string }) {
  const Icon = tone === "pos" ? ArrowUpRight : tone === "neg" ? ArrowDownRight : Minus
  const color = tone === "pos" ? "var(--app-pos)" : tone === "neg" ? "var(--app-neg)" : "var(--app-faint)"
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-inter text-[11.5px] font-semibold font-num"
      style={{ color, background: `color-mix(in srgb, ${color} 12%, transparent)` }}
      title={note}
    >
      <Icon size={12} strokeWidth={2.4} />
      {delta}
    </span>
  )
}

export function GradePill({ grade }: { grade: "A" | "B" | "C" }) {
  const map = {
    A: { color: "var(--app-pos)", label: "Grade A" },
    B: { color: "var(--app-sub)", label: "Grade B" },
    C: { color: "var(--app-neg)", label: "Grade C" },
  } as const
  const g = map[grade]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-inter text-[11px] font-bold"
      style={{ color: g.color, background: `color-mix(in srgb, ${g.color} 12%, transparent)` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: g.color }} />
      {g.label}
    </span>
  )
}

export function Chip({
  children,
  tone = "neutral",
  title,
}: {
  children: ReactNode
  tone?: "neutral" | "gold" | "live"
  title?: string
}) {
  const style =
    tone === "gold"
      ? { color: "var(--app-gold)", background: "var(--app-gold-soft)" }
      : tone === "live"
        ? { color: "#3d4d1f", background: "#d4f53c" }
        : { color: "var(--app-sub)", background: "var(--app-raise)", border: "1px solid var(--app-line)" }
  return (
    <span
      title={title}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-inter text-[11px] font-semibold tracking-[0.02em]"
      style={style}
    >
      {tone === "live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#3d4d1f] opacity-60 animate-pulse-ring" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3d4d1f]" />
        </span>
      )}
      {children}
    </span>
  )
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div
      className="inline-flex rounded-full border p-0.5 font-inter text-[12px] font-medium"
      style={{ background: "var(--app-card)", borderColor: "var(--app-line)" }}
      role="tablist"
    >
      {options.map((o) => {
        const active = o === value
        return (
          <button
            key={o}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o)}
            className={`rounded-full px-3 py-1.5 transition-colors duration-150 ${
              active ? "text-[var(--app-text)]" : "text-[var(--app-sub)] hover:text-[var(--app-text)]"
            }`}
            style={active ? { background: "var(--app-raise)", boxShadow: "var(--app-shadow)" } : undefined}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

export function PeerDot({ peer }: { peer: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-inter text-[11px] font-medium text-[var(--app-faint)]"
      title={`Anonymised peer benchmark: ${peer}`}
    >
      <span className="h-2 w-2 rounded-full border-2" style={{ borderColor: "var(--app-gold)" }} />
      peer {peer}
    </span>
  )
}
