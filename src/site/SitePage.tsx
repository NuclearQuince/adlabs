"use client"

import { useState } from "react"
import { Nav } from "./Nav"
import { Hero } from "./Hero"
import { BlindSpot } from "./BlindSpot"
import { Plans } from "./Plans"
import { FloorStrip } from "./FloorStrip"
import { Metrics } from "./Metrics"
import { Intelligence } from "./Intelligence"
import { How } from "./How"
import { Privacy } from "./Privacy"
import { Faq } from "./Faq"
import { Contact } from "./Contact"
import { Footer } from "./Footer"
import { PilotModal } from "./PilotModal"

export function SitePage() {
  const [pilot, setPilot] = useState(false)
  const openPilot = () => setPilot(true)

  return (
    <div className="site-scope min-h-screen text-[var(--ds-text-primary)] page-in" style={{ background: "var(--ds-bg-primary)" }}>
      <Nav onPilot={openPilot} />
      <main className="overflow-x-hidden">
        <Hero onPilot={openPilot} />
        <BlindSpot />
        <Plans onPilot={openPilot} />
        <FloorStrip />
        <Metrics />
        <Intelligence />
        <Privacy />
        <How onPilot={openPilot} />
        <Faq />
        <Contact onPilot={openPilot} />
      </main>
      <Footer />
      <PilotModal open={pilot} onClose={() => setPilot(false)} />
    </div>
  )
}
