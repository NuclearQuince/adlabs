import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight, Minus, CircleHelp, BadgeCheck, Info } from "lucide-react"

export function ScreenHeader({
  icon: Icon,
  eyebrow,
  title,
  sub,
  children,
}: {
  icon?: LucideIcon
  eyebrow?: string
  title: ReactNode
  sub?: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <span
            className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl border"
            style={{ background: "var(--app-accent-soft)", color: "var(--app-accent)", borderColor: "var(--app-line)" }}
          >
            <Icon size={18} strokeWidth={1.9} />
          </span>
        )}
        <div className="min-w-0">
          {eyebrow && (
            <p className="font-inter cosmic-text-2xs font-bold uppercase tracking-[0.2em] text-[var(--app-faint)]">
              {eyebrow}
            </p>
          )}
          <h1 className="font-inter font-bold tracking-[-0.01em] cosmic-text-xl text-[var(--app-text)]">{title}</h1>
          {sub && <p className="mt-0.5 font-inter cosmic-text-xs text-[var(--app-faint)]">{sub}</p>}
        </div>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  )
}

export function Panel({
  title,
  action,
  children,
  className,
  pad = true,
  info,
  verified,
  sub,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  pad?: boolean
  info?: string
  verified?: string
  /** Plain-language definition under the title */
  sub?: string
}) {
  const headPad = !pad && (title || action || info || verified || sub) ? "px-6 pt-5 sm:px-7" : ""
  return (
    <section
      className={`app-panel min-w-0 rounded-3xl border bg-[var(--app-card)] text-[var(--app-text)] ${
        pad ? "p-6 sm:p-7" : ""
      } border-[var(--app-line)] ${className ?? ""}`}
      style={{ boxShadow: "var(--app-shadow)" }}
    >
      {(title || action || info || verified || sub) && (
        <header className={`mb-5 flex items-start justify-between gap-3 ${headPad}`}>
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              {title && <h3 className="card-title text-[var(--app-text)]">{title}</h3>}
              {info && <InfoTip text={info} />}
              {verified && <VerifiedTag note={verified} />}
            </div>
            {sub && (
              <p className="mt-1 font-inter cosmic-text-xs leading-snug text-[var(--app-faint)]">{sub}</p>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}

/** KPI label + plain-language hint (tooltip + visible sublabel). */
export function MetricLabel({
  label,
  hint,
}: {
  label: string
  hint?: string
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        <Label>{label}</Label>
        {hint && <InfoTip text={hint} />}
      </div>
      {hint && (
        <p className="mt-1 line-clamp-2 font-inter cosmic-text-2xs leading-snug text-[var(--app-faint)]">{hint}</p>
      )}
    </div>
  )
}

export function InfoTip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex shrink-0 cursor-help">
      <CircleHelp
        size={14}
        strokeWidth={2}
        aria-label={text}
        className="text-[var(--app-faint)] transition-colors group-hover:text-[var(--app-gold)]"
      />
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-0 z-50 w-52 rounded-xl border border-[var(--app-line)] p-3 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 sm:left-1/2 sm:-translate-x-1/2 sm:w-56"
        style={{ background: "var(--app-card)" }}
      >
        <span className="block font-inter cosmic-text-xs leading-relaxed text-[var(--app-sub)]">{text}</span>
      </span>
    </span>
  )
}

export function VerifiedTag({ note }: { note: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-inter cosmic-text-2xs font-bold"
      style={{ background: "color-mix(in srgb, var(--app-pos) 10%, transparent)", color: "var(--app-pos)" }}
      title={note}
    >
      <BadgeCheck size={11} strokeWidth={2.6} />
      VERIFIED
    </span>
  )
}

export function Note({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "gold" | "pos" }) {
  const color = tone === "gold" ? "var(--app-gold)" : tone === "pos" ? "var(--app-pos)" : "var(--app-faint)"
  return (
    <p className="mt-4 flex items-start gap-2 border-t border-[var(--app-line)] pt-3 font-inter cosmic-text-xs leading-relaxed text-[var(--app-faint)]">
      <Info size={12} className="mt-0.5 shrink-0" style={{ color }} />
      <span>{children}</span>
    </p>
  )
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-inter cosmic-text-xs font-bold uppercase tracking-[0.12em] text-[var(--app-faint)]">
      {children}
    </span>
  )
}

export function DeltaPill({ delta, tone, note }: { delta: string; tone: "pos" | "neg" | "flat"; note?: string }) {
  const Icon = tone === "pos" ? ArrowUpRight : tone === "neg" ? ArrowDownRight : Minus
  const color = tone === "pos" ? "var(--app-pos)" : tone === "neg" ? "var(--app-neg)" : "var(--app-faint)"
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-inter cosmic-text-xs font-semibold font-num"
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
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-inter cosmic-text-xs font-bold"
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
        ? { color: "#05050a", background: "#8B7CF6" }
        : { color: "var(--app-sub)", background: "var(--app-raise)", border: "1px solid var(--app-line)" }
  return (
    <span
      title={title}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-inter cosmic-text-xs font-semibold tracking-[0.02em]"
      style={style}
    >
      {tone === "live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#000000] opacity-60 animate-pulse-ring" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#000000]" />
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
      className="inline-flex rounded-full border p-0.5 font-inter cosmic-text-xs font-medium"
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
      className="inline-flex items-center gap-1.5 font-inter cosmic-text-xs font-medium text-[var(--app-faint)]"
      title={`Anonymised peer benchmark: ${peer}`}
    >
      <span className="h-2 w-2 rounded-full border-2" style={{ borderColor: "var(--app-gold)" }} />
      peer {peer}
    </span>
  )
}
