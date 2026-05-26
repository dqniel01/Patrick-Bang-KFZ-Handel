/**
 * Netlify Function: AutoScout24 Listings Scraper
 * Erreichbar unter: /.netlify/functions/listings
 *
 * Läuft serverseitig auf Netlify – kein lokaler Node.js-Server nötig.
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

export default async function handler(req, context) {
  // CORS-Header
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=300', // 5 Minuten cachen
  }

  try {
    const response = await fetch(DEALER_URL, {
      headers: {
        'User-Agent':      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9',
      },
    })

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `AS24 Status ${response.status}` }),
        { status: 502, headers }
      )
    }

    const html = await response.text()
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)
    if (!match) {
      return new Response(
        JSON.stringify({ error: '__NEXT_DATA__ nicht gefunden – AS24 hat Struktur geändert' }),
        { status: 502, headers }
      )
    }

    const { props: { pageProps } } = JSON.parse(match[1])
    const raw = pageProps.listings
    if (!Array.isArray(raw)) {
      return new Response(
        JSON.stringify({ error: 'listings Array nicht gefunden' }),
        { status: 502, headers }
      )
    }

    const listings = raw.map(normalizeListing)
    return new Response(
      JSON.stringify({ listings }),
      { status: 200, headers }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers }
    )
  }
}
