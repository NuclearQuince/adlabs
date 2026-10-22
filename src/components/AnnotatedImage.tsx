"use client"

import type { ReactNode } from "react"

export type ImageBadge = {
  text: string
  tone?: "live" | "before" | "after" | "warn" | "neutral" | "gold"
  corner?: "tl" | "tr" | "bl" | "br"
}

export type ImageCallout = {
  n?: number
  label: string
  detail?: string
  /** Percent of image width/height */
  x: number
  y: number
  tone?: "accent" | "warn" | "pos" | "neutral"
  /** Optional stable id for selection (e.g. zone code) */
  id?: string
}

export type ImageZone = {
  /** SVG polygon points as "x,y x,y ..." in 0–100 viewBox */
  points: string
  code?: string
  label?: string
  tone?: "accent" | "warn" | "pos" | "muted"
  /** Stronger stroke when this zone is selected */
  selected?: boolean
}

const BADGE_STYLE: Record<NonNullable<ImageBadge["tone"]>, string> = {
  live: "border-[#3ECF8E]/45 bg-[#0b0b12]/75 text-[#6effb0]",
  before: "border-white/25 bg-[#0b0b12]/75 text-white/70",
  after: "border-[#8B7CF6]/45 bg-[#0b0b12]/75 text-[#c4b5fd]",
  warn: "border-amber-400/40 bg-[#0b0b12]/75 text-amber-200",
  neutral: "border-white/20 bg-[#0b0b12]/70 text-white/75",
  gold: "border-[var(--app-gold,#c9a227)]/40 bg-[#0b0b12]/75 text-[var(--app-gold,#e8c547)]",
}

const CORNER: Record<NonNullable<ImageBadge["corner"]>, string> = {
  tl: "left-3 top-3 sm:left-4 sm:top-4",
  tr: "right-3 top-3 sm:right-4 sm:top-4",
  bl: "left-3 bottom-3 sm:left-4 sm:bottom-4",
  br: "right-3 bottom-3 sm:right-4 sm:bottom-4",
}

const ZONE_STROKE: Record<NonNullable<ImageZone["tone"]>, string> = {
  accent: "rgba(139,124,246,0.72)",
  warn: "rgba(251,191,36,0.7)",
  pos: "rgba(62,207,142,0.7)",
  muted: "rgba(255,255,255,0.22)",
}

const ZONE_FILL: Record<NonNullable<ImageZone["tone"]>, string> = {
  accent: "rgba(139,124,246,0.1)",
  warn: "rgba(251,191,36,0.1)",
  pos: "rgba(62,207,142,0.09)",
  muted: "rgba(255,255,255,0.03)",
}

const CALLOUT_DOT: Record<NonNullable<ImageCallout["tone"]>, string> = {
  accent: "bg-[#8B7CF6] text-white ring-[#8B7CF6]/40",
  warn: "bg-amber-400 text-[#1a1408] ring-amber-400/40",
  pos: "bg-[#3ECF8E] text-[#062016] ring-[#3ECF8E]/40",
  neutral: "bg-white/90 text-[#111] ring-white/30",
}

/**
 * Photo with neat, professional markings: badges, zone outlines, numbered callouts.
 * Captions sit under the frame — not sticker clutter on the image.
 */
