"use client"

import { Reveal } from "../components/Reveal"
import { SENSOR } from "../data/site"
import { Zap, Clock, Camera, Cpu, Wifi, Shield, Box, Gauge, Cpu as CpuIcon } from "lucide-react"

export function Sensor() {
  return (
    <section id="sensor" className="relative py-24 section-cosmic cosmic-bg" style={{ scrollMarginTop: "4rem" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="/images/renders/sensor-render.png" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05050a] via-[#05050a]/90 to-[#05050a]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        {/* Hook */}
        <Reveal>
          <div className="text-center mb-16">
            <span className="badge-cosmic">The Solution</span>
            <h2 className="mt-6 visual-headline">
              One box. Your cameras. Zero faces.
            </h2>
            <p className="mt-4 visual-sub max-w-[600px] mx-auto">
              {SENSOR.sub}
            </p>
          </div>
        </Reveal>

        {/* Product showcase - Main view + Gallery */}
        <Reveal delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="relative">
              <div className="absolute -inset-10 bg-[radial-gradient(400px_400px_at_50%_50%,rgba(139,124,246,0.12),transparent_70%)]" />
              <div className="relative cosmic-card-glow rounded-[32px] p-8 aspect-square flex items-center justify-center">
                <img
                  src="/images/product-edge-box.svg"
                  alt="Edge Observer"
                  className="w-full max-w-[300px] mx-auto"
                />
              </div>
              <div className="mt-6 text-center">
                <div className="cosmic-text-2xl font-bold cosmic-text">Edge Observer</div>
                <div className="mt-2 cosmic-text-sm" style={{ color: "var(--cosmic-text-dim)" }}>12W · PoE · On-device AI</div>
              </div>
            </div>
            
            {/* Side gallery with detail shots */}
            <div className="grid grid-cols-2 gap-4">
              <div className="cosmic-card aspect-square rounded-[20px] overflow-hidden">
                <img src="/images/tech2/edge-compute.jpg" alt="Edge computing unit" className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300" />
              </div>
              <div className="cosmic-card aspect-square rounded-[20px] overflow-hidden">
                <img src="/images/tech2/ai-inference.jpg" alt="AI inference on device" className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300" />
              </div>
              <div className="cosmic-card aspect-square rounded-[20px] overflow-hidden">
                <img src="/images/renders/dashboard-glow.jpg" alt="Dashboard render" className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300" />
              </div>
              <div className="cosmic-card aspect-square rounded-[20px] overflow-hidden">
                <img src="/images/renders/data-flow.jpg" alt="Data flow visualization" className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Visual specs */}
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Zap, value: "12W", label: "Power" },
              { icon: Clock, value: "5 min", label: "Install" },
              { icon: Camera, value: "RTSP", label: "Cameras" },
              { icon: Cpu, value: "Hailo-8L", label: "AI Chip" },
              { icon: Wifi, value: "Offline", label: "Works" },
              { icon: Shield, value: "Zero", label: "Faces" },
            ].map((spec) => (
              <div key={spec.label} className="cosmic-card p-6 text-center h-full">
                <spec.icon size={24} className="text-[#8B7CF6] mx-auto mb-3" />
                <div className="cosmic-text-xl font-bold mb-1">{spec.value}</div>
                <div className="cosmic-text-xs" style={{ color: "var(--cosmic-text-dim)" }}>{spec.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Install steps */}
        <Reveal delay={0.3}>
          <div className="mt-16 max-w-[800px] mx-auto">
            <h3 className="text-center ds-text-2xl font-bold text-white mb-8">Live in 3 steps</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { num: "01", title: "Connect", desc: "Plug into your existing cameras" },
                { num: "02", title: "Calibrate", desc: "Map zones in 5 minutes" },
                { num: "03", title: "See data", desc: "Dashboard live next morning" },
              ].map((step) => (
                <div key={step.num} className="glass-card p-6 text-center">
                  <div className="ds-text-3xl font-bold text-[#8B7CF6]">{step.num}</div>
                  <div className="mt-2 ds-text-lg font-semibold text-white">{step.title}</div>
                  <div className="mt-2 ds-text-sm text-white/60">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
