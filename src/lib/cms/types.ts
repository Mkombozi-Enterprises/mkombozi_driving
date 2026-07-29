/** Full CMS document — everything editable without redeploying code */

export type IconName =
  | "moto"
  | "car"
  | "truck"
  | "bus"
  | "shield"
  | "clock"
  | "check"
  | "target";

export type YardIcon = "car" | "moto" | "rain";

export type SiteInfo = {
  name: string;
  phone: string;
  phoneTel: string;
  whatsapp: string;
  email: string;
  hours: string;
  hoursLong: string;
  address: string;
  addressShort: string;
  googleBusinessUrl: string;
  googleReviewHint: string;
  mapEmbedUrl: string;
  mapLat: number;
  mapLng: number;
  areaServed: string;
  priceRange: string;
  founderAudioSrc: string;
  founderAudioTranscript: string;
  heroSub: string;
  aboutLead: string;
  aboutQuote: string;
  originTitle: string;
  originParagraphs: string[];
  founders: {
    name: string;
    role: string;
    image: string;
    alt: string;
  }[];
  founderAttribution: string;
};

export type YardNote = {
  body: string;
  signOff: string;
  updatedLabel: string;
};

export type YardToday = {
  title: string;
  lines: { icon: YardIcon; text: string }[];
  nextIntake: string;
  practiceRoute: string;
};

export type JourneyPost = { id: string; label: string; short: string };
export type NavLink = { href: string; label: string };
export type RouteStop = { title: string; body: string; mobile: string };

export type LicenceCourse = {
  code: string;
  name: string;
  description: string;
  requirements: string[];
  icon: IconName;
};

export type LicenceGroup = {
  classKey: string;
  title: string;
  subtitle: string;
  courses: LicenceCourse[];
};

export type AddOn = {
  tag: string;
  title: string;
  body: string;
  icon: IconName;
};

export type FleetItem = { title: string; slot: string };

export type Package = {
  name: string;
  classLabel: string;
  price: string;
  featured: boolean;
  courseValue: string;
  duration: string;
  included: string[];
  note: string;
};

export type Instructor = {
  id: string;
  name: string;
  superpower: string;
  role: string;
  years: number;
  quote: string;
  audioSrc: string;
  photo?: string;
};

export type FaqItem = {
  id: string;
  q: string;
  a: string;
};

export type WallPass = {
  id: string;
  name: string;
  classLabel: string;
  datePassed: string;
  advice: string;
};

export type CourseSelectOption = {
  value: string;
  label: string;
  duration: string;
};

export type PassesTicker = {
  thisWeekCount: number;
  emptyCta: string;
};

/** Downloadable or viewable resource (PDF, image, or link) */
export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  /** pdf | image | link */
  kind: "pdf" | "image" | "link";
  /** Public URL or path e.g. /documents/file.pdf */
  url: string;
  /** Optional category label for filtering */
  category: string;
  /** ISO date string */
  addedAt: string;
};

export type SiteContent = {
  version: number;
  updatedAt: string;
  site: SiteInfo;
  founderQuote: string;
  yardNote: YardNote;
  yardToday: YardToday;
  passesTicker: PassesTicker;
  journeyPosts: JourneyPost[];
  navLinks: NavLink[];
  routeStops: RouteStop[];
  licenceGroups: LicenceGroup[];
  addOns: AddOn[];
  fleet: FleetItem[];
  packages: Package[];
  instructors: Instructor[];
  faqs: FaqItem[];
  wallOfPasses: WallPass[];
  resources: ResourceItem[];
  courseSelectOptions: CourseSelectOption[];
};

export type CmsSectionKey =
  | "site"
  | "founderQuote"
  | "yardNote"
  | "yardToday"
  | "passesTicker"
  | "journeyPosts"
  | "navLinks"
  | "routeStops"
  | "licenceGroups"
  | "addOns"
  | "fleet"
  | "packages"
  | "instructors"
  | "faqs"
  | "wallOfPasses"
  | "resources"
  | "courseSelectOptions";
