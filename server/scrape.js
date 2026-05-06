/**
 * AutoScout24 Scraping-Logik
 * Wird von server/index.js importiert.
 */

const DEALER_SLUG = 'patrick-bang-kfz-handel'
const DEALER_URL  = `https://www.autoscout24.de/haendler/${DEALER_SLUG}`
const AS24_BASE   = 'https://www.autoscout24.de'

function upgradeImageUrl(url) {
  if (!url) return null
  return url.replace(/\/\d+x\d+\.\w+$/, '/800x600.jpg')
}

function normalizeListing(item) {
  const v = item.vehicle ?? {}
  return {
    id:           item.id ?? String(Math.random()),
    make:         v.make ?? '',
    model:        v.model ?? '',
    version:      v.modelVersionInput ?? '',
    year:         v.firstRegistrationDate?.raw
                    ? Number(v.firstRegistrationDate.raw.split('-')[0])
                    : null,
    mileage:      v.mileageInKm?.raw ?? 0,
    price:        item.prices?.public?.priceRaw ?? item.prices?.dealer?.priceRaw ?? 0,
    fuel:         v.fuelCategory?.formatted ?? 'Benzin',
    transmission: v.transmissionType?.formatted ?? 'Automatik',
    power:        v.powerInHp?.raw ?? null,
    color:        v.color ?? '',
    image:        upgradeImageUrl(item.images?.[0] ?? null),
    as24Url:      item.url
                    ? (item.url.startsWith('http') ? item.url : AS24_BASE + item.url)
                    : DEALER_URL,
    highlight:    false,
  }
}

export async function scrapeListings() {
  const response = await fetch(DEALER_URL, {
    headers: {
      'User-Agent':      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'de-DE,de;q=0.9',
    },
  })

  if (!response.ok) throw new Error(`AS24 Status ${response.status}`)

  const html = await response.text()
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)
  if (!match) throw new Error('__NEXT_DATA__ nicht gefunden – AS24 blockiert oder hat Struktur geändert')

  const { props: { pageProps } } = JSON.parse(match[1])
  const raw = pageProps.listings
  if (!Array.isArray(raw)) throw new Error('listings Array nicht gefunden')

  return raw.map(normalizeListing)
}
