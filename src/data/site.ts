export const BRAND = {
  name: "AD Labs",
  wordmarkA: "AD",
  wordmarkB: "Labs",
  legal: "Ad Labs Tech Pvt Ltd",
  city: "Bengaluru, India",
  founded: "2026",
  email: "sales@adlabs.in",
  domain: "adlabs.in",
  tagline: "Physical retail intelligence that respects human privacy.",
}

export const SOCIALS = {
  linkedin: "",
  instagram: "",
  label: "Pages opening soon",
}

export const FOUNDERS = [
  {
    name: "Nishant Parihar",
    role: "Founder — Marketing, Sales & Product",
    line: "Spent years asking brands one question: did the window work? Built AD Labs to finally answer it.",
    linkedin: "https://www.linkedin.com/in/nishantparihar99/",
    initials: "NP",
  },
  {
    name: "Rajendra",
    role: "Co-Founder & CTO",
    line: "Owns the edge. On-device vision that never lets a face leave the store.",
    linkedin: "https://www.linkedin.com/in/rajendrac3/",
    initials: "R",
  },
  {
    name: "Mihir Salian",
    role: "Co-Founder & CDO",
    line: "Owns the data. Turns anonymous movement into decisions a founder can act on.",
    linkedin: "https://www.linkedin.com/in/mihir-salian-760635198/",
    initials: "MS",
  },
]

export const NAV = [
  { label: "The Blind Spot", href: "#blindspot" },
  { label: "Core Journey", href: "#journey" },
  { label: "In-Store", href: "#atelier" },
  { label: "Proof", href: "#proof" },
  { label: "System", href: "#system" },
  { label: "Privacy", href: "#privacy" },
  { label: "Sectors", href: "#sectors" },
]

export const HERO = {
  kicker: "Category-Defining Physical Retail Intelligence",
  headlineA: "Intelligence",
  headlineB: "for the storefront.",
  sub: "Footfall tells you who came in. AD Labs shows you who decided outside — and why some windows work.",
  primaryCta: "Book a Pilot",
  secondaryCta: "See How It Works",
  badgeTenant: "MAISON ÉTOILE · PARIS BOULEVARD",
  badgePrivacy: "Zero Facial Storage · Local AI",
  ticker: ["PASS · 1.4m/s", "STOPPED · 4.8s", "ENTER"],
  live: [
    { label: "people", value: 2481 },
    { label: "stopped", value: 186 },
    { label: "capture rate", value: 7.5, suffix: "%" },
  ],
  footline: ["ON-PREMISES EDGE TELEMETRY", "NO CLOUD VIDEO UPLOAD · ZERO PII"],
  marquee: ["See the movement.", "Understand the attention.", "Improve the store."],
}

export const BLINDSPOT = {
  index: "01",
  kicker: "The Blind Spot",
  h2a: "You know how many people visit your store.",
  h2b: "But do you know how many noticed it?",
  cards: [
    {
      num: "01",
      tag: "THE STREET",
      title: "People walking past",
      metric: "100% Street Footfall",
      desc: "Thousands pass by your storefront every day without breaking stride. Invisible, unrecorded potential.",
      image: "/images/blindspot-pass.jpg",
    },
    {
      num: "02",
      tag: "THE HOOK · CRUCIAL",
      title: "One person stops",
      metric: "The Stop Moment (Gaze & Dwell)",
      desc: "A window display arrests attention. They slow down, turn their gaze, and pause for 4+ seconds.",
      image: "/images/blindspot-stop.jpg",
      highlight: true,
    },
    {
      num: "03",
      tag: "THE THRESHOLD",
      title: "One person enters",
      metric: "Walk-In Conversion",
      desc: "Curiosity turns into physical action. They cross your threshold and become a retail opportunity.",
      image: "/images/blindspot-enter.jpg",
    },
  ],
  closer: "Traditional counters only count who came inside.",
  closerBold: "AD Labs reveals the 90%+ who decided outside.",
}

