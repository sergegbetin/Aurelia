/**
 * AURELIA image pipeline — round 2.
 * Same Openverse source, but each slot now has an ordered list of queries and
 * a stricter relevance rule (a keyword must appear in the title), plus a
 * per-slot source preference so we stay with clean studio/stock photography.
 *
 * Usage: node scripts/fetch-images.mjs [--dry] [--only=<substring>]
 */
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_ROOT = path.join(ROOT, 'public', 'images')
const API = 'https://api.openverse.org/v1/images/'
const DELAY_MS = 3300

const argv = process.argv.slice(2)
const DRY = argv.includes('--dry')
const ONLY = argv.find((a) => a.startsWith('--only='))?.split('=')[1]

const p = (slug, n) =>
  Array.from({ length: n }, (_, i) => `images/products/${slug}-${i + 1}.jpg`)

/** @type {{out:string[], queries:string[], keywords:string[], sources?:string[], aspect?:'tall'|'wide'}[]} */
const manifest = [
  // ── heroes, categories, gift guide, social ─────────────────────────────
  { out: ['images/hero-main.jpg'], queries: ['gift box ribbon gold', 'champagne glasses celebration', 'new year party'], keywords: ['gift', 'box', 'champagne', 'celebration'], sources: ['stocksnap', 'flickr'], aspect: 'tall' },
  { out: ['images/category-accessories.jpg'], queries: ['watch sunglasses flat lay', 'accessories flat lay'], keywords: ['watch', 'flat', 'lay', 'accessories', 'sunglasses'], sources: ['stocksnap', 'rawpixel'], aspect: 'tall' },
  { out: ['images/category-gifts.jpg'], queries: ['stack of wrapped presents', 'christmas presents under tree'], keywords: ['present', 'gift', 'stack', 'wrapp'], sources: ['stocksnap', 'flickr'], aspect: 'tall' },
  { out: ['images/gift-for-her.jpg'], queries: ['perfume flowers', 'jewellery box'], keywords: ['perfume', 'flower', 'jewelry', 'jewellery', 'box'], sources: ['stocksnap', 'rawpixel'], aspect: 'wide' },
  { out: ['images/gift-for-him.jpg'], queries: ['men accessories watch wallet', 'watch wallet flat lay'], keywords: ['watch', 'wallet', 'men', 'flat'], sources: ['stocksnap', 'rawpixel'], aspect: 'wide' },
  { out: ['images/gift-for-couples.jpg'], queries: ['champagne', 'glasses celebration'], keywords: ['champagne', 'glass', 'celebrat'], sources: ['stocksnap', 'rawpixel', 'flickr'], aspect: 'wide' },
  { out: ['images/gift-for-friends.jpg'], queries: ['people cheers glasses', 'party celebration people'], keywords: ['cheers', 'toast', 'glass', 'party', 'celebrat'], sources: ['stocksnap', 'flickr'], aspect: 'wide' },
  { out: ['images/gift-for-family.jpg'], queries: ['family dinner table', 'dinner table celebration'], keywords: ['family', 'dinner', 'table'], sources: ['stocksnap', 'flickr'], aspect: 'wide' },
  { out: ['images/gift-for-yourself.jpg'], queries: ['spa candle towel', 'candle book relaxation'], keywords: ['spa', 'candle', 'towel', 'relax', 'book'], sources: ['stocksnap', 'rawpixel'], aspect: 'wide' },
  { out: ['images/social-1.jpg'], queries: ['champagne glasses gold', 'champagne toast'], keywords: ['champagne', 'glass', 'toast'], sources: ['stocksnap', 'flickr'] },
  { out: ['images/social-3.jpg'], queries: ['candles on dinner table', 'table setting candles'], keywords: ['candle', 'table', 'setting', 'dinner'], sources: ['stocksnap', 'flickr'] },
  { out: ['images/social-5.jpg'], queries: ['coffee cup and book', 'morning coffee cup'], keywords: ['coffee', 'cup', 'book', 'morning'], sources: ['stocksnap', 'flickr'] },

  // ── products needing a better shot ─────────────────────────────────────
  { out: p('nocturne-eau-de-parfum', 2), queries: ['perfume bottle', 'perfume fragrance'], keywords: ['perfume', 'fragrance', 'bottle'], sources: ['rawpixel', 'stocksnap'] },
  { out: p('velours-lip-ritual-set', 2), queries: ['lipstick', 'makeup lipstick'], keywords: ['lipstick', 'makeup', 'lip'], sources: ['rawpixel', 'stocksnap'] },
  { out: ['images/products/cassie-cashmere-coat-1.jpg'], queries: ['coat on hanger', 'winter coat'], keywords: ['coat', 'hanger', 'jacket'], sources: ['stocksnap', 'rawpixel'] },
  { out: p('ivoire-silk-slip-dress', 2), queries: ['silk dress woman', 'evening dress elegant'], keywords: ['dress', 'silk', 'evening'], sources: ['stocksnap', 'rawpixel'] },
  { out: ['images/products/merino-rib-knit-2.jpg'], queries: ['knitted sweater folded', 'wool sweater'], keywords: ['sweater', 'knit', 'wool'], sources: ['stocksnap', 'rawpixel'] },
  { out: p('aura-pro-wireless-earbuds', 2), queries: ['earphones', 'headphones music'], keywords: ['earbud', 'earphone', 'headphone', 'music'], sources: ['rawpixel', 'stocksnap'] },
  { out: ['images/products/nimbus-5g-smartphone-2.jpg'], queries: ['smartphone', 'phone in hand'], keywords: ['smartphone', 'phone', 'mobile'], sources: ['stocksnap', 'rawpixel'] },
  { out: ['images/products/halo-smartwatch-series-3-1.jpg'], queries: ['smartwatch white background', 'smartwatch'], keywords: ['smartwatch', 'watch'], sources: ['rawpixel', 'stocksnap'] },
  { out: p('solstice-marble-candle-trio', 2), queries: ['scented candle jar', 'candles'], keywords: ['candle', 'jar', 'wax'], sources: ['rawpixel', 'stocksnap'] },
  { out: p('alpaca-throw-blanket', 2), queries: ['blanket', 'cozy blanket bed'], keywords: ['blanket', 'throw', 'cozy'], sources: ['stocksnap', 'rawpixel'] },
  { out: p('solstice-ceramic-vase-set', 2), queries: ['white ceramic vase', 'vases with flowers'], keywords: ['vase', 'ceramic', 'flower'], sources: ['rawpixel', 'stocksnap'] },
  { out: ['images/products/aurora-chrono-watch-2.jpg', 'images/products/aurora-chrono-watch-3.jpg'], queries: ['wristwatch leather strap', 'watch on wrist'], keywords: ['watch', 'wrist', 'strap'], sources: ['stocksnap', 'rawpixel'] },
  { out: p('lune-gold-plated-necklace', 2), queries: ['gold necklace', 'necklace pendant'], keywords: ['necklace', 'pendant', 'gold'], sources: ['rawpixel', 'stocksnap'] },
  { out: p('stride-insulated-bottle', 2), queries: ['water bottle', 'bottle drink'], keywords: ['bottle', 'water'], sources: ['rawpixel', 'stocksnap'] },
  { out: p('celebration-crystal-flute-set', 2), queries: ['champagne glass isolated', 'champagne glass'], keywords: ['champagne', 'glass', 'flute'], sources: ['rawpixel', 'stocksnap'] },
  { out: p('stride-weekender-duffel', 2), queries: ['travel bag leather', 'duffel bag'], keywords: ['bag', 'duffel', 'travel', 'luggage'], sources: ['stocksnap', 'rawpixel'] },
  { out: ['images/category-tech.jpg'], queries: ['headphones desk laptop', 'technology desk workspace'], keywords: ['headphone', 'laptop', 'desk', 'computer'], sources: ['stocksnap'], aspect: 'tall' },
  { out: ['images/products/lumen-arc-desk-lamp-2.jpg'], queries: ['table lamp desk', 'desk lamp'], keywords: ['lamp', 'desk', 'light'], sources: ['stocksnap', 'rawpixel'] },
]

