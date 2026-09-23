"use client"

import { useState } from "react"
import { Nav } from "./Nav"
import { Hero } from "./Hero"
import { Demo } from "./Demo"
import { Sensor } from "./Sensor"
import { BlindSpot } from "./BlindSpot"
import { Proof } from "./Proof"
import { Metrics } from "./Metrics"
import { Journey } from "./Journey"
import { Flow } from "./Flow"
import { Team } from "./Team"
import { Mission } from "./Mission"
import { How } from "./How"
import { Pricing } from "./Pricing"
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
        {/* HOOK: The Problem */}
        <Hero onPilot={openPilot} />
        
        {/* MESSAGE: The Solution */}
        <Sensor />
        
        {/* PROOF: The Story */}
        <Demo />
        
        {/* EVIDENCE: The Data */}
        <BlindSpot />
        <Journey />
        <Proof />
        <Metrics />
        
        {/* HOW IT WORKS */}
        <Flow />
        <Privacy />
        
        {/* THE TEAM */}
        <Team />
        <Mission />
        
        {/* ACTION */}
        <How onPilot={openPilot} />
        <Pricing />
        <Faq />
        <Contact onPilot={openPilot} />
      </main>
      <Footer />
      <PilotModal open={pilot} onClose={() => setPilot(false)} />
    </div>
  )
}