export const JOURNEY = {
  index: "02",
  kicker: "Core Journey",
  h2: "Beyond footfall.",
  sub: "The complete behavioral continuum — from street attention to in-store product consideration.",
  funnelLabel: "Continuous Physical Funnel",
  funnelSub: "FROM STREET VISIBILITY TO ATELIER ENGAGEMENT",
  bars: [
    { label: "Pass", value: 2481 },
    { label: "Stop", value: 186 },
    { label: "Enter", value: 39 },
    { label: "Explore", value: 34 },
    { label: "Engage", value: 18 },
  ],
  steps: [
    {
      step: "STEP 01",
      name: "PASS",
      count: 2481,
      countLabel: "Street Footfall",
      rate: "100%",
      rateLabel: "Base Street Volume",
      desc: "Pedestrians walking along your storefront perimeter.",
      metrics: ["Avg Pace: 1.4 m/s", "Street Width: 18m"],
    },
    {
      step: "STEP 02",
      name: "STOP",
      count: 186,
      countLabel: "Attention Hook",
      rate: "7.5%",
      rateLabel: "Capture Rate",
      desc: "Passers-by who paused at the window for 4+ seconds.",
      metrics: ["Avg Window Dwell: 4.8s", "Gaze Intensity: 94%"],
    },
    {
      step: "STEP 03",
      name: "ENTER",
      count: 39,
      countLabel: "Threshold Cross",
      rate: "21.0%",
      rateLabel: "Stop-to-Enter",
      desc: "Attention converts into a physical visit through the door.",
      metrics: ["Threshold Velocity: 0.8 m/s"],
    },
    {
      step: "STEP 04",
      name: "EXPLORE",
      count: 34,
      countLabel: "Zone Immersion",
      rate: "87.2%",
      rateLabel: "Active Browsing",
      desc: "Visitors moving through zones with deliberate engagement.",
      metrics: ["Top Zone: Leather Goods Island · 68% traffic share"],
    },
    {
      step: "STEP 05",
      name: "ENGAGE",
      count: 18,
      countLabel: "Product Consideration",
      rate: "52.9%",
      rateLabel: "High-Intent Touch",
      desc: "Hands on product — the moment consideration becomes intent.",
      metrics: ["Avg Product Gaze: 8.4s", "Fitting Trials: 14"],
    },
  ],
  band: {
    title: "Full-Funnel Store Intelligence",
    sub: "From street sidewalk to high-touch checkout.",
    tags: ["Zero Face Biometrics", "100% Local Edge Compute", "Sub-Second Precision"],
  },
}

export const ATELIER = {
  index: "03",
  kicker: "Inside The Atelier",
  h2: "What happens once they step inside?",
  sub: "In-store intelligence layered on your existing cameras — zones, gaze, pace and cohorts.",
  image: "/images/in-store-zones.jpg",
  camLabel: "ATELIER INTERIOR CAM 02 · 3D OCCUPANCY MESH",
  tabs: [
    {
      id: "zones",
      label: "1. Zone Heatmaps",
      overlay: {
        tag: "ZONE 01 · APPAREL",
        big: "41% Traffic",
        lines: ["Avg Dwell: 6m 12s", "182 Shoppers"],
      },
      pin: { title: "Hero Handbag Vitrine", value: "8.4s Gaze Time · 42% Touch Rate" },
    },
    {
      id: "gaze",
      label: "2. Product Gaze & Sections",
      overlay: {
        tag: "HERO ZONE · ACCESSORIES",
        big: "68% Traffic",
        lines: ["Highest Store Density", "9m 45s Dwell"],
      },
      pin: { title: "Capsule Runway Rail", value: "5.2s Gaze Time · 24% Interaction" },
    },
    {
      id: "velocity",
      label: "3. Movement Velocity & Speed",
      overlay: {
        tag: "DECELERATION DETECTED",
        big: "0.3 m/s Browsing Pace",
        lines: ["Shoppers slow by 76% when entering the accessory rotunda."],
      },
      pin: { title: "Transit Corridor", value: "1.3 m/s Pace" },
    },
    {
      id: "cohorts",
      label: "4. Shopper Demographics",
      overlay: {
        tag: "ANONYMOUS COHORT TELEMETRY · TODAY",
        big: "Age 28–44 (62%)",
        lines: [
          "Primary Cohort",
          "Shopping Dynamic: 58% Solo · 42% Pair",
          "Peak Footfall Time: 16:30 – 18:45",
          "Fitting Room Conversion: 74%",
        ],
      },
      pin: { title: "Advisory Salon", value: "Conversion: 38%" },
    },
  ],
  features: [
    {
      title: "Zone Dwell Share",
      sub: "Know your hottest sections",
      desc: "Discover which zones capture the majority of customer browsing time and which floor areas suffer from dead traffic.",
    },
    {
      title: "Product Gaze Duration",
      sub: "Measure fixture attention",
      desc: "Quantify exact gaze time on hero products, vitrines and fixture drops.",
    },
    {
      title: "Movement Velocity",
      sub: "Track browsing speed",
      desc: "Detect where customer walking pace decelerates into consideration — and where corridors stay cold transit.",
    },
    {
      title: "Demographic Cohorts",
      sub: "Understand your audience",
      desc: "Privacy-safe, anonymized age bracket and group composition analysis across days and collection launches.",
    },
  ],
}

