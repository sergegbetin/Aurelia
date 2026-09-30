/**
 * AURELIA — targeted candidate fetch for the shop banner.
 * Downloads a handful of wide, non-Christmas celebration photos into
 * .qa/candidates and writes a contact sheet for visual review.
 *
 * Usage: node scripts/fetch-candidates.mjs <slot> <query1> <query2> ...
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const API = 'https://api.openverse.org/v1/images/'
const DELAY_MS = 3400

const [slot, ...queries] = process.argv.slice(2)
if (!slot || queries.length === 0) {
  console.error('usage: node scripts/fetch-candidates.mjs <slot> <query...>')
  process.exit(1)
}

const OUT_DIR = path.join(ROOT, 'public', 'qa-candidates', slot)
await mkdir(OUT_DIR, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const clean = (s) => (s || '').toLowerCase()

const results = []
for (const q of queries) {
  const params = new URLSearchParams({
    q,
    page_size: '20',
    category: 'photograph',
    mature: 'false',
    license_type: 'commercial,modification',
  })
  try {
    const res = await fetch(`${API}?${params}`, { headers: { 'User-Agent': 'aurelia-image-pipeline/2.0' } })
    if (!res.ok) throw new Error(`${res.status}`)
    const json = await res.json()
    results.push(...(json.results || []).map((r) => ({ ...r, _q: q })))
    console.log(`q="${q}" -> ${(json.results || []).length}`)
  } catch (err) {
    console.error(`q="${q}" failed: ${err.message}`)
  }
  await sleep(DELAY_MS)
}

const seen = new Set()
const picked = []
for (const r of results) {
  if (!r?.url || !/\.(jpe?g|png)(\?|$)/i.test(r.url)) continue
  if ((r.width || 0) < 900 || (r.height || 0) < 500) continue
  const w = r.width || 1
  const h = r.height || 1
  if (w / h < 1.3) continue // banner needs a wide frame
  const title = clean(r.title)
  if (/\b(christmas|xmas|santa|tree|winter|snow|halloween|easter|valentine)\b/.test(title)) continue
  const key = `${r.source}:${title}`
  if (seen.has(key)) continue
  seen.add(key)
  picked.push(r)
  if (picked.length >= 12) break
}

const saved = []
let index = 0
for (const r of picked) {
  index += 1
  try {
    const res = await fetch(r.url, { headers: { 'User-Agent': 'Mozilla/5.0 (AURELIA demo)' } })
    if (!res.ok) continue
    const buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.length < 20000) continue
    const file = path.join(OUT_DIR, `${String(index).padStart(2, '0')}.jpg`)
    await writeFile(file, buffer)
    saved.push({ file: `${String(index).padStart(2, '0')}.jpg`, title: r.title, url: r.url, source: r.source, license: `${r.license} ${r.license_version || ''}`.trim(), credit: r.foreign_landing_url, w: r.width, h: r.height })
    console.log(`saved ${index} ${r.title} (${r.width}x${r.height})`)
  } catch (err) {
    console.error(`download failed: ${err.message}`)
  }
  await sleep(400)
}

await writeFile(path.join(OUT_DIR, 'meta.json'), JSON.stringify(saved, null, 2))

const sheet = `<!doctype html><meta charset="utf-8"><title>${slot} candidates</title>
<style>body{margin:0;background:#111;font:12px system-ui;color:#eee}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:6px}
figure{margin:0;background:#1b1b1b}img{width:100%;height:220px;object-fit:cover;display:block}figcaption{padding:5px;font-size:11px;line-height:1.35}</style>
<div class="g">${saved
  .map(
    (s) =>
      `<figure><img src="${s.file}"><figcaption><b>${s.file}</b> — ${s.title}<br>${s.source} · ${s.license} · ${s.w}×${s.h}</figcaption></figure>`,
  )
  .join('')}</div>`
await writeFile(path.join(OUT_DIR, 'sheet.html'), sheet)
console.log(`\n${saved.length} candidates in ${OUT_DIR}`)
