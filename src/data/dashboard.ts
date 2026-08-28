export interface Kpi {
  id: string
  label: string
  value: string
  delta: string
  deltaTone: "pos" | "neg" | "flat"
  deltaNote: string
  peer?: string
  hint: string
}

export interface Store {
  id: string
  name: string
  city: string
  grade: "A" | "B" | "C"
  footfallToday: number
  stopRate: string
  trend: "up" | "flat" | "down"
  spark: number[]
  flag?: string
}

export const TENANT = { name: "Maison Étoile", store: "Madison Avenue Flagship" }

export const PERIODS = ["Today", "This week", "30 days", "Baseline → Wk 12"] as const
export type Period = (typeof PERIODS)[number]

export const KPIS: Record<"today" | "week", Kpi[]> = {
  today: [
    { id: "footfall", label: "Street Footfall", value: "2,481", delta: "+6.2%", deltaTone: "pos", deltaNote: "vs yesterday", hint: "Peak volume 16:30 – 18:45" },
    { id: "stop", label: "Window Stop Rate", value: "7.5%", delta: "+0.4pp", deltaTone: "pos", deltaNote: "vs yesterday", peer: "8.9%", hint: "Threshold: paused ≥ 3s" },
    { id: "walkins", label: "Walk-ins", value: "39", delta: "+3", deltaTone: "pos", deltaNote: "vs yesterday", hint: "Peak entry 16:30 – 18:45" },
    { id: "dwell", label: "In-Store Dwell", value: "6m 12s", delta: "+22s", deltaTone: "pos", deltaNote: "vs yesterday", hint: "Hero zone holds 9m 45s" },
    { id: "dead", label: "Dead Zones", value: "18%", delta: "−3pp", deltaTone: "pos", deltaNote: "vs last week", hint: "Zone F1 under-lit after 18:00" },
  ],
  week: [
    { id: "footfall", label: "Street Footfall", value: "16,340", delta: "+8%", deltaTone: "pos", deltaNote: "vs last week", hint: "Best day: Saturday · 3,120" },
    { id: "stop", label: "Window Stop Rate", value: "11.4%", delta: "+1.2pp", deltaTone: "pos", deltaNote: "vs last week", peer: "8.9%", hint: "Threshold: paused ≥ 3s" },
    { id: "walkins", label: "Walk-ins", value: "391", delta: "+14.6%", deltaTone: "pos", deltaNote: "vs last week", hint: "Peak entry 16:30 – 18:45" },
    { id: "dwell", label: "In-Store Dwell", value: "6m 12s", delta: "+48s", deltaTone: "pos", deltaNote: "vs last week", hint: "Hero zone holds 9m 45s" },
    { id: "dead", label: "Dead Zones", value: "18%", delta: "−3pp", deltaTone: "pos", deltaNote: "vs last week", hint: "Zone F1 under-lit after 18:00" },
  ],
}

export const FUNNEL = {
  today: [
    { stage: "Pass", value: 2481, rate: "100%", label: "Street Footfall" },
    { stage: "Stop", value: 186, rate: "7.5%", label: "Attention Hook" },
    { stage: "Enter", value: 39, rate: "21.0%", label: "Stop-to-Enter" },
    { stage: "Explore", value: 34, rate: "87.2%", label: "Active Browsing" },
    { stage: "Engage", value: 18, rate: "52.9%", label: "High-Intent Touch" },
  ],
  week: [
    { stage: "Pass", value: 16340, rate: "100%", label: "Street Footfall" },
    { stage: "Stop", value: 1861, rate: "11.4%", label: "Attention Hook" },
    { stage: "Enter", value: 391, rate: "21.0%", label: "Stop-to-Enter" },
    { stage: "Explore", value: 341, rate: "87.2%", label: "Active Browsing" },
    { stage: "Engage", value: 180, rate: "52.9%", label: "High-Intent Touch" },
  ],
}