export const PROOF = {
  index: "04",
  kicker: 'The "Aha" Moment',
  h2: "Did your storefront work?",
  sub: "Connect merchandising changes with changes in customer behaviour.",
  chip: "PHYSICAL A/B MEASUREMENT",
  store: "Madison Avenue Flagship",
  before: {
    label: "BASELINE / BEFORE",
    value: "6.4%",
    metric: "Capture Rate",
    desc: "Traditional static mannequin installation.",
    image: "/images/window-before.jpg",
  },
  after: {
    label: "NEW WINDOW DISPLAY / NEW ROTATION",
    badges: ["AFTER", "VERIFIED"],
    value: "7.3%",
    metric: "Capture Rate",
    desc: "Statistically measured over a 14-Day A/B Rotation.",
    image: "/images/window-after.jpg",
  },
  uplift: "↑ +14.6% observed uplift",
}

export const SYSTEM = {
  index: "05",
  kicker: "One Sensor. One Decision Point.",
  h2: "The sensor tracks behavior. The brand tracks context. The engine finds the correlation.",
  sub: "You stop guessing. You start knowing.",
  trio: [
    { k: "01", title: "Sensor tracks behavior", desc: "Pass, stop, dwell, enter — measured on-device from your existing RTSP/NVR cameras." },
    { k: "02", title: "Brand tracks context", desc: "Window resets, campaigns, staffing and layout — the changes you make, logged." },
    { k: "03", title: "Engine finds correlation", desc: "Every Monday: what changed, what moved, and the three actions worth your time." },
  ],
  interface: {
    kicker: "The Interface",
    h2: "Quiet clarity.",
    sub: "No endless dashboards. Just the vital signals you need to make decisions.",
    store: "Madison Avenue Flagship",
    live: "LIVE · TODAY",
    stats: [
      { label: "People today", value: 2481 },
      { label: "Capture rate", value: 7.5, suffix: "%" },
      { label: "Walk-ins", value: 39 },
    ],
    trend: "HOURLY ATTENTION TREND",
    trendDelta: "+14.6% vs last week",
    hours: "09:00 — 21:00",
    cta: "Explore the insights",
  },
}

export const METRICS = {
  index: "06",
  kicker: "What a brand can answer",
  h2: "Twelve signals. One sensor.",
  sub: "From impression to conversion — the storefront questions you could never ask before.",
  items: [
    { title: "Stop rate", desc: "How many passers-by paused at your window." },
    { title: "Look time", desc: "How long they gazed — casual glance or deep attention." },
    { title: "Entry rate", desc: "How many crossed the threshold after stopping." },
    { title: "Street footfall", desc: "Total opportunity walking past, by hour and day." },
    { title: "Capture rate", desc: "Passers-by converted into visitors." },
    { title: "Zone dwell", desc: "Where attention lives inside the store." },
    { title: "Dead zones", desc: "Floor areas traffic forgets — flagged and fixable." },
    { title: "Product gaze", desc: "Which fixtures and heroes earn real attention." },
    { title: "Movement velocity", desc: "Where shoppers decelerate into consideration." },
    { title: "Group size", desc: "Solo browsers vs pairs vs parties — by daypart." },
    { title: "Peak windows", desc: "The exact hours your storefront performs." },
    { title: "Change attribution", desc: "Did the new window actually move the numbers?" },
  ],
}

