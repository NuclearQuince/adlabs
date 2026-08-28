import { useState } from "react"
import { Nav } from "./Nav"
import { Hero } from "./Hero"
import { BlindSpot } from "./BlindSpot"
import { Journey } from "./Journey"
import { Atelier } from "./Atelier"
import { Proof } from "./Proof"
import { System } from "./System"
import { Metrics } from "./Metrics"
import { Sectors } from "./Sectors"
import { Privacy } from "./Privacy"
import { How } from "./How"
import { Team } from "./Team"
import { Footer } from "./Footer"
import { PilotModal } from "./PilotModal"

export function SitePage() {
  const [pilot, setPilot] = useState(false)
  const openPilot = () => setPilot(true)

  return (
    <>
      <Nav onPilot={openPilot} />
      <main>
        <Hero onPilot={openPilot} />
        <BlindSpot />
        <Journey />
        <Atelier />
        <Proof />
        <System />
        <Metrics />
        <Sectors />
        <Privacy />
        <How onPilot={openPilot} />
        <Team />
      </main>
      <Footer />
      <PilotModal open={pilot} onClose={() => setPilot(false)} />
    </>
  )
}
