/* One-shot: convert public/screens/*.png and public/images/*.png|jpg to .webp */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const dirs = [
  { dir: path.join(root, 'public/screens'), quality: 78 },
  { dir: path.join(root, 'public/images'),  quality: 88 },
];

(async () => {
  for (const { dir, quality } of dirs) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const lower = f.toLowerCase();
      if (!/\.(png|jpe?g)$/.test(lower)) continue;
      const src = path.join(dir, f);
      const out = path.join(dir, f.replace(/\.(png|jpe?g)$/i, '.webp'));
      const before = fs.statSync(src).size;
      await sharp(src).webp({ quality, effort: 6 }).toFile(out);
      const after = fs.statSync(out).size;
      console.log(`${path.relative(root, src)}  ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB  (${Math.round(100 - 100*after/before)}% smaller)`);
    }
  }
})().catch(e => { console.error(e); process.exit(1); });