export const SECTORS = {
  index: "07",
  kicker: "Environments",
  h2: "Built for spaces where impression is everything.",
  cards: [
    {
      num: "01",
      title: "Fashion",
      sub: "Haute couture & ready-to-wear flagships",
      tag: "SEASONAL COLLECTIONS",
      image: "/images/sector-fashion.jpg",
    },
    {
      num: "02",
      title: "Beauty",
      sub: "Fragrance & luxury cosmetic ateliers",
      tag: "INTERACTIVE COUNTERS",
      image: "/images/sector-beauty.jpg",
    },
    {
      num: "03",
      title: "Jewellery",
      sub: "High jewellery & fine timepiece salons",
      tag: "HERO VITRINES",
      image: "/images/sector-jewellery.jpg",
    },
    {
      num: "04",
      title: "Premium Retail",
      sub: "Concept destinations & department stores",
      tag: "CORNERSTONE ENTRANCES",
      image: "/images/sector-premium-retail.jpg",
    },
  ],
}

export const PRIVACY = {
  index: "08",
  kicker: "Architectural Principle",
  h2: "Intelligence without surveillance.",
  sub: "Privacy is not a policy footer here. It is the architecture.",
  principles: [
    {
      num: "01",
      title: "Video stays local.",
      desc: "Frames are processed in volatile memory inside your store. Nothing is recorded, nothing is uploaded.",
    },
    {
      num: "02",
      title: "No persistent customer identity.",
      desc: "No facial recognition, no re-identification, no cross-store tracking. Every person is an anonymous vector.",
    },
    {
      num: "03",
      title: "Only anonymised behavioural events leave the store.",
      desc: "Pure numbers: a timestamp, dwell duration in seconds, and entry status. That is all the cloud ever sees.",
    },
  ],
  pipeline: [
    { stage: "ORIGIN", title: "Store Camera", desc: "Existing RTSP / NVR feeds" },
    { stage: "PROCESSING", title: "Local Intelligence", desc: "On-prem edge inferencing", badge: "Zero Cloud Video" },
    { stage: "OUTPUT", title: "Anonymised Insights", desc: "Pure numerical telemetry" },
  ],
}

export const HOW = {
  index: "09",
  kicker: "How it works",
  h2: "Live in 48 hours. First brief in 7 days.",
  steps: [
    { num: "01", title: "Connect", desc: "Existing RTSP/NVR cameras. Plug-and-play edge compute. Zero new hardware." },
    { num: "02", title: "Calibrate", desc: "We map your windows, zones and light. The system learns your store's rhythm." },
    { num: "03", title: "Monday Brief", desc: "Every Monday: the verdict, three actions, benchmark context. Fifteen minutes, done." },
  ],
  compat: "COMPATIBLE WITH EXISTING RTSP/NVR STREAMS · ZERO HARDWARE OVERHAUL",
  wishlist: {
    kicker: "Join the pilot list",
    h2: "What happens outside your store matters. Start understanding it.",
    sub: "Tell us about your flagship. We will reach out within 48 hours to review your camera setup.",
    successTitle: "You're on the runway.",
    successBody: "We'll reach out within 48 hours to review your storefront camera setup and schedule installation.",
    successNote: "Confirmation will be sent to",
    feedbackQ: "Was this page clear?",
    feedbackYes: "Yes, crystal",
    feedbackNo: "Not yet",
    feedbackThanks: "Thank you — noted.",
  },
}

export const PILOT_FORM = {
  title: "Exclusive Retail Pilot Program",
  h2: "Deploy AD Labs in your flagship store.",
  sub: "Connect your existing cameras in under 48 hours. Receive your first storefront capture rate report within 7 days.",
  fields: {
    brand: { label: "Retail Brand / House Name", placeholder: "e.g. Maison Laurent" },
    sector: {
      label: "Sector",
      options: [
        "Fashion & Apparel",
        "Fashion & Haute Couture",
        "Beauty & Cosmetics",
        "Jewellery & Watches",
        "Department Store / Concept",
        "Premium Footwear",
      ],
    },
    locations: {
      label: "Store Locations",
      options: ["1 Flagship Location", "1-5 Stores", "2 - 5 Stores", "6 - 20 Stores", "20+ Global Network"],
    },
    email: { label: "Executive / Work Email", placeholder: "name@brand.com" },
  },
  note: "Hardware Guarantee: Zero new cameras required. Works with your existing IP camera infrastructure via local plug-and-play edge compute.",
  submit: "Request Pilot Access",
  successTitle: "Pilot Request Received.",
  successBody: "Our partner team will contact you within 24 hours to review your storefront camera setup and schedule installation.",
  return: "Return to Website",
}
