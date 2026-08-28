import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  Store,
  Megaphone,
  Map,
  FileText,
  ClipboardList,
  Sun,
  Moon,
  Play,
  Presentation,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Logo } from "../components/Logo"
import { Chip, Segmented } from "./ui"
import { TENANT, SIMULATED_NOTE } from "../data/dashboard"
import { Overview } from "./screens/Overview"
import { Stores, StoreDetail } from "./screens/Stores"
import { Campaigns } from "./screens/Campaigns"
import { Zones } from "./screens/Zones"
import { Brief } from "./screens/Brief"
import { Manager } from "./screens/Manager"
import { PresentMode } from "./PresentMode"

type Screen = "overview" | "stores" | "store" | "campaigns" | "zones" | "brief" | "manager"
type Role = "Brand" | "Store"
type Theme = "light" | "dark"

const NAV_BRAND: { id: Screen; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "stores", label: "Stores", icon: Store },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "zones", label: "Zones", icon: Map },
  { id: "brief", label: "Weekly Brief", icon: FileText },
]
const NAV_STORE: { id: Screen; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "manager", label: "Today", icon: ClipboardList },
  { id: "stores", label: "Stores", icon: Store },
]

export function DashboardPage() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("adlabs-theme") as Theme) || "light")
  const [role, setRole] = useState<Role>("Brand")
  const [screen, setScreen] = useState<Screen>("overview")
  const [present, setPresent] = useState(false)
  const [selectedStore, setSelectedStore] = useState("madison")

  useEffect(() => {
    localStorage.setItem("adlabs-theme", theme)
  }, [theme])

  const changeRole = (r: Role) => {
    setRole(r)
    if (r === "Store" && screen !== "stores" && screen !== "store") {
      setScreen("manager")
    }
    if (r === "Brand" && screen === "manager") {
      setScreen("overview")
    }
  }

  const nav = role === "Brand" ? NAV_BRAND : NAV_STORE

  return (
    <div className="app-scope min-h-screen" data-theme={theme} style={{ background: "var(--app-bg)" }}>
      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-[232px] shrink-0 flex-col border-r border-[var(--app-line)] px-4 py-6 lg:flex">
          <Link to="/" aria-label="Back to AD Labs website" className="px-2">
            <Logo dark={theme === "dark"} />
          </Link>

          <div className="mt-8 flex flex-col gap-1">
            <p className="px-3 pb-2 font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--app-faint)]">
              {role} view
            </p>
            {nav.map((n) => {
              const active = screen === n.id || (n.id === "stores" && screen === "store")
              return (
                <button
                  key={n.id}
                  onClick={() => setScreen(n.id)}
                  aria-current={active}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left font-inter text-[13.5px] font-medium transition-colors duration-150 ${
                    active
                      ? "text-[var(--app-text)]"
                      : "text-[var(--app-sub)] hover:bg-[var(--app-card)] hover:text-[var(--app-text)]"
                  }`}
                  style={active ? { background: "var(--app-card)", boxShadow: "var(--app-shadow)" } : undefined}
                >
                  <n.icon size={17} strokeWidth={2.1} style={{ color: active ? "var(--app-gold)" : undefined }} />
                  {n.label}
                </button>
              )
            })}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <div
              className="flex items-start gap-2.5 rounded-xl border border-[var(--app-line)] p-3.5"
              style={{ background: "var(--app-card)" }}
            >
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[var(--app-gold)]" strokeWidth={2.2} />
              <p className="font-inter text-[11px] leading-snug text-[var(--app-sub)]">
                Faces never leave the device. Aggregates only.
              </p>
            </div>
            <button
              onClick={() => setPresent(true)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-inter text-[13px] font-semibold text-[var(--app-sub)] transition-colors hover:text-[var(--app-text)]"
            >
              <Presentation size={16} strokeWidth={2.1} />
              Present mode
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-[var(--app-line)] backdrop-blur-xl" style={{ background: "color-mix(in srgb, var(--app-bg) 82%, transparent)" }}>
            <div className="flex flex-wrap items-center gap-3 px-5 py-3.5 sm:px-7">
              <Link
                to="/"
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--app-line)] text-[var(--app-sub)] transition-colors hover:text-[var(--app-text)] lg:hidden"
                aria-label="Back to website"
              >
                <ArrowLeft size={16} />
              </Link>
              <div className="min-w-0">
                <p className="truncate font-inter text-[14px] font-semibold text-[var(--app-text)]">{TENANT.name}</p>
                <p className="truncate font-inter text-[11.5px] text-[var(--app-faint)]">{TENANT.store}</p>
              </div>
              <div className="ml-auto flex flex-wrap items-center gap-2.5">
                <Chip tone="live">Live</Chip>
                <Chip tone="gold" title={SIMULATED_NOTE}>
                  Demo
                </Chip>
                <Segmented options={["Brand", "Store"] as const} value={role} onChange={changeRole} />
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  aria-label="Toggle theme"
                  className="grid h-9 w-9 place-items-center rounded-full border border-[var(--app-line)] text-[var(--app-sub)] transition-colors hover:text-[var(--app-text)]"
                >
                  {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
                </button>
                <button
                  onClick={() => setPresent(true)}
                  aria-label="Enter present mode"
                  className="hidden h-9 items-center gap-2 rounded-full px-4 font-inter text-[12.5px] font-semibold text-[var(--app-card)] transition-transform hover:-translate-y-0.5 sm:flex"
                  style={{ background: "var(--app-text)" }}
                >
                  <Play size={13} strokeWidth={2.6} />
                  Present
                </button>
              </div>
            </div>
            {/* Mobile nav */}
            <div className="flex gap-1 overflow-x-auto px-4 pb-2.5 lg:hidden">
              {nav.map((n) => {
                const active = screen === n.id || (n.id === "stores" && screen === "store")
                return (
                  <button
                    key={n.id}
                    onClick={() => setScreen(n.id)}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 font-inter text-[12.5px] font-medium ${
                      active ? "text-[var(--app-text)]" : "text-[var(--app-sub)]"
                    }`}
                    style={active ? { background: "var(--app-card)", boxShadow: "var(--app-shadow)" } : undefined}
                  >
                    {n.label}
                  </button>
                )
              })}
            </div>
          </header>

          <main className="px-5 py-6 sm:px-7 sm:py-8">
            {screen === "overview" && <Overview />}
            {screen === "stores" && (
              <Stores
                onOpen={(id) => {
                  setSelectedStore(id)
                  setScreen("store")
                }}
              />
            )}
            {screen === "store" && <StoreDetail storeId={selectedStore} />}
            {screen === "campaigns" && <Campaigns />}
            {screen === "zones" && <Zones />}
            {screen === "brief" && <Brief />}
            {screen === "manager" && <Manager />}
          </main>

          <footer className="border-t border-[var(--app-line)] px-5 py-5 sm:px-7">
            <p className="font-inter text-[11px] text-[var(--app-faint)]">
              AD Labs Dashboard · {SIMULATED_NOTE} · © 2026 Ad Labs Tech Pvt Ltd
            </p>
          </footer>
        </div>
      </div>

      {present && <PresentMode theme={theme} onClose={() => setPresent(false)} />}
    </div>
  )
}
