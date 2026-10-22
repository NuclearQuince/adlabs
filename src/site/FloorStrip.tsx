"use client"

import { useCallback, useId, useState } from "react"
import { Reveal } from "../components/Reveal"
import { AnnotatedImage } from "../components/AnnotatedImage"
import type { ImageZone } from "../components/AnnotatedImage"
import { ATELIER, PROOF } from "../data/site"

type ZoneRow = {
  code: string
  name: string
  visitRate: string
  dwell: string
  warn?: boolean
}

/** Soft polygon outlines — zone code only on photo when selected; detail in cards. */
const ZONE_OUTLINES: Record<string, ImageZone> = {
  H3: { code: "H3", points: "52,18 78,18 82,48 48,52", tone: "accent" },
  L2: { code: "L2", points: "22,48 48,44 52,78 18,82", tone: "pos" },
  A1: { code: "A1", points: "70,55 92,52 95,88 68,90", tone: "muted" },
  F1: { code: "F1", points: "4,22 22,20 26,48 6,52", tone: "warn" },
}

function parseZones(): ZoneRow[] {
  return ATELIER.tabs[0].markers.slice(0, 4).map((m) => {
    const [left, right] = m.title.split("·").map((s) => s.trim())
    const code = left.replace(/^Zone\s+/i, "")
    const name = right ?? left
    const parts = m.value.split("·").map((s) => s.trim())
    const visitRate =
      parts[0]?.replace(/\s*(traffic|visit rate|entered)/i, "").trim() ?? parts[0] ?? ""
    const dwell = parts[1] ?? ""
    const warn = /under-lit/i.test(m.value)
    return { code, name, visitRate, dwell, warn }
  })
}