export const TRAFFIC_HOURS = [
  { h: "09", v: 88 }, { h: "10", v: 132 }, { h: "11", v: 168 }, { h: "12", v: 198 },
  { h: "13", v: 186 }, { h: "14", v: 214 }, { h: "15", v: 262 }, { h: "16", v: 289 },
  { h: "17", v: 271 }, { h: "18", v: 196 }, { h: "19", v: 158 }, { h: "20", v: 112 },
  { h: "21", v: 107 },
]

export const PEAK_WINDOWS = [
  { label: "PEAK 15:00 – 17:00", note: "Window attention peaks · staff up 2" },
  { label: "PEAK 16:30 – 18:45", note: "Entry cluster · 3 on floor" },
]

export const STORES: Store[] = [
  {
    id: "madison",
    name: "Madison Avenue Flagship",
    city: "New York",
    grade: "A",
    footfallToday: 2481,
    stopRate: "7.5%",
    trend: "up",
    spark: [1.9, 2.1, 2.0, 2.3, 2.2, 2.4, 2.5],
  },
  {
    id: "beverly",
    name: "Beverly Hills Boutique",
    city: "Los Angeles",
    grade: "B",
    footfallToday: 1620,
    stopRate: "6.2%",
    trend: "flat",
    spark: [1.7, 1.6, 1.7, 1.6, 1.7, 1.6, 1.6],
  },
  {
    id: "mayfair",
    name: "Mayfair Salon",
    city: "London",
    grade: "C",
    footfallToday: 980,
    stopRate: "4.1%",
    trend: "down",
    spark: [1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.9],
    flag: "Window underperforming — stop rate 4.1% vs 8.9% cohort",
  },
]

export interface Zone {
  code: string
  name: string
  traffic: number
  dwell: string
  heat: number
  note?: string
  flag?: string
}

export const ZONES: Zone[] = [
  { code: "E0", name: "Entrance Gallery", traffic: 100, dwell: "0m 48s", heat: 0.42, note: "Threshold velocity 0.8 m/s" },
  { code: "A1", name: "Apparel Zone", traffic: 41, dwell: "6m 12s", heat: 0.62 },
  { code: "L2", name: "Leather Goods Island", traffic: 68, dwell: "7m 04s", heat: 0.86, note: "Top zone · 68% traffic share" },
  { code: "H3", name: "Accessories Hero · Rotunda", traffic: 55, dwell: "9m 45s", heat: 0.95, note: "Highest store density" },
  { code: "F1", name: "Vitrine West", traffic: 9, dwell: "1m 02s", heat: 0.12, flag: "Under-lit after 18:00 — dwell 2.1× below floor average" },
  { code: "D4", name: "Denim Wall", traffic: 27, dwell: "3m 38s", heat: 0.38 },
  { code: "S5", name: "Footwear Alcove", traffic: 22, dwell: "2m 54s", heat: 0.3 },
  { code: "R6", name: "Fitting Rooms", traffic: 12, dwell: "8m 10s", heat: 0.58, note: "Conversion: 74%" },
  { code: "V7", name: "Advisory Salon", traffic: 15, dwell: "5m 26s", heat: 0.44, note: "Conversion: 38%" },
  { code: "T8", name: "Transit Corridor", traffic: 83, dwell: "0m 22s", heat: 0.18, note: "1.3 m/s pace — cold transit" },
]

export const DEMOGRAPHICS = {
  ages: [
    { band: "18–27", pct: 14 },
    { band: "28–44", pct: 62 },
    { band: "45–60", pct: 19 },
    { band: "60+", pct: 5 },
  ],
  dynamics: { solo: 58, pair: 42 },
  peak: "16:30 – 18:45",
  note: "Aggregated · minimum 10 individuals per cohort bucket",
}

