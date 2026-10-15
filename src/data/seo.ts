// Shared SEO / route metadata.
//
// This is the single source of truth for every <head> value: the runtime
// (src/layouts/SiteLayout.tsx) reads it to update tags on client-side
// navigation, and the build-time prerenderer (scripts/prerender.mjs) reads
// the very same table to bake static <title>/description/canonical/OG tags
// into dist/<route>/index.html for crawlers that do not run JavaScript.
//
// It deliberately imports nothing from React or the DOM so Node can load it
// directly (Node >= 22.18 strips the TypeScript types on the fly).
import { SERVICES } from "./content.ts";

export const SITE_URL = "https://www.zaintechoman.com";
export const SITE_NAME = "ZAIN Technical & Integrated Services LLC";

export interface PageMeta {
  title: string;
  description: string;
  /** Soft-404s must not be indexed and must not advertise a canonical URL. */
  indexable?: boolean;
}

export const DEFAULT_DESCRIPTION =
  "ZAIN Technical & Integrated Services LLC (est. 2021, Oman) designs, supplies, installs, maintains, tests and commissions fire detection & fire protection, electrical, plumbing, CCTV and LPG systems to UL, FM, LPCB, NFPA, BSI and TÜV referenced standards. ROP Civil Defence approved.";

export const PAGES: Record<string, PageMeta> = {
  "/": {
    title: `${SITE_NAME} — Fire Detection, Fire Protection & MEP Services in Oman`,
    description: DEFAULT_DESCRIPTION,
  },
  "/about": {
    title: `About Us — ${SITE_NAME}, Oman`,
    description:
      "ZAIN Technical & Integrated Services LLC is an Oman-based engineering, contracting and service provider established in 2021, ROP Civil Defence approved and working to UL, FM, LPCB, NFPA, BSI and TÜV referenced standards.",
  },
  "/services": {
    title: `Services — Fire, Electrical, Plumbing, CCTV & LPG | ZAIN Oman`,
    description:
      "Six technical divisions under one accountable contract: fire detection, fire protection, electrical works, plumbing, CCTV & ELV and LPG systems — designed, installed, maintained, tested and commissioned by ZAIN in Oman.",
  },
  "/products": {
    title: `Products & Brand Partners — ${SITE_NAME}`,
    description:
      "The fire, electrical, plumbing, CCTV and LPG products and referenced brand standards ZAIN supplies and installs across commercial, industrial, government and residential projects in Oman.",
  },
  "/projects": {
    title: `Projects — Fire, Electrical, CCTV & LPG Scopes | ${SITE_NAME}`,
    description:
      "Representative fire protection, fire detection, electrical and CCTV & ELV project scopes ZAIN delivers for commercial, industrial, government and residential facilities across Oman.",
  },
  "/contact": {
    title: `Contact & Request a Quote — ${SITE_NAME}, Barka Oman`,
    description:
      "Contact ZAIN Technical & Integrated Services LLC in Barka, South Al Batinah, Oman. Request a quote for fire detection, fire protection, electrical, plumbing, CCTV or LPG system works.",
  },
};

export const NOT_FOUND: PageMeta = {
  title: `Page not found — ${SITE_NAME}`,
  description: "The page you requested could not be found. Return to the ZAIN Technical & Integrated Services LLC homepage, services or contact page.",
  indexable: false,
};

export const SITE_SUFFIX = "ZAIN Technical & Integrated Services LLC, Oman";

export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

/** Resolve the metadata for a pathname, including dynamic service detail routes. */
export function metaFor(pathname: string): PageMeta {
  const direct = PAGES[pathname];
  if (direct) return direct;

  const match = /^\/services\/([\w-]+)\/?$/.exec(pathname);
  if (match) {
    const service = SERVICES.find((s) => s.slug === match[1]);
    if (service) {
      return {
        title: `${service.title} — ${SITE_SUFFIX}`,
        description: truncate(service.description),
      };
    }
  }
  return NOT_FOUND;
}

/** Every indexable route with its resolved metadata (used by the prerenderer). */
export function prerenderRoutes(): { path: string; meta: PageMeta }[] {
  const staticPaths = Object.keys(PAGES);
  const servicePaths = SERVICES.map((s) => `/services/${s.slug}`);
  return [...staticPaths, ...servicePaths].map((path) => ({ path, meta: metaFor(path) }));
}
