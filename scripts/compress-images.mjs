import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const PUBLIC_IMG = "D:\\zain website\\zain-react\\public\\images";

// Widths / quality per file pattern. Logos get higher quality; photos get aggressive compression.
const PROFILES = {
  logo:  { match: /^logo/i,                              width: 1024, webpQ: 80, pngQ: 90 },
  icon:  { match: /^icon-/i,                             width: 512,  webpQ: 90, pngQ: 95 },
  cert:  { match: /(licence|fffa|lpg)/i,                 width: 1200, webpQ: 80, pngQ: 90 },
  photo: { match: null,                                  width: 1600, webpQ: 72, pngQ: 85 },
};

const fmtBytes = (n) =>
  n < 1024 ? `${n} B`
  : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB`
  : `${(n / 1024 / 1024).toFixed(2)} MB`;

const profileFor = (name) => {
  for (const [key, p] of Object.entries(PROFILES)) {
    if (p.match && p.match.test(name)) return { ...p, key };
  }
  return { ...PROFILES.photo, key: "photo" };
};

const entries = await fs.readdir(PUBLIC_IMG);
const targets = entries.filter((f) => /\.(jpe?g|png)$/i.test(f));

// Skip already-minified files and known skip list
const SKIP = new Set([
  "logo.min.png", "logo-z.min.png", "logo-monochrome.min.png",
  "logo-main.min.png", "logo-clean.min.png",
]);
const files = targets.filter((f) => !SKIP.has(f));

const results = [];
for (const file of files) {
  const src = path.join(PUBLIC_IMG, file);
  const base = file.replace(/\.(jpe?g|png)$/i, "");
  const webpOut = path.join(PUBLIC_IMG, `${base}.webp`);
  const pngOut  = path.join(PUBLIC_IMG, `${base}.min.png`);

  const prof = profileFor(file);
  try {
    const orig = (await fs.stat(src)).size;
    const img = sharp(src).resize({ width: prof.width, withoutEnlargement: true });

    const webpBuf = await img.clone().webp({ quality: prof.webpQ, effort: 6 }).toBuffer();
    await fs.writeFile(webpOut, webpBuf);

    const pngBuf = await img.clone()
      .png({ quality: prof.pngQ, compressionLevel: 9, effort: 10, palette: true })
      .toBuffer();
    await fs.writeFile(pngOut, pngBuf);

    const webpSize = (await fs.stat(webpOut)).size;
    const pngSize  = (await fs.stat(pngOut)).size;

    const pct = (n) => `${((1 - n / orig) * 100).toFixed(0)}%`.padStart(4);
    console.log(
      `[${prof.key.padEnd(5)}] ${file.slice(0, 50).padEnd(50)}  ` +
      `${fmtBytes(orig).padStart(9)}  ->  WebP ${fmtBytes(webpSize).padStart(9)} ${pct(webpSize)}  |  ` +
      `PNG-min ${fmtBytes(pngSize).padStart(9)} ${pct(pngSize)}`
    );
    results.push({ src, webpOut, pngOut, orig, webpSize, pngSize });
  } catch (e) {
    console.error(`FAILED ${file}: ${e.message}`);
  }
}

console.log("\n=== Total ===");
const sum = (k) => results.reduce((a, r) => a + r[k], 0);
const origT = sum("orig"), webpT = sum("webpSize"), pngT = sum("pngSize");
console.log(`Original : ${fmtBytes(origT)}`);
console.log(`WebP     : ${fmtBytes(webpT)}  (saved ${((1 - webpT / origT) * 100).toFixed(0)}%)`);
console.log(`PNG-min  : ${fmtBytes(pngT)}  (saved ${((1 - pngT / origT) * 100).toFixed(0)}%)`);