export function AnnotatedImage({
  src,
  alt,
  badges,
  callouts,
  zones,
  caption,
  metric,
  explain,
  aspectClass = "aspect-[16/10]",
  className = "",
  loading = "lazy",
  children,
  gradient = true,
  selectedId,
  onSelect,
}: {
  src: string
  alt: string
  badges?: ImageBadge[]
  callouts?: ImageCallout[]
  zones?: ImageZone[]
  /** Short title under the image */
  caption?: string
  /** Metric line under caption */
  metric?: string
  /** Plain-language what you are looking at */
  explain?: string
  aspectClass?: string
  className?: string
  loading?: "lazy" | "eager"
  children?: ReactNode
  gradient?: boolean
  /** Currently selected mark id (zone code) */
  selectedId?: string | null
  /** Two-way: clicking a callout or zone selects it */
  onSelect?: (id: string) => void
}) {
  return (
    <figure className={`overflow-hidden ${className}`}>
      <div className={`relative overflow-hidden ${aspectClass}`}>
        <img src={src} alt={alt} loading={loading} className="h-full w-full object-cover" />
        {gradient && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15"
          />
        )}

        {/* Zone outlines — clickable when onSelect provided */}
        {zones && zones.length > 0 && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden={!onSelect}
          >
            {zones.map((z, i) => {
              const tone = z.tone ?? "accent"
              const isSel = z.selected || (z.code != null && z.code === selectedId)
              const fill = isSel ? ZONE_FILL[tone === "muted" ? "accent" : tone] : ZONE_FILL.muted
              const stroke = isSel
                ? ZONE_STROKE[tone === "muted" ? "accent" : tone]
                : ZONE_STROKE.muted
              const sw = isSel ? 0.55 : 0.25
              const code = z.code
              if (onSelect && code) {
                return (
                  <g key={code}>
                    <polygon
                      points={z.points}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={sw}
                      vectorEffect="non-scaling-stroke"
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Select zone ${code}`}
                      onClick={() => onSelect(code)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          onSelect(code)
                        }
                      }}
                    />
                    {/* Code only when selected — keeps photo clean */}
                    {isSel && (
                      <text
                        x={centroidX(z.points)}
                        y={centroidY(z.points)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={stroke}
                        fontSize="3.2"
                        fontFamily="ui-monospace, monospace"
                        fontWeight="600"
                        opacity={0.95}
                        className="pointer-events-none"
                      >
                        {code}
                      </text>
                    )}
                  </g>
                )
              }
              return (
                <g key={z.code ?? i}>
                  <polygon
                    points={z.points}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={sw}
                    vectorEffect="non-scaling-stroke"
                  />
                  {z.code && isSel && (
                    <text
                      x={centroidX(z.points)}
                      y={centroidY(z.points)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={stroke}
                      fontSize="3.2"
                      fontFamily="ui-monospace, monospace"
                      fontWeight="600"
                      opacity={0.95}
                    >
                      {z.code}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        )}

        {/* Badges */}
        {badges?.map((b, i) => (
          <span
            key={`${b.text}-${i}`}
            className={`absolute z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono cosmic-text-2xs font-semibold tracking-[0.08em] backdrop-blur-sm ${BADGE_STYLE[b.tone ?? "neutral"]} ${CORNER[b.corner ?? "tl"]}`}
          >
            {b.tone === "live" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3ECF8E]" />}
            {b.text}
          </span>
        ))}

        {/* Numbered callouts / pins */}
        {callouts?.map((c, i) => {
          const tone = c.tone ?? "accent"
          const id = c.id
          const isSel = id != null && id === selectedId
          const interactive = onSelect && id
          const body = (
            <>
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full font-mono cosmic-text-2xs font-bold ring-2 ${CALLOUT_DOT[isSel ? tone : "neutral"]} ${isSel ? "scale-110" : ""}`}
              >
                {c.n ?? i + 1}
              </span>
              <div
                className={`rounded-lg border px-2 py-1 backdrop-blur-sm ${
                  isSel
                    ? "border-white/35 bg-[#0b0b12]/90"
                    : "border-white/15 bg-[#0b0b12]/78"
                }`}
              >
                <p className="font-inter cosmic-text-2xs font-semibold leading-tight text-white/95">{c.label}</p>
                {c.detail && (
                  <p className="mt-0.5 font-inter cosmic-text-2xs leading-snug text-white/55">{c.detail}</p>
                )}
              </div>
            </>
          )
          return (
            <div
              key={`${c.label}-${i}`}
              className="absolute z-10 max-w-[42%] -translate-x-1/2 -translate-y-1/2 sm:max-w-[36%]"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
            >
              {interactive ? (
                <button
                  type="button"
                  onClick={() => onSelect(id)}
                  aria-pressed={isSel}
                  className={`flex items-start gap-1.5 rounded-lg text-left transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 ${isSel ? "scale-[1.03]" : "hover:scale-[1.02]"}`}
                >
                  {body}
                </button>
              ) : (
                <div className="flex items-start gap-1.5">{body}</div>
              )}
            </div>
          )
        })}

        {children}
      </div>

      {(caption || metric || explain) && (
        <figcaption className="border-t border-white/[0.08] px-4 py-3.5 sm:px-5 sm:py-4">
          {caption && (
            <p className="font-inter cosmic-text-sm font-semibold text-[#f5f5f7]">{caption}</p>
          )}
          {metric && (
            <p className="mt-1 font-num cosmic-text-sm font-semibold text-[#8B7CF6]">{metric}</p>
          )}
          {explain && (
            <p className="mt-1.5 font-inter cosmic-text-xs leading-relaxed text-[#a1a1aa]">{explain}</p>
          )}
        </figcaption>
      )}
    </figure>
  )
}

function centroidX(points: string) {
  const pts = parsePoints(points)
  return pts.reduce((s, p) => s + p[0], 0) / pts.length
}
function centroidY(points: string) {
  const pts = parsePoints(points)
  return pts.reduce((s, p) => s + p[1], 0) / pts.length
}
function parsePoints(points: string): [number, number][] {
  return points
    .trim()
    .split(/\s+/)
    .map((p) => {
      const [x, y] = p.split(",").map(Number)
      return [x, y] as [number, number]
    })
}
