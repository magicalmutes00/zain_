import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const PUBLIC_IMG = "D:\\zain website\\zain-react\\public\\images";

// only target heavy files (icons are already tiny)
const targets = [
  { file: "logo-main.png",       width: 1024, webpQ: 78, pngQ: 88, label: "logo-main (4.8MB)"   },
  { file: "logo.png",            width: 1024, webpQ: 80, pngQ: 90, label: "logo (full colour)"  },
  { file: "logo-monochrome.png", width: 1024, webpQ: 80, pngQ: 90, label: "logo-monochrome"     },
  { file: "logo-clean.png",      width: 1024, webpQ: 80, pngQ: 90, label: "logo-clean"          },
  { file: "logo-z.png",          width: 256,  webpQ: 90, pngQ: 95, label: "logo-z (small)"      },
];

const fmtBytes = (n) =>
  n < 1024 ? `${n} B`
  : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB`
  : `${(n / 1024 / 1024).toFixed(2)} MB`;

const results = [];
for (const t of targets) {
  const src = path.join(PUBLIC_IMG, t.file);
  const webpOut = src.replace(/\.png$/i, ".webp");
  const pngOut  = src.replace(/\.png$/i, ".min.png");

  try {
    const orig = (await fs.stat(src)).size;
    const img = sharp(src).resize({ width: t.width, withoutEnlargement: true });

    const webpBuf = await img
      .clone()
      .webp({ quality: t.webpQ, effort: 6 })
      .toBuffer();
    await fs.writeFile(webpOut, webpBuf);

    const pngBuf = await img
      .clone()
      .png({ quality: t.pngQ, compressionLevel: 9, effort: 10, palette: true })
      .toBuffer();
    await fs.writeFile(pngOut, pngBuf);

    const webpSize = (await fs.stat(webpOut)).size;
    const pngSize  = (await fs.stat(pngOut)).size;

    console.log(
      `${t.label.padEnd(22)}  ${fmtBytes(orig).padStart(9)}  ->  ` +
      `WebP ${fmtBytes(webpSize).padStart(9)} (${((1 - webpSize / orig) * 100).toFixed(0)}% smaller)  |  ` +
      `PNG ${fmtBytes(pngSize).padStart(9)} (${((1 - pngSize / orig) * 100).toFixed(0)}% smaller)`
    );

    results.push({ src, webpOut, pngOut, orig, webpSize, pngSize });
  } catch (e) {
    console.error(`FAILED ${t.file}: ${e.message}`);
  }
}

console.log("\n=== Total ===");
const origT = results.reduce((a, r) => a + r.orig, 0);
const webpT = results.reduce((a, r) => a + r.webpSize, 0);
const pngT  = results.reduce((a, r) => a + r.pngSize, 0);
console.log(`Original: ${fmtBytes(origT)}`);
console.log(`WebP    : ${fmtBytes(webpT)}  (saved ${((1 - webpT / origT) * 100).toFixed(0)}%)`);
console.log(`PNG-min : ${fmtBytes(pngT)}  (saved ${((1 - pngT / origT) * 100).toFixed(0)}%)`);