/** Floor zones → window A/B. Cards select; photo shows soft outlines only (no pin spam). */
export function FloorStrip() {
  const zones = parseZones()
  const note = ATELIER.tabs[0].overlay.note
  const p = PROOF
  const [selected, setSelected] = useState<string>("H3")
  const listId = useId()

  const selectZone = useCallback((code: string) => {
    setSelected(code)
  }, [])

  const activeZones: ImageZone[] = Object.entries(ZONE_OUTLINES).map(([code, z]) => ({
    ...z,
    selected: selected === code,
    tone: selected === code ? z.tone : "muted",
  }))

  const active = zones.find((z) => z.code === selected)

  return (
    <section id="floor" className="site-scope scroll-mt-24 bg-[#05050a] py-14 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono cosmic-text-2xs font-semibold uppercase tracking-[0.18em] text-[#8B7CF6]">
              Floor · Window
            </p>
            <h2 className="mt-3 cosmic-text-2xl font-semibold tracking-[-0.02em] text-[#f5f5f7] sm:cosmic-text-3xl">
              Zones on the floor. Proof on the glass.
            </h2>
            <p className="mt-2 max-w-xl cosmic-text-sm leading-relaxed text-[#a1a1aa]">
              Select a zone below — the outline highlights on the photo. Entered zone rates can
              overlap (need not sum to 100%).
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-9 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0a12]">
            <div id={`${listId}-photo`}>
              <AnnotatedImage
                src={ATELIER.image}
                alt="In-store floor — soft zone outlines H3 L2 A1 F1"
                aspectClass="aspect-[16/9] sm:aspect-[2.35/1]"
                badges={[{ text: "01 · IN-STORE ZONES", tone: "after", corner: "tl" }]}
                zones={activeZones}
                selectedId={selected}
                onSelect={selectZone}
                caption="Organic Clothing Co. · Bandra Flagship"
                metric={
                  active
                    ? `${active.code} · ${active.visitRate} entered · ${
                        active.warn ? "under-lit" : `dwell ${active.dwell}`
                      }`
                    : undefined
                }
                explain="Soft outlines mark floor polygons. Detail and control live in the cards — not floating pins."
              />
            </div>

            <div className="border-t border-white/[0.08] px-4 py-4 sm:px-6 sm:py-5">
              <p className="mb-3 font-inter cosmic-text-xs leading-relaxed text-[#86868b]">
                <span className="font-medium text-[#c4c4cc]">Entered zone</span>
                {" — "}
                % of store visitors who entered this polygon. Overlap is OK.
              </p>

              <ul
                id={listId}
                className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3"
                role="listbox"
                aria-label="Floor zones"
                aria-activedescendant={`${listId}-${selected}`}
              >
                {zones.map((z) => {
                  const isOn = selected === z.code
                  return (
                    <li key={z.code} role="none">
                      <button
                        type="button"
                        id={`${listId}-${z.code}`}
                        role="option"
                        aria-selected={isOn}
                        onClick={() => selectZone(z.code)}
                        className={`min-h-[7.5rem] w-full rounded-xl px-3.5 py-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a12] ${
                          isOn
                            ? z.warn
                              ? "border border-amber-400/50 bg-amber-400/[0.08]"
                              : "border border-[#8B7CF6]/55 bg-[#8B7CF6]/10"
                            : z.warn
                              ? "border border-amber-400/20 bg-transparent hover:border-amber-400/35"
                              : "border border-white/[0.08] bg-transparent hover:border-white/20 hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span
                            className={`font-mono cosmic-text-2xs font-semibold tracking-[0.12em] ${
                              z.warn ? "text-amber-300/90" : isOn ? "text-[#c4b5fd]" : "text-[#8B7CF6]"
                            }`}
                          >
                            {z.code}
                          </span>
                          {z.warn && (
                            <span className="font-mono cosmic-text-2xs font-medium uppercase tracking-[0.08em] text-amber-300/80">
                              Caution
                            </span>
                          )}
                        </div>
                        <p className="mt-1 truncate cosmic-text-xs text-[#86868b]">{z.name}</p>
                        <p className="mt-2.5 font-num cosmic-text-xl font-semibold leading-none tracking-[-0.02em] text-[#f5f5f7]">
                          {z.visitRate}
                        </p>
                        <p className="mt-1 cosmic-text-2xs font-medium uppercase tracking-[0.07em] text-[#68687a]">
                          Entered zone
                        </p>
                        <p className="mt-2 cosmic-text-xs text-[#a1a1aa]">
                          {z.warn ? (
                            <span className="text-amber-200/85">Lighting — dwell suppressed</span>
                          ) : (
                            <>
                              <span className="text-[#86868b]">Dwell </span>
                              <span className="font-num font-medium text-[#d4d4d8]">{z.dwell}</span>
                            </>
                          )}
                        </p>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <p className="mt-4 border-l-2 border-amber-400/35 pl-3.5 cosmic-text-xs leading-relaxed text-[#a1a1aa] sm:cosmic-text-sm">
                <span className="font-medium text-amber-200/90">F1 under-lit · </span>
                {note}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0a12]">
            <div className="flex flex-col gap-2 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-7 sm:py-5">
              <div>
                <p className="cosmic-text-xs font-semibold uppercase tracking-[0.14em] text-[#c4b5fd]/90">
                  02 · Window A/B
                </p>
                <p className="mt-1.5 cosmic-text-base font-semibold text-[#f5f5f7] sm:cosmic-text-lg">
                  Same stop-rate metric · before and after
                </p>
              </div>
              <p className="font-mono cosmic-text-2xs font-semibold uppercase tracking-[0.12em] text-[#86868b]">
                ≥4s pause · not POS
              </p>
            </div>

            <div className="grid sm:grid-cols-2">
              <AnnotatedImage
                src={p.before.image}
                alt="Window display before rotation — baseline"
                aspectClass="aspect-[16/10]"
                className="border-b border-white/[0.08] sm:border-b-0 sm:border-r sm:border-white/[0.08]"
                badges={[{ text: "BEFORE", tone: "before", corner: "tl" }]}
                caption={p.before.label}
                metric={`Stop rate ${p.before.value}`}
                explain={`${p.before.desc} Share of passers who paused ≥4s in the window zone.`}
              />

              <AnnotatedImage
                src={p.after.image}
                alt="Window display after rotation — measured uplift"
                aspectClass="aspect-[16/10]"
                badges={[
                  { text: "AFTER", tone: "after", corner: "tl" },
                  { text: p.uplift.replace("↑ ", ""), tone: "live", corner: "tr" },
                ]}
                caption={p.after.label}
                metric={`Stop rate ${p.after.value} · ${p.uplift}`}
                explain={`${p.after.desc} Same cameras and stop definition.`}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
