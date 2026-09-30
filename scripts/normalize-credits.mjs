/**
 * Rebuilds public/images/CREDITS.md into a single, current table.
 * The file accumulates one section per fetch round; the last row for a file is
 * the one that describes the bytes currently on disk. Manual overrides cover
 * images replaced outside the pipeline (candidate reviews).
 *
 * Usage: node scripts/normalize-credits.mjs
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const FILE = path.join(ROOT, 'public', 'images', 'CREDITS.md')

const OVERRIDES = {
  'images/shop-hero.jpg': ['Bokeh Lights', 'StockSnap contributor', 'stocksnap', 'cc0 1.0'],
  'images/category-tech.jpg': ['Notebook Notepad', 'StockSnap contributor', 'stocksnap', 'cc0 1.0'],
  'images/category-gifts.jpg': ['Black Box - Spotlight On', 'Welcome to Switzerland backstage!', 'flickr', 'by 2.0'],
  'images/social-4.jpg': ['Night Sparklers', 'StockSnap contributor', 'stocksnap', 'cc0 1.0'],
}

const raw = await readFile(FILE, 'utf8')
const rows = new Map()
for (const line of raw.split('\n')) {
  const m = line.match(/^\|\s*(images\/[^|]+?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|$/)
  if (!m) continue
  rows.set(m[1], [m[2], m[3], m[4], m[5]])
}
for (const [file, value] of Object.entries(OVERRIDES)) rows.set(file, value)

const body = [...rows.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([file, [title, creator, source, licence]]) => `| ${file} | ${title} | ${creator} | ${source} | ${licence} |`)
  .join('\n')

const out = `# Image credits

Photography sourced through the Openverse API (commercial + modification licences).

| File | Title | Creator | Source | Licence |
| --- | --- | --- | --- | --- |
${body}
`
await writeFile(FILE, out)
console.log(`credits normalised — ${rows.size} files`)
