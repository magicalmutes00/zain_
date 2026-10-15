// Centralised, factual content model — sourced from ZAIN_Company_Profile.md (+ PDF text for emails).
// Do not add certifications, clients, stats or locations that are not listed here.

export const COMPANY = {
  legalName: "ZAIN Technical & Integrated Services LLC",
  shortName: "ZAIN",
  established: 2021,
  country: "Sultanate of Oman",
  address: "Barka, Sumuhan, South Al Batinah, Sultanate of Oman (near ROP Barka)",
  poBox: "P.O. Box No: 124, Postal Code: 122",
  phones: ["+96892144367", "+96871744429"],
  phoneDisplay: ["+968-92144367", "+968-71744429"],
  emailPrimary: "info@zaintechoman.com",
  emailsExtra: ["zainprojectsoman@gmail.com", "zaintechnicaloman@gmail.com"],
  ethos: "Do it once, do it right!",
  mapsQuery: "ROP Barka, South Al Batinah, Oman",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services", hasDrop: true },
  { to: "/products", label: "Products & Brands" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export type ServiceKind =
  | "fire-detection"
  | "fire-protection"
  | "electrical"
  | "plumbing"
  | "cctv-elv"
  | "lpg-systems";

export interface Service {
  slug: ServiceKind;
  title: string;
  short: string;
  imageLabel: string;
  // Lucide domain icon (Iconly has no fire/electrical/water/CCTV/gas equivalents)
  lucide: "siren" | "shield" | "zap" | "wrench" | "cctv" | "fuel";
  description: string;
  bullets: string[];
  standardsNote?: string;
}

export const SERVICES: Service[] = [
  {
    slug: "fire-detection",
    title: "Fire Detection Systems",
    short: "Addressable & conventional alarms and emergency lighting.",
    imageLabel: "Fire alarm control panel and detection devices",
    lucide: "siren",
    description:
      "ZAIN is a distributor, supplier and installer of fire detection systems. The installation & maintenance department pairs experienced consultants and project engineers with trained installation crews to meet project guidelines and referenced standards.",
    bullets: [
      "Addressable Fire Alarm System",
      "Conventional Fire Alarm",
      "Emergency Light System — Central Battery Monitored & Stand Alone",
      "Design, supply, installation, maintenance, testing & commissioning",
    ],
    standardsNote: "FM · LPCB (Cert No. 931) · UKAS · TÜV · NFPA",
  },
  {
    slug: "fire-protection",
    title: "Fire Protection Systems",
    short: "Extinguishers, suppression and water-based systems.",
    imageLabel: "Sprinkler, hydrant and suppression equipment",
    lucide: "shield",
    description:
      "Field superintendents act as experienced consultants during construction, delivering systems in line with project guidelines — from portable extinguishers to engineered suppression and water-based networks.",
    bullets: [
      "Portable & Automatic Fire Extinguishers (Foam, Powder, CO₂, Water — UL/FM Approved)",
      "Wet Chemical System · Foam Extinguishing System · FM-200 System",
      "Stand Pipe (Wet & Dry) · Fire Hydrant · Water Spray · Deluge",
      "Sprinkler System (Wet, Dry & Pre-action) · Fire Pumps & Controllers (UL/FM Approved)",
    ],
    standardsNote: "UL · FM Approved · LPCB · BSI · NFPA · TÜV",
  },
  {
    slug: "electrical",
    title: "Electrical Services",
    short: "Commercial, industrial and residential installations.",
    imageLabel: "Commercial electrical installation and distribution",
    lucide: "zap",
    description:
      "ZAIN covers most electrical aspects of commercial & industrial installations as well as residential developments — from complete technical installations to alterations, additions, plant upgrades, emergency repairs and plant maintenance.",
    bullets: [
      "Commercial: complete installations, alterations & additions",
      "Industrial: plant upgrades, emergency repairs & plant maintenance",
      "Premises: offices & fit-outs, warehouses, retail/showrooms, residential & commercial buildings, villas, construction supply",
      "Installation & maintenance with quality-inspected materials and equipment",
    ],
  },
  {
    slug: "plumbing",
    title: "Plumbing Services",
    short: "Design, installation & 24-hour maintenance.",
    imageLabel: "Plumbing installation and maintenance works",
    lucide: "wrench",
    description:
      "A dedicated plumbing division with professionally qualified engineers & technicians covers the full spectrum of residential, industrial & commercial plumbing — with real 24-hour service as a stated key focus.",
    bullets: [
      "Real 24-hour service",
      "Geyser repair / replacement · Blocked drains · Burst / leaking pipes · Leaking taps",
      "General plumbing services · Plumbing installation · Bathroom renovations",
      "Planned checks: faucets & shower heads, water heater, cabinets, drains, pipes, toilets",
    ],
  },
  {
    slug: "cctv-elv",
    title: "CCTV & ELV Systems",
    short: "Modern, state-of-the-art surveillance & low-voltage.",
    imageLabel: "CCTV and ELV infrastructure",
    lucide: "cctv",
    description:
      "ZAIN provides modern, latest & state-of-the-art equipment for CCTV systems, with installation & maintenance backed by continuous adaptation to change and a commitment to customer satisfaction.",
    bullets: [
      "CCTV system installation & maintenance",
      "Access system · Call monitoring system · Automatic gate barrier",
      "Structured cabling · Data voice system · Fibre optic cable",
      "IT solutions supporting ELV infrastructure",
    ],
  },
  {
    slug: "lpg-systems",
    title: "LPG Systems",
    short: "Gas connections installation & maintenance (ROP scope).",
    imageLabel: "LPG / cooking-gas connection works",
    lucide: "fuel",
    description:
      "Listed in the company profile as a core service category. The ROP Civil Defence certificate scope held by ZAIN includes installation & maintenance of gas-tank works and their connections (cooking-gas cylinder connections). Enquire with drawings for a compliant scope and quotation.",
    bullets: [
      "Profile-listed category: LPG System",
      "ROP certificate scope: gas-tank works & connections (cooking-gas)",
      "Installation & maintenance under Civil Defence approval",
      "Request a site review for compliance and safety requirements",
    ],
    standardsNote: "ROP Civil Defence approved scope — Certificate 2024/01/30",
  },
];

export const PROCESS = [
  { title: "Supply", text: "Wide-range product selection for detection & protection, big & small — quality-inspected before use." },
  { title: "Design", text: "Needs-based engineering for the most efficient & effective detection and protection solution." },
  { title: "Installation", text: "Efficient, orderly, cooperative crews — staffed to hold deadlines at the highest quality." },
  { title: "Maintenance", text: "Complete renovation, repair & maintenance for all fire protection & detection systems." },
  { title: "Testing & Commissioning", text: "Systematic checking for balanced, reliable protection that operates when needed." },
];

export const SECTORS = [
  { title: "Commercial & Industrial", text: "Buildings, warehouses, retail & showrooms, construction supply and plant environments." },
  { title: "Government & Public", text: "Government offices and other public facilities requiring statutory compliance." },
  { title: "Residential", text: "Residential & commercial buildings, villas and living spaces across Oman." },
  { title: "Developers & Retailers", text: "Tailored fire-safety solutions for duty of care and business protection." },
  { title: "Facilities & Maintenance", text: "Inspection, review, training and efficient maintenance for installed estates." },
  { title: "Fit-out & Construction", text: "Consultants & engineers supporting construction-phase needs and guidelines." },
];

export const STANDARDS = ["UL", "FM Approved", "LPCB 931", "BSI", "NFPA", "TÜV", "UKAS"];

export const CERTIFICATES = [
  {
    no: "2024/01/30",
    title: "Installation & Maintenance of Fire Extinguishers & Connections",
    issuer: "Royal Oman Police — Civil Defence & Ambulance Authority",
    details: [
      ["Valid", "01/10/2024 – 30/12/2026"],
      ["Approved by", "First Lieutenant Mohammed bin Rashid Al Habsi"],
      ["For", "Director of Protection Dept., Engineer Mubeen bin Sulaiman Al Maashari"],
    ],
  },
  {
    no: "20241200400013",
    title: "Installation of Equipment & Tools for Civil Defence (Maintenance of fire-fighting equipment)",
    issuer: "Civil Defence — Public Administration of Civil Defence",
    details: [
      ["Valid", "28/12/2025 – 28/12/2028"],
      ["Covers", "Fire alarm systems · Fire pumps · Sprinklers · Water"],
      ["Engineer", "Aneesh bin Babyan"],
    ],
  },
  {
    no: "20260500400013",
    title: "Installation of Equipment & Tools for Civil Defence (Fire alarm & extinguishing systems)",
    issuer: "Civil Defence — Public Administration of Civil Defence",
    details: [
      ["Valid", "25/05/2026 – 25/05/2027"],
      ["Covers", "Extinguishers · Alarms · Hose cabinets/reels/boxes · Blankets · Call points · Fixed gas systems"],
      ["Engineers", "Aneesh bin Babyan, Deepak bin Manoharan"],
    ],
  },
];

export const PRODUCT_GROUPS = [
  { group: "Fire Pump Controller", items: "Complete fire pump controller systems & accessories" },
  { group: "FM-200 System", items: "TYCO · AL AMAN" },
  { group: "Fire Alarm Control Panel", items: "GENT · SHIELD / NAFFCO · DAHUA / HONEYWELL" },
  { group: "Fire Fighting Equipment & Extinguishers", items: "NAFFCO · BONFIRE · ZAIN · ELITE · FIRE KING · AL AMAN (Foam, Powder, CO₂, Water — UL/FM Approved)" },
  { group: "Fire Pump (UL/FM Approved)", items: "AL AMAN · VOLUTE · METAL PUMPS" },
];

export const QUALITY_POLICY = [
  "Implement high standards of service in fire detection & protection, electrical, plumbing & CCTV systems.",
  "Ensure all materials, machines & equipment for each project are subjected to quality inspection.",
  "Attain high customer satisfaction through quality products & services.",
  "Verify and validate both existing and new programs.",
  "Continue research into improving product & service quality.",
  "Conduct regular internal quality audits & management reviews.",
  "Practise professionalism on site and in the office; communicate quality procedures to all employees.",
];

export const SAFETY_POLICY = [
  "Keep the organisation a safe place — environment, facilities, equipment & substances under safe systems of work.",
  "Hold safety as a line-management responsibility.",
  "Require defensive driving by car drivers and machinery operators.",
  "Promote personal responsibility to prevent harm, and cooperate with statutory duties.",
  "Monitor the effectiveness of safety.",
];

export const ETHOS_POINTS = [
  "Reworks cost money & impact reputation — think efficiency.",
  "Meet & greet clients — be polite; say who we are & what we do.",
  "Keep workplace, tools & vehicles tidy & clean — always leave a site as found, or better.",
  "Help each other out — so help comes when needed.",
  "Be accountable — fix what needs fixing; keep learning & CPD up to date.",
];

/* ---------------------------------------------------------------------------
   Project scopes.

   IMPORTANT — these entries are illustrative placeholders, not a verified
   client list. The company profile does not name clients or project
   references, so no client organisation is named here: facility type,
   discipline and scope are shown instead. Replace `location`, `year` and
   `status` with confirmed details before using this page as a reference list.
--------------------------------------------------------------------------- */
export type ProjectCategory = "Fire Protection" | "Fire Detection" | "Electrical" | "CCTV & ELV";
export type ProjectStatus = "Completed" | "Ongoing";

export interface Project {
  title: string;
  category: ProjectCategory;
  facility: string;
  location: string;
  year: string;
  scope: string;
  status: ProjectStatus;
  image: string;
}

export const PROJECT_STATUSES: ProjectStatus[] = ["Completed", "Ongoing"];

export const PROJECT_CATEGORIES: Array<"All" | ProjectCategory> = [
  "All",
  "Fire Protection",
  "Fire Detection",
  "Electrical",
  "CCTV & ELV",
];

export const PROJECTS: Project[] = [
  {
    title: "Mixed-use commercial complex — fire protection",
    category: "Fire Protection",
    facility: "Mixed-use commercial complex",
    location: "Muscat Governorate",
    year: "2024",
    scope: "Complete fire protection system: design, supply and installation.",
    status: "Completed",
    image: "/images/fire-pump-installation-control-panel.webp",
  },
  {
    title: "Hospital facility — fire detection upgrade",
    category: "Fire Detection",
    facility: "Hospital / healthcare facility",
    location: "Dhofar Governorate",
    year: "2024",
    scope: "Addressable fire alarm system and emergency lighting upgrade.",
    status: "Completed",
    image: "/images/fire-alarm-installation.webp",
  },
  {
    title: "Industrial plant — electrical infrastructure",
    category: "Electrical",
    facility: "Industrial plant",
    location: "Al Batinah North Governorate",
    year: "2023",
    scope: "Power distribution and electrical infrastructure works.",
    status: "Completed",
    image: "/images/pump-control-panel.webp",
  },
  {
    title: "Residential building — CCTV and access control",
    category: "CCTV & ELV",
    facility: "Residential & commercial building",
    location: "Muscat Governorate",
    year: "2024",
    scope: "HD CCTV system with remote monitoring and access control.",
    status: "Completed",
    image: "/images/mid-rise-commercial-residential-building.webp",
  },
  {
    title: "Hotel property — fire safety systems",
    category: "Fire Protection",
    facility: "Hotel / hospitality property",
    location: "Muscat Governorate",
    year: "2023",
    scope: "Sprinkler system, hydrants and fire pumps.",
    status: "Completed",
    image: "/images/fire-pump-room-diesel-electric.webp",
  },
  {
    title: "Logistics warehouse — fire protection",
    category: "Fire Protection",
    facility: "Logistics warehouse",
    location: "Al Wusta Governorate",
    year: "2024",
    scope: "Warehouse sprinkler and suppression systems.",
    status: "Completed",
    image: "/images/industrial-warehouse-factory.webp",
  },
  {
    title: "Institutional facility — fire detection system",
    category: "Fire Detection",
    facility: "Institutional / public building",
    location: "Al Dakhiliyah Governorate",
    year: "2025",
    scope: "Addressable fire detection and alarm system.",
    status: "Ongoing",
    image: "/images/institutional-building.webp",
  },
  {
    title: "Industrial estate — electrical distribution",
    category: "Electrical",
    facility: "Industrial estate",
    location: "Al Dhahirah Governorate",
    year: "2025",
    scope: "Power distribution and substation installation.",
    status: "Ongoing",
    image: "/images/industrial-fire-pump-room.webp",
  },
  {
    title: "Commercial office tower — CCTV and ELV",
    category: "CCTV & ELV",
    facility: "Commercial office building",
    location: "Muscat Governorate",
    year: "2025",
    scope: "CCTV surveillance, structured cabling and access control.",
    status: "Ongoing",
    image: "/images/commercial-office-glass-facade.webp",
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