/* ── helpers ──────────────────────────────────────────────────────────── */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const usable = (r) => {
  if (!r?.url || !/\.(jpe?g|png)(\?|$)/i.test(r.url)) return false
  if (r.width && r.width < 640) return false
  if (r.height && r.height < 480) return false
  return true
}

const clean = (s) => (s || '').toLowerCase()

const matches = (r, keywords) => {
  const title = clean(r.title)
  const tags = (r.tags || []).map((t) => clean(t.name || t)).join(' ')
  return keywords.some((k) => title.includes(k.toLowerCase()) || tags.includes(k.toLowerCase()))
}

const score = (r, keywords, aspect, sources) => {
  const title = clean(r.title)
  const tags = (r.tags || []).map((t) => clean(t.name || t)).join(' ')
  let value = 0
  for (const k of keywords) {
    const key = k.toLowerCase()
    if (title.includes(key)) value += 5
    if (tags.includes(key)) value += 1
  }
  const sourceIndex = sources ? sources.indexOf(r.source) : -1
  if (sourceIndex === 0) value += 4
  else if (sourceIndex > 0) value += 2
  if (r.source === 'stocksnap' && value >= 0) value += 2
  if (r.license === 'cc0' || r.license === 'pdm') value += 1
  const w = r.width || 0
  const h = r.height || 0
  if (w && h) {
    if (aspect === 'tall' && h > w * 1.05) value += 3
    if (aspect === 'wide' && w > h * 1.2) value += 3
    if (aspect === 'tall' && w > h * 1.5) value -= 4
    if (aspect === 'wide' && h > w * 1.3) value -= 4
  }
  if (/\b(circa|museum|century|collection|antique|1[0-9]{3})\b/i.test(title)) value -= 8
  return value
}

