/**
 * Maps CMS editor sections → public page anchors + plain-language “where it shows”.
 * Used by the admin UI so managers always know the impact of an edit.
 */
export type CmsMapSection = {
  id: string;
  label: string;
  /** Public page fragment (#about, #courses, …) */
  anchor: string;
  /** One-line map pin for managers */
  appearsOn: string;
  /** Longer help */
  help: string;
  /** Order on the live homepage (for the road map) */
  order: number;
};

export const CMS_MAP: CmsMapSection[] = [
  {
    id: "site",
    label: "Contact & map",
    anchor: "#contact",
    appearsOn: "Header utility bar · Contact card · Footer",
    help: "Phone, WhatsApp, email, hours, address, and map embed used site-wide.",
    order: 12,
  },
  {
    id: "copy",
    label: "Hero & about story",
    anchor: "#home",
    appearsOn: "Top of homepage (hero) · About · Origin band",
    help: "Main headline support text, about paragraph, origin story, and wall ticker.",
    order: 1,
  },
  {
    id: "founders",
    label: "Founders & yard board",
    anchor: "#about",
    appearsOn: "“A word from our founders” · Yard note · Today at the yard",
    help: "Founder quote, portraits, audio paths, handwritten yard note, and schedule board.",
    order: 2,
  },
  {
    id: "nav",
    label: "Navigation & journey spine",
    anchor: "#home",
    appearsOn: "Top menu · Left journey spine · Mobile step strip",
    help: "Header links and the kilometre posts that guide scroll progress.",
    order: 0,
  },
  {
    id: "route",
    label: "Licence route stops",
    anchor: "#route",
    appearsOn: "“The Route” section (six local stops)",
    help: "Place-based route landmarks (no medical stop, no step numbers). eCitizen → yard → roads → NTSA → open road.",
    order: 4,
  },
  {
    id: "courses",
    label: "Categories A & B",
    anchor: "#courses",
    appearsOn: "Courses section — licence cards",
    help: "A1–A3 and B1–B3 codes, descriptions, and requirements.",
    order: 3,
  },
  {
    id: "addons",
    label: "Add-on courses",
    anchor: "#courses",
    appearsOn: "Courses section — Add-ons row",
    help: "Defensive driving, first aid, automotive intro, and any extras you add.",
    order: 3,
  },
  {
    id: "packages",
    label: "Pricing package",
    anchor: "#pricing",
    appearsOn: "Pricing section (single package card)",
    help: "KES amount, inclusions list, and package note shown to learners.",
    order: 5,
  },
  {
    id: "resources",
    label: "Resource centre",
    anchor: "#resources",
    appearsOn: "Resource centre section",
    help: "PDFs, images, and links learners can open or download.",
    order: 6,
  },
  {
    id: "instructors",
    label: "Team / instructors",
    anchor: "#instructors",
    appearsOn: "Meet the team (hidden when empty)",
    help: "School manager stays listed. Add real instructors when ready — placeholders should not be published.",
    order: 7,
  },
  {
    id: "wall",
    label: "Wall of passes",
    anchor: "#wall",
    appearsOn: "Wall of passes section",
    help: "Graduate names, class, date, and one line of advice.",
    order: 8,
  },
  {
    id: "faqs",
    label: "FAQ",
    anchor: "#faq",
    appearsOn: "FAQ accordion",
    help: "Questions and answers learners see before enrolling.",
    order: 9,
  },
  {
    id: "fleet",
    label: "Fleet cards",
    anchor: "#fleet",
    appearsOn: "Fleet section",
    help: "Training vehicle labels shown on the yard fleet grid.",
    order: 10,
  },
  {
    id: "form",
    label: "Enquiry form options",
    anchor: "#contact",
    appearsOn: "Contact form — course dropdown",
    help: "Choices in the enrolment form course list.",
    order: 11,
  },
  {
    id: "audit",
    label: "Audit log",
    anchor: "",
    appearsOn: "Admin only — not on the public site",
    help: "History of every publish and upload. Read-only for managers.",
    order: 99,
  },
];

export function getMapSection(id: string): CmsMapSection | undefined {
  return CMS_MAP.find((s) => s.id === id);
}
