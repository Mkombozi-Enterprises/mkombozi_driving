/** Shared site content — edit here to keep the site feeling hand-updated */

export const site = {
  name: "Mkombozi Driving School",
  phone: "+254 720 575778",
  phoneTel: "+254720575778",
  whatsapp: "254720575778",
  email: "info@mkombozidrivingschool.co.ke",
  hours: "Mon–Sat, 7:00AM–6:00PM",
  hoursLong: "Mon–Sat: 7:00AM–6:00PM · Sunday by appointment",
  address: "Chevaywa-Matete Road, Lumakanda, Kakamega County, Kenya",
  addressShort: "Chevaywa-Matete Road, Kakamega",
  googleBusinessUrl:
    "https://www.google.com/search?q=Mkombozi+Driving+School+Lumakanda+Kakamega",
  googleReviewHint: "Search “Mkombozi Driving School Lumakanda” on Google Maps",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=34.9319%2C0.6241%2C34.9819%2C0.6641&marker=0.6441%2C34.9569&layer=mapnik",
  mapLat: -0.6441,
  mapLng: 34.9569,
  areaServed: "Kakamega County",
  priceRange: "KES",
  /** Optional: public/audio/founder-mangelepa.mp3 */
  founderAudioSrc: "/audio/founder-mangelepa.mp3",
  founderAudioTranscript:
    "Karibu. When I started this yard in Lumakanda, I wanted a place where learners actually understand the road, not just pass the test. Niko hapa.",
};

/** Hand-pinned yard note — rotate monthly (Caveat / paper card) */
export const yardNote = {
  body: "This week we're practicing night driving after 6pm. Bring a jacket — Lumakanda gets cold after dark. See you at the yard.",
  signOff: "— Mangelepa",
  updatedLabel: "Pinned this week",
};

/** Manual yard board — update in site.ts to feel alive */
export const yardToday = {
  title: "Today at Lumakanda Yard",
  lines: [
    { icon: "car" as const, text: "Class B: 9am — 12pm" },
    { icon: "moto" as const, text: "Class A: 2pm — 4pm" },
    { icon: "rain" as const, text: "Wet-road drill: 5pm (if rain holds)" },
  ],
  nextIntake: "Next intake: rolling — book a slot any week",
  practiceRoute:
    "Your likely test route (~12km). We practice this every Thursday: yard → Kakamega Forest turnoff → equator marker loop → home.",
};

/** Living social proof — add real graduates only */
export const wallOfPasses: {
  name: string;
  classLabel: string;
  datePassed: string;
  advice: string;
}[] = [];

/** Soft ticker when wall is empty or for hero */
export const passesTicker = {
  thisWeekCount: 0, // set when you have real numbers
  emptyCta: "Be the first on our 2026 wall. Book today.",
  hasWeekLabel: (n: number) =>
    n > 0 ? `This week: ${n} new driver${n === 1 ? "" : "s"} licensed` : null,
};

