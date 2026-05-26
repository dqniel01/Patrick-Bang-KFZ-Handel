/**
 * AutoScout24 Service
 *
 * Priorität der Datenquellen:
 *   1. Offizielle AS24 Dealer-API  (wenn .env konfiguriert)
 *   2. Web-Scraping via lokalem Proxy-Server  (npm run dev:full)
 *   3. SAMPLE_LISTINGS als statischer Fallback
 *
 * API-Zugangsdaten (.env):
 *   VITE_AS24_CUSTOMER_ID=<Patrick Bangs customerId>
 *   VITE_AS24_USER=<API-Benutzername>
 *   VITE_AS24_PASS=<API-Passwort>
 */

const BASE_URL = 'https://listing-creation.api.autoscout24.com'

const CUSTOMER_ID = import.meta.env.VITE_AS24_CUSTOMER_ID
const AS24_USER   = import.meta.env.VITE_AS24_USER
const AS24_PASS   = import.meta.env.VITE_AS24_PASS

export const DEALER_LINK  = 'https://www.autoscout24.de/haendler/patrick-bang-kfz-handel'
// Offizielles Händler-Embed von AutoScout24 (funktioniert ohne API-Credentials)
export const EMBED_URL    = 'https://www.autoscout24.de/haendler/embedded-list/patrick-bang-kfz-handel?preview=false'

// Gibt true zurück wenn API-Zugangsdaten konfiguriert sind
export const isApiConfigured = Boolean(CUSTOMER_ID && AS24_USER && AS24_PASS)

/**
 * Ruft die aktuellen Inserate von der AutoScout24 API ab.
 * Wirft einen Fehler wenn die API nicht erreichbar ist → Fallback auf SAMPLE_LISTINGS.
 */
export async function fetchListings() {
  if (!isApiConfigured) {
    throw new Error('AutoScout24 API nicht konfiguriert – bitte .env anlegen.')
  }

  const credentials = btoa(`${AS24_USER}:${AS24_PASS}`)

  const response = await fetch(
    `${BASE_URL}/customers/${CUSTOMER_ID}/listings`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`AutoScout24 API Fehler: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  // API-Antwort → internes Format normalisieren
  const listings = Array.isArray(data) ? data : (data.listings ?? data.results ?? [])
  return listings.map(normalizeApiListing)
}

/**
 * Normalisiert ein AutoScout24 API-Listing auf das interne Format.
 * Felder werden angepasst sobald die echte API-Antwortstruktur bekannt ist.
 */
function normalizeApiListing(item) {
  const attrs = item.vehicle ?? item.attributes ?? item

  return {
    id:           String(item.id ?? item.listingId ?? Math.random()),
    make:         attrs.make ?? attrs.brand ?? '',
    model:        attrs.model ?? '',
    version:      attrs.version ?? attrs.variant ?? '',
    year:         attrs.firstRegistration?.year ?? attrs.year ?? null,
    mileage:      attrs.mileage ?? attrs.km ?? 0,
    price:        item.prices?.publicPrice?.value ?? item.price ?? 0,
    fuel:         mapFuel(attrs.fuel ?? attrs.fuelType),
    transmission: mapTransmission(attrs.gear ?? attrs.transmission),
    power:        attrs.power?.ps ?? attrs.powerPs ?? null,
    color:        attrs.color ?? '',
    image:        item.images?.[0]?.url ?? item.mainImageUrl ?? null,
    as24Url:      item.as24Url ?? `${DEALER_LINK}`,
    highlight:    false,
  }
}

function mapFuel(raw) {
  const map = { B: 'Benzin', D: 'Diesel', E: 'Elektro', H: 'Hybrid', G: 'Gas' }
  return map[raw] ?? raw ?? 'Benzin'
}

function mapTransmission(raw) {
  const map = { M: 'Schaltung', A: 'Automatik' }
  return map[raw] ?? raw ?? 'Automatik'
}

/**
 * Ruft Inserate von der Netlify Function ab (netlify/functions/listings.js).
 * Funktioniert sowohl auf Netlify als auch lokal (via netlify dev).
 */
export async function fetchScrapedListings() {
  const response = await fetch('/.netlify/functions/listings', { method: 'GET' })
  if (!response.ok) throw new Error(`Netlify Function antwortet nicht (${response.status})`)
  const data = await response.json()
  if (data.error) throw new Error(data.error)
  const listings = data.listings ?? []
  if (listings.length === 0) throw new Error('Scraper hat 0 Inserate zurückgegeben')
  return listings
}

// ---------------------------------------------------------------------------
// Fallback-Daten – aktuelle Inserate von Patrick Bang (Stand April 2025)
// Werden durch API oder Scraping ersetzt sobald verfügbar
// ---------------------------------------------------------------------------

export const SAMPLE_LISTINGS = [
  {
    id: '1',
    make: 'Audi',
    model: 'RS3',
    version: 'Sportback 2.5 TFSI quattro S tronic',
    year: 2026,
    mileage: 3900,
    price: 62900,
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 400,
    color: 'Nardograu',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
    as24Url: DEALER_LINK,
    highlight: true,
  },
  {
    id: '2',
    make: 'Audi',
    model: 'Q8',
    version: '50 TDI quattro tiptronic',
    year: 2024,
    mileage: 0,
    price: 79900,
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: 286,
    color: 'Schwarzstruktur',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    as24Url: DEALER_LINK,
    highlight: false,
  },
  {
    id: 'prev-1',
    make: 'Audi',
    model: 'Q3',
    version: '35 TFSI S tronic',
    year: 2024,
    mileage: 40,
    price: 38900,
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 150,
    color: 'Mythosschwarz Metallic',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    as24Url: DEALER_LINK,
    highlight: true,
  },
  {
    id: '2',
    make: 'Audi',
    model: 'A4',
    version: '40 TDI quattro S tronic',
    year: 2023,
    mileage: 12400,
    price: 44500,
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: 204,
    color: 'Navarra Blau Metallic',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80',
    as24Url: DEALER_LINK,
    highlight: false,
  },
  {
    id: '3',
    make: 'BMW',
    model: '3er',
    version: '320d xDrive Touring',
    year: 2023,
    mileage: 8900,
    price: 46800,
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: 190,
    color: 'Alpinweiß',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    as24Url: DEALER_LINK,
    highlight: false,
  },
  {
    id: '4',
    make: 'Mercedes-Benz',
    model: 'C-Klasse',
    version: 'C 220 d AMG Line',
    year: 2022,
    mileage: 18700,
    price: 41200,
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: 200,
    color: 'Obsidianschwarz Metallic',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    as24Url: DEALER_LINK,
    highlight: false,
  },
  {
    id: '5',
    make: 'Volkswagen',
    model: 'Golf',
    version: 'GTI 2.0 TSI',
    year: 2023,
    mileage: 6200,
    price: 36900,
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 245,
    color: 'Deep Black Pearl',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    as24Url: DEALER_LINK,
    highlight: false,
  },
  {
    id: '6',
    make: 'Audi',
    model: 'Q5',
    version: '40 TDI quattro S tronic',
    year: 2022,
    mileage: 24100,
    price: 52400,
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: 204,
    color: 'Florettsilber Metallic',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    as24Url: DEALER_LINK,
    highlight: false,
  },
]

export function formatPrice(price) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatMileage(km) {
  return new Intl.NumberFormat('de-DE').format(km) + ' km'
}
