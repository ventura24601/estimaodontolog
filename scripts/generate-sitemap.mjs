// Gera public/sitemap.xml a partir dos slugs dos tratamentos. Roda no prebuild.
import { readFile, writeFile } from 'node:fs/promises';

const SITE = process.env.VITE_SITE_URL || 'https://estimaodonto.com.br';
const src = await readFile('src/data/treatments.ts', 'utf8');
const slugs = [...src.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const paths = ['/', '/sobre', '/tratamentos', ...slugs.map((s) => `/tratamentos/${s}`), '/tecnologia', '/contato', '/politica-de-privacidade'];
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod><priority>${p === '/' ? '1.0' : p.startsWith('/tratamentos/') ? '0.8' : '0.6'}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile('public/sitemap.xml', xml);
console.log(`sitemap: ${paths.length} URLs`);