async function fetchQuery(query, extra = {}) {
  const params = new URLSearchParams({
    q: query,
    page_size: '20',
    category: 'photograph',
    mature: 'false',
    license_type: 'commercial,modification',
    ...extra,
  })
  const res = await fetch(`${API}?${params}`, { headers: { 'User-Agent': 'aurelia-image-pipeline/2.0' } })
  if (!res.ok) throw new Error(`${res.status} for "${query}"`)
  const json = await res.json()
  return json.results || []
}

async function download(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (AURELIA demo)' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.length < 9000) throw new Error('too small')
  const hash = createHash('md5').update(buffer).digest('hex')
  return { buffer, hash }
}

async function walk(dir, into = []) {
  let entries = []
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return into
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, into)
    else if (/\.(jpe?g|png)$/i.test(entry.name)) into.push(full)
  }
  return into
}

/* ── main ─────────────────────────────────────────────────────────────── */
const knownHashes = new Set()
for (const file of await walk(OUT_ROOT)) {
  try {
    const buf = await readFile(file)
    knownHashes.add(createHash('md5').update(buf).digest('hex'))
  } catch {
    /* ignore */
  }
}

const used = new Set()
const credits = []
const failures = []

for (const entry of manifest) {
  if (ONLY && !entry.out.join(' ').includes(ONLY)) continue

  const todo = []
  for (const out of entry.out) {
    try {
      await readFile(path.join(ROOT, 'public', out))
      if (!process.env.FORCE_ALL) continue
    } catch {
      /* missing — fetch it */
    }
    todo.push(out)
  }
  if (todo.length === 0) {
    console.log(`skip ${entry.out[0]}`)
    continue
  }

  let chosen = []
  for (const query of entry.queries) {
    if (chosen.length >= todo.length) break
    for (const source of entry.sources ?? ['']) {
      if (chosen.length >= todo.length) break
      try {
        const results = await fetchQuery(query, source ? { source } : {})
        const ranked = results
          .filter((r) => usable(r) && matches(r, entry.keywords) && !used.has(r.url))
          .map((r) => ({ r, s: score(r, entry.keywords, entry.aspect, entry.sources) }))
          .filter((x) => x.s > 3)
          .sort((a, b) => b.s - a.s)
          .map((x) => x.r)
        for (const r of ranked) {
          if (chosen.length >= todo.length) break
          chosen.push({ r, query })
        }
      } catch (error) {
        console.error(`! ${query}${source ? ` [${source}]` : ''}: ${error.message}`)
      }
      await sleep(DELAY_MS)
    }
  }

  if (chosen.length < todo.length) {
    // last resort: any photograph matching the keywords, any source
    try {
      const results = await fetchQuery(entry.queries[0])
      const ranked = results
        .filter((r) => usable(r) && matches(r, entry.keywords) && !used.has(r.url))
        .map((r) => ({ r, s: score(r, entry.keywords, entry.aspect, entry.sources) }))
        .filter((x) => x.s > 3)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.r)
      for (const r of ranked) {
        if (chosen.length >= todo.length) break
        chosen.push({ r, query: entry.queries[0] })
      }
    } catch (error) {
      console.error(`! fallback ${entry.queries[0]}: ${error.message}`)
    }
    await sleep(DELAY_MS)
  }

  for (let i = 0; i < todo.length; i++) {
    const out = todo[i]
    const dest = path.join(ROOT, 'public', out)
    let placed = false
    for (let c = i; c < chosen.length && !placed; c++) {
      const pick = chosen[c]
      if (!pick) continue
      if (used.has(pick.r.url)) continue
      if (DRY) {
        console.log(`~ ${out} ← ${pick.r.title} [${pick.r.source}] (${pick.query})`)
        used.add(pick.r.url)
        placed = true
        break
      }
      try {
        const { buffer, hash } = await download(pick.r.url)
        if (knownHashes.has(hash)) {
          used.add(pick.r.url)
          continue // identical photo already used elsewhere
        }
        await mkdir(path.dirname(dest), { recursive: true })
        await writeFile(dest, buffer)
        knownHashes.add(hash)
        used.add(pick.r.url)
        credits.push({
          file: out,
          title: pick.r.title || '—',
          creator: pick.r.creator || 'unknown',
          source: pick.r.source,
          license: `${pick.r.license ?? ''} ${pick.r.license_version ?? ''}`.trim(),
          url: pick.r.foreign_landing_url || pick.r.url,
        })
        console.log(`✓ ${out} (${(buffer.length / 1024) | 0} kb) ← ${pick.r.title} [${pick.r.source}]`)
        placed = true
      } catch (error) {
        console.error(`x ${out}: ${error.message}`)
        used.add(pick.r.url)
      }
    }
    if (!placed) {
      failures.push(out)
      console.warn(`x no unique candidate for ${out}`)
    }
  }
}

if (!DRY && credits.length) {
  const file = path.join(OUT_ROOT, 'CREDITS.md')
  let existing = ''
  try {
    existing = await readFile(file, 'utf8')
  } catch {
    existing = '# AURELIA image credits\n\nPhotography via the Openverse API (commercial + modification licences).\n\n| File | Title | Creator | Source | Licence |\n| --- | --- | --- | --- | --- |\n'
  }
  const header = existing.includes('| File |') ? '' : '| File | Title | Creator | Source | Licence |\n| --- | --- | --- | --- | --- |\n'
  const lines = credits.map((c) => `| ${c.file} | ${c.title} | ${c.creator} | ${c.source} | ${c.license} |`)
  await writeFile(file, `${existing}\n${header}${lines.join('\n')}\n`)
}

console.log(`\nDone. ${credits.length} downloaded, ${failures.length} failed.`)
if (failures.length) console.log('Failed:', failures.join(', '))
