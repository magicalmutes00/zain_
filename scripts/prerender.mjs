#!/usr/bin/env node
/*
 * Build-time prerenderer — writes one static HTML file per route into `dist/`.
 *
 * Why: this is a client-rendered SPA. Search engines such as Google execute
 * JavaScript and see the tags that src/layouts/SiteLayout.tsx sets at runtime,
 * but social scrapers (LinkedIn, Slack, X, WhatsApp, Facebook) and non-JS
 * crawlers only read the raw HTML — which, after `vite build`, contains the
 * homepage's <title>/description/OG tags for every URL. This script bakes the
 * correct per-route tags into `dist/<route>/index.html`, so a crawler fetching
 * any URL reads that page's own title, description, canonical and OG tags.
 *
 * It is deliberately dependency-free: the metadata comes straight from
 * src/data/seo.ts (the same table the runtime uses), which Node loads directly
 * by stripping the TypeScript types — so it needs Node >= 22.18 (or >= 23.6).
 * There is no second copy of any title or description to drift out of sync.
 *
 * Usage:
 *   node scripts/prerender.mjs                 # prerender an existing dist/
 *   node scripts/prerender.mjs --write-template # regenerate index.html <head>
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_TEMPLATE = path.join(ROOT, "index.html");
const BUILT_TEMPLATE = path.join(ROOT, "dist", "index.html");
const START = "<!-- seo:start -->";
const END = "<!-- seo:end -->";

let seo;
try {
  seo = await import("../src/data/seo.ts");
} catch (error) {
  console.error("prerender: could not load src/data/seo.ts");
  console.error("Prerendering reads the route metadata directly from TypeScript, which needs");
  console.error("native type stripping — Node >= 22.18 (or >= 23.6). Current: " + process.version);
  console.error("Build the app without prerendering instead: npm run build");
  console.error(error);
  process.exit(1);
}
const { SITE_URL, SITE_NAME, prerenderRoutes } = seo;

const OG_IMAGE = `${SITE_URL}/og-cover.png`;
const THEME_COLOR = "#0c3159";

/** Escape text for use inside HTML text nodes and quoted attributes. */
function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** The block of <head> tags that varies per route (everything between the markers). */
function renderSeoBlock(meta, routePath, indent) {
  const url = `${SITE_URL}${routePath === "/" ? "/" : routePath}`;
  const indexable = meta.indexable !== false;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${indexable ? "index, follow" : "noindex, follow"}" />`,
  ];
  if (indexable) tags.push(`<link rel="canonical" href="${esc(url)}" />`);
  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="theme-color" content="${THEME_COLOR}" />`,
  );
  return tags.map((tag) => `${indent}${tag}`).join("\n");
}

/** Replace everything between the markers with `block`, preserving the rest of the document. */
function inject(html, block) {
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(
      `Could not find the ${START} / ${END} markers in the HTML template.`,
    );
  }
  const endLineStart = html.lastIndexOf("\n", end) + 1;
  const rawIndent = html.slice(endLineStart, end);
  const indent = /^[ \t]*$/.test(rawIndent) ? rawIndent : "";
  return (
    html.slice(0, start + START.length) + "\n" + block + "\n" + indent + html.slice(end)
  );
}

function guardedOutputPath(routePath) {
  if (!/^\/[A-Za-z0-9\-_/]*$/.test(routePath)) {
    throw new Error(`Refusing to write an unexpected route path: ${routePath}`);
  }
  return path.join(BUILT_TEMPLATE, "..", routePath.replace(/^\/+|\/+$/g, ""), "index.html");
}

const writeTemplate = process.argv.includes("--write-template");
const routes = prerenderRoutes().filter((route) => route.meta.indexable !== false);

if (writeTemplate) {
  const html = fs.readFileSync(SOURCE_TEMPLATE, "utf8");
  const home = routes.find((route) => route.path === "/");
  const block = renderSeoBlock(home.meta, "/", "    ");
  fs.writeFileSync(SOURCE_TEMPLATE, inject(html, block), "utf8");
  console.log(`Rewrote the <head> of index.html from src/data/seo.ts (${SITE_NAME}).`);
} else {
  if (!fs.existsSync(BUILT_TEMPLATE)) {
    console.error(
      "dist/index.html not found — run `npm run build` before `npm run prerender`.",
    );
    process.exit(1);
  }
  const html = fs.readFileSync(BUILT_TEMPLATE, "utf8");
  const written = [];
  for (const route of routes) {
    const output = guardedOutputPath(route.path);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, inject(html, renderSeoBlock(route.meta, route.path, "    ")), "utf8");
    written.push(route.path);
  }
  console.log(`Prerendered ${written.length} route(s) into dist/: ${written.join(", ")}`);
}
