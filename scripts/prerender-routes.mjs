// Post-build step: copy dist/index.html into dist/<route>/index.html for every
// URL in public/sitemap.xml, so static hosts without SPA fallback rules
// (e.g. Render with no rewrite configured) serve real files (HTTP 200)
// for all client-side routes instead of 404s.
// Asset references in index.html are root-absolute (/assets/...), so the
// copies work unchanged from any directory depth.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const shell = join(dist, "index.html");

if (!existsSync(shell)) {
  console.error("[prerender-routes] dist/index.html not found — run `vite build` first.");
  process.exit(1);
}

const sitemap = readFileSync(join(root, "public", "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>(https:\/\/zaintechoman\.com(\/[^<]*)?)<\/loc>/g)].map(
  (m) => m[2] || "/"
);

const routes = [...new Set(locs)].filter((p) => p !== "/");
let count = 0;

for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(shell, join(dir, "index.html"));
  count += 1;
}

writeFileSync(join(dist, "routes.txt"), routes.join("\n") + "\n");
console.log(`[prerender-routes] wrote ${count} route shells: ${routes.join(", ")}`);
