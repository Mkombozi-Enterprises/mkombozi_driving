/** Shared site content — single source for the marketing page */

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
};

/** Journey Spine + in-page anchors — structure encodes the learner journey */
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
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export const routeStops = [
  {
    title: "Register & Medical",
    body: "NTSA-required medical fitness and eyesight check.",
    mobile:
      "Sign up and complete your NTSA-required medical fitness and eyesight check.",
  },
  {
    title: "Provisional Licence",
    body: "We help you apply via eCitizen's TIMS portal.",
    mobile:
      "We help you apply via eCitizen's TIMS portal for your learner's licence.",
  },
  {
    title: "Highway Code & Theory",
    body: "Structured, easy-to-follow theory classes.",
    mobile: "Learn the rules of the road in structured, easy-to-follow classes.",
  },
  {
    title: "Behind the Wheel",
    body: "Hands-on lessons in dual-control vehicles.",
    mobile:
      "Hands-on practical lessons in our dual-control vehicles, at your pace.",
  },
  {
    title: "NTSA Test Booking",
    body: "We schedule your theory & practical tests.",
    mobile:
      "We schedule and prepare you for your theory and practical tests.",
  },
  {
    title: "You're Licensed",
    body: "Collect your smart licence and hit the road.",
    mobile:
      "Collect your smart driving licence and hit the road with confidence.",
  },
] as const;

export const courses = [
  {
    tag: "Class A",
    title: "Motorcycles & Boda Bodas",
    body: "Balance, control, and defensive road-craft for two- and three-wheelers, from mopeds to courier bikes.",
    icon: "moto" as const,
  },
  {
    tag: "Class B",
    title: "Personal & Private Cars",
    body: "Manual or automatic saloon car, SUV, and pick-up training — our most popular course and the right start for most learners.",
    icon: "car" as const,
  },
  {
    tag: "Class C",
    title: "Trucks & Commercial Vehicles",
    body: "Light to heavy goods vehicle training for drivers building a career in transport and logistics.",
    icon: "truck" as const,
  },
  {
    tag: "Class D",
    title: "PSV — Matatu & Bus",
    body: "Commercial passenger-vehicle training plus PSV badge preparation for aspiring public transport drivers.",
    icon: "bus" as const,
  },
  {
    tag: "Add-On",
    title: "Defensive Driving",
    body: "Hazard perception and advanced safety technique for licensed drivers who want real confidence in traffic.",
    icon: "shield" as const,
  },
  {
    tag: "Add-On",
    title: "Refresher Lessons",
    body: "Back-behind-the-wheel coaching for licence holders who haven't driven in a while.",
    icon: "clock" as const,
  },
  {
    tag: "Prep",
    title: "NTSA Theory & Test Prep",
    body: "Highway Code coaching and mock tests, so you walk into your NTSA test ready.",
    icon: "check" as const,
  },
  {
    tag: "Fast-Track",
    title: "Intensive Crash Course",
    body: "A condensed, fast-track programme for learners working against a deadline.",
    icon: "target" as const,
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
    price: "15,000",
    featured: false,
    courseValue: "Class B – Manual (Basic)",
    features: [
      "20 practical lessons",
      "Highway Code theory classes",
      "NTSA test-booking support",
    ],
  },
  {
    name: "Standard",
    classLabel: "Class B — Automatic",
    price: "20,000",
    featured: true,
    courseValue: "Class B – Automatic (Standard)",
    features: [
      "25 practical lessons",
      "Theory classes + 1 mock test",
      "Automatic transmission focus",
      "NTSA test-booking support",
    ],
  },
  {
    name: "Premium",
    classLabel: "Complete Package",
    price: "35,000",
    featured: false,
    courseValue: "Complete Package (Premium)",
    features: [
      "Manual + automatic training",
      "Defensive driving add-on",
      "Priority scheduling",
      "1 free refresher lesson",
    ],
  },
] as const;

export const instructors = [
  {
    name: "Hadson Musamusi",
    role: "Senior Instructor — Class B & Defensive Driving",
    years: "15 years experience",
    bio: "Calm under pressure, even in rush-hour traffic.",
    initials: "HM",
  },
  {
    name: "Judith Fedha",
    role: "Instructor — Class B Automatic & Refresher",
    years: "8 years experience",
    bio: "Specialises in nervous first-time learners.",
    initials: "JF",
  },
  {
    name: "Peter Katana",
    role: "PSV & Class D Specialist",
    years: "12 years experience",
    bio: "Trained over 200 matatu and bus drivers.",
    initials: "PK",
  },
  {
    name: "Sarah N.",
    role: "Motorcycle Instructor — Class A",
    years: "6 years experience",
    bio: "Road-craft and balance, from zero to confident.",
    initials: "SN",
  },
] as const;

export const reviews = [
  {
    quote:
      "Mkombozi gave me the confidence to handle traffic, roundabouts, and everything in between. Passed on my first attempt.",
    name: "Ronald Shikuku",
    loc: "Kakamega",
  },
  {
    quote:
      "My instructor worked around my job — early mornings and Saturdays. I never once felt rushed.",
    name: "David Lubuste",
    loc: "Lumakanda",
  },
  {
    quote:
      "The PSV course prepared me properly for my badge test. I recommend Mkombozi to every aspiring driver.",
    name: "Michael Omondi",
    loc: "Kitale",
  },
] as const;

export const faqs = [
  {
    q: "What's the minimum age to start lessons?",
    a: "You can start on a learner's/provisional licence from age 16 (with parental consent), Class B car lessons from 18, and Class C and above typically from 24.",
  },
  {
    q: "Do I need a medical certificate?",
    a: "Yes — a medical fitness and eyesight check is required before NTSA will issue a provisional or full driving licence.",
  },
  {
    q: "Manual or automatic — which should I choose?",
    a: "Both are available. Automatic is often simpler for beginners, while manual (B2) gives you the flexibility to later drive either transmission.",
  },
  {
    q: "How long does the full course take?",
    a: "Most learners complete their course in 4–8 weeks, depending on the package chosen and how often they take lessons.",
  },
  {
    q: "Do you help book my NTSA test?",
    a: "Yes — we handle scheduling for both your theory and practical tests through the TIMS/eCitizen portal.",
  },
  {
    q: "Do you offer weekend or evening lessons?",
    a: "Yes, including early mornings, evenings, and weekends, so lessons fit around work or school.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash, bank transfer, and M-Pesa, with instalment plans available on our Standard and Premium packages.",
  },
] as const;

export const courseSelectOptions = [
  "Class A – Motorcycle",
  "Class B – Manual (Basic)",
  "Class B – Automatic (Standard)",
  "Class C – Truck",
  "Class D – PSV",
  "Complete Package (Premium)",
  "Other",
] as const;
