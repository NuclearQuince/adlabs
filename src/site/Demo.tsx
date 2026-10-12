"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const SCENES = [
  {
    img: "/images/hero-storefront.jpg",
    color: "#8B7CF6",
    subtitle: "Every morning, thousands walk past your store. You only see the ones who buy.",
    headline: "2,481",
    label: "PASSERSBY COUNTED",
    details: [
      { t: "Peak Hour", v: "18:00 — 186/hr", c: "#8B7CF6" },
      { t: "Direction Split", v: "62% → 38%", c: "#a1a1aa" },
      { t: "Avg Walk Speed", v: "1.4 m/s", c: "#a1a1aa" },
    ],
    caption: "Monday · Clear sky · 32°C · Street level camera 01",
    hud: "LIVE FEED · CAM-01 · EDGE OBSERVER v2.1",
  },
  {
    img: "/images/sector-beauty.jpg",
    color: "#3ECF8E",
    subtitle: "186 paused. Stopped. Looked. The window spoke — or didn't. The sensor heard every word.",
    headline: "186",
    label: "STOPPED & ENGAGED",
    details: [
      { t: "Avg Dwell", v: "6.2 seconds", c: "#3ECF8E" },
      { t: "Return Rate", v: "14% saw twice", c: "#a1a1aa" },
      { t: "Gaze Hit", v: "main display 78%", c: "#a1a1aa" },
    ],
    caption: "Pause ≥ 4s classified as stop · Confidence 94%",
    hud: "GAZE ANALYSIS · ZONE 03 · WINDOW DISPLAY",
  },
  {
    img: "/images/sector-fashion.jpg",
    color: "#5ac8fa",
    subtitle: "39 crossed the threshold. From looking to entering — the moment truth lives.",
    headline: "39",
    label: "ENTERED THE STORE",
    details: [
      { t: "Conversion", v: "21% stop → enter", c: "#5ac8fa" },
      { t: "Avg Browse", v: "4.1 zones visited", c: "#a1a1aa" },
      { t: "Top Zone", v: "entrance-left wall", c: "#a1a1aa" },
    ],
    caption: "Threshold crossing detected · Zero faces stored · DPDP compliant",
    hud: "THRESHOLD SENSOR · ZONE 02 · REAL-TIME",
  },
  {
    img: "/images/sector-premium-retail.jpg",
    color: "#FF9500",
    subtitle: "One box. Twelve watts. Zero faces watched. Intelligence runs on your wall, not the cloud.",
    headline: "12W",
    label: "ON-DEVICE POWER",
    details: [
      { t: "AI Chip", v: "Hailo-8L · 13 TOPS", c: "#FF9500" },
      { t: "Latency", v: "< 80ms per frame", c: "#a1a1aa" },
      { t: "Uptime", v: "99.7% last 30 days", c: "#a1a1aa" },
    ],
    caption: "PoE powered · RTSP feed · Offline capable · No cloud upload",
    hud: "DEVICE STATUS · EDGE OBSERVER · HEALTHY",
  },
  {
    img: "/images/sector-jewellery.jpg",
    color: "#AF52DE",
    subtitle: "Five minutes to map your store. Door, window, display, checkout. The sensor learns your layout like staff would.",
    headline: "93%",
    label: "ZONE ACCURACY",
    details: [
      { t: "Zones Mapped", v: "door · window · aisle · tills", c: "#AF52DE" },
      { t: "Calibration", v: "phone tap corners", c: "#a1a1aa" },
      { t: "Recalibration", v: "auto on layout change", c: "#a1a1aa" },
    ],
    caption: "Spatial model built in 5 min · Updates on furniture move",
    hud: "SPATIAL MODEL · 6 ZONES · CALIBRATED",
  },
  {
    img: "/images/window-before.jpg",
    color: "#FF2D55",
    subtitle: "Monday morning. Three decisions. Numbers behind each one. The loop closes — every week.",
    headline: "24/7",
    label: "LIVE MONITORING",
    details: [
      { t: "Monday Brief", v: "3 actions + proof", c: "#FF2D55" },
      { t: "A/B Engine", v: "auto keep-or-kill", c: "#a1a1aa" },
      { t: "Alert Latency", v: "real-time push", c: "#a1a1aa" },
    ],
    caption: "Intelligence loop: Data → Insight → Action → Result → Better data",
    hud: "DASHBOARD · MONDAY BRIEF · READY",
  },
  {
    img: "/images/window-after.jpg",
    color: "#8B7CF6",
    subtitle: "Fourteen days later the verdict lands: treatment B moved the needle. Keep-or-kill, decided by data not opinion.",
    headline: "+14.6%",
    label: "VERDICT · TREATMENT B WINS",
    details: [
      { t: "A/B Result", v: "B beats A · 14 days", c: "#8B7CF6" },
      { t: "Confidence", v: "95% · 12k samples", c: "#a1a1aa" },
      { t: "Next Move", v: "roll B to all windows", c: "#a1a1aa" },
    ],
    caption: "Keep-or-kill resolved by the street. Window treatment B ships.",
    hud: "A/B ENGINE · VERDICT 14D · B WINS",
  },
]

