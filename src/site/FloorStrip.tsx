import { Reveal } from "../components/Reveal"
import { ATELIER, PROOF } from "../data/site"

type ZoneRow = {
  code: string
  name: string
  traffic: string
  dwell: string
  warn?: boolean
}

function parseZones(): ZoneRow[] {
  return ATELIER.tabs[0].markers.slice(0, 4).map((m) => {
    const [left, right] = m.title.split("·").map((s) => s.trim())
    const code = left.replace(/^Zone\s+/i, "")
    const name = right ?? left
    const parts = m.value.split("·").map((s) => s.trim())
    const traffic = parts[0]?.replace(/\s*traffic/i, "") ?? parts[0] ?? ""
    const dwell = parts[1] ?? ""
    const warn = /under-lit/i.test(m.value)
    return { code, name, traffic, dwell, warn }
  })
}

/** Floor zones → window change → uplift — one visual story. */
export function FloorStrip() {
  const zones = parseZones()
  const note = ATELIER.tabs[0].overlay.note
  const p = PROOF

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
              Traffic and dwell by in-store zone, then the same stop-rate language before and after a window rotation.
            </p>
          </div>
        </Reveal>

        {/* Step 1 — In-store zones */}
        <Reveal delay={0.06}>
          <div className="mt-9 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0a12]">
            <div className="relative">
              <img
                src={ATELIER.image}
                alt="In-store zones — Organic Clothing Co. Bandra"
                className="aspect-[16/9] w-full object-cover sm:aspect-[2.35/1]"
                loading="lazy"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/25 to-transparent"
              />
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-16 sm:px-7 sm:pb-5">
                <p className="cosmic-text-xs font-semibold uppercase tracking-[0.14em] text-[#c4b5fd]/90">
                  01 · In-store zones
                </p>
                <p className="mt-1.5 cosmic-text-lg font-semibold tracking-[-0.01em] text-[#f5f5f7]">
                  Organic Clothing Co. · Bandra
                </p>
                <p className="mt-1 max-w-md cosmic-text-xs leading-relaxed text-[#a1a1aa]">
                  Traffic share and dwell by area of the floor.
                </p>
              </div>
            </div>

            <div className="border-t border-white/[0.08] px-4 py-4 sm:px-6 sm:py-5">
              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                {zones.map((z) => (
                  <li
                    key={z.code}
                    className={`rounded-xl px-3.5 py-3 ${
                      z.warn
                        ? "border border-amber-400/25 bg-amber-400/[0.07]"
                        : "border border-white/[0.08] bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`font-mono cosmic-text-2xs font-semibold tracking-[0.12em] ${
                          z.warn ? "text-amber-300" : "text-[#8B7CF6]"
                        }`}
                      >
                        {z.code}
                      </span>
                      {z.warn && (
                        <span className="font-mono cosmic-text-2xs font-medium uppercase tracking-[0.1em] text-amber-300/90">
                          Under-lit
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 truncate cosmic-text-xs text-[#86868b]">{z.name}</p>
                    <p className="mt-2 font-num cosmic-text-lg font-semibold leading-none tracking-[-0.02em] text-[#f5f5f7]">
                      {z.traffic}
                      <span className="ml-1 cosmic-text-2xs font-medium text-[#86868b]">traffic</span>
                    </p>
                    <p className="mt-1.5 cosmic-text-xs text-[#a1a1aa]">
                      {z.warn ? (
                        <span className="text-amber-200/90">Dwell suppressed — lighting, not layout</span>
                      ) : (
                        <>
                          <span className="text-[#86868b]">Dwell </span>
                          <span className="font-num font-medium text-[#d4d4d8]">{z.dwell}</span>
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mt-4 border-l-2 border-amber-400/40 pl-3.5 cosmic-text-xs leading-relaxed text-[#a1a1aa] sm:cosmic-text-sm">
                <span className="font-medium text-amber-200/95">Under-lit callout · </span>
                {note}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Step 2 — Window before / after */}
        <Reveal delay={0.1}>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0a12]">
            <div className="flex flex-col gap-3 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-7 sm:py-5">
              <div>
                <p className="cosmic-text-xs font-semibold uppercase tracking-[0.14em] text-[#c4b5fd]/90">
                  02 · Window A/B
                </p>
                <p className="mt-1.5 cosmic-text-base font-semibold text-[#f5f5f7] sm:cosmic-text-lg">
                  Same metric · before and after rotation
                </p>
              </div>
              <p className="font-mono cosmic-text-2xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                Window stop rate · ≥4s pause
              </p>
            </div>

            <div className="grid sm:grid-cols-2">
              <figure className="border-b border-white/[0.08] sm:border-b-0 sm:border-r sm:border-white/[0.08]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.before.image}
                    alt="Window before — baseline display"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/80 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="px-5 py-4 sm:px-6 sm:py-5">
                  <p className="font-mono cosmic-text-2xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                    {p.before.label}
                  </p>
                  <p className="mt-2 cosmic-text-xs text-[#86868b]">Window stop rate</p>
                  <p className="mt-1 font-num cosmic-text-3xl font-semibold leading-none tracking-[-0.03em] text-[#f5f5f7]">
                    {p.before.value}
                  </p>
                  <p className="mt-2 cosmic-text-xs leading-relaxed text-[#a1a1aa]">{p.before.desc}</p>
                </figcaption>
              </figure>

              <figure>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.after.image}
                    alt="Window after — new rotation"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/80 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="px-5 py-4 sm:px-6 sm:py-5">
                  <p className="font-mono cosmic-text-2xs font-semibold uppercase tracking-[0.14em] text-[#8B7CF6]">
                    {p.after.label}
                  </p>
                  <p className="mt-2 cosmic-text-xs text-[#86868b]">Window stop rate</p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-num cosmic-text-3xl font-semibold leading-none tracking-[-0.03em] text-[#f5f5f7]">
                      {p.after.value}
                    </p>
                    <p className="font-num cosmic-text-sm font-semibold text-[#8B7CF6]">{p.uplift}</p>
                  </div>
                  <p className="mt-2 cosmic-text-xs leading-relaxed text-[#a1a1aa]">{p.after.desc}</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
