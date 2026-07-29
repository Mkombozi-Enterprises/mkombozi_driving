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
  founderAudioSrc: "/audio/founder-mangelepa.mp3",
  founderAudioTranscript:
    "Arise and Shine for your light has come.",
};

export const yardNote = {
  body: "This week we're practicing night driving after 6pm. Bring a jacket — Lumakanda gets cold after dark. See you at the yard.",
  signOff: "— The yard team",
  updatedLabel: "Pinned this week",
};

export const founderQuote = "Arise and Shine for your light has come";

export const yardToday = {
  title: "Today at Lumakanda Yard",
  lines: [
    { icon: "car" as const, text: "Category B (B1/B2): 9am — 12pm" },
    { icon: "moto" as const, text: "Category A (A1–A3): 2pm — 4pm" },
    { icon: "rain" as const, text: "Wet-road drill: 5pm (if rain holds)" },
  ],
  nextIntake: "Next intake: rolling — book a slot any week",
  practiceRoute:
    "Your likely test route (~12km). We practice this every Thursday: yard → Kakamega Forest turnoff → equator marker loop → home.",
};

export const wallOfPasses: {
  name: string;
  classLabel: string;
  datePassed: string;
  advice: string;
}[] = [];

export const passesTicker = {
  thisWeekCount: 0,
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

/**
 * We only train Category A and Category B (NTSA Kenya).
 * No Class C (trucks) or Class D (PSV matatu/bus).
 */
export const licenceGroups = [
  {
    classKey: "A",
    title: "Category A — Driving Licence",
    subtitle: "Motorcycles, mopeds, motorcycle taxis & three-wheelers",
    courses: [
      {
        code: "A1",
        name: "Moped",
        description:
          "Ride a motorcycle of up to 50cc. No passengers and no loads allowed.",
        requirements: ["Minimum age of 16 years"],
        icon: "moto" as const,
      },
      {
        code: "A2",
        name: "Light motorcycle",
        description:
          "Ride a motorcycle above 50cc. May carry a passenger, and a maximum load of 60 kg (for up to 400cc).",
        requirements: ["Minimum age of 18 years"],
        icon: "moto" as const,
      },
      {
        code: "A3",
        name: "Motorcycle taxi, couriers & three-wheelers",
        description:
          "Ride a motorcycle above 100cc — including motorcycle taxi, courier work, and three-wheelers (e.g. tuk-tuk). May carry a passenger and a maximum load of 100 kg (for up to 50cc as applicable).",
        requirements: [
          "Minimum age of 21 years",
          "1 year riding experience in category A2",
        ],
        icon: "moto" as const,
      },
    ],
  },
  {
    classKey: "B",
    title: "Category B — Driving Licence",
    subtitle: "Light vehicles (passenger cars) up to 3,500 kg GVW",
    courses: [
      {
        code: "B1",
        name: "Light vehicle",
        description:
          "Drive a light vehicle (passenger car) with a maximum Gross Vehicle Weight (GVW) of 3,500 kg plus one light trailer (not exceeding 750 kg). Manual or automatic gearbox. Up to 7 passengers.",
        requirements: ["Minimum age of 18 years"],
        icon: "car" as const,
      },
      {
        code: "B2",
        name: "Light vehicle — automatic only",
        description:
          "Drive a light vehicle with an automatic gearbox only, max GVW 3,500 kg with one light trailer (not exceeding 750 kg). Cannot drive a manual gearbox. Up to 7 passengers.",
        requirements: ["Minimum age of 18 years"],
        icon: "car" as const,
      },
      {
        code: "B3",
        name: "Professional (light vehicle)",
        description:
          "Drive a light vehicle max GVW 3,500 kg with one light trailer (not exceeding 750 kg), manual or automatic. Up to 7 passengers — professional class for light vehicles.",
        requirements: ["Minimum age of 21 years"],
        icon: "car" as const,
      },
    ],
  },
] as const;

/** Flat list for grids that still use `courses` name */
export const courses = licenceGroups.flatMap((g) =>
  g.courses.map((c) => ({
    tag: c.code,
    title: `${c.code} — ${c.name}`,
    body: c.description,
    requirements: c.requirements,
    icon: c.icon,
    category: g.classKey,
  }))
);

/** Optional add-ons (alongside Category A & B licences) */
export const addOns = [
  {
    tag: "Add-On",
    title: "Defensive Driving",
    body: "Hazard perception, space management, and advanced safety technique for licensed drivers who want real confidence in traffic.",
    icon: "shield" as const,
  },
  {
    tag: "Add-On",
    title: "First Aid",
    body: "Practical roadside first-aid skills so you can help yourself and others after a crash or medical emergency.",
    icon: "check" as const,
  },
  {
    tag: "Add-On",
    title: "Intro to Automotive Engineering",
    body: "A beginner-friendly introduction to how your vehicle works — basic systems, simple checks, and what to listen for on the road.",
    icon: "target" as const,
  },
] as const;

export const fleet = [
  { title: "Manual training car (B1 / B3)", slot: "Manual" },
  { title: "Automatic training car (B2)", slot: "Automatic" },
  { title: "Training motorcycle (A1–A3)", slot: "Class A" },
  { title: "Dual-control saloon", slot: "Dual-control" },
] as const;

/** Single training package — confirm with team if rates change */
export const packages = [
  {
    name: "Full Training Package",
    classLabel: "Category A or B · one clear price",
    price: "16,000",
    featured: true,
    courseValue: "Full Training Package — 16,000 KES",
    duration: "At your pace",
    included: [
      "Full course training (Category A or B as enrolled)",
      "PDL (provisional driving licence) booking support",
      "NTSA test booking support",
      "Extra coaching as needed before your test",
      "Highway Code / theory prep",
    ],
    note: "16,000 KES inclusive of PDL booking, test booking, and extra coaching. Government medical / eCitizen / licence card fees may still apply separately.",
  },
] as const;

export const instructors = [
  {
    name: "Hadson Musamusi",
    superpower: "The Highway Merge Coach",
    role: "Category B (B1 / B3) & Defensive Driving",
    years: 15,
    quote:
      "Rush hour on the Kakamega corridor doesn't scare me — and after a few lessons, it won't scare you either.",
    audioSrc: "/audio/instructor-hadson.mp3",
  },
  {
    name: "Judith Fedha",
    superpower: "The Parallel Parking Whisperer",
    role: "Category B2 Automatic & Refresher",
    years: 8,
    quote:
      "I've never had a student fail reversing at the Kakamega test yard — we practice until the car knows the space.",
    audioSrc: "/audio/instructor-judith.mp3",
  },
  {
    name: "Peter Katana",
    superpower: "Mumias Road Expert",
    role: "Category B1 — local roads & hill starts",
    years: 12,
    quote:
      "I know every pothole season on Mumias Road. Light-vehicle drivers need that map in their bones.",
    audioSrc: "/audio/instructor-peter.mp3",
  },
  {
    name: "Sarah N.",
    superpower: "Balance Before Speed",
    role: "Category A (A1–A3) Motorcycles",
    years: 6,
    quote:
      "Hello — I'm Sarah. I teach Category A. We start with balance and road craft, not show-offs.",
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
    q: "Which licence classes do you offer?",
    a: "Only Category A (A1 moped, A2 light motorcycle, A3 motorcycle taxi/couriers/three-wheelers) and Category B (B1 light vehicle, B2 automatic, B3 professional light vehicle). We do not offer Class C trucks or Class D PSV matatu/bus training.",
  },
  {
    q: "What's the minimum age to start?",
    a: "A1 from 16 years; A2 and B1/B2 from 18; A3 and B3 from 21. A3 also needs one year of A2 riding experience.",
  },
  {
    q: "Do I need a medical certificate?",
    a: "Yes — a medical fitness and eyesight check is required before NTSA will issue a provisional or full driving licence. We point you toward the Kakamega medical path.",
  },
  {
    q: "B1 or B2 — which should I choose?",
    a: "B1 covers manual or automatic and keeps more options open later. B2 is automatic-only — simpler for many beginners, but you cannot legally drive a manual on a B2 licence alone.",
  },
  {
    q: "How long does the full course take?",
    a: "Most learners finish in about 2–8 weeks depending on category (A is often faster than B) and how often you take lessons on our Lumakanda roads.",
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
    q: "What does the 16,000 KES package include?",
    a: "One full training package at 16,000 KES, inclusive of PDL booking support, NTSA test booking support, and extra coaching before your test. Government medical, eCitizen, and smart licence card fees are usually paid separately.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash, bank transfer, and M-Pesa. Ask us about instalments when you enrol.",
  },
  {
    q: "Do you offer add-on courses?",
    a: "Yes — Defensive Driving, First Aid, and Intro to Automotive Engineering. Ask when you book for current add-on rates and schedules.",
  },
] as const;

export const courseSelectOptions = [
  { value: "A1 – Moped", label: "A1 — Moped", duration: "Package: 16,000 KES" },
  {
    value: "A2 – Light motorcycle",
    label: "A2 — Light motorcycle",
    duration: "Package: 16,000 KES",
  },
  {
    value: "A3 – Motorcycle taxi / three-wheeler",
    label: "A3 — Motorcycle taxi, couriers & three-wheelers",
    duration: "Package: 16,000 KES",
  },
  {
    value: "B1 – Light vehicle",
    label: "B1 — Light vehicle (manual or auto)",
    duration: "Package: 16,000 KES",
  },
  {
    value: "B2 – Light vehicle automatic",
    label: "B2 — Light vehicle automatic only",
    duration: "Package: 16,000 KES",
  },
  {
    value: "B3 – Professional light vehicle",
    label: "B3 — Professional (light vehicle)",
    duration: "Package: 16,000 KES",
  },
  {
    value: "Add-on – Defensive Driving",
    label: "Add-on — Defensive Driving",
    duration: "Ask for rate",
  },
  {
    value: "Add-on – First Aid",
    label: "Add-on — First Aid",
    duration: "Ask for rate",
  },
  {
    value: "Add-on – Intro to Automotive Engineering",
    label: "Add-on — Intro to Automotive Engineering",
    duration: "Ask for rate",
  },
  {
    value: "Other",
    label: "Other / Not sure yet",
    duration: "We'll advise",
  },
] as const;

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
