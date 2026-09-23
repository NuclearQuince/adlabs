"use client"
import { useEffect, useRef } from "react"

export function GlowCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const reduceRef = useRef<boolean>(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (touch || reduceRef.current) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const dot = { x: target.x, y: target.y }
    const glow = { x: target.x, y: target.y }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dotRef.current) dotRef.current.style.opacity = "1"
      if (glowRef.current) glowRef.current.style.opacity = "1"
    }
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0"
      if (glowRef.current) glowRef.current.style.opacity = "0"
    }

    const loop = () => {
      dot.x += (target.x - dot.x) * 0.35
      dot.y += (target.y - dot.y) * 0.35
      glow.x += (target.x - glow.x) * 0.09
      glow.y += (target.y - glow.y) * 0.09
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseleave", onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden opacity-0 md:block"
        style={{
          width: 240,
          height: 240,
          marginLeft: -120,
          marginTop: -120,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,124,246,0.12), transparent 70%)",
          mixBlendMode: "screen",
          willChange: "transform",
          transition: "opacity 0.4s ease",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden opacity-0 md:block"
        style={{
          width: 7,
          height: 7,
          marginLeft: -3.5,
          marginTop: -3.5,
          borderRadius: "50%",
          background: "#8B7CF6",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.4)",
          willChange: "transform",
          transition: "opacity 0.4s ease",
        }}
      />
    </>
  )
}