const SCENE_MS = 9000
const FADE = 0.8

const hash01 = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

export function Demo() {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [subtitleKey, setSubtitleKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const obsRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const locked = useRef(false)

  const goto = useCallback((i: number) => {
    if (locked.current) return
    locked.current = true
    setIdx(i)
    setProgress(0)
    setSubtitleKey(k => k + 1)
    setTimeout(() => { locked.current = false }, FADE * 1000 + 100)
  }, [])

  const next = useCallback(() => goto((idx + 1) % SCENES.length), [idx, goto])
  const prev = useCallback(() => goto((idx - 1 + SCENES.length) % SCENES.length), [idx, goto])
  const toggle = useCallback(() => setPlaying(p => !p), [])

  // auto-play on viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el || obsRef.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !obsRef.current) { obsRef.current = true; setPlaying(true) }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // auto-advance
  useEffect(() => {
    if (!playing) { if (timerRef.current) clearInterval(timerRef.current); return }
    timerRef.current = setInterval(next, SCENE_MS)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [playing, next])

  // progress
  useEffect(() => {
    if (!playing) { if (progressRef.current) clearInterval(progressRef.current); return }
    let step = 0
    progressRef.current = setInterval(() => {
      step += 1
      setProgress((step / 100) * 100)
      if (step >= 100) step = 0
    }, SCENE_MS / 100)
    return () => { if (progressRef.current) clearInterval(progressRef.current) }
  }, [playing])

  // keyboard
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
      if (e.key === " ") { e.preventDefault(); toggle() }
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [next, prev, toggle])

  const s = SCENES[idx]

  return (
    <section
      id="demo"
      ref={containerRef}
      className="relative min-h-screen max-h-[95vh] flex flex-col items-center overflow-hidden cosmic-bg"
      style={{ scrollMarginTop: "4rem" }}
    >
      {/* === LAYER 0: BACKGROUND IMAGE with Ken Burns === */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${idx}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: FADE, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
            animate={{ scale: [1, 1.06] }}
            transition={{ duration: SCENE_MS / 1000, ease: "linear" }}
          />
          {/* darkening layers */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 50% 40%, ${s.color}18 0%, transparent 60%), linear-gradient(180deg, ${s.color}10 0%, var(--cosmic-void) 100%)`
          }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(3,3,6,0.5) 0%, rgba(3,3,6,0.2) 40%, rgba(3,3,6,0.85) 100%)" }} />
        </motion.div>
      </AnimatePresence>

      {/* === LAYER 1: FLOATING PARTICLES === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${idx}-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${1.5 + hash01(i, 5) * 2}px`,
              height: `${1.5 + hash01(i, 6) * 2}px`,
              left: `${hash01(i, 1) * 100}%`,
              top: `${hash01(i, 2) * 100}%`,
              background: s.color,
              opacity: 0,
            }}
            animate={{ opacity: [0, 0.4 + hash01(i, 3) * 0.3, 0], y: [0, -40 - hash01(i, 4) * 80] }}
            transition={{ duration: 3 + hash01(i, 7) * 3, delay: hash01(i, 8) * 2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* === LAYER 2: FILM GRAIN OVERLAY === */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

      {/* === LAYER 3: LETTERBOX BARS (cinematic framing) === */}
      <div className="absolute top-0 left-0 right-0 h-12 sm:h-16" style={{ background: "linear-gradient(180deg, rgba(3,3,6,0.8) 0%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28" style={{ background: "linear-gradient(0deg, rgba(3,3,6,0.9) 0%, transparent 100%)" }} />

      {/* === LAYER 4: HUD TOP — scene counter + time === */}
      <div className="relative z-20 w-full max-w-[1200px] px-6 pt-6 sm:pt-10">
        <motion.div
          key={`hud-${idx}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono cosmic-text-2xs tracking-[0.14em]" style={{ background: `${s.color}18`, border: `1px solid ${s.color}30`, color: s.color }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: s.color, opacity: 0.6 }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
              </span>
              {s.hud}
            </span>
          </div>
          <span className="font-mono cosmic-text-2xs tracking-[0.1em]" style={{ color: `${s.color}80` }}>
            {String(idx + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
          </span>
        </motion.div>
      </div>

      {/* === LAYER 5: MAIN CONTENT === */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-[1200px] px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${idx}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: FADE, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center max-w-3xl"
          >
            {/* BIG METRIC */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.15 }}
            >
              <div className="font-num font-bold tracking-tight" style={{ fontSize: "clamp(72px, 12vw, 140px)", color: s.color, lineHeight: 1 }}>
                {s.headline}
              </div>
              <div className="mt-2 font-mono cosmic-text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: `${s.color}cc` }}>
                {s.label}
              </div>
            </motion.div>

            {/* DETAIL ROW — 3 sub-metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            >
              {s.details.map((d, di) => (
                <motion.div
                  key={d.t}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + di * 0.1 }}
                  className="text-center min-w-[100px]"
                >
                  <p className="cosmic-text-2xs font-mono uppercase tracking-[0.12em] mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{d.t}</p>
                  <p className="cosmic-text-sm font-semibold" style={{ color: d.c }}>{d.v}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* === LAYER 6: SUBTITLE BAR (movie-style) === */}
      <div className="relative z-20 w-full max-w-[900px] px-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`sub-${subtitleKey}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl px-5 py-3 sm:px-8 sm:py-4 text-center"
            style={{ background: "rgba(3,3,6,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <TypewriterText text={s.subtitle} color="rgba(255,255,255,0.88)" />
            <p className="mt-1.5 font-mono cosmic-text-2xs tracking-[0.08em]" style={{ color: `${s.color}80` }}>{s.caption}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* === LAYER 7: CONTROLS + PROGRESS === */}
      <div className="relative z-20 w-full max-w-[900px] px-6 pb-6 sm:pb-10 flex flex-col items-center gap-4">
        {/* Progress */}
        <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}aa)` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button onClick={prev} className="grid h-10 w-10 place-items-center rounded-full transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <button onClick={toggle} className="grid h-12 w-12 place-items-center rounded-full transition-all hover:scale-110" style={{ background: s.color, color: "white", boxShadow: `0 0 30px ${s.color}40` }} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>
          <button onClick={next} className="grid h-10 w-10 place-items-center rounded-full transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Scene dots */}
        <div className="flex gap-2 items-center">
          {SCENES.map((sc, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: i === idx ? 32 : 8, background: i === idx ? sc.color : "rgba(255,255,255,0.2)" }}
              aria-label={`Scene ${i + 1}`}
            />
          ))}
        </div>

        <p className="cosmic-text-2xs font-mono tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.25)" }}>
          ← → navigate · Space play/pause
        </p>
      </div>
    </section>
  )
}

/* Typewriter component — types text letter-by-letter */
function TypewriterText({ text, color }: { text: string; color: string }) {
  const [visible, setVisible] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setVisible(0)
    let i = 0
    timerRef.current = setInterval(() => {
      i += 1
      setVisible(i)
      if (i >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }, 22)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [text])

  return (
    <p className="cosmic-text-base sm:cosmic-text-lg leading-relaxed font-medium" style={{ color }}>
      {text.slice(0, visible)}
      {visible < text.length && (
        <span className="inline-block w-[2px] h-[1em] ml-0.5 align-middle animate-pulse" style={{ background: color }} />
      )}
    </p>
  )
}