export const journeyPosts = [
  { id: "home", label: "Start", short: "01" },
  { id: "about", label: "Why us", short: "02" },
  { id: "courses", label: "Courses", short: "03" },
  { id: "route", label: "The route", short: "04" },
  { id: "pricing", label: "Packages", short: "05" },
  { id: "contact", label: "Enrol", short: "06" },
] as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#courses", label: "Courses" },
  { href: "#route", label: "The Route" },
  { href: "#pricing", label: "Pricing" },
  { href: "#instructors", label: "Instructors" },
  { href: "#wall", label: "Wall of Passes" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

/** Local geography — not abstract steps */
export const routeStops = [
  {
    title: "Stop 1: Kakamega Referral (Medical)",
    body: "Eyesight & fitness check — we point you to the right desk.",
    mobile:
      "Medical fitness and eyesight at the Kakamega Referral path. We tell you exactly where to go.",
  },
  {
    title: "Stop 2: eCitizen / TIMS",
    body: "Provisional licence application — we sit with you on the portal.",
    mobile:
      "We help you apply for your provisional via eCitizen's TIMS portal.",
  },
  {
    title: "Stop 3: Highway Code at the Yard",
    body: "Theory on our Lumakanda board — rules before roads.",
    mobile:
      "Highway Code and theory classes in the yard theory room, Lumakanda.",
  },
  {
    title: "Stop 4: Dual-Control on Local Roads",
    body: "Mumias Road, Chevaywa–Matete, market traffic — real Kakamega pace.",
    mobile:
      "Behind the wheel on local roads: Mumias Road corridors, market traffic, dual-control safety.",
  },
  {
    title: "Stop 5: NTSA Kakamega Office",
    body: "We book and prep you for theory & practical at the county office.",
    mobile:
      "Test booking and prep for NTSA Kakamega — theory and practical.",
  },
  {
    title: "Stop 6: The Open Road (Mumias Road → anywhere)",
    body: "Smart licence in hand. First solo drive is yours to choose.",
    mobile:
      "You're licensed — Mumias Road to anywhere. Safari njema.",
  },
] as const;

export const courses = [
  {
    tag: "Class A",
    title: "Motorcycles & Boda Bodas",
    body: "Balance, control, and defensive road-craft for two- and three-wheelers, from mopeds to courier bikes.",
    icon: "moto" as const,
    duration: "~2–4 weeks",
  },
  {
    tag: "Class B",
    title: "Personal & Private Cars",
    body: "Manual or automatic saloon car, SUV, and pick-up training — our most popular course and the right start for most learners.",
    icon: "car" as const,
    duration: "~4–8 weeks",
  },
  {
    tag: "Class C",
    title: "Trucks & Commercial Vehicles",
    body: "Light to heavy goods vehicle training for drivers building a career in transport and logistics.",
    icon: "truck" as const,
    duration: "~4–10 weeks",
  },
  {
    tag: "Class D",
    title: "PSV — Matatu & Bus",
    body: "Commercial passenger-vehicle training plus PSV badge preparation for aspiring public transport drivers.",
    icon: "bus" as const,
    duration: "~4–10 weeks",
  },
  {
    tag: "Add-On",
    title: "Defensive Driving",
    body: "Hazard perception and advanced safety technique for licensed drivers who want real confidence in traffic.",
    icon: "shield" as const,
    duration: "1–3 days",
  },
  {
    tag: "Add-On",
    title: "Refresher Lessons",
    body: "Back-behind-the-wheel coaching for licence holders who haven't driven in a while.",
    icon: "clock" as const,
    duration: "Flexible",
  },
  {
    tag: "Prep",
    title: "NTSA Theory & Test Prep",
    body: "Highway Code coaching and mock tests, so you walk into your NTSA test ready.",
    icon: "check" as const,
    duration: "1–2 weeks",
  },
  {
    tag: "Fast-Track",
    title: "Intensive Crash Course",
    body: "A condensed, fast-track programme for learners working against a deadline.",
    icon: "target" as const,
    duration: "~2–4 weeks",
  },
] as const;

export const fleet = [
  { title: "Manual Saloon Car", slot: "Manual" },
  { title: "Automatic Saloon Car", slot: "Automatic" },
  { title: "Training Motorcycle", slot: "Class A" },
  { title: "PSV Minibus", slot: "PSV" },
] as const;

export const packages = [
  {
    name: "Basic",
    classLabel: "Class B — Manual",
    fromPrice: "15,000",
    featured: false,
    courseValue: "Class B – Manual (Basic)",
    duration: "~4–6 weeks",
    included: [
      "20 practical lessons",
      "Highway Code theory classes",
      "NTSA test-booking support",
    ],
    extras: [
      "NTSA medical & licence fees (government)",
      "Passport photos & eCitizen charges",
    ],
  },
  {
    name: "Standard",
    classLabel: "Class B — Automatic",
    fromPrice: "20,000",
    featured: true,
    courseValue: "Class B – Automatic (Standard)",
    duration: "~5–8 weeks",
    included: [
      "25 practical lessons",
      "Theory classes + 1 mock test",
      "Automatic transmission focus",
      "NTSA test-booking support",
    ],
    extras: [
      "NTSA medical & licence fees (government)",
      "Extra lessons beyond package",
    ],
  },
  {
    name: "Premium",
    classLabel: "Complete Package",
    fromPrice: "35,000",
    featured: false,
    courseValue: "Complete Package (Premium)",
    duration: "~6–10 weeks",
    included: [
      "Manual + automatic training",
      "Defensive driving add-on",
      "Priority scheduling",
      "1 free refresher lesson",
    ],
    extras: [
      "NTSA medical & licence fees (government)",
      "Passport photos & eCitizen charges",
    ],
  },
] as const;

/** Superpowers > job titles */
export const instructors = [
  {
    name: "Hadson Musamusi",
    superpower: "The Highway Merge Coach",
    role: "Class B & Defensive Driving",
    years: 15,
    quote:
      "Rush hour on the Kakamega corridor doesn't scare me — and after a few lessons, it won't scare you either.",
    audioSrc: "/audio/instructor-hadson.mp3",
  },
  {
    name: "Judith Fedha",
    superpower: "The Parallel Parking Whisperer",
    role: "Class B Automatic & Refresher",
    years: 8,
    quote:
      "I've never had a student fail reversing at the Kakamega test yard — we practice until the car knows the space.",
    audioSrc: "/audio/instructor-judith.mp3",
  },
  {
    name: "Peter Katana",
    superpower: "Mumias Road Expert",
    role: "PSV & Class D",
    years: 12,
    quote:
      "I know every pothole season on Mumias Road. Commercial drivers need that map in their bones.",
    audioSrc: "/audio/instructor-peter.mp3",
  },
  {
    name: "Sarah N.",
    superpower: "Balance Before Speed",
    role: "Class A Motorcycles",
    years: 6,
    quote:
      "Hello — I'm Sarah. I teach Class A. We start with balance and road craft, not show-offs.",
    audioSrc: "/audio/instructor-sarah.mp3",
  },
] as const;

export const reviews: {
  quote: string;
  name: string;
  loc: string;
  source?: string;
}[] = [];

export const faqs = [
  {
    q: "What's the minimum age to start lessons?",
    a: "You can start on a learner's/provisional licence from age 16 (with parental consent), Class B car lessons from 18, and Class C and above typically from 24.",
  },
  {
    q: "Do I need a medical certificate?",
    a: "Yes — a medical fitness and eyesight check is required before NTSA will issue a provisional or full driving licence. We point you toward the Kakamega medical path.",
  },
  {
    q: "Manual or automatic — which should I choose?",
    a: "Both are available. Automatic is often simpler for beginners, while manual (B2) gives you the flexibility to later drive either transmission.",
  },
  {
    q: "How long does the full course take?",
    a: "Most learners complete their course in 4–8 weeks, depending on the package chosen and how often they take lessons on our Lumakanda roads.",
  },
  {
    q: "Do you help book my NTSA test?",
    a: "Yes — we handle scheduling for theory and practical through TIMS/eCitizen, aimed at the NTSA Kakamega process.",
  },
  {
    q: "Do you offer weekend or evening lessons?",
    a: "Yes — early mornings, evenings (including night driving practice), and weekends so lessons fit around work or school.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash, bank transfer, and M-Pesa, with instalment plans available on our Standard and Premium packages.",
  },
  {
    q: "Are NTSA fees included in package prices?",
    a: "Package prices cover training with us. Government items — medical, eCitizen, licence card fees — are usually paid separately. We'll list every cost clearly when you enrol.",
  },
] as const;

export const courseSelectOptions = [
  {
    value: "Class A – Motorcycle",
    label: "Class A — Motorcycle",
    duration: "~2–4 weeks",
  },
  {
    value: "Class B – Manual (Basic)",
    label: "Class B — Manual",
    duration: "~4–6 weeks",
  },
  {
    value: "Class B – Automatic (Standard)",
    label: "Class B — Automatic",
    duration: "~5–8 weeks",
  },
  {
    value: "Class C – Truck",
    label: "Class C — Truck",
    duration: "~4–10 weeks",
  },
  {
    value: "Class D – PSV",
    label: "Class D — PSV (Matatu/Bus)",
    duration: "~4–10 weeks",
  },
  {
    value: "Complete Package (Premium)",
    label: "Complete Package",
    duration: "~6–10 weeks",
  },
  {
    value: "Other",
    label: "Other / Not sure yet",
    duration: "We'll advise",
  },
] as const;

/** EAT-aware hero lines (client computes hour) */
export function greetingForHour(hour: number): string {
  if (hour >= 6 && hour < 11) return "Good morning. Ready for your first lesson?";
  if (hour >= 11 && hour < 16)
    return "Habari za mchana. Come see the yard while the sun is up.";
  if (hour >= 16 && hour < 20)
    return "Good evening. We're running night classes until 7pm.";
  return "Karibu. Leave us a message — we'll reply by 8am.";
}

export function eveningBannerForHour(hour: number): string | null {
  if (hour >= 18 && hour < 22) return "Habari za jioni! Evening classes available.";
  return null;
}