export interface Campaign {
  id: string
  name: string
  week: string
  type: string
  metricLabel: string
  before: string
  after: string
  window: string
  verified: boolean
  uplift: string
  imageBefore: string
  imageAfter: string
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: "winter",
    name: "Winter Rotation",
    week: "Wk 4",
    type: "Window reset",
    metricLabel: "Capture Rate",
    before: "6.4%",
    after: "7.3%",
    window: "14-Day A/B Rotation",
    verified: true,
    uplift: "+14.6% observed uplift",
    imageBefore: "/images/window-before.jpg",
    imageAfter: "/images/window-after.jpg",
  },
  {
    id: "sash",
    name: "Hero Sash Installation",
    week: "Wk 8",
    type: "Display change",
    metricLabel: "Avg Hero Gaze",
    before: "8.4s",
    after: "9.6s",
    window: "7-Day A/B Rotation",
    verified: true,
    uplift: "+14.3% observed uplift",
    imageBefore: "/images/in-store-zones.jpg",
    imageAfter: "/images/window-after.jpg",
  },
]

export const CAMPAIGN_TIMELINE = [
  { week: "W1", stop: 9.2 }, { week: "W2", stop: 9.4 }, { week: "W3", stop: 9.1 },
  { week: "W4", stop: 9.3, event: "Winter Rotation" }, { week: "W5", stop: 10.8 },
  { week: "W6", stop: 11.2 }, { week: "W7", stop: 11.0 }, { week: "W8", stop: 10.6, event: "Hero Sash" },
  { week: "W9", stop: 12.1 }, { week: "W10", stop: 12.4 }, { week: "W11", stop: 11.8 },
  { week: "W12", stop: 11.4 },
]

export const CAMPAIGN_VERDICT =
  "The Wk 4 rotation worked — capture rate beat baseline by +14.6% and held for three weeks. The Wk 8 sash lifted hero gaze by 1.2s. Keep the layout; test the offer next."

export const BRIEF = {
  week: "Wk 12",
  title: "Monday Decision Brief",
  minutes: "15-minute read · built for founders",
  verdict:
    "The window rotation is still paying for itself — capture rate is +14.6% vs baseline and stop rate sits 2.5pp above the luxury cohort. The west vitrine is now the weakest link.",
  actions: [
    {
      title: "Move the Leather Island 1.5m into the window sightline",
      why: "Zone F1 dwell is 2.1× the floor average after 18:00. The island already owns 68% traffic share — give it the glass.",
      priority: "High",
      tag: "Layout",
    },
    {
      title: "Staff up 2 for the 15:00 – 17:00 attention peak",
      why: "Walk-ins cluster in this window all week. Coverage converts.",
      priority: "Medium",
      tag: "Staffing",
    },
    {
      title: "Refresh Vitrine West",
      why: "Deep Attention (> 4s) fell 6pp over two weeks. A rotation is due.",
      priority: "High",
      tag: "Visual",
    },
  ],
  benchmark: "Stop rate 11.4% vs peer 8.9% — luxury cohort · 37 stores · anonymised",
  evidence: [
    { image: "/images/window-before.jpg", label: "Baseline · Wk 3" },
    { image: "/images/window-after.jpg", label: "Rotation · Wk 5" },
    { image: "/images/in-store-zones.jpg", label: "Zones · Wk 12" },
  ],
}

export const MANAGER = {
  store: "Madison Avenue Flagship",
  date: "Monday · Wk 12",
  staffing: [
    { window: "12:30 – 14:30", need: "2 on floor", note: "Lunch overlap" },
    { window: "16:30 – 18:45", need: "3 on floor", note: "Entry cluster — peak" },
  ],
  checklist: [
    "Position Leather Island hero at 45° to the glass",
    "Count register float before 11:00",
    "Log window-change photos by 10:00",
    "Test Vitrine West lighting at 18:00",
  ],
  alert: "Window stop rate is trending +0.4pp today. Keep the current rotation.",
}

export const WINDOW_ENGAGEMENT = [
  { label: "Casual Glance (< 2s)", pct: 42 },
  { label: "Deep Attention (> 4s dwell)", pct: 39 },
  { label: "Immediate Entry Turn", pct: 19 },
]

export const PEER_NOTE = "Peer set: anonymised luxury cohort · n = 37 stores"
export const SIMULATED_NOTE = "Simulated showcase data"
