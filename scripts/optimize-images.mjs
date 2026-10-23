// Gera AVIF + WebP responsivos a partir de src/assets/src-img para public/img.
// Uso: npm run images  (rode novamente ao trocar/adicionar fotos)
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'src/assets/src-img';
const OUT = 'public/img';
const WIDTHS = [480, 960, 1600, 2400];

await mkdir(OUT, { recursive: true });
const manifest = {};
for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = path.parse(file).name;
  const img = sharp(path.join(SRC, file));
  const { width } = await img.metadata();
  const widths = WIDTHS.filter((w) => w <= width);
  if (!widths.includes(width) && width < WIDTHS.at(-1)) widths.push(width);
  for (const w of widths) {
    const r = sharp(path.join(SRC, file)).resize({ width: w }).modulate({ saturation: 0.92 });
    await r.clone().avif({ quality: 52 }).toFile(`${OUT}/${name}-${w}.avif`);
    await r.clone().webp({ quality: 74 }).toFile(`${OUT}/${name}-${w}.webp`);
  }
  manifest[name] = { widths, ratio: +(width / (await img.metadata()).height).toFixed(4) };
  console.log(name, widths.join(','));
}
await writeFile('src/data/images.json', JSON.stringify(manifest, null, 2) + '\n');
